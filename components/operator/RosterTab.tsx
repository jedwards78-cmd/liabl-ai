'use client'
import { useState, useEffect } from 'react'
import { calculateRiskScore } from '@/components/RiskScore'

interface Participant { full_name:string; email:string }
interface WaiverRow { id:string; signed_at:string|null; activity_key:string; is_minor:boolean; participants:Participant|null }
type Filter = 'all'|'signed'|'pending'

const DEMO: WaiverRow[] = [
  {id:'1',signed_at:'2026-05-26T08:42:00Z',activity_key:'kayak',is_minor:false,participants:{full_name:'Jordan Rivera',  email:'j@email.com'}},
  {id:'2',signed_at:'2026-05-26T08:51:00Z',activity_key:'hike', is_minor:true, participants:{full_name:'Mia Chen',       email:'m@email.com'}},
  {id:'3',signed_at:'2026-05-26T08:53:00Z',activity_key:'atv',  is_minor:false,participants:{full_name:'Tyler Brooks',   email:'t@email.com'}},
  {id:'4',signed_at:null,                  activity_key:'climb', is_minor:false,participants:{full_name:'Sasha Kim',     email:'s@email.com'}},
  {id:'5',signed_at:'2026-05-26T08:58:00Z',activity_key:'kayak',is_minor:false,participants:{full_name:'Omar Hassan',    email:'o@email.com'}},
  {id:'6',signed_at:'2026-05-26T09:02:00Z',activity_key:'atv',  is_minor:false,participants:{full_name:'Priya Nair',    email:'p@email.com'}},
  {id:'7',signed_at:null,                  activity_key:'hike',  is_minor:false,participants:{full_name:'Lucas West',    email:'l@email.com'}},
  {id:'8',signed_at:'2026-05-26T09:05:00Z',activity_key:'climb', is_minor:false,participants:{full_name:'Anya Sharma',  email:'a@email.com'}},
  {id:'9',signed_at:null,                  activity_key:'hike',  is_minor:false,participants:{full_name:'Casey Morgan',  email:'c@email.com'}},
]

import { IconKayak, IconHike, IconATV, IconClimb } from '@/components/icons'

const ICONS: Record<string, React.ComponentType<{size?:number;color?:string}>> = {
  kayak: IconKayak, hike: IconHike, atv: IconATV, climb: IconClimb,
}
const ICON_COLOR: Record<string, string> = { kayak:'#4B2ACF', hike:'#15803D', atv:'#EA580C', climb:'#0891B2' }
const EMOJI:  Record<string,string> = { kayak:'', hike:'', atv:'', climb:'' }
const LABELS: Record<string,string> = { kayak:'Whitewater Kayaking', hike:'Canyon Hiking', atv:'ATV Tour', climb:'Rock Climbing' }
const BG = ['#E6F1FB','#E1F5EE','#EEE9FF','#FAEEDA','#FBEAF0','#EAF3DE']
const FG = ['#185FA5','#0F6E56','#4B2ACF','#854F0B','#993556','#3B6D11']
const RETURNING = new Set(['1','5'])

const RISK_STYLES: Record<string,{ badge:string; bar:string; label:string }> = {
  low:      { badge:'text-emerald-700 bg-emerald-50 border-emerald-200', bar:'bg-emerald-500', label:'Low Risk'      },
  moderate: { badge:'text-blue-700    bg-blue-50    border-blue-200',    bar:'bg-blue-500',    label:'Moderate Risk' },
  elevated: { badge:'text-amber-700   bg-amber-50   border-amber-200',   bar:'bg-amber-500',   label:'Elevated Risk' },
  high:     { badge:'text-red-700     bg-red-50     border-red-200',     bar:'bg-red-500',     label:'High Risk'     },
}

const DEMO_CLAUSES = [
  { title:'Assumption of Risk',    highlight:false, body:'Participant acknowledges the inherent risks of Whitewater Kayaking and voluntarily assumes full responsibility for any injuries or damages.' },
  { title:'Release of Liability',  highlight:false, body:'Participant releases the operator from all liability arising from participation in Whitewater Kayaking, including acts of negligence.' },
  { title:'Water Hazards',         highlight:true,  body:'Participant acknowledges Class III–IV rapids, submerged obstacles, and risk of capsize. Confirms they are a confident swimmer.' },
  { title:'Equipment & Safety',    highlight:false, body:'Participant confirms receipt of a full safety briefing and proper fitting of all required safety equipment.' },
]

