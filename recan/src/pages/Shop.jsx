import { useEffect, useState } from 'react'
import { useSeo } from '../seo'
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { products, bySlug, CATEGORIES, categoryById, nutrition, VOLUME, ALLERGENS, STORAGE, pickupPoint, PRICE, COLLECTION, BUNDLE_DISCOUNT_PCT } from '../data'
import { addSingle, money } from '../store'
import { ProductGrid, PageHead, QtyStepper, Steps, refillSteps, addedToast, NotFound } from '../components/ui'
import Gallery from '../components/Gallery'
import BundleBuilder from '../components/BundleBuilder'

export function Shop() {
  const [params, setParams] = useSearchParams()
  const active = categoryById(params.get('category'))
  const list = active ? products.filter((p) => p.categories.includes(active.id)) : products
  useSeo({
    title: active ? `${active.label} flavours – Shop` : 'Shop – fruit drinks with electrolytes',
    description: active
      ? `${active.label} RE:CAN flavours. ${active.description} ${money(PRICE)} each, free pickup.`
      : `${products.length} RE:CAN flavours, from Citrus Charge to Green Apple Kiwi. Fruit drinks with electrolytes for ${money(PRICE)}, free pickup.`,
  })
  const choose = (id) => setParams(id ? { category: id } : {}, { replace: true })
  return (
    <>
      <PageHead eyebrow={COLLECTION} title="Shop">
        {products.length} fruit flavours with electrolytes. {money(PRICE)} each, free pickup.
      </PageHead>
      <div className="wrap section-tight">
        <div className="category-bar" role="group" aria-label="Filter by category">
          <button type="button" aria-pressed={!active} className={!active ? 'is-active' : ''} onClick={() => choose(null)}>
            All <span>{products.length}</span>
          </button>
          {CATEGORIES.map((c) => {
            const n = products.filter((p) => p.categories.includes(c.id)).length
            const on = active?.id === c.id
            return (
              <button key={c.id} type="button" aria-pressed={on} className={on ? 'is-active' : ''} onClick={() => choose(c.id)}>
                {c.label} <span>{n}</span>
              </button>
            )
          })}
        </div>
        <p className="category-note" aria-live="polite">
          {active ? `${active.description} ${list.length} flavours.` : `All ${products.length} flavours.`}
        </p>
        <ProductGrid list={list} />
        <div className="promo">
          <div>
            <h2>Can't decide?</h2>
            <p>Build a three-pack of three different flavours with {BUNDLE_DISCOUNT_PCT}% off.</p>
          </div>
          <Link className="btn btn-cream" to="/bundle">
            Build a three-pack
          </Link>
        </div>
      </div>
    </>
  )
}

export function BundlePage() {
  useSeo({
    title: 'Three-pack with 10% off',
    description: 'Build a three-pack of three different RE:CAN flavours and save 10%. Free pickup.',
  })
  return (
    <>
      <PageHead eyebrow={`Three-pack · −${BUNDLE_DISCOUNT_PCT}%`} title="Build your three-pack">
        Choose three different flavours from our range. The {BUNDLE_DISCOUNT_PCT}% discount applies to the pack only, not to cans added separately.
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

  useEffect(() => setQty(1), [slug])
  useSeo(
    p
      ? {
          title: `${p.name} – ${p.flavor}`,
          description: `${p.name}: ${p.short} ${VOLUME} can for ${money(PRICE)}, free pickup.`,
          image: p.img,
          jsonLd: {
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: `RE:CAN ${p.name}`,
            description: p.description,
            image: new URL(p.img, window.location.origin).href,
            brand: { '@type': 'Brand', name: 'RE:CAN' },
            category: COLLECTION,
            offers: {
              '@type': 'Offer',
              price: (PRICE / 100).toFixed(2),
              priceCurrency: 'EUR',
              availability: 'https://schema.org/InStock',
              url: window.location.href,
            },
          },
        }
      : { title: 'Product not found', noindex: true },
  )

  if (!p) return <NotFound title="We don't have this product" text={`We offer ${products.length} flavours. You will find them in the shop.`} />

  const add = () => {
    addSingle(p.slug, qty)
    addedToast(`${qty}× ${p.name} added to cart.`)
  }
  const others = products.filter((x) => x.slug !== p.slug)

  return (
    <div className="product-page" style={{ '--c': p.color, '--soft': p.soft }}>
      <div className="wrap">
        <nav className="crumbs" aria-label="Breadcrumb">
          <Link to="/shop">Shop</Link> <span aria-hidden="true">/</span> <span aria-current="page">{p.name}</span>
        </nav>
        <div className="product-layout">
          <Gallery key={p.slug} product={p} />

          <div className="product-info">
            <p className="eyebrow">{COLLECTION}</p>
            <h1>{p.name}</h1>
            <p className="product-flavor">{p.flavor}</p>
            <p className="product-cats">
              {p.categories.map((id) => (
                <Link key={id} to={`/shop?category=${id}`} className="cat-tag">
                  {categoryById(id).label}
                </Link>
              ))}
            </p>
            <p className="product-price">
              {money(PRICE)} <small>/ can · {VOLUME}</small>
            </p>
            <p>{p.description}</p>
            <p className="muted">{p.moment}</p>

            <div className="switcher" role="group" aria-label="Switch flavour">
              <span className="switcher-label">Flavour</span>
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
              <QtyStepper value={qty} onChange={setQty} label={`Quantity: ${p.name}`} />
              <button type="button" className="btn" onClick={add}>
                Add to cart · {money(PRICE * qty)}
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
              Add and go to checkout
            </button>
            <p className="note">
              Free pickup. Choose the date at checkout and pay only on collection.
            </p>
          </div>
        </div>

        <div className="product-details">
          <section aria-labelledby="pd-info">
            <h2 id="pd-info">About the product</h2>
            <p>
              {p.name} is part of the {COLLECTION} collection. {p.character}: {p.flavor.toLowerCase()}. A still fruit drink
              with electrolytes in a {VOLUME} can.
            </p>
            <p>Best served chilled. {STORAGE}</p>
          </section>

          <section aria-labelledby="pd-ingredients">
            <h2 id="pd-ingredients">Ingredients and nutrition</h2>
            <p className="ingredients">
              <b>Ingredients:</b> {p.ingredients}
            </p>
            <table className="facts">
              <caption className="sr-only">Nutrition information</caption>
              <thead>
                <tr>
                  <th scope="col">Nutrition</th>
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
              <b>Allergens:</b> {ALLERGENS}
            </p>
          </section>

          <section aria-labelledby="pd-pickup">
            <h2 id="pd-pickup">Pickup and refill</h2>
            <p>
              <b>Pickup</b> is free. Choose the date at checkout and collect your order at the pickup point{' '}
              {pickupPoint.name} ({pickupPoint.hours}). {pickupPoint.payment}.
            </p>
            <p>
              <b>Refill</b> in three steps:
            </p>
            <Steps items={refillSteps} />
            <p>
              <Link className="text-link" to="/refill">
                More about refill →
              </Link>
            </p>
          </section>
        </div>

        <section className="section-tight" aria-labelledby="pd-more">
          <h2 id="pd-more">Other flavours</h2>
          <ProductGrid list={others} />
        </section>
      </div>
    </div>
  )
}
