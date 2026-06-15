import { WaiverClause, ParticipantAnswers, ACTIVITY_LABELS } from '@/lib/document-engine'

interface Props {
  clauses:  WaiverClause[]
  answers:  ParticipantAnswers
  onNext:   ()=>void
  onBack:   ()=>void
}

export default function StepDocument({ clauses, answers, onNext, onBack }: Props) {
  const actLabel    = ACTIVITY_LABELS[answers.activityKey] ?? 'Activity'
  const date        = new Date().toLocaleDateString('en-US', { month:'long', day:'numeric', year:'numeric' })
  const highlighted = clauses.filter(c => c.highlight).length

  return (
    <div className="card">
      <p className="text-xs font-semibold tracking-widest text-brand uppercase mb-2">Step 4 of 5</p>
      <h2 className="font-serif text-2xl mb-1" style={{ letterSpacing:'-0.01em' }}>Your Personalized Waiver</h2>
      <p className="text-gray-500 text-sm mb-1">
        Generated from your answers.{' '}
        {highlighted > 0 && (
          <span className="text-brand font-medium">
            {highlighted} clause{highlighted > 1 ? 's were' : ' was'} added for your profile.
          </span>
        )}
      </p>

      <div className="flex gap-2 flex-wrap mt-3 mb-4">
        {[answers.fullName, actLabel, date].map(tag => (
          <span key={tag} className="bg-surface border border-black/10 text-xs px-2.5 py-1 rounded-full text-gray-500">{tag}</span>
        ))}
      </div>

      {/* Intelligent Risk Profile removed from participant view — operator-only */}

      <div className="max-h-64 overflow-y-auto space-y-3 pr-1 mb-5">
        {clauses.map(clause => (
          <div key={clause.id} className={`rounded-xl p-4 text-sm leading-relaxed ${
            clause.highlight ? 'bg-brand/5 border border-brand/20' : 'bg-surface border border-black/8'
          }`}>
            <div className={`text-xs font-semibold uppercase tracking-wider mb-1.5 ${
              clause.highlight ? 'text-brand' : 'text-gray-400'
            }`}>
              {clause.highlight && '⚡ '}{clause.title}
            </div>
            <p className="text-gray-600 leading-relaxed text-xs">{clause.body}</p>
          </div>
        ))}
      </div>

      <div className="flex gap-3">
        <button onClick={onBack} className="btn-secondary">← Back</button>
        <button onClick={onNext} className="btn-primary">Sign Document ✍️</button>
      </div>
    </div>
  )
}
