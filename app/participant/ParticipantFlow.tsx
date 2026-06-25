'use client'
import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { ParticipantAnswers, WaiverClause, generateClauses } from '@/lib/document-engine'
import Logo           from '@/components/Logo'
import ProgressBar    from '@/components/participant/ProgressBar'
import StepEntry      from '@/components/participant/StepEntry'
import StepIdentity   from '@/components/participant/StepIdentity'
import StepActivity   from '@/components/participant/StepActivity'
import StepHealth     from '@/components/participant/StepHealth'
import { StepGuardian } from '@/components/participant/StepGuardian'
import StepDocument   from '@/components/participant/StepDocument'
import StepSignature  from '@/components/participant/StepSignature'
import StepConfirm    from '@/components/participant/StepConfirm'
import PageNav from '@/components/PageNav'

const ADULT_STEPS = ['Identity','Activity','Health','Review','Sign']
const MINOR_STEPS = ['Identity','Activity','Health','Guardian','Review','Sign']

// v23 M1 fix #2 — save-failure state machine for the signing step
type SaveState =
  | { kind: 'idle' }
  | { kind: 'saving' }
  | { kind: 'retryable_error'; attempts: number; lastError: string }
  | { kind: 'fatal_error' }    // 3 retries exhausted — escalate to staff

// v23 M1 fix #1 — session resolution
// The signing flow now reads its session ID from the URL (?session=<id>).
// The dynamic route /participant/session/[sessionId] passes the ID in as a
// route param; this generic /participant entry point accepts the same ID
// as a query string. If neither is present, the prototype falls back to
// the demo session for the existing investor demo experience.
// In production, the operator dashboard generates a unique link per session
// and that link is what gets emailed/QR'd to the participant.
const DEMO_SESSION_FALLBACK = 'demo' // sentinel — backend resolves to whichever session is configured for the demo

