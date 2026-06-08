'use client'
import { useState } from 'react'
import { ParticipantAnswers, ACTIVITY_LABELS } from '@/lib/document-engine'
import EmailPreview from './EmailPreview'

interface Props { answers:ParticipantAnswers; onRestart:()=>void }

export default function StepConfirm({ answers, onRestart }: Props) {
  const [showEmail,setShowEmail]=useState(false)
  const time=new Date().toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'})
  const firstName=answers.fullName?.split(' ')[0]??'there'

  return (
    <>
      <div className="card text-center">
        <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-4 text-3xl">✅</div>
        <h2 className="font-serif text-2xl mb-2" style={{letterSpacing:'-0.01em'}}>You&apos;re all set, {firstName}.</h2>
        <p className="text-gray-500 text-sm mb-2">Your signed waiver has been recorded and emailed to <span className="text-ink font-medium">{answers.email}</span>.</p>
        <button onClick={()=>setShowEmail(true)} className="text-xs text-brand underline mb-5 hover:opacity-70 transition-opacity">Preview confirmation email →</button>
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {[`Signed at ${time}`,ACTIVITY_LABELS[answers.activityKey]??'Activity','ESIGN compliant','LIABL Pass ✦'].map(tag=>(
            <span key={tag} className="bg-surface border border-black/10 text-xs px-3 py-1.5 rounded-full text-gray-500">{tag}</span>
          ))}
        </div>
        <button onClick={onRestart} className="btn-primary max-w-xs mx-auto">↺ Demo again</button>
      </div>
      {showEmail&&<EmailPreview answers={answers} onDismiss={()=>setShowEmail(false)}/>}
    </>
  )
}
