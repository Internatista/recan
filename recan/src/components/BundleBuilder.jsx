import { useState } from 'react'
import { products, bySlug, BUNDLE_SIZE, BUNDLE_ORIGINAL, BUNDLE_PRICE, BUNDLE_DISCOUNT_PCT } from '../data'
import { addBundle, money } from '../store'
import { addedToast } from './ui'

export default function BundleBuilder() {
  const [picked, setPicked] = useState([])
  const full = picked.length === BUNDLE_SIZE
  const toggle = (slug) =>
    setPicked((cur) => (cur.includes(slug) ? cur.filter((s) => s !== slug) : cur.length < BUNDLE_SIZE ? [...cur, slug] : cur))

  const add = () => {
    if (!full) return
    addBundle(picked)
    addedToast(`Three-pack added to cart with ${BUNDLE_DISCOUNT_PCT}% off.`)
    setPicked([])
  }

  return (
    <div className="bundle">
      <div className="bundle-options" role="group" aria-label="Choose flavours for the three-pack">
        {products.map((p) => {
          const on = picked.includes(p.slug)
          const blocked = !on && full
          return (
            <button
              key={p.slug}
              type="button"
              className={`bundle-option ${on ? 'is-on' : ''}`}
              style={{ '--c': p.color, '--soft': p.soft }}
              aria-pressed={on}
              disabled={blocked}
              onClick={() => toggle(p.slug)}
            >
              <img src={p.img} alt="" />
              <b>{p.name}</b>
              <small>{p.flavor}</small>
              <span className="bundle-check">{on ? '✓ Selected' : blocked ? 'Pack is full' : '+ Add'}</span>
            </button>
          )
        })}
      </div>

      <div className="bundle-summary" aria-live="polite">
        <p className="bundle-count">
          <b>
            {picked.length} / {BUNDLE_SIZE}
          </b>{' '}
          selected
        </p>
        <ul className="bundle-slots">
          {Array.from({ length: BUNDLE_SIZE }, (_, i) => {
            const p = bySlug(picked[i])
            return (
              <li key={i} className={p ? 'filled' : ''} style={p ? { '--c': p.color } : undefined}>
                {p ? (
                  <>
                    <span>{p.name}</span>
                    <button type="button" onClick={() => toggle(p.slug)} aria-label={`Remove ${p.name} from the pack`}>
                      ×
                    </button>
                  </>
                ) : (
                  <span>Empty slot</span>
                )}
              </li>
            )
          })}
        </ul>
        <div className="bundle-price">
          <span>
            Was <s>{money(BUNDLE_ORIGINAL)}</s>
          </span>
          <strong>{money(BUNDLE_PRICE)}</strong>
          <em>{BUNDLE_DISCOUNT_PCT}% off</em>
        </div>
        <button type="button" className="btn btn-block" disabled={!full} onClick={add}>
          {full ? 'Add three-pack to cart' : `Choose ${BUNDLE_SIZE - picked.length} more`}
        </button>
        {picked.length > 0 && (
          <button type="button" className="text-link" onClick={() => setPicked([])}>
            Clear selection
          </button>
        )}
      </div>
    </div>
  )
}
