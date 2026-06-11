'use client'
import { useState } from 'react'
import Logo from '@/components/Logo'

type Period = 'monthly'|'annual'

const TIERS = [
  { id:'core',         name:'Core',         tagline:'Smart waivers. Flat fee. No surprises.',                            monthly:49,  annual:39,  highlight:false,
    features:['Up to 500 signatures/month','Unlimited participants','Adaptive document engine','Guardian flow for minors','Operator roster & check-in','Email confirmations','90-day document retention','1 operator user seat'],
    missing:['LIABL Pass','Group reservations','Booking integrations','Analytics','API access'] },
  { id:'connected',    name:'Connected',    tagline:'Your booking platform and LIABL — always in sync.',                monthly:149, annual:119, highlight:true,
    features:['Up to 2,500 signatures/month','Unlimited participants','Everything in Core','LIABL Pass (cross-operator)','Group reservations (all 4 tabs)','FareHarbor, Rezdy, Xola, Bókun','Bidirectional webhooks','Analytics + CSV export','Staff notes & addendum workflow','3-year document retention','5 operator user seats','API read access'],
    missing:['Role-based access control','Legal hold & lifecycle mgmt','SSO (Azure / Okta)'] },
  { id:'intelligence', name:'Intelligence', tagline:'The compliance layer your legal team has been asking for.',         monthly:349, annual:279, highlight:false,
    features:['Up to 20,000 signatures/month','Unlimited participants','Everything in Connected','Full analytics suite + risk scoring','Document lifecycle management','Legal hold & retention policies','Role-based access control','Metadata tagging','Audit trail & hash verification','GDPR/CCPA deletion workflow','7-year document retention','50 operator user seats','Full API access (read/write)','Priority support'],
    missing:[] },
]

// Note: "Participants" row removed per v12 spec
const COMPARE: {feature:string;core:string|boolean;connected:string|boolean;intelligence:string|boolean}[] = [
  {feature:'Signatures per month',         core:'500',         connected:'2,500',        intelligence:'20,000'       },
  {feature:'User seats',                   core:'1',           connected:'5',            intelligence:'50'           },
  {feature:'Document retention',           core:'90 days',     connected:'3 years',      intelligence:'7 years'      },
  {feature:'Adaptive document engine',     core:true,          connected:true,           intelligence:true           },
  {feature:'AI risk scoring',              core:true,          connected:true,           intelligence:true           },
  {feature:'Guardian flow',                core:true,          connected:true,           intelligence:true           },
  {feature:'LIABL Pass',                   core:false,         connected:true,           intelligence:true           },
  {feature:'Group reservations',           core:false,         connected:true,           intelligence:true           },
  {feature:'Booking integrations',         core:false,         connected:true,           intelligence:true           },
  {feature:'Analytics & export',           core:false,         connected:true,           intelligence:true           },
  {feature:'Insurance integrations',       core:false,         connected:true,           intelligence:true           },
  {feature:'Webhooks & API',               core:false,         connected:'Read only',    intelligence:'Full'         },
  {feature:'Role-based access control',    core:false,         connected:false,          intelligence:true           },
  {feature:'Legal hold',                   core:false,         connected:false,          intelligence:true           },
  {feature:'SSO (Azure / Okta)',           core:false,         connected:false,          intelligence:'Add-on'       },
  {feature:'Priority support',             core:false,         connected:false,          intelligence:true           },
]

function Cell({val}:{val:string|boolean}){
  if(val===true)  return <span className="text-emerald-500 font-bold">✓</span>
  if(val===false) return <span className="text-gray-200 font-bold">—</span>
  return <span className="text-xs font-medium text-ink">{val}</span>
}

