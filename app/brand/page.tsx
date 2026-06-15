'use client'
import { useState } from 'react'
import Link from 'next/link'
import Logo            from '@/components/Logo'
import LogoConceptA    from '@/components/logo/LogoConceptA'
import LogoConceptB    from '@/components/logo/LogoConceptB'
import LogoConceptC    from '@/components/logo/LogoConceptC'
import { ICON_LIBRARY } from '@/components/icons'

type Concept = 'current' | 'A' | 'B' | 'C'

const CONCEPTS = [
  {
    id:'A' as const,
    title:'Concept A — Document & Seal',
    tagline:'Literal but elevated. Reads as both a signed document and a verification seal.',
    rationale:'Combines two of LIABL\'s most concrete brand ideas — the signed document and the verification seal — into a single geometric form. The folded corner references a real document; the inner seal with checkmark references the moment of verification. Most literal of the three concepts, which makes it instantly understandable but slightly more constrained as the brand evolves.',
    strengths:['Instantly communicates what LIABL does','Document corner is a recognizable visual anchor','Inner seal works as a standalone "verified" mark'],
    tradeoffs:['Less abstract — may feel narrow if LIABL expands beyond documents','Closer to compliance-tool visual category than AI-first SaaS'],
  },
  {
    id:'B' as const,
    title:'Concept B — Momentum & Intelligence',
    tagline:'Abstract and forward-leaning. Suggests ascending signal, motion, and intelligence.',
    rationale:'Three ascending bars on a dark field — like signal strength, like growth, like data points compounding over time. The brand colors are mapped to the bars (success green, accent orange, white) and the tip arrow reinforces forward motion. Most abstract of the three, which gives it the most strategic flexibility but requires more brand-building to communicate meaning.',
    strengths:['Most modern and AI-native of the three','Maps directly to "network effect" and "intelligence compounds" narratives','Strong as a standalone mark at any size'],
    tradeoffs:['Less obviously about documents — requires brand context to fully read','Visually closer to data-analytics category than waiver category'],
  },
  {
    id:'C' as const,
    title:'Concept C — Monogram L',
    tagline:'A confident L that does visual work. Document corner plus signature stroke.',
    rationale:'A stylized L formed by two clean rectangles, with a document-corner notch at the top suggesting a folded page, and an orange accent line cutting through the base — the signature stroke, the moment of momentum, the active verification. Most ownable of the three because the L is a custom letterform. Reads as Linear-meets-Figma aesthetically.',
    strengths:['Most ownable — a custom L mark is uniquely LIABL','Combines literal (document corner) and abstract (signature stroke)','Strong both alongside wordmark and as a solo monogram'],
    tradeoffs:['Requires more visual sophistication to land — needs context','Less immediately readable than Concept A'],
  },
]

const PALETTE = [
  { name:'Brand · Indigo',       hex:'#4B2ACF', use:'Primary brand color. CTAs, headers, logo mark.',           token:'brand'   },
  { name:'Brand · Light',        hex:'#EEE9FF', use:'Brand backgrounds, hover states, soft accents.',           token:'brand-light' },
  { name:'Accent · Orange',      hex:'#EA580C', use:'Energy, momentum, secondary CTAs, signature moments.',     token:'accent'  },
  { name:'Accent · Light',       hex:'#FFEDD5', use:'Accent backgrounds, warm-toned callouts.',                 token:'accent-light' },
  { name:'Success · Forest',     hex:'#15803D', use:'Verified, signed, complete. Active success state.',        token:'success' },
  { name:'Success · Light',      hex:'#DCFCE7', use:'Success backgrounds, positive feedback.',                  token:'success-light' },
  { name:'Surface',              hex:'#F7F6F2', use:'Page background. Off-white, warm, calm.',                  token:'surface' },
  { name:'Ink',                  hex:'#0D0E12', use:'Primary text, dark surfaces, headlines.',                  token:'ink'     },
  { name:'Muted Gray',           hex:'#6B7280', use:'Secondary text, borders, dividers.',                       token:'muted'   },
]

