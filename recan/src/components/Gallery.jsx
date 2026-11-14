import { useRef, useState } from 'react'
import { Scene } from './Visuals'

// Galéria: 1. samostatný výrez plechovky, 2. vizuál s ovocím a pozadím.
export default function Gallery({ product }) {
  const [index, setIndex] = useState(0)
  const start = useRef(null)
  const count = 2
  const go = (i) => setIndex((i + count) % count)

  const onPointerDown = (e) => {
    start.current = { x: e.clientX, y: e.clientY }
  }
  const onPointerUp = (e) => {
    if (!start.current) return
    const dx = e.clientX - start.current.x
    const dy = e.clientY - start.current.y
    start.current = null
    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) go(index + (dx < 0 ? 1 : -1))
  }

  const labels = [`Plechovka ${product.name}`, `${product.name} s ovocím`]

  return (
    <div className="gallery" style={{ '--c': product.color, '--soft': product.soft }}>
      <div
        className="gallery-stage"
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerCancel={() => (start.current = null)}
        onKeyDown={(e) => {
          if (e.key === 'ArrowRight') go(index + 1)
          if (e.key === 'ArrowLeft') go(index - 1)
        }}
        tabIndex={0}
        role="group"
        aria-roledescription="galéria"
        aria-label={`Galéria produktu ${product.name}, obrázok ${index + 1} z ${count}`}
        data-index={index}
      >
        {index === 0 ? (
          <div className="gallery-slide gallery-can">
            <img src={product.img} alt={`Plechovka RE:CAN ${product.name} – ${product.flavor}`} draggable="false" />
          </div>
        ) : (
          <div className="gallery-slide">
            <Scene slug={product.slug} alt={`RE:CAN ${product.name} s ovocím: ${product.flavor}`} />
          </div>
        )}
        <button type="button" className="gallery-arrow prev" onClick={() => go(index - 1)} aria-label="Predchádzajúci obrázok">
          ←
        </button>
        <button type="button" className="gallery-arrow next" onClick={() => go(index + 1)} aria-label="Nasledujúci obrázok">
          →
        </button>
        <span className="gallery-counter" aria-hidden="true">
          {index + 1} / {count}
        </span>
      </div>
      <div className="gallery-thumbs">
        {labels.map((label, i) => (
          <button
            key={label}
            type="button"
            className={i === index ? 'is-active' : ''}
            onClick={() => setIndex(i)}
            aria-label={`Zobraziť obrázok ${i + 1}: ${label}`}
            aria-pressed={i === index}
          >
            {i === 0 ? <img src={product.img} alt="" /> : <Scene slug={product.slug} />}
          </button>
        ))}
      </div>
    </div>
  )
}
