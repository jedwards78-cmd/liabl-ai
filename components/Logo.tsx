interface Props {
  size?: 'sm' | 'md' | 'lg'
  dark?: boolean
  operatorName?: string
  operatorAccent?: string
}
const sizes = {
  sm: { box:24, rx:4, bar:{x:4,y:4,w:3,h:12},   shelf:{x:4,y:12,w:9,h:3},    dot:{cx:17,cy:8,r:2.5},  word:18, tag:11, gap:7  },
  md: { box:32, rx:5, bar:{x:5,y:5,w:4,h:16},    shelf:{x:5,y:16,w:12,h:4},   dot:{cx:23,cy:10,r:3},   word:24, tag:11, gap:9  },
  lg: { box:52, rx:8, bar:{x:8,y:8,w:6.5,h:26},  shelf:{x:8,y:26,w:19,h:6.5}, dot:{cx:38,cy:16,r:5},   word:40, tag:12, gap:14 },
}
export default function Logo({ size='md', dark=false, operatorName, operatorAccent }: Props) {
  const s         = sizes[size]
  const markColor = operatorAccent ?? '#4B2ACF'
  const wordColor = dark ? '#FFFFFF' : '#0D0E12'
  const tagColor  = dark ? 'rgba(255,255,255,0.5)' : 'rgba(13,14,18,0.4)'
  return (
    <div style={{ display:'flex', alignItems:'center', gap:s.gap }}>
      <svg width={s.box} height={s.box} viewBox={`0 0 ${s.box} ${s.box}`} fill="none">
        <rect width={s.box} height={s.box} rx={s.rx} fill={markColor}/>
        <rect x={s.bar.x} y={s.bar.y} width={s.bar.w} height={s.bar.h} fill="white"/>
        <rect x={s.shelf.x} y={s.shelf.y} width={s.shelf.w} height={s.shelf.h} fill="white"/>
        <circle cx={s.dot.cx} cy={s.dot.cy} r={s.dot.r} fill="white"/>
      </svg>
      <div>
        <div style={{ fontFamily:'Syne, sans-serif', fontWeight:600, fontSize:s.word, letterSpacing:'0.02em', color:wordColor, lineHeight:1 }}>LIABL</div>
        {size === 'lg' && !operatorName && (
          <div style={{ fontFamily:'DM Sans, sans-serif', fontWeight:500, fontSize:s.tag, letterSpacing:'0.12em', color:tagColor, marginTop:5 }}>Think faster. Decide better.</div>
        )}
        {operatorName && (
          <div style={{ fontFamily:'DM Sans, sans-serif', fontWeight:500, fontSize:s.tag, letterSpacing:'0.04em', color:tagColor, marginTop:2 }}>{operatorName}</div>
        )}
      </div>
    </div>
  )
}
