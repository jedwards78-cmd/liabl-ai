'use client'
import { useState } from 'react'

type NotifType = 'waiver_signed' | 'exception_flagged' | 'legal_hold' | 'carrier_notified' | 'group_complete' | 'overage_warning' | 'pass_recognized'

interface Notification {
  id:       string
  type:     NotifType
  title:    string
  body:     string
  time:     string
  read:     boolean
  priority: 'high' | 'normal' | 'low'
  link?:    string
  linkLabel?:string
}

const INITIAL_NOTIFS: Notification[] = [
  { id:'n1',  type:'exception_flagged', priority:'high',   read:false, time:'2 min ago',  title:'Exception requires attention',         body:'Mia Chen — guardian signature still pending. AM-04 Kayaking session starts in 18 minutes.',                                    link:'/groups',     linkLabel:'View exception' },
  { id:'n2',  type:'overage_warning',   priority:'high',   read:false, time:'14 min ago', title:'Approaching monthly signature limit',  body:'You have used 423 of your 500 monthly signatures (85%). Consider upgrading to Connected or purchasing an overage block.',           link:'/pricing',    linkLabel:'View options' },
  { id:'n3',  type:'waiver_signed',     priority:'normal', read:false, time:'22 min ago', title:'New waiver signed',                    body:'Jordan Rivera signed their Whitewater Kayaking waiver. AI Risk Score: Moderate (42). Session AM-04.',                             link:'/operator',   linkLabel:'View roster' },
  { id:'n4',  type:'carrier_notified',  priority:'high',   read:false, time:'1 hr ago',   title:'Carrier notified — incident INC-0041', body:'K&K Insurance has been automatically notified of incident INC-2024-0041. Webhook delivered in 234ms. Claims file opened.',          link:'/operator',   linkLabel:'View incident' },
  { id:'n5',  type:'group_complete',    priority:'normal', read:true,  time:'2 hr ago',   title:'Group fully signed — Rivera Family',   body:'All 8 participants in the Rivera Family & Friends group have completed their waivers. Session is clear to proceed.',               link:'/groups',     linkLabel:'View group' },
  { id:'n6',  type:'legal_hold',        priority:'high',   read:true,  time:'3 hr ago',   title:'Legal hold applied — doc_c3d4e5f6',   body:'Legal hold applied to Jamie Lee\'s ATV Tour waiver following incident INC-2024-0041. Document retention timer suspended.',          link:'/security',   linkLabel:'View document' },
  { id:'n7',  type:'pass_recognized',   priority:'low',    read:true,  time:'Yesterday',  title:'LIABL Pass recognized — 7 visits',     body:'Omar Hassan checked in via LIABL Pass. 7th visit across 3 operators. Pre-signed in 14 seconds.',                                  link:'/operator',   linkLabel:'View roster' },
  { id:'n8',  type:'waiver_signed',     priority:'normal', read:true,  time:'Yesterday',  title:'New waiver signed',                    body:'Tyler Brooks signed their ATV Tour waiver. AI Risk Score: Low (18). Session PM-02.',                                               link:'/operator',   linkLabel:'View roster' },
  { id:'n9',  type:'waiver_signed',     priority:'normal', read:true,  time:'Yesterday',  title:'New waiver signed',                    body:'Priya Nair signed their ATV Tour waiver. AI Risk Score: Low (22). Session PM-02.',                                                link:'/operator',   linkLabel:'View roster' },
  { id:'n10', type:'group_complete',    priority:'normal', read:true,  time:'2 days ago', title:'Group fully signed — Desert Wellness', body:'All 6 participants in the Desert Wellness Retreat group completed waivers ahead of the session. 100% pre-arrival completion.',     link:'/groups',     linkLabel:'View group' },
]

import { IconSigned, IconException, IconLegalHold, IconNetwork, IconVerified, IconAnalytics, IconLIABLPass, IconAlert, IconTemplate } from '@/components/icons'

const TYPE_CONFIG: Record<NotifType, { Icon:React.ComponentType<{size?:number;color?:string}>; color:string; bg:string; label:string; iconColor:string }> = {
  waiver_signed:    { Icon:IconSigned,    color:'text-emerald-700', bg:'bg-emerald-50',  label:'Waiver signed',    iconColor:'#15803D' },
  exception_flagged:{ Icon:IconException, color:'text-amber-700',   bg:'bg-amber-50',    label:'Exception',        iconColor:'#D97706' },
  legal_hold:       { Icon:IconLegalHold, color:'text-red-700',     bg:'bg-red-50',      label:'Legal hold',       iconColor:'#DC2626' },
  carrier_notified: { Icon:IconNetwork,   color:'text-blue-700',    bg:'bg-blue-50',     label:'Carrier notified', iconColor:'#2563EB' },
  group_complete:   { Icon:IconVerified,  color:'text-emerald-700', bg:'bg-emerald-50',  label:'Group complete',   iconColor:'#15803D' },
  overage_warning:  { Icon:IconAnalytics, color:'text-orange-700',  bg:'bg-orange-50',   label:'Usage alert',      iconColor:'#EA580C' },
  pass_recognized:  { Icon:IconLIABLPass, color:'text-brand',       bg:'bg-brand/10',    label:'LIABL Pass',       iconColor:'#4B2ACF' },
}

type Filter = 'all' | 'unread' | 'high'

