'use client'
import { useState } from 'react'
import { ACTIVITY_LABELS, ParticipantAnswers } from '@/lib/document-engine'

interface Props { answers: Partial<ParticipantAnswers>; onDismiss: () => void }

export default function EmailPreview({ answers, onDismiss }: Props) {
  const [tab, setTab] = useState<'participant'|'operator'>('participant')
  const name      = answers.fullName ?? 'Participant'
  const firstName = name.split(' ')[0]
  const activity  = answers.activityKey ? ACTIVITY_LABELS[answers.activityKey] : 'Activity'
  const time      = new Date().toLocaleTimeString([], { hour:'2-digit', minute:'2-digit' })
  const date      = new Date().toLocaleDateString('en-US', { month:'long', day:'numeric', year:'numeric' })
  const docId     = `doc_${Math.random().toString(36).slice(2,10)}`

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onDismiss}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden" onClick={e=>e.stopPropagation()}>
        <div className="bg-surface border-b border-black/10 px-4 py-3 flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-400"/><div className="w-3 h-3 rounded-full bg-amber-400"/><div className="w-3 h-3 rounded-full bg-emerald-400"/>
          </div>
          <div className="flex gap-1 flex-1 bg-white rounded-lg p-1">
            {(['participant','operator'] as const).map(t=>(
              <button key={t} onClick={()=>setTab(t)} className={`flex-1 py-1 rounded-md text-xs font-medium transition-all capitalize ${tab===t?'bg-surface text-ink shadow-sm':'text-gray-400'}`}>
                {t==='participant'?'✉ To participant':'📊 To operator'}
              </button>
            ))}
          </div>
          <button onClick={onDismiss} className="text-gray-400 hover:text-ink text-lg">×</button>
        </div>

        <div className="overflow-y-auto max-h-[70vh] p-6">
          <div className="border-b border-black/8 pb-4 mb-4 text-xs text-gray-400 space-y-1">
            <div><span className="font-medium text-gray-600">From:</span> noreply@liabl.com</div>
            <div><span className="font-medium text-gray-600">To:</span> {tab==='participant'?answers.email??'participant@email.com':'ops@desertridgeadventures.com'}</div>
            <div><span className="font-medium text-gray-600">Subject:</span> {tab==='participant'?`Your signed waiver — ${activity}`:`New waiver signed — ${name} · ${activity}`}</div>
            <div><span className="font-medium text-gray-600">Date:</span> {date}, {time}</div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 rounded bg-brand flex items-center justify-center"><span className="text-white text-xs font-bold">L</span></div>
              <span className="font-serif font-medium text-sm text-ink">LIABL{tab==='operator'?' · Operator notification':''}</span>
            </div>

            {tab==='participant'?(
              <>
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex gap-3">
                  <span className="text-2xl">✅</span>
                  <div><div className="font-semibold text-emerald-700 text-sm">Waiver signed successfully</div><div className="text-xs text-emerald-600 mt-0.5">{date} at {time}</div></div>
                </div>
                <p className="text-sm text-gray-600">Hi {firstName},</p>
                <p className="text-sm text-gray-600 leading-relaxed">Your liability waiver for <strong>{activity}</strong> at Desert Ridge Adventures has been signed and recorded. A copy is attached.</p>
                <div className="bg-surface rounded-xl border border-black/10 p-4 space-y-2">
                  {[{label:'Participant',value:name},{label:'Activity',value:activity},{label:'Signed',value:`${date}, ${time}`},{label:'Document ID',value:docId}].map(({label,value})=>(
                    <div key={label} className="flex gap-3 text-xs"><span className="text-gray-400 w-24 shrink-0">{label}</span><span className="font-medium text-ink font-mono">{value}</span></div>
                  ))}
                </div>
                <div className="flex items-center gap-3 border border-black/10 rounded-xl p-3 bg-surface">
                  <span className="text-2xl">📄</span>
                  <div className="flex-1"><div className="text-xs font-medium text-ink">signed_waiver_{activity.replace(/\s/g,'_').toLowerCase()}.pdf</div><div className="text-xs text-gray-400">84 KB · PDF</div></div>
                  <span className="text-xs text-brand font-medium cursor-pointer">Download</span>
                </div>
              </>
            ):(
              <>
                <div className="bg-brand/5 border border-brand/20 rounded-xl p-4"><div className="font-semibold text-brand text-sm mb-1">New waiver signed</div><div className="text-xs text-brand/70">{name} has completed their waiver for {activity}.</div></div>
                <div className="bg-surface rounded-xl border border-black/10 p-4 space-y-2">
                  {[{label:'Participant',value:name},{label:'Activity',value:activity},{label:'Session',value:'AM-04 · 9:00 AM'},{label:'Signed at',value:time},{label:'Doc ID',value:docId},{label:'IP address',value:'98.112.44.21'}].map(({label,value})=>(
                    <div key={label} className="flex gap-3 text-xs"><span className="text-gray-400 w-24 shrink-0">{label}</span><span className="font-medium text-ink font-mono">{value}</span></div>
                  ))}
                </div>
                {answers.healthStatus&&answers.healthStatus!=='none'&&<div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-700">⚠ Health disclosure flagged — adaptive clause added. Review waiver detail in your dashboard.</div>}
              </>
            )}

            <div className="pt-3 border-t border-black/8 text-xs text-gray-400 text-center">LIABL · Think faster. Decide better.</div>
          </div>
        </div>
      </div>
    </div>
  )
}
