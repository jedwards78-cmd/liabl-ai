'use client'
import { useState } from 'react'
import Logo from '@/components/Logo'
import SecurityTab   from '@/components/security/SecurityTab'
import EnterpriseTab from '@/components/security/EnterpriseTab'

type Tab = 'security' | 'enterprise'

export default function SecurityPage() {
  const [tab, setTab] = useState<Tab>('security')

  const tabs: { key: Tab; label: string; icon: string }[] = [
    { key:'security',   label:'Security & Audit',        icon:'🔐' },
    { key:'enterprise', label:'Enterprise features',     icon:'🏢' },
  ]

  return (
    <div className="min-h-screen bg-surface">
      <nav className="bg-white border-b border-black/10 px-5 py-3 flex items-center justify-between">
        <Logo size="md" />
        <span className="text-xs bg-surface border border-black/10 px-3 py-1.5 rounded-full text-gray-500">
          Security &amp; Enterprise · Desert Ridge Adventures
        </span>
      </nav>

      {/* Tab bar */}
      <div className="bg-white border-b border-black/10 px-5">
        <div className="flex gap-0 max-w-3xl mx-auto">
          {tabs.map(({ key, label, icon }) => (
            <button key={key} onClick={() => setTab(key)}
              className={`px-5 py-3 text-sm font-medium border-b-2 transition-all flex items-center gap-2 ${
                tab === key ? 'border-brand text-brand' : 'border-transparent text-gray-500 hover:text-ink'
              }`}>
              <span>{icon}</span>{label}
            </button>
          ))}
        </div>
      </div>

      {/* Header banner */}
      <div className="bg-ink text-white px-5 py-8">
        <div className="max-w-3xl mx-auto">
          {tab === 'security' ? (
            <>
              <p className="text-xs font-semibold tracking-widest uppercase mb-2" style={{ color:'#A78BFA' }}>
                Security &amp; Audit
              </p>
              <h1 className="font-serif text-2xl sm:text-3xl mb-2">
                Tamper-evident. Legally defensible. Forensically complete.
              </h1>
              <p className="text-gray-400 text-sm leading-relaxed max-w-2xl">
                Every LIABL document is immutably hashed at signing time. Every event is logged with millisecond precision, IP address, device fingerprint, and chain of custody. An operator who gets sued can produce a complete legal record in seconds.
              </p>
            </>
          ) : (
            <>
              <p className="text-xs font-semibold tracking-widest uppercase mb-2" style={{ color:'#A78BFA' }}>
                Enterprise features
              </p>
              <h1 className="font-serif text-2xl sm:text-3xl mb-2">
                Built for multi-location operators, resort groups, and school districts.
              </h1>
              <p className="text-gray-400 text-sm leading-relaxed max-w-2xl">
                Role-based access control, metadata tagging, and automated lifecycle management give enterprise buyers the compliance and governance features their procurement and legal teams require — features Smartwaiver and Wherewolf cannot match.
              </p>
            </>
          )}
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-10">
        {tab === 'security'   && <SecurityTab />}
        {tab === 'enterprise' && <EnterpriseTab />}
      </div>
    </div>
  )
}
