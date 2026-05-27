'use client'
import { useState } from 'react'
import { ActivityKey, ACTIVITY_LABELS } from '@/lib/document-engine'

interface Props {
  onNext: (v: { activityKey: ActivityKey }) => void
  onBack: () => void
}

const ACTIVITIES: { key: ActivityKey; emoji: string; sub: string }[] = [
  { key:'kayak', emoji:'🚣', sub:'Class III–IV rapids'      },
  { key:'hike',  emoji:'🥾', sub:'Technical canyon terrain' },
  { key:'atv',   emoji:'🏎️',  sub:'Off-road vehicles'        },
  { key:'climb', emoji:'🧗', sub:'Top-rope & lead'           },
]

export default function StepActivity({ onNext, onBack }: Props) {
  const [selected, setSelected] = useState<ActivityKey | null>(null)

  return (
    <div className="card">
      <p className="text-xs font-semibold tracking-widest text-brand uppercase mb-2">Step 2 of 5</p>
      <h2 className="font-serif text-2xl mb-1">What&apos;s your activity today?</h2>
      <p className="text-gray-500 text-sm mb-6">
        Your waiver will be <span className="text-brand font-medium">tailored to the specific risks</span> involved.
      </p>

      <div className="grid grid-cols-2 gap-3 mb-6">
        {ACTIVITIES.map(({ key, emoji, sub }) => (
          <button key={key} onClick={() => setSelected(key)}
            className={`text-left p-4 rounded-xl border transition-all ${
              selected === key ? 'border-brand bg-brand/5' : 'border-black/10 hover:border-brand/40 bg-surface'
            }`}>
            <div className="text-2xl mb-2">{emoji}</div>
            <div className="font-semibold text-sm">{ACTIVITY_LABELS[key]}</div>
            <div className="text-xs text-gray-400 mt-0.5">{sub}</div>
          </button>
        ))}
      </div>

      <div className="flex gap-3">
        <button onClick={onBack} className="btn-secondary">← Back</button>
        <button onClick={() => selected && onNext({ activityKey: selected })} disabled={!selected} className="btn-primary">
          Continue →
        </button>
      </div>
    </div>
  )
}
