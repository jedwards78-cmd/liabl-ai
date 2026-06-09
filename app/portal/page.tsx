'use client'
import { useState } from 'react'
import Logo from '@/components/Logo'
import { ACTIVITY_LABELS } from '@/lib/document-engine'

type Tab='history'|'profile'|'health'
const WAIVERS=[
  {id:'doc_a1b2c3',activity:'kayak',operator:'Desert Ridge Adventures',date:'Jun 3, 2026', time:'9:04 AM', status:'active'},
  {id:'doc_e5f6g7',activity:'hike', operator:'Desert Ridge Adventures',date:'Mar 14, 2026',time:'1:22 PM', status:'active'},
  {id:'doc_h8i9j0',activity:'atv',  operator:'Tucson Adventure Co.',   date:'Nov 2, 2025', time:'10:45 AM',status:'active'},
  {id:'doc_k1l2m3',activity:'climb',operator:'Peak Adventures AZ',     date:'Jul 19, 2025',time:'8:30 AM', status:'active'},
  {id:'doc_n4o5p6',activity:'kayak',operator:'Riverside Kayak Co.',    date:'Apr 5, 2025', time:'2:15 PM', status:'archived'},
]
const OPS=['Desert Ridge Adventures','Tucson Adventure Co.','Peak Adventures AZ']

