'use client'
import { useState } from 'react'
import Link from 'next/link'
import Logo from '@/components/Logo'
import { FileSignature, UserCircle, LayoutDashboard, Users, Plug, ShieldCheck, CreditCard, TrendingUp, Waves, Dumbbell, Monitor } from 'lucide-react'

const TILES = [
  { href:'/participant', Icon:FileSignature,   label:'Sign a waiver',         sub:'Participant flow',               bg:'#4B2ACF' },
  { href:'/portal',      Icon:UserCircle,      label:'Participant portal',     sub:'Profile & waiver history',       bg:'#0891B2' },
  { href:'/operator',    Icon:LayoutDashboard, label:'Operator dashboard',     sub:'Roster, analytics & templates',  bg:'#059669' },
  { href:'/groups',      Icon:Users,           label:'Group reservations',     sub:'Manage group bookings',          bg:'#7C3AED' },
  { href:'/integrations',Icon:Plug,            label:'Integrations',           sub:'FareHarbor, Rezdy, SSO & more',  bg:'#D97706' },
  { href:'/security',    Icon:ShieldCheck,     label:'Security & Enterprise',  sub:'Audit, compliance & RBAC',       bg:'#DC2626' },
  { href:'/pricing',     Icon:CreditCard,      label:'Pricing',                sub:'Plans & enterprise options',     bg:'#0D9488' },
  { href:'/why', Icon:TrendingUp, label:'Why LIABL · Why now', sub:'Market case & investor overview', bg:'#BE185D' },
  { href:'/demo', Icon:Monitor, label:'Sales demo', sub:'Guided buyer walkthroughs', bg:'#6366F1' },
]
const OPERATORS = [
  { name:'Desert Ridge Adventures', tagline:'Whitewater · ATV · Climbing · Hiking', accent:'#4B2ACF', Icon:Waves,    label:'Adventure' },
  { name:'Tucson Wellness Studio',  tagline:'Yoga · Pilates · Strength · Recovery', accent:'#059669', Icon:Dumbbell, label:'Wellness'  },
]

