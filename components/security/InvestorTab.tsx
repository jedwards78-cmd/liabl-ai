'use client'
import AdaptiveDemo from '@/components/home/AdaptiveDemo'
import NetworkDemo  from '@/components/home/NetworkDemo'

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
  { num:'04', phase:'Year 2–3', title:'Operator intelligence layer',      desc:'Risk signals, clause read-through rates, compliance alerts, and analytics. A safety intelligence platform — not just a signing tool.' },
  { num:'05', phase:'Year 3–5', title:'Document network effect',          desc:'At 5,000 operators, 68% of participants arrive already verified. Each new operator inherits the entire network.' },
]

export default function InvestorTab() {
  return (
    <div className="space-y-16">

      {/* ── Market white space ── */}
      <section>
        <p className="text-xs font-semibold tracking-widest text-brand uppercase mb-3">Market white space</p>
        <h2 className="font-serif text-2xl text-ink mb-3 max-w-xl">
          Activity-aware, participant-specific, legally intelligent — owned by nobody.
        </h2>
        <p className="text-gray-500 text-sm leading-relaxed mb-8 max-w-2xl">
          DocuSign and Adobe own enterprise e-signature. Smartwaiver and Wherewolf own activity check-in.
          Neither side owns the white space between them — high document intelligence combined with
          deep activity-specific participant data. That is where LIABL is built.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
          {COMPETITORS.map(c => (
            <div key={c.name} className="bg-white rounded-xl border border-black/10 p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="font-semibold text-sm text-ink">{c.name}</div>
                <span className="text-xs bg-surface border border-black/10 px-2 py-0.5 rounded-full text-gray-400">{c.cap}</span>
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
                New entrants cannot replicate LIABL&apos;s position — the participant identity graph requires years
                of signed documents to become defensible. The network effect is the moat.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Five features ── */}
      <section>
        <p className="text-xs font-semibold tracking-widest text-brand uppercase mb-3">Five differentiating features</p>
        <h2 className="font-serif text-2xl text-ink mb-8">What LIABL builds — and why now.</h2>
        <div className="space-y-3">
          {FIVE_FEATURES.map(f => (
            <div key={f.num} className="flex gap-5 bg-white rounded-2xl border border-black/10 p-5">
              <div className="font-serif text-3xl text-brand/20 font-bold shrink-0 w-10">{f.num}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-3 flex-wrap mb-1">
                  <div className="font-semibold text-ink">{f.title}</div>
                  <span className="text-xs bg-surface border border-black/10 px-2.5 py-1 rounded-full text-gray-400 shrink-0">{f.phase}</span>
                </div>
                <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Feature 01: Adaptive document intelligence (live demo) ── */}
      <section className="bg-white rounded-2xl border border-black/10 p-6">
        <div className="mb-2">
          <span className="text-xs font-semibold tracking-widest text-brand uppercase">Feature 01 · Live demo</span>
        </div>
        <h2 className="font-serif text-xl text-ink mb-2">Adaptive document intelligence</h2>
        <p className="text-gray-500 text-sm leading-relaxed mb-6 max-w-2xl">
          The document builds itself from participant answers in real time. A cardiac condition doesn&apos;t
          add a note to a standard waiver — it triggers fundamentally different risk language and a new
          medical indemnification clause. Try it below.
        </p>
        <AdaptiveDemo />
      </section>

      {/* ── Feature 05: Network effect (live simulator) ── */}
      <section className="bg-ink rounded-2xl p-6">
        <div className="mb-2">
          <span className="text-xs font-semibold tracking-widest uppercase" style={{ color:'#A78BFA' }}>Feature 05 · Live simulator</span>
        </div>
        <h2 className="font-serif text-xl text-white mb-2">Document network effect</h2>
        <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-2xl">
          Each operator that joins LIABL increases the recognition rate for every other operator.
          Signed once — recognized everywhere. Drag the slider to see the flywheel in motion.
        </p>
        <NetworkDemo />
      </section>

    </div>
  )
}
