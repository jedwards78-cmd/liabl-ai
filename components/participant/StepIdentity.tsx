'use client'
import { useState } from 'react'

interface Props {
  onNext: (v: { fullName: string; dob: string; email: string; isMinor: boolean }) => void
  onBack: () => void
}

export default function StepIdentity({ onNext, onBack }: Props) {
  const [name,  setName]  = useState('')
  const [dob,   setDob]   = useState('')
  const [email, setEmail] = useState('')

  const age     = dob ? new Date().getFullYear() - new Date(dob).getFullYear() : null
  const isMinor = age !== null && age < 18
  const valid   = name.trim().length > 0 && dob.length > 0 && email.includes('@')

  return (
    <div className="card">
      <p className="text-xs font-semibold tracking-widest text-brand uppercase mb-2">Step 1 of 5</p>
      <h2 className="font-serif text-2xl mb-1">Who&apos;s signing today?</h2>
      <p className="text-gray-500 text-sm mb-6">Enter your details as they appear on your ID.</p>

      <div className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">Full name</label>
          <input className="form-input" value={name} onChange={e => setName(e.target.value)} placeholder="First Last" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">Date of birth</label>
            <input className="form-input" type="date" value={dob} onChange={e => setDob(e.target.value)} />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">Email</label>
            <input className="form-input" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@email.com" />
          </div>
        </div>
      </div>

      {isMinor && (
        <div className="mt-4 bg-amber-50 border border-amber-200 text-amber-700 rounded-xl p-3 text-sm flex gap-2">
          <span>⚠️</span>
          <span>Participant is under 18. A guardian signature will be required before this waiver is valid.</span>
        </div>
      )}

      <div className="flex gap-3 mt-6">
        <button onClick={onBack} className="btn-secondary">← Back</button>
        <button onClick={() => onNext({ fullName: name, dob, email, isMinor: isMinor ?? false })} disabled={!valid} className="btn-primary">
          Continue →
        </button>
      </div>
    </div>
  )
}
