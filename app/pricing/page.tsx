'use client'
import { useState } from 'react'
import Logo from '@/components/Logo'

type Period = 'monthly' | 'annual'

const TIERS = [
  {
    id:       'core',
    name:     'Core',
    tagline:  'Smart waivers. Flat fee. No surprises.',
    monthly:  49,
    annual:   39,
    accent:   false,
    highlight:false,
    cta:      'Start free trial',
    features: [
      { label:'Adaptive document engine',        included:true  },
      { label:'Unlimited participants & signatures', included:true },
      { label:'Guardian flow for minors',        included:true  },
      { label:'Operator roster & check-in',      included:true  },
      { label:'Email confirmations',             included:true  },
      { label:'90-day document retention',       included:true  },
      { label:'1 operator user seat',            included:true  },
      { label:'LIABL Pass (cross-operator)',      included:false },
      { label:'Group reservations',              included:false },
      { label:'Booking platform integrations',   included:false },
      { label:'Analytics & export',              included:false },
      { label:'API access',                      included:false },
      { label:'Custom branding',                 included:false },
    ],
  },
  {
    id:       'connected',
    name:     'Connected',
    tagline:  'Your booking platform and LIABL — always in sync.',
    monthly:  149,
    annual:   119,
    accent:   true,
    highlight:true,
    cta:      'Start free trial',
    features: [
      { label:'Everything in Core',              included:true  },
      { label:'LIABL Pass (cross-operator)',      included:true  },
      { label:'Group reservations (all 4 tabs)', included:true  },
      { label:'FareHarbor, Rezdy, Xola, Bókun',  included:true  },
      { label:'Bidirectional webhooks',          included:true  },
      { label:'Analytics dashboard + CSV export',included:true  },
      { label:'Staff notes & addendum workflow', included:true  },
      { label:'3-year document retention (AZ)',  included:true  },
      { label:'5 operator user seats',           included:true  },
      { label:'API read access',                 included:true  },
      { label:'Role-based access control',       included:false },
      { label:'Legal hold & lifecycle mgmt',     included:false },
      { label:'SSO (Azure / Okta)',              included:false },
    ],
  },
  {
    id:       'intelligence',
    name:     'Intelligence',
    tagline:  'The compliance layer your legal team has been asking for.',
    monthly:  349,
    annual:   279,
    accent:   false,
    highlight:false,
    cta:      'Start free trial',
    features: [
      { label:'Everything in Connected',         included:true  },
      { label:'Full analytics suite',            included:true  },
      { label:'Document lifecycle management',   included:true  },
      { label:'Legal hold & retention policies', included:true  },
      { label:'Role-based access control',       included:true  },
      { label:'Metadata tagging',                included:true  },
      { label:'Audit trail & hash verification', included:true  },
      { label:'GDPR/CCPA deletion workflow',     included:true  },
      { label:'7-year document retention',       included:true  },
      { label:'Unlimited user seats',            included:true  },
      { label:'Full API access (read/write)',     included:true  },
      { label:'Priority support',                included:true  },
      { label:'SSO (Azure / Okta)',              included:false },
    ],
  },
]

const COMPARE_ROWS: { feature: string; core: string | boolean; connected: string | boolean; intelligence: string | boolean }[] = [
  { feature:'Signatures per month',         core:'Unlimited', connected:'Unlimited',    intelligence:'Unlimited'    },
  { feature:'Participants',                 core:'Unlimited', connected:'Unlimited',    intelligence:'Unlimited'    },
  { feature:'User seats',                   core:'1',         connected:'5',            intelligence:'Unlimited'    },
  { feature:'Document retention',           core:'90 days',   connected:'3 years',      intelligence:'7 years'      },
  { feature:'Adaptive document engine',     core:true,        connected:true,           intelligence:true           },
  { feature:'Guardian flow',                core:true,        connected:true,           intelligence:true           },
  { feature:'LIABL Pass',                   core:false,       connected:true,           intelligence:true           },
  { feature:'Group reservations',           core:false,       connected:true,           intelligence:true           },
  { feature:'Booking integrations',         core:false,       connected:true,           intelligence:true           },
  { feature:'Analytics & export',           core:false,       connected:true,           intelligence:true           },
  { feature:'Webhooks & API',               core:false,       connected:'Read only',    intelligence:'Full read/write'},
  { feature:'Role-based access control',    core:false,       connected:false,          intelligence:true           },
  { feature:'Legal hold',                   core:false,       connected:false,          intelligence:true           },
  { feature:'GDPR/CCPA workflow',           core:false,       connected:false,          intelligence:true           },
  { feature:'SSO (Azure / Okta)',           core:false,       connected:false,          intelligence:'Add-on'       },
  { feature:'Priority support',             core:false,       connected:false,          intelligence:true           },
]

