'use client'
import { useState } from 'react'
import Logo from '@/components/Logo'
import AdaptiveDemo from '@/components/home/AdaptiveDemo'
import NetworkDemo  from '@/components/home/NetworkDemo'

type Tab = 'why' | 'investor'

const FORCES = [
  { num:'01', icon:'🏔', title:'Activity industry growth', sub:'The market is expanding faster than the tooling', color:'text-brand', bg:'bg-brand/5 border-brand/20', stats:[{value:'24%',label:'US outdoor recreation growth 2020–2024'},{value:'$887B',label:'US outdoor recreation economy (2024)'},{value:'3.4M',label:'New outdoor participants since 2020'}], body:`US outdoor recreation grew 24% between 2020 and 2024. New operators are entering markets that didn't exist five years ago — urban climbing gyms, e-bike tours, cold plunge studios.\n\nThese operators are digitally native with no legacy waiver infrastructure. They're greenfield customers who will adopt whatever the default document solution is for their vertical.` },
  { num:'02', icon:'⚖️', title:'Rising liability exposure', sub:'Operators know a bad waiver is worse than no waiver', color:'text-amber-600', bg:'bg-amber-50 border-amber-200', stats:[{value:'+31%',label:'Recreation-related injury suits 2019–2024'},{value:'$4.2M',label:'Average recreation liability settlement (2024)'},{value:'67%',label:'Of dismissed suits cite inadequate documentation'}], body:`Recreation-related personal injury suits increased 31% between 2019 and 2024. Courts distinguish between waivers that were signed but not understood and waivers that were read, activity-specific, and clearly accepted.\n\nLIABL's clause read-through tracking, adaptive specificity, and audit trail directly address the documentation standards courts are applying.` },
  { num:'03', icon:'🔌', title:'Booking platform API maturity', sub:'The integration layer just became capable', color:'text-emerald-600', bg:'bg-emerald-50 border-emerald-200', stats:[{value:'2021–2024',label:'FareHarbor, Rezdy, Xola, Bókun API launches'},{value:'4 platforms',label:'With bidirectional webhook support'},{value:'180K+',label:'Operators on FareHarbor alone'}], body:`FareHarbor, Rezdy, Xola, and Bókun all launched REST APIs between 2021 and 2024. The technical infrastructure for bidirectional booking-waiver sync didn't exist before this window.\n\nThe 180,000+ operators on FareHarbor represent a distribution channel, not a sales challenge.` },
]

const COMPETITORS = [
  { name:'DocuSign',    cap:'Enterprise e-sign', gap:'No activity data. No risk calibration. Generic template model.' },
  { name:'Adobe Sign',  cap:'Workflow depth',    gap:'No participant graph. No cross-operator recognition.' },
  { name:'Smartwaiver', cap:'Activity UX',       gap:'Single-tenant. No AI layer. No jurisdiction engine.' },
  { name:'Wherewolf',   cap:'Check-in focus',    gap:'No cross-operator graph. No adaptive document layer.' },
]

const FIVE_FEATURES = [
  { num:'01', phase:'Year 1–2', title:'Adaptive document intelligence',  desc:'Documents build themselves from participant answers — activity, risk, health, jurisdiction. No static templates.' },
  { num:'02', phase:'Year 1–2', title:'LIABL Pass — identity continuity', desc:'Every signing event strengthens a verified cross-operator profile. Returning participants sign in ~15 seconds.' },
  { num:'03', phase:'Year 2–3', title:'Group reservation intelligence',   desc:'Pre-arrival signing, real-time manifest sync, exception management, and booking platform bidirectional webhooks.' },
  { num:'04', phase:'Year 2–3', title:'Operator intelligence layer',      desc:'Risk signals, clause read-through rates, compliance alerts, and analytics. A safety intelligence platform.' },
  { num:'05', phase:'Year 3–5', title:'Document network effect',          desc:'At 5,000 operators, 68% of participants arrive already verified. Each new operator inherits the entire network.' },
]

