'use client'
import { useState } from 'react'

// ── RBAC ─────────────────────────────────────────────────────

type Role = 'owner' | 'manager' | 'staff'

const PERMISSIONS: { feature: string; owner: boolean; manager: boolean; staff: boolean }[] = [
  { feature:'View signed waivers (own group)',    owner:true,  manager:true,  staff:true  },
  { feature:'View participant health disclosures',owner:true,  manager:true,  staff:false },
  { feature:'Edit activity templates',            owner:true,  manager:true,  staff:false },
  { feature:'Create & manage groups',             owner:true,  manager:true,  staff:false },
  { feature:'Add / remove participants',          owner:true,  manager:true,  staff:false },
  { feature:'Export waiver data',                 owner:true,  manager:true,  staff:false },
  { feature:'Apply supervisor override',          owner:true,  manager:true,  staff:false },
  { feature:'Manage integrations & API keys',     owner:true,  manager:false, staff:false },
  { feature:'Manage team members & roles',        owner:true,  manager:false, staff:false },
  { feature:'Billing & subscription',             owner:true,  manager:false, staff:false },
  { feature:'Apply / release legal hold',         owner:true,  manager:false, staff:false },
  { feature:'Request data deletion (GDPR/CCPA)',  owner:true,  manager:false, staff:false },
  { feature:'View audit trail',                   owner:true,  manager:true,  staff:false },
  { feature:'View check-in roster status',        owner:true,  manager:true,  staff:true  },
]

const ROLE_DESC: Record<Role, { label: string; desc: string; color: string; bg: string }> = {
  owner:   { label:'Owner',   desc:'Full access. Billing, API keys, user management, legal hold.',          color:'text-brand',        bg:'bg-brand/10'   },
  manager: { label:'Manager', desc:'Roster, templates, reporting. Cannot manage billing or legal holds.',   color:'text-emerald-700',  bg:'bg-emerald-50' },
  staff:   { label:'Staff',   desc:'Check-in view only. Can see signed/pending status. No waiver content.', color:'text-amber-700',    bg:'bg-amber-50'   },
}

// ── Metadata ─────────────────────────────────────────────────

const METADATA_TAGS = [
  { type:'Season',         tags:['Summer 2026','School Year 25–26','Q3 Corporate'] },
  { type:'Location',       tags:['North Dock','South Canyon','Kiosk B','HQ Gym'] },
  { type:'Booking channel',tags:['FareHarbor','Direct','Walk-in','Group Sales'] },
  { type:'Cost center',    tags:['ADV-001','WEL-004','EDU-012'] },
  { type:'Staff assigned', tags:['J. Torres','R. Patel','M. Chen'] },
]

// ── Lifecycle ─────────────────────────────────────────────────

interface LifecycleDoc {
  id:       string
  name:     string
  activity: string
  signed:   string
  expires:  string
  status:   'active' | 'archived' | 'legal_hold' | 'deletion_requested' | 'purged'
  note?:    string
}

const LIFECYCLE_DOCS: LifecycleDoc[] = [
  { id:'doc_a1b2', name:'Jordan Rivera',  activity:'Kayaking',  signed:'Jun 3, 2026',  expires:'Jun 3, 2029',  status:'active' },
  { id:'doc_e5f6', name:'Omar Hassan',    activity:'Kayaking',  signed:'Jun 3, 2026',  expires:'Jun 3, 2029',  status:'active' },
  { id:'doc_x9y0', name:'Jamie Lee',      activity:'ATV Tour',  signed:'Jun 3, 2026',  expires:'Indefinite',   status:'legal_hold', note:'Incident reported Jun 3 — hold applied by J. Torres' },
  { id:'doc_m3n4', name:'Mia Chen',       activity:'Hiking',    signed:'Aug 12, 2024', expires:'Archived',     status:'archived' },
  { id:'doc_p7q8', name:'Alex Torres',    activity:'Climbing',  signed:'Mar 4, 2023',  expires:'Purged',       status:'purged' },
  { id:'doc_r1s2', name:'Casey Morgan',   activity:'ATV Tour',  signed:'Jun 2, 2026',  expires:'Jun 2, 2029',  status:'deletion_requested', note:'GDPR erasure request received — legal hold check pending' },
]

