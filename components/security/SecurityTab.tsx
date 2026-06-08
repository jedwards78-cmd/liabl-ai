'use client'
import { useState } from 'react'

const AUDIT_EVENTS = [
  { id:'evt_001', time:'09:04:12.441', type:'waiver.signed',    participant:'Jordan Rivera',  ip:'98.112.44.21',  geo:'Phoenix, AZ',    device:'Chrome 124 / macOS',  docId:'doc_a1b2c3d4', hash:'sha256:7f3a...9c21' },
  { id:'evt_002', time:'09:04:11.028', type:'signature.captured',participant:'Jordan Rivera', ip:'98.112.44.21',  geo:'Phoenix, AZ',    device:'Chrome 124 / macOS',  docId:'doc_a1b2c3d4', hash:'sha256:7f3a...9c21' },
  { id:'evt_003', time:'09:03:58.774', type:'document.viewed',  participant:'Jordan Rivera',  ip:'98.112.44.21',  geo:'Phoenix, AZ',    device:'Chrome 124 / macOS',  docId:'doc_a1b2c3d4', hash:'sha256:7f3a...9c21' },
  { id:'evt_004', time:'09:03:44.102', type:'waiver.generated', participant:'Jordan Rivera',  ip:'98.112.44.21',  geo:'Phoenix, AZ',    device:'Chrome 124 / macOS',  docId:'doc_a1b2c3d4', hash:'sha256:initial' },
  { id:'evt_005', time:'08:58:03.319', type:'waiver.signed',    participant:'Omar Hassan',    ip:'172.56.21.88',  geo:'Scottsdale, AZ', device:'Safari 17 / iOS 17',  docId:'doc_e5f6g7h8', hash:'sha256:2b9f...1a44' },
  { id:'evt_006', time:'08:55:11.203', type:'override.applied', participant:'Jamie Lee',      ip:'192.168.1.10',  geo:'On-site kiosk',  device:'Chrome 124 / Windows',docId:'doc_x9y0z1w2', hash:'sha256:override_flag' },
  { id:'evt_007', time:'08:42:55.881', type:'waiver.signed',    participant:'Tyler Brooks',   ip:'76.88.201.14',  geo:'Mesa, AZ',       device:'Firefox 125 / Windows',docId:'doc_q3r4s5t6', hash:'sha256:4d1e...8f72' },
]

const EVENT_COLORS: Record<string, string> = {
  'waiver.signed':      'bg-emerald-50 text-emerald-700',
  'signature.captured': 'bg-emerald-50 text-emerald-600',
  'document.viewed':    'bg-blue-50 text-blue-600',
  'waiver.generated':   'bg-brand/10 text-brand',
  'override.applied':   'bg-amber-50 text-amber-700',
}

const COMPLIANCE = [
  { name:'ESIGN Act (15 U.S.C. § 7001)', status:'compliant', detail:'Federal electronic signature validity. Every waiver meets the four ESIGN requirements: intent, consent, association, retention.' },
  { name:'UETA',                          status:'compliant', detail:'Uniform Electronic Transactions Act. Adopted in 49 states. LIABL signatures are legally equivalent to wet ink.' },
  { name:'GDPR — Right to Erasure',       status:'compliant', detail:'Deletion workflow implemented. Legal hold check runs before purge. Data residency options available for EU operators.' },
  { name:'CCPA',                          status:'compliant', detail:'California Consumer Privacy Act. Opt-out handling, data portability export, and deletion request workflow.' },
  { name:'Health Data Handling',          status:'compliant', detail:'Medical disclosures stored in encrypted, isolated fields. Never surfaced at group level. Accessible only within individual waiver record.' },
  { name:'SOC 2 Type II',                 status:'roadmap',   detail:'Audit in planning for Q4 2026. Controls framework implemented. Third-party auditor engaged.' },
]

const ENCRYPTION = [
  { layer:'Data at rest',     spec:'AES-256',    detail:'All participant data, signatures, and documents encrypted at rest using AES-256-GCM.' },
  { layer:'Data in transit',  spec:'TLS 1.3',    detail:'All API calls and web traffic encrypted with TLS 1.3. HSTS enforced. Certificate pinning on mobile.' },
  { layer:'Signatures',       spec:'Encrypted blobs', detail:'Signature data stored as encrypted binary blobs — never as plain images. Decrypted only for PDF generation.' },
  { layer:'PII fields',       spec:'Field-level', detail:'DOB, email, and health disclosures use field-level encryption separate from document content.' },
  { layer:'Document hashing', spec:'SHA-256',    detail:'Each signed document receives an immutable SHA-256 hash at signing time. Hash mismatch = tamper detected.' },
  { layer:'Row isolation',    spec:'RLS',        detail:'Supabase Row Level Security. Operators can only query their own participants — zero cross-operator data leakage.' },
]

