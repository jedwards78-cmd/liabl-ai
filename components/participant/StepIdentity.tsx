'use client'
import { useState } from 'react'

interface Props {
  onNext: (v:{ fullName:string; dob:string; email:string; isMinor:boolean })=>void
  onBack: ()=>void
}

export default function StepIdentity({ onNext, onBack }: Props) {
  const [firstName, setFirstName] = useState('')
  const [lastName,  setLastName]  = useState('')
  const [dob,       setDob]       = useState('')
  const [email,     setEmail]     = useState('')

  // Parse MM/DD/YYYY freetext — no calendar picker
  function parseAge(raw: string): number | null {
    const parts = raw.split('/')
    if (parts.length !== 3) return null
    const [mm, dd, yyyy] = parts.map(Number)
    if (!mm || !dd || !yyyy || yyyy < 1900) return null
    const birth = new Date(yyyy, mm - 1, dd)
    if (isNaN(birth.getTime())) return null
    const today = new Date()
    let age = today.getFullYear() - birth.getFullYear()
    const m = today.getMonth() - birth.getMonth()
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--
    return age
  }

  const age     = parseAge(dob)
  const isMinor = age !== null && age < 18
  const dobValid = age !== null
  const valid   = firstName.trim().length > 0 && lastName.trim().length > 0 && dobValid && email.includes('@')

  function submit() {
    if (!valid) return
    onNext({
      fullName: `${firstName.trim()} ${lastName.trim()}`,
      dob,
      email,
      isMinor: isMinor ?? false,
    })
  }

  return (
    <div className="card">
      <p className="text-xs font-semibold tracking-widest text-brand uppercase mb-2">Step 1 of 5</p>
      <h2 className="font-serif text-2xl mb-1" style={{ letterSpacing:'-0.01em' }}>Who&apos;s Signing Today?</h2>
      <p className="text-gray-500 text-sm mb-6">Enter your details as they appear on your ID.</p>

      <div className="space-y-4">
        {/* First Name + Last Name — separate fields */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">First Name</label>
            <input className="form-input" value={firstName} onChange={e=>setFirstName(e.target.value)} placeholder="First Name" />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">Last Name</label>
            <input className="form-input" value={lastName} onChange={e=>setLastName(e.target.value)} placeholder="Last Name" />
          </div>
        </div>

        {/* Date of birth — plain text, no calendar picker */}
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">Date of Birth</label>
          <input
            className={`form-input ${dob && !dobValid ? 'border-red-300 focus:border-red-400' : ''}`}
            type="text"
            inputMode="numeric"
            value={dob}
            onChange={e => setDob(e.target.value)}
            placeholder="MM/DD/YYYY"
            maxLength={10}
          />
          {dob && !dobValid && (
            <p className="text-xs text-red-500 mt-1">Please use MM/DD/YYYY format</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">Email Address</label>
          <input className="form-input" type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@email.com" />
        </div>
      </div>

      {isMinor && (
        <div className="mt-4 bg-amber-50 border border-amber-200 text-amber-700 rounded-xl p-3 text-sm">
          ⚠️ Participant is under 18 — a guardian signature will be required.
        </div>
      )}

      <div className="flex gap-3 mt-6">
        <button onClick={onBack} className="btn-secondary">← Back</button>
        <button onClick={submit} disabled={!valid} className="btn-primary">Continue →</button>
      </div>
    </div>
  )
}