const STATUS_STYLES: Record<string, string> = {
  active:             'bg-emerald-50 text-emerald-700',
  archived:           'bg-gray-100 text-gray-500',
  legal_hold:         'bg-amber-50 text-amber-700',
  deletion_requested: 'bg-red-50 text-red-600',
  purged:             'bg-gray-50 text-gray-400',
}
const STATUS_LABELS: Record<string, string> = {
  active:             'Active',
  archived:           'Archived',
  legal_hold:         '⚑ Legal hold',
  deletion_requested: '⟳ Deletion requested',
  purged:             'Purged',
}

const RETENTION_RULES = [
  { activity:'Adventure activities (AZ)',  rule:'3 years from activity date',     standard:'ARS § 12-542' },
  { activity:'Minor participants',         rule:'Until participant turns 21',      standard:'ARS § 12-502' },
  { activity:'Incident-flagged waivers',   rule:'Indefinite until hold released', standard:'Legal hold policy' },
  { activity:'GDPR deletion request',      rule:'30 days after legal hold check', standard:'GDPR Art. 17' },
]

export default function EnterpriseTab() {
  const [activeRole,    setActiveRole]    = useState<Role>('owner')
  const [newTag,        setNewTag]        = useState('')
  const [newTagType,    setNewTagType]    = useState('Season')
  const [customTags,    setCustomTags]    = useState<{type:string; tag:string}[]>([])
  const [expandedDoc,   setExpandedDoc]   = useState<string | null>('doc_x9y0')

  function addTag() {
    if (!newTag.trim()) return
    setCustomTags(t => [...t, { type: newTagType, tag: newTag.trim() }])
    setNewTag('')
  }

  return (
    <div className="space-y-10">

      {/* ── RBAC ── */}
      <div>
        <h2 className="font-serif text-xl mb-1">Role-based access control</h2>
        <p className="text-sm text-gray-500 mb-5 leading-relaxed max-w-2xl">
          Three permission tiers give enterprise operators precise control over what each team member can see and do. Select a role to see its permission set.
        </p>

        {/* Role selector */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {(Object.entries(ROLE_DESC) as [Role, typeof ROLE_DESC[Role]][]).map(([key, val]) => (
            <button key={key} onClick={() => setActiveRole(key)}
              className={`text-left p-4 rounded-xl border transition-all ${
                activeRole === key ? 'border-brand bg-brand/5' : 'border-black/10 bg-white hover:border-brand/30'
              }`}>
              <div className={`inline-flex text-xs px-2.5 py-1 rounded-full font-medium mb-2 ${val.bg} ${val.color}`}>
                {val.label}
              </div>
              <p className="text-xs text-gray-400 leading-relaxed">{val.desc}</p>
            </button>
          ))}
        </div>

        {/* Permission table */}
        <div className="bg-white rounded-2xl border border-black/10 overflow-hidden">
          <div className="grid grid-cols-12 gap-2 px-5 py-2.5 border-b border-black/8 text-xs font-semibold text-gray-400 uppercase tracking-wider">
            <div className="col-span-7">Feature</div>
            <div className="col-span-1 text-center">Owner</div>
            <div className="col-span-2 text-center">Manager</div>
            <div className="col-span-2 text-center">Staff</div>
          </div>
          {PERMISSIONS.map((p, i) => (
            <div key={i}
              className={`grid grid-cols-12 gap-2 px-5 py-3 border-b border-black/5 last:border-0 text-xs items-center transition-colors ${
                p[activeRole] ? 'bg-white' : 'bg-surface/40'
              }`}>
              <div className={`col-span-7 ${p[activeRole] ? 'text-ink font-medium' : 'text-gray-400'}`}>
                {p.feature}
              </div>
              {(['owner','manager','staff'] as Role[]).map(role => (
                <div key={role} className="col-span-1 sm:col-span-1 flex justify-center" style={{ gridColumn: role === 'owner' ? 'span 1' : role === 'manager' ? 'span 2' : 'span 2' }}>
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center font-bold ${
                    p[role] ? 'bg-emerald-100 text-emerald-600' : 'bg-gray-100 text-gray-300'
                  }`}>
                    {p[role] ? '✓' : '✕'}
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ── Metadata tagging ── */}
      <div>
        <h2 className="font-serif text-xl mb-1">Metadata tagging</h2>
        <p className="text-sm text-gray-500 mb-5 leading-relaxed max-w-2xl">
          Attach custom metadata to any group or waiver for filtering, reporting, and legal hold queries. Operators define their own taxonomy.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
          {METADATA_TAGS.map(mt => (
            <div key={mt.type} className="bg-white rounded-xl border border-black/10 p-4">
              <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">{mt.type}</div>
              <div className="flex flex-wrap gap-2">
                {mt.tags.map(tag => (
                  <span key={tag} className="text-xs bg-surface border border-black/10 px-2.5 py-1 rounded-full text-gray-600">
                    {tag}
                  </span>
                ))}
                {customTags.filter(t => t.type === mt.type).map((t, i) => (
                  <span key={i} className="text-xs bg-brand/10 border border-brand/20 text-brand px-2.5 py-1 rounded-full">
                    {t.tag} ✦
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Add custom tag */}
        <div className="bg-brand/5 border border-brand/20 rounded-xl p-4">
          <div className="text-xs font-medium text-brand mb-3">Add a custom tag</div>
          <div className="flex gap-2">
            <select className="form-input w-36" value={newTagType} onChange={e => setNewTagType(e.target.value)}>
              {METADATA_TAGS.map(mt => <option key={mt.type}>{mt.type}</option>)}
            </select>
            <input className="form-input flex-1" placeholder="New tag value…" value={newTag}
              onChange={e => setNewTag(e.target.value)} onKeyDown={e => e.key === 'Enter' && addTag()} />
            <button onClick={addTag} disabled={!newTag.trim()}
              className="px-4 py-2 bg-brand text-white rounded-xl text-sm font-medium hover:opacity-90 disabled:opacity-40 shrink-0">
              Add
            </button>
          </div>
        </div>
      </div>

      {/* ── Lifecycle management ── */}
      <div>
        <h2 className="font-serif text-xl mb-1">Document lifecycle management</h2>
        <p className="text-sm text-gray-500 mb-5 leading-relaxed max-w-2xl">
          Every document moves through a defined lifecycle. Legal hold prevents expiry when an incident occurs — the enterprise differentiator no competitor in the activity space offers.
        </p>

        {/* Lifecycle stages visual */}
        <div className="flex items-center gap-1 mb-6 overflow-x-auto pb-2">
          {[
            { label:'Active',            color:'bg-emerald-500', desc:'Valid & signed' },
            { label:'→', color:'bg-transparent', desc:'' },
            { label:'Expired',           color:'bg-gray-300',    desc:'Past activity date' },
            { label:'→', color:'bg-transparent', desc:'' },
            { label:'Archived',          color:'bg-gray-400',    desc:'Retained per rules' },
            { label:'→', color:'bg-transparent', desc:'' },
            { label:'Purged',            color:'bg-gray-200',    desc:'Permanently deleted' },
          ].map((s, i) => (
            s.label === '→'
              ? <span key={i} className="text-gray-300 text-lg px-1 shrink-0">→</span>
              : (
                <div key={i} className="text-center shrink-0">
                  <div className={`${s.color} text-white text-xs px-3 py-1.5 rounded-full font-medium mb-1 whitespace-nowrap`}>
                    {s.label}
                  </div>
                  <div className="text-xs text-gray-400 whitespace-nowrap">{s.desc}</div>
                </div>
              )
          ))}
          <span className="text-gray-300 text-lg px-1 shrink-0">⇄</span>
          <div className="text-center shrink-0">
            <div className="bg-amber-400 text-white text-xs px-3 py-1.5 rounded-full font-medium mb-1 whitespace-nowrap">⚑ Legal hold</div>
            <div className="text-xs text-gray-400 whitespace-nowrap">Blocks expiry/purge</div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-black/10 overflow-hidden mb-6">
          {LIFECYCLE_DOCS.map(doc => (
            <div key={doc.id}>
              <div
                onClick={() => setExpandedDoc(expandedDoc === doc.id ? null : doc.id)}
                className="flex items-center gap-3 px-5 py-3.5 border-b border-black/5 last:border-0 hover:bg-surface/60 cursor-pointer transition-colors">
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-ink">{doc.name}</div>
                  <div className="text-xs text-gray-400">{doc.activity} · Signed {doc.signed}</div>
                </div>
                <div className="text-xs text-gray-400 shrink-0 hidden sm:block">Expires: {doc.expires}</div>
                <span className={`text-xs px-2.5 py-0.5 rounded-full font-medium shrink-0 ${STATUS_STYLES[doc.status]}`}>
                  {STATUS_LABELS[doc.status]}
                </span>
                <span className="text-gray-300 text-xs">{expandedDoc === doc.id ? '▲' : '▼'}</span>
              </div>

              {expandedDoc === doc.id && (
                <div className="bg-surface/50 border-b border-black/5 px-5 py-4 text-xs">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-3">
                    {[
                      { label:'Document ID', value: doc.id },
                      { label:'Signed',      value: doc.signed },
                      { label:'Expires',     value: doc.expires },
                      { label:'Status',      value: STATUS_LABELS[doc.status] },
                    ].map(({ label, value }) => (
                      <div key={label} className="bg-white rounded-lg border border-black/8 p-2.5">
                        <div className="text-gray-400 mb-1">{label}</div>
                        <div className="text-ink font-medium font-mono">{value}</div>
                      </div>
                    ))}
                  </div>
                  {doc.note && (
                    <div className={`rounded-lg p-3 text-xs leading-relaxed ${
                      doc.status === 'legal_hold' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                      doc.status === 'deletion_requested' ? 'bg-red-50 text-red-600 border border-red-200' : ''
                    }`}>
                      {doc.note}
                    </div>
                  )}
                  {doc.status === 'active' && (
                    <div className="flex gap-2 mt-3">
                      <button className="text-xs px-3 py-1.5 rounded-lg bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100 transition-colors">
                        ⚑ Apply legal hold
                      </button>
                      <button className="text-xs px-3 py-1.5 rounded-lg bg-surface border border-black/10 text-gray-500 hover:bg-white transition-colors">
                        Download PDF
                      </button>
                    </div>
                  )}
                  {doc.status === 'legal_hold' && (
                    <div className="flex gap-2 mt-3">
                      <button className="text-xs px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 transition-colors">
                        Release hold
                      </button>
                      <button className="text-xs px-3 py-1.5 rounded-lg bg-surface border border-black/10 text-gray-500 hover:bg-white transition-colors">
                        View incident record
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Retention rules */}
        <div>
          <h3 className="font-semibold text-sm text-ink mb-3">Retention policy engine</h3>
          <div className="bg-white rounded-2xl border border-black/10 overflow-hidden">
            <div className="grid grid-cols-12 gap-2 px-5 py-2.5 border-b border-black/8 text-xs font-semibold text-gray-400 uppercase tracking-wider">
              <div className="col-span-4">Activity type</div>
              <div className="col-span-5">Retention rule</div>
              <div className="col-span-3">Standard</div>
            </div>
            {RETENTION_RULES.map((r, i) => (
              <div key={i} className="grid grid-cols-12 gap-2 px-5 py-3.5 border-b border-black/5 last:border-0 text-xs items-center">
                <div className="col-span-4 font-medium text-ink">{r.activity}</div>
                <div className="col-span-5 text-gray-500">{r.rule}</div>
                <div className="col-span-3 font-mono text-gray-400">{r.standard}</div>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-400 mt-3 leading-relaxed">
            Retention policies are enforced automatically — no manual archiving required. LIABL evaluates every document nightly and transitions lifecycle states accordingly.
          </p>
        </div>
      </div>

    </div>
  )
}