export default function SecurityTab() {
  const [verifyId,     setVerifyId]     = useState('')
  const [verifyResult, setVerifyResult] = useState<string | null>(null)
  const [verifying,    setVerifying]    = useState(false)
  const [expandedEvent, setExpandedEvent] = useState<string | null>('evt_001')

  function verify() {
    if (!verifyId.trim()) return
    setVerifying(true)
    setTimeout(() => {
      setVerifying(false)
      setVerifyResult(verifyId.startsWith('doc_') ? 'valid' : 'not_found')
    }, 900)
  }

  return (
    <div className="space-y-10">

      {/* ── Audit Trail ── */}
      <div>
        <div className="mb-4">
          <h2 className="font-serif text-xl mb-1">Audit trail</h2>
          <p className="text-sm text-gray-500 leading-relaxed max-w-2xl">
            Every document event is immutably logged with millisecond timestamps, IP address, device fingerprint, and a SHA-256 document hash. Tamper-evident by design.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-black/10 overflow-hidden">
          <div className="px-5 py-3 border-b border-black/8 flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Event log — today</span>
            <span className="text-xs text-gray-400">{AUDIT_EVENTS.length} events</span>
          </div>

          {AUDIT_EVENTS.map(evt => (
            <div key={evt.id}>
              <div
                onClick={() => setExpandedEvent(expandedEvent === evt.id ? null : evt.id)}
                className="flex items-center gap-3 px-5 py-3 border-b border-black/5 last:border-0 hover:bg-surface/60 cursor-pointer transition-colors">
                <span className="font-mono text-xs text-gray-400 shrink-0 w-24">{evt.time}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium shrink-0 ${EVENT_COLORS[evt.type] ?? 'bg-gray-100 text-gray-500'}`}>
                  {evt.type}
                </span>
                <span className="text-sm text-ink flex-1 truncate">{evt.participant}</span>
                <span className="text-xs text-gray-400 shrink-0 hidden sm:block">{evt.ip}</span>
                <span className="text-gray-300 text-xs shrink-0">{expandedEvent === evt.id ? '▲' : '▼'}</span>
              </div>

              {expandedEvent === evt.id && (
                <div className="bg-surface/50 border-b border-black/5 px-5 py-4">
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                    {[
                      { label:'Document ID',   value: evt.docId,       mono: true },
                      { label:'SHA-256 hash',  value: evt.hash,        mono: true },
                      { label:'IP address',    value: evt.ip,          mono: true },
                      { label:'Geolocation',   value: evt.geo,         mono: false },
                      { label:'Device',        value: evt.device,      mono: false },
                      { label:'Event ID',      value: evt.id,          mono: true },
                    ].map(({ label, value, mono }) => (
                      <div key={label} className="bg-white rounded-lg border border-black/8 p-2.5">
                        <div className="text-gray-400 mb-1">{label}</div>
                        <div className={`text-ink font-medium ${mono ? 'font-mono text-xs' : ''}`}>{value}</div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 flex items-center gap-2 text-xs text-emerald-600">
                    <span>✓</span>
                    <span>Document hash verified — no tampering detected since signing</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ── Document Integrity Verification ── */}
      <div>
        <h2 className="font-serif text-xl mb-1">Document integrity verification</h2>
        <p className="text-sm text-gray-500 mb-4 leading-relaxed max-w-2xl">
          Paste any Document ID to retrieve its full chain of custody — creation, views, signing event, IP, hash, and current integrity status.
        </p>

        <div className="bg-white rounded-2xl border border-black/10 p-5">
          <div className="flex gap-2 mb-4">
            <input
              className="form-input flex-1 font-mono text-sm"
              placeholder="e.g. doc_a1b2c3d4"
              value={verifyId}
              onChange={e => { setVerifyId(e.target.value); setVerifyResult(null) }}
              onKeyDown={e => e.key === 'Enter' && verify()}
            />
            <button onClick={verify} disabled={!verifyId.trim() || verifying}
              className="px-5 py-2 bg-brand text-white rounded-xl text-sm font-medium hover:opacity-90 disabled:opacity-40 transition-all shrink-0">
              {verifying ? 'Verifying…' : 'Verify'}
            </button>
          </div>

          {/* Demo hints */}
          <div className="flex gap-2 flex-wrap mb-4">
            {['doc_a1b2c3d4','doc_e5f6g7h8','doc_q3r4s5t6'].map(id => (
              <button key={id} onClick={() => { setVerifyId(id); setVerifyResult(null) }}
                className="font-mono text-xs text-brand bg-brand/5 border border-brand/20 px-2.5 py-1 rounded-full hover:bg-brand/10 transition-colors">
                {id}
              </button>
            ))}
            <span className="text-xs text-gray-400 self-center">← try these</span>
          </div>

          {verifyResult === 'valid' && (
            <div className="animate-fade-up space-y-3">
              <div className="flex items-center gap-2 text-emerald-600 font-medium text-sm mb-3">
                <span className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center text-xs">✓</span>
                Document verified — integrity intact
              </div>
              <div className="bg-surface rounded-xl border border-black/8 divide-y divide-black/5 overflow-hidden text-xs">
                {[
                  { label:'Document ID',     value: verifyId,                         mono:true  },
                  { label:'Participant',      value: 'Jordan Rivera',                  mono:false },
                  { label:'Operator',        value: 'Desert Ridge Adventures',         mono:false },
                  { label:'Activity',        value: 'Whitewater Kayaking',             mono:false },
                  { label:'Created',         value: '2026-06-03 09:03:44.102 UTC',     mono:true  },
                  { label:'Signed',          value: '2026-06-03 09:04:12.441 UTC',     mono:true  },
                  { label:'Signing IP',      value: '98.112.44.21 (Phoenix, AZ)',      mono:true  },
                  { label:'SHA-256 hash',    value: 'sha256:7f3a9d21e8bc4f...9c21',   mono:true  },
                  { label:'Hash status',     value: '✓ Verified — no tampering detected', mono:false },
                  { label:'Lifecycle',       value: 'Active · Expires 2029-06-03',     mono:false },
                ].map(({ label, value, mono }) => (
                  <div key={label} className="flex gap-3 px-4 py-2.5">
                    <span className="text-gray-400 w-28 shrink-0">{label}</span>
                    <span className={`text-ink ${mono ? 'font-mono' : 'font-medium'}`}>{value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {verifyResult === 'not_found' && (
            <div className="text-sm text-red-500 flex items-center gap-2">
              <span>✗</span> Document ID not found. Try one of the example IDs above.
            </div>
          )}
        </div>
      </div>

      {/* ── Encryption ── */}
      <div>
        <h2 className="font-serif text-xl mb-1">Encryption &amp; data protection</h2>
        <p className="text-sm text-gray-500 mb-4 max-w-2xl">Six independent layers of protection from participant entry to long-term archive.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {ENCRYPTION.map(e => (
            <div key={e.layer} className="bg-white rounded-xl border border-black/10 p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-sm text-ink">{e.layer}</span>
                <span className="font-mono text-xs bg-brand/10 text-brand px-2 py-0.5 rounded-full">{e.spec}</span>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed">{e.detail}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Compliance ── */}
      <div>
        <h2 className="font-serif text-xl mb-1">Regulatory compliance</h2>
        <p className="text-sm text-gray-500 mb-4 max-w-2xl">LIABL is built to meet the legal requirements of activity operators across the US and internationally.</p>
        <div className="bg-white rounded-2xl border border-black/10 overflow-hidden">
          {COMPLIANCE.map((c, i) => (
            <div key={i} className="flex items-start gap-4 px-5 py-4 border-b border-black/5 last:border-0">
              <span className={`text-xs px-2.5 py-1 rounded-full font-medium shrink-0 mt-0.5 ${
                c.status === 'compliant' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-600'
              }`}>
                {c.status === 'compliant' ? '✓ Compliant' : '⟳ Roadmap'}
              </span>
              <div>
                <div className="font-semibold text-sm text-ink mb-0.5">{c.name}</div>
                <div className="text-xs text-gray-400 leading-relaxed">{c.detail}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}
