'use client'
import { useState } from 'react'
import { HealthStatus, ACTIVITY_LABELS } from '@/lib/document-engine'
interface Props {
  onNext:(v:{healthStatus:HealthStatus})=>void
  onBack:()=>void
  answers:Partial<{activityKey:string}>
}
const OPTS:[HealthStatus,string][]=[
  ['none','No known conditions'],
  ['cardiac','Yes — cardiac or respiratory condition'],
  ['injury','Yes — recent injury or surgery'],
]
export default function StepHealth({ onNext, onBack, answers }: Props) {
  const [health,setHealth]=useState<HealthStatus|null>(null)
  const actLabel = answers.activityKey ? ACTIVITY_LABELS[answers.activityKey as keyof typeof ACTIVITY_LABELS] : 'your activity'
  return (
    <div className="card">
      <p className="text-xs font-semibold tracking-widest text-brand uppercase mb-2">Step 3 of 5 · Adaptive questions</p>
      <h2 className="font-serif text-2xl mb-1" style={{ letterSpacing:'-0.01em' }}>Health &amp; experience</h2>
      <p className="text-gray-500 text-sm mb-6">Adapting your waiver for <span className="text-brand font-medium">{actLabel}</span> in real time.</p>
      <div className="space-y-2 mb-4">
        <label className="block text-xs font-medium text-gray-500 mb-2">Any cardiovascular conditions or recent injuries?</label>
        {OPTS.map(([v,l])=>(
          <button key={v} onClick={()=>setHealth(v)} className={`w-full text-left flex items-center gap-3 p-3 rounded-xl border transition-all ${health===v?'border-brand bg-brand/5':'border-black/10 bg-surface hover:border-brand/40'}`}>
            <span className={`w-4 h-4 rounded-full border-2 shrink-0 ${health===v?'border-brand bg-brand':'border-gray-300'}`}/>
            <span className="text-sm">{l}</span>
          </button>
        ))}
      </div>
      {health==='cardiac'&&<div className="bg-amber-50 border border-amber-200 text-amber-700 rounded-xl p-3 text-sm mb-4">⚠️ A <strong>physician clearance clause</strong> will be added to your waiver.</div>}
      {health==='injury'&&<div className="bg-amber-50 border border-amber-200 text-amber-700 rounded-xl p-3 text-sm mb-4">⚠️ An <strong>injury disclosure clause</strong> will be added to your waiver.</div>}
      <div className="flex gap-3">
        <button onClick={onBack} className="btn-secondary">← Back</button>
        <button onClick={()=>health&&onNext({healthStatus:health})} disabled={!health} className="btn-primary">Review document →</button>
      </div>
    </div>
  )
}
