'use client'
import { useState } from 'react'
import {
  QrCode, UserCheck, ClipboardList, AlertTriangle,
  WifiOff, Smartphone, CheckCircle, ChevronRight,
  ArrowLeft, Shield, Wifi,
} from 'lucide-react'

type Screen =
  | 'home' | 'scan' | 'pass_recognized' | 'activity_select'
  | 'health' | 'document' | 'signature' | 'confirm'
  | 'manifest' | 'offline_banner' | 'verify'

interface PhoneProps {
  screen:    Screen
  onScreen:  (s: Screen) => void
  isOffline: boolean
}

// ── Shared phone shell ────────────────────────────────────────
function Phone({ children, isOffline }: { children: React.ReactNode; isOffline: boolean }) {
  return (
    <div className="relative mx-auto" style={{ width: 280 }}>
      {/* Phone frame */}
      <div className="bg-ink rounded-[2.5rem] p-2 shadow-2xl">
        <div className="bg-white rounded-[2rem] overflow-hidden" style={{ minHeight: 560 }}>
          {/* Status bar */}
          <div className={`flex items-center justify-between px-5 py-2 text-xs ${isOffline ? 'bg-amber-500 text-white' : 'bg-white text-gray-500'}`}>
            <span className="font-medium">9:41</span>
            <div className="flex items-center gap-1">
              {isOffline
                ? <><WifiOff size={12} /><span className="text-xs font-medium">Offline mode</span></>
                : <><Wifi size={12} /><span>●●●</span></>
              }
            </div>
          </div>
          {children}
        </div>
      </div>
      {/* Home indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-16 h-1 bg-white/30 rounded-full" />
    </div>
  )
}

// ── Individual screens ────────────────────────────────────────

function HomeScreen({ onScreen, isOffline }: { onScreen:(s:Screen)=>void; isOffline:boolean }) {
  return (
    <div className="flex flex-col h-full bg-surface">
      {/* Nav */}
      <div className="bg-white px-4 py-3 border-b border-black/8 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-brand flex items-center justify-center">
            <span className="text-white text-xs font-bold">L</span>
          </div>
          <span className="font-serif font-semibold text-sm text-ink">LIABL</span>
        </div>
        <div className="w-7 h-7 rounded-full bg-brand/10 flex items-center justify-center text-xs font-semibold text-brand">JT</div>
      </div>

      <div className="flex-1 px-4 py-5 space-y-3">
        <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Desert Ridge Adventures</div>

        {/* Today's session */}
        <div className="bg-white rounded-2xl border border-black/10 p-4">
          <div className="text-xs text-gray-400 mb-1">Today · AM-04 · 9:00 AM</div>
          <div className="font-semibold text-ink text-sm mb-3">Whitewater Kayaking</div>
          <div className="flex gap-2 mb-3">
            {[{v:'7',l:'Signed',c:'text-emerald-600'},{v:'2',l:'Pending',c:'text-amber-600'},{v:'9',l:'Total',c:'text-ink'}].map(({v,l,c})=>(
              <div key={l} className="flex-1 bg-surface rounded-xl p-2 text-center">
                <div className={`font-semibold text-base ${c}`}>{v}</div>
                <div className="text-xs text-gray-400">{l}</div>
              </div>
            ))}
          </div>
          <button onClick={() => onScreen('manifest')}
            className="w-full py-2 bg-brand text-white rounded-xl text-xs font-semibold">
            View manifest →
          </button>
        </div>

        {/* Quick actions */}
        <div className="grid grid-cols-2 gap-2">
          <button onClick={() => onScreen('scan')}
            className="bg-white rounded-2xl border border-black/10 p-4 text-left hover:border-brand/30 transition-colors">
            <QrCode size={20} className="text-brand mb-2" />
            <div className="text-xs font-semibold text-ink">Scan QR</div>
            <div className="text-xs text-gray-400">Check in participant</div>
          </button>
          <button onClick={() => onScreen('verify')}
            className="bg-white rounded-2xl border border-black/10 p-4 text-left hover:border-brand/30 transition-colors">
            <UserCheck size={20} className="text-emerald-600 mb-2" />
            <div className="text-xs font-semibold text-ink">Verify pass</div>
            <div className="text-xs text-gray-400">LIABL Pass scan</div>
          </button>
        </div>

        {isOffline && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 flex gap-2 items-start">
            <WifiOff size={14} className="text-amber-600 shrink-0 mt-0.5" />
            <div className="text-xs text-amber-700">
              <div className="font-semibold mb-0.5">Offline mode active</div>
              <div>2 signatures queued — will sync when connected</div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function ScanScreen({ onScreen }: { onScreen:(s:Screen)=>void }) {
  const [scanned, setScanned] = useState(false)
  return (
    <div className="flex flex-col bg-ink h-full">
      <div className="flex items-center gap-3 px-4 py-3">
        <button onClick={() => onScreen('home')}><ArrowLeft size={18} className="text-white" /></button>
        <span className="text-white font-semibold text-sm">Scan QR code</span>
      </div>
      {/* Viewfinder */}
      <div className="flex-1 flex flex-col items-center justify-center px-8">
        <div className="relative w-48 h-48 mb-6">
          <div className="absolute inset-0 border-2 border-white/20 rounded-2xl" />
          {/* Corner brackets */}
          {['top-0 left-0','top-0 right-0','bottom-0 left-0','bottom-0 right-0'].map((pos,i) => (
            <div key={i} className={`absolute w-6 h-6 ${pos}`}
              style={{ borderTop: i<2?'2px solid #A78BFA':'none', borderBottom:i>=2?'2px solid #A78BFA':'none', borderLeft:i%2===0?'2px solid #A78BFA':'none', borderRight:i%2!==0?'2px solid #A78BFA':'none' }} />
          ))}
          {scanned ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <CheckCircle size={48} className="text-emerald-400" />
            </div>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <QrCode size={48} className="text-white/30" />
            </div>
          )}
          {/* Scan line animation */}
          {!scanned && <div className="absolute left-2 right-2 h-0.5 bg-violet-400/60 top-1/2 animate-pulse-soft" />}
        </div>
        <p className="text-white/60 text-xs text-center mb-6">Point camera at participant&apos;s QR code or LIABL Pass</p>
        <button onClick={() => { setScanned(true); setTimeout(() => onScreen('pass_recognized'), 800) }}
          className="bg-violet-500 text-white px-6 py-2.5 rounded-xl text-sm font-semibold">
          {scanned ? 'Recognized…' : 'Simulate scan'}
        </button>
      </div>
    </div>
  )
}

function PassRecognizedScreen({ onScreen }: { onScreen:(s:Screen)=>void }) {
  return (
    <div className="flex flex-col bg-surface h-full">
      <div className="flex items-center gap-3 px-4 py-3 bg-white border-b border-black/8">
        <button onClick={() => onScreen('home')}><ArrowLeft size={18} className="text-ink" /></button>
        <span className="text-ink font-semibold text-sm">LIABL Pass recognized</span>
      </div>
      <div className="flex-1 px-4 py-5">
        <div className="bg-brand rounded-2xl p-4 text-white mb-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-semibold text-sm">JR</div>
            <div>
              <div className="font-semibold text-sm">Jordan Rivera</div>
              <div className="text-white/60 text-xs">✦ LIABL Pass · LP-4821</div>
            </div>
            <div className="ml-auto bg-emerald-400 text-white text-xs px-2 py-0.5 rounded-full font-semibold">Signed</div>
          </div>
          <div className="grid grid-cols-3 gap-2 text-center">
            {[{v:'7',l:'Visits'},{v:'3',l:'Operators'},{v:'Jun 3',l:'Last visit'}].map(({v,l})=>(
              <div key={l} className="bg-white/10 rounded-xl py-2">
                <div className="font-semibold text-sm">{v}</div>
                <div className="text-white/60 text-xs">{l}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-black/10 p-4 mb-4 space-y-2">
          {[{l:'Activity',v:'Whitewater Kayaking'},{l:'Session',v:'AM-04 · 9:00 AM'},{l:'Waiver signed',v:'Today · 8:42 AM'},{l:'Health flags',v:'None on file'}].map(({l,v})=>(
            <div key={l} className="flex justify-between text-xs"><span className="text-gray-400">{l}</span><span className="font-medium text-ink">{v}</span></div>
          ))}
        </div>

        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 flex gap-2 items-center mb-4">
          <CheckCircle size={16} className="text-emerald-600 shrink-0" />
          <span className="text-emerald-700 text-xs font-medium">Cleared to participate — waiver valid</span>
        </div>

        <button onClick={() => onScreen('home')} className="w-full py-2.5 bg-brand text-white rounded-xl text-sm font-semibold">
          Check in ✓
        </button>
      </div>
    </div>
  )
}

function WaiverFlowScreen({ screen, onScreen }: { screen:Screen; onScreen:(s:Screen)=>void }) {
  const steps: { key:Screen; title:string; sub:string; next:Screen; content: React.ReactNode }[] = [
    {
      key:'activity_select', title:'Select activity', sub:'Step 1 of 4',
      next:'health',
      content: (
        <div className="space-y-2">
          {[{e:'🚣',l:'Whitewater Kayaking',s:'Class III–IV rapids'},{e:'🥾',l:'Canyon Hiking',s:'Technical terrain'},{e:'🏎️',l:'ATV Tour',s:'Off-road vehicles'},{e:'🧗',l:'Rock Climbing',s:'Top-rope & lead'}].map(a=>(
            <div key={a.l} className="flex items-center gap-3 bg-surface rounded-xl px-3 py-2.5 border border-black/8">
              <span className="text-lg">{a.e}</span>
              <div><div className="text-xs font-semibold text-ink">{a.l}</div><div className="text-xs text-gray-400">{a.s}</div></div>
              <ChevronRight size={14} className="text-gray-300 ml-auto" />
            </div>
          ))}
        </div>
      ),
    },
    {
      key:'health', title:'Health disclosure', sub:'Step 2 of 4',
      next:'document',
      content: (
        <div className="space-y-2">
          <p className="text-xs text-gray-500 mb-3">Do you have any cardiovascular conditions or recent injuries?</p>
          {['No known conditions','Yes — cardiac or respiratory','Yes — recent injury'].map(o=>(
            <div key={o} className="flex items-center gap-2 bg-surface rounded-xl px-3 py-2.5 border border-black/8">
              <div className="w-3.5 h-3.5 rounded-full border-2 border-gray-300 shrink-0"/>
              <span className="text-xs text-ink">{o}</span>
            </div>
          ))}
        </div>
      ),
    },
    {
      key:'document', title:'Review document', sub:'Step 3 of 4',
      next:'signature',
      content: (
        <div className="space-y-2">
          <div className="bg-brand/5 border border-brand/20 rounded-xl p-3">
            <div className="text-xs font-semibold text-brand uppercase tracking-wider mb-1">⚡ Activity-specific clause</div>
            <p className="text-xs text-gray-600 leading-relaxed">Participant acknowledges Class III–IV rapids and risk of capsize. Confirms they are a confident swimmer.</p>
          </div>
          <div className="bg-surface border border-black/8 rounded-xl p-3">
            <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Assumption of Risk</div>
            <p className="text-xs text-gray-500 leading-relaxed">Participant acknowledges inherent risks and voluntarily assumes full responsibility…</p>
          </div>
          <div className="bg-surface border border-black/8 rounded-xl p-3">
            <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Release of Liability</div>
            <p className="text-xs text-gray-500 leading-relaxed">Participant releases the operator from all liability arising from participation…</p>
          </div>
        </div>
      ),
    },
    {
      key:'signature', title:'Sign to confirm', sub:'Step 4 of 4',
      next:'confirm',
      content: (
        <div className="space-y-3">
          <div className="bg-surface border border-black/20 rounded-xl h-20 flex items-center justify-center">
            <p className="text-xs text-gray-400">Draw signature here</p>
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">Or type your full name</label>
            <div className="bg-surface border border-black/20 rounded-xl px-3 py-2 text-xs text-gray-400">Jordan Rivera</div>
          </div>
          <div className="bg-brand/5 border border-brand/20 rounded-xl p-2 flex gap-2 text-xs text-brand">
            <Shield size={12} className="shrink-0 mt-0.5" />
            <span>ESIGN Act compliant · IP recorded</span>
          </div>
        </div>
      ),
    },
  ]

  const current = steps.find(s => s.key === screen)
  if (!current) return null

  return (
    <div className="flex flex-col bg-surface h-full">
      <div className="flex items-center gap-3 px-4 py-3 bg-white border-b border-black/8">
        <button onClick={() => onScreen('home')}><ArrowLeft size={18} className="text-ink" /></button>
        <div><div className="text-ink font-semibold text-sm">{current.title}</div><div className="text-xs text-gray-400">{current.sub}</div></div>
      </div>
      {/* Progress */}
      <div className="flex gap-1 px-4 pt-3">
        {steps.map((s, i) => (
          <div key={s.key} className={`flex-1 h-1 rounded-full ${steps.indexOf(current) >= i ? 'bg-brand' : 'bg-black/10'}`} />
        ))}
      </div>
      <div className="flex-1 px-4 py-4 overflow-y-auto">
        {current.content}
      </div>
      <div className="px-4 pb-6">
        <button onClick={() => onScreen(current.next)} className="w-full py-3 bg-brand text-white rounded-xl text-sm font-semibold">
          {current.next === 'confirm' ? '✓ Sign & submit' : 'Continue →'}
        </button>
      </div>
    </div>
  )
}

function ConfirmScreen({ onScreen }: { onScreen:(s:Screen)=>void }) {
  return (
    <div className="flex flex-col items-center justify-center bg-surface h-full px-6 text-center">
      <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center mb-4">
        <CheckCircle size={32} className="text-emerald-500" />
      </div>
      <h3 className="font-serif text-xl text-ink mb-2">Signed!</h3>
      <p className="text-sm text-gray-500 mb-6">Your waiver has been recorded. A copy has been sent to your email.</p>
      <div className="flex flex-wrap gap-2 justify-center mb-6">
        {['9:04 AM','Kayaking','ESIGN ✓','LIABL Pass ✦'].map(t=>(
          <span key={t} className="bg-white border border-black/10 text-xs px-2.5 py-1 rounded-full text-gray-500">{t}</span>
        ))}
      </div>
      <button onClick={() => onScreen('home')} className="w-full py-2.5 bg-brand text-white rounded-xl text-sm font-semibold">← Back to manifest</button>
    </div>
  )
}

function ManifestScreen({ onScreen }: { onScreen:(s:Screen)=>void }) {
  const participants = [
    { name:'Jordan Rivera',  status:'signed',  activity:'Kayaking', time:'8:42 AM', pass:true  },
    { name:'Mia Chen',       status:'guardian',activity:'Kayaking', time:'8:51 AM', pass:false },
    { name:'Tyler Brooks',   status:'signed',  activity:'Kayaking', time:'8:53 AM', pass:false },
    { name:'Sasha Kim',      status:'pending', activity:'Kayaking', time:'—',       pass:false },
    { name:'Omar Hassan',    status:'signed',  activity:'Kayaking', time:'8:58 AM', pass:true  },
  ]
  return (
    <div className="flex flex-col bg-surface h-full">
      <div className="flex items-center gap-3 px-4 py-3 bg-white border-b border-black/8">
        <button onClick={() => onScreen('home')}><ArrowLeft size={18} className="text-ink" /></button>
        <div><div className="text-ink font-semibold text-sm">Session manifest</div><div className="text-xs text-gray-400">AM-04 · Whitewater Kayaking</div></div>
      </div>
      <div className="flex-1 overflow-y-auto">
        {participants.map((p, i) => (
          <div key={i} className="flex items-center gap-2 px-4 py-3 border-b border-black/5 bg-white">
            <div className="w-7 h-7 rounded-full bg-brand/10 flex items-center justify-center text-xs font-semibold text-brand shrink-0">
              {p.name.split(' ').map(n=>n[0]).join('')}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-medium text-ink flex items-center gap-1">
                {p.name}
                {p.pass && <span className="text-brand text-xs">✦</span>}
              </div>
              <div className="text-xs text-gray-400">{p.time}</div>
            </div>
            <span className={`text-xs px-2 py-0.5 rounded-full font-medium shrink-0 ${
              p.status==='signed'?'bg-emerald-50 text-emerald-700':
              p.status==='guardian'?'bg-violet-50 text-violet-700':
              'bg-amber-50 text-amber-700'
            }`}>
              {p.status==='signed'?'Signed':p.status==='guardian'?'Guardian':' Pending'}
            </span>
          </div>
        ))}
      </div>
      <div className="px-4 py-3 border-t border-black/8 bg-white">
        <button onClick={() => onScreen('scan')} className="w-full py-2.5 bg-brand text-white rounded-xl text-sm font-semibold flex items-center justify-center gap-2">
          <QrCode size={16} /> Scan next participant
        </button>
      </div>
    </div>
  )
}

function VerifyScreen({ onScreen }: { onScreen:(s:Screen)=>void }) {
  return (
    <div className="flex flex-col bg-surface h-full">
      <div className="flex items-center gap-3 px-4 py-3 bg-white border-b border-black/8">
        <button onClick={() => onScreen('home')}><ArrowLeft size={18} className="text-ink" /></button>
        <span className="text-ink font-semibold text-sm">Verify LIABL Pass</span>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
        <div className="w-12 h-12 rounded-2xl bg-brand/10 flex items-center justify-center mb-4">
          <UserCheck size={24} className="text-brand" />
        </div>
        <p className="text-sm text-gray-500 mb-6">Point camera at participant&apos;s LIABL Pass QR code to verify waiver status instantly.</p>
        <button onClick={() => onScreen('pass_recognized')} className="bg-brand text-white px-6 py-2.5 rounded-xl text-sm font-semibold">
          Simulate scan
        </button>
      </div>
    </div>
  )
}

// ── Main component ────────────────────────────────────────────

const FLOW_STEPS = [
  { screen:'home'           as Screen, label:'App home',          icon:Smartphone    },
  { screen:'scan'           as Screen, label:'Scan QR',           icon:QrCode        },
  { screen:'pass_recognized'as Screen, label:'Pass recognized',   icon:UserCheck     },
  { screen:'activity_select'as Screen, label:'Select activity',   icon:ClipboardList },
  { screen:'document'       as Screen, label:'Review waiver',     icon:Shield        },
  { screen:'signature'      as Screen, label:'Sign',              icon:CheckCircle   },
  { screen:'confirm'        as Screen, label:'Confirmed',         icon:CheckCircle   },
  { screen:'manifest'       as Screen, label:'Manifest',          icon:ClipboardList },
]

export default function MobileTab() {
  const [screen,    setScreen]    = useState<Screen>('home')
  const [isOffline, setIsOffline] = useState(false)

  return (
    <div>
      <div className="flex items-start justify-between flex-wrap gap-3 mb-6">
        <div>
          <h1 className="font-serif text-2xl" style={{ letterSpacing:'-0.01em' }}>LIABL mobile app</h1>
          <p className="text-sm text-gray-400 mt-1">iOS &amp; Android · Interactive wireframes</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500">Offline mode:</span>
          <button onClick={() => setIsOffline(!isOffline)}
            className={`w-11 h-6 rounded-full transition-all relative ${isOffline ? 'bg-amber-500' : 'bg-gray-200'}`}>
            <span className="absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-all" style={{ left: isOffline ? '22px' : '2px' }} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">

        {/* Phone wireframe */}
        <div className="flex flex-col items-center">
          <Phone isOffline={isOffline}>
            {screen === 'home'            && <HomeScreen           onScreen={setScreen} isOffline={isOffline} />}
            {screen === 'scan'            && <ScanScreen           onScreen={setScreen} />}
            {screen === 'pass_recognized' && <PassRecognizedScreen onScreen={setScreen} />}
            {(screen === 'activity_select' || screen === 'health' || screen === 'document' || screen === 'signature') && (
              <WaiverFlowScreen screen={screen} onScreen={setScreen} />
            )}
            {screen === 'confirm'         && <ConfirmScreen        onScreen={setScreen} />}
            {screen === 'manifest'        && <ManifestScreen       onScreen={setScreen} />}
            {screen === 'verify'          && <VerifyScreen         onScreen={setScreen} />}
          </Phone>

          {/* Step selector */}
          <div className="flex flex-wrap gap-2 mt-5 justify-center max-w-xs">
            {FLOW_STEPS.map(({ screen: s, label, icon: Icon }) => (
              <button key={s} onClick={() => setScreen(s)}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  screen === s ? 'bg-brand text-white' : 'bg-white border border-black/10 text-gray-500 hover:border-brand/30'
                }`}>
                <Icon size={11} />
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Feature descriptions */}
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-black/10 p-5">
            <h3 className="font-semibold text-ink mb-3 flex items-center gap-2">
              <Smartphone size={16} className="text-brand" /> App overview
            </h3>
            <div className="space-y-3 text-sm">
              {[
                { label:'Participant signing',  desc:'Full 4-step waiver flow mirroring the web experience — activity selection, health disclosure, document review, and e-signature.' },
                { label:'QR / code entry',      desc:'Participants scan a QR code or enter a 6-digit session code. LIABL resolves it to the operator, activity, and template instantly.' },
                { label:'LIABL Pass fast-sign', desc:'Returning participants scan their Pass QR. LIABL recognises them, pre-fills their profile, and they\'re signed in ~15 seconds.' },
                { label:'Staff manifest view',  desc:'Operators see a live session roster with signed/pending status. Tap any participant to view their waiver detail or add a staff note.' },
                { label:'Scan to verify',       desc:'Staff point the camera at a participant\'s Pass QR code. App shows name, photo, waiver status, and any flags — one-tap check-in.' },
              ].map(({ label, desc }) => (
                <div key={label} className="flex gap-3">
                  <span className="text-brand mt-0.5 shrink-0">✓</span>
                  <div><span className="font-medium text-ink">{label} — </span><span className="text-gray-500">{desc}</span></div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
            <h3 className="font-semibold text-ink mb-3 flex items-center gap-2">
              <WifiOff size={16} className="text-amber-600" /> Offline mode
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed mb-3">
              Toggle offline mode above to see how the app behaves when connectivity is lost — critical for river guides, backcountry tours, and remote venues.
            </p>
            <div className="space-y-2 text-sm">
              {[
                'Waiver templates cached locally before the session',
                'Participants complete the full signing flow with no connection',
                'Signatures stored in encrypted local SQLite database',
                'Documents sync automatically when connectivity resumes',
                'Staff manifest shows ⚠ pending sync indicator',
                'Session cannot close until all offline docs are uploaded',
              ].map(f => (
                <div key={f} className="flex gap-2 text-xs text-amber-800">
                  <span className="text-amber-500 shrink-0">✓</span>{f}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-black/10 p-5">
            <h3 className="font-semibold text-ink mb-3 flex items-center gap-2">
              <Smartphone size={16} className="text-gray-500" /> Technical architecture
            </h3>
            <div className="space-y-2 text-xs text-gray-500">
              {[
                { label:'Framework',    value:'React Native — single codebase for iOS & Android' },
                { label:'Local storage',value:'SQLite for offline signature queuing' },
                { label:'Sync',        value:'Background sync with exponential backoff on reconnect' },
                { label:'Auth',        value:'Biometric (Face ID / Touch ID) for returning participants' },
                { label:'Deep links',  value:'liabl://session/ABC123 opens directly to signing flow' },
                { label:'Kiosk mode',  value:'iPad lock-down mode for unmanned check-in tablets' },
              ].map(({ label, value }) => (
                <div key={label} className="flex gap-2">
                  <span className="font-mono text-brand w-24 shrink-0">{label}</span>
                  <span>{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
