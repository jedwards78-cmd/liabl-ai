interface Props {
  size?: 'sm' | 'md' | 'lg'
  dark?: boolean
}

const sizes = {
  sm: { box: 20, rx: 2, bar: { x:3.5, y:3.5, w:2.5, h:10 }, shelf: { x:3.5, y:10, w:8, h:2.5 }, dot: { cx:14, cy:7, r:2 }, text: 16, gap: 6 },
  md: { box: 28, rx: 3, bar: { x:5, y:5, w:3.5, h:14 },    shelf: { x:5, y:14, w:11, h:3.5 },   dot: { cx:20, cy:9, r:2.5 }, text: 22, gap: 8 },
  lg: { box: 40, rx: 4, bar: { x:7, y:7, w:5, h:20 },      shelf: { x:7, y:20, w:16, h:5 },     dot: { cx:29, cy:13, r:3.5 }, text: 32, gap: 10 },
}

export default function Logo({ size = 'md', dark = false }: Props) {
  const s = sizes[size]
  const wordColor = dark ? '#FFFFFF' : '#0D0E12'
  const tagColor  = dark ? '#8B8BA0' : '#9CA3AF'

  return (
    <div className="flex items-center" style={{ gap: s.gap }}>
      {/* Geometric mark */}
      <svg width={s.box} height={s.box} viewBox={`0 0 ${s.box} ${s.box}`} fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width={s.box} height={s.box} rx={s.rx} fill="#4B2ACF" />
        <rect x={s.bar.x} y={s.bar.y} width={s.bar.w} height={s.bar.h} fill="white" />
        <rect x={s.shelf.x} y={s.shelf.y} width={s.shelf.w} height={s.shelf.h} fill="white" />
        <circle cx={s.dot.cx} cy={s.dot.cy} r={s.dot.r} fill="white" />
      </svg>

      {/* Wordmark */}
      <div>
        <div
          style={{
            fontFamily: 'Syne, sans-serif',
            fontWeight: 500,
            fontSize: s.text,
            letterSpacing: '0.04em',
            color: wordColor,
            lineHeight: 1,
          }}
        >
          LIABL
        </div>
        {size === 'lg' && (
          <div style={{
            fontFamily: 'DM Sans, sans-serif',
            fontWeight: 300,
            fontSize: 10,
            letterSpacing: '0.18em',
            color: tagColor,
            marginTop: 3,
          }}>
            Think faster. Decide better.
          </div>
        )}
      </div>
    </div>
  )
}
