import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { products, demoContact, MAX_QTY, PRICE } from '../data'
import { useStore, cartStore, cartTotals, toastStore, dismissToast, addSingle, toast, money, formatDate } from '../store'
import { Cover } from './Visuals'
import logoDark from '../assets/logo-dark.png'
import logoLight from '../assets/logo-light.png'

const nav = [
  { to: '/shop', label: 'Obchod' },
  { to: '/trojbalicek', label: 'Trojbalíček' },
  { to: '/pribeh', label: 'Príbeh' },
  { to: '/refill', label: 'Refill' },
  { to: '/blog', label: 'Journal' },
]

export function Logo({ light = false }) {
  return <img className="logo" src={light ? logoLight : logoDark} alt="RE:CAN" width="640" height="150" />
}

export function Header() {
  const lines = useStore(cartStore)
  const { cans } = cartTotals(lines)
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  useEffect(() => setOpen(false), [pathname])

  return (
    <header className="site-header">
      <div className="demo-bar">Školský prototyp · bez reálnych platieb a dodania</div>
      <div className="wrap header-row">
        <Link to="/" className="logo-link">
          <Logo />
        </Link>
        <nav className={`main-nav ${open ? 'is-open' : ''}`} id="hlavne-menu" aria-label="Hlavná navigácia">
          {nav.map((n) => (
            <NavLink key={n.to} to={n.to}>
              {n.label}
            </NavLink>
          ))}
        </nav>
        <div className="header-actions">
          <Link to="/cart" className="cart-link" aria-label={`Košík, počet plechoviek: ${cans}`}>
            <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
              <path d="M7 7V6a5 5 0 0 1 10 0v1h3l-1.2 13.2a2 2 0 0 1-2 1.8H7.2a2 2 0 0 1-2-1.8L4 7h3zm2 0h6V6a3 3 0 0 0-6 0v1z" fill="currentColor" />
            </svg>
            <span>Košík</span>
            <b className="cart-count" data-testid="cart-count">
              {cans}
            </b>
          </Link>
          <button
            type="button"
            className="menu-btn"
            aria-expanded={open}
            aria-controls="hlavne-menu"
            onClick={() => setOpen((o) => !o)}
          >
            <span className="sr-only">{open ? 'Zavrieť menu' : 'Otvoriť menu'}</span>
            <span className="menu-icon" aria-hidden="true" />
          </button>
        </div>
      </div>
    </header>
  )
}

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap footer-grid">
        <div>
          <Logo light />
          <p className="footer-slogan">Good drink. Second life.</p>
          <p className="muted-on-dark">Refill. Recharge. Reuse.</p>
        </div>
        <div>
          <h2>Nakupovanie</h2>
          <Link to="/shop">Obchod</Link>
          <Link to="/trojbalicek">Trojbalíček</Link>
          <Link to="/cart">Košík</Link>
        </div>
        <div>
          <h2>Značka</h2>
          <Link to="/pribeh">Príbeh</Link>
          <Link to="/refill">Refill koncept</Link>
          <Link to="/blog">Journal</Link>
          <Link to="/admin">Demo editor</Link>
        </div>
        <div>
          <h2>Kontakt (ukážkový)</h2>
          <p>{demoContact.email}</p>
          <p>Instagram: {demoContact.instagram}</p>
          <p>{demoContact.pickup}</p>
        </div>
      </div>
      <div className="wrap footer-note">
        RE:CAN je školský koncept. Web je prototyp bez reálnych platieb, dodania a prevádzky. Kontaktné údaje sú ukážkové.
      </div>
    </footer>
  )
}

export function Toast() {
  const t = useStore(toastStore)
  return (
    <div className="toast-region" role="status" aria-live="polite">
      {t && (
        <div className="toast" key={t.key}>
          <span>{t.message}</span>
          {t.link && (
            <Link to={t.link.to} onClick={dismissToast}>
              {t.link.label}
            </Link>
          )}
          <button type="button" onClick={dismissToast} aria-label="Zavrieť oznámenie">
            ×
          </button>
        </div>
      )}
    </div>
  )
}

