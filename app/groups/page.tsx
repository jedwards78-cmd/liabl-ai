'use client'
import { useState } from 'react'
import Logo from '@/components/Logo'
import GroupsAllTab      from '@/components/groups/GroupsAllTab'
import GroupRosterTab    from '@/components/groups/GroupRosterTab'
import GroupExceptionsTab from '@/components/groups/GroupExceptionsTab'
import GroupCreateTab    from '@/components/groups/GroupCreateTab'

export type GroupTab = 'all' | 'roster' | 'exceptions' | 'create'

export interface Group {
  id:          string
  name:        string
  activity:    string
  emoji:       string
  date:        string
  total:       number
  signed:      number
  exceptions:  number
  status:      'complete' | 'in_progress' | 'exceptions'
  source:      'manual' | 'fareharbor' | 'rezdy' | 'xola'
  bookingRef?: string
}

export const DEMO_GROUPS: Group[] = [
  { id:'g1', name:'Rivera Family & Friends', activity:'Whitewater Kayaking', emoji:'🚣', date:'Today · 9:00 AM',   total:8,  signed:8,  exceptions:0, status:'complete',    source:'fareharbor', bookingRef:'RKC-4821' },
  { id:'g2', name:'Phoenix Corporate Retreat', activity:'ATV Tour',          emoji:'🏎️',  date:'Today · 11:00 AM', total:14, signed:9,  exceptions:2, status:'exceptions',  source:'rezdy',      bookingRef:'RZ-0042'  },
  { id:'g3', name:'Sycamore Middle School',    activity:'Canyon Hiking',     emoji:'🥾', date:'Today · 2:00 PM',  total:22, signed:18, exceptions:1, status:'in_progress', source:'manual'                           },
  { id:'g4', name:'Desert Wellness Retreat',   activity:'Rock Climbing',     emoji:'🧗', date:'Tomorrow · 8:00 AM',total:6, signed:6,  exceptions:0, status:'complete',    source:'xola',       bookingRef:'XL-8810'  },
  { id:'g5', name:'Tucson Adventure Club',     activity:'Whitewater Kayaking',emoji:'🚣',date:'Jun 5 · 9:00 AM',  total:10, signed:3,  exceptions:0, status:'in_progress', source:'manual'                           },
]

export default function GroupsPage() {
  const [tab,          setTab]          = useState<GroupTab>('all')
  const [selectedGroup,setSelectedGroup] = useState<Group | null>(null)

  function openRoster(g: Group) { setSelectedGroup(g); setTab('roster') }
  function openExceptions(g: Group) { setSelectedGroup(g); setTab('exceptions') }
  function backToAll() { setTab('all'); setSelectedGroup(null) }

  const tabs: { key: GroupTab; label: string; badge?: number }[] = [
    { key:'all',        label:'All groups' },
    { key:'roster',     label: selectedGroup ? `Roster · ${selectedGroup.name}` : 'Roster' },
    { key:'exceptions', label:'Exceptions', badge: DEMO_GROUPS.reduce((s,g) => s + g.exceptions, 0) },
    { key:'create',     label:'+ Create group' },
  ]

  return (
    <div className="min-h-screen bg-surface">
      <nav className="bg-white border-b border-black/10 px-5 py-3 flex items-center justify-between">
        <Logo size="md" />
        <span className="text-xs bg-surface border border-black/10 px-3 py-1.5 rounded-full text-gray-500">
          Group reservations · Desert Ridge Adventures
        </span>
      </nav>

      {/* Tab bar */}
      <div className="bg-white border-b border-black/10 px-5 overflow-x-auto">
        <div className="flex gap-0 max-w-4xl mx-auto min-w-max">
          {tabs.map(({ key, label, badge }) => (
            <button key={key} onClick={() => setTab(key)}
              className={`px-4 py-3 text-sm font-medium border-b-2 transition-all whitespace-nowrap flex items-center gap-2 ${
                tab === key ? 'border-brand text-brand' : 'border-transparent text-gray-500 hover:text-ink'
              }`}>
              {label}
              {badge != null && badge > 0 && (
                <span className="bg-amber-100 text-amber-700 text-xs px-1.5 py-0.5 rounded-full font-semibold">{badge}</span>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {tab === 'all'        && <GroupsAllTab      groups={DEMO_GROUPS} onOpenRoster={openRoster} onOpenExceptions={openExceptions} />}
        {tab === 'roster'     && <GroupRosterTab    group={selectedGroup} onBack={backToAll} />}
        {tab === 'exceptions' && <GroupExceptionsTab groups={DEMO_GROUPS} selectedGroup={selectedGroup} onOpenRoster={openRoster} onBack={backToAll} />}
        {tab === 'create'     && <GroupCreateTab    onCreated={() => setTab('all')} />}
      </div>
    </div>
  )
}
