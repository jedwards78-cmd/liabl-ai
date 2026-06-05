'use client'
import { useState } from 'react'

function BarChart({ data, color = '#4B2ACF' }: { data: { label: string; value: number; sub?: string }[]; color?: string }) {
  const max = Math.max(...data.map(d => d.value))
  return (
    <div className="flex items-end gap-2 h-32">
      {data.map((d, i) => (
        <div key={i} className="flex-1 flex flex-col items-center gap-1">
          <span className="text-xs font-medium text-ink">{d.value}</span>
          <div className="w-full rounded-t-lg transition-all duration-500"
            style={{ height:`${(d.value/max)*80}px`, background:color, opacity:0.85+(i/data.length)*0.15 }} />
          <span className="text-xs text-gray-400 text-center leading-tight">{d.label}</span>
        </div>
      ))}
    </div>
  )
}

function LineChart({ data, color = '#4B2ACF' }: { data: { label: string; value: number }[]; color?: string }) {
  const max = Math.max(...data.map(d => d.value))
  const w   = 100 / (data.length - 1)
  const pts = data.map((d,i) => `${i*w},${100-(d.value/max)*85}`).join(' ')
  const area= `0,100 ${pts} 100,100`
  return (
    <div>
      <svg viewBox="0 0 100 100" className="w-full h-28" preserveAspectRatio="none">
        <defs><linearGradient id="lg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.2"/>
          <stop offset="100%" stopColor={color} stopOpacity="0"/>
        </linearGradient></defs>
        <polygon points={area} fill="url(#lg)"/>
        <polyline points={pts} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        {data.map((d,i) => <circle key={i} cx={i*w} cy={100-(d.value/max)*85} r="2.5" fill={color}/>)}
      </svg>
      <div className="flex justify-between text-xs text-gray-400 mt-1">
        {data.filter((_,i) => i % Math.ceil(data.length/5) === 0).map(d => <span key={d.label}>{d.label}</span>)}
      </div>
    </div>
  )
}

