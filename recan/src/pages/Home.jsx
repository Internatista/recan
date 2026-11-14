import { useState } from 'react'
import { Link } from 'react-router-dom'
import { products, faq, demoContact, PRICE, BUNDLE_DISCOUNT_PCT } from '../data'
import { useStore, articlesStore, sortedArticles, money } from '../store'
import { ProductGrid, ArticleCard, Steps, refillSteps } from '../components/ui'
import { NetArc, Fruit } from '../components/Visuals'
import BundleBuilder from '../components/BundleBuilder'

export const buySteps = [
  { n: '1', t: 'Vyber si príchute', d: 'Jednotlivo alebo ako trojbalíček. Všetko pridáš do košíka jedným klikom.' },
  { n: '2', t: 'Zvoľ dátum odberu', d: 'V objednávke uvedieš meno, e-mail a deň, kedy si chceš nákup vyzdvihnúť.' },
  { n: '3', t: 'Dostaneš potvrdenie', d: 'Zobrazí sa číslo objednávky so súhrnom. Platba ani reálny odber neprebiehajú.' },
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
          <p>Každá plechovka stojí {money(PRICE)}. Cena je modelová, rovnako ako celý nákup.</p>
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
            <p>Modelový nákup s osobným odberom. Slúži na vyskúšanie procesu, nie na reálne doručenie.</p>
          </div>
          <Steps items={buySteps} />
        </div>
      </section>

      <section className="section wrap" aria-labelledby="h-bundle">
        <div className="section-head">
          <p className="eyebrow">Trojbalíček · −{BUNDLE_DISCOUNT_PCT} %</p>
          <h2 id="h-bundle">Namiešaj si tri rôzne príchute</h2>
          <p>Vyber tri zo štyroch. Na celý balíček platí modelová zľava {BUNDLE_DISCOUNT_PCT} %.</p>
        </div>
        <BundleBuilder />
      </section>

      <section className="band band-ink" aria-labelledby="h-pribeh">
        <div className="wrap section split">
          <div>
            <p className="eyebrow">Príbeh značky</p>
            <h2 id="h-pribeh">Vznikli sme v škole. Otázka ostala.</h2>
            <p>
              RE:CAN je školský projekt, ktorý spája ovocné chute, aktívny život a premýšľanie o obaloch. Pýtali sme sa, či môže
              byť plechovka súčasťou príbehu aj po poslednom dúšku.
            </p>
            <Link className="btn btn-cream" to="/pribeh">
              Prečítať príbeh
            </Link>
          </div>
          <div>
            <p className="eyebrow">Refill koncept</p>
            <h2>Vyber. Vychutnaj. Vráť.</h2>
            <p>
              Refill je náš návrh, ako dať obalu druhý život. Zatiaľ je to myšlienka, nie spustená služba, a tak ju aj
              predstavujeme.
            </p>
            <Link className="btn btn-outline-cream" to="/refill">
              Ako by refill fungoval
            </Link>
          </div>
        </div>
      </section>

      <section className="section wrap" aria-labelledby="h-refill">
        <div className="section-head">
          <p className="eyebrow">Navrhovaný proces</p>
          <h2 id="h-refill">Refill v troch krokoch</h2>
        </div>
        <Steps items={refillSteps} />
        <p className="note center-note">
          Ide o koncept. Reálny zber obalov ani ich opätovné plnenie neprebieha a jeho bezpečnosť nebola overená.
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
            <p className="center">Zatiaľ tu nie sú žiadne články.</p>
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
            <h2 id="h-kontakt">Napíš nám (akože)</h2>
            <p>Údaje nižšie sú ukážkové. RE:CAN nemá reálnu prevádzku, e-mailovú schránku ani odberné miesto.</p>
          </div>
          <dl>
            <div>
              <dt>E-mail</dt>
              <dd>{demoContact.email}</dd>
            </div>
            <div>
              <dt>Instagram</dt>
              <dd>{demoContact.instagram}</dd>
            </div>
            <div>
              <dt>Osobný odber</dt>
              <dd>{demoContact.pickup}</dd>
            </div>
          </dl>
        </div>
      </section>
    </>
  )
}