export default function NotificationTab() {
  const [notifs,    setNotifs]    = useState<Notification[]>(INITIAL_NOTIFS)
  const [filter,    setFilter]    = useState<Filter>('all')
  const [dismissed, setDismissed] = useState(false)

  const unreadCount = notifs.filter(n => !n.read).length
  const highCount   = notifs.filter(n => n.priority === 'high' && !n.read).length

  function markRead(id: string) {
    setNotifs(prev => prev.map(n => n.id === id ? { ...n, read:true } : n))
  }
  function markAllRead() {
    setNotifs(prev => prev.map(n => ({ ...n, read:true })))
    setDismissed(true)
    setTimeout(() => setDismissed(false), 3000)
  }

  const visible = notifs.filter(n =>
    filter === 'unread' ? !n.read :
    filter === 'high'   ? n.priority === 'high' :
    true
  )

  return (
    <div>
      {/* Header */}
      <div className="flex items-start justify-between flex-wrap gap-3 mb-6">
        <div>
          <h1 className="font-serif text-2xl" style={{ letterSpacing:'-0.01em' }}>Notifications</h1>
          <p className="text-sm text-gray-400 mt-1">
            Desert Ridge Adventures ·{' '}
            {unreadCount > 0
              ? <span className="text-brand font-medium">{unreadCount} unread</span>
              : 'All caught up'}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <button onClick={markAllRead}
              className={`text-sm px-4 py-2 rounded-xl border transition-all ${
                dismissed
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                  : 'bg-white border-black/20 text-gray-600 hover:bg-surface'
              }`}>
              {dismissed ? '✓ All marked read' : 'Mark all as read'}
            </button>
          )}
        </div>
      </div>

      {/* Priority alert banner */}
      {highCount > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-5 flex items-start gap-3">
          <IconAlert size={20} color="#DC2626" className="shrink-0 mt-0.5"/>
          <div className="flex-1">
            <div className="font-semibold text-red-700 text-sm mb-1">
              {highCount} high-priority alert{highCount > 1 ? 's' : ''} require your attention
            </div>
            <div className="text-xs text-red-600 leading-relaxed">
              {notifs.filter(n => n.priority === 'high' && !n.read).map(n => n.title).join(' · ')}
            </div>
          </div>
          <button onClick={() => setFilter('high')}
            className="text-xs text-red-700 underline shrink-0 hover:opacity-70">
            View all
          </button>
        </div>
      )}

      {/* Filter tabs */}
      <div className="flex gap-1 bg-surface rounded-xl p-1 mb-5 w-fit">
        {([
          { key:'all',    label:`All (${notifs.length})`                   },
          { key:'unread', label:`Unread (${unreadCount})`                  },
          { key:'high',   label:`High priority (${notifs.filter(n=>n.priority==='high').length})` },
        ] as { key:Filter; label:string }[]).map(({ key, label }) => (
          <button key={key} onClick={() => setFilter(key)}
            className={`px-4 py-2 rounded-lg text-xs font-medium transition-all ${
              filter === key ? 'bg-white text-ink shadow-sm' : 'text-gray-500 hover:text-ink'
            }`}>
            {label}
          </button>
        ))}
      </div>

      {/* Notification list */}
      {visible.length === 0 ? (
        <div className="bg-white rounded-2xl border border-black/10 p-12 text-center">
          <div className="flex justify-center mb-3"><IconVerified size={40} color="#15803D"/></div>
          <div className="font-semibold text-ink mb-1">All caught up</div>
          <div className="text-sm text-gray-400">No {filter !== 'all' ? filter + ' ' : ''}notifications to show.</div>
        </div>
      ) : (
        <div className="space-y-2">
          {visible.map(n => {
            const cfg = TYPE_CONFIG[n.type]
            return (
              <div key={n.id}
                onClick={() => markRead(n.id)}
                className={`bg-white rounded-2xl border p-4 cursor-pointer transition-all hover:shadow-sm ${
                  n.read ? 'border-black/10' : 'border-brand/30 shadow-sm'
                }`}>
                <div className="flex items-start gap-3">
                  {/* Icon */}
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${cfg.bg}`}>
                    <cfg.Icon size={18} color={cfg.iconColor}/>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-0.5">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`font-semibold text-sm ${n.read ? 'text-ink' : 'text-ink'}`}>
                          {n.title}
                        </span>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${cfg.bg} ${cfg.color}`}>
                          {cfg.label}
                        </span>
                        {n.priority === 'high' && !n.read && (
                          <span className="text-xs bg-red-50 text-red-600 border border-red-200 px-2 py-0.5 rounded-full font-medium">
                            High priority
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-xs text-gray-400">{n.time}</span>
                        {!n.read && (
                          <div className="w-2 h-2 rounded-full bg-brand shrink-0" />
                        )}
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 leading-relaxed mb-2">{n.body}</p>
                    {n.link && (
                      <a href={n.link}
                        onClick={e => e.stopPropagation()}
                        className="text-xs text-brand underline hover:opacity-70 transition-opacity">
                        {n.linkLabel} →
                      </a>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Notification settings callout */}
      <div className="mt-6 bg-surface border border-black/10 rounded-xl p-4 flex items-start gap-3">
        <IconTemplate size={20} color="#6B7280"/>
        <div className="flex-1">
          <div className="text-sm font-medium text-ink mb-1">Notification preferences</div>
          <div className="text-xs text-gray-500 leading-relaxed">
            Configure which events trigger notifications, delivery method (in-app, email, SMS),
            and escalation rules for unresolved high-priority alerts.
          </div>
        </div>
        <button className="text-xs text-brand underline shrink-0 hover:opacity-70">Configure</button>
      </div>
    </div>
  )
}
