'use client'
import { useState, useEffect, useRef } from 'react'

// Recognition rate model from the PowerPoint data
// 50 ops → 12%, 500 ops → 41%, 5000 ops → 68%
// Fitted to a logarithmic growth curve
function recognitionRate(operators: number): number {
  if (operators < 1) return 0
  const rate = 8.5 * Math.log10(operators + 1)
  return Math.min(Math.round(rate * 10) / 10, 68)
}

// Simulated check-in stream — mix of new and returning
function generateStream(rate: number, count: number) {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    name: NAMES[i % NAMES.length],
    initials: NAMES[i % NAMES.length].split(' ').map(n => n[0]).join(''),
    returning: Math.random() * 100 < rate,
    operator: OPERATORS[Math.floor(Math.random() * Math.min(Math.ceil(count / 3), OPERATORS.length))],
    activity: ACTIVITIES[Math.floor(Math.random() * ACTIVITIES.length)],
    time: `${8 + Math.floor(i / 4)}:${String((i * 7) % 60).padStart(2, '0')} AM`,
  }))
}

const NAMES     = ['Jordan Rivera','Mia Chen','Tyler Brooks','Sasha Kim','Omar Hassan','Priya Nair','Lucas West','Anya Sharma','Devon Park','Casey Morgan','Alex Torres','Sam Patel']
const OPERATORS = ['Desert Ridge Adventures','Riverside Kayak Co.','AZ Rock Climbing','Tucson Zip Co.','Desert Wellness','Peak Adventures','Canyon Tours']
const ACTIVITIES = ['🚣 Kayaking','🥾 Hiking','🏎️ ATV Tour','🧗 Climbing','🧘 Yoga','🏄 Paddleboard']

const BG = ['#E6F1FB','#E1F5EE','#EEE9FF','#FAEEDA','#FBEAF0','#EAF3DE']
const FG = ['#185FA5','#0F6E56','#4B2ACF','#854F0B','#993556','#3B6D11']

export default function NetworkDemo() {
  const [operators,   setOperators]   = useState(50)
  const [animating,   setAnimating]   = useState(false)
  const [stream,      setStream]      = useState(() => generateStream(12, 8))
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const rate     = recognitionRate(operators)
  const newCount = Math.round(8 * (1 - rate / 100))
  const retCount = 8 - newCount

  useEffect(() => {
    setStream(generateStream(rate, 8))
  }, [operators, rate])

  function runFlywheel() {
    if (animating) return
    setAnimating(true)
    let ops = 1
    intervalRef.current = setInterval(() => {
      ops = Math.min(ops * 1.8, 5000)
      setOperators(Math.round(ops))
      if (ops >= 5000) {
        clearInterval(intervalRef.current!)
        setAnimating(false)
      }
    }, 120)
  }

  function reset() {
    if (intervalRef.current) clearInterval(intervalRef.current)
    setAnimating(false)
    setOperators(50)
  }

  const milestones = [
    { ops: 50,   pct: 12, label: 'Early adoption' },
    { ops: 500,  pct: 41, label: 'Market presence' },
    { ops: 5000, pct: 68, label: 'Network dominance' },
  ]

  return (
    <div className="space-y-6">

      {/* Slider + stat */}
      <div>
        <div className="flex items-end justify-between mb-3">
          <div>
            <div className="text-4xl font-semibold text-white mb-1" style={{ fontFamily: 'Syne, sans-serif' }}>
              {operators.toLocaleString()}
            </div>
            <div className="text-xs text-gray-400 uppercase tracking-wider">Operators on LIABL</div>
          </div>
          <div className="text-right">
            <div className="text-4xl font-semibold mb-1" style={{ color: '#A78BFA', fontFamily: 'Syne, sans-serif' }}>
              {rate}%
            </div>
            <div className="text-xs text-gray-400 uppercase tracking-wider">Participants pre-verified</div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="relative h-2 bg-white/10 rounded-full mb-2 overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-300"
            style={{ width: `${(operators / 5000) * 100}%`, background: 'linear-gradient(90deg, #4B2ACF, #A78BFA)' }}
          />
        </div>
        <input
          type="range" min={1} max={5000} value={operators}
          onChange={e => { if (!animating) setOperators(Number(e.target.value)) }}
          className="w-full accent-violet-400 cursor-pointer"
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>1</span><span>500</span><span>5,000</span>
        </div>
      </div>

      {/* Milestones */}
      <div className="grid grid-cols-3 gap-3">
        {milestones.map(m => (
          <div key={m.ops}
            className={`rounded-xl border p-4 text-center transition-all duration-300 ${
              operators >= m.ops ? 'border-violet-500/40 bg-white/8' : 'border-white/10 bg-white/5 opacity-50'
            }`}>
            <div className="text-2xl font-semibold mb-1" style={{ color: operators >= m.ops ? '#A78BFA' : '#6B7280' }}>
              ~{m.pct}%
            </div>
            <div className="text-xs text-gray-400 leading-snug mb-2">recognition rate</div>
            <div className="text-xs border-t border-white/10 pt-2 text-gray-500">{m.label}</div>
            <div className="text-xs text-gray-600 mt-0.5">{m.ops.toLocaleString()} operators</div>
          </div>
        ))}
      </div>

      {/* Live check-in stream */}
      <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
          <div className="text-sm font-medium text-white">Live check-in stream</div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-gray-400">
              <span className="text-emerald-400 font-medium">{retCount}</span> returning ·{' '}
              <span className="text-gray-400">{newCount}</span> new
            </span>
          </div>
        </div>

        <div className="divide-y divide-white/5">
          {stream.slice(0, 6).map((p, i) => (
            <div key={p.id} className="flex items-center gap-3 px-4 py-2.5">
              <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold shrink-0"
                style={{ background: BG[i % BG.length], color: FG[i % FG.length] }}>
                {p.initials}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-medium text-gray-200 truncate">{p.name}</span>
                  {p.returning && (
                    <span className="text-xs shrink-0" style={{ color: '#A78BFA' }}>✦ Pass</span>
                  )}
                </div>
                <div className="text-xs text-gray-500 truncate">{p.activity} · {p.operator}</div>
              </div>
              <div className="shrink-0">
                {p.returning ? (
                  <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: 'rgba(167,139,250,0.15)', color: '#A78BFA' }}>
                    ~15 sec
                  </span>
                ) : (
                  <span className="text-xs px-2 py-0.5 rounded-full bg-white/10 text-gray-400 font-medium">
                    ~2 min
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Flywheel button */}
      <div className="flex gap-3">
        <button onClick={runFlywheel} disabled={animating}
          className="flex-1 py-3 rounded-xl font-semibold text-sm transition-all disabled:opacity-50"
          style={{ background: 'linear-gradient(135deg, #4B2ACF, #A78BFA)', color: 'white' }}>
          {animating ? '⟳ Flywheel spinning…' : '▶ Watch the flywheel run'}
        </button>
        <button onClick={reset}
          className="px-5 py-3 rounded-xl border border-white/20 text-gray-400 text-sm hover:bg-white/5 transition-all">
          Reset
        </button>
      </div>

      <p className="text-xs text-gray-500 leading-relaxed">
        At 5,000 operators, a new operator joining LIABL inherits <strong className="text-gray-400">68% participant recognition on day one</strong> — making LIABL the obvious choice over building a standalone check-in system.
      </p>
    </div>
  )
}