export default function PricingPage() {
  const [period,setPeriod]=useState<Period>('monthly')
  const [showCompare,setShowCompare]=useState(false)
  const savings=Math.round((1-39/49)*100)

  return (
    <div className="min-h-screen bg-surface">
      <nav className="bg-white border-b border-black/10 px-5 py-3 flex items-center justify-between">
        <Logo size="md"/>
        <span className="text-xs bg-surface border border-black/10 px-3 py-1.5 rounded-full text-gray-500">Pricing</span>
      </nav>
      <div className="max-w-4xl mx-auto px-4 py-14">
        <div className="text-center mb-10">
          <p className="text-xs font-semibold tracking-widest text-brand uppercase mb-3">Pricing</p>
          <h1 className="font-serif text-3xl sm:text-4xl text-ink mb-3" style={{letterSpacing:'-0.02em'}}>Feature-based pricing. Unlimited participants.</h1>
          <p className="text-gray-500 text-base max-w-xl mx-auto leading-relaxed mb-6">Plans are based on features and monthly signature volume — not per-waiver fees. You never pay more just because you&apos;re busy.</p>
          <div className="inline-flex items-center gap-3">
            <div className="flex gap-1 bg-white border border-black/10 rounded-xl p-1">
              {(['monthly','annual'] as Period[]).map(p=>(
                <button key={p} onClick={()=>setPeriod(p)} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all capitalize ${period===p?'bg-brand text-white shadow-sm':'text-gray-500 hover:text-ink'}`}>{p}</button>
              ))}
            </div>
            {period==='annual'&&<span className="text-xs bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-1 rounded-full font-medium">Save ~{savings}%</span>}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {TIERS.map(t=>{
            const price=period==='annual'?t.annual:t.monthly
            return (
              <div key={t.id} className={`rounded-2xl border p-6 flex flex-col ${t.highlight?'border-brand bg-brand text-white shadow-xl shadow-brand/20 scale-[1.02]':'border-black/10 bg-white'}`}>
                {t.highlight&&<div className="text-xs font-semibold tracking-widest uppercase mb-3 text-white/60">Most popular</div>}
                <div className={`text-xs font-semibold tracking-widest uppercase mb-1 ${t.highlight?'text-white/60':'text-brand'}`}>{t.name}</div>
                <div className={`font-serif text-4xl mb-1 ${t.highlight?'text-white':'text-ink'}`} style={{letterSpacing:'-0.02em'}}>${price}<span className={`text-base font-sans font-normal ${t.highlight?'text-white/60':'text-gray-400'}`}>/mo</span></div>
                {period==='annual'&&<div className={`text-xs mb-2 ${t.highlight?'text-white/60':'text-gray-400'}`}>Billed annually · ${price*12}/yr</div>}
                <p className={`text-sm mb-5 leading-relaxed ${t.highlight?'text-white/80':'text-gray-500'}`}>{t.tagline}</p>
                <div className="space-y-2 mb-6 flex-1">
                  {t.features.slice(0,8).map(f=>(
                    <div key={f} className="flex items-start gap-2 text-xs">
                      <span className={`shrink-0 mt-0.5 font-bold ${t.highlight?'text-white':'text-emerald-500'}`}>✓</span>
                      <span className={t.highlight?'text-white/90':'text-gray-600'}>{f}</span>
                    </div>
                  ))}
                  {t.features.length>8&&<div className={`text-xs mt-1 ${t.highlight?'text-white/40':'text-gray-300'}`}>+ {t.features.length-8} more features</div>}
                </div>
                <button className={`w-full py-3 rounded-xl font-semibold text-sm transition-all ${t.highlight?'bg-white text-brand hover:bg-white/90':'bg-brand text-white hover:opacity-90'}`}>Start free trial</button>
              </div>
            )
          })}
        </div>

        <div className="text-center mb-8">
          <button onClick={()=>setShowCompare(!showCompare)} className="text-sm text-brand underline hover:opacity-70 transition-opacity">{showCompare?'Hide':'Show'} full feature comparison →</button>
        </div>

        {showCompare&&(
          <div className="bg-white rounded-2xl border border-black/10 overflow-hidden mb-10 animate-fade-up">
            <div className="grid grid-cols-4">
              <div className="px-4 py-3 border-b border-black/8 text-xs font-semibold text-gray-400 uppercase tracking-wider">Feature</div>
              {['Core','Connected','Intelligence'].map((name,i)=>(<div key={name} className={`px-4 py-3 border-b border-black/8 text-sm font-semibold text-center ${i===1?'text-brand':'text-ink'}`}>{name}</div>))}
              {COMPARE.map((row,i)=>(
                <>
                  <div key={`${row.feature}-l`} className={`px-4 py-3 text-xs text-gray-600 border-b border-black/5 ${i%2===0?'':'bg-surface/40'}`}>{row.feature}</div>
                  {(['core','connected','intelligence'] as const).map(tier=>(<div key={`${row.feature}-${tier}`} className={`px-4 py-3 text-center border-b border-black/5 ${i%2===0?'':'bg-surface/40'}`}><Cell val={row[tier]}/></div>))}
                </>
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-ink rounded-2xl p-6 text-white">
            <div className="text-xs font-semibold tracking-widest uppercase mb-3" style={{color:'#A78BFA'}}>Enterprise</div>
            <h3 className="font-serif text-xl mb-2" style={{letterSpacing:'-0.01em'}}>Multi-location &amp; compliance-first</h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">Custom signature volume, SSO, SCIM, dedicated support, and multi-location reporting.</p>
            <div className="space-y-1.5 mb-5">{['Custom signature volume','SSO + SCIM provisioning','Dedicated support & SLA','Multi-location reporting','Volume pricing'].map(f=>(<div key={f} className="flex items-center gap-2 text-xs text-gray-300"><span className="text-violet-400">✓</span>{f}</div>))}</div>
            <button className="w-full py-3 rounded-xl font-semibold text-sm bg-white text-ink hover:bg-white/90 transition-all">Contact sales →</button>
          </div>
          <div className="bg-brand/5 border border-brand/20 rounded-2xl p-6">
            <div className="text-xs font-semibold tracking-widest text-brand uppercase mb-3">White-label</div>
            <h3 className="font-serif text-xl text-ink mb-2" style={{letterSpacing:'-0.01em'}}>Booking platforms &amp; franchises</h3>
            <p className="text-gray-500 text-sm leading-relaxed mb-4">Embed LIABL under your own brand. Full UI white-labeling, custom domain, platform-level API.</p>
            <div className="space-y-1.5 mb-5">{['Full UI white-labeling','Custom domain & branding','Platform-level API access','Revenue share model','Dedicated integration engineering'].map(f=>(<div key={f} className="flex items-center gap-2 text-xs text-gray-600"><span className="text-brand">✓</span>{f}</div>))}</div>
            <button className="w-full py-3 rounded-xl font-semibold text-sm bg-brand text-white hover:opacity-90 transition-all">Explore partnership →</button>
          </div>
        </div>
      </div>
    </div>
  )
}
