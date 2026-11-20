import { useState } from 'react'
import { Link } from 'react-router-dom'
import { products, faq, pickupPoint, PRICE, BUNDLE_DISCOUNT_PCT } from '../data'
import { useStore, articlesStore, sortedArticles, money } from '../store'
import { ProductGrid, ArticleCard, Steps, refillSteps } from '../components/ui'
import { NetArc, Fruit } from '../components/Visuals'
import BundleBuilder from '../components/BundleBuilder'
import { useSeo } from '../seo'

export const buySteps = [
  { n: '1', t: 'Choose your flavours', d: 'Single cans or a three-pack. Add everything to your cart with one click.' },
  { n: '2', t: 'Pick a pickup date', d: 'Enter your name, e-mail and the day you want to collect your order.' },
  { n: '3', t: 'Collect and pay', d: 'You get an order number. Collect your order at the pickup point and pay there.' },
]

export default function Home() {
  const [active, setActive] = useState(0)
  const p = products[active]
  const articles = sortedArticles(useStore(articlesStore)).slice(0, 3)
  useSeo({
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'RE:CAN',
      slogan: 'Good drink. Second life.',
      url: window.location.origin,
      logo: `${window.location.origin}/og.png`,
    },
  })

  return (
    <>
      <section className="hero" style={{ '--c': p.color, '--arc': p.alt, '--on': p.on }}>
        <NetArc />
        <div className="wrap hero-grid">
          <div className="hero-copy">
            <p className="dotted-tag">Refill · Recharge · Reuse</p>
            <h1>
              Good drink.
              <br />
              Second life.
            </h1>
            <p className="hero-lead">
              RE:CAN makes fruit drinks with electrolytes in a can. Ten flavours for an active day and one more idea: the can
              deserves a second life.
            </p>
            <div className="hero-cta">
              <Link className="btn btn-ink" to="/shop">
                See the flavours
              </Link>
              <Link className="btn btn-outline" to="/bundle">
                Build a three-pack
              </Link>
            </div>
          </div>
          <div className="hero-stage">
            {p.fruits.map((f, i) => (
              <Fruit key={p.slug + f} kind={f} className={`hero-fruit f${i}`} />
            ))}
            <Link to={`/products/${p.slug}`} className="hero-can" aria-label={`Detail produktu ${p.name}`}>
              <img key={p.slug} src={p.img} alt={`Plechovka RE:CAN ${p.name}`} />
            </Link>
            <div className="hero-picker" role="group" aria-label="Show flavour">
              {products.map((x, i) => (
                <button
                  key={x.slug}
                  type="button"
                  className={i === active ? 'is-active' : ''}
                  aria-pressed={i === active}
                  aria-label={`Show ${x.name}`}
                  onClick={() => setActive(i)}
                >
                  <img src={x.img} alt="" />
                </button>
              ))}
            </div>
            <p className="hero-caption">
              <b>{p.name}</b> · {p.flavor} · {money(PRICE)}
            </p>
          </div>
        </div>
      </section>

      <section className="section wrap" aria-labelledby="h-flavours">
        <div className="section-head">
          <p className="eyebrow">RE:CAN Electrolytes</p>
          <h2 id="h-flavours">Ten flavours, one collection</h2>
          <p>Every can costs {money(PRICE)}. Pickup is free.</p>
        </div>
        <ProductGrid />
        <p className="center">
          <Link className="text-link" to="/shop">
            Full shop →
          </Link>
        </p>
      </section>

      <section className="band band-cream" aria-labelledby="h-buying">
        <div className="wrap section">
          <div className="section-head">
            <p className="eyebrow">How it works</p>
            <h2 id="h-buying">Shopping in three steps</h2>
            <p>Order online, collect in person and pay only on pickup.</p>
          </div>
          <Steps items={buySteps} />
        </div>
      </section>

      <section className="section wrap" aria-labelledby="h-bundle">
        <div className="section-head">
          <p className="eyebrow">Three-pack · −{BUNDLE_DISCOUNT_PCT}%</p>
          <h2 id="h-bundle">Mix three different flavours</h2>
          <p>Choose any three different flavours. The whole pack is {BUNDLE_DISCOUNT_PCT}% off.</p>
        </div>
        <BundleBuilder />
      </section>

      <section className="band band-ink" aria-labelledby="h-story">
        <div className="wrap section split">
          <div>
            <p className="eyebrow">Brand story</p>
            <h2 id="h-story">A good drink. And what about the can?</h2>
            <p>
              RE:CAN brings together fruit flavours, an active life and thinking about packaging. We started as an answer to
              oversweetened drinks in single-use packaging.
            </p>
            <Link className="btn btn-cream" to="/story">
              Read our story
            </Link>
          </div>
          <div>
            <p className="eyebrow">Refill</p>
            <h2>Choose. Enjoy. Return.</h2>
            <p>
              When you finish, don't throw the can away. Bring it back and we clean it, refill it and seal it again. Your next
              drink is discounted.
            </p>
            <Link className="btn btn-outline-cream" to="/refill">
              How refill works
            </Link>
          </div>
        </div>
      </section>

      <section className="section wrap" aria-labelledby="h-refill">
        <div className="section-head">
          <p className="eyebrow">The can's second life</p>
          <h2 id="h-refill">Refill in three steps</h2>
        </div>
        <Steps items={refillSteps} />
        <p className="note center-note">
          You return cans when you collect your order. We deduct the refill discount right there.
        </p>
      </section>

      <section className="band band-cream" aria-labelledby="h-journal">
        <div className="wrap section">
          <div className="section-head">
            <p className="eyebrow">Blog</p>
            <h2 id="h-journal">Reading with your can</h2>
          </div>
          {articles.length ? (
            <div className="article-grid">
              {articles.map((a) => (
                <ArticleCard key={a.slug} a={a} />
              ))}
            </div>
          ) : (
            <p className="center">New articles are on the way.</p>
          )}
          <p className="center">
            <Link className="text-link" to="/blog">
              All articles →
            </Link>
          </p>
        </div>
      </section>

      <section className="section wrap narrow" aria-labelledby="h-faq">
        <div className="section-head">
          <p className="eyebrow">FAQ</p>
          <h2 id="h-faq">Frequently asked questions</h2>
        </div>
        <div className="faq">
          {faq.map((f) => (
            <details key={f.q}>
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="section wrap" aria-labelledby="h-contact">
        <div className="contact-card">
          <div>
            <p className="eyebrow">Contact</p>
            <h2 id="h-contact">Where to find us</h2>
            <p>We hand out orders and take back empty cans at our pickup point.</p>
          </div>
          <dl>
            <div>
              <dt>Pickup point</dt>
              <dd>{pickupPoint.name}</dd>
            </div>
            <div>
              <dt>Opening hours</dt>
              <dd>{pickupPoint.hours}</dd>
            </div>
            <div>
              <dt>Payment</dt>
              <dd>{pickupPoint.payment}</dd>
            </div>
          </dl>
        </div>
      </section>
    </>
  )
}