const COMPONENTS_DEMO = [
  { name:'Primary Button',   element:<button className="px-5 py-2.5 bg-brand text-white rounded-xl text-sm font-semibold hover:opacity-90 transition-all">Start Free Trial</button> },
  { name:'Accent Button',    element:<button className="px-5 py-2.5 bg-accent text-white rounded-xl text-sm font-semibold hover:opacity-90 transition-all">Get Started</button>     },
  { name:'Success Button',   element:<button className="px-5 py-2.5 bg-success text-white rounded-xl text-sm font-semibold hover:opacity-90 transition-all">Verified ✓</button>      },
  { name:'Secondary Button', element:<button className="px-5 py-2.5 bg-surface border border-ink/15 text-ink rounded-xl text-sm font-semibold hover:bg-white transition-all">Learn More</button> },
  { name:'Signed Badge',     element:<span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-success-light text-success-deep border border-success/20">Signed</span> },
  { name:'Pending Badge',    element:<span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200">Pending</span> },
  { name:'Pass Badge',       element:<span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-brand-light text-brand border border-brand/20">✦ LIABL Pass</span> },
  { name:'Risk Badge',       element:<span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-accent-light text-accent-deep border border-accent/20">⚡ Risk · 42</span> },
]

const PERSONALITY = [
  { word:'Simple',     desc:'Plain language. Clear hierarchy. Nothing decorative. Every element earns its place.' },
  { word:'Trusted',    desc:'Confident, factual, and verifiable. Specifics over adjectives. Numbers over claims.' },
  { word:'Intelligent',desc:'AI-native by architecture, not by marketing. The product proves the intelligence — the brand reinforces it.' },
]

export default function BrandBook() {
  const [activeConcept, setActiveConcept] = useState<Concept>('C')
  const [iconSize, setIconSize] = useState(28)

  return (
    <main className="min-h-screen bg-surface">
      {/* Nav */}
      <nav className="bg-white border-b border-ink/10 px-6 py-3 flex items-center justify-between sticky top-0 z-40">
        <Logo size="md"/>
        <div className="flex items-center gap-3">
          <Link href="/" className="text-sm text-muted hover:text-ink transition-colors">← Home</Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="px-6 py-14 bg-white border-b border-ink/8">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-brand/10 text-brand text-xs font-semibold px-3 py-1.5 rounded-full mb-5 border border-brand/20">
            BRAND BOOK · INTERNAL
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl text-ink mb-4 leading-tight" style={{ letterSpacing:'-0.025em' }}>
            The LIABL Brand System.
          </h1>
          <p className="text-muted text-lg leading-relaxed max-w-2xl">
            A working brand book for an AI-native document intelligence platform.
            Simple, trusted, intelligent — with the active grounding of an outdoor brand and the sophistication of modern software.
          </p>
        </div>
      </section>

      {/* Personality */}
      <section className="px-6 py-12 border-b border-ink/8">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs font-semibold tracking-widest text-brand uppercase mb-2">01 · Personality</p>
          <h2 className="font-serif text-2xl text-ink mb-6" style={{ letterSpacing:'-0.01em' }}>
            Three words. Every decision flows from these.
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {PERSONALITY.map(({ word, desc }) => (
              <div key={word} className="bg-white rounded-2xl border border-ink/10 p-5">
                <div className="font-serif text-xl text-brand mb-2" style={{ letterSpacing:'-0.01em' }}>{word}</div>
                <p className="text-sm text-muted leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
          <div className="bg-ink rounded-2xl p-5 mt-4 text-white">
            <div className="text-xs font-semibold tracking-widest uppercase mb-2 text-white/60">Reference Brands</div>
            <p className="text-white/80 leading-relaxed">
              LIABL aspires to the intersection of <strong className="text-white">Figma</strong> (modern, intelligent, software-fluent) and <strong className="text-white">Patagonia</strong> (active, outdoor heritage, real-world durability).
              Software credibility for investors. Outdoor authenticity for operators. Both audiences served by the same brand.
            </p>
          </div>
        </div>
      </section>

      {/* Logo concepts */}
      <section className="px-6 py-12 border-b border-ink/8 bg-white">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs font-semibold tracking-widest text-brand uppercase mb-2">02 · Logo Concepts</p>
          <h2 className="font-serif text-2xl text-ink mb-1" style={{ letterSpacing:'-0.01em' }}>
            Three directions. One to lock.
          </h2>
          <p className="text-sm text-muted mb-8 max-w-2xl">
            All three share the same wordmark — uppercase, clean sans-serif, indigo primary —
            and differ only in the symbol mark. Select a concept below to see it applied to context.
          </p>

          {/* Concept selector */}
          <div className="flex gap-2 mb-8 flex-wrap">
            {[
              { id:'current' as const, label:'Current (v16)'  },
              { id:'A' as const,       label:'A · Document & Seal'  },
              { id:'B' as const,       label:'B · Momentum'         },
              { id:'C' as const,       label:'C · Monogram L'       },
            ].map(c => (
              <button key={c.id} onClick={() => setActiveConcept(c.id)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all border ${
                  activeConcept === c.id
                    ? 'bg-brand text-white border-brand'
                    : 'bg-white text-muted border-ink/15 hover:border-ink/30'
                }`}>
                {c.label}
              </button>
            ))}
          </div>

          {/* Full logo at scale */}
          <div className="bg-surface rounded-2xl border border-ink/10 p-12 flex items-center justify-center mb-4 min-h-48">
            {activeConcept === 'current' && <Logo size="lg" />}
            {activeConcept === 'A'       && <LogoConceptA size="lg" />}
            {activeConcept === 'B'       && <LogoConceptB size="lg" />}
            {activeConcept === 'C'       && <LogoConceptC size="lg" />}
          </div>

          {/* Size variations */}
          <div className="grid grid-cols-3 gap-3 mb-4">
            {(['sm','md','lg'] as const).map(size => (
              <div key={size} className="bg-surface rounded-xl border border-ink/10 p-6 flex flex-col items-center justify-center min-h-32">
                <div className="mb-3 flex items-center justify-center" style={{ minHeight:60 }}>
                  {activeConcept === 'current' && <Logo size={size} />}
                  {activeConcept === 'A'       && <LogoConceptA size={size} />}
                  {activeConcept === 'B'       && <LogoConceptB size={size} />}
                  {activeConcept === 'C'       && <LogoConceptC size={size} />}
                </div>
                <div className="text-xs text-muted uppercase tracking-wider">{size === 'sm' ? 'Small' : size === 'md' ? 'Medium' : 'Large'}</div>
              </div>
            ))}
          </div>

          {/* Mark only — favicon scale */}
          <div className="grid grid-cols-3 gap-3 mb-4">
            <div className="bg-surface rounded-xl border border-ink/10 p-6 flex flex-col items-center">
              <div className="mb-3 flex items-center justify-center" style={{ minHeight:32 }}>
                {activeConcept === 'current' && <Logo size="md" />}
                {activeConcept === 'A'       && <LogoConceptA size="md" markOnly />}
                {activeConcept === 'B'       && <LogoConceptB size="md" markOnly />}
                {activeConcept === 'C'       && <LogoConceptC size="md" markOnly />}
              </div>
              <div className="text-xs text-muted uppercase tracking-wider">Mark · 32px</div>
            </div>
            <div className="bg-surface rounded-xl border border-ink/10 p-6 flex flex-col items-center">
              <div className="mb-3 flex items-center justify-center" style={{ minHeight:32 }}>
                {activeConcept === 'A' && <LogoConceptA size="lg" markOnly />}
                {activeConcept === 'B' && <LogoConceptB size="lg" markOnly />}
                {activeConcept === 'C' && <LogoConceptC size="lg" markOnly />}
                {activeConcept === 'current' && <Logo size="lg" />}
              </div>
              <div className="text-xs text-muted uppercase tracking-wider">Mark · 52px</div>
            </div>
            <div className="bg-ink rounded-xl border border-ink/10 p-6 flex flex-col items-center">
              <div className="mb-3 flex items-center justify-center" style={{ minHeight:32 }}>
                {activeConcept === 'A' && <LogoConceptA size="md" markOnly />}
                {activeConcept === 'B' && <LogoConceptB size="md" markOnly />}
                {activeConcept === 'C' && <LogoConceptC size="md" markOnly />}
                {activeConcept === 'current' && <Logo size="md" dark />}
              </div>
              <div className="text-xs text-white/60 uppercase tracking-wider">On Dark</div>
            </div>
          </div>

          {/* Concept rationale */}
          {activeConcept !== 'current' && (
            <div className="bg-surface border border-ink/10 rounded-2xl p-6 mt-4 animate-fade-up">
              {(() => {
                const c = CONCEPTS.find(c => c.id === activeConcept)!
                return (
                  <>
                    <h3 className="font-serif text-xl text-ink mb-1" style={{ letterSpacing:'-0.01em' }}>{c.title}</h3>
                    <p className="text-sm text-brand font-medium mb-4">{c.tagline}</p>
                    <p className="text-sm text-muted leading-relaxed mb-5">{c.rationale}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <div className="text-xs font-semibold text-success uppercase tracking-wider mb-2">Strengths</div>
                        <ul className="space-y-1.5 text-sm text-muted">
                          {c.strengths.map(s => <li key={s} className="flex gap-2"><span className="text-success shrink-0">✓</span>{s}</li>)}
                        </ul>
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-accent uppercase tracking-wider mb-2">Tradeoffs</div>
                        <ul className="space-y-1.5 text-sm text-muted">
                          {c.tradeoffs.map(t => <li key={t} className="flex gap-2"><span className="text-accent shrink-0">→</span>{t}</li>)}
                        </ul>
                      </div>
                    </div>
                  </>
                )
              })()}
            </div>
          )}

          {/* Dashboard header mock */}
          <div className="mt-6">
            <div className="text-xs font-semibold text-muted uppercase tracking-wider mb-2">In context · Dashboard header</div>
            <div className="bg-white border border-ink/10 rounded-xl overflow-hidden shadow-sm">
              <div className="bg-white border-b border-ink/10 px-5 py-3 flex items-center justify-between">
                {activeConcept === 'current' && <Logo size="md" />}
                {activeConcept === 'A'       && <LogoConceptA size="md" />}
                {activeConcept === 'B'       && <LogoConceptB size="md" />}
                {activeConcept === 'C'       && <LogoConceptC size="md" />}
                <span className="text-xs bg-surface border border-ink/10 px-3 py-1 rounded-full text-muted">Operator</span>
              </div>
              <div className="px-5 py-8 bg-surface text-center text-sm text-muted">Application content area</div>
            </div>
          </div>
        </div>
      </section>

      {/* Color palette */}
      <section className="px-6 py-12 border-b border-ink/8">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs font-semibold tracking-widest text-brand uppercase mb-2">03 · Color</p>
          <h2 className="font-serif text-2xl text-ink mb-1" style={{ letterSpacing:'-0.01em' }}>
            Indigo, Orange, Forest, Gray.
          </h2>
          <p className="text-sm text-muted mb-8 max-w-2xl">
            Indigo grounds intelligence and trust. Orange brings energy. Forest reinforces verified-active states.
            Gray and ink do the structural work. No purple — explicitly outside the system.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {PALETTE.map(({ name, hex, use, token }) => (
              <div key={hex} className="bg-white rounded-2xl border border-ink/10 overflow-hidden">
                <div className="h-24" style={{ background:hex }}/>
                <div className="p-4">
                  <div className="font-semibold text-sm text-ink mb-0.5">{name}</div>
                  <div className="font-mono text-xs text-muted mb-2">{hex}</div>
                  <div className="text-xs text-muted leading-snug mb-2">{use}</div>
                  <div className="font-mono text-xs text-brand">.bg-{token}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Typography */}
      <section className="px-6 py-12 border-b border-ink/8 bg-white">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs font-semibold tracking-widest text-brand uppercase mb-2">04 · Typography</p>
          <h2 className="font-serif text-2xl text-ink mb-1" style={{ letterSpacing:'-0.01em' }}>
            Three families. Clear roles.
          </h2>
          <p className="text-sm text-muted mb-8 max-w-2xl">Syne for display moments. DM Sans for everything else. JetBrains Mono for data, code, and document IDs.</p>

          <div className="space-y-4">
            <div className="bg-surface rounded-2xl border border-ink/10 p-6">
              <div className="text-xs font-semibold text-muted uppercase tracking-wider mb-3">Display · Syne</div>
              <div className="font-serif text-4xl text-ink mb-1" style={{ letterSpacing:'-0.02em' }}>
                Your waiver shouldn&apos;t be a form.
              </div>
              <div className="text-sm text-muted">Headlines, hero text, section openers. Reserved for moments that demand presence.</div>
            </div>
            <div className="bg-surface rounded-2xl border border-ink/10 p-6">
              <div className="text-xs font-semibold text-muted uppercase tracking-wider mb-3">Body · DM Sans</div>
              <div className="text-base text-ink mb-1 leading-relaxed">
                LIABL builds the document from the participant&apos;s answers in real time — adaptive, activity-specific, and legally defensible from the first signature.
              </div>
              <div className="text-sm text-muted mt-2">Paragraph text, UI labels, descriptions. The workhorse of the system.</div>
            </div>
            <div className="bg-surface rounded-2xl border border-ink/10 p-6">
              <div className="text-xs font-semibold text-muted uppercase tracking-wider mb-3">Mono · JetBrains Mono</div>
              <div className="font-mono text-sm text-ink mb-1">doc_a1b2c3d4 · SHA-256: 7f3a9c21...</div>
              <div className="text-sm text-muted">Document IDs, hashes, code, technical data. Where precision matters visually.</div>
            </div>
          </div>
        </div>
      </section>

      {/* Icons */}
      <section className="px-6 py-12 border-b border-ink/8">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs font-semibold tracking-widest text-brand uppercase mb-2">05 · Icon System</p>
          <h2 className="font-serif text-2xl text-ink mb-1" style={{ letterSpacing:'-0.01em' }}>
            Custom line-art. No more emojis.
          </h2>
          <p className="text-sm text-muted mb-6 max-w-2xl">
            20 icons built to a consistent 24×24 grid, 1.5px line weight, rounded caps and joins. Designed for the &ldquo;active security&rdquo; voice — directional, dynamic, grounded.
          </p>

          {/* Size control */}
          <div className="flex items-center gap-3 mb-4 text-sm">
            <span className="text-muted">Size</span>
            <input type="range" min={16} max={48} step={2} value={iconSize} onChange={e=>setIconSize(Number(e.target.value))} className="w-32"/>
            <span className="font-mono text-xs text-muted">{iconSize}px</span>
          </div>

          {/* Icon categories */}
          {(Object.entries(ICON_LIBRARY) as [string, typeof ICON_LIBRARY[keyof typeof ICON_LIBRARY]][]).map(([category, icons]) => (
            <div key={category} className="mb-6">
              <div className="text-xs font-semibold text-muted uppercase tracking-wider mb-3 capitalize">{category}</div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {icons.map(({ name, Component }) => (
                  <div key={name} className="bg-white rounded-xl border border-ink/10 p-4 flex flex-col items-center justify-center text-center hover:border-brand/30 transition-colors">
                    <div className="text-ink mb-3 flex items-center justify-center" style={{ minHeight:48 }}>
                      <Component size={iconSize} />
                    </div>
                    <div className="text-xs font-medium text-ink">{name}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Components */}
      <section className="px-6 py-12 border-b border-ink/8 bg-white">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs font-semibold tracking-widest text-brand uppercase mb-2">06 · Components</p>
          <h2 className="font-serif text-2xl text-ink mb-6" style={{ letterSpacing:'-0.01em' }}>
            The applied system.
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {COMPONENTS_DEMO.map(({ name, element }) => (
              <div key={name} className="bg-surface rounded-2xl border border-ink/10 p-5">
                <div className="text-xs font-semibold text-muted uppercase tracking-wider mb-3">{name}</div>
                <div className="flex items-center justify-center min-h-12">{element}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Voice & tone */}
      <section className="px-6 py-12 border-b border-ink/8">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs font-semibold tracking-widest text-brand uppercase mb-2">07 · Voice & Tone</p>
          <h2 className="font-serif text-2xl text-ink mb-6" style={{ letterSpacing:'-0.01em' }}>How LIABL sounds.</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="bg-success-light border border-success/20 rounded-2xl p-5">
              <div className="text-xs font-semibold text-success-deep uppercase tracking-wider mb-3">✓ We do this</div>
              <ul className="space-y-2 text-sm text-ink leading-relaxed">
                <li>&ldquo;Your waiver shouldn&apos;t be a form. It should be thinking.&rdquo;</li>
                <li>&ldquo;187 staff-hours recovered per year.&rdquo;</li>
                <li>&ldquo;Document sealed at signing time.&rdquo;</li>
                <li>&ldquo;The document builds itself from answers.&rdquo;</li>
              </ul>
            </div>
            <div className="bg-accent-light border border-accent/20 rounded-2xl p-5">
              <div className="text-xs font-semibold text-accent-deep uppercase tracking-wider mb-3">✗ We don&apos;t do this</div>
              <ul className="space-y-2 text-sm text-ink leading-relaxed">
                <li>&ldquo;Revolutionary AI-powered solution.&rdquo;</li>
                <li>&ldquo;Game-changing platform.&rdquo;</li>
                <li>&ldquo;Best-in-class document management.&rdquo;</li>
                <li>&ldquo;Empowering operators to leverage synergies.&rdquo;</li>
              </ul>
            </div>
          </div>

          <div className="bg-ink rounded-2xl p-6 mt-4 text-white">
            <div className="font-semibold mb-3">Three rules for everything LIABL writes:</div>
            <ol className="space-y-2 text-sm text-white/80">
              <li><strong className="text-white">1. Specifics over adjectives.</strong> &ldquo;187 hours saved&rdquo; not &ldquo;significant time savings.&rdquo;</li>
              <li><strong className="text-white">2. Plain language always.</strong> If your operator wouldn&apos;t say it, neither should we.</li>
              <li><strong className="text-white">3. Show, don&apos;t claim.</strong> Demonstrate the intelligence — don&apos;t announce it.</li>
            </ol>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-8 bg-ink text-center border-t border-white/10">
        <p className="text-xs text-white/40">LIABL Brand Book · Internal reference · v17</p>
      </footer>
    </main>
  )
}
