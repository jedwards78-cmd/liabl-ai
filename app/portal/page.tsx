'use client'
import { useState } from 'react'
import Logo from '@/components/Logo'
import { ACTIVITY_LABELS } from '@/lib/document-engine'

type PortalTab = 'history' | 'profile' | 'health' | 'pass'

const WAIVER_HISTORY = [
  { id:'doc_a1b2c3', activity:'kayak', operator:'Desert Ridge Adventures', date:'Jun 3, 2026',  time:'9:04 AM',  status:'active',   expiresIn:'3 years' },
  { id:'doc_e5f6g7', activity:'hike',  operator:'Desert Ridge Adventures', date:'Mar 14, 2026', time:'1:22 PM',  status:'active',   expiresIn:'3 years' },
  { id:'doc_h8i9j0', activity:'atv',   operator:'Tucson Adventure Co.',    date:'Nov 2, 2025',  time:'10:45 AM', status:'active',   expiresIn:'2 years' },
  { id:'doc_k1l2m3', activity:'climb', operator:'Peak Adventures AZ',      date:'Jul 19, 2025', time:'8:30 AM',  status:'active',   expiresIn:'2 years' },
  { id:'doc_n4o5p6', activity:'kayak', operator:'Riverside Kayak Co.',     date:'Apr 5, 2025',  time:'2:15 PM',  status:'archived', expiresIn:'Archived' },
]

const STATUS_STYLES: Record<string, string> = {
  active:   'bg-emerald-50 text-emerald-700',
  archived: 'bg-gray-100 text-gray-500',
}