export default function ParticipantFlow() {
  const searchParams = useSearchParams()
  const sessionIdFromQuery = searchParams.get('session')
  // Falls back to 'demo' so the existing prototype demo flow at /participant still works
  const sessionId = sessionIdFromQuery || DEMO_SESSION_FALLBACK

  const [step,    setStep]    = useState(0)
  const [answers, setAnswers] = useState<Partial<ParticipantAnswers>>({})
  const [clauses, setClauses] = useState<WaiverClause[]>([])
  const [saveState, setSaveState] = useState<SaveState>({ kind: 'idle' })
  // Hold the signature data across retries so we don't lose it if a save fails
  const [pendingSignature, setPendingSignature] = useState<string | null>(null)

  const isMinor    = answers.isMinor ?? false
  const stepLabels = isMinor ? MINOR_STEPS : ADULT_STEPS

  function next(update?: Partial<ParticipantAnswers>) {
    const merged = { ...answers, ...update }
    setAnswers(merged)
    if (merged.activityKey && merged.fullName) setClauses(generateClauses(merged as ParticipantAnswers))
    const nextStep = step === 3 && !merged.isMinor ? 5 : step + 1
    setStep(nextStep)
  }
  function prev() { setStep(step === 5 && !isMinor ? 3 : Math.max(0, step - 1)) }

  // v23 M1 fix #2 — replace try/finally with try/catch
  // The previous implementation advanced to the confirmation screen in `finally`,
  // which meant a failed Supabase insert still displayed "Waiver signed!" to the
  // participant. Now: success advances; failure surfaces a retryable error;
  // after 3 retries the participant is escalated to staff.
  async function attemptSave(sigData: string): Promise<void> {
    setSaveState({ kind: 'saving' })

    try {
      const { createClient } = await import('@/lib/supabase')
      const supabase = createClient()
      const full = answers as ParticipantAnswers

      // 1. Upsert participant
      const { data: participant, error: participantError } = await supabase
        .from('participants')
        .upsert(
          { email: full.email, full_name: full.fullName, dob: full.dob },
          { onConflict: 'email' }
        )
        .select('id')
        .single()

      if (participantError) throw new Error(`participant upsert: ${participantError.message}`)
      if (!participant) throw new Error('participant upsert returned no data')

      // 2. v23 M1 fix #1 — Resolve the correct session
      // Previously this was `.limit(1).single()` which grabbed whatever row
      // happened to be first. Now we look up the specific session passed in
      // via URL. If the session can't be resolved we fail loudly rather than
      // silently writing the waiver against the wrong session.
      //
      // The 'demo' sentinel falls back to the first active session for the
      // prototype demo experience only — production should not use this path.
      let resolvedSessionId: string
      if (sessionId === DEMO_SESSION_FALLBACK) {
        const { data: demoSession, error: demoErr } = await supabase
          .from('sessions')
          .select('id')
          .limit(1)
          .maybeSingle()
        if (demoErr) throw new Error(`demo session lookup: ${demoErr.message}`)
        if (!demoSession) throw new Error('no demo session configured')
        resolvedSessionId = demoSession.id
      } else {
        // Production path: look up the specific session by ID
        const { data: realSession, error: sessionErr } = await supabase
          .from('sessions')
          .select('id')
          .eq('id', sessionId)
          .maybeSingle()
        if (sessionErr) throw new Error(`session lookup: ${sessionErr.message}`)
        if (!realSession) throw new Error(`session ${sessionId} not found`)
        resolvedSessionId = realSession.id
      }

      // 3. Insert waiver
      const { error: waiverError } = await supabase.from('waivers').insert({
        session_id: resolvedSessionId,
        participant_id: participant.id,
        activity_key: full.activityKey,
        answers: full,
        clauses,
        signed_at: new Date().toISOString(),
        signature_data: sigData,
        is_minor: full.isMinor ?? false,
        guardian_name: full.guardianName ?? null,
      })

      if (waiverError) throw new Error(`waiver insert: ${waiverError.message}`)

      // SUCCESS — only now advance to confirmation
      setSaveState({ kind: 'idle' })
      setPendingSignature(null)
      setStep(7)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error'
      console.error('[handleSign] save failed:', message)

      const previousAttempts = saveState.kind === 'retryable_error' ? saveState.attempts : 0
      const newAttempts = previousAttempts + 1

      if (newAttempts >= 3) {
        setSaveState({ kind: 'fatal_error' })
      } else {
        setSaveState({ kind: 'retryable_error', attempts: newAttempts, lastError: message })
      }
    }
  }

  function handleSign(sigData: string) {
    setPendingSignature(sigData)
    attemptSave(sigData)
  }

  function retrySave() {
    if (pendingSignature) attemptSave(pendingSignature)
  }

  function restart() {
    setStep(0)
    setAnswers({})
    setClauses([])
    setSaveState({ kind: 'idle' })
    setPendingSignature(null)
  }

  // The Signature step needs to know if saving is in progress (disables buttons)
  const saving = saveState.kind === 'saving'

  return (
    <div className="min-h-screen bg-surface flex flex-col">
      <PageNav badge="Participant" operatorName="Desert Ridge Adventures" operatorAccent="#4B2ACF" />
      <div className="flex-1 flex flex-col items-center px-4 py-8">
        <div className="w-full max-w-lg">
          {step > 0 && step < 7 && (
            <>
              <div className="flex items-center gap-2 mb-2 text-xs text-muted">
                <span className="font-semibold text-brand tracking-widest uppercase" style={{ letterSpacing:'0.12em' }}>Adaptive waiver</span>
                <span className="text-gray-300">·</span>
                <span>Generated by LIABL Document Intelligence</span>
              </div>
              <ProgressBar steps={stepLabels} current={Math.min(step - 1, stepLabels.length - 1)} />
            </>
          )}

          <div className="animate-fade-up" key={step}>
            {step === 0 && <StepEntry     onNext={() => next()} />}
            {step === 1 && <StepIdentity  onNext={(v) => next(v)} onBack={prev} />}
            {step === 2 && <StepActivity  onNext={(v) => next(v)} onBack={prev} />}
            {step === 3 && <StepHealth    onNext={(v) => next(v)} onBack={prev} answers={answers} />}
            {step === 4 && isMinor && (
              <StepGuardian minorName={answers.fullName ?? 'Minor'}
                onNext={(v) => { setAnswers(a => ({...a,...v})); setStep(5) }}
                onBack={prev} />
            )}
            {step === 5 && <StepDocument  clauses={clauses} answers={answers as ParticipantAnswers} onNext={() => setStep(6)} onBack={prev} />}
            {step === 6 && (
              <>
                <StepSignature onSign={handleSign} onBack={prev} saving={saving} />

                {/* v23 M1 fix #2 — retryable error state */}
                {saveState.kind === 'retryable_error' && (
                  <div className="mt-4 bg-amber-50 border border-amber-300 rounded-xl p-4">
                    <div className="flex items-start gap-3">
                      <span className="text-amber-700 text-lg">⚠️</span>
                      <div className="flex-1">
                        <div className="font-semibold text-amber-900 text-sm mb-1">
                          We couldn&apos;t save your waiver.
                        </div>
                        <p className="text-amber-800 text-sm mb-3">
                          Please try again, or ask a staff member for help.
                        </p>
                        <button
                          onClick={retrySave}
                          className="btn-primary text-sm"
                        >
                          Try again
                        </button>
                        <p className="text-xs text-amber-700 mt-2">
                          Attempt {saveState.attempts} of 3
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* v23 M1 fix #2 — fatal error state, no retry, force escalation */}
                {saveState.kind === 'fatal_error' && (
                  <div className="mt-4 bg-red-50 border border-red-300 rounded-xl p-4">
                    <div className="flex items-start gap-3">
                      <span className="text-red-700 text-lg">🚨</span>
                      <div className="flex-1">
                        <div className="font-semibold text-red-900 text-sm mb-1">
                          We&apos;re having trouble saving your waiver.
                        </div>
                        <p className="text-red-800 text-sm">
                          Please find a staff member and they&apos;ll get you sorted out.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
            {step === 7 && <StepConfirm   answers={answers as ParticipantAnswers} onRestart={restart} />}
          </div>
        </div>
      </div>
    </div>
  )
}
