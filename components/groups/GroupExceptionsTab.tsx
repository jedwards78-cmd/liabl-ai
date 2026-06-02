'use client'
import { Group } from '@/app/groups/page'

interface Props {
  groups:         Group[]
  selectedGroup:  Group | null
  onOpenRoster:   (g: Group) => void
  onBack:         () => void
}

const EXCEPTIONS = [
  { groupId:'g2', type:'blocker', participant:'Jamie Lee',   issue:'Supervisor override required — activity starts in 45 min', action:'Review' },
  { groupId:'g2', type:'blocker', participant:'Drew Patel',  issue:'Waiver submitted but signature field blank — needs re-sign', action:'Resend' },
  { groupId:'g3', type:'warning', participant:'Student D',   issue:'Minor participant — guardian signature not yet received', action:'Resend invite' },
  { groupId:'g2', type:'warning', participant:'Group level', issue:'5 of 14 participants unsigned with 90 min until activity', action:'Send reminder' },
]

export default function GroupExceptionsTab({ groups, selectedGroup, onOpenRoster, onBack }: Props) {
  const filtered = selectedGroup
    ? EXCEPTIONS.filter(e => e.groupId === selectedGroup.id)
    : EXCEPTIONS

  const blockers = filtered.filter(e => e.type === 'blocker')
  const warnings = filtered.filter(e => e.type === 'warning')

  const getGroup = (id: string) => groups.find(g => g.id === id)

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-serif text-2xl">Exceptions</h1>
          <p className="text-sm text-gray-400 mt-1">
            {selectedGroup ? selectedGroup.name : 'All groups'} · Items requiring action
          </p>
        </div>
        {selectedGroup && (
          <button onClick={onBack} className="text-sm text-brand underline">← All groups</button>
        )}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16">
          <div className="text-4xl mb-3">✅</div>
          <div className="font-medium text-gray-500">No exceptions</div>
          <div className="text-sm text-gray-400 mt-1">All participants are on track</div>
        </div>
      )}

      {blockers.length > 0 && (
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-semibold tracking-widest uppercase text-red-600">🚫 Blockers — action required before activity</span>
          </div>
          <div className="space-y-3">
            {blockers.map((e, i) => {
              const g = getGroup(e.groupId)
              return (
                <div key={i} className="bg-white border border-red-200 rounded-xl p-4">
                  <div className="flex items-start justify-between gap-3 flex-wrap">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-semibold text-ink">{e.participant}</span>
                        {g && <span className="text-xs text-gray-400">· {g.name}</span>}
                      </div>
                      <div className="text-sm text-red-600 leading-relaxed">{e.issue}</div>
                    </div>
                    <div className="flex gap-2 shrink-0">
                      {g && (
                        <button onClick={() => onOpenRoster(g)}
                          className="text-xs px-3 py-1.5 rounded-lg border border-black/20 text-gray-600 hover:bg-surface transition-colors">
                          View roster
                        </button>
                      )}
                      <button className="text-xs px-3 py-1.5 rounded-lg bg-red-600 text-white hover:opacity-90 transition-colors">
                        {e.action}
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {warnings.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-semibold tracking-widest uppercase text-amber-600">⚠ Warnings — monitor or act soon</span>
          </div>
          <div className="space-y-3">
            {warnings.map((e, i) => {
              const g = getGroup(e.groupId)
              return (
                <div key={i} className="bg-white border border-amber-200 rounded-xl p-4">
                  <div className="flex items-start justify-between gap-3 flex-wrap">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-semibold text-ink">{e.participant}</span>
                        {g && <span className="text-xs text-gray-400">· {g.name}</span>}
                      </div>
                      <div className="text-sm text-amber-700 leading-relaxed">{e.issue}</div>
                    </div>
                    <div className="flex gap-2 shrink-0">
                      {g && (
                        <button onClick={() => onOpenRoster(g)}
                          className="text-xs px-3 py-1.5 rounded-lg border border-black/20 text-gray-600 hover:bg-surface transition-colors">
                          View roster
                        </button>
                      )}
                      <button className="text-xs px-3 py-1.5 rounded-lg bg-amber-500 text-white hover:opacity-90 transition-colors">
                        {e.action}
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      <div className="mt-8 bg-surface border border-black/10 rounded-xl p-4 text-xs text-gray-500 leading-relaxed">
        <strong className="text-gray-600">Privacy note:</strong> Medical disclosures and health details within individual waivers never appear at the group level — only actionable status information is surfaced here. Individual waiver content is accessible only within that participant&apos;s own record.
      </div>
    </div>
  )
}
