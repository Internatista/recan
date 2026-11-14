import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { products, bySlug, nutrition, VOLUME, ALLERGENS, STORAGE, pickupPoint, PRICE, COLLECTION, BUNDLE_DISCOUNT_PCT } from '../data'
import { addSingle, money } from '../store'
import { ProductGrid, PageHead, QtyStepper, Steps, refillSteps, addedToast, NotFound } from '../components/ui'
import Gallery from '../components/Gallery'
import BundleBuilder from '../components/BundleBuilder'

export function Shop() {
  return (
    <>
      <PageHead eyebrow={COLLECTION} title="Obchod">
        Štyri ovocné príchute s elektrolytmi. Každá za {money(PRICE)}, osobný odber zdarma.
      </PageHead>
      <div className="wrap section-tight">
        <ProductGrid />
        <div className="promo">
          <div>
            <h2>Nevieš si vybrať?</h2>
            <p>Namiešaj si trojbalíček z troch rôznych príchutí so zľavou {BUNDLE_DISCOUNT_PCT} %.</p>
          </div>
          <Link className="btn btn-cream" to="/trojbalicek">
            Namiešať trojbalíček
          </Link>
        </div>
      </div>
    </>
  )
}

export function BundlePage() {
  return (
    <>
      <PageHead eyebrow={`Trojbalíček · −${BUNDLE_DISCOUNT_PCT} %`} title="Namiešaj si trojbalíček">
        Vyber tri rôzne príchute zo štyroch. Zľava {BUNDLE_DISCOUNT_PCT} % platí len na balíček, nie na samostatne pridané kusy.
      </PageHead>
      <div className="wrap section-tight">
        <BundleBuilder />
      </div>
    </>
  )
}

export function Product() {
  const { slug } = useParams()
  const p = bySlug(slug)
  const navigate = useNavigate()
  const [qty, setQty] = useState(1)

  useEffect(() => {
    setQty(1)
    if (p) document.title = `${p.name} – RE:CAN`
    return () => {
      document.title = 'RE:CAN – Good drink. Second life.'
    }
  }, [slug, p])

  if (!p) return <NotFound title="Tento produkt nemáme" text="V ponuke sú štyri príchute. Nájdeš ich v obchode." />

  const add = () => {
    addSingle(p.slug, qty)
    addedToast(`${qty}× ${p.name} je v košíku.`)
  }
  const others = products.filter((x) => x.slug !== p.slug)

  return (
    <div className="product-page" style={{ '--c': p.color, '--soft': p.soft }}>
      <div className="wrap">
        <nav className="crumbs" aria-label="Omrvinková navigácia">
          <Link to="/shop">Obchod</Link> <span aria-hidden="true">/</span> <span aria-current="page">{p.name}</span>
        </nav>
        <div className="product-layout">
          <Gallery key={p.slug} product={p} />

          <div className="product-info">
            <p className="eyebrow">{COLLECTION}</p>
            <h1>{p.name}</h1>
            <p className="product-flavor">{p.flavor}</p>
            <p className="product-price">
              {money(PRICE)} <small>/ kus · {VOLUME}</small>
            </p>
            <p>{p.description}</p>
            <p className="muted">{p.moment}</p>

            <div className="switcher" role="group" aria-label="Prepnúť príchuť">
              <span className="switcher-label">Príchuť</span>
              <div>
                {products.map((x) => (
                  <Link
                    key={x.slug}
                    to={`/products/${x.slug}`}
                    className={x.slug === p.slug ? 'is-active' : ''}
                    aria-current={x.slug === p.slug ? 'true' : undefined}
                    style={{ '--c': x.color }}
                  >
                    <i aria-hidden="true" />
                    {x.name}
                  </Link>
                ))}
              </div>
            </div>

            <div className="buy-row">
              <QtyStepper value={qty} onChange={setQty} label={`Množstvo: ${p.name}`} />
              <button type="button" className="btn" onClick={add}>
                Pridať do košíka · {money(PRICE * qty)}
              </button>
            </div>
            <button
              type="button"
              className="btn btn-ghost btn-block"
              onClick={() => {
                addSingle(p.slug, qty)
                navigate('/checkout')
              }}
            >
              Pridať a pokračovať k objednávke
            </button>
            <p className="note">
              Osobný odber zdarma. Dátum si zvolíš v objednávke a platíš až pri prevzatí.
            </p>
          </div>
        </div>

        <div className="product-details">
          <section aria-labelledby="pd-info">
            <h2 id="pd-info">O produkte</h2>
            <p>
              {p.name} patrí do kolekcie {COLLECTION}. {p.character}: {p.flavor.toLowerCase()}. Nesýtený ovocný nápoj s
              elektrolytmi v plechovke s objemom {VOLUME}.
            </p>
            <p>Najlepšie chutí vychladený. {STORAGE}</p>
          </section>

          <section aria-labelledby="pd-zlozenie">
            <h2 id="pd-zlozenie">Zloženie a výživové údaje</h2>
            <p className="ingredients">
              <b>Zloženie:</b> {p.ingredients}
            </p>
            <table className="facts">
              <caption className="sr-only">Výživové údaje</caption>
              <thead>
                <tr>
                  <th scope="col">Výživové údaje</th>
                  <th scope="col">100 ml</th>
                  <th scope="col">{VOLUME}</th>
                </tr>
              </thead>
              <tbody>
                {nutrition.map((n) => (
                  <tr key={n.label}>
                    <th scope="row">{n.label}</th>
                    <td>{n.per100}</td>
                    <td>{n.perCan}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="ingredients">
              <b>Alergény:</b> {ALLERGENS}
            </p>
          </section>

          <section aria-labelledby="pd-odber">
            <h2 id="pd-odber">Odber a refill</h2>
            <p>
              <b>Osobný odber</b> je zdarma. V objednávke si zvolíš dátum a nákup si prevezmeš na výdajnom mieste{' '}
              {pickupPoint.name} ({pickupPoint.hours}). {pickupPoint.payment}.
            </p>
            <p>
              <b>Refill</b> v troch krokoch:
            </p>
            <Steps items={refillSteps} />
            <p>
              <Link className="text-link" to="/refill">
                Viac o refille →
              </Link>
            </p>
          </section>
        </div>

        <section className="section-tight" aria-labelledby="pd-dalsie">
          <h2 id="pd-dalsie">Ďalšie príchute</h2>
          <ProductGrid list={others} />
        </section>
      </div>
    </div>
  )
}