export function QtyStepper({ value, onChange, label }) {
  return (
    <div className="qty" role="group" aria-label={label}>
      <button type="button" onClick={() => onChange(value - 1)} disabled={value <= 1} aria-label="Znížiť množstvo">
        −
      </button>
      <output aria-live="polite">{value}</output>
      <button type="button" onClick={() => onChange(value + 1)} disabled={value >= MAX_QTY} aria-label="Zvýšiť množstvo">
        +
      </button>
    </div>
  )
}

export const addedToast = (text) => toast(text, { to: '/cart', label: 'Zobraziť košík' })

export function ProductCard({ p }) {
  return (
    <article className="product-card" style={{ '--c': p.color, '--soft': p.soft }}>
      <Link to={`/products/${p.slug}`} className="product-card-media" aria-label={`Detail produktu ${p.name}`}>
        <img src={p.img} alt={`Plechovka RE:CAN ${p.name}`} loading="lazy" />
      </Link>
      <div className="product-card-body">
        <h3>
          <Link to={`/products/${p.slug}`}>{p.name}</Link>
        </h3>
        <p className="flavor">{p.flavor}</p>
        <div className="product-card-foot">
          <span className="price">{money(PRICE)}</span>
          <button
            type="button"
            className="btn btn-small"
            onClick={() => {
              addSingle(p.slug, 1)
              addedToast(`${p.name} je v košíku.`)
            }}
            aria-label={`Pridať ${p.name} do košíka`}
          >
            + Do košíka
          </button>
        </div>
      </div>
    </article>
  )
}

export function ProductGrid({ list = products }) {
  return (
    <div className="product-grid">
      {list.map((p) => (
        <ProductCard key={p.slug} p={p} />
      ))}
    </div>
  )
}

export function ArticleCard({ a }) {
  return (
    <article className="article-card">
      <Link to={`/blog/${a.slug}`} tabIndex={-1} aria-hidden="true">
        <Cover cover={a.cover} />
      </Link>
      <div className="article-card-body">
        <p className="eyebrow">
          {a.category} · {formatDate(a.date)}
        </p>
        <h3>
          <Link to={`/blog/${a.slug}`}>{a.title}</Link>
        </h3>
        <p>{a.excerpt}</p>
        <Link className="text-link" to={`/blog/${a.slug}`} aria-label={`Čítať článok: ${a.title}`}>
          Čítať článok →
        </Link>
      </div>
    </article>
  )
}

export function PageHead({ eyebrow, title, children }) {
  return (
    <div className="page-head wrap">
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h1>{title}</h1>
      {children && <p className="lead">{children}</p>}
    </div>
  )
}

export function Note({ children, tone = '' }) {
  return <p className={`note ${tone}`}>{children}</p>
}

export const refillSteps = [
  { n: '1', t: 'Vyber si nápoj', d: 'Zvolíš si príchuť, ktorá ti sadne k dnešnému dňu.' },
  { n: '2', t: 'Vychutnaj si ho', d: 'Studený, po tréningu, cez prestávku. Ako chceš.' },
  { n: '3', t: 'Vráť obal', d: 'Prázdny obal nekončí v koši, ale vracia sa späť, aby dostal druhý život.' },
]

export function Steps({ items }) {
  return (
    <ol className="steps">
      {items.map((s) => (
        <li key={s.n}>
          <span className="step-n" aria-hidden="true">
            {s.n}
          </span>
          <h3>{s.t}</h3>
          <p>{s.d}</p>
        </li>
      ))}
    </ol>
  )
}

export function NotFound({ title = 'Túto stránku sme nenašli', text = 'Adresa neexistuje alebo bola zmenená.' }) {
  return (
    <>
      <PageHead eyebrow="404" title={title}>
        {text}
      </PageHead>
      <div className="wrap section-tight">
        <Link className="btn" to="/shop">
          Do obchodu
        </Link>{' '}
        <Link className="btn btn-ghost" to="/">
          Na úvod
        </Link>
      </div>
    </>
  )
}

