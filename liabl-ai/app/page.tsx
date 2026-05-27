import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 py-16 bg-surface">
      <div className="text-center mb-12">
        <h1 className="font-serif text-5xl mb-3">
          liabl<span className="text-brand italic">.ai</span>
        </h1>
        <p className="text-gray-500 text-lg max-w-sm mx-auto leading-relaxed">
          Adaptive, activity-aware liability waivers for operators who take safety seriously.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-md">
        <Link href="/participant" className="card hover:shadow-md transition-shadow text-center">
          <div className="text-3xl mb-3">📋</div>
          <div className="font-semibold text-ink mb-1">Sign a waiver</div>
          <div className="text-sm text-gray-500">Participant flow</div>
        </Link>
        <Link href="/operator" className="card hover:shadow-md transition-shadow text-center">
          <div className="text-3xl mb-3">📊</div>
          <div className="font-semibold text-ink mb-1">Operator dashboard</div>
          <div className="text-sm text-gray-500">Check-in roster</div>
        </Link>
      </div>

      <p className="mt-12 text-xs text-gray-400">
        Investor prototype · LIABL.ai
      </p>
    </main>
  )
}
