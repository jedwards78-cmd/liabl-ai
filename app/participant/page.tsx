'use client'
import { useState } from 'react'
import { ParticipantAnswers, WaiverClause, generateClauses } from '@/lib/document-engine'
import Logo           from '@/components/Logo'
import ProgressBar    from '@/components/participant/ProgressBar'
import StepEntry      from '@/components/participant/StepEntry'
import StepIdentity   from '@/components/participant/StepIdentity'
import StepActivity   from '@/components/participant/StepActivity'
import StepHealth     from '@/components/participant/StepHealth'
import StepDocument   from '@/components/participant/StepDocument'
import StepSignature  from '@/components/participant/StepSignature'
import StepConfirm    from '@/components/participant/StepConfirm'

const STEP_LABELS = ['Identity', 'Activity', 'Health', 'Review', 'Sign']

export default function ParticipantPage() {
  const [step,    setStep]    = useState(0)
  const [answers, setAnswers] = useState<Partial<ParticipantAnswers>>({})
  const [clauses, setClauses] = useState<WaiverClause[]>([])
  const [saving,  setSaving]  = useState(false)

  function next(update?: Partial<ParticipantAnswers>) {
    const merged = { ...answers, ...update }
    setAnswers(merged)
    if (merged.activityKey && merged.fullName) {
      setClauses(generateClauses(merged as ParticipantAnswers))
    }
    setStep(s => s + 1)
  }

  function prev() { setStep(s => Math.max(0, s - 1)) }

  async function handleSign(sigData: string) {
    setSaving(true)
    try {
      const { createClient } = await import('@/lib/supabase')
      const supabase = createClient()
      const full = answers as ParticipantAnswers
      const { data: participant } = await supabase
        .from('participants')
        .upsert({ email: full.email, full_name: full.fullName, dob: full.dob }, { onConflict: 'email' })
        .select('id').single()
      if (participant) {
        const { data: session } = await supabase.from('sessions').select('id').limit(1).single()
        if (session) {
          await supabase.from('waivers').insert({
            session_id: session.id, participant_id: participant.id,
            activity_key: full.activityKey, answers: full, clauses,
            signed_at: new Date().toISOString(), signature_data: sigData,
            is_minor: full.isMinor ?? false, guardian_name: full.guardianName ?? null,
          })
        }
      }
    } catch (e) { console.error('Save error:', e) }
    finally { setSaving(false); setStep(6) }
  }

  function restart() { setStep(0); setAnswers({}); setClauses([]) }

  return (
    <div className="min-h-screen bg-surface flex flex-col">
      <nav className="bg-white border-b border-black/10 px-5 py-3 flex items-center justify-between">
        <Logo size="sm" />
        <span className="text-xs text-gray-400 bg-surface px-3 py-1 rounded-full border border-black/10">
          Desert Ridge Adventures
        </span>
      </nav>
      <div className="flex-1 flex flex-col items-center px-4 py-8">
        <div className="w-full max-w-lg">
          {step > 0 && step < 6 && <ProgressBar steps={STEP_LABELS} current={step - 1} />}
          <div className="animate-fade-up" key={step}>
            {step === 0 && <StepEntry     onNext={() => next()} />}
            {step === 1 && <StepIdentity  onNext={(v) => next(v)} onBack={prev} />}
            {step === 2 && <StepActivity  onNext={(v) => next(v)} onBack={prev} />}
            {step === 3 && <StepHealth    onNext={(v) => next(v)} onBack={prev} answers={answers} />}
            {step === 4 && <StepDocument  clauses={clauses} answers={answers as ParticipantAnswers} onNext={() => setStep(5)} onBack={prev} />}
            {step === 5 && <StepSignature onSign={handleSign} onBack={prev} saving={saving} />}
            {step === 6 && <StepConfirm   answers={answers as ParticipantAnswers} onRestart={restart} />}
          </div>
        </div>
      </div>
    </div>
  )
}
