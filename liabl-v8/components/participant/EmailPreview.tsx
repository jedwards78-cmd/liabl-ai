'use client'
import { useState } from 'react'
import { ACTIVITY_LABELS, ActivityKey, ParticipantAnswers } from '@/lib/document-engine'

interface Props {
  answers:  Partial<ParticipantAnswers>
  onDismiss: () => void
}

export default function EmailPreview({ answers, onDismiss }: Props) {
  const [tab, setTab] = useState<'participant'|'operator'>('participant')
  const name     = answers.fullName ?? 'Participant'
  const firstName = name.split(' ')[0]
  const activity = answers.activityKey ? ACTIVITY_LABELS[answers.activityKey] : 'Activity'
  const time     = new Date().toLocaleTimeString([], { hour:'2-digit', minute:'2-digit' })
  const date     = new Date().toLocaleDateString('en-US', { month:'long', day:'numeric', year:'numeric' })
  const docId    = `doc_${Math.random().toString(36).slice(2,10)}`

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onDismiss}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden" onClick={e => e.stopPropagation()}>

        {/* Email client chrome */}
        <div className="bg-surface border-b border-black/10 px-4 py-3 flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-400" />
            <div className="w-3 h-3 rounded-full bg-amber-400" />
            <div className="w-3 h-3 rounded-full bg-emerald-400" />
          </div>
          <div className="flex gap-1 flex-1 bg-white rounded-lg p-1">
            {(['participant','operator'] as const).map(t => (
              <button key={t} onClick={() => setTab(t)}
                className={`flex-1 py-1 rounded-md text-xs font-medium transition-all capitalize ${
                  tab === t ? 'bg-surface text-ink shadow-sm' : 'text-gray-400'
                }`}>
                {t === 'participant' ? '✉ To participant' : '📊 To operator'}
              </button>
            ))}
          </div>
          <button onClick={onDismiss} className="text-gray-400 hover:text-ink text-lg">×</button>
        </div>

        {/* Email content */}
        <div className="overflow-y-auto max-h-[70vh]">
          {tab === 'participant' ? (
            <div className="p-6">
              {/* Email header */}
              <div className="border-b border-black/8 pb-4 mb-4 text-xs text-gray-400 space-y-1">
                <div><span className="font-medium text-gray-600">From:</span> noreply@liabl.com</div>
                <div><span className="font-medium text-gray-600">To:</span> {answers.email ?? 'participant@email.com'}</div>
                <div><span className="font-medium text-gray-600">Subject:</span> Your signed waiver — {activity} · Desert Ridge Adventures</div>
                <div><span className="font-medium text-gray-600">Date:</span> {date}, {time}</div>
              </div>

              {/* Email body */}
              <div className="space-y-4">
                {/* Logo */}
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 rounded bg-brand flex items-center justify-center">
                    <span className="text-white text-xs font-bold">L</span>
                  </div>
                  <span className="font-serif font-medium text-sm text-ink">LIABL</span>
                </div>

                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex gap-3">
                  <span className="text-2xl">✅</span>
                  <div>
                    <div className="font-semibold text-emerald-700 text-sm">Waiver signed successfully</div>
                    <div className="text-xs text-emerald-600 mt-0.5">{date} at {time}</div>
                  </div>
                </div>

                <p className="text-sm text-gray-600">Hi {firstName},</p>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Your liability waiver for <strong>{activity}</strong> at Desert Ridge Adventures has been successfully signed and recorded. A copy of your signed document is attached to this email for your records.
                </p>

                <div className="bg-surface rounded-xl border border-black/10 p-4 space-y-2">
                  {[
                    { label:'Participant',  value: name },
                    { label:'Activity',     value: activity },
                    { label:'Operator',     value: 'Desert Ridge Adventures' },
                    { label:'Signed at',    value: `${date}, ${time}` },
                    { label:'Document ID',  value: docId },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex gap-3 text-xs">
                      <span className="text-gray-400 w-24 shrink-0">{label}</span>
                      <span className="font-medium text-ink font-mono">{value}</span>
                    </div>
                  ))}
                </div>

                {answers.isMinor && (
                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-700">
                    This waiver includes a guardian authorization clause co-signed on behalf of the minor participant.
                  </div>
                )}

                {/* Attachment */}
                <div className="flex items-center gap-3 border border-black/10 rounded-xl p-3 bg-surface">
                  <span className="text-2xl">📄</span>
                  <div className="flex-1">
                    <div className="text-xs font-medium text-ink">signed_waiver_{activity.replace(/\s/g,'_').toLowerCase()}.pdf</div>
                    <div className="text-xs text-gray-400">84 KB · PDF</div>
                  </div>
                  <span className="text-xs text-brand font-medium cursor-pointer">Download</span>
                </div>

                <p className="text-xs text-gray-400 leading-relaxed">
                  This waiver is legally valid under the ESIGN Act (15 U.S.C. § 7001) and UETA. Your document has been secured with a SHA-256 cryptographic hash and cannot be altered.
                </p>

                <div className="pt-3 border-t border-black/8 text-xs text-gray-400 text-center">
                  LIABL · Think faster. Decide better. · <span className="underline cursor-pointer">Unsubscribe</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-6">
              <div className="border-b border-black/8 pb-4 mb-4 text-xs text-gray-400 space-y-1">
                <div><span className="font-medium text-gray-600">From:</span> noreply@liabl.com</div>
                <div><span className="font-medium text-gray-600">To:</span> ops@desertridgeadventures.com</div>
                <div><span className="font-medium text-gray-600">Subject:</span> New waiver signed — {name} · {activity}</div>
                <div><span className="font-medium text-gray-600">Date:</span> {date}, {time}</div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 rounded bg-brand flex items-center justify-center">
                    <span className="text-white text-xs font-bold">L</span>
                  </div>
                  <span className="font-serif font-medium text-sm text-ink">LIABL · Operator notification</span>
                </div>

                <div className="bg-brand/5 border border-brand/20 rounded-xl p-4">
                  <div className="font-semibold text-brand text-sm mb-1">New waiver signed</div>
                  <div className="text-xs text-brand/70">{name} has completed their waiver for today&apos;s {activity} session.</div>
                </div>

                <div className="bg-surface rounded-xl border border-black/10 p-4 space-y-2">
                  {[
                    { label:'Participant', value: name },
                    { label:'Activity',   value: activity },
                    { label:'Session',    value: 'AM-04 · 9:00 AM' },
                    { label:'Signed at',  value: `${time}` },
                    { label:'Doc ID',     value: docId },
                    { label:'IP address', value: '98.112.44.21' },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex gap-3 text-xs">
                      <span className="text-gray-400 w-24 shrink-0">{label}</span>
                      <span className="font-medium text-ink font-mono">{value}</span>
                    </div>
                  ))}
                </div>

                {answers.healthStatus && answers.healthStatus !== 'none' && (
                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-700">
                    ⚠ Health disclosure flagged — adaptive clause added. Review waiver detail in your dashboard.
                  </div>
                )}

                <div className="text-center">
                  <button className="text-xs px-4 py-2 bg-brand text-white rounded-xl font-medium">
                    View in operator dashboard →
                  </button>
                </div>

                <div className="pt-3 border-t border-black/8 text-xs text-gray-400 text-center">
                  Desert Ridge Adventures · Powered by LIABL
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