export default function PortalPage() {
  const [tab,setTab]=useState<Tab>('history')
  const [loggedIn,setLoggedIn]=useState(false)
  const [email,setEmail]=useState('')
  const [loggingIn,setLoggingIn]=useState(false)
  const [selected,setSelected]=useState<string|null>(null)

  function login(){if(!email.includes('@'))return;setLoggingIn(true);setTimeout(()=>{setLoggingIn(false);setLoggedIn(true)},1000)}
  const selectedDoc=WAIVERS.find(w=>w.id===selected)

  if(!loggedIn)return(
    <div className="min-h-screen bg-surface flex flex-col">
      <nav className="bg-white border-b border-black/10 px-5 py-3 flex items-center justify-between"><Logo size="md"/><span className="text-xs text-gray-400 bg-surface px-3 py-1 rounded-full border border-black/10">Participant portal</span></nav>
      <div className="flex-1 flex items-center justify-center px-4">
        <div className="w-full max-w-sm card">
          <div className="text-center mb-6"><div className="w-12 h-12 rounded-2xl bg-brand flex items-center justify-center text-white font-bold text-xl mx-auto mb-3">✦</div><h2 className="font-serif text-2xl mb-1">Your LIABL portal</h2><p className="text-sm text-gray-500">Access your profile, waiver history, and LIABL Pass.</p></div>
          <label className="block text-xs font-medium text-gray-500 mb-1">Email address</label>
          <input className="form-input mb-4" type="email" placeholder="you@email.com" value={email} onChange={e=>setEmail(e.target.value)} onKeyDown={e=>e.key==='Enter'&&login()}/>
          <button onClick={login} disabled={!email.includes('@')||loggingIn} className="btn-primary">{loggingIn?'Sending magic link…':'Access my portal →'}</button>
          <div className="mt-4 pt-4 border-t border-black/8 text-center"><p className="text-xs text-gray-400 mb-2">Demo</p><button onClick={()=>setEmail('j.rivera@email.com')} className="text-xs text-brand underline">j.rivera@email.com</button></div>
        </div>
      </div>
    </div>
  )

  return(
    <div className="min-h-screen bg-surface flex flex-col">
      <nav className="bg-white border-b border-black/10 px-5 py-3 flex items-center justify-between">
        <Logo size="md"/>
        <div className="flex items-center gap-3"><div className="w-7 h-7 rounded-full bg-brand/10 flex items-center justify-center text-xs font-semibold text-brand">JR</div><span className="text-sm font-medium text-ink hidden sm:block">Jordan Rivera</span><button onClick={()=>setLoggedIn(false)} className="text-xs text-gray-400 hover:text-ink">Sign out</button></div>
      </nav>
      {/* LIABL Pass header */}
      <div className="bg-brand text-white px-5 py-4">
        <div className="max-w-2xl mx-auto flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-5">
            <div className="bg-white/15 border border-white/20 rounded-xl px-4 py-2.5 flex items-center gap-3"><span className="text-xl">✦</span><div><div className="text-xs text-white/60 font-medium">LIABL Pass</div><div className="font-mono text-sm font-semibold">LP-4821</div></div></div>
            <div className="flex gap-5">{[{v:'5',l:'Visits'},{v:'3',l:'Operators'},{v:'Jun 3',l:'Last visit'}].map(({v,l})=>(<div key={l} className="text-center"><div className="font-semibold text-sm">{v}</div><div className="text-xs text-white/60">{l}</div></div>))}</div>
          </div>
          <div className="flex items-center gap-2"><span className="text-xs text-white/60">Recognized at:</span><div className="flex gap-1">{OPS.map(op=>(<div key={op} title={op} className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-xs font-semibold border border-white/30">{op[0]}</div>))}</div></div>
        </div>
      </div>
      <div className="bg-white border-b border-black/10 px-5">
        <div className="flex gap-0 max-w-2xl mx-auto">
          {([{key:'history',label:'📋 Waiver history'},{key:'profile',label:'👤 Profile'},{key:'health',label:'🏥 Health'}] as {key:Tab;label:string}[]).map(({key,label})=>(
            <button key={key} onClick={()=>{setTab(key);setSelected(null)}} className={`px-4 py-3 text-sm font-medium border-b-2 transition-all ${tab===key?'border-brand text-brand':'border-transparent text-gray-500 hover:text-ink'}`}>{label}</button>
          ))}
        </div>
      </div>
      <div className="max-w-2xl mx-auto px-4 py-8 w-full">
        {tab==='history'&&!selected&&(
          <div>
            <h1 className="font-serif text-2xl mb-1" style={{letterSpacing:'-0.01em'}}>Waiver history</h1>
            <p className="text-sm text-gray-400 mb-5">{WAIVERS.length} waivers across {OPS.length} operators</p>
            <div className="bg-white rounded-2xl border border-black/10 overflow-hidden">
              {WAIVERS.map(w=>(
                <div key={w.id} onClick={()=>setSelected(w.id)} className="flex items-center gap-3 px-5 py-4 border-b border-black/5 last:border-0 hover:bg-brand/5 cursor-pointer transition-colors">
                  <div className="text-2xl shrink-0">{{ kayak:'🚣', hike:'🥾', atv:'🏎️', climb:'🧗' }[w.activity]}</div>
                  <div className="flex-1 min-w-0"><div className="font-medium text-sm text-ink">{ACTIVITY_LABELS[w.activity as keyof typeof ACTIVITY_LABELS]}</div><div className="text-xs text-gray-400">{w.operator} · {w.date}</div></div>
                  <span className={`text-xs px-2.5 py-0.5 rounded-full font-medium shrink-0 ${w.status==='active'?'bg-emerald-50 text-emerald-700':'bg-gray-100 text-gray-500'}`}>{w.status==='active'?'Active':'Archived'}</span>
                  <span className="text-gray-300">→</span>
                </div>
              ))}
            </div>
          </div>
        )}
        {tab==='history'&&selected&&selectedDoc&&(
          <div>
            <button onClick={()=>setSelected(null)} className="text-sm text-gray-400 hover:text-ink mb-4">← History</button>
            <div className="card">
              <div className="text-xs font-semibold tracking-widest text-brand uppercase mb-1">Signed waiver</div>
              <h2 className="font-serif text-xl mb-1" style={{letterSpacing:'-0.01em'}}>{ACTIVITY_LABELS[selectedDoc.activity as keyof typeof ACTIVITY_LABELS]}</h2>
              <div className="text-xs text-gray-400 mb-4">{selectedDoc.operator} · {selectedDoc.date}</div>
              <div className="bg-surface rounded-xl p-4 space-y-2 text-xs">
                {[{l:'Document ID',v:selectedDoc.id},{l:'Signed',v:`${selectedDoc.date} at ${selectedDoc.time}`},{l:'Status',v:selectedDoc.status==='active'?'✓ Active':'Archived'},{l:'Legal basis',v:'ESIGN Act · UETA'}].map(({l,v})=>(
                  <div key={l} className="flex gap-3"><span className="text-gray-400 w-24 shrink-0">{l}</span><span className="font-medium text-ink font-mono">{v}</span></div>
                ))}
              </div>
            </div>
          </div>
        )}
        {tab==='profile'&&(
          <div className="card">
            <h2 className="font-serif text-xl mb-5" style={{letterSpacing:'-0.01em'}}>Your profile</h2>
            <div className="space-y-4">
              {[{l:'Full name',v:'Jordan Rivera',t:'text'},{l:'Email',v:'j.rivera@email.com',t:'email'},{l:'Date of birth',v:'1992-05-14',t:'date'}].map(({l,v,t})=>(<div key={l}><label className="block text-xs font-medium text-gray-500 mb-1">{l}</label><input className="form-input" type={t} defaultValue={v}/></div>))}
              <button className="btn-primary">Save changes</button>
            </div>
          </div>
        )}
        {tab==='health'&&(
          <div className="card">
            <h2 className="font-serif text-xl mb-1" style={{letterSpacing:'-0.01em'}}>Health disclosures</h2>
            <p className="text-sm text-gray-500 mb-5">Operators see only whether a disclosure exists — never the content.</p>
            <div className="space-y-3">
              {['Cardiovascular conditions','Recent injuries or surgeries','Medications affecting activity','Physician restrictions'].map(l=>(
                <div key={l} className="flex items-center justify-between gap-3 bg-surface rounded-xl px-4 py-3"><span className="text-sm text-ink">{l}</span><span className="text-xs bg-emerald-50 text-emerald-700 px-2.5 py-0.5 rounded-full font-medium">None disclosed</span></div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
