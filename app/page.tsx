'use client'
import Link from 'next/link'
import Logo from '@/components/Logo'
import {
  FileSignature, UserCircle, LayoutDashboard, Users,
  Plug, ShieldCheck, CreditCard, TrendingUp,
} from 'lucide-react'

const TILES = [
  { href:'/participant', Icon:FileSignature,   label:'Sign a Waiver',         sub:'Participant flow',                bg:'#4B2ACF' },
  { href:'/portal',      Icon:UserCircle,      label:'Participant Portal',     sub:'Profile & waiver history',        bg:'#0891B2' },
  { href:'/operator',    Icon:LayoutDashboard, label:'Operator Dashboard',     sub:'Roster, analytics & templates',   bg:'#059669' },
  { href:'/groups',      Icon:Users,           label:'Group Reservations',     sub:'Manage group bookings',           bg:'#7C3AED' },
  { href:'/integrations',Icon:Plug,            label:'Integrations',           sub:'FareHarbor, Rezdy, SSO & more',   bg:'#D97706' },
  { href:'/security',    Icon:ShieldCheck,     label:'Security & Enterprise',  sub:'Audit, compliance & RBAC',        bg:'#DC2626' },
  { href:'/pricing',     Icon:CreditCard,      label:'Pricing',                sub:'Plans & enterprise options',      bg:'#0D9488' },
  { href:'/why',         Icon:TrendingUp,      label:'Why LIABL · Why Now',    sub:'Market case & investor overview', bg:'#BE185D' },
]

export default function Home() {
  return (
    <main className="min-h-screen bg-surface">

      {/* Hero */}
      <section className="flex flex-col items-center justify-center px-6 pt-20 pb-14 text-center">
        <div className="mb-8"><Logo size="lg" /></div>
        <h1 className="font-serif text-3xl sm:text-4xl text-ink max-w-2xl leading-tight mb-5" style={{ letterSpacing:'-0.02em' }}>
          The modern document layer that bridges information, action, and intelligence.
        </h1>
        <p className="text-gray-500 text-base max-w-xl mx-auto leading-relaxed mb-10">
          Intelligent waivers that connect information, identity, and action — creating a trusted
          data layer that grows smarter with every signature.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full max-w-3xl">
          {TILES.map(({ href, Icon, label, sub, bg }) => (
            <Link key={href} href={href}
              className="bg-white rounded-2xl border border-black/10 hover:border-black/20 hover:shadow-md transition-all text-center group py-5 px-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-105 transition-transform" style={{ background:bg }}>
                <Icon size={18} strokeWidth={1.75} style={{ color:'white' }} />
              </div>
              <div className="font-semibold text-ink text-sm mb-0.5 leading-tight">{label}</div>
              <div className="text-xs text-gray-400 leading-snug">{sub}</div>
            </Link>
          ))}
        </div>
      </section>

      {/* Case study — directly below tiles */}
      <section className="px-6 py-12 bg-white border-y border-black/8">
        <div className="max-w-3xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-center">
            <div className="sm:col-span-2">
              <p className="text-xs font-semibold tracking-widest text-brand uppercase mb-2">Case Study · Desert Ridge Adventures</p>
              <h2 className="font-serif text-2xl text-ink mb-3" style={{ letterSpacing:'-0.01em' }}>
                From 22-minute check-ins to under 6 minutes — without changing a single staff member.
              </h2>
              <p className="text-sm text-gray-500 leading-relaxed mb-4">
                Desert Ridge Adventures switched from Smartwaiver to LIABL Connected in a single afternoon.
                FareHarbor integration took 15 minutes. Returning participant recognition was live from day one.
              </p>
              <blockquote className="border-l-2 border-brand pl-4 text-sm text-gray-600 italic leading-relaxed">
                &ldquo;We used to lose the first 20 minutes of every morning to paperwork. Now we lose maybe 5. That&rsquo;s 15 minutes per session we get back.&rdquo;
              </blockquote>
              <div className="text-xs text-gray-400 mt-2 pl-4">— Operations Manager, Desert Ridge Adventures</div>
            </div>
            <div className="space-y-2.5">
              {[
                {before:'22 min',    after:'5 min 47 sec', label:'Group check-in time'},
                {before:'Clipboard', after:'Zero',         label:'Manual reconciliation'},
                {before:'Paper',     after:'Fully digital',label:'Minor guardian flow'},
                {before:'2 minutes', after:'30 seconds',   label:'Incident record retrieval'},
              ].map(({before,after,label})=>(
                <div key={label} className="bg-surface rounded-xl border border-black/10 p-3 text-xs">
                  <div className="text-gray-400 mb-1">{label}</div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-400 line-through">{before}</span>
                    <span className="text-gray-300">→</span>
                    <span className="font-semibold text-emerald-600">{after}</span>
                  </div>
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
