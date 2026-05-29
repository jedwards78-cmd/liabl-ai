import Link from 'next/link'
import Logo from '@/components/Logo'

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 py-16 bg-surface">
      <div className="text-center mb-12">
        <div className="flex justify-center mb-5">
          <Logo size="lg" />
        </div>
        <p className="text-gray-500 text-base max-w-sm mx-auto leading-relaxed">
          Adaptive, activity-aware liability waivers for operators who take safety seriously.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-2xl">
        <Link href="/participant" className="card hover:shadow-md transition-shadow text-center group">
          <div className="text-3xl mb-3">📋</div>
          <div className="font-semibold text-ink mb-1">Sign a waiver</div>
          <div className="text-sm text-gray-500">Participant flow</div>
        </Link>

        <Link href="/pass" className="card hover:shadow-md transition-shadow text-center group border-brand/30">
          <div className="text-3xl mb-3">✦</div>
          <div className="font-semibold text-ink mb-1">LIABL Pass</div>
          <div className="text-sm text-gray-500">Returning participant</div>
        </Link>

        <Link href="/operator" className="card hover:shadow-md transition-shadow text-center group">
          <div className="text-3xl mb-3">📊</div>
          <div className="font-semibold text-ink mb-1">Operator dashboard</div>
          <div className="text-sm text-gray-500">Check-in &amp; templates</div>
        </Link>
      </div>

      <p className="mt-12 text-xs text-gray-400">
        Investor prototype · LIABL.ai
      </p>
    </main>
  )
}
