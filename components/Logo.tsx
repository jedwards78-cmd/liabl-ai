interface Props {
  size?: 'sm' | 'md' | 'lg'
  dark?: boolean
}

const sizes = {
  sm: { box: 24, rx: 3, bar: { x:4, y:4, w:3, h:12 }, shelf: { x:4, y:12, w:9, h:3 }, dot: { cx:17, cy:8, r:2.5 }, wordSize: 18, gap: 7 },
  md: { box: 32, rx: 3, bar: { x:5, y:5, w:4, h:16 }, shelf: { x:5, y:16, w:12, h:4 }, dot: { cx:23, cy:10, r:3 }, wordSize: 24, gap: 9 },
  lg: { box: 52, rx: 5, bar: { x:8, y:8, w:6, h:26 }, shelf: { x:8, y:26, w:19, h:6 }, dot: { cx:38, cy:16, r:5 }, wordSize: 40, gap: 14 },
}

export default function Logo({ size = 'md', dark = false }: Props) {
  const s = sizes[size]
  const wordColor = dark ? '#FFFFFF' : '#0D0E12'
  const tagColor  = dark ? '#FFFFFF' : '#1A1A2E'

  return (
    <div className="flex items-center" style={{ gap: s.gap }}>
      <svg width={s.box} height={s.box} viewBox={`0 0 ${s.box} ${s.box}`} fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width={s.box} height={s.box} rx={s.rx} fill="#4B2ACF" />
        <rect x={s.bar.x} y={s.bar.y} width={s.bar.w} height={s.bar.h} fill="white" />
        <rect x={s.shelf.x} y={s.shelf.y} width={s.shelf.w} height={s.shelf.h} fill="white" />
        <circle cx={s.dot.cx} cy={s.dot.cy} r={s.dot.r} fill="white" />
      </svg>
      <div>
        <div style={{
          fontFamily: 'Syne, sans-serif', fontWeight: 600,
          fontSize: s.wordSize, letterSpacing: '0.04em',
          color: wordColor, lineHeight: 1,
        }}>
          LIABL
        </div>
        {size === 'lg' && (
          <div style={{
            fontFamily: 'DM Sans, sans-serif', fontWeight: 500,
            fontSize: 13, letterSpacing: '0.14em',
            color: tagColor, marginTop: 5, opacity: 0.85,
          }}>
            Think faster. Decide better.
          </div>
        )}
      </div>
    </div>
  )
}
