'use client'
import { useState } from 'react'
import Logo    from '@/components/Logo'
import SSOTab from '@/components/integrations/SSOTab'

type Tab = 'platforms' | 'sso' | 'webhooks' | 'apikeys' | 'eventlog'

export default function IntegrationsPage() {
  const [tab, setTab] = useState<Tab>('platforms')

  const tabs: { key: Tab; label: string }[] = [
    { key:'platforms', label:'Platforms' },
    { key:'sso',       label:'Identity & SSO' },
    { key:'webhooks',  label:'Webhooks' },
    { key:'apikeys',   label:'API keys' },
    { key:'eventlog',  label:'Event log' },
  ]

  return (
    <div className="min-h-screen bg-surface">
      <nav className="bg-white border-b border-black/10 px-5 py-3 flex items-center justify-between">
        <Logo size="md" />
        <span className="text-xs bg-surface border border-black/10 px-3 py-1.5 rounded-full text-gray-500">
          Integrations · Desert Ridge Adventures
        </span>
      </nav>

      <div className="bg-white border-b border-black/10 px-5">
        <div className="flex gap-0 max-w-3xl mx-auto">
          {tabs.map(({ key, label }) => (
            <button key={key} onClick={() => setTab(key)}
              className={`px-4 py-3 text-sm font-medium border-b-2 transition-all ${
                tab === key ? 'border-brand text-brand' : 'border-transparent text-gray-500 hover:text-ink'
              }`}>
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8">
        {tab === 'platforms' && <PlatformsTab />}
        {tab === 'sso'       && <SSOTab />}
        {tab === 'webhooks'  && <WebhooksTab />}
        {tab === 'apikeys'   && <ApiKeysTab />}
        {tab === 'eventlog'  && <EventLogTab />}
      </div>
    </div>
  )
}

// ── Platforms ────────────────────────────────────────────────

const PLATFORMS = [
  { id:'fareharbor', name:'FareHarbor',   logo:'🟦', connected:true,  pattern:'Push + Webhook', since:'Connected Mar 2026', bookings:47 },
  { id:'rezdy',      name:'Rezdy',        logo:'🟩', connected:true,  pattern:'Webhook',        since:'Connected Jan 2026', bookings:12 },
  { id:'xola',       name:'Xola',         logo:'🟧', connected:false, pattern:'Push + Pull',    since:null,                bookings:0  },
  { id:'bokun',      name:'Bókun',        logo:'🟪', connected:false, pattern:'Pull',           since:null,                bookings:0  },
  { id:'checkfront', name:'Checkfront',   logo:'⬛', connected:false, pattern:'Webhook',        since:null,                bookings:0  },
  { id:'peek',       name:'Peek Pro',     logo:'🟥', connected:false, pattern:'Push',           since:null,                bookings:0  },
]

const PATTERN_DESC: Record<string, string> = {
  'Push':            'Platform calls LIABL when a booking is confirmed — group and invites created automatically.',
  'Pull':            'LIABL fetches roster from the platform via booking ID — no platform changes needed.',
  'Webhook':         'Bidirectional: platform sends booking events to LIABL; LIABL fires waiver status back.',
  'Push + Webhook':  'Platform creates LIABL groups on booking. LIABL fires waiver status back — data stays in sync.',
  'Push + Pull':     'Supports both automated push and manual pull via booking ID.',
}

function PlatformsTab() {
  const [expanded, setExpanded] = useState<string | null>('fareharbor')

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-serif text-2xl mb-1">Platform integrations</h1>
        <p className="text-sm text-gray-400 leading-relaxed max-w-2xl">
          Connect your booking platform so LIABL groups are created automatically when a booking is confirmed. Three integration patterns are supported depending on what each platform offers.
        </p>
      </div>

      {/* Integration pattern explainer */}
      <div className="grid grid-cols-3 gap-3 mb-8">
        {[
          { label:'Pattern 1 — Push', icon:'→', desc:'Platform calls LIABL on booking.confirmed. Group + invites created automatically. Highest completion rate.' },
          { label:'Pattern 2 — Pull', icon:'←', desc:'Operator pastes booking ID. LIABL fetches roster from platform API. Zero integration overhead.' },
          { label:'Pattern 3 — Webhook', icon:'⇄', desc:'Bidirectional sync. Waiver status flows back to platform manifest. Operators never leave FareHarbor.' },
        ].map(p => (
          <div key={p.label} className="bg-white rounded-xl border border-black/10 p-4">
            <div className="text-xl mb-2">{p.icon}</div>
            <div className="text-xs font-semibold text-ink mb-1">{p.label}</div>
            <div className="text-xs text-gray-400 leading-relaxed">{p.desc}</div>
          </div>
        ))}
      </div>

      <div className="space-y-3">
        {PLATFORMS.map(p => (
          <div key={p.id} className="bg-white rounded-2xl border border-black/10 overflow-hidden">
            <div
              onClick={() => setExpanded(expanded === p.id ? null : p.id)}
              className="flex items-center gap-4 px-5 py-4 cursor-pointer hover:bg-surface/40 transition-colors">
              <span className="text-2xl">{p.logo}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-sm text-ink">{p.name}</span>
                  {p.connected && <span className="text-xs bg-emerald-50 text-emerald-600 border border-emerald-200 px-2 py-0.5 rounded-full">Connected</span>}
                </div>
                <div className="text-xs text-gray-400 mt-0.5">
                  {p.connected ? `${p.since} · ${p.bookings} bookings synced` : 'Not connected'}
                </div>
              </div>
              <div className="text-xs bg-surface border border-black/10 px-2.5 py-1 rounded-full text-gray-500 shrink-0">
                {p.pattern}
              </div>
              <span className="text-gray-400 text-sm">{expanded === p.id ? '▲' : '▼'}</span>
            </div>

            {expanded === p.id && (
              <div className="border-t border-black/8 px-5 py-4 bg-surface/30">
                <div className="text-xs text-gray-500 leading-relaxed mb-4">
                  <strong className="text-gray-600">{p.pattern}:</strong> {PATTERN_DESC[p.pattern]}
                </div>

                {p.connected ? (
                  <div>
                    <div className="bg-ink rounded-xl p-4 font-mono text-xs text-green-400 mb-4 overflow-x-auto">
                      <div className="text-gray-500 mb-2">{`// ${p.name} fires this webhook to LIABL on booking.confirmed`}</div>
                      <div>{`POST https://api.liabl.com/v1/groups`}</div>
                      <div className="text-gray-500 mt-1">{`Authorization: Bearer {operator_api_key}`}</div>
                      <div className="mt-2">{`{`}</div>
                      <div className="ml-4">{`"external_booking_id": "RKC-4821",`}</div>
                      <div className="ml-4">{`"external_platform": "${p.id}",`}</div>
                      <div className="ml-4">{`"activity_type": "adventure",`}</div>
                      <div className="ml-4">{`"activity_date": "2026-06-07T09:00:00Z",`}</div>
                      <div className="ml-4">{`"waiver_template_id": "tmpl_standard_adventure",`}</div>
                      <div className="ml-4">{`"invite_method": "email"`}</div>
                      <div>{`}`}</div>
                    </div>
                    <div className="flex gap-2">
                      <button className="text-sm px-4 py-2 rounded-xl border border-black/20 text-gray-600 hover:bg-white transition-colors">Configure</button>
                      <button className="text-sm px-4 py-2 rounded-xl border border-red-200 text-red-500 hover:bg-red-50 transition-colors">Disconnect</button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="text-xs text-gray-500 mb-3">You&apos;ll need your {p.name} API key from their operator portal.</div>
                    <div className="flex gap-2">
                      <input className="form-input flex-1" placeholder={`Paste ${p.name} API key…`} />
                      <button className="px-4 py-2 bg-brand text-white rounded-xl text-sm font-medium hover:opacity-90 transition-colors shrink-0">Connect</button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Webhooks ─────────────────────────────────────────────────

const WEBHOOK_EVENTS = [
  { event:'group.created',        dir:'out', desc:'Fires when a LIABL group is created from a platform booking.' },
  { event:'waiver.signed',        dir:'out', desc:'Fires when a participant completes their waiver. Platform can mark participant waiver-complete.' },
  { event:'waiver.overridden',    dir:'out', desc:'Fires when a supervisor override is used. Flag visible in platform manifest.' },
  { event:'booking.confirmed',    dir:'in',  desc:'Platform sends this when a booking is confirmed. LIABL creates group + sends invites.' },
  { event:'booking.updated',      dir:'in',  desc:'Participant added or removed from booking. Roster updated. Signed waivers marked inactive — never deleted.' },
  { event:'booking.cancelled',    dir:'in',  desc:'Group marked inactive. Signed waivers remain as permanent legal records.' },
]

function WebhooksTab() {
  const [url, setUrl] = useState('https://myapp.com/webhooks/liabl')
  return (
    <div>
      <h1 className="font-serif text-2xl mb-1">Webhooks</h1>
      <p className="text-sm text-gray-400 mb-6 leading-relaxed">
        Configure endpoints to receive LIABL events, or register inbound webhook URLs for bidirectional sync.
      </p>

      <div className="bg-white rounded-2xl border border-black/10 p-5 mb-6">
        <div className="font-medium text-sm text-ink mb-3">Outbound webhook endpoint</div>
        <div className="flex gap-2 mb-2">
          <input className="form-input flex-1" value={url} onChange={e=>setUrl(e.target.value)} />
          <button className="px-4 py-2 bg-brand text-white rounded-xl text-sm font-medium hover:opacity-90 shrink-0">Save</button>
        </div>
        <div className="text-xs text-gray-400">LIABL will POST signed waiver events to this URL. Retries use exponential backoff up to 5 attempts.</div>
      </div>

      <div className="bg-white rounded-2xl border border-black/10 overflow-hidden">
        <div className="px-5 py-3 border-b border-black/8 text-xs font-semibold text-gray-400 uppercase tracking-wider">
          Supported events
        </div>
        {WEBHOOK_EVENTS.map(e => (
          <div key={e.event} className="flex items-start gap-4 px-5 py-3.5 border-b border-black/5 last:border-0">
            <span className={`text-xs px-2 py-0.5 rounded-full font-medium shrink-0 mt-0.5 ${
              e.dir === 'out' ? 'bg-brand/10 text-brand' : 'bg-emerald-50 text-emerald-600'
            }`}>
              {e.dir === 'out' ? '→ Out' : '← In'}
            </span>
            <div>
              <div className="font-mono text-xs text-ink mb-0.5">{e.event}</div>
              <div className="text-xs text-gray-400 leading-relaxed">{e.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── API Keys ─────────────────────────────────────────────────

function ApiKeysTab() {
  const [showNew, setShowNew] = useState(false)
  const keys = [
    { name:'FareHarbor production', key:'lbl_live_4k9...2mx', created:'Mar 12, 2026', lastUsed:'Today' },
    { name:'Rezdy integration',     key:'lbl_live_7r2...9qp', created:'Jan 8, 2026',  lastUsed:'Yesterday' },
  ]

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-serif text-2xl mb-1">API keys</h1>
          <p className="text-sm text-gray-400">Authenticate platform integrations and third-party apps.</p>
        </div>
        <button onClick={()=>setShowNew(true)} className="text-sm px-4 py-2 bg-brand text-white rounded-xl hover:opacity-90 transition-colors">
          + New key
        </button>
      </div>

      {showNew && (
        <div className="bg-brand/5 border border-brand/20 rounded-xl p-4 mb-4">
          <div className="font-medium text-sm mb-3">Create new API key</div>
          <input className="form-input mb-3" placeholder="Key name (e.g. FareHarbor staging)" />
          <div className="flex gap-2">
            <button onClick={()=>setShowNew(false)} className="btn-secondary text-sm py-2">Cancel</button>
            <button className="px-4 py-2 bg-brand text-white rounded-xl text-sm font-medium">Generate key</button>
          </div>
        </div>
      )}

      <div className="bg-white rounded-2xl border border-black/10 overflow-hidden mb-6">
        {keys.map((k, i) => (
          <div key={i} className="flex items-center gap-4 px-5 py-4 border-b border-black/5 last:border-0">
            <div className="flex-1">
              <div className="font-medium text-sm text-ink">{k.name}</div>
              <div className="font-mono text-xs text-gray-400 mt-0.5">{k.key}</div>
            </div>
            <div className="text-xs text-gray-400 text-right">
              <div>Created {k.created}</div>
              <div>Last used {k.lastUsed}</div>
            </div>
            <button className="text-xs text-red-400 hover:text-red-600 transition-colors">Revoke</button>
          </div>
        ))}
      </div>

      <div className="bg-ink rounded-2xl p-5 text-sm">
        <div className="text-white font-medium mb-3">Example API call</div>
        <div className="font-mono text-xs text-green-400 leading-relaxed overflow-x-auto">
          <div className="text-gray-500">{`// Create a group from a confirmed booking`}</div>
          <div className="mt-1">{`curl -X POST https://api.liabl.com/v1/groups \\`}</div>
          <div className="ml-4">{`-H "Authorization: Bearer lbl_live_4k9...2mx" \\`}</div>
          <div className="ml-4">{`-H "Content-Type: application/json" \\`}</div>
          <div className="ml-4">{`-d '{"external_booking_id":"RKC-4821","external_platform":"fareharbor",`}</div>
          <div className="ml-4">{`     "activity_type":"adventure","invite_method":"email"}'`}</div>
          <div className="mt-3 text-gray-500">{`// Response`}</div>
          <div>{`{ "group_id": "grp_a1b2c3", "signing_urls": [...], "qr_code_url": "..." }`}</div>
        </div>
      </div>
    </div>
  )
}

// ── Event Log ────────────────────────────────────────────────

const EVENTS = [
  { time:'9:04 AM', event:'waiver.signed',     platform:'FareHarbor', ref:'RKC-4821', participant:'Jordan Rivera', status:'delivered',  ms:142  },
  { time:'9:01 AM', event:'waiver.signed',     platform:'FareHarbor', ref:'RKC-4821', participant:'Riley Chen',    status:'delivered',  ms:138  },
  { time:'8:55 AM', event:'group.created',     platform:'FareHarbor', ref:'RKC-4821', participant:'—',             status:'delivered',  ms:201  },
  { time:'8:55 AM', event:'booking.confirmed', platform:'FareHarbor', ref:'RKC-4821', participant:'—',             status:'received',   ms:null },
  { time:'8:33 AM', event:'waiver.signed',     platform:'Rezdy',      ref:'RZ-0042',  participant:'Tyler Brooks',  status:'delivered',  ms:155  },
  { time:'8:21 AM', event:'waiver.overridden', platform:'Rezdy',      ref:'RZ-0042',  participant:'Jamie Lee',     status:'failed',     ms:null },
  { time:'8:21 AM', event:'waiver.overridden', platform:'Rezdy',      ref:'RZ-0042',  participant:'Jamie Lee',     status:'retrying',   ms:null },
]

function EventLogTab() {
  return (
    <div>
      <h1 className="font-serif text-2xl mb-1">Event log</h1>
      <p className="text-sm text-gray-400 mb-6">All inbound and outbound integration events. Retries use exponential backoff up to 5 attempts.</p>

      <div className="bg-white rounded-2xl border border-black/10 overflow-hidden">
        <div className="grid grid-cols-12 gap-2 px-5 py-2.5 border-b border-black/8 text-xs font-semibold text-gray-400 uppercase tracking-wider">
          <div className="col-span-1">Time</div>
          <div className="col-span-3">Event</div>
          <div className="col-span-2">Platform</div>
          <div className="col-span-2">Ref</div>
          <div className="col-span-2">Participant</div>
          <div className="col-span-2">Status</div>
        </div>

        {EVENTS.map((e, i) => (
          <div key={i} className="grid grid-cols-12 gap-2 px-5 py-3 border-b border-black/5 last:border-0 items-center text-xs">
            <div className="col-span-1 text-gray-400 font-mono">{e.time}</div>
            <div className="col-span-3 font-mono text-ink">{e.event}</div>
            <div className="col-span-2 text-gray-500">{e.platform}</div>
            <div className="col-span-2 font-mono text-gray-400">{e.ref}</div>
            <div className="col-span-2 text-gray-500 truncate">{e.participant}</div>
            <div className="col-span-2">
              {e.status === 'delivered' && (
                <span className="text-emerald-600 font-medium">✓ {e.ms}ms</span>
              )}
              {e.status === 'received' && (
                <span className="text-brand font-medium">← received</span>
              )}
              {e.status === 'failed' && (
                <span className="text-red-500 font-medium">✗ failed</span>
              )}
              {e.status === 'retrying' && (
                <span className="text-amber-600 font-medium">⟳ retry 1/5</span>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-700">
        <strong>Retry alert:</strong> The <span className="font-mono">waiver.overridden</span> event for Jamie Lee (RZ-0042) failed delivery. Retry 1 of 5 in progress. You will be notified if all retries are exhausted.
      </div>
    </div>
  )
}
