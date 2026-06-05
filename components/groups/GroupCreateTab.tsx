'use client'
import { useState } from 'react'
import { ActivityKey, ACTIVITY_LABELS } from '@/lib/document-engine'

type InviteMethod = 'individual' | 'group_link' | 'csv' | 'kiosk'
type Step = 'details' | 'invite' | 'confirm'

interface Props { onCreated: () => void }

const INVITE_OPTIONS: { key: InviteMethod; icon: string; title: string; desc: string; best: string }[] = [
  { key:'individual', icon:'✉️', title:'Individual links',   desc:'Each participant receives a unique signing link via email. Best audit trail.',        best:'Best completion rate' },
  { key:'group_link', icon:'🔗', title:'Shared group link',  desc:'One URL shared with the whole group — each person signs their own waiver.',           best:'Easiest to distribute' },
  { key:'csv',        icon:'📁', title:'CSV upload',         desc:'Upload a roster CSV. LIABL pre-fills names and emails, sends invites automatically.',  best:'Large organised groups' },
  { key:'kiosk',      icon:'📱', title:'Kiosk on arrival',   desc:'No pre-arrival signing. Participants sign on a shared device at check-in.',            best:'Walk-in operations' },
]

export default function GroupCreateTab({ onCreated }: Props) {
  const [step,      setStep]      = useState<Step>('details')
  const [groupName, setGroupName] = useState('')
  const [activity,  setActivity]  = useState<ActivityKey>('kayak')
  const [date,      setDate]      = useState('')
  const [time,      setTime]      = useState('09:00')
  const [platform,  setPlatform]  = useState('manual')
  const [bookingRef,setBookingRef]= useState('')
  const [invite,    setInvite]    = useState<InviteMethod>('individual')
  const [created,   setCreated]   = useState(false)

  function create() {
    setCreated(true)
    setTimeout(() => { onCreated() }, 1800)
  }

  if (created) {
    return (
      <div className="text-center py-16">
        <div className="text-5xl mb-4">✅</div>
        <h2 className="font-serif text-2xl mb-2">Group created</h2>
        <p className="text-gray-500 text-sm">Invites are being sent. Redirecting to All groups…</p>
      </div>
    )
  }

  return (
    <div className="max-w-xl">
      <h1 className="font-serif text-2xl mb-1">Create a group</h1>
      <p className="text-sm text-gray-400 mb-8">Set up a group booking and choose how participants will sign.</p>

      {/* Step indicators */}
      <div className="flex items-center gap-2 mb-8">
        {(['details','invite','confirm'] as Step[]).map((s, i) => (
          <div key={s} className="flex items-center gap-2 flex-1 last:flex-none">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold transition-all ${
              step === s ? 'bg-brand text-white' : i < ['details','invite','confirm'].indexOf(step) ? 'bg-emerald-500 text-white' : 'bg-black/10 text-gray-400'
            }`}>{i+1}</div>
            <span className={`text-xs capitalize ${step === s ? 'text-ink font-medium' : 'text-gray-400'}`}>{s}</span>
            {i < 2 && <div className="flex-1 h-px bg-black/10" />}
          </div>
        ))}
      </div>

      {/* Step 1: Group details */}
      {step === 'details' && (
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">Group name</label>
            <input className="form-input" value={groupName} onChange={e=>setGroupName(e.target.value)} placeholder="e.g. Smith Family Adventure" />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">Activity type</label>
            <div className="grid grid-cols-2 gap-2">
              {(['kayak','hike','atv','climb'] as ActivityKey[]).map(a => (
                <button key={a} onClick={()=>setActivity(a)}
                  className={`text-left p-3 rounded-xl border text-sm transition-all ${
                    activity===a ? 'border-brand bg-brand/5 text-brand font-medium' : 'border-black/10 bg-surface text-gray-600'
                  }`}>
                  {{ kayak:'🚣', hike:'🥾', atv:'🏎️', climb:'🧗' }[a]} {ACTIVITY_LABELS[a]}
                </button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Activity date</label>
              <input className="form-input" type="date" value={date} onChange={e=>setDate(e.target.value)} />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Start time</label>
              <input className="form-input" type="time" value={time} onChange={e=>setTime(e.target.value)} />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">Booking platform</label>
            <select className="form-input" value={platform} onChange={e=>setPlatform(e.target.value)}>
              <option value="manual">Manual — no integration</option>
              <option value="fareharbor">FareHarbor</option>
              <option value="rezdy">Rezdy</option>
              <option value="xola">Xola</option>
              <option value="bokun">Bókun</option>
            </select>
          </div>
          {platform !== 'manual' && (
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Booking reference</label>
              <div className="flex gap-2">
                <input className="form-input flex-1" value={bookingRef} onChange={e=>setBookingRef(e.target.value)} placeholder="e.g. RKC-4821" />
                <button className="px-4 py-2 bg-brand text-white rounded-xl text-sm font-medium hover:opacity-90 transition-colors shrink-0">
                  Pull roster
                </button>
              </div>
              <p className="text-xs text-gray-400 mt-1">LIABL will fetch the participant list from {platform} automatically.</p>
            </div>
          )}
          <button onClick={()=>setStep('invite')} disabled={!groupName.trim() || !date}
            className="btn-primary">
            Next: choose invite method →
          </button>
        </div>
      )}

      {/* Step 2: Invite method */}
      {step === 'invite' && (
        <div className="space-y-4">
          <div className="space-y-3">
            {INVITE_OPTIONS.map(opt => (
              <button key={opt.key} onClick={()=>setInvite(opt.key)}
                className={`w-full text-left p-4 rounded-xl border transition-all ${
                  invite===opt.key ? 'border-brand bg-brand/5' : 'border-black/10 bg-surface hover:border-brand/30'
                }`}>
                <div className="flex items-start gap-3">
                  <span className="text-xl shrink-0">{opt.icon}</span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <span className="font-medium text-sm text-ink">{opt.title}</span>
                      <span className="text-xs bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-full">{opt.best}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1 leading-relaxed">{opt.desc}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
          <div className="flex gap-3">
            <button onClick={()=>setStep('details')} className="btn-secondary">← Back</button>
            <button onClick={()=>setStep('confirm')} className="btn-primary">Review & create →</button>
          </div>
        </div>
      )}

      {/* Step 3: Confirm */}
      {step === 'confirm' && (
        <div>
          <div className="bg-white rounded-2xl border border-black/10 p-5 mb-5 space-y-3">
            {[
              { label:'Group name',       value: groupName },
              { label:'Activity',         value: `${{ kayak:'🚣', hike:'🥾', atv:'🏎️', climb:'🧗' }[activity]} ${ACTIVITY_LABELS[activity]}` },
              { label:'Date & time',      value: `${date} at ${time}` },
              { label:'Platform',         value: platform === 'manual' ? 'Manual' : platform },
              { label:'Booking ref',      value: bookingRef || '—' },
              { label:'Invite method',    value: INVITE_OPTIONS.find(o=>o.key===invite)?.title ?? '' },
            ].map(({ label, value }) => (
              <div key={label} className="flex justify-between text-sm">
                <span className="text-gray-500">{label}</span>
                <span className="font-medium text-ink">{value}</span>
              </div>
            ))}
          </div>
          <div className="flex gap-3">
            <button onClick={()=>setStep('invite')} className="btn-secondary">← Back</button>
            <button onClick={create} className="btn-primary">✓ Create group &amp; send invites</button>
          </div>
        </div>
      )}
    </div>
  )
}
