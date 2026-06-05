'use client'
import { useState } from 'react'
import Logo from '@/components/Logo'

const FORCES = [
  {
    num:     '01',
    icon:    '🏔',
    title:   'Activity industry growth',
    sub:     'The market is expanding faster than the tooling',
    color:   'text-brand',
    bg:      'bg-brand/5 border-brand/20',
    stats: [
      { value:'24%', label:'US outdoor recreation growth 2020–2024' },
      { value:'$887B', label:'US outdoor recreation economy (2024)' },
      { value:'3.4M', label:'New outdoor participants since 2020' },
    ],
    body: `US outdoor recreation grew 24% between 2020 and 2024. New operators are entering markets that didn't exist five years ago — urban climbing gyms, urban paddleboard rentals, e-bike tours, cold plunge studios, urban archery ranges.

These operators are digitally native. They have no legacy waiver infrastructure to migrate away from. They are greenfield customers who will adopt whatever the default document solution is for their vertical — and right now, there is no clear default.

The post-COVID activity boom also created a secondary effect: operators who survived and grew are now professionalising. They're moving from paper clipboards to digital rosters, from verbal waivers to documented ones. They're looking for a purpose-built solution — not a general e-sign tool awkwardly adapted to their use case.`,
  },
  {
    num:     '02',
    icon:    '⚖️',
    title:   'Rising liability exposure',
    sub:     'Operators are aware that a bad waiver is worse than no waiver',
    color:   'text-amber-600',
    bg:      'bg-amber-50 border-amber-200',
    stats: [
      { value:'+31%', label:'Recreation-related injury suits 2019–2024' },
      { value:'$4.2M', label:'Average recreation liability settlement (2024)' },
      { value:'67%', label:'Of dismissed suits cite inadequate documentation' },
    ],
    body: `The number of recreation-related personal injury suits filed in US courts increased 31% between 2019 and 2024. Operators are increasingly aware that a poorly documented waiver is worse than no waiver — it creates false confidence while failing in court.

Courts have become more sophisticated about distinguishing between waivers that were signed but not understood (single-page PDF with 8pt font) and waivers that were read, activity-specific, and clearly accepted. LIABL's clause-read-through tracking, adaptive specificity, and audit trail directly address the documentation standards courts are applying.

The legal risk is a pull factor that didn't exist at this scale five years ago. Insurance carriers are beginning to ask about waiver quality as part of underwriting. This creates a B2B2C motion: insurers recommend LIABL-standard documentation, operators adopt it to qualify for better rates.`,
  },
  {
    num:     '03',
    icon:    '🔌',
    title:   'Booking platform API maturity',
    sub:     'The integration layer just became capable of supporting LIABL',
    color:   'text-emerald-600',
    bg:      'bg-emerald-50 border-emerald-200',
    stats: [
      { value:'2021–2024', label:'FareHarbor, Rezdy, Xola, Bókun REST API launches' },
      { value:'4 platforms', label:'With bidirectional webhook support as of 2024' },
      { value:'180K+', label:'Operators on FareHarbor alone' },
    ],
    body: `FareHarbor, Rezdy, Xola, and Bókun all launched or significantly expanded their REST APIs between 2021 and 2024. The technical infrastructure for bidirectional booking-waiver sync didn't exist at sufficient quality before this window.

This matters because LIABL's Group Reservations feature — the pre-arrival signing flow, real-time manifest sync, and waiver status flowing back to the booking platform — only works if the booking platforms have APIs capable of supporting it. They now do.

The 180,000+ operators on FareHarbor represent a distribution channel, not a sales challenge. A single FareHarbor integration surfaces LIABL to every FareHarbor operator at their moment of highest relevance: when a booking is confirmed. This is the land-and-expand motion that makes LIABL's growth non-linear after platform partnerships are established.`,
  },
]

const WINDOW_RISKS = [
  { risk:'Smartwaiver adds an API',           impact:'Closes the integration gap for their existing 50,000+ operators', timeline:'12–24 months' },
  { risk:'DocuSign acquires a vertical player', impact:'Brings enterprise sales motion to activity space',             timeline:'12–36 months' },
  { risk:'FareHarbor builds native waivers',  impact:'Disintermediates the booking platform integration moat',          timeline:'18–36 months' },
]

