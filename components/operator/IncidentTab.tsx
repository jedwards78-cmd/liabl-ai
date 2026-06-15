'use client'
import { useState } from 'react'

type IncidentStatus = 'open' | 'notified' | 'investigating' | 'closed'

interface Incident {
  id:          string
  ref:         string
  participant: string
  activity:    string
  date:        string
  severity:    'minor' | 'moderate' | 'serious'
  status:      IncidentStatus
  docId:       string
  carrier:     string
  notifiedAt?: string
  description: string
}

const DEMO_INCIDENTS: Incident[] = [
  { id:'i1', ref:'INC-2024-0041', participant:'Jamie Lee',   activity:'ATV Tour',     date:'Jun 3, 2026',  severity:'serious',  status:'notified',     docId:'doc_x9y0z1', carrier:'K&K Insurance',   notifiedAt:'9:44 AM', description:'Participant reported wrist injury after ATV rollover. Emergency services contacted on-site. Participant transported to Banner Health.' },
  { id:'i2', ref:'INC-2024-0039', participant:'Alex Torres', activity:'Rock Climbing', date:'May 28, 2026', severity:'moderate', status:'investigating', docId:'doc_q3r4s5', carrier:'Markel Specialty', notifiedAt:'2:11 PM', description:'Participant reported shoulder strain after rappelling descent. Declined emergency services. Completed activity waiver review on site.' },
  { id:'i3', ref:'INC-2024-0037', participant:'Sam Rivera',  activity:'Kayaking',     date:'May 15, 2026', severity:'minor',    status:'closed',       docId:'doc_a1b2c3', carrier:'K&K Insurance',   notifiedAt:'11:03 AM', description:'Participant capsized in Class II section. Recovered immediately. No injuries. Participant elected to continue session.' },
]

const SEV_STYLES: Record<string, string> = {
  minor:    'bg-blue-50 text-blue-700 border-blue-200',
  moderate: 'bg-amber-50 text-amber-700 border-amber-200',
  serious:  'bg-red-50 text-red-700 border-red-200',
}
const STATUS_STYLES: Record<IncidentStatus, string> = {
  open:          'bg-gray-100 text-gray-600',
  notified:      'bg-amber-50 text-amber-700',
  investigating: 'bg-blue-50 text-blue-700',
  closed:        'bg-emerald-50 text-emerald-700',
}
const STATUS_LABELS: Record<IncidentStatus, string> = {
  open:'Open', notified:'Carrier notified', investigating:'Under investigation', closed:'Closed',
}