function initials(name: string) {
  return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
}

// ── Expanded waiver detail panel ──────────────────────────────
function WaiverDetail({ row, index, onClose }: { row:WaiverRow; index:number; onClose:()=>void }) {
  const name    = row.participants?.full_name ?? 'Unknown'
  const email   = row.participants?.email ?? ''
  const time    = row.signed_at ? new Date(row.signed_at).toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'}) : '—'
  const isRet   = RETURNING.has(row.id)
  const docId   = `doc_${row.id}a1b2`
  const risk    = calculateRiskScore({ activityKey:row.activity_key, isMinor:row.is_minor })
  const rs      = RISK_STYLES[risk.level]

  return (
    <div className="border-t border-brand/20 bg-brand/5 animate-fade-up">
      <div className="px-5 py-5">

        {/* Header row */}
        <div className="flex items-start justify-between gap-3 mb-4 flex-wrap">
          <div>
            <div className="font-semibold text-ink">{name}</div>
            <div className="text-xs text-gray-400">{email} · {LABELS[row.activity_key]} · Signed {time}</div>
            <div className="font-mono text-xs text-gray-400 mt-0.5">{docId}</div>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-ink text-lg leading-none">×</button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

          {/* Left — document summary */}
          <div className="space-y-3">
            {/* Participant info */}
            <div className="bg-white rounded-xl border border-black/10 p-4 space-y-2 text-xs">
              <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Participant</div>
              {[
                { l:'Full name',   v: name },
                { l:'Email',       v: email },
                { l:'LIABL Pass',  v: isRet ? '✦ Active' : 'First visit' },
                { l:'Minor',       v: row.is_minor ? 'Yes — guardian signed' : 'No' },
                { l:'Signed at',   v: time },
                { l:'IP address',  v: '98.112.44.21' },
                { l:'Device',      v: 'Chrome 124 / macOS' },
                { l:'Doc ID',      v: docId },
                { l:'Hash',        v: 'SHA-256: 7f3a…9c21' },
                { l:'Legal basis', v: 'ESIGN Act · UETA' },
              ].map(({l,v}) => (
                <div key={l} className="flex gap-3">
                  <span className="text-gray-400 w-24 shrink-0">{l}</span>
                  <span className="font-mono text-ink font-medium truncate">{v}</span>
                </div>
              ))}
            </div>

            {/* Waiver clauses summary */}
            <div className="bg-white rounded-xl border border-black/10 overflow-hidden">
              <div className="px-4 py-2.5 border-b border-black/8 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Signed Clauses
              </div>
              {DEMO_CLAUSES.map((c, i) => (
                <div key={i} className={`px-4 py-3 border-b border-black/5 last:border-0 ${c.highlight ? 'bg-brand/5' : ''}`}>
                  <div className={`text-xs font-semibold mb-0.5 ${c.highlight ? 'text-brand' : 'text-gray-500'}`}>
                    {c.highlight && '⚡ '}{c.title}
                  </div>
                  <p className="text-xs text-gray-400 leading-relaxed">{c.body}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Intelligent Risk Profile (operator-only) */}
          <div className="space-y-3">
            <div className={`rounded-xl border p-4 ${rs.badge.split(' ').slice(1).join(' ')}`}>
              <div className="flex items-center justify-between mb-3">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider mb-0.5" style={{ color:'inherit' }}>
                    ⚡ Intelligent Risk Profile
                  </div>
                  <div className={`text-xs font-medium ${rs.badge.split(' ')[0]}`}>{rs.label}</div>
                </div>
                <div className={`font-mono text-3xl font-bold ${rs.badge.split(' ')[0]}`}>{risk.score}</div>
              </div>

              <div className="mb-3">
                <div className="h-2 bg-black/10 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full transition-all duration-700 ${rs.bar}`} style={{ width:`${risk.score}%` }} />
                </div>
                <div className="flex justify-between text-xs mt-1 opacity-60">
                  <span>0</span><span>50</span><span>100</span>
                </div>
              </div>

              {risk.factors.length > 0 && (
                <div className="mb-3">
                  <div className="text-xs font-medium mb-1.5 opacity-70">Contributing factors</div>
                  <div className="flex flex-wrap gap-1.5">
                    {risk.factors.map(f => (
                      <span key={f} className={`text-xs px-2 py-0.5 rounded-full border bg-white/50 ${rs.badge.split(' ')[0]}`}>{f}</span>
                    ))}
                  </div>
                </div>
              )}

              <p className={`text-xs leading-relaxed opacity-80`}>
                {risk.level === 'high'     && 'Supervisor review recommended before activity commencement.'}
                {risk.level === 'elevated' && 'Additional safety briefing recommended. Notify lead guide.'}
                {risk.level === 'moderate' && 'Standard procedures apply. Monitor during activity.'}
                {risk.level === 'low'      && 'No additional precautions required.'}
              </p>
            </div>

            {/* Audit trail mini */}
            <div className="bg-white rounded-xl border border-black/10 overflow-hidden">
              <div className="px-4 py-2.5 border-b border-black/8 text-xs font-semibold text-gray-400 uppercase tracking-wider">Audit Trail</div>
              {[
                { t:'09:04:12', e:'waiver.signed',    d:`IP 98.112.44.21 · ${docId}` },
                { t:'09:03:58', e:'document.viewed',  d:'All clauses reviewed' },
                { t:'09:03:44', e:'waiver.generated', d:`${LABELS[row.activity_key]} · ${DEMO_CLAUSES.filter(c=>c.highlight).length} adaptive` },
                { t:'09:03:40', e:'session.started',  d:'Entry via operator QR code' },
              ].map((ev, i) => (
                <div key={i} className="flex items-start gap-2 px-4 py-2.5 border-b border-black/5 last:border-0 text-xs">
                  <span className="font-mono text-gray-400 shrink-0 w-16">{ev.t}</span>
                  <span className="bg-brand/10 text-brand px-1.5 py-0.5 rounded-full shrink-0 text-xs">{ev.e}</span>
                  <span className="text-gray-400 leading-relaxed">{ev.d}</span>
                </div>
              ))}
            </div>

            {/* Action buttons */}
            <div className="flex gap-2">
              <button className="text-xs px-3 py-2 rounded-xl border border-black/20 text-gray-600 hover:bg-white transition-colors flex-1">✉ Email copy</button>
              <button className="text-xs px-3 py-2 rounded-xl border border-black/20 text-gray-600 hover:bg-white transition-colors flex-1">↓ Download PDF</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Main component ─────────────────────────────────────────────
export default function RosterTab() {
  const [roster,   setRoster]   = useState<WaiverRow[]>(DEMO)
  const [filter,   setFilter]   = useState<Filter>('all')
  const [expanded, setExpanded] = useState<string|null>(null)

  useEffect(() => {
    async function load() {
      try {
        const { createClient } = await import('@/lib/supabase')
        const supabase = createClient()
        const { data } = await supabase
          .from('waivers')
          .select('id,signed_at,activity_key,is_minor,participants(full_name,email)')
          .order('created_at', { ascending:true }).limit(50)
        if (data && data.length > 0) {
          const rows = data.map((row: Record<string,unknown>) => ({
            id: row.id as string, signed_at: row.signed_at as string|null,
            activity_key: row.activity_key as string, is_minor: row.is_minor as boolean,
            participants: Array.isArray(row.participants)
              ? (row.participants[0] as Participant) ?? null
              : row.participants as Participant|null,
          }))
          setRoster(rows)
        }
      } catch { /* use demo */ }
    }
    load()
  }, [])

  const visible = roster.filter(w =>
    filter === 'signed'  ? !!w.signed_at :
    filter === 'pending' ? !w.signed_at  : true
  )
  const signed  = roster.filter(w => !!w.signed_at).length
  const pending = roster.filter(w => !w.signed_at).length
  const pct     = Math.round(signed / Math.max(roster.length, 1) * 100)

  function toggleExpand(id: string, isSigned: boolean) {
    if (!isSigned) return
    setExpanded(prev => prev === id ? null : id)
  }

  return (
    <div>
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="font-serif text-2xl" style={{ letterSpacing:'-0.01em' }}>Check-in Roster</h1>
          <p className="text-sm text-gray-400 mt-1">{new Date().toLocaleDateString('en-US',{weekday:'long',month:'long',day:'numeric'})}</p>
        </div>
        <span className="bg-brand/10 text-brand border border-brand/20 text-xs font-medium px-3 py-1.5 rounded-full">AM-04 · 9:00 AM</span>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-4">
        {[
          { label:'Signed',   value: signed,   color:'text-emerald-600' },
          { label:'Pending',  value: pending,  color:'text-amber-600'   },
          { label:'Complete', value:`${pct}%`, color:'text-brand'       },
        ].map(({ label, value, color }) => (
          <div key={label} className="bg-white rounded-xl border border-black/10 p-4">
            <div className={`text-2xl font-semibold ${color}`} style={{ letterSpacing:'-0.02em' }}>{value}</div>
            <div className="text-xs text-gray-400 uppercase tracking-wider mt-1">{label}</div>
          </div>
        ))}
      </div>

      <div className="w-full h-1.5 bg-black/8 rounded-full mb-6 overflow-hidden">
        <div className="h-full bg-brand rounded-full transition-all" style={{ width:`${pct}%` }} />
      </div>

      <div className="bg-white rounded-2xl border border-black/10 overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 border-b border-black/8">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Participants</span>
            <span className="text-xs text-gray-400 hidden sm:block">· Click a signed row to expand waiver detail &amp; AI risk</span>
          </div>
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

        {visible.map((w, i) => {
          const name    = w.participants?.full_name ?? 'Unknown'
          const time    = w.signed_at ? new Date(w.signed_at).toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'}) : '—'
          const isRet   = RETURNING.has(w.id)
          const isSigned = !!w.signed_at
          const isOpen  = expanded === w.id
          const risk    = calculateRiskScore({ activityKey:w.activity_key, isMinor:w.is_minor })
          const rs      = RISK_STYLES[risk.level]

          return (
            <div key={w.id}>
              {/* Row */}
              <div
                onClick={() => toggleExpand(w.id, isSigned)}
                className={`flex items-center gap-3 px-4 py-3 border-b border-black/5 transition-colors ${
                  isSigned ? 'hover:bg-brand/5 cursor-pointer' : 'opacity-60'
                } ${isOpen ? 'bg-brand/5 border-b-0' : ''}`}>
                <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-semibold shrink-0"
                  style={{ background:BG[i%BG.length], color:FG[i%FG.length] }}>
                  {initials(name)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-medium truncate">{name}</span>
                    {isRet && <span className="text-xs bg-brand/10 text-brand px-1.5 py-0.5 rounded-full shrink-0">✦ Pass</span>}
                  </div>
                  <div className="text-xs text-gray-400 inline-flex items-center gap-1.5">
                    {(() => {
                      const Icon = ICONS[w.activity_key]
                      const color = ICON_COLOR[w.activity_key]
                      return Icon ? <Icon size={12} color={color}/> : null
                    })()}
                    {LABELS[w.activity_key]} · {time}
                  </div>
                </div>

                {/* AI Risk badge — labeled */}
                {isSigned && (
                  <div className={`flex items-center gap-1 text-xs px-2.5 py-1 rounded-full border font-medium shrink-0 ${rs.badge}`}>
                    <span>⚡</span>
                    <span className="hidden sm:inline">AI Risk · </span>
                    <span>{risk.score}</span>
                  </div>
                )}

                {w.is_minor
                  ? <span className="status-guardian shrink-0">Guardian</span>
                  : w.signed_at
                  ? <span className={`status-signed shrink-0 flex items-center gap-1`}>Signed {isOpen ? '▲' : '▼'}</span>
                  : <span className="status-pending shrink-0">Pending</span>}
              </div>

              {/* Expanded detail */}
              {isOpen && (
                <WaiverDetail row={w} index={i} onClose={() => setExpanded(null)} />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
