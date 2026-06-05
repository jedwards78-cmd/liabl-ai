import Link from 'next/link'
import Logo from '@/components/Logo'

const TILES = [
  { href:'/participant', icon:'📋', label:'Sign a waiver',          sub:'Participant flow',          accent:false },
  { href:'/portal',      icon:'✦',  label:'Participant portal',      sub:'Profile & waiver history',  accent:true  },
  { href:'/operator',    icon:'📊', label:'Operator dashboard',      sub:'Roster, analytics & templates', accent:false },
  { href:'/groups',      icon:'👥', label:'Group reservations',      sub:'Manage group bookings',     accent:true  },
  { href:'/integrations',icon:'🔗', label:'Integrations',            sub:'FareHarbor, Rezdy & SSO',   accent:false },
  { href:'/security',    icon:'🔐', label:'Security & Enterprise',   sub:'Audit, compliance & RBAC',  accent:false },
  { href:'/pricing',     icon:'💳', label:'Pricing',                 sub:'Plans & enterprise options',accent:true  },
  { href:'/why',         icon:'🚀', label:'Why LIABL · Why now',     sub:'Market case & narrative',   accent:false },
]

export default function Home() {
  return (
    <main className="min-h-screen bg-surface">

      {/* ── Hero ── */}
      <section className="flex flex-col items-center justify-center px-6 pt-20 pb-16 text-center">
        <div className="mb-8">
          <Logo size="lg" />
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl text-ink max-w-2xl leading-tight mb-5">
          The modern document layer that bridges information, action, and intelligence.
        </h1>
        <p className="text-gray-500 text-base max-w-xl mx-auto leading-relaxed mb-10">
          Intelligent waivers that connect information, identity, and action — creating a trusted data layer that grows smarter with every signature.
        </p>

        {/* Nav tiles — 4 cols on desktop, 2 on mobile */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full max-w-3xl">
          {TILES.map(({ href, icon, label, sub, accent }) => (
            <Link key={href} href={href}
              className={`card hover:shadow-md transition-all text-center group py-5 ${
                accent ? 'border-brand/25 hover:border-brand/50' : 'hover:border-black/20'
              }`}>
              <div className="text-3xl mb-2">{icon}</div>
              <div className="font-semibold text-ink text-sm mb-0.5 leading-tight">{label}</div>
              <div className="text-xs text-gray-400 leading-snug">{sub}</div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Case study strip ── */}
      <section className="px-6 py-12 bg-white border-y border-black/8">
        <div className="max-w-3xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-center">
            <div className="sm:col-span-2">
              <p className="text-xs font-semibold tracking-widest text-brand uppercase mb-2">Case study · Desert Ridge Adventures</p>
              <h2 className="font-serif text-2xl text-ink mb-3">
                From 22-minute check-ins to under 6 minutes — without changing a single staff member.
              </h2>
              <p className="text-sm text-gray-500 leading-relaxed mb-4">
                Desert Ridge Adventures switched from Smartwaiver to LIABL Connected in a single afternoon.
                FareHarbor integration took 15 minutes. Returning participant recognition was live from day one.
              </p>
              <blockquote className="border-l-2 border-brand pl-4 text-sm text-gray-600 italic leading-relaxed">
                &ldquo;We used to lose the first 20 minutes of every morning to paperwork. Now we lose maybe 5.
                That&rsquo;s 15 minutes per session we get back — and our guides are actually in the right
                headspace when they brief.&rdquo;
              </blockquote>
              <div className="text-xs text-gray-400 mt-2 pl-4">— Operations Manager, Desert Ridge Adventures</div>
            </div>
            <div className="space-y-3">
              {[
                { before:'22 min', after:'5 min 47 sec', label:'Group check-in time' },
                { before:'Clipboard', after:'Zero', label:'Manual reconciliation' },
                { before:'Paper forms', after:'Fully digital', label:'Minor guardian flow' },
                { before:'2 minutes', after:'30 seconds', label:'Incident record retrieval' },
              ].map(({ before, after, label }) => (
                <div key={label} className="bg-surface rounded-xl p-3 text-xs">
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
