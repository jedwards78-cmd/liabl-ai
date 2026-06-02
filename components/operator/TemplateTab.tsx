'use client'
import { useState } from 'react'

interface Question {
  id:      string
  text:    string
  type:    'yes_no' | 'multiple' | 'text'
  options?: string[]
  triggers_clause?: boolean
}

interface Template {
  id:        string
  name:      string
  emoji:     string
  activityKey: string
  questions: Question[]
  published: boolean
}

const DEFAULT_TEMPLATES: Template[] = [
  {
    id: 't1', name: 'Whitewater Kayaking', emoji: '🚣', activityKey: 'kayak', published: true,
    questions: [
      { id: 'q1', text: 'Are you a confident swimmer?', type: 'yes_no', triggers_clause: true },
      { id: 'q2', text: 'Do you have prior kayaking experience?', type: 'multiple', options: ['None', 'Beginner', 'Intermediate', 'Advanced'] },
      { id: 'q3', text: 'Any cardiovascular or respiratory conditions?', type: 'yes_no', triggers_clause: true },
    ],
  },
  {
    id: 't2', name: 'Canyon Hiking', emoji: '🥾', activityKey: 'hike', published: true,
    questions: [
      { id: 'q1', text: 'Any recent lower-body injuries?', type: 'yes_no', triggers_clause: true },
      { id: 'q2', text: 'Comfortable hiking in extreme heat?', type: 'yes_no' },
    ],
  },
  {
    id: 't3', name: 'ATV Tour', emoji: '🏎️', activityKey: 'atv', published: false,
    questions: [
      { id: 'q1', text: 'Do you hold a valid driver\'s license?', type: 'yes_no', triggers_clause: true },
      { id: 'q2', text: 'Any seizure or vision conditions?', type: 'yes_no', triggers_clause: true },
    ],
  },
]

export default function TemplateTab() {
  const [templates,  setTemplates]  = useState<Template[]>(DEFAULT_TEMPLATES)
  const [selected,   setSelected]   = useState<string | null>('t1')
  const [newQText,   setNewQText]   = useState('')
  const [newQType,   setNewQType]   = useState<Question['type']>('yes_no')
  const [saved,      setSaved]      = useState(false)

  const current = templates.find(t => t.id === selected)

  function addQuestion() {
    if (!newQText.trim() || !selected) return
    setTemplates(prev => prev.map(t =>
      t.id !== selected ? t : {
        ...t,
        questions: [...t.questions, {
          id: `q${Date.now()}`, text: newQText.trim(),
          type: newQType, triggers_clause: false,
        }]
      }
    ))
    setNewQText('')
  }

  function removeQuestion(qid: string) {
    setTemplates(prev => prev.map(t =>
      t.id !== selected ? t : { ...t, questions: t.questions.filter(q => q.id !== qid) }
    ))
  }

  function toggleClause(qid: string) {
    setTemplates(prev => prev.map(t =>
      t.id !== selected ? t : {
        ...t,
        questions: t.questions.map(q =>
          q.id === qid ? { ...q, triggers_clause: !q.triggers_clause } : q
        )
      }
    ))
  }

  function togglePublished() {
    setTemplates(prev => prev.map(t =>
      t.id !== selected ? t : { ...t, published: !t.published }
    ))
  }

  function saveTemplate() {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-serif text-2xl">Activity templates</h1>
        <p className="text-sm text-gray-400 mt-1">
          Configure the questions and clauses for each activity type.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-6">
        {templates.map(t => (
          <button key={t.id} onClick={() => setSelected(t.id)}
            className={`text-left p-4 rounded-xl border transition-all ${
              selected === t.id ? 'border-brand bg-brand/5' : 'bg-white border-black/10 hover:border-brand/30'
            }`}>
            <div className="text-2xl mb-2">{t.emoji}</div>
            <div className="text-xs font-semibold text-ink leading-snug">{t.name}</div>
            <div className="mt-2">
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                t.published ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
              }`}>
                {t.published ? 'Live' : 'Draft'}
              </span>
            </div>
          </button>
        ))}
      </div>

      {current && (
        <div className="bg-white rounded-2xl border border-black/10 overflow-hidden">
          {/* Template header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-black/8">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{current.emoji}</span>
              <div>
                <div className="font-semibold text-ink">{current.name}</div>
                <div className="text-xs text-gray-400">{current.questions.length} questions · {current.questions.filter(q => q.triggers_clause).length} trigger adaptive clauses</div>
              </div>
            </div>
            <button onClick={togglePublished}
              className={`text-xs font-medium px-3 py-1.5 rounded-full border transition-all ${
                current.published
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                  : 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100'
              }`}>
              {current.published ? '● Live' : '○ Draft'}
            </button>
          </div>

          {/* Questions list */}
          <div className="divide-y divide-black/5">
            {current.questions.map((q, i) => (
              <div key={q.id} className="flex items-start gap-3 px-5 py-4">
                <span className="text-xs text-gray-400 w-5 mt-0.5 shrink-0">{i + 1}</span>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-ink mb-1">{q.text}</div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs bg-surface border border-black/10 px-2 py-0.5 rounded-full text-gray-500">
                      {q.type === 'yes_no' ? 'Yes / No' : q.type === 'multiple' ? 'Multiple choice' : 'Free text'}
                    </span>
                    <button onClick={() => toggleClause(q.id)}
                      className={`text-xs px-2 py-0.5 rounded-full border transition-all ${
                        q.triggers_clause
                          ? 'bg-brand/10 text-brand border-brand/20'
                          : 'bg-surface text-gray-400 border-black/10 hover:border-brand/30'
                      }`}>
                      {q.triggers_clause ? '✦ Triggers clause' : '+ Add clause trigger'}
                    </button>
                  </div>
                </div>
                <button onClick={() => removeQuestion(q.id)}
                  className="text-gray-300 hover:text-red-400 transition-colors text-lg shrink-0">
                  ×
                </button>
              </div>
            ))}
          </div>

          {/* Add question */}
          <div className="px-5 py-4 bg-surface/50 border-t border-black/8">
            <div className="text-xs font-medium text-gray-500 mb-3">Add a question</div>
            <div className="flex gap-2 mb-2">
              <input
                className="form-input flex-1"
                placeholder="e.g. Do you have any heart conditions?"
                value={newQText}
                onChange={e => setNewQText(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && addQuestion()}
              />
              <select
                className="form-input w-36"
                value={newQType}
                onChange={e => setNewQType(e.target.value as Question['type'])}>
                <option value="yes_no">Yes / No</option>
                <option value="multiple">Multiple</option>
                <option value="text">Free text</option>
              </select>
            </div>
            <div className="flex gap-2">
              <button onClick={addQuestion} disabled={!newQText.trim()}
                className="btn-primary py-2 text-sm">
                + Add question
              </button>
              <button onClick={saveTemplate}
                className={`py-2 px-4 rounded-xl text-sm font-medium transition-all ${
                  saved
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    : 'bg-white border border-black/20 text-gray-600 hover:bg-gray-50'
                }`}>
                {saved ? '✓ Saved' : 'Save template'}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="mt-6 bg-brand/5 border border-brand/20 rounded-xl p-4 text-sm text-brand">
        <div className="font-semibold mb-1">How adaptive clauses work</div>
        <div className="text-xs leading-relaxed text-brand/80">
          Questions marked <strong>✦ Triggers clause</strong> automatically insert a tailored legal clause into the participant&apos;s waiver when answered affirmatively. No operator action required — LIABL handles it in real time.
        </div>
      </div>
    </div>
  )
}