export default function WhyPage() {
  const [tab,setTab]=useState<Tab>('why')
  const [expanded,setExpanded]=useState<string|null>('01')

  return (
    <div className="min-h-screen bg-surface">
      <nav className="bg-white border-b border-black/10 px-5 py-3 flex items-center justify-between">
        <Logo size="md"/><span className="text-xs bg-surface border border-black/10 px-3 py-1.5 rounded-full text-gray-500">Why LIABL · Why now</span>
      </nav>
      <div className="bg-white border-b border-black/10 px-5">
        <div className="flex gap-0 max-w-3xl mx-auto">
          {([{key:'why',label:'📡 Why now'},{key:'investor',label:'📈 Investor overview'}] as {key:Tab;label:string}[]).map(({key,label})=>(
            <button key={key} onClick={()=>setTab(key)} className={`px-5 py-3 text-sm font-medium border-b-2 transition-all ${tab===key?'border-brand text-brand':'border-transparent text-gray-500 hover:text-ink'}`}>{label}</button>
          ))}
        </div>
      </div>
      <div className="bg-ink text-white px-6 py-14 text-center">
        <p className="text-xs font-semibold tracking-widest uppercase mb-4" style={{color:'#A78BFA'}}>{tab==='why'?'Market thesis':'Investor overview'}</p>
        <h1 className="font-serif text-3xl sm:text-4xl mb-4 max-w-2xl mx-auto leading-tight" style={{letterSpacing:'-0.02em'}}>
          {tab==='why'?'Three forces converging to create a window that closes in 18–36 months.':'The white space, the flywheel, and the five features that build the moat.'}
        </h1>
        <p className="text-gray-400 text-base max-w-xl mx-auto leading-relaxed">
          {tab==='why'?"Activity industry growth, rising liability exposure, and booking platform API maturity have created a moment that didn't exist three years ago.":"An interactive walkthrough of LIABL's market position, adaptive document intelligence, and the network effect thesis."}
        </p>
      </div>
      <div className="max-w-3xl mx-auto px-4 py-12">
        {tab==='why'&&(
          <div className="space-y-4">
            <p className="text-xs font-semibold tracking-widest text-brand uppercase mb-2">Three converging forces</p>
            {FORCES.map(f=>(
              <div key={f.num} className="bg-white rounded-2xl border border-black/10 overflow-hidden">
                <div onClick={()=>setExpanded(expanded===f.num?null:f.num)} className="flex items-start gap-4 px-5 py-5 cursor-pointer hover:bg-surface/40 transition-colors">
                  <div className="font-serif text-3xl text-gray-200 font-bold shrink-0 w-10 leading-none mt-1">{f.num}</div>
                  <div className="flex-1">
                    <div className="font-semibold text-base text-ink flex items-center gap-2 mb-0.5"><span>{f.icon}</span>{f.title}</div>
                    <div className="text-sm text-gray-400 mb-3">{f.sub}</div>
                    <div className="flex gap-3 flex-wrap">
                      {f.stats.map(s=>(
                        <div key={s.label} className={`rounded-lg border px-3 py-2 ${f.bg}`}>
                          <div className={`font-semibold text-lg leading-none mb-0.5 ${f.color}`}>{s.value}</div>
                          <div className="text-xs text-gray-500">{s.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <span className="text-gray-400 text-sm shrink-0">{expanded===f.num?'▲':'▼'}</span>
                </div>
                {expanded===f.num&&(
                  <div className="border-t border-black/8 px-5 py-5 bg-surface/30">
                    {f.body.split('\n\n').map((para,i)=><p key={i} className="text-sm text-gray-600 leading-relaxed mb-3 last:mb-0">{para}</p>)}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
        {tab==='investor'&&(
          <div className="space-y-12">
            <section>
              <p className="text-xs font-semibold tracking-widest text-brand uppercase mb-3">Market white space</p>
              <h2 className="font-serif text-2xl text-ink mb-3" style={{letterSpacing:'-0.01em'}}>Activity-aware, participant-specific, legally intelligent — owned by nobody.</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
                {COMPETITORS.map(c=>(
                  <div key={c.name} className="bg-white rounded-xl border border-black/10 p-4">
                    <div className="flex items-center justify-between mb-2"><div className="font-semibold text-sm text-ink">{c.name}</div><span className="text-xs bg-surface border border-black/10 px-2 py-0.5 rounded-full text-gray-400">{c.cap}</span></div>
                    <div className="text-xs text-gray-400 leading-relaxed">{c.gap}</div>
                  </div>
                ))}
              </div>
              <div className="bg-brand/5 border border-brand/20 rounded-xl p-5 flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-brand flex items-center justify-center text-white text-sm font-bold shrink-0">L</div>
                <div><div className="font-semibold text-ink mb-1">LIABL fills the gap</div><div className="text-sm text-gray-500 leading-relaxed">New entrants cannot replicate LIABL's position — the participant identity graph requires years of signed documents to become defensible.</div></div>
              </div>
            </section>
            <section>
              <p className="text-xs font-semibold tracking-widest text-brand uppercase mb-3">Five differentiating features</p>
              <div className="space-y-3 mb-10">
                {FIVE_FEATURES.map(f=>(
                  <div key={f.num} className="flex gap-5 bg-white rounded-2xl border border-black/10 p-5">
                    <div className="font-serif text-3xl text-brand/20 font-bold shrink-0 w-10">{f.num}</div>
                    <div className="flex-1"><div className="flex items-start justify-between gap-3 flex-wrap mb-1"><div className="font-semibold text-ink">{f.title}</div><span className="text-xs bg-surface border border-black/10 px-2.5 py-1 rounded-full text-gray-400 shrink-0">{f.phase}</span></div><p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p></div>
                  </div>
                ))}
              </div>
              <section className="bg-white rounded-2xl border border-black/10 p-6 mb-8">
                <span className="text-xs font-semibold tracking-widest text-brand uppercase">Feature 01 · Live demo</span>
                <h2 className="font-serif text-xl text-ink mt-1 mb-2" style={{letterSpacing:'-0.01em'}}>Adaptive document intelligence</h2>
                <p className="text-gray-500 text-sm leading-relaxed mb-6">The document builds itself from participant answers in real time.</p>
                <AdaptiveDemo/>
              </section>
              <section className="bg-ink rounded-2xl p-6">
                <span className="text-xs font-semibold tracking-widest uppercase" style={{color:'#A78BFA'}}>Feature 05 · Live simulator</span>
                <h2 className="font-serif text-xl text-white mt-1 mb-2" style={{letterSpacing:'-0.01em'}}>Document network effect</h2>
                <p className="text-gray-400 text-sm leading-relaxed mb-6">Drag the slider to see the flywheel in motion.</p>
                <NetworkDemo/>
              </section>
            </section>
          </div>
        )}
      </div>
    </div>
  )
}