export default function WhyPage() {
  const [expanded, setExpanded] = useState<string | null>('01')

  return (
    <div className="min-h-screen bg-surface">
      <nav className="bg-white border-b border-black/10 px-5 py-3 flex items-center justify-between">
        <Logo size="md" />
        <span className="text-xs bg-surface border border-black/10 px-3 py-1.5 rounded-full text-gray-500">
          Why LIABL · Why now
        </span>
      </nav>

      {/* Dark hero */}
      <div className="bg-ink text-white px-6 py-16 text-center">
        <p className="text-xs font-semibold tracking-widest uppercase mb-4" style={{ color:'#A78BFA' }}>
          Market thesis
        </p>
        <h1 className="font-serif text-3xl sm:text-4xl mb-4 max-w-2xl mx-auto leading-tight">
          Three forces converging to create a window that closes in 18–36 months.
        </h1>
        <p className="text-gray-400 text-base max-w-xl mx-auto leading-relaxed">
          Activity industry growth, rising liability exposure, and booking platform API maturity have
          created a moment that didn&apos;t exist three years ago — and won&apos;t last three more.
        </p>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-12">

        {/* Three forces */}
        <div className="mb-12">
          <p className="text-xs font-semibold tracking-widest text-brand uppercase mb-6">Three converging forces</p>
          <div className="space-y-4">
            {FORCES.map(f => (
              <div key={f.num} className={`bg-white rounded-2xl border overflow-hidden ${expanded === f.num ? 'border-black/15' : 'border-black/10'}`}>
                {/* Header */}
                <div onClick={() => setExpanded(expanded === f.num ? null : f.num)}
                  className="flex items-start gap-4 px-5 py-5 cursor-pointer hover:bg-surface/40 transition-colors">
                  <div className="font-serif text-3xl text-gray-200 font-bold shrink-0 w-10 leading-none mt-1">{f.num}</div>
                  <div className="flex-1">
                    <div className="flex items-start gap-3 flex-wrap">
                      <div>
                        <div className={`font-semibold text-base text-ink flex items-center gap-2`}>
                          <span>{f.icon}</span>{f.title}
                        </div>
                        <div className="text-sm text-gray-400 mt-0.5">{f.sub}</div>
                      </div>
                    </div>
                    {/* Stats row — always visible */}
                    <div className="flex gap-4 mt-3 flex-wrap">
                      {f.stats.map(s => (
                        <div key={s.label} className={`rounded-lg border px-3 py-2 ${f.bg}`}>
                          <div className={`font-semibold text-lg leading-none mb-0.5 ${f.color}`}>{s.value}</div>
                          <div className="text-xs text-gray-500">{s.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <span className="text-gray-400 text-sm shrink-0">{expanded === f.num ? '▲' : '▼'}</span>
                </div>

                {/* Expanded body */}
                {expanded === f.num && (
                  <div className="border-t border-black/8 px-5 py-5 bg-surface/30">
                    {f.body.split('\n\n').map((para, i) => (
                      <p key={i} className="text-sm text-gray-600 leading-relaxed mb-3 last:mb-0">{para}</p>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* The window */}
        <div className="mb-12">
          <p className="text-xs font-semibold tracking-widest text-brand uppercase mb-4">The window — and why it closes</p>
          <p className="text-sm text-gray-500 leading-relaxed mb-6 max-w-2xl">
            The identity graph takes 3–5 years of signed documents to become defensible. Starting now
            is what makes it defensible later. The window closes as incumbents respond.
          </p>
          <div className="space-y-3">
            {WINDOW_RISKS.map(r => (
              <div key={r.risk} className="bg-white rounded-xl border border-black/10 p-4">
                <div className="flex items-start justify-between gap-3 flex-wrap mb-2">
                  <div className="font-semibold text-sm text-ink">{r.risk}</div>
                  <span className="text-xs bg-amber-50 text-amber-600 border border-amber-200 px-2.5 py-1 rounded-full shrink-0">{r.timeline}</span>
                </div>
                <div className="text-xs text-gray-400 leading-relaxed">{r.impact}</div>
              </div>
            ))}
          </div>
        </div>

        {/* LIABL's answer */}
        <div className="bg-brand rounded-2xl p-6 text-white">
          <p className="text-xs font-semibold tracking-widest uppercase mb-3 text-white/60">LIABL&apos;s answer</p>
          <h2 className="font-serif text-2xl mb-3">The moat is the data, not the feature.</h2>
          <p className="text-white/80 text-sm leading-relaxed mb-4">
            Any competitor can build adaptive waivers. Nobody can buy five years of signed participant
            data across thousands of operators. The identity graph — every participant&apos;s verified
            history across every LIABL-connected activity — is the asset that makes LIABL defensible.
          </p>
          <p className="text-white/80 text-sm leading-relaxed mb-5">
            At 5,000 operators and 2M+ participants in the graph, a new operator joining LIABL inherits
            68% participant recognition on day one. That makes LIABL the obvious choice over building a
            standalone system — and makes every new operator a network participant rather than just a customer.
          </p>
          <div className="grid grid-cols-3 gap-3">
            {[
              { value:'Year 1–2', label:'Build the document layer', sub:'Adaptive engine, Pass, integrations' },
              { value:'Year 2–3', label:'Build the network',        sub:'Cross-operator graph compounds' },
              { value:'Year 3–5', label:'The moat is defensible',  sub:'68% recognition at 5K operators' },
            ].map(({ value, label, sub }) => (
              <div key={value} className="bg-white/10 rounded-xl p-4 text-center">
                <div className="font-semibold text-sm mb-1">{value}</div>
                <div className="text-xs text-white/80 leading-snug mb-1">{label}</div>
                <div className="text-xs text-white/50 leading-snug">{sub}</div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