export default function PortalPage() {
  const [tab,           setTab]           = useState<PortalTab>('history')
  const [loggedIn,      setLoggedIn]      = useState(false)
  const [email,         setEmail]         = useState('')
  const [loggingIn,     setLoggingIn]     = useState(false)
  const [selectedWaiver,setSelectedWaiver]= useState<string | null>(null)
  const [editingHealth, setEditingHealth] = useState(false)
  const [healthNote,    setHealthNote]    = useState('')

  function login() {
    if (!email.includes('@')) return
    setLoggingIn(true)
    setTimeout(() => { setLoggingIn(false); setLoggedIn(true) }, 1000)
  }

  const selectedDoc = WAIVER_HISTORY.find(w => w.id === selectedWaiver)

  if (!loggedIn) {
    return (
      <div className="min-h-screen bg-surface flex flex-col">
        <nav className="bg-white border-b border-black/10 px-5 py-3 flex items-center justify-between">
          <Logo size="md" />
          <span className="text-xs text-gray-400 bg-surface px-3 py-1 rounded-full border border-black/10">
            Participant portal
          </span>
        </nav>
        <div className="flex-1 flex items-center justify-center px-4">
          <div className="w-full max-w-sm">
            <div className="card">
              <div className="text-center mb-6">
                <div className="w-12 h-12 rounded-2xl bg-brand/10 flex items-center justify-center text-2xl mx-auto mb-3">✦</div>
                <h2 className="font-serif text-2xl mb-1">Your waiver history</h2>
                <p className="text-sm text-gray-500">Enter your email to access your LIABL profile and all your signed waivers.</p>
              </div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Email address</label>
              <input className="form-input mb-4" type="email" placeholder="you@email.com"
                value={email} onChange={e => setEmail(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && login()} />
              <button onClick={login} disabled={!email.includes('@') || loggingIn} className="btn-primary">
                {loggingIn ? 'Sending magic link…' : 'Access my portal →'}
              </button>
              <p className="text-xs text-gray-400 text-center mt-3">
                We&apos;ll send a magic link — no password needed.
              </p>
              <div className="mt-4 pt-4 border-t border-black/8 text-center">
                <p className="text-xs text-gray-400 mb-2">Demo: click to pre-fill</p>
                <button onClick={() => setEmail('j.rivera@email.com')}
                  className="text-xs text-brand underline">j.rivera@email.com</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-surface flex flex-col">
      <nav className="bg-white border-b border-black/10 px-5 py-3 flex items-center justify-between">
        <Logo size="md" />
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-full bg-brand/10 flex items-center justify-center text-xs font-semibold text-brand">JR</div>
          <span className="text-sm font-medium text-ink hidden sm:block">Jordan Rivera</span>
          <button onClick={() => setLoggedIn(false)} className="text-xs text-gray-400 hover:text-ink">Sign out</button>
        </div>
      </nav>

      {/* Tab bar */}
      <div className="bg-white border-b border-black/10 px-5 overflow-x-auto">
        <div className="flex gap-0 max-w-2xl mx-auto min-w-max">
          {([
            { key:'history', label:'📋 Waiver history' },
            { key:'pass',    label:'✦ LIABL Pass' },
            { key:'profile', label:'👤 Profile' },
            { key:'health',  label:'🏥 Health disclosures' },
          ] as { key: PortalTab; label: string }[]).map(({ key, label }) => (
            <button key={key} onClick={() => { setTab(key); setSelectedWaiver(null) }}
              className={`px-4 py-3 text-sm font-medium border-b-2 transition-all whitespace-nowrap ${
                tab === key ? 'border-brand text-brand' : 'border-transparent text-gray-500 hover:text-ink'
              }`}>
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-8 w-full">

        {/* ── Waiver history ── */}
        {tab === 'history' && !selectedWaiver && (
          <div>
            <div className="flex items-start justify-between mb-6">
              <div>
                <h1 className="font-serif text-2xl">Waiver history</h1>
                <p className="text-sm text-gray-400 mt-1">{WAIVER_HISTORY.length} waivers across {new Set(WAIVER_HISTORY.map(w=>w.operator)).size} operators</p>
              </div>
            </div>
            <div className="bg-white rounded-2xl border border-black/10 overflow-hidden">
              {WAIVER_HISTORY.map((w, i) => (
                <div key={w.id}
                  onClick={() => setSelectedWaiver(w.id)}
                  className="flex items-center gap-3 px-5 py-4 border-b border-black/5 last:border-0 hover:bg-brand/5 cursor-pointer transition-colors">
                  <div className="text-2xl shrink-0">
                    {{ kayak:'🚣', hike:'🥾', atv:'🏎️', climb:'🧗' }[w.activity]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm text-ink">{ACTIVITY_LABELS[w.activity as keyof typeof ACTIVITY_LABELS]}</div>
                    <div className="text-xs text-gray-400">{w.operator} · {w.date}</div>
                  </div>
                  <span className={`text-xs px-2.5 py-0.5 rounded-full font-medium shrink-0 ${STATUS_STYLES[w.status]}`}>
                    {w.status === 'active' ? 'Active' : 'Archived'}
                  </span>
                  <span className="text-gray-300 text-sm">→</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Waiver detail ── */}
        {tab === 'history' && selectedWaiver && selectedDoc && (
          <div>
            <div className="flex items-center gap-3 mb-6">
              <button onClick={() => setSelectedWaiver(null)} className="text-gray-400 hover:text-ink text-sm">← History</button>
              <span className="text-gray-300">/</span>
              <span className="text-sm font-medium">{ACTIVITY_LABELS[selectedDoc.activity as keyof typeof ACTIVITY_LABELS]}</span>
            </div>
            <div className="card mb-4">
              <div className="flex items-start justify-between gap-3 mb-4">
                <div>
                  <div className="text-xs font-semibold tracking-widest text-brand uppercase mb-1">Signed waiver</div>
                  <h2 className="font-serif text-xl">{ACTIVITY_LABELS[selectedDoc.activity as keyof typeof ACTIVITY_LABELS]}</h2>
                  <div className="text-xs text-gray-400 mt-1">{selectedDoc.operator} · {selectedDoc.date} at {selectedDoc.time}</div>
                  <div className="text-xs font-mono text-gray-400 mt-0.5">{selectedDoc.id}</div>
                </div>
                <div className="flex gap-2 flex-wrap">
                  <button className="text-xs px-3 py-1.5 rounded-lg border border-black/20 text-gray-600 hover:bg-surface">
                    ↓ Download PDF
                  </button>
                </div>
              </div>

              <div className="bg-surface rounded-xl p-4 space-y-2 text-xs mb-4">
                {[
                  { label:'Participant',   value:'Jordan Rivera' },
                  { label:'Document ID',  value: selectedDoc.id },
                  { label:'Signed',       value:`${selectedDoc.date} at ${selectedDoc.time}` },
                  { label:'Status',       value: selectedDoc.status === 'active' ? '✓ Active' : 'Archived' },
                  { label:'Expires',      value: selectedDoc.expiresIn },
                  { label:'Legal basis',  value:'ESIGN Act · UETA compliant' },
                ].map(({ label, value }) => (
                  <div key={label} className="flex gap-3">
                    <span className="text-gray-400 w-24 shrink-0">{label}</span>
                    <span className="font-medium text-ink font-mono">{value}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-black/8 text-xs text-gray-400">
                This document is cryptographically sealed. Any tampering invalidates the SHA-256 hash recorded at signing time.
              </div>
            </div>
          </div>
        )}

        {/* ── LIABL Pass ── */}
        {tab === 'pass' && (
          <div>
            <div className="card mb-4 text-center">
              <div className="w-16 h-16 rounded-2xl bg-brand flex items-center justify-center text-3xl mx-auto mb-4 text-white font-serif font-bold">
                ✦
              </div>
              <h2 className="font-serif text-2xl mb-1">LIABL Pass</h2>
              <div className="text-xs font-mono text-gray-400 mb-4">LP-4821</div>
              <div className="grid grid-cols-3 gap-3 mb-4">
                {[
                  { label:'Total visits', value:'5' },
                  { label:'Operators',    value:'3' },
                  { label:'Last visit',   value:'Jun 3' },
                ].map(({ label, value }) => (
                  <div key={label} className="bg-surface rounded-xl p-3">
                    <div className="font-semibold text-ink">{value}</div>
                    <div className="text-xs text-gray-400 mt-0.5">{label}</div>
                  </div>
                ))}
              </div>
              <div className="bg-brand/5 border border-brand/20 rounded-xl p-3 text-sm text-brand text-left">
                Your LIABL Pass is recognized at all connected operators. Returning visits take ~15 seconds — your identity and health disclosures are on file.
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-black/10 overflow-hidden">
              <div className="px-5 py-3 border-b border-black/8 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Connected operators
              </div>
              {['Desert Ridge Adventures','Tucson Adventure Co.','Peak Adventures AZ'].map((op, i) => (
                <div key={i} className="flex items-center gap-3 px-5 py-3.5 border-b border-black/5 last:border-0 text-sm">
                  <div className="w-7 h-7 rounded-full bg-brand/10 flex items-center justify-center text-xs font-semibold text-brand shrink-0">
                    {op[0]}
                  </div>
                  <span className="flex-1 text-ink">{op}</span>
                  <span className="text-xs text-gray-400">Recognized ✦</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Profile ── */}
        {tab === 'profile' && (
          <div className="card">
            <h2 className="font-serif text-xl mb-5">Your profile</h2>
            <div className="space-y-4">
              {[
                { label:'Full name',     value:'Jordan Rivera',           type:'text'  },
                { label:'Email address', value:'j.rivera@email.com',      type:'email' },
                { label:'Date of birth', value:'1992-05-14',              type:'date'  },
              ].map(({ label, value, type }) => (
                <div key={label}>
                  <label className="block text-xs font-medium text-gray-500 mb-1">{label}</label>
                  <input className="form-input" type={type} defaultValue={value} />
                </div>
              ))}
              <button className="btn-primary">Save changes</button>
            </div>
          </div>
        )}

        {/* ── Health disclosures ── */}
        {tab === 'health' && (
          <div>
            <div className="card mb-4">
              <h2 className="font-serif text-xl mb-1">Health disclosures</h2>
              <p className="text-sm text-gray-500 mb-5 leading-relaxed">
                Your health disclosures are on file and used to generate accurate adaptive waivers. Operators can see whether a disclosure exists but never see the content — only LIABL stores the detail.
              </p>

              <div className="space-y-3 mb-5">
                {[
                  { label:'Cardiovascular conditions',    status:'None disclosed',    flagged:false },
                  { label:'Recent injuries or surgeries', status:'None disclosed',    flagged:false },
                  { label:'Medications affecting activity', status:'None disclosed',  flagged:false },
                  { label:'Physician restrictions',       status:'None disclosed',    flagged:false },
                ].map(({ label, status, flagged }) => (
                  <div key={label} className="flex items-center justify-between gap-3 bg-surface rounded-xl px-4 py-3">
                    <span className="text-sm text-ink">{label}</span>
                    <span className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${
                      flagged ? 'bg-amber-50 text-amber-700' : 'bg-emerald-50 text-emerald-700'
                    }`}>
                      {status}
                    </span>
                  </div>
                ))}
              </div>

              {!editingHealth ? (
                <button onClick={() => setEditingHealth(true)}
                  className="w-full py-2.5 border border-dashed border-brand/40 text-brand text-sm rounded-xl hover:bg-brand/5 transition-all">
                  + Update health disclosures
                </button>
              ) : (
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">New disclosure</label>
                  <textarea className="form-input resize-none mb-3" rows={3}
                    placeholder="Describe any health condition relevant to physical activity…"
                    value={healthNote} onChange={e => setHealthNote(e.target.value)} />
                  <div className="flex gap-2">
                    <button onClick={() => setEditingHealth(false)} className="btn-secondary">Cancel</button>
                    <button className="btn-primary" onClick={() => setEditingHealth(false)}>Save disclosure</button>
                  </div>
                </div>
              )}
            </div>

            <div className="bg-surface border border-black/10 rounded-xl p-4 text-xs text-gray-500 leading-relaxed">
              <strong className="text-gray-600">Privacy:</strong> Your health disclosures are encrypted at field level and never shared with operators in full. Operators only see whether a disclosure flag exists — the content is visible only to you and LIABL&apos;s compliance system.
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
