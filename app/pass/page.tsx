'use client'
import { useState } from 'react'
import Logo from '@/components/Logo'
import { ACTIVITY_LABELS, ActivityKey } from '@/lib/document-engine'

type PassStep = 'lookup' | 'recognized' | 'activity' | 'confirm' | 'done'

const ACTIVITIES: { key: ActivityKey; emoji: string }[] = [
  { key: 'kayak', emoji: '🚣' },
  { key: 'hike',  emoji: '🥾' },
  { key: 'atv',   emoji: '🏎️'  },
  { key: 'climb', emoji: '🧗' },
]

// Simulated returning participant profile
const MOCK_PROFILE = {
  fullName:     'Jordan Rivera',
  email:        'j.rivera@email.com',
  lastActivity: 'Whitewater Kayaking',
  lastVisit:    'March 14, 2026',
  totalVisits:  7,
  passId:       'LP-4821',
}

export default function PassPage() {
  const [step,      setStep]      = useState<PassStep>('lookup')
  const [email,     setEmail]     = useState('')
  const [activity,  setActivity]  = useState<ActivityKey | null>(null)
  const [looking,   setLooking]   = useState(false)
  const [signedAt,  setSignedAt]  = useState('')

  function lookup() {
    if (!email.includes('@')) return
    setLooking(true)
    setTimeout(() => { setLooking(false); setStep('recognized') }, 1200)
  }

  function confirmSign() {
    setSignedAt(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }))
    setStep('done')
  }

  return (
    <div className="min-h-screen bg-surface flex flex-col">
      <nav className="bg-white border-b border-black/10 px-5 py-3 flex items-center justify-between">
        <Logo size="md" />
        <span className="text-xs bg-brand/10 text-brand border border-brand/20 px-3 py-1 rounded-full font-medium">
          ✦ LIABL Pass
        </span>
      </nav>

      <div className="flex-1 flex flex-col items-center px-4 py-10">
        <div className="w-full max-w-md animate-fade-up" key={step}>

          {/* ── Step 1: Email lookup ── */}
          {step === 'lookup' && (
            <div className="card">
              <div className="w-12 h-12 rounded-2xl bg-brand/10 flex items-center justify-center text-2xl mb-4">✦</div>
              <h2 className="font-serif text-2xl mb-1">Welcome back.</h2>
              <p className="text-gray-500 text-sm mb-6 leading-relaxed">
                Enter your email to pull up your LIABL Pass. Returning participants skip the full form — sign in under 15 seconds.
              </p>
              <label className="block text-xs font-medium text-gray-500 mb-1">Email address</label>
              <input
                className="form-input mb-4"
                type="email"
                placeholder="you@email.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && lookup()}
              />
              <button onClick={lookup} disabled={!email.includes('@') || looking} className="btn-primary">
                {looking ? 'Looking up your pass…' : 'Find my LIABL Pass →'}
              </button>
              <p className="text-center text-xs text-gray-400 mt-4">
                First time? <a href="/participant" className="text-brand underline">Sign a full waiver instead</a>
              </p>
            </div>
          )}

          {/* ── Step 2: Profile recognized ── */}
          {step === 'recognized' && (
            <div>
              <div className="card mb-4">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 rounded-full bg-brand/10 flex items-center justify-center text-xl font-semibold text-brand font-serif">
                    JR
                  </div>
                  <div>
                    <div className="font-semibold text-ink">{MOCK_PROFILE.fullName}</div>
                    <div className="text-xs text-gray-400">{MOCK_PROFILE.email}</div>
                    <div className="mt-1 inline-flex items-center gap-1 bg-brand/10 text-brand text-xs px-2 py-0.5 rounded-full font-medium">
                      ✦ Pass {MOCK_PROFILE.passId}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 mb-4">
                  {[
                    { label: 'Total visits', value: MOCK_PROFILE.totalVisits },
                    { label: 'Last activity', value: 'Kayaking' },
                    { label: 'Last visit', value: 'Mar 14' },
                  ].map(({ label, value }) => (
                    <div key={label} className="bg-surface rounded-xl p-3 text-center">
                      <div className="font-semibold text-ink text-sm">{value}</div>
                      <div className="text-xs text-gray-400 mt-0.5">{label}</div>
                    </div>
                  ))}
                </div>

                <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-xl p-3 text-sm flex gap-2">
                  <span>✓</span>
                  <span>Profile recognized. Your previous health disclosures are on file — no need to re-enter them.</span>
                </div>
              </div>

              <button onClick={() => setStep('activity')} className="btn-primary">
                Select today&apos;s activity →
              </button>
            </div>
          )}

          {/* ── Step 3: Activity select ── */}
          {step === 'activity' && (
            <div className="card">
              <h2 className="font-serif text-2xl mb-1">What&apos;s today&apos;s activity?</h2>
              <p className="text-gray-500 text-sm mb-5">
                Your existing waiver will be updated for the selected activity.
              </p>
              <div className="grid grid-cols-2 gap-3 mb-6">
                {ACTIVITIES.map(({ key, emoji }) => (
                  <button key={key} onClick={() => setActivity(key)}
                    className={`text-left p-4 rounded-xl border transition-all ${
                      activity === key ? 'border-brand bg-brand/5' : 'border-black/10 hover:border-brand/40 bg-surface'
                    }`}>
                    <div className="text-2xl mb-2">{emoji}</div>
                    <div className="font-semibold text-sm">{ACTIVITY_LABELS[key]}</div>
                  </button>
                ))}
              </div>
              <button onClick={() => setStep('confirm')} disabled={!activity} className="btn-primary">
                Review &amp; sign →
              </button>
            </div>
          )}

          {/* ── Step 4: One-tap confirm ── */}
          {step === 'confirm' && activity && (
            <div className="card">
              <h2 className="font-serif text-2xl mb-1">Confirm &amp; sign</h2>
              <p className="text-gray-500 text-sm mb-5">
                Your waiver has been updated for <strong>{ACTIVITY_LABELS[activity]}</strong>. Tap below to sign with your LIABL Pass.
              </p>

              <div className="bg-surface border border-black/10 rounded-xl p-4 mb-5 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Participant</span>
                  <span className="font-medium">{MOCK_PROFILE.fullName}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Activity</span>
                  <span className="font-medium">{ACTIVITY_LABELS[activity]}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Health disclosures</span>
                  <span className="text-emerald-600 font-medium">✓ On file</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Pass ID</span>
                  <span className="font-medium text-brand">{MOCK_PROFILE.passId}</span>
                </div>
              </div>

              <div className="bg-brand/5 border border-brand/20 text-brand rounded-xl p-3 text-xs mb-5 flex gap-2">
                <span>🔒</span>
                <span>Signing via LIABL Pass — identity verified, IP recorded, ESIGN Act compliant.</span>
              </div>

              <button onClick={confirmSign} className="btn-primary text-lg py-4">
                ✦ Sign with LIABL Pass
              </button>
            </div>
          )}

          {/* ── Step 5: Done ── */}
          {step === 'done' && activity && (
            <div className="card text-center">
              <div className="w-16 h-16 rounded-full bg-brand/10 flex items-center justify-center mx-auto mb-4 text-3xl">
                ✦
              </div>
              <h2 className="font-serif text-2xl mb-2">Signed in 15 seconds.</h2>
              <p className="text-gray-500 text-sm mb-6">
                Your waiver for <strong>{ACTIVITY_LABELS[activity]}</strong> is confirmed.
                A copy has been sent to {MOCK_PROFILE.email}.
              </p>

              <div className="flex flex-wrap gap-2 justify-center mb-8">
                {[
                  `Signed at ${signedAt}`,
                  ACTIVITY_LABELS[activity],
                  `Visit #${MOCK_PROFILE.totalVisits + 1}`,
                  'LIABL Pass ✦',
                ].map(tag => (
                  <span key={tag} className="bg-surface border border-black/10 text-xs px-3 py-1.5 rounded-full text-gray-500">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="bg-brand/5 border border-brand/20 rounded-xl p-4 text-sm text-left mb-6">
                <div className="font-semibold text-brand mb-2">Your LIABL Pass updated</div>
                <div className="text-gray-500 text-xs leading-relaxed">
                  This session has been added to your profile. Your health disclosures remain on file for future visits — you&apos;ll never need to re-enter them.
                </div>
              </div>

              <button onClick={() => { setStep('lookup'); setEmail(''); setActivity(null) }} className="btn-primary max-w-xs mx-auto">
                ↺ Demo again
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