export default function IncidentTab() {
  const [incidents,    setIncidents]    = useState<Incident[]>(DEMO_INCIDENTS)
  const [selected,     setSelected]     = useState<Incident | null>(null)
  const [creating,     setCreating]     = useState(false)
  const [form,         setForm]         = useState({ participant:'', activity:'kayak', severity:'minor', description:'' })
  const [submitted,    setSubmitted]    = useState(false)

  function createIncident() {
    if (!form.participant || !form.description) return
    const newInc: Incident = {
      id: `i${Date.now()}`, ref: `INC-2024-00${40 + incidents.length + 2}`,
      participant: form.participant, activity: form.activity,
      date: new Date().toLocaleDateString('en-US', { month:'short', day:'numeric', year:'numeric' }),
      severity: form.severity as 'minor'|'moderate'|'serious',
      status: 'open', docId: 'doc_pending', carrier: 'K&K Insurance',
      description: form.description,
    }
    setIncidents(i => [newInc, ...i])
    setSubmitted(true)
    setTimeout(() => { setCreating(false); setSubmitted(false); setForm({ participant:'', activity:'kayak', severity:'minor', description:'' }) }, 1500)
  }

  if (selected) {
    return (
      <div>
        <button onClick={() => setSelected(null)} className="text-sm text-gray-400 hover:text-ink mb-4">← All incidents</button>

        <div className="card mb-4">
          <div className="flex items-start justify-between gap-3 flex-wrap mb-4">
            <div>
              <div className="font-mono text-xs text-gray-400 mb-1">{selected.ref}</div>
              <h2 className="font-serif text-xl" style={{ letterSpacing:'-0.01em' }}>{selected.participant}</h2>
              <div className="text-sm text-gray-400">{selected.activity} · {selected.date}</div>
            </div>
            <div className="flex gap-2 flex-wrap">
              <span className={`text-xs px-2.5 py-1 rounded-full border font-medium ${SEV_STYLES[selected.severity]}`}>
                {selected.severity.charAt(0).toUpperCase() + selected.severity.slice(1)}
              </span>
              <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${STATUS_STYLES[selected.status]}`}>
                {STATUS_LABELS[selected.status]}
              </span>
            </div>
          </div>

          <div className="bg-surface rounded-xl p-4 mb-4 space-y-2 text-xs">
            {[
              { l:'Document ID',  v:selected.docId },
              { l:'Carrier',      v:selected.carrier },
              { l:'Notified at',  v:selected.notifiedAt ?? '—' },
              { l:'Legal hold',   v:'Applied automatically at incident creation' },
            ].map(({ l, v }) => (
              <div key={l} className="flex gap-3"><span className="text-gray-400 w-28 shrink-0">{l}</span><span className="font-medium text-ink font-mono">{v}</span></div>
            ))}
          </div>

          <div className="mb-4">
            <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Incident description</div>
            <p className="text-sm text-gray-600 leading-relaxed bg-surface rounded-xl p-4">{selected.description}</p>
          </div>

          {selected.status === 'notified' && (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-700 flex gap-2 items-start">
              <span>⚡</span>
              <div>
                <div className="font-semibold mb-0.5">Carrier notified at {selected.notifiedAt}</div>
                <div className="text-xs">LIABL fired an automatic incident webhook to {selected.carrier}. A claims file has been opened. Reference your incident ref {selected.ref} in all correspondence.</div>
              </div>
            </div>
          )}
        </div>

        {/* Incident timeline */}
        <div className="bg-white rounded-2xl border border-black/10 overflow-hidden">
          <div className="px-5 py-3 border-b border-black/8 text-xs font-semibold text-gray-400 uppercase tracking-wider">Incident timeline</div>
          <div className="divide-y divide-black/5">
            {[
              { time:'Now',     event:'incident.viewed',    detail:'Incident record opened by operator staff' },
              selected.notifiedAt && { time:selected.notifiedAt, event:'carrier.notified', detail:`Webhook delivered to ${selected.carrier} — claims file opened` },
              { time:selected.date + ', ' + (selected.notifiedAt ?? '—'), event:'legal_hold.applied', detail:`Document ${selected.docId} placed on legal hold automatically` },
              { time:selected.date, event:'incident.created', detail:`Incident report filed by operator staff` },
            ].filter(Boolean).map((e: any, i) => (
              <div key={i} className="flex items-start gap-3 px-5 py-3 text-xs">
                <span className="font-mono text-gray-400 shrink-0 w-16">{e.time}</span>
                <span className="bg-brand/10 text-brand px-2 py-0.5 rounded-full shrink-0">{e.event}</span>
                <span className="text-gray-500">{e.detail}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="font-serif text-2xl" style={{ letterSpacing:'-0.01em' }}>Incident reports</h1>
          <p className="text-sm text-gray-400 mt-1">Desert Ridge Adventures · All incidents</p>
        </div>
        <button onClick={() => setCreating(!creating)}
          className="text-sm px-4 py-2 bg-brand text-white rounded-xl font-medium hover:opacity-90 transition-colors">
          + File incident report
        </button>
      </div>

      {/* Create form */}
      {creating && (
        <div className="bg-white rounded-2xl border border-brand/20 p-5 mb-6 animate-fade-up">
          <h3 className="font-semibold text-sm text-ink mb-4">New incident report</h3>
          {submitted ? (
            <div className="text-center py-6">
              <div className="text-3xl mb-2">✅</div>
              <div className="font-medium text-ink">Incident filed — legal hold applied, carrier notified</div>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div><label className="block text-xs text-gray-500 mb-1">Participant name</label><input className="form-input" value={form.participant} onChange={e => setForm(f => ({...f, participant:e.target.value}))} placeholder="Full name"/></div>
                <div><label className="block text-xs text-gray-500 mb-1">Activity</label>
                  <select className="form-input" value={form.activity} onChange={e => setForm(f => ({...f, activity:e.target.value}))}>
                    <option value="kayak">Whitewater Kayaking</option><option value="hike">Canyon Hiking</option><option value="atv">ATV Tour</option><option value="climb">Rock Climbing</option>
                  </select>
                </div>
              </div>
              <div><label className="block text-xs text-gray-500 mb-1">Severity</label>
                <div className="grid grid-cols-3 gap-2">
                  {(['minor','moderate','serious'] as const).map(s => (
                    <button key={s} onClick={() => setForm(f => ({...f, severity:s}))}
                      className={`py-2 rounded-xl text-xs font-medium border transition-all capitalize ${form.severity===s?SEV_STYLES[s]:'border-black/10 bg-surface text-gray-500'}`}>{s}</button>
                  ))}
                </div>
              </div>
              <div><label className="block text-xs text-gray-500 mb-1">Description</label><textarea className="form-input resize-none" rows={3} value={form.description} onChange={e => setForm(f => ({...f, description:e.target.value}))} placeholder="Describe what happened, injuries reported, actions taken…"/></div>
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-700">
                ⚡ Filing this report will automatically apply a legal hold to the participant&apos;s waiver and notify your connected insurance carrier.
              </div>
              <div className="flex gap-2">
                <button onClick={() => setCreating(false)} className="btn-secondary py-2">Cancel</button>
                <button onClick={createIncident} disabled={!form.participant||!form.description} className="btn-primary py-2">File report & notify carrier</button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-4 gap-3 mb-6">
        {[
          { label:'Total incidents', value:incidents.length,                                                    color:'' },
          { label:'Carrier notified',value:incidents.filter(i=>i.status==='notified'||i.status==='investigating'||i.status==='closed').length, color:'text-amber-600' },
          { label:'Investigating',   value:incidents.filter(i=>i.status==='investigating').length,              color:'text-blue-600' },
          { label:'Closed',          value:incidents.filter(i=>i.status==='closed').length,                     color:'text-emerald-600' },
        ].map(({ label, value, color }) => (
          <div key={label} className="bg-white rounded-xl border border-black/10 p-4">
            <div className={`text-2xl font-semibold mb-1 ${color||'text-ink'}`} style={{ letterSpacing:'-0.02em' }}>{value}</div>
            <div className="text-xs text-gray-400 uppercase tracking-wider">{label}</div>
          </div>
        ))}
      </div>

      {/* Incidents list */}
      <div className="bg-white rounded-2xl border border-black/10 overflow-hidden">
        {incidents.map(inc => (
          <div key={inc.id} onClick={() => setSelected(inc)}
            className="flex items-center gap-3 px-5 py-4 border-b border-black/5 last:border-0 hover:bg-surface/60 cursor-pointer transition-colors">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="font-medium text-sm text-ink">{inc.participant}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${SEV_STYLES[inc.severity]}`}>{inc.severity}</span>
              </div>
              <div className="text-xs text-gray-400">{inc.activity} · {inc.date} · {inc.ref}</div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <span className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${STATUS_STYLES[inc.status]}`}>{STATUS_LABELS[inc.status]}</span>
              <span className="text-gray-300">→</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
