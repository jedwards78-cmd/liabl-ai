'use client'
import { useState } from 'react'
import Logo        from '@/components/Logo'
import RosterTab   from '@/components/operator/RosterTab'
import TemplateTab from '@/components/operator/TemplateTab'
import MobileTab   from '@/components/operator/MobileTab'

type Tab = 'roster' | 'templates' | 'mobile'

export default function OperatorPage() {
  const [tab, setTab] = useState<Tab>('roster')
  return (
    <div className="min-h-screen bg-surface">
      <nav className="bg-white border-b border-black/10 px-5 py-3 flex items-center justify-between">
        <Logo size="md" operatorName="Desert Ridge Adventures" operatorAccent="#4B2ACF" />
        <span className="text-xs bg-surface border border-black/10 px-3 py-1.5 rounded-full text-gray-500">Operator</span>
      </nav>
      <div className="bg-white border-b border-black/10 px-5 overflow-x-auto">
        <div className="flex gap-0 max-w-3xl mx-auto min-w-max">
          {([
            { key:'roster',    label:'📋 Check-in roster'    },
            { key:'templates', label:'⚙️ Activity templates'  },
            { key:'mobile',    label:'📱 Mobile app'          },
          ] as { key:Tab; label:string }[]).map(({ key, label }) => (
            <button key={key} onClick={() => setTab(key)}
              className={`px-4 py-3 text-sm font-medium border-b-2 transition-all whitespace-nowrap ${
                tab === key ? 'border-brand text-brand' : 'border-transparent text-gray-500 hover:text-ink'
              }`}>
              {label}
            </button>
          ))}
        </div>
      </div>
      <div className="max-w-3xl mx-auto px-4 py-8">
        {tab === 'roster'    && <RosterTab />}
        {tab === 'templates' && <TemplateTab />}
        {tab === 'mobile'    && <MobileTab />}
      </div>
    </div>
  )
}
