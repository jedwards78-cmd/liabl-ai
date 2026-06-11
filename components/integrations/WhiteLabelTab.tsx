'use client'
import { useState } from 'react'
import { Waves, Dumbbell } from 'lucide-react'
import Logo from '@/components/Logo'

const OPERATORS = [
  {
    name:       'Desert Ridge Adventures',
    shortName:  'Desert Ridge',
    tagline:    'Whitewater · ATV · Climbing · Hiking',
    accent:     '#4B2ACF',
    Icon:       Waves,
    label:      'Adventure',
  },
  {
    name:       'Tucson Wellness Studio',
    shortName:  'Tucson Wellness',
    tagline:    'Yoga · Pilates · Strength · Recovery',
    accent:     '#059669',
    Icon:       Dumbbell,
    label:      'Wellness',
  },
]

export default function WhiteLabelTab() {
  const [opIndex, setOpIndex] = useState(0)
  const op = OPERATORS[opIndex]

  return (
    <div className="space-y-8">

      {/* Intro */}
      <div>
        <h2 className="font-serif text-xl mb-1" style={{ letterSpacing:'-0.01em' }}>White-Label</h2>
        <p className="text-sm text-gray-500 leading-relaxed max-w-2xl">
          LIABL adapts completely to any operator&apos;s brand. The participant signing experience —
          colours, icons, and operator name — all inherit from the operator&apos;s configuration.
          Powered by LIABL, invisible to the participant.
        </p>
      </div>

      {/* How it works */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {[
          { icon:'🎨', title:'Full UI white-labeling',    desc:'Every participant-facing screen inherits the operator\'s brand colour, icon, and name. The LIABL mark appears only as "Secured by LIABL" in the footer.' },
          { icon:'🌐', title:'Custom domain',             desc:'Operators can serve the signing experience from their own domain (e.g. waivers.desertridgeadventures.com). Zero LIABL branding visible.' },
          { icon:'⚡', title:'Platform-level API access', desc:'Booking platforms embed LIABL under their own brand. One integration surfaces white-labeled waivers to every operator on the platform.' },
        ].map(p => (
          <div key={p.title} className="bg-white rounded-xl border border-black/10 p-4">
            <div className="text-2xl mb-2">{p.icon}</div>
            <div className="font-semibold text-sm text-ink mb-1">{p.title}</div>
            <p className="text-xs text-gray-400 leading-relaxed">{p.desc}</p>
          </div>
        ))}
      </div>

      {/* Live preview */}
      <div>
        <div className="flex items-start justify-between flex-wrap gap-4 mb-4">
          <div>
            <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Live preview</div>
            <p className="text-sm text-gray-500">Toggle between operators to see how the signing experience adapts.</p>
          </div>
          <div className="flex gap-2">
            {OPERATORS.map((o, i) => (
              <button key={o.name} onClick={() => setOpIndex(i)}
                className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all ${
                  opIndex === i ? 'text-white border-transparent' : 'bg-surface border-black/10 text-gray-500 hover:border-black/20'
                }`}
                style={opIndex === i ? { background: o.accent } : {}}>
                {o.label}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-surface rounded-2xl border border-black/10 overflow-hidden">
          {/* No simulated nav bar — removed per v13 spec */}

          {/* Simulated signing entry screen */}
          <div className="px-6 py-12 max-w-sm mx-auto text-center">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg"
              style={{ background: op.accent }}>
              <op.Icon size={26} strokeWidth={1.75} style={{ color:'white' }} />
            </div>

            {/* Full operator name as eyebrow */}
            <div className="text-xs font-semibold tracking-widest uppercase mb-1"
              style={{ color: op.accent }}>
              {op.name}
            </div>

            {/* Short name in heading */}
            <h3 className="font-serif text-xl text-ink mb-1" style={{ letterSpacing:'-0.01em' }}>
              Welcome to {op.shortName}.
            </h3>

            <p className="text-xs text-gray-400 mb-5">{op.tagline}</p>
            <p className="text-sm text-gray-500 mb-6">Please complete your liability waiver before your session.</p>

            <button className="w-full py-3 rounded-xl text-white font-semibold text-sm hover:opacity-90 transition-all"
              style={{ background: op.accent }}>
              Start Waiver →
            </button>
            <p className="text-xs text-gray-400 mt-3">Secured by LIABL · ESIGN Act compliant</p>
          </div>
        </div>
      </div>

      {/* Config reference */}
      <div className="bg-ink rounded-2xl p-5">
        <div className="text-white font-medium mb-3 text-sm">Operator brand config</div>
        <div className="font-mono text-xs text-green-400 leading-relaxed overflow-x-auto">
          <div>{`{`}</div>
          <div className="ml-4 text-gray-300">{`"operator_id":  "${op.name.toLowerCase().replace(/\s+/g,'-')}",`}</div>
          <div className="ml-4 text-gray-300">{`"display_name": "${op.name}",`}</div>
          <div className="ml-4 text-gray-300">{`"short_name":   "${op.shortName}",`}</div>
          <div className="ml-4 text-gray-300">{`"accent_color": "${op.accent}",`}</div>
          <div className="ml-4 text-gray-300">{`"icon":         "${op.Icon.displayName ?? 'custom'}",`}</div>
          <div className="ml-4 text-gray-300">{`"domain":       "waivers.${op.name.split(' ')[0].toLowerCase()}.com"`}</div>
          <div>{`}`}</div>
        </div>
      </div>

      {/* Pricing callout */}
      <div className="bg-brand/5 border border-brand/20 rounded-xl p-4 flex items-start gap-3">
        <div className="w-8 h-8 rounded-lg bg-brand flex items-center justify-center text-white text-sm font-bold shrink-0">L</div>
        <div>
          <div className="font-semibold text-ink text-sm mb-1">White-label pricing</div>
          <div className="text-xs text-gray-500 leading-relaxed">
            White-label is available as a platform licensing arrangement — priced as a platform fee rather
            than per-operator. One integration surfaces LIABL to every operator on your platform.
            Revenue share available for high-volume platform partners.{' '}
            <span className="text-brand underline cursor-pointer">See pricing →</span>
          </div>
        </div>
      </div>

    </div>
  )
}
