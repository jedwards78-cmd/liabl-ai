'use client'
import { useState, useEffect } from 'react'
import Logo from '@/components/Logo'
import RosterTab   from '@/components/operator/RosterTab'
import TemplateTab from '@/components/operator/TemplateTab'

type Tab = 'roster' | 'templates'

export default function OperatorPage() {
  const [tab, setTab] = useState<Tab>('roster')

  return (
    <div className="min-h-screen bg-surface">
      <nav className="bg-white border-b border-black/10 px-5 py-3 flex items-center justify-between">
        <Logo size="sm" />
        <span className="text-xs bg-surface border border-black/10 px-3 py-1.5 rounded-full text-gray-500">
          Operator · Desert Ridge Adventures
        </span>
      </nav>

      {/* Tab bar */}
      <div className="bg-white border-b border-black/10 px-5">
        <div className="flex gap-0 max-w-2xl mx-auto">
          {([
            { key: 'roster',    label: '📋 Check-in roster' },
            { key: 'templates', label: '⚙️ Activity templates' },
          ] as { key: Tab; label: string }[]).map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={`px-4 py-3 text-sm font-medium border-b-2 transition-all ${
                tab === key
                  ? 'border-brand text-brand'
                  : 'border-transparent text-gray-500 hover:text-ink'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-8">
        {tab === 'roster'    && <RosterTab />}
        {tab === 'templates' && <TemplateTab />}
      </div>
    </div>
  )
}
