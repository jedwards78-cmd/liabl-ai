'use client'
import { useState } from 'react'

interface WaiverParticipant {
  name: string; email: string; dob: string; activity: string
  signedAt: string; ip: string; device: string; docId: string
  hash: string; isMinor: boolean; isReturning: boolean; visitCount: number
  healthFlag: string | null
  clauses: { title: string; body: string; adaptive: boolean }[]
}
interface StaffNote { id: string; author: string; time: string; content: string }
interface Props { participant: WaiverParticipant; onBack: () => void }

const DEMO_NOTES: StaffNote[] = [
  { id:'n1', author:'J. Torres', time:'9:06 AM', content:'Participant arrived early. Reviewed safety briefing in full. No concerns.' },
]

export default function WaiverDetail({ participant, onBack }: Props) {
  const [notes,         setNotes]         = useState<StaffNote[]>(DEMO_NOTES)
  const [newNote,       setNewNote]        = useState('')
  const [addendumMode,  setAddendumMode]   = useState(false)
  const [addendumText,  setAddendumText]   = useState('')
  const [addendumSent,  setAddendumSent]   = useState(false)
  const [addendumSigned,setAddendumSigned] = useState(false)
  const [emailSent,     setEmailSent]      = useState(false)
  const [section,       setSection]        = useState<'document'|'identity'|'audit'>('document')

  function submitNote() {
    if (!newNote.trim()) return
    setNotes(n => [...n, { id:`n${Date.now()}`, author:'You', time: new Date().toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'}), content:newNote.trim() }])
    setNewNote('')
  }

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <button onClick={onBack} className="text-gray-400 hover:text-ink text-sm">← Roster</button>
        <span className="text-gray-300">/</span>
        <span className="text-sm font-medium text-ink">{participant.name}</span>
        {participant.isReturning && <span className="text-xs bg-brand/10 text-brand border border-brand/20 px-2 py-0.5 rounded-full">✦ LIABL Pass</span>}
      </div>

      <div className="flex gap-1 bg-surface rounded-xl p-1 mb-6 w-fit">
        {(['document','identity','audit'] as const).map(s => (
          <button key={s} onClick={() => setSection(s)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all capitalize ${section===s?'bg-white text-ink shadow-sm':'text-gray-500 hover:text-ink'}`}>
            {s}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          {section === 'document' && (
            <>
              <div className="bg-white rounded-2xl border border-black/10 p-5">
                <div className="flex items-start justify-between gap-3 flex-wrap mb-4">
                  <div>
                    <div className="text-xs font-semibold tracking-widest text-brand uppercase mb-1">Signed waiver</div>
                    <h2 className="font-serif text-xl">{participant.activity} — Liability Waiver</h2>
                    <div className="text-xs text-gray-400 mt-1 font-mono">{participant.docId}</div>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => setEmailSent(true)} className={`text-xs px-3 py-1.5 rounded-lg border transition-all ${emailSent?'bg-emerald-50 text-emerald-700 border-emerald-200':'border-black/20 text-gray-600 hover:bg-surface'}`}>
                      {emailSent?'✓ Sent':'✉ Email copy'}
                    </button>
                    <button className="text-xs px-3 py-1.5 rounded-lg border border-black/20 text-gray-600 hover:bg-surface transition-all">↓ Download PDF</button>
                  </div>
                </div>
                <div className="space-y-3 mb-4">
                  {participant.clauses.map((c,i) => (
                    <div key={i} className={`rounded-xl p-4 text-sm ${c.adaptive?'bg-brand/5 border border-brand/20':'bg-surface border border-black/8'}`}>
                      <div className={`text-xs font-semibold uppercase tracking-wider mb-1.5 ${c.adaptive?'text-brand':'text-gray-400'}`}>{c.adaptive&&'⚡ '}{c.title}</div>
                      <p className="text-gray-600 leading-relaxed text-xs">{c.body}</p>
                    </div>
                  ))}
                </div>
                <div className="pt-4 border-t border-black/8">
                  <div className="text-xs text-gray-400 mb-2">Electronic signature</div>
                  <div className="bg-surface rounded-xl p-4 flex items-center gap-3">
                    <div className="flex-1">
                      <div className="font-serif text-2xl text-brand italic mb-1">{participant.name}</div>
                      <div className="text-xs text-gray-400 font-mono">{participant.signedAt} · {participant.ip} · ESIGN Act compliant</div>
                    </div>
                    <span className="text-emerald-600 text-xs font-medium bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full">✓ Verified</span>
                  </div>
                </div>
              </div>
              {addendumSent && (
                <div className={`bg-white rounded-2xl border overflow-hidden ${addendumSigned?'border-emerald-200':'border-amber-200'}`}>
                  <div className={`px-5 py-3 border-b flex items-center justify-between ${addendumSigned?'bg-emerald-50 border-emerald-200':'bg-amber-50 border-amber-200'}`}>
                    <span className={`text-xs font-semibold ${addendumSigned?'text-emerald-700':'text-amber-700'}`}>{addendumSigned?'✓ Addendum signed':'⟳ Addendum pending signature'}</span>
                    {!addendumSigned && <button onClick={()=>setAddendumSigned(true)} className="text-xs px-3 py-1 rounded-lg bg-amber-500 text-white hover:opacity-90">Simulate participant sign</button>}
                  </div>
                  <div className="p-5"><p className="text-sm text-gray-600 leading-relaxed">{addendumText}</p></div>
                </div>
              )}
            </>
          )}

          {section === 'identity' && (
            <div className="bg-white rounded-2xl border border-black/10 p-5 space-y-4">
              <h2 className="font-serif text-xl mb-2">Participant profile</h2>
              <div className="grid grid-cols-2 gap-3">
                {[{label:'Full name',value:participant.name},{label:'Email',value:participant.email},{label:'Date of birth',value:participant.dob},{label:'LIABL Pass',value:participant.isReturning?`✦ Active — ${participant.visitCount} visits`:'First visit'},{label:'Health flags',value:participant.healthFlag??'None disclosed'},{label:'Minor',value:participant.isMinor?'Yes — guardian signed':'No'}].map(({label,value})=>(
                  <div key={label} className="bg-surface rounded-xl p-3">
                    <div className="text-xs text-gray-400 mb-1">{label}</div>
                    <div className="text-sm font-medium text-ink">{value}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {section === 'audit' && (
            <div className="bg-white rounded-2xl border border-black/10 overflow-hidden">
              <div className="px-5 py-3 border-b border-black/8 font-semibold text-sm">Audit trail</div>
              <div className="divide-y divide-black/5">
                {[{time:'09:04:12.441',event:'waiver.signed',detail:`IP ${participant.ip} · SHA-256: ${participant.hash}`},{time:'09:04:11.028',event:'signature.captured',detail:participant.device},{time:'09:03:58.774',event:'document.viewed',detail:'Participant reviewed all clauses'},{time:'09:03:44.102',event:'waiver.generated',detail:`Activity: ${participant.activity} · Adaptive clauses: ${participant.clauses.filter(c=>c.adaptive).length}`},{time:'09:03:40.021',event:'session.started',detail:'Participant entered flow via operator QR code'}].map((e,i)=>(
                  <div key={i} className="flex items-start gap-3 px-5 py-3 text-xs">
                    <span className="font-mono text-gray-400 shrink-0 w-24">{e.time}</span>
                    <span className="bg-brand/10 text-brand px-2 py-0.5 rounded-full shrink-0">{e.event}</span>
                    <span className="text-gray-500">{e.detail}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-black/10 p-4 space-y-3">
            <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Document info</div>
            {[{label:'Status',value:'✓ Signed',color:'text-emerald-600'},{label:'Signed at',value:participant.signedAt,color:''},{label:'IP address',value:participant.ip,color:''},{label:'Doc ID',value:participant.docId,color:''}].map(({label,value,color})=>(
              <div key={label} className="flex justify-between text-xs">
                <span className="text-gray-400">{label}</span>
                <span className={`font-medium font-mono ${color}`}>{value}</span>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-2xl border border-black/10 overflow-hidden">
            <div className="px-4 py-3 border-b border-black/8 text-xs font-semibold text-gray-400 uppercase tracking-wider">Staff notes</div>
            <div className="divide-y divide-black/5">
              {notes.map(note=>(
                <div key={note.id} className="px-4 py-3">
                  <div className="flex items-center gap-2 mb-1"><span className="text-xs font-medium text-ink">{note.author}</span><span className="text-xs text-gray-400">{note.time}</span></div>
                  <p className="text-xs text-gray-600 leading-relaxed">{note.content}</p>
                </div>
              ))}
            </div>
            <div className="px-4 py-3 border-t border-black/8">
              <textarea className="form-input text-xs resize-none mb-2" rows={2} placeholder="Add a staff note…" value={newNote} onChange={e=>setNewNote(e.target.value)}/>
              <button onClick={submitNote} disabled={!newNote.trim()} className="w-full py-1.5 bg-brand text-white rounded-lg text-xs font-medium hover:opacity-90 disabled:opacity-40">Add note</button>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-black/10 overflow-hidden">
            <div className="px-4 py-3 border-b border-black/8 text-xs font-semibold text-gray-400 uppercase tracking-wider">Addendum</div>
            <div className="p-4">
              {!addendumSent ? (
                <>
                  <p className="text-xs text-gray-500 leading-relaxed mb-3">Compose an addendum clause to append to this waiver.</p>
                  {addendumMode ? (
                    <>
                      <textarea className="form-input text-xs resize-none mb-2" rows={4} placeholder="e.g. Participant acknowledges elevated water levels today…" value={addendumText} onChange={e=>setAddendumText(e.target.value)}/>
                      <div className="flex gap-2">
                        <button onClick={()=>setAddendumMode(false)} className="btn-secondary text-xs py-1.5 px-3">Cancel</button>
                        <button onClick={()=>{if(addendumText.trim()){setAddendumSent(true);setAddendumMode(false)}}} disabled={!addendumText.trim()} className="flex-1 py-1.5 bg-brand text-white rounded-lg text-xs font-medium hover:opacity-90 disabled:opacity-40">Send to participant</button>
                      </div>
                    </>
                  ) : (
                    <button onClick={()=>setAddendumMode(true)} className="w-full py-2 border border-dashed border-brand/40 text-brand text-xs rounded-xl hover:bg-brand/5">+ Create addendum</button>
                  )}
                </>
              ) : (
                <div className={`text-xs rounded-xl p-3 ${addendumSigned?'bg-emerald-50 text-emerald-700':'bg-amber-50 text-amber-700'}`}>
                  {addendumSigned?'✓ Addendum signed and appended':'⟳ Awaiting participant signature'}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
