'use client'
import { useState } from 'react'
import { Group } from '@/app/groups/page'

interface Participant {
  id: string; name: string; initials: string; email: string
  status: 'signed' | 'pending' | 'guardian_required' | 'exception'
  activity: string; signedAt?: string; isMinor?: boolean
}

const BG = ['#E6F1FB','#E1F5EE','#EEE9FF','#FAEEDA','#FBEAF0','#EAF3DE']
const FG = ['#185FA5','#0F6E56','#4B2ACF','#854F0B','#993556','#3B6D11']

function initials(name: string) { return name.split(' ').map(n=>n[0]).join('').toUpperCase().slice(0,2) }

const ROSTER_BY_GROUP: Record<string, Participant[]> = {
  g1: [
    { id:'p1', name:'Jordan Rivera',  initials:'JR', email:'j.rivera@email.com',  status:'signed',  activity:'Kayaking', signedAt:'8:42 AM' },
    { id:'p2', name:'Morgan Rivera',  initials:'MR', email:'m.rivera@email.com',  status:'signed',  activity:'Kayaking', signedAt:'8:44 AM' },
    { id:'p3', name:'Sam Rivera',     initials:'SR', email:'s.rivera@email.com',  status:'signed',  activity:'Kayaking', signedAt:'8:50 AM' },
    { id:'p4', name:'Alex Torres',    initials:'AT', email:'a.torres@email.com',  status:'signed',  activity:'Kayaking', signedAt:'8:55 AM' },
    { id:'p5', name:'Priya Nair',     initials:'PN', email:'p.nair@email.com',    status:'signed',  activity:'Kayaking', signedAt:'9:01 AM' },
    { id:'p6', name:'Devon Park',     initials:'DP', email:'d.park@email.com',    status:'signed',  activity:'Kayaking', signedAt:'9:03 AM' },
    { id:'p7', name:'Casey Morgan',   initials:'CM', email:'c.morgan@email.com',  status:'signed',  activity:'Kayaking', signedAt:'9:06 AM' },
    { id:'p8', name:'Riley Chen',     initials:'RC', email:'r.chen@email.com',    status:'signed',  activity:'Kayaking', signedAt:'9:10 AM' },
  ],
  g2: [
    { id:'p1', name:'Tyler Brooks',   initials:'TB', email:'t.brooks@corp.com',   status:'signed',   activity:'ATV Tour', signedAt:'10:12 AM' },
    { id:'p2', name:'Sasha Kim',      initials:'SK', email:'s.kim@corp.com',      status:'signed',   activity:'ATV Tour', signedAt:'10:18 AM' },
    { id:'p3', name:'Omar Hassan',    initials:'OH', email:'o.hassan@corp.com',   status:'signed',   activity:'ATV Tour', signedAt:'10:21 AM' },
    { id:'p4', name:'Anya Sharma',    initials:'AS', email:'a.sharma@corp.com',   status:'signed',   activity:'ATV Tour', signedAt:'10:25 AM' },
    { id:'p5', name:'Lucas West',     initials:'LW', email:'l.west@corp.com',     status:'pending',  activity:'ATV Tour' },
    { id:'p6', name:'Mia Chen',       initials:'MC', email:'m.chen@corp.com',     status:'pending',  activity:'ATV Tour' },
    { id:'p7', name:'Jamie Lee',      initials:'JL', email:'j.lee@corp.com',      status:'exception',activity:'ATV Tour', isMinor:false },
    { id:'p8', name:'Drew Patel',     initials:'DP', email:'d.patel@corp.com',    status:'exception',activity:'ATV Tour' },
    { id:'p9', name:'Quinn Adams',    initials:'QA', email:'q.adams@corp.com',    status:'signed',   activity:'ATV Tour', signedAt:'10:31 AM' },
  ],
  g3: [
    { id:'p1',  name:'Student A',   initials:'SA', email:'parent1@email.com', status:'signed',           activity:'Hiking', signedAt:'1:05 PM', isMinor:true },
    { id:'p2',  name:'Student B',   initials:'SB', email:'parent2@email.com', status:'signed',           activity:'Hiking', signedAt:'1:08 PM', isMinor:true },
    { id:'p3',  name:'Student C',   initials:'SC', email:'parent3@email.com', status:'signed',           activity:'Hiking', signedAt:'1:10 PM', isMinor:true },
    { id:'p4',  name:'Student D',   initials:'SD', email:'parent4@email.com', status:'guardian_required',activity:'Hiking', isMinor:true },
    { id:'p5',  name:'Student E',   initials:'SE', email:'parent5@email.com', status:'pending',          activity:'Hiking', isMinor:true },
    { id:'p6',  name:'Ms. Torres',  initials:'MT', email:'m.torres@school.edu',status:'signed',          activity:'Hiking', signedAt:'12:55 PM' },
    { id:'p7',  name:'Mr. Patel',   initials:'MP', email:'r.patel@school.edu', status:'signed',          activity:'Hiking', signedAt:'12:58 PM' },
  ],
}

