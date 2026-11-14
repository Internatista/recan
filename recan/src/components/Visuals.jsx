import { products, bySlug } from '../data'

const slice = (rind, flesh, pith = '#fff6e6') => (
  <>
    <circle cx="50" cy="50" r="48" fill={rind} />
    <circle cx="50" cy="50" r="42" fill={pith} />
    <circle cx="50" cy="50" r="38" fill={flesh} />
    {[0, 45, 90, 135].map((a) => (
      <line key={a} x1="12" y1="50" x2="88" y2="50" stroke={pith} strokeWidth="3.5" transform={`rotate(${a} 50 50)`} />
    ))}
    <circle cx="50" cy="50" r="5" fill={pith} />
  </>
)

const shapes = {
  orange: slice('#f07c12', '#ffa630'),
  lemon: slice('#f5c518', '#ffe45c'),
  lime: slice('#4f9d2d', '#b5e06a'),
  pineapple: slice('#c98a1b', '#ffdf5a', '#fff3b8'),
  passion: (
    <>
      <circle cx="50" cy="50" r="48" fill="#6b2a5b" />
      <circle cx="50" cy="50" r="39" fill="#f6e3a1" />
      <circle cx="50" cy="50" r="31" fill="#f5b21a" />
      {[0, 60, 120, 180, 240, 300].map((a) => (
        <ellipse key={a} cx="50" cy="32" rx="4" ry="6.5" fill="#3a1830" transform={`rotate(${a} 50 50)`} />
      ))}
    </>
  ),
  watermelon: (
    <>
      <path d="M4 34a46 46 0 0 0 92 0z" fill="#2f8f3a" />
      <path d="M10 34a40 40 0 0 0 80 0z" fill="#e9f5c9" />
      <path d="M15 34a35 35 0 0 0 70 0z" fill="#f0434f" />
      {[
        [32, 44],
        [50, 52],
        [68, 44],
        [42, 60],
        [59, 61],
      ].map(([x, y]) => (
        <ellipse key={x + y} cx={x} cy={y} rx="2.6" ry="4" fill="#2a1414" />
      ))}
    </>
  ),
  mango: (
    <>
      <ellipse cx="50" cy="54" rx="34" ry="42" fill="#f6a81c" transform="rotate(28 50 54)" />
      <ellipse cx="42" cy="46" rx="20" ry="27" fill="#f0503c" opacity=".75" transform="rotate(28 42 46)" />
      <path d="M66 14c10-8 22-6 28 0-9 8-20 9-28 0z" fill="#3c9a3f" />
    </>
  ),
  blueberry: (
    <>
      <circle cx="50" cy="52" r="44" fill="#2c3690" />
      <circle cx="38" cy="40" r="14" fill="#5360d6" opacity=".6" />
      <path d="M50 24l7 10 12-2-7 10 7 10-12-2-7 10-7-10-12 2 7-10-7-10 12 2z" fill="#151c4a" transform="translate(0 -6) scale(.6) translate(33 12)" />
    </>
  ),
  raspberry: (
    <>
      {[
        [34, 34],
        [56, 30],
        [72, 46],
        [26, 54],
        [48, 50],
        [66, 66],
        [40, 72],
        [54, 84],
      ].map(([x, y]) => (
        <circle key={x + y} cx={x} cy={y} r="14.5" fill="#e8344e" stroke="#c22240" strokeWidth="2" />
      ))}
      <path d="M38 16c6-8 20-8 26 0-8 6-18 6-26 0z" fill="#3c9a3f" />
    </>
  ),
  currant: (
    <>
      <circle cx="34" cy="62" r="26" fill="#231a3d" />
      <circle cx="68" cy="56" r="24" fill="#2d2150" />
      <circle cx="52" cy="30" r="22" fill="#1b1430" />
      <circle cx="27" cy="54" r="6" fill="#6f62a8" opacity=".7" />
      <circle cx="62" cy="48" r="5.5" fill="#6f62a8" opacity=".7" />
      <circle cx="47" cy="23" r="5" fill="#6f62a8" opacity=".7" />
    </>
  ),
}

export function Fruit({ kind, style, className = '' }) {
  return (
    <svg className={`fruit ${className}`} style={style} viewBox="0 0 100 100" aria-hidden="true" focusable="false">
      {shapes[kind]}
    </svg>
  )
}

// Oblúk ihriska so sieťou – motív prevzatý z etikiet.
export function NetArc({ className = '' }) {
  return (
    <svg className={`net-arc ${className}`} viewBox="0 0 100 40" preserveAspectRatio="none" aria-hidden="true" focusable="false">
      <path d="M0 16Q50-8 100 16V40H0z" fill="var(--arc, currentColor)" />
      <g fill="none" stroke="var(--arc-line, #fff)" strokeOpacity=".55" vectorEffect="non-scaling-stroke">
        <path d="M0 16Q50-8 100 16" strokeWidth="2" strokeOpacity=".9" vectorEffect="non-scaling-stroke" />
        <path d="M0 24Q50 2 100 24M0 32Q50 12 100 32" strokeWidth="1" vectorEffect="non-scaling-stroke" />
        {[10, 22, 34, 46, 54, 66, 78, 90].map((x) => (
          <path key={x} d={`M${x} 0L${50 + (x - 50) * 1.5} 40`} strokeWidth="1" vectorEffect="non-scaling-stroke" />
        ))}
      </g>
    </svg>
  )
}

const slots = [
  { x: 7, y: 10, w: 20, r: -14 },
  { x: 74, y: 7, w: 17, r: 18 },
  { x: 3, y: 50, w: 15, r: 22 },
  { x: 79, y: 44, w: 19, r: -10 },
  { x: 16, y: 74, w: 13, r: 8 },
  { x: 70, y: 76, w: 14, r: -24 },
]

// Vizuál príchute: farebná plocha, ovocie, oblúk ihriska a (voliteľne) plechovka.
export function Scene({ slug, withCan = true, alt = '', className = '' }) {
  const p = bySlug(slug)
  if (!p) return null
  return (
    <div
      className={`scene ${className}`}
      style={{ '--c': p.color, '--arc': p.alt }}
      role={alt ? 'img' : undefined}
      aria-label={alt || undefined}
    >
      <NetArc />
      {slots.map((s, i) => (
        <Fruit
          key={i}
          kind={p.fruits[i % p.fruits.length]}
          style={{ left: `${s.x}%`, top: `${s.y}%`, width: `${s.w}%`, transform: `rotate(${s.r}deg)` }}
        />
      ))}
      {withCan && <img className="scene-can" src={p.img} alt="" draggable="false" />}
    </div>
  )
}

// Titulný obrázok článku: predvoľba (príchuť / všetky) alebo vlastný nahraný obrázok (data URL).
export function Cover({ cover, alt = '', className = '' }) {
  if (typeof cover === 'string' && cover.startsWith('data:image/')) {
    return <img className={`cover cover-photo ${className}`} src={cover} alt={alt} />
  }
  if (bySlug(cover)) return <Scene slug={cover} alt={alt} className={`cover ${className}`} />
  return (
    <div className={`cover cover-all ${className}`} role={alt ? 'img' : undefined} aria-label={alt || undefined}>
      <NetArc />
      {products.map((p) => (
        <img key={p.slug} src={p.img} alt="" draggable="false" />
      ))}
    </div>
  )
}
