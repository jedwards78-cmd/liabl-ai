interface Props { onNext: () => void }

export default function StepEntry({ onNext }: Props) {
  return (
    <div className="card">
      <p className="text-xs font-semibold tracking-widest text-brand uppercase mb-2">
        Desert Ridge Adventures
      </p>
      <h2 className="font-serif text-3xl mb-2">Welcome, adventurer.</h2>
      <p className="text-gray-500 text-sm mb-6 leading-relaxed">
        Please complete your liability waiver before your 9:00 AM session. It only takes about 2 minutes.
      </p>
      <div className="bg-brand/5 border border-brand/20 rounded-xl p-3 flex gap-3 items-start mb-6 text-sm text-brand">
        <span className="mt-0.5">🔒</span>
        <span>Your information is encrypted and securely stored. We never sell your data.</span>
      </div>
      <button onClick={onNext} className="btn-primary">Start waiver →</button>
    </div>
  )
}
