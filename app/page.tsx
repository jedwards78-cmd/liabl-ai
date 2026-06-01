import Link from 'next/link'
import Logo from '@/components/Logo'

const DIFFERENTIATORS = [
  {
    num: '01',
    title: 'Adaptive document intelligence',
    desc: 'Documents build themselves from answers — activity, risk, health, jurisdiction. No static templates.',
    phase: 'Year 1–2',
  },
  {
    num: '02',
    title: 'Participant identity graph',
    desc: 'Every signing event strengthens a verified cross-operator profile. The data moat competitors cannot buy.',
    phase: 'Year 2–3',
  },
  {
    num: '03',
    title: 'LIABL Pass',
    desc: 'Returning participants recognized across operators. First-time: ~2 min. Returning: ~15 sec.',
    phase: 'Year 2–3',
  },
  {
    num: '04',
    title: 'Operator intelligence',
    desc: 'Risk signals, clause read-through rates, and compliance alerts. A safety intelligence platform, not just a signing tool.',
    phase: 'Year 2–3',
  },
  {
    num: '05',
    title: 'Document network effect',
    desc: 'At 5,000 operators, 68% of participants arrive already verified. Each new operator inherits the entire network.',
    phase: 'Year 3–5',
  },
]

const COMPETITORS = [
  { name: 'DocuSign', note: "Enterprise scale — no activity data, no risk calibration, generic templates" },
  { name: 'Adobe Sign', note: "Workflow depth — no participant graph, no cross-operator recognition" },
  { name: 'Smartwaiver', note: "Activity UX — single-tenant, no AI layer, no jurisdiction engine" },
  { name: 'Wherewolf', note: "Check-in focus — no cross-operator graph, no adaptive document layer" },
]

export default function Home() {
  return (
    <main className="min-h-screen bg-surface">

      {/* ── Hero ── */}
      <section className="flex flex-col items-center justify-center px-6 pt-20 pb-16 text-center">
        <div className="mb-8">
          <Logo size="lg" />
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl text-ink max-w-lg leading-tight mb-4">
          The document layer the activity world has been missing.
        </h1>
        <p className="text-gray-500 text-base max-w-md mx-auto leading-relaxed mb-10">
          Intelligent waivers that adapt to every participant, build a verified identity graph, and get smarter with every signature.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-2xl">
          <Link href="/participant" className="card hover:shadow-md transition-shadow text-center group">
            <div className="text-3xl mb-3">📋</div>
            <div className="font-semibold text-ink mb-1">Sign a waiver</div>
            <div className="text-sm text-gray-500">Participant flow</div>
          </Link>
          <Link href="/pass" className="card hover:shadow-md transition-shadow text-center group" style={{ borderColor: 'rgba(75,42,207,0.25)' }}>
            <div className="text-3xl mb-3">✦</div>
            <div className="font-semibold text-ink mb-1">LIABL Pass</div>
            <div className="text-sm text-gray-500">Returning participant</div>
          </Link>
          <Link href="/operator" className="card hover:shadow-md transition-shadow text-center group">
            <div className="text-3xl mb-3">📊</div>
            <div className="font-semibold text-ink mb-1">Operator dashboard</div>
            <div className="text-sm text-gray-500">Check-in &amp; templates</div>
          </Link>
        </div>
      </section>

      {/* ── White space section ── */}
      <section className="px-6 py-16 bg-white border-y border-black/8">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs font-semibold tracking-widest text-brand uppercase mb-3">Market white space</p>
          <h2 className="font-serif text-2xl sm:text-3xl text-ink mb-3 max-w-xl">
            Activity-aware, participant-specific, legally intelligent documents — owned by nobody.
          </h2>
          <p className="text-gray-500 text-sm leading-relaxed mb-10 max-w-2xl">
            DocuSign and Adobe own enterprise e-signature. Smartwaiver and Wherewolf own activity check-in. 
            Neither side owns the white space between them — high document intelligence combined with 
            deep activity-specific participant data. That is where LIABL is built.
          </p>

          {/* Competitor gap */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
            {COMPETITORS.map(c => (
              <div key={c.name} className="bg-surface rounded-xl border border-black/10 p-4">
                <div className="font-semibold text-sm text-ink mb-1">{c.name}</div>
                <div className="text-xs text-gray-400 leading-relaxed">{c.note}</div>
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

      {/* ── Five differentiators ── */}
      <section className="px-6 py-16">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs font-semibold tracking-widest text-brand uppercase mb-3">Five differentiating features</p>
          <h2 className="font-serif text-2xl sm:text-3xl text-ink mb-10">What LIABL builds — and why now.</h2>

          <div className="space-y-4">
            {DIFFERENTIATORS.map(d => (
              <div key={d.num} className="flex gap-5 bg-white rounded-2xl border border-black/10 p-5">
                <div className="font-serif text-3xl text-brand/20 font-bold shrink-0 w-10">{d.num}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3 flex-wrap mb-1">
                    <div className="font-semibold text-ink">{d.title}</div>
                    <span className="text-xs bg-surface border border-black/10 px-2.5 py-1 rounded-full text-gray-400 shrink-0">{d.phase}</span>
                  </div>
                  <p className="text-sm text-gray-500 leading-relaxed">{d.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Network effect flywheel ── */}
      <section className="px-6 py-16 bg-ink text-white">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs font-semibold tracking-widest text-brand-light uppercase mb-3" style={{ color: '#A78BFA' }}>Network effect</p>
          <h2 className="font-serif text-2xl sm:text-3xl mb-3">The flywheel builds itself.</h2>
          <p className="text-gray-400 text-sm mb-12 max-w-lg mx-auto leading-relaxed">
            Each operator that joins LIABL increases the recognition rate for every other operator. 
            At scale, most participants arrive already verified.
          </p>

          <div className="grid grid-cols-3 gap-4 max-w-xl mx-auto">
            {[
              { ops: '50 operators', pct: '~12%', label: 'of sessions are returning participants' },
              { ops: '500 operators', pct: '~41%', label: 'nearly half arrive with verified profiles' },
              { ops: '5,000 operators', pct: '~68%', label: 'most participants arrive already known' },
            ].map(({ ops, pct, label }) => (
              <div key={ops} className="bg-white/5 border border-white/10 rounded-2xl p-5 text-center">
                <div className="text-3xl font-semibold mb-1" style={{ color: '#A78BFA' }}>{pct}</div>
                <div className="text-xs text-gray-300 mb-3 leading-relaxed">{label}</div>
                <div className="text-xs text-gray-500 border-t border-white/10 pt-3">{ops}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="px-6 py-8 text-center">
        <p className="text-xs text-gray-400">LIABL · Investor prototype · Think faster. Decide better.</p>
      </footer>
    </main>
  )
}
