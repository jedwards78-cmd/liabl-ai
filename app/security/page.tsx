'use client'
import { useState } from 'react'
import Logo           from '@/components/Logo'
import SecurityTab    from '@/components/security/SecurityTab'
import EnterpriseTab  from '@/components/security/EnterpriseTab'
import InvestorTab    from '@/components/security/InvestorTab'

type Tab = 'security' | 'enterprise' | 'investor'

export default function SecurityPage() {
  const [tab, setTab] = useState<Tab>('security')

  const tabs: { key: Tab; label: string; icon: string }[] = [
    { key:'security',   label:'Security & Audit',      icon:'🔐' },
    { key:'enterprise', label:'Enterprise features',   icon:'🏢' },
    { key:'investor',   label:'Investor overview',     icon:'📈' },
  ]

  const BANNERS: Record<Tab, { eyebrow: string; title: string; sub: string }> = {
    security: {
      eyebrow: 'Security & Audit',
      title:   'Tamper-evident. Legally defensible. Forensically complete.',
      sub:     'Every LIABL document is immutably hashed at signing time. Every event is logged with millisecond precision, IP address, device fingerprint, and chain of custody. An operator who gets sued can produce a complete legal record in seconds.',
    },
    enterprise: {
      eyebrow: 'Enterprise features',
      title:   'Built for multi-location operators, resort groups, and school districts.',
      sub:     'Role-based access control, metadata tagging, and automated lifecycle management give enterprise buyers the compliance and governance features their procurement and legal teams require.',
    },
    investor: {
      eyebrow: 'Investor overview',
      title:   'The white space, the flywheel, and the five features that build the moat.',
      sub:     'An interactive walkthrough of LIABL\'s market position, adaptive document intelligence, and the network effect thesis — designed for investor conversations.',
    },
  }

  const b = BANNERS[tab]

  return (
    <div className="min-h-screen bg-surface">
      <nav className="bg-white border-b border-black/10 px-5 py-3 flex items-center justify-between">
        <Logo size="md" />
        <span className="text-xs bg-surface border border-black/10 px-3 py-1.5 rounded-full text-gray-500">
          Security &amp; Enterprise
        </span>
      </nav>

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

      {/* Banner */}
      <div className="bg-ink text-white px-5 py-8">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs font-semibold tracking-widest uppercase mb-2" style={{ color:'#A78BFA' }}>
            {b.eyebrow}
          </p>
          <h1 className="font-serif text-2xl sm:text-3xl mb-2">{b.title}</h1>
          <p className="text-gray-400 text-sm leading-relaxed max-w-2xl">{b.sub}</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-10">
        {tab === 'security'   && <SecurityTab />}
        {tab === 'enterprise' && <EnterpriseTab />}
        {tab === 'investor'   && <InvestorTab />}
      </div>
    </div>
  )
}
