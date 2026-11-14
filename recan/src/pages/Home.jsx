import { useState } from 'react'
import { Link } from 'react-router-dom'
import { products, faq, pickupPoint, PRICE, BUNDLE_DISCOUNT_PCT } from '../data'
import { useStore, articlesStore, sortedArticles, money } from '../store'
import { ProductGrid, ArticleCard, Steps, refillSteps } from '../components/ui'
import { NetArc, Fruit } from '../components/Visuals'
import BundleBuilder from '../components/BundleBuilder'

export const buySteps = [
  { n: '1', t: 'Vyber si príchute', d: 'Jednotlivo alebo ako trojbalíček. Všetko pridáš do košíka jedným klikom.' },
  { n: '2', t: 'Zvoľ dátum odberu', d: 'V objednávke uvedieš meno, e-mail a deň, kedy si chceš nákup vyzdvihnúť.' },
  { n: '3', t: 'Vyzdvihni a zaplať', d: 'Dostaneš číslo objednávky. Nákup si prevezmeš na výdajnom mieste a zaplatíš až tam.' },
]

export default function Home() {
  const [active, setActive] = useState(0)
  const p = products[active]
  const articles = sortedArticles(useStore(articlesStore)).slice(0, 3)

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
              RE:CAN sú ovocné nápoje s elektrolytmi v plechovke. Štyri príchute pre aktívny deň a jedna myšlienka navyše: obal si
              zaslúži druhý život.
            </p>
            <div className="hero-cta">
              <Link className="btn btn-ink" to="/shop">
                Pozrieť príchute
              </Link>
              <Link className="btn btn-outline" to="/trojbalicek">
                Namiešať trojbalíček
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
            <div className="hero-picker" role="group" aria-label="Ukázať príchuť">
              {products.map((x, i) => (
                <button
                  key={x.slug}
                  type="button"
                  className={i === active ? 'is-active' : ''}
                  aria-pressed={i === active}
                  aria-label={`Ukázať ${x.name}`}
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

      <section className="section wrap" aria-labelledby="h-prichute">
        <div className="section-head">
          <p className="eyebrow">RE:CAN Electrolytes</p>
          <h2 id="h-prichute">Štyri príchute, jedna kolekcia</h2>
          <p>Každá plechovka stojí {money(PRICE)}. Osobný odber je zdarma.</p>
        </div>
        <ProductGrid />
        <p className="center">
          <Link className="text-link" to="/shop">
            Celý obchod →
          </Link>
        </p>
      </section>

      <section className="band band-cream" aria-labelledby="h-nakup">
        <div className="wrap section">
          <div className="section-head">
            <p className="eyebrow">Ako to funguje</p>
            <h2 id="h-nakup">Nákup v troch krokoch</h2>
            <p>Objednáš online, vyzdvihneš osobne a platíš až pri prevzatí.</p>
          </div>
          <Steps items={buySteps} />
        </div>
      </section>

      <section className="section wrap" aria-labelledby="h-bundle">
        <div className="section-head">
          <p className="eyebrow">Trojbalíček · −{BUNDLE_DISCOUNT_PCT} %</p>
          <h2 id="h-bundle">Namiešaj si tri rôzne príchute</h2>
          <p>Vyber tri zo štyroch. Na celý balíček platí zľava {BUNDLE_DISCOUNT_PCT} %.</p>
        </div>
        <BundleBuilder />
      </section>

      <section className="band band-ink" aria-labelledby="h-pribeh">
        <div className="wrap section split">
          <div>
            <p className="eyebrow">Príbeh značky</p>
            <h2 id="h-pribeh">Dobrý nápoj. A čo s plechovkou?</h2>
            <p>
              RE:CAN spája ovocné chute, aktívny život a premýšľanie o obaloch. Vznikli sme ako odpoveď na presladené nápoje v
              jednorazových obaloch.
            </p>
            <Link className="btn btn-cream" to="/pribeh">
              Prečítať príbeh
            </Link>
          </div>
          <div>
            <p className="eyebrow">Refill</p>
            <h2>Vyber. Vychutnaj. Vráť.</h2>
            <p>
              Keď dopiješ, plechovku nevyhadzuj. Prines ju späť, my ju vyčistíme, naplníme a nanovo uzavrieme. Ďalší nápoj máš
              so zľavou.
            </p>
            <Link className="btn btn-outline-cream" to="/refill">
              Ako funguje refill
            </Link>
          </div>
        </div>
      </section>

      <section className="section wrap" aria-labelledby="h-refill">
        <div className="section-head">
          <p className="eyebrow">Druhý život plechovky</p>
          <h2 id="h-refill">Refill v troch krokoch</h2>
        </div>
        <Steps items={refillSteps} />
        <p className="note center-note">
          Plechovky vraciaš pri osobnom odbere. Zľavu za refill ti odpočítame priamo na mieste.
        </p>
      </section>

      <section className="band band-cream" aria-labelledby="h-journal">
        <div className="wrap section">
          <div className="section-head">
            <p className="eyebrow">Journal</p>
            <h2 id="h-journal">Čítanie k plechovke</h2>
          </div>
          {articles.length ? (
            <div className="article-grid">
              {articles.map((a) => (
                <ArticleCard key={a.slug} a={a} />
              ))}
            </div>
          ) : (
            <p className="center">Nové články pripravujeme.</p>
          )}
          <p className="center">
            <Link className="text-link" to="/blog">
              Všetky články →
            </Link>
          </p>
        </div>
      </section>

      <section className="section wrap narrow" aria-labelledby="h-faq">
        <div className="section-head">
          <p className="eyebrow">FAQ</p>
          <h2 id="h-faq">Často kladené otázky</h2>
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

      <section className="section wrap" aria-labelledby="h-kontakt">
        <div className="contact-card">
          <div>
            <p className="eyebrow">Kontakt</p>
            <h2 id="h-kontakt">Kde nás nájdeš</h2>
            <p>Objednávky vydávame a prázdne plechovky prijímame na našom výdajnom mieste.</p>
          </div>
          <dl>
            <div>
              <dt>Výdajné miesto</dt>
              <dd>{pickupPoint.name}</dd>
            </div>
            <div>
              <dt>Otváracie hodiny</dt>
              <dd>{pickupPoint.hours}</dd>
            </div>
            <div>
              <dt>Platba</dt>
              <dd>{pickupPoint.payment}</dd>
            </div>
          </dl>
        </div>
      </section>
    </>
  )
}
