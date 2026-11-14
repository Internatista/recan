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
    addedToast(`Trojbalíček je v košíku so zľavou ${BUNDLE_DISCOUNT_PCT} %.`)
    setPicked([])
  }

  return (
    <div className="bundle">
      <div className="bundle-options" role="group" aria-label="Výber príchutí do trojbalíčka">
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
              <span className="bundle-check">{on ? '✓ Vybrané' : blocked ? 'Balíček je plný' : '+ Pridať'}</span>
            </button>
          )
        })}
      </div>

      <div className="bundle-summary" aria-live="polite">
        <p className="bundle-count">
          <b>
            {picked.length} / {BUNDLE_SIZE}
          </b>{' '}
          vybrané
        </p>
        <ul className="bundle-slots">
          {Array.from({ length: BUNDLE_SIZE }, (_, i) => {
            const p = bySlug(picked[i])
            return (
              <li key={i} className={p ? 'filled' : ''} style={p ? { '--c': p.color } : undefined}>
                {p ? (
                  <>
                    <span>{p.name}</span>
                    <button type="button" onClick={() => toggle(p.slug)} aria-label={`Odobrať ${p.name} z balíčka`}>
                      ×
                    </button>
                  </>
                ) : (
                  <span>Voľné miesto</span>
                )}
              </li>
            )
          })}
        </ul>
        <div className="bundle-price">
          <span>
            Pôvodne <s>{money(BUNDLE_ORIGINAL)}</s>
          </span>
          <strong>{money(BUNDLE_PRICE)}</strong>
          <em>Zľava −{BUNDLE_DISCOUNT_PCT} %</em>
        </div>
        <button type="button" className="btn btn-block" disabled={!full} onClick={add}>
          {full ? 'Pridať trojbalíček do košíka' : `Vyber ešte ${BUNDLE_SIZE - picked.length}`}
        </button>
        {picked.length > 0 && (
          <button type="button" className="text-link" onClick={() => setPicked([])}>
            Zrušiť výber
          </button>
        )}
      </div>
    </div>
  )
}