export default function Home() {
  const [opIndex, setOpIndex] = useState(0)
  const op = OPERATORS[opIndex]
  return (
    <main className="min-h-screen bg-surface">
      <section className="flex flex-col items-center justify-center px-6 pt-20 pb-14 text-center">
        <div className="mb-8"><Logo size="lg" /></div>
        <h1 className="font-serif text-3xl sm:text-4xl text-ink max-w-2xl leading-tight mb-5" style={{ letterSpacing:'-0.02em' }}>
          The modern document layer that bridges information, action, and intelligence.
        </h1>
        <p className="text-gray-500 text-base max-w-xl mx-auto leading-relaxed mb-10">
          Intelligent waivers that connect information, identity, and action — creating a trusted data layer that grows smarter with every signature.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full max-w-3xl">
          {TILES.map(({ href, Icon, label, sub, bg }) => (
            <Link key={href} href={href} className="bg-white rounded-2xl border border-black/10 hover:border-black/20 hover:shadow-md transition-all text-center group py-5 px-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-105 transition-transform" style={{ background:bg }}>
                <Icon size={18} color="white" strokeWidth={1.75} />
              </div>
              <div className="font-semibold text-ink text-sm mb-0.5 leading-tight">{label}</div>
              <div className="text-xs text-gray-400 leading-snug">{sub}</div>
            </Link>
          ))}
        </div>
      </section>

      {/* White-label preview */}
      <section className="px-6 py-10 bg-white border-y border-black/8">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-start justify-between flex-wrap gap-4 mb-6">
            <div>
              <p className="text-xs font-semibold tracking-widest text-brand uppercase mb-1">White-label preview</p>
              <h2 className="font-serif text-xl text-ink" style={{ letterSpacing:'-0.01em' }}>LIABL adapts to every operator&apos;s brand.</h2>
              <p className="text-sm text-gray-500 mt-1">Toggle between operators to see how the experience adapts.</p>
            </div>
            <div className="flex gap-2">
              {OPERATORS.map((o,i) => (
                <button key={o.name} onClick={() => setOpIndex(i)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all ${opIndex===i?'text-white border-transparent':'bg-surface border-black/10 text-gray-500'}`}
                  style={opIndex===i?{background:o.accent}:{}}>
                  {o.label}
                </button>
              ))}
            </div>
          </div>
          <div className="bg-surface rounded-2xl border border-black/10 overflow-hidden">
            <div className="bg-white border-b border-black/8 px-5 py-3 flex items-center justify-between">
              <Logo size="sm" operatorName={op.name} operatorAccent={op.accent} />
              <span className="text-xs text-gray-400 bg-surface border border-black/10 px-3 py-1 rounded-full">Participant signing</span>
            </div>
            <div className="px-6 py-10 max-w-sm mx-auto text-center">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg" style={{ background:op.accent }}>
                <op.Icon size={26} color="white" strokeWidth={1.75} />
              </div>
              <div className="text-xs font-semibold tracking-widest uppercase mb-1" style={{ color:op.accent }}>{op.name}</div>
              <h3 className="font-serif text-xl text-ink mb-1" style={{ letterSpacing:'-0.01em' }}>Welcome to {op.name.split(' ')[0]}.</h3>
              <p className="text-xs text-gray-400 mb-5">{op.tagline}</p>
              <p className="text-sm text-gray-500 mb-6">Please complete your liability waiver before your session.</p>
              <button className="w-full py-3 rounded-xl text-white font-semibold text-sm hover:opacity-90 transition-all" style={{ background:op.accent }}>Start waiver →</button>
              <p className="text-xs text-gray-400 mt-3">Secured by LIABL · ESIGN Act compliant</p>
            </div>
          </div>
        </div>
      </section>

      {/* Case study */}
      <section className="px-6 py-12 border-b border-black/8">
        <div className="max-w-3xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-center">
            <div className="sm:col-span-2">
              <p className="text-xs font-semibold tracking-widest text-brand uppercase mb-2">Case study · Desert Ridge Adventures</p>
              <h2 className="font-serif text-2xl text-ink mb-3" style={{ letterSpacing:'-0.01em' }}>From 22-minute check-ins to under 6 minutes — without changing a single staff member.</h2>
              <p className="text-sm text-gray-500 leading-relaxed mb-4">Desert Ridge Adventures switched from Smartwaiver to LIABL Connected in a single afternoon. FareHarbor integration took 15 minutes. Returning participant recognition was live from day one.</p>
              <blockquote className="border-l-2 border-brand pl-4 text-sm text-gray-600 italic leading-relaxed">&ldquo;We used to lose the first 20 minutes of every morning to paperwork. Now we lose maybe 5. That&rsquo;s 15 minutes per session we get back.&rdquo;</blockquote>
              <div className="text-xs text-gray-400 mt-2 pl-4">— Operations Manager, Desert Ridge Adventures</div>
            </div>
            <div className="space-y-2.5">
              {[{before:'22 min',after:'5 min 47 sec',label:'Group check-in time'},{before:'Clipboard',after:'Zero',label:'Manual reconciliation'},{before:'Paper',after:'Fully digital',label:'Minor guardian flow'},{before:'2 minutes',after:'30 seconds',label:'Incident record retrieval'}].map(({ before, after, label }) => (
                <div key={label} className="bg-white rounded-xl border border-black/10 p-3 text-xs">
                  <div className="text-gray-400 mb-1">{label}</div>
                  <div className="flex items-center gap-2"><span className="text-gray-400 line-through">{before}</span><span className="text-gray-300">→</span><span className="font-semibold text-emerald-600">{after}</span></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <footer className="px-6 py-8 text-center">
        <p className="text-xs text-gray-400">LIABL · Investor prototype · Think faster. Decide better.</p>
      </footer>
    </main>
  )
}
