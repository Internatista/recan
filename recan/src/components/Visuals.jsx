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
  grapefruit: slice('#f07a3c', '#f2546a', '#ffe7dc'),
  bloodorange: slice('#e5672b', '#9e1f3a', '#ffd9c8'),
  coconut: (
    <>
      <path d="M6 54a44 44 0 0 0 88 0z" fill="#6b4226" />
      <path d="M13 54a37 37 0 0 0 74 0z" fill="#fffaf0" />
      <ellipse cx="50" cy="54" rx="44" ry="9" fill="#6b4226" />
      <ellipse cx="50" cy="54" rx="37" ry="6" fill="#f3ece0" />
    </>
  ),
  mint: (
    <>
      <path d="M50 92C18 72 14 36 50 8c36 28 32 64 0 84z" fill="#3fa45a" />
      <path d="M50 88V16M50 40l-16-10M50 40l16-10M50 60l-18-10M50 60l18-10" stroke="#2a7a40" strokeWidth="3" fill="none" />
    </>
  ),
  peach: (
    <>
      <circle cx="50" cy="56" r="40" fill="#f6a35c" />
      <circle cx="38" cy="50" r="26" fill="#f0603f" opacity=".55" />
      <path d="M50 18c-2 12 0 30 4 52" stroke="#d9773c" strokeWidth="3" fill="none" />
      <path d="M54 16c8-12 26-14 34-6-10 10-24 12-34 6z" fill="#3c9a3f" />
    </>
  ),
  apricot: (
    <>
      <circle cx="50" cy="50" r="44" fill="#f7a640" />
      <circle cx="50" cy="50" r="36" fill="#ffc45e" />
      <ellipse cx="50" cy="50" rx="13" ry="17" fill="#8a4b28" />
    </>
  ),
  grape: (
    <>
        <circle cx="30" cy="28" r="12" fill="#6b3fa0" stroke="#4e2b7a" strokeWidth="2" />
        <circle cx="52" cy="26" r="12" fill="#6b3fa0" stroke="#4e2b7a" strokeWidth="2" />
        <circle cx="72" cy="30" r="12" fill="#6b3fa0" stroke="#4e2b7a" strokeWidth="2" />
        <circle cx="40" cy="46" r="12" fill="#6b3fa0" stroke="#4e2b7a" strokeWidth="2" />
        <circle cx="62" cy="46" r="12" fill="#6b3fa0" stroke="#4e2b7a" strokeWidth="2" />
        <circle cx="50" cy="64" r="12" fill="#6b3fa0" stroke="#4e2b7a" strokeWidth="2" />
        <circle cx="36" cy="62" r="12" fill="#6b3fa0" stroke="#4e2b7a" strokeWidth="2" />
        <circle cx="64" cy="62" r="12" fill="#6b3fa0" stroke="#4e2b7a" strokeWidth="2" />
        <circle cx="50" cy="82" r="12" fill="#6b3fa0" stroke="#4e2b7a" strokeWidth="2" />
        <circle cx="26" cy="23" r="3" fill="#c6a8f0" opacity=".6" />
        <circle cx="48" cy="21" r="3" fill="#c6a8f0" opacity=".6" />
        <circle cx="68" cy="25" r="3" fill="#c6a8f0" opacity=".6" />
        <circle cx="36" cy="41" r="3" fill="#c6a8f0" opacity=".6" />
        <circle cx="58" cy="41" r="3" fill="#c6a8f0" opacity=".6" />
        <circle cx="46" cy="59" r="3" fill="#c6a8f0" opacity=".6" />
        <circle cx="32" cy="57" r="3" fill="#c6a8f0" opacity=".6" />
        <circle cx="60" cy="57" r="3" fill="#c6a8f0" opacity=".6" />
        <circle cx="46" cy="77" r="3" fill="#c6a8f0" opacity=".6" />
      <path d="M52 16c0-8 4-12 10-14" stroke="#5a3b1c" strokeWidth="4" fill="none" />
    </>
  ),
  blackberry: (
    <>
        <circle cx="38" cy="36" r="11" fill="#2a1f3d" stroke="#140f22" strokeWidth="2" />
        <circle cx="56" cy="32" r="11" fill="#2a1f3d" stroke="#140f22" strokeWidth="2" />
        <circle cx="70" cy="46" r="11" fill="#2a1f3d" stroke="#140f22" strokeWidth="2" />
        <circle cx="30" cy="54" r="11" fill="#2a1f3d" stroke="#140f22" strokeWidth="2" />
        <circle cx="48" cy="52" r="11" fill="#2a1f3d" stroke="#140f22" strokeWidth="2" />
        <circle cx="64" cy="64" r="11" fill="#2a1f3d" stroke="#140f22" strokeWidth="2" />
        <circle cx="40" cy="70" r="11" fill="#2a1f3d" stroke="#140f22" strokeWidth="2" />
        <circle cx="54" cy="82" r="11" fill="#2a1f3d" stroke="#140f22" strokeWidth="2" />
        <circle cx="34" cy="31" r="2" fill="#8f7fb8" opacity=".6" />
        <circle cx="52" cy="27" r="2" fill="#8f7fb8" opacity=".6" />
        <circle cx="66" cy="41" r="2" fill="#8f7fb8" opacity=".6" />
        <circle cx="26" cy="49" r="2" fill="#8f7fb8" opacity=".6" />
        <circle cx="44" cy="47" r="2" fill="#8f7fb8" opacity=".6" />
        <circle cx="60" cy="59" r="2" fill="#8f7fb8" opacity=".6" />
        <circle cx="36" cy="65" r="2" fill="#8f7fb8" opacity=".6" />
        <circle cx="50" cy="77" r="2" fill="#8f7fb8" opacity=".6" />
      <path d="M38 16c6-8 20-8 26 0-8 6-18 6-26 0z" fill="#3c9a3f" />
    </>
  ),
  cherry: (
    <>
      <path d="M30 66C34 40 48 22 66 10M68 62C66 40 64 26 66 10" stroke="#5a3b1c" strokeWidth="3.5" fill="none" />
      <circle cx="30" cy="70" r="20" fill="#c11b3a" />
      <circle cx="68" cy="66" r="20" fill="#a8122f" />
      <circle cx="23" cy="63" r="5" fill="#ff8a9a" opacity=".6" />
      <circle cx="61" cy="59" r="5" fill="#ff8a9a" opacity=".6" />
    </>
  ),
  pomegranate: (
    <>
      <circle cx="50" cy="54" r="42" fill="#b3203c" />
      <circle cx="50" cy="54" r="34" fill="#f6d8c8" />
        <circle cx="38" cy="42" r="7" fill="#d32f4f" stroke="#a31a37" strokeWidth="2" />
        <circle cx="52" cy="38" r="7" fill="#d32f4f" stroke="#a31a37" strokeWidth="2" />
        <circle cx="64" cy="46" r="7" fill="#d32f4f" stroke="#a31a37" strokeWidth="2" />
        <circle cx="34" cy="58" r="7" fill="#d32f4f" stroke="#a31a37" strokeWidth="2" />
        <circle cx="48" cy="54" r="7" fill="#d32f4f" stroke="#a31a37" strokeWidth="2" />
        <circle cx="62" cy="60" r="7" fill="#d32f4f" stroke="#a31a37" strokeWidth="2" />
        <circle cx="44" cy="70" r="7" fill="#d32f4f" stroke="#a31a37" strokeWidth="2" />
        <circle cx="58" cy="72" r="7" fill="#d32f4f" stroke="#a31a37" strokeWidth="2" />
        <circle cx="34" cy="37" r="2" fill="#ffc0cc" opacity=".6" />
        <circle cx="48" cy="33" r="2" fill="#ffc0cc" opacity=".6" />
        <circle cx="60" cy="41" r="2" fill="#ffc0cc" opacity=".6" />
        <circle cx="30" cy="53" r="2" fill="#ffc0cc" opacity=".6" />
        <circle cx="44" cy="49" r="2" fill="#ffc0cc" opacity=".6" />
        <circle cx="58" cy="55" r="2" fill="#ffc0cc" opacity=".6" />
        <circle cx="40" cy="65" r="2" fill="#ffc0cc" opacity=".6" />
        <circle cx="54" cy="67" r="2" fill="#ffc0cc" opacity=".6" />
      <path d="M40 14l4 8 6-10 6 10 4-8" fill="#b3203c" />
    </>
  ),
  apple: (
    <>
      <path d="M50 26c-26-14-46 6-42 32 4 26 22 40 42 34 20 6 38-8 42-34 4-26-16-46-42-32z" fill="#8fcf4a" />
      <path d="M22 44c4-10 12-14 18-14" stroke="#c9ef9a" strokeWidth="5" fill="none" strokeLinecap="round" />
      <path d="M50 26c0-8 2-14 6-18" stroke="#5a3b1c" strokeWidth="4" fill="none" />
      <path d="M56 14c8-8 22-8 26 0-8 6-18 6-26 0z" fill="#3c9a3f" />
    </>
  ),
  kiwi: (
    <>
      <circle cx="50" cy="50" r="46" fill="#8a6a3b" />
      <circle cx="50" cy="50" r="40" fill="#7cc142" />
      <circle cx="50" cy="50" r="14" fill="#f3f7d7" />
      {Array.from({ length: 14 }, (_, i) => (
        <ellipse key={i} cx="50" cy="28" rx="2" ry="3.5" fill="#1f1a10" transform={`rotate(${i * (360 / 14)} 50 50)`} />
      ))}
    </>
  ),
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

// Court arc with net – a motif taken from the labels.
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

// Flavour visual: colour field, fruit, court arc and (optionally) the can.
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

// Article cover: a preset (flavour / all) or a custom uploaded image (data URL).
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