function getDefaultRoster(g: Group): Participant[] {
  return Array.from({ length: g.total }, (_, i) => ({
    id: `p${i+1}`, name: `Participant ${i+1}`,
    initials: `P${i+1}`, email: `participant${i+1}@email.com`,
    status: i < g.signed ? 'signed' : 'pending' as 'signed'|'pending',
    activity: g.activity,
    signedAt: i < g.signed ? `${8 + Math.floor(i/4)}:${String((i*7)%60).padStart(2,'0')} AM` : undefined,
  }))
}

interface Props { group: Group | null; onBack: () => void }

export default function GroupRosterTab({ group, onBack }: Props) {
  const [showAddWalkin, setShowAddWalkin] = useState(false)
  const [walkinName,    setWalkinName]    = useState('')
  const [walkinEmail,   setWalkinEmail]   = useState('')

  if (!group) {
    return (
      <div className="text-center py-16 text-gray-400">
        <div className="text-4xl mb-3">👥</div>
        <div className="font-medium text-gray-500 mb-2">No group selected</div>
        <button onClick={onBack} className="text-brand text-sm underline">← Back to all groups</button>
      </div>
    )
  }

  const roster = ROSTER_BY_GROUP[group.id] ?? getDefaultRoster(group)
  const signed  = roster.filter(p => p.status === 'signed').length
  const pct     = Math.round(signed / roster.length * 100)

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <button onClick={onBack} className="text-gray-400 hover:text-ink transition-colors text-sm">← All groups</button>
        <span className="text-gray-300">/</span>
        <span className="text-sm font-medium text-ink">{group.name}</span>
      </div>

      {/* Group header */}
      <div className="bg-white rounded-2xl border border-black/10 p-5 mb-6">
        <div className="flex items-start justify-between flex-wrap gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-2xl">{group.emoji}</span>
              <h2 className="font-serif text-xl">{group.name}</h2>
            </div>
            <div className="text-sm text-gray-400">{group.activity} · {group.date}</div>
            {group.bookingRef && (
              <div className="text-xs text-gray-400 mt-1">
                Booking ref: <span className="font-mono text-gray-600">{group.bookingRef}</span> · via {group.source}
              </div>
            )}
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setShowAddWalkin(true)}
              className="text-sm px-4 py-2 rounded-xl border border-black/20 text-gray-600 hover:bg-surface transition-colors">
              + Add walk-in
            </button>
            <button className="text-sm px-4 py-2 rounded-xl bg-brand text-white hover:opacity-90 transition-colors">
              Resend invites ({roster.filter(p=>p.status==='pending').length})
            </button>
          </div>
        </div>

        <div className="mt-4">
          <div className="flex justify-between text-xs text-gray-500 mb-1.5">
            <span>{signed} of {roster.length} signed</span>
            <span>{pct}% complete</span>
          </div>
          <div className="w-full h-2 bg-black/8 rounded-full overflow-hidden">
            <div className={`h-full rounded-full transition-all ${pct===100?'bg-emerald-500':'bg-brand'}`} style={{width:`${pct}%`}} />
          </div>
        </div>
      </div>

      {/* Add walk-in form */}
      {showAddWalkin && (
        <div className="bg-brand/5 border border-brand/20 rounded-xl p-4 mb-4">
          <div className="font-medium text-sm text-ink mb-3">Add walk-in participant</div>
          <div className="grid grid-cols-2 gap-3 mb-3">
            <div>
              <label className="block text-xs text-gray-500 mb-1">Full name</label>
              <input className="form-input" value={walkinName} onChange={e=>setWalkinName(e.target.value)} placeholder="First Last" />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Email</label>
              <input className="form-input" type="email" value={walkinEmail} onChange={e=>setWalkinEmail(e.target.value)} placeholder="email@example.com" />
            </div>
          </div>
          <div className="flex gap-2">
            <button onClick={()=>setShowAddWalkin(false)} className="btn-secondary text-sm py-2">Cancel</button>
            <button className="btn-primary text-sm py-2" style={{flex:'unset',width:'auto',padding:'8px 20px'}}>Send waiver link</button>
          </div>
        </div>
      )}

      {/* Roster list */}
      <div className="bg-white rounded-2xl border border-black/10 overflow-hidden">
        <div className="px-5 py-3 border-b border-black/8 text-xs font-semibold text-gray-400 uppercase tracking-wider">
          Participants ({roster.length})
        </div>
        {roster.map((p, i) => (
          <div key={p.id} className="flex items-center gap-3 px-5 py-3.5 border-b border-black/5 last:border-0 hover:bg-surface/60 transition-colors">
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold shrink-0"
              style={{ background: BG[i%BG.length], color: FG[i%FG.length] }}>
              {p.initials}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-medium text-ink">{p.name}</span>
                {p.isMinor && <span className="text-xs bg-amber-50 text-amber-600 px-1.5 py-0.5 rounded-full">Minor</span>}
              </div>
              <div className="text-xs text-gray-400">{p.email}</div>
            </div>
            <div className="text-xs text-gray-400 shrink-0">{p.signedAt ?? '—'}</div>
            <div className="shrink-0">
              {p.status === 'signed'            && <span className="status-signed">Signed</span>}
              {p.status === 'pending'           && <span className="status-pending">Pending</span>}
              {p.status === 'guardian_required' && <span className="status-guardian">Guardian needed</span>}
              {p.status === 'exception'         && <span className="text-xs bg-red-50 text-red-600 border border-red-200 px-2 py-0.5 rounded-full font-medium">Exception</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