function Cell({ val }: { val: string | boolean }) {
  if (val === true)  return <span className="text-emerald-500 font-bold">✓</span>
  if (val === false) return <span className="text-gray-200 font-bold">—</span>
  return <span className="text-xs font-medium text-ink">{val}</span>
}

export default function PricingPage() {
  const [period, setPeriod] = useState<Period>('monthly')
  const [showCompare, setShowCompare] = useState(false)

  const savings = Math.round((1 - 39/49) * 100)

  return (
    <div className="min-h-screen bg-surface">
      <nav className="bg-white border-b border-black/10 px-5 py-3 flex items-center justify-between">
        <Logo size="md" />
        <span className="text-xs bg-surface border border-black/10 px-3 py-1.5 rounded-full text-gray-500">
          Pricing
        </span>
      </nav>

      <div className="max-w-4xl mx-auto px-4 py-14">

        {/* Header */}
        <div className="text-center mb-10">
          <p className="text-xs font-semibold tracking-widest text-brand uppercase mb-3">Pricing</p>
          <h1 className="font-serif text-3xl sm:text-4xl text-ink mb-3">
            Flat pricing. Unlimited signatures. No surprises.
          </h1>
          <p className="text-gray-500 text-base max-w-xl mx-auto leading-relaxed mb-6">
            Every plan includes unlimited participants. You never pay more because you&apos;re busy.
          </p>

          {/* Period toggle */}
          <div className="inline-flex items-center gap-3">
            <div className="flex gap-1 bg-white border border-black/10 rounded-xl p-1">
              {(['monthly','annual'] as Period[]).map(p => (
                <button key={p} onClick={() => setPeriod(p)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all capitalize ${
                    period === p ? 'bg-brand text-white shadow-sm' : 'text-gray-500 hover:text-ink'
                  }`}>
                  {p}
                </button>
              ))}
            </div>
            {period === 'annual' && (
              <span className="text-xs bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-1 rounded-full font-medium">
                Save ~{savings}%
              </span>
            )}
          </div>
        </div>

        {/* Tier cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {TIERS.map(t => {
            const price = period === 'annual' ? t.annual : t.monthly
            return (
              <div key={t.id}
                className={`rounded-2xl border p-6 flex flex-col ${
                  t.highlight
                    ? 'border-brand bg-brand text-white shadow-lg shadow-brand/20 scale-[1.02]'
                    : 'border-black/10 bg-white'
                }`}>
                {t.highlight && (
                  <div className="text-xs font-semibold tracking-widest uppercase mb-3 text-white/60">
                    Most popular
                  </div>
                )}
                <div className={`text-xs font-semibold tracking-widest uppercase mb-1 ${t.highlight ? 'text-white/60' : 'text-brand'}`}>
                  {t.name}
                </div>
                <div className={`font-serif text-4xl mb-1 ${t.highlight ? 'text-white' : 'text-ink'}`}>
                  ${price}
                  <span className={`text-base font-sans font-normal ${t.highlight ? 'text-white/60' : 'text-gray-400'}`}>/mo</span>
                </div>
                {period === 'annual' && (
                  <div className={`text-xs mb-2 ${t.highlight ? 'text-white/60' : 'text-gray-400'}`}>
                    Billed annually · ${price * 12}/yr
                  </div>
                )}
                <p className={`text-sm mb-5 leading-relaxed ${t.highlight ? 'text-white/80' : 'text-gray-500'}`}>
                  {t.tagline}
                </p>

                <div className="space-y-2 mb-6 flex-1">
                  {t.features.filter(f => f.included).slice(0, 7).map(f => (
                    <div key={f.label} className="flex items-start gap-2 text-xs">
                      <span className={`shrink-0 mt-0.5 ${t.highlight ? 'text-white' : 'text-emerald-500'}`}>✓</span>
                      <span className={t.highlight ? 'text-white/90' : 'text-gray-600'}>{f.label}</span>
                    </div>
                  ))}
                  {t.features.filter(f => !f.included).length > 0 && (
                    <div className={`text-xs mt-2 ${t.highlight ? 'text-white/40' : 'text-gray-300'}`}>
                      + {t.features.filter(f => !f.included).length} more in next tier
                    </div>
                  )}
                </div>

                <button className={`w-full py-3 rounded-xl font-semibold text-sm transition-all ${
                  t.highlight
                    ? 'bg-white text-brand hover:bg-white/90'
                    : 'bg-brand text-white hover:opacity-90'
                }`}>
                  {t.cta}
                </button>
              </div>
            )
          })}
        </div>

        {/* Compare table toggle */}
        <div className="text-center mb-8">
          <button onClick={() => setShowCompare(!showCompare)}
            className="text-sm text-brand underline hover:opacity-70 transition-opacity">
            {showCompare ? 'Hide' : 'Show'} full feature comparison →
          </button>
        </div>

        {showCompare && (
          <div className="bg-white rounded-2xl border border-black/10 overflow-hidden mb-10 animate-fade-up">
            <div className="grid grid-cols-4 gap-0">
              {/* Header row */}
              <div className="px-4 py-3 border-b border-black/8 text-xs font-semibold text-gray-400 uppercase tracking-wider">Feature</div>
              {['Core','Connected','Intelligence'].map((name, i) => (
                <div key={name} className={`px-4 py-3 border-b border-black/8 text-sm font-semibold text-center ${i === 1 ? 'text-brand' : 'text-ink'}`}>
                  {name}
                </div>
              ))}
              {/* Data rows */}
              {COMPARE_ROWS.map((row, i) => (
                <>
                  <div key={`${row.feature}-label`}
                    className={`px-4 py-3 text-xs text-gray-600 border-b border-black/5 last:border-0 ${i % 2 === 0 ? '' : 'bg-surface/40'}`}>
                    {row.feature}
                  </div>
                  {(['core','connected','intelligence'] as const).map(tier => (
                    <div key={`${row.feature}-${tier}`}
                      className={`px-4 py-3 text-center border-b border-black/5 ${i % 2 === 0 ? '' : 'bg-surface/40'}`}>
                      <Cell val={row[tier]} />
                    </div>
                  ))}
                </>
              ))}
            </div>
          </div>
        )}

        {/* Enterprise & White-label */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-ink rounded-2xl p-6 text-white">
            <div className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color:'#A78BFA' }}>Enterprise</div>
            <h3 className="font-serif text-xl mb-2">Multi-location &amp; compliance-first operators</h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              SSO (Azure / Okta), SCIM provisioning, custom data residency, SLA, dedicated support,
              multi-location unified reporting, and volume pricing across locations.
            </p>
            <div className="space-y-1.5 mb-5">
              {['SSO + SCIM provisioning','Custom data residency','Dedicated support & SLA','Multi-location unified reporting','Custom retention policies','Volume pricing'].map(f => (
                <div key={f} className="flex items-center gap-2 text-xs text-gray-300">
                  <span className="text-violet-400">✓</span>{f}
                </div>
              ))}
            </div>
            <button className="w-full py-3 rounded-xl font-semibold text-sm bg-white text-ink hover:bg-white/90 transition-all">
              Contact sales →
            </button>
          </div>

          <div className="bg-brand/5 border border-brand/20 rounded-2xl p-6">
            <div className="text-xs font-semibold tracking-widest text-brand uppercase mb-3">White-label</div>
            <h3 className="font-serif text-xl text-ink mb-2">Booking platforms &amp; franchise operators</h3>
            <p className="text-gray-500 text-sm leading-relaxed mb-4">
              Embed LIABL&apos;s document layer under your own brand. Full UI white-labeling, custom domain,
              platform-level API access, and a revenue share model.
            </p>
            <div className="space-y-1.5 mb-5">
              {['Full UI white-labeling','Custom domain & branding','Platform-level API access','Revenue share model','Co-marketing support','Dedicated integration engineering'].map(f => (
                <div key={f} className="flex items-center gap-2 text-xs text-gray-600">
                  <span className="text-brand">✓</span>{f}
                </div>
              ))}
            </div>
            <button className="w-full py-3 rounded-xl font-semibold text-sm bg-brand text-white hover:opacity-90 transition-all">
              Explore partnership →
            </button>
          </div>
        </div>

        {/* Competitor comparison footnote */}
        <div className="mt-10 bg-white rounded-2xl border border-black/10 p-5">
          <div className="text-sm font-semibold text-ink mb-3">How LIABL pricing compares</div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            {[
              { name:'Smartwaiver',  model:'~$0.10–0.15 per waiver',   note:'500 waivers/month = $50–75. Penalises busy operators.' },
              { name:'DocuSign',     model:'~$25–50 per user/month',    note:'Enterprise plans $300–600+/month. No activity-specific features.' },
              { name:'LIABL Core',   model:'$49/month flat',            note:'Unlimited waivers. Price never changes because you\'re busy.' },
            ].map(c => (
              <div key={c.name} className={`rounded-xl p-3 ${c.name === 'LIABL Core' ? 'bg-brand/5 border border-brand/20' : 'bg-surface border border-black/10'}`}>
                <div className={`font-semibold mb-1 ${c.name === 'LIABL Core' ? 'text-brand' : 'text-ink'}`}>{c.name}</div>
                <div className="font-mono text-gray-500 mb-1">{c.model}</div>
                <div className="text-gray-400 leading-relaxed">{c.note}</div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