function DonutChart({ data }: { data: { label: string; value: number; color: string }[] }) {
  const total = data.reduce((s,d) => s+d.value, 0)
  let offset  = 0
  const r=15.9155, circ=2*Math.PI*r
  return (
    <div className="flex items-center gap-6">
      <svg viewBox="0 0 42 42" className="w-28 h-28 -rotate-90">
        {data.map((d,i) => {
          const pct=d.value/total, dash=pct*circ, gap=circ-dash
          const el=<circle key={i} r={r} cx="21" cy="21" fill="transparent" stroke={d.color} strokeWidth="5"
            strokeDasharray={`${dash} ${gap}`} strokeDashoffset={-offset*circ}/>
          offset+=pct; return el
        })}
      </svg>
      <div className="space-y-1.5 flex-1">
        {data.map(d => (
          <div key={d.label} className="flex items-center gap-2 text-xs">
            <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{background:d.color}}/>
            <span className="flex-1 text-gray-600">{d.label}</span>
            <span className="font-medium text-ink">{d.value}</span>
            <span className="text-gray-400">({Math.round(d.value/total*100)}%)</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function FunnelChart({ steps }: { steps: { label: string; value: number; pct: number }[] }) {
  return (
    <div className="space-y-2">
      {steps.map((s,i) => (
        <div key={i}>
          <div className="flex justify-between text-xs mb-1">
            <span className="text-gray-600">{s.label}</span>
            <span className="font-medium text-ink">{s.value} <span className="text-gray-400">({s.pct}%)</span></span>
          </div>
          <div className="h-6 bg-surface rounded-lg overflow-hidden">
            <div className="h-full rounded-lg transition-all duration-500"
              style={{width:`${s.pct}%`,background:`rgba(75,42,207,${0.3+(s.pct/100)*0.7})`}}/>
          </div>
        </div>
      ))}
    </div>
  )
}

const SIGNING_TREND = [{label:'May 1',value:14},{label:'May 5',value:18},{label:'May 10',value:22},{label:'May 15',value:19},{label:'May 20',value:31},{label:'May 25',value:28},{label:'May 30',value:35},{label:'Jun 3',value:42}]
const ACTIVITY_SPLIT = [{label:'Whitewater Kayaking',value:38,color:'#4B2ACF'},{label:'Canyon Hiking',value:27,color:'#818CF8'},{label:'ATV Tour',value:22,color:'#A78BFA'},{label:'Rock Climbing',value:13,color:'#DDD6FE'}]
const AGE_DIST = [{label:'18–24',value:18},{label:'25–34',value:31},{label:'35–44',value:24},{label:'45–54',value:16},{label:'55+',value:11}]
const EXCEPTION_TREND = [{label:'May 1',value:1},{label:'May 5',value:0},{label:'May 10',value:2},{label:'May 15',value:1},{label:'May 20',value:3},{label:'May 25',value:1},{label:'May 30',value:2},{label:'Jun 3',value:2}]
const FUNNEL_STEPS = [{label:'Waiver link opened',value:312,pct:100},{label:'Identity step completed',value:289,pct:93},{label:'Activity selected',value:281,pct:90},{label:'Health questions answered',value:274,pct:88},{label:'Document reviewed',value:251,pct:81},{label:'Signature submitted',value:238,pct:76}]
const RETURN_DATA = [{label:'1 visit',value:89,sub:'First-time'},{label:'2–3',value:61,sub:'Returning'},{label:'4–6',value:34,sub:'Regular'},{label:'7+',value:19,sub:'Loyal'}]

type Period = 'week'|'month'|'quarter'

export default function AnalyticsTab() {
  const [period,setperiod]=useState<Period>('month')
  const [exported,setExported]=useState(false)

  function doExport(){setExported(true);setTimeout(()=>setExported(false),3000)}

  return (
    <div>
      <div className="flex items-start justify-between flex-wrap gap-3 mb-6">
        <div>
          <h1 className="font-serif text-2xl">Analytics</h1>
          <p className="text-sm text-gray-400 mt-1">Desert Ridge Adventures · Waiver &amp; participant data</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex gap-1 bg-surface rounded-xl p-1">
            {(['week','month','quarter'] as Period[]).map(p=>(
              <button key={p} onClick={()=>setperiod(p)} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all capitalize ${period===p?'bg-white text-ink shadow-sm':'text-gray-500'}`}>{p}</button>
            ))}
          </div>
          <button onClick={doExport} className={`text-sm px-4 py-2 rounded-xl border transition-all flex items-center gap-1.5 ${exported?'bg-emerald-50 text-emerald-700 border-emerald-200':'bg-white border-black/20 text-gray-600 hover:bg-surface'}`}>
            {exported?'✓ Exported':'↓ Export CSV'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {[{label:'Total waivers',value:'238',delta:'+14%'},{label:'Completion rate',value:'76%',delta:'+3%'},{label:'Avg sign time',value:'1m 47s',delta:'-22s'},{label:'Exception rate',value:'4.2%',delta:'-0.8%'}].map(({label,value,delta})=>(
          <div key={label} className="bg-white rounded-xl border border-black/10 p-4">
            <div className="text-2xl font-semibold text-ink mb-1">{value}</div>
            <div className="text-xs text-gray-400 mb-1">{label}</div>
            <div className="text-xs font-medium text-emerald-600">{delta} vs last {period}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div className="bg-white rounded-2xl border border-black/10 p-5">
          <div className="text-sm font-semibold text-ink mb-1">Waivers signed over time</div>
          <div className="text-xs text-gray-400 mb-4">Daily — last 30 days</div>
          <LineChart data={SIGNING_TREND}/>
        </div>
        <div className="bg-white rounded-2xl border border-black/10 p-5">
          <div className="text-sm font-semibold text-ink mb-1">Activity type breakdown</div>
          <div className="text-xs text-gray-400 mb-4">All waivers this {period}</div>
          <DonutChart data={ACTIVITY_SPLIT}/>
        </div>
        <div className="bg-white rounded-2xl border border-black/10 p-5">
          <div className="text-sm font-semibold text-ink mb-1">Participant age distribution</div>
          <div className="text-xs text-gray-400 mb-4">By age group</div>
          <BarChart data={AGE_DIST}/>
        </div>
        <div className="bg-white rounded-2xl border border-black/10 p-5">
          <div className="text-sm font-semibold text-ink mb-1">Visit frequency</div>
          <div className="text-xs text-gray-400 mb-4">Returning vs first-time</div>
          <BarChart data={RETURN_DATA} color="#818CF8"/>
        </div>
        <div className="bg-white rounded-2xl border border-black/10 p-5 sm:col-span-2">
          <div className="text-sm font-semibold text-ink mb-1">Signing completion funnel</div>
          <div className="text-xs text-gray-400 mb-4">Drop-off at each step</div>
          <FunnelChart steps={FUNNEL_STEPS}/>
        </div>
        <div className="bg-white rounded-2xl border border-black/10 p-5 sm:col-span-2">
          <div className="text-sm font-semibold text-ink mb-1">Exception rate over time</div>
          <div className="text-xs text-gray-400 mb-4">Last 30 days</div>
          <LineChart data={EXCEPTION_TREND} color="#F59E0B"/>
        </div>
      </div>

      <div className="bg-surface border border-black/10 rounded-xl p-4">
        <div className="text-sm font-medium text-ink mb-3">Export options</div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {[{label:'Waiver data CSV',icon:'📄'},{label:'Participant list',icon:'👥'},{label:'Analytics report',icon:'📊'},{label:'Exception log',icon:'⚠'}].map(({label,icon})=>(
            <button key={label} onClick={doExport} className="text-left p-3 bg-white rounded-xl border border-black/10 hover:border-brand/30 hover:bg-brand/5 transition-all">
              <div className="text-xl mb-1">{icon}</div>
              <div className="text-xs font-medium text-ink">{label}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
