import Link from 'next/link'
import Logo from '@/components/Logo'
import AdaptiveDemo   from '@/components/home/AdaptiveDemo'
import NetworkDemo    from '@/components/home/NetworkDemo'

const COMPETITORS = [
  { name: 'DocuSign',    cap: 'Enterprise e-sign', gap: 'No activity data. No risk calibration. Generic template model.' },
  { name: 'Adobe Sign',  cap: 'Workflow depth',    gap: 'No participant graph. No cross-operator recognition.' },
  { name: 'Smartwaiver', cap: 'Activity UX',       gap: 'Single-tenant. No AI layer. No jurisdiction engine.' },
  { name: 'Wherewolf',   cap: 'Check-in focus',    gap: 'No cross-operator graph. No adaptive document layer.' },
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
          Intelligent waivers that connect information, identity, and action, creating a trusted data layer that grows smarter with every signature.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 w-full max-w-2xl" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
          <Link href="/participant" className="card hover:shadow-md transition-shadow text-center">
            <div className="text-3xl mb-3">📋</div>
            <div className="font-semibold text-ink mb-1">Sign a waiver</div>
            <div className="text-sm text-gray-500">Participant flow</div>
          </Link>
          <Link href="/pass" className="card hover:shadow-md transition-shadow text-center" style={{ borderColor:'rgba(75,42,207,0.25)' }}>
            <div className="text-3xl mb-3">✦</div>
            <div className="font-semibold text-ink mb-1">LIABL Pass</div>
            <div className="text-sm text-gray-500">Returning participant</div>
          </Link>
          <Link href="/operator" className="card hover:shadow-md transition-shadow text-center">
            <div className="text-3xl mb-3">📊</div>
            <div className="font-semibold text-ink mb-1">Operator dashboard</div>
            <div className="text-sm text-gray-500">Check-in &amp; templates</div>
          </Link>
          <Link href="/groups" className="card hover:shadow-md transition-shadow text-center" style={{ borderColor:'rgba(75,42,207,0.25)' }}>
            <div className="text-3xl mb-3">👥</div>
            <div className="font-semibold text-ink mb-1">Group reservations</div>
            <div className="text-sm text-gray-500">Manage group bookings</div>
          </Link>
          <Link href="/integrations" className="card hover:shadow-md transition-shadow text-center">
            <div className="text-3xl mb-3">🔗</div>
            <div className="font-semibold text-ink mb-1">Integrations</div>
            <div className="text-sm text-gray-500">FareHarbor, Rezdy &amp; more</div>
          </Link>
          <Link href="/security" className="card hover:shadow-md transition-shadow text-center" style={{ borderColor:'rgba(75,42,207,0.25)' }}>
            <div className="text-3xl mb-3">🔐</div>
            <div className="font-semibold text-ink mb-1">Security &amp; Enterprise</div>
            <div className="text-sm text-gray-500">Audit, compliance &amp; RBAC</div>
          </Link>
          <Link href="/portal" className="card hover:shadow-md transition-shadow text-center">
            <div className="text-3xl mb-3">👤</div>
            <div className="font-semibold text-ink mb-1">Participant portal</div>
            <div className="text-sm text-gray-500">Waiver history &amp; profile</div>
          </Link>
        </div>
      </section>

      {/* ── Feature 01: Adaptive Document Intelligence (live demo) ── */}
      <section className="px-6 py-16 bg-white border-y border-black/8">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-xs font-semibold tracking-widest text-brand uppercase">Feature 01 · Year 1–2</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl text-ink mb-2">Adaptive document intelligence</h2>
          <p className="text-gray-500 text-sm leading-relaxed mb-8 max-w-2xl">
            The document builds itself from participant answers in real time. A cardiac condition doesn&apos;t add a note to a standard waiver — it triggers fundamentally different risk language and a new medical indemnification clause. Try it below.
          </p>
          <AdaptiveDemo />
        </div>
      </section>

      {/* ── Feature 05: Network Effect (live simulator) ── */}
      <section className="px-6 py-16 bg-ink text-white">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-xs font-semibold tracking-widest uppercase" style={{ color:'#A78BFA' }}>Feature 05 · Year 3–5</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl text-white mb-2">Document network effect</h2>
          <p className="text-gray-400 text-sm leading-relaxed mb-8 max-w-2xl">
            Each operator that joins LIABL increases the recognition rate for every other operator. Signed once — recognized everywhere. Drag the slider to see the flywheel in motion.
          </p>
          <NetworkDemo />
        </div>
      </section>

      {/* ── Market white space ── */}
      <section className="px-6 py-16 bg-white border-y border-black/8">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs font-semibold tracking-widest text-brand uppercase mb-3">Market white space</p>
          <h2 className="font-serif text-2xl sm:text-3xl text-ink mb-3 max-w-xl">
            Activity-aware, participant-specific, legally intelligent — owned by nobody.
          </h2>
          <p className="text-gray-500 text-sm leading-relaxed mb-8 max-w-2xl">
            DocuSign and Adobe own enterprise e-signature. Smartwaiver and Wherewolf own activity check-in.
            Neither side owns the white space between them. That is where LIABL is built.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
            {COMPETITORS.map(c => (
              <div key={c.name} className="bg-surface rounded-xl border border-black/10 p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="font-semibold text-sm text-ink">{c.name}</div>
                  <span className="text-xs bg-white border border-black/10 px-2 py-0.5 rounded-full text-gray-400">{c.cap}</span>
                </div>
                <div className="text-xs text-gray-400 leading-relaxed">{c.gap}</div>
              </div>
            ))}
          </div>

          <div className="bg-brand/5 border border-brand/20 rounded-xl p-5">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-brand flex items-center justify-center text-white text-sm font-bold shrink-0 mt-0.5">L</div>
              <div>
                <div className="font-semibold text-ink mb-1">LIABL fills the gap</div>
                <div className="text-sm text-gray-500 leading-relaxed">
                  New entrants cannot replicate LIABL&apos;s position — the participant identity graph requires years of signed documents to become defensible. The network effect is the moat.
                </div>
              </div>
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
