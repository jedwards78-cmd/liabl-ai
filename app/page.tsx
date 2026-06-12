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

      {/* ── How It Works ── */}
      <section className="px-6 py-14 bg-white border-b border-black/8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-xs font-semibold tracking-widest text-brand uppercase mb-2">How It Works</p>
            <h2 className="font-serif text-2xl sm:text-3xl text-ink" style={{ letterSpacing:'-0.01em' }}>
              From booking to signed waiver in three steps.
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 relative">
            {/* Connector line — desktop only */}
            <div className="hidden sm:block absolute top-10 left-1/6 right-1/6 h-0.5 bg-brand/20" style={{ left:'18%', right:'18%' }} />
            {[
              {
                step:'01',
                icon:'⚙️',
                title:'Operator sets up activity templates',
                desc:'Configure your activities, questions, and signing rules once. LIABL generates adaptive waivers automatically from every participant\'s answers — no static PDFs, no manual updates.',
                link:'/operator',
                linkLabel:'See Activity Templates',
              },
              {
                step:'02',
                icon:'✍️',
                title:'Participant scans and signs',
                desc:'Participants scan a QR code or follow a booking link. The waiver adapts to their activity, health profile, and age in real time. Average signing time: under 2 minutes for new participants, 15 seconds for returning.',
                link:'/participant',
                linkLabel:'Try the Signing Flow',
              },
              {
                step:'03',
                icon:'📋',
                title:'Waiver appears in your dashboard',
                desc:'The signed document appears in your operator roster instantly — with AI risk score, audit trail, full chain of custody, and automatic notification to your insurance carrier if an incident occurs.',
                link:'/operator',
                linkLabel:'See Operator Dashboard',
              },
            ].map(({ step, icon, title, desc, link, linkLabel }) => (
              <div key={step} className="flex flex-col items-center text-center">
                <div className="relative w-20 h-20 rounded-2xl bg-brand/5 border border-brand/20 flex items-center justify-center text-3xl mb-4 z-10">
                  {icon}
                  <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-brand text-white text-xs font-bold flex items-center justify-center">{step}</span>
                </div>
                <h3 className="font-semibold text-ink mb-2 leading-tight">{title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed mb-3">{desc}</p>
                <a href={link} className="text-xs text-brand underline hover:opacity-70 transition-opacity">{linkLabel} →</a>
              </div>
            ))}
          </div>

          {/* Time callout */}
          <div className="mt-10 grid grid-cols-3 gap-3">
            {[
              { value:'< 2 min',  label:'First-time participant',  sub:'End-to-end signing time' },
              { value:'~15 sec',  label:'Returning participant',   sub:'With LIABL Pass recognition' },
              { value:'< 60 sec', label:'Operator setup',         sub:'First activity template configured' },
            ].map(({ value, label, sub }) => (
              <div key={label} className="bg-surface rounded-xl border border-black/10 p-4 text-center">
                <div className="font-serif text-2xl text-brand font-semibold mb-1" style={{ letterSpacing:'-0.02em' }}>{value}</div>
                <div className="text-xs font-medium text-ink mb-0.5">{label}</div>
                <div className="text-xs text-gray-400">{sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="px-6 py-14 border-b border-black/8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <p className="text-xs font-semibold tracking-widest text-brand uppercase mb-2">What Operators Say</p>
            <h2 className="font-serif text-2xl text-ink" style={{ letterSpacing:'-0.01em' }}>
              Real results from real operators.
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                quote:"Our morning check-in used to feel like controlled chaos. Now it runs itself. The FareHarbor sync alone saved us an hour a day.",
                name:'Marcus T.',
                role:'Owner, Sonoran ATV Adventures',
                type:'Adventure operator · Arizona',
                before:'18 min',
                after:'4 min',
                metric:'Group check-in time',
                avatar:'MT',
                color:'#4B2ACF',
              },
              {
                quote:"When we had an incident last spring, I had the full document chain of custody in front of our attorney in under two minutes. That waiver held up.",
                name:'Rachel K.',
                role:'Operations Director, Summit Climbing Co.',
                type:'Climbing gym · Colorado',
                before:'Paper forms',
                after:'Digital + verified',
                metric:'Waiver documentation',
                avatar:'RK',
                color:'#DC2626',
              },
              {
                quote:"We run youth programs — the guardian signature flow is the feature that sold us. Parents sign from home before drop-off. Zero paper at the door.",
                name:'David L.',
                role:'Program Manager, Desert Youth Adventures',
                type:'Youth programs · Nevada',
                before:'Paper guardian forms',
                after:'Digital pre-arrival',
                metric:'Minor authorization',
                avatar:'DL',
                color:'#059669',
              },
            ].map(({ quote, name, role, type, before, after, metric, avatar, color }) => (
              <div key={name} className="bg-white rounded-2xl border border-black/10 p-5 flex flex-col">
                <div className="flex-1">
                  <p className="text-sm text-gray-600 leading-relaxed italic mb-4">&ldquo;{quote}&rdquo;</p>
                </div>
                {/* Result pill */}
                <div className="bg-surface rounded-xl p-3 mb-4 text-xs">
                  <div className="text-gray-400 mb-1">{metric}</div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-400 line-through">{before}</span>
                    <span className="text-gray-300">→</span>
                    <span className="font-semibold text-emerald-600">{after}</span>
                  </div>
                </div>
                {/* Attribution */}
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
                    style={{ background: color }}>
                    {avatar}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-ink">{name}</div>
                    <div className="text-xs text-gray-400">{role}</div>
                    <div className="text-xs text-gray-400">{type}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Case study ── */}
      <section className="px-6 py-12 bg-white border-b border-black/8">
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
