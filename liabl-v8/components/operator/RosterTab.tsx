'use client'
import { useState, useEffect } from 'react'
import WaiverDetail from './WaiverDetail'

interface Participant { full_name: string; email: string }
interface WaiverRow {
  id: string; signed_at: string | null; activity_key: string
  is_minor: boolean; participants: Participant | null
}
type Filter = 'all' | 'signed' | 'pending'

const DEMO: WaiverRow[] = [
  { id:'1', signed_at:'2026-05-26T08:42:00Z', activity_key:'kayak', is_minor:false, participants:{ full_name:'Jordan Rivera', email:'j@email.com' } },
  { id:'2', signed_at:'2026-05-26T08:51:00Z', activity_key:'hike',  is_minor:true,  participants:{ full_name:'Mia Chen',      email:'m@email.com' } },
  { id:'3', signed_at:'2026-05-26T08:53:00Z', activity_key:'atv',   is_minor:false, participants:{ full_name:'Tyler Brooks',  email:'t@email.com' } },
  { id:'4', signed_at:null,                   activity_key:'climb',  is_minor:false, participants:{ full_name:'Sasha Kim',    email:'s@email.com' } },
  { id:'5', signed_at:'2026-05-26T08:58:00Z', activity_key:'kayak', is_minor:false, participants:{ full_name:'Omar Hassan',   email:'o@email.com' } },
  { id:'6', signed_at:'2026-05-26T09:02:00Z', activity_key:'atv',   is_minor:false, participants:{ full_name:'Priya Nair',    email:'p@email.com' } },
  { id:'7', signed_at:null,                   activity_key:'hike',   is_minor:false, participants:{ full_name:'Lucas West',    email:'l@email.com' } },
  { id:'8', signed_at:'2026-05-26T09:05:00Z', activity_key:'climb',  is_minor:false, participants:{ full_name:'Anya Sharma',  email:'a@email.com' } },
  { id:'9', signed_at:null,                   activity_key:'hike',   is_minor:false, participants:{ full_name:'Casey Morgan',  email:'c@email.com' } },
]

const EMOJI:  Record<string,string> = { kayak:'🚣', hike:'🥾', atv:'🏎️', climb:'🧗' }
const LABELS: Record<string,string> = { kayak:'Whitewater Kayaking', hike:'Canyon Hiking', atv:'ATV Tour', climb:'Rock Climbing' }
const BG = ['#E6F1FB','#E1F5EE','#EEE9FF','#FAEEDA','#FBEAF0','#EAF3DE']
const FG = ['#185FA5','#0F6E56','#4B2ACF','#854F0B','#993556','#3B6D11']
const RETURNING = new Set(['1','5'])

function initials(name: string) { return name.split(' ').map(n=>n[0]).join('').toUpperCase().slice(0,2) }

const DEMO_CLAUSES = [
  { title:'Assumption of Risk', body:'Participant acknowledges the inherent risks of Whitewater Kayaking and voluntarily assumes full responsibility for any injuries or damages.', adaptive:false },
  { title:'Release of Liability', body:'Participant releases the operator from all liability arising from participation in Whitewater Kayaking, including acts of negligence.', adaptive:false },
  { title:'Water Hazards', body:'Participant acknowledges exposure to Class III–IV rapids, submerged obstacles, and risk of capsize. Participant confirms they are a confident swimmer.', adaptive:false },
  { title:'Equipment & Safety Briefing', body:'Participant confirms receipt of a full safety briefing and proper fitting of all required safety equipment.', adaptive:false },
]

