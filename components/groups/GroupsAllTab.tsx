'use client'
import { useState } from 'react'
import { Group } from '@/lib/groups'

interface Props {
  groups:           Group[]
  onOpenRoster:     (g: Group) => void
  onOpenExceptions: (g: Group) => void
}

const SOURCE_LABELS: Record<string, string> = {
  manual:      'Manual',
  fareharbor:  'FareHarbor',
  rezdy:       'Rezdy',
  xola:        'Xola',
}
const SOURCE_COLORS: Record<string, string> = {
  manual:     'bg-gray-100 text-gray-500',
  fareharbor: 'bg-blue-50 text-blue-600',
  rezdy:      'bg-emerald-50 text-emerald-600',
  xola:       'bg-violet-50 text-violet-600',
}

export default function GroupsAllTab({ groups, onOpenRoster, onOpenExceptions }: Props) {
  const [search, setSearch] = useState('')

  const totalParticipants = groups.reduce((s, g) => s + g.total, 0)
  const totalSigned       = groups.reduce((s, g) => s + g.signed, 0)
  const totalExceptions   = groups.reduce((s, g) => s + g.exceptions, 0)
  const pct               = Math.round(totalSigned / totalParticipants * 100)

  const filtered = groups.filter(g =>
    g.name.toLowerCase().includes(search.toLowerCase()) ||
    g.activity.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="font-serif text-2xl">Group reservations</h1>
          <p className="text-sm text-gray-400 mt-1">Desert Ridge Adventures · Active groups</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-3 mb-6">
        {[
          { label:'Total participants', value: totalParticipants, color:'' },
          { label:'Waivers signed',     value: totalSigned,       color:'text-emerald-600' },
          { label:'Completion rate',    value: `${pct}%`,         color:'text-brand' },
          { label:'Exceptions',         value: totalExceptions,   color: totalExceptions > 0 ? 'text-amber-600' : 'text-emerald-600' },
        ].map(({ label, value, color }) => (
          <div key={label} className="bg-white rounded-xl border border-black/10 p-4">
            <div className={`text-2xl font-semibold ${color}`}>{value}</div>
            <div className="text-xs text-gray-400 uppercase tracking-wider mt-1">{label}</div>
          </div>
        ))}
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">🔍</span>
        <input className="form-input pl-8" placeholder="Search groups or activities…"
          value={search} onChange={e => setSearch(e.target.value)} />
      </div>

      {/* Groups table */}
      <div className="bg-white rounded-2xl border border-black/10 overflow-hidden">
        <div className="grid grid-cols-12 gap-3 px-5 py-2.5 border-b border-black/8 text-xs font-semibold text-gray-400 uppercase tracking-wider">
          <div className="col-span-4">Group</div>
          <div className="col-span-2">Date</div>
          <div className="col-span-3">Progress</div>
          <div className="col-span-1">Source</div>
          <div className="col-span-2">Status</div>
        </div>

        {filtered.map(g => {
          const pct = Math.round(g.signed / g.total * 100)
          return (
            <div key={g.id}
              onClick={() => onOpenRoster(g)}
              className="grid grid-cols-12 gap-3 px-5 py-4 border-b border-black/5 last:border-0 hover:bg-surface/60 cursor-pointer transition-colors items-center">

              {/* Name */}
              <div className="col-span-4">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{g.emoji}</span>
                  <div>
                    <div className="text-sm font-medium text-ink leading-tight">{g.name}</div>
                    <div className="text-xs text-gray-400">{g.activity}</div>
                  </div>
                </div>
              </div>

              {/* Date */}
              <div className="col-span-2 text-xs text-gray-500">{g.date}</div>

              {/* Progress */}
              <div className="col-span-3">
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-1.5 bg-black/8 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${pct === 100 ? 'bg-emerald-500' : 'bg-brand'}`}
                      style={{ width:`${pct}%` }} />
                  </div>
                  <span className="text-xs text-gray-500 shrink-0">{g.signed}/{g.total}</span>
                </div>
              </div>

              {/* Source */}
              <div className="col-span-1">
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${SOURCE_COLORS[g.source]}`}>
                  {SOURCE_LABELS[g.source]}
                </span>
              </div>

              {/* Status */}
              <div className="col-span-2 flex items-center gap-1.5">
                {g.status === 'complete'    && <span className="status-signed">Complete</span>}
                {g.status === 'in_progress' && <span className="status-pending">In progress</span>}
                {g.status === 'exceptions'  && (
                  <button onClick={e => { e.stopPropagation(); onOpenExceptions(g) }}
                    className="text-xs bg-amber-50 text-amber-700 border border-amber-200 px-2 py-0.5 rounded-full font-medium hover:bg-amber-100 transition-colors">
                    ⚠ {g.exceptions} exception{g.exceptions > 1 ? 's' : ''}
                  </button>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