export default function RosterTab() {
  const [roster,  setRoster]  = useState<WaiverRow[]>(DEMO)
  const [filter,  setFilter]  = useState<Filter>('all')
  const [selected,setSelected] = useState<WaiverRow | null>(null)

  useEffect(() => {
    async function load() {
      try {
        const { createClient } = await import('@/lib/supabase')
        const supabase = createClient()
        const { data } = await supabase
          .from('waivers')
          .select('id, signed_at, activity_key, is_minor, participants(full_name, email)')
          .order('created_at', { ascending: true }).limit(50)
        if (data && data.length > 0) {
          const rows = data.map((row: Record<string, unknown>) => ({
            id: row.id as string, signed_at: row.signed_at as string | null,
            activity_key: row.activity_key as string, is_minor: row.is_minor as boolean,
            participants: Array.isArray(row.participants)
              ? (row.participants[0] as Participant) ?? null
              : row.participants as Participant | null,
          }))
          setRoster(rows)
        }
      } catch { /* use demo */ }
    }
    load()
  }, [])

  // If a waiver is selected, show detail view
  if (selected) {
    const name = selected.participants?.full_name ?? 'Unknown'
    const email = selected.participants?.email ?? ''
    const isRet = RETURNING.has(selected.id)
    return (
      <WaiverDetail
        participant={{
          name,
          email,
          dob: '1992-05-14',
          activity: LABELS[selected.activity_key] ?? selected.activity_key,
          signedAt: selected.signed_at
            ? new Date(selected.signed_at).toLocaleTimeString([], { hour:'2-digit', minute:'2-digit' })
            : '—',
          ip: '98.112.44.21',
          device: 'Chrome 124 / macOS',
          docId: `doc_${selected.id}a1b2`,
          hash: 'sha256:7f3a...9c21',
          isMinor: selected.is_minor,
          isReturning: isRet,
          visitCount: isRet ? 7 : 1,
          healthFlag: null,
          clauses: DEMO_CLAUSES,
        }}
        onBack={() => setSelected(null)}
      />
    )
  }

  const visible = roster.filter(w =>
    filter === 'signed' ? !!w.signed_at : filter === 'pending' ? !w.signed_at : true
  )
  const signed  = roster.filter(w => !!w.signed_at).length
  const pending = roster.filter(w => !w.signed_at).length
  const pct     = Math.round(signed / Math.max(roster.length, 1) * 100)

  return (
    <div>
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="font-serif text-2xl">Check-in roster</h1>
          <p className="text-sm text-gray-400 mt-1">
            {new Date().toLocaleDateString('en-US', { weekday:'long', month:'long', day:'numeric' })}
          </p>
        </div>
        <span className="bg-brand/10 text-brand border border-brand/20 text-xs font-medium px-3 py-1.5 rounded-full">
          AM-04 · 9:00 AM
        </span>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-4">
        {[
          { label:'Signed',   value: signed,   color:'text-emerald-600' },
          { label:'Pending',  value: pending,  color:'text-amber-600'   },
          { label:'Complete', value:`${pct}%`, color:'text-brand'       },
        ].map(({ label, value, color }) => (
          <div key={label} className="bg-white rounded-xl border border-black/10 p-4">
            <div className={`text-2xl font-semibold ${color}`}>{value}</div>
            <div className="text-xs text-gray-400 uppercase tracking-wider mt-1">{label}</div>
          </div>
        ))}
      </div>

      <div className="w-full h-1.5 bg-black/8 rounded-full mb-6 overflow-hidden">
        <div className="h-full bg-brand rounded-full transition-all duration-500" style={{ width:`${pct}%` }} />
      </div>

      <div className="bg-white rounded-2xl border border-black/10 overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 border-b border-black/8">
          <span className="text-sm font-medium">Participants</span>
          <div className="flex items-center gap-3">
            <span className="text-xs text-gray-400">Click a signed waiver to view details</span>
            <div className="flex gap-1.5">
              {(['all','signed','pending'] as Filter[]).map(f => (
                <button key={f} onClick={() => setFilter(f)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                    filter === f ? 'bg-brand text-white' : 'bg-surface text-gray-500 hover:bg-black/5'
                  }`}>
                  {f.charAt(0).toUpperCase() + f.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {visible.map((w, i) => {
          const name       = w.participants?.full_name ?? 'Unknown'
          const time       = w.signed_at ? new Date(w.signed_at).toLocaleTimeString([], { hour:'2-digit', minute:'2-digit' }) : '—'
          const isReturning = RETURNING.has(w.id)
          const isSigned   = !!w.signed_at
          return (
            <div key={w.id}
              onClick={() => isSigned && setSelected(w)}
              className={`flex items-center gap-3 px-4 py-3 border-b border-black/5 last:border-0 transition-colors ${
                isSigned ? 'hover:bg-brand/5 cursor-pointer' : 'opacity-60'
              }`}>
              <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-semibold shrink-0"
                style={{ background: BG[i % BG.length], color: FG[i % FG.length] }}>
                {initials(name)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-medium truncate">{name}</span>
                  {isReturning && <span className="text-xs bg-brand/10 text-brand px-1.5 py-0.5 rounded-full shrink-0">✦ Pass</span>}
                </div>
                <div className="text-xs text-gray-400">{EMOJI[w.activity_key]} {LABELS[w.activity_key]} · {time}</div>
              </div>
              {w.is_minor    ? <span className="status-guardian shrink-0">Guardian signed</span>
              : w.signed_at  ? <span className="status-signed shrink-0 flex items-center gap-1">Signed <span className="text-gray-300">→</span></span>
              :                <span className="status-pending shrink-0">Pending</span>}
            </div>
          )
        })}
      </div>
    </div>
  )
}
