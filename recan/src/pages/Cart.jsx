import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { BUNDLE_DISCOUNT_PCT, pickupPoint } from '../data'
import {
  useStore,
  cartStore,
  cartTotals,
  setQty,
  removeLine,
  createOrder,
  ordersStore,
  money,
  formatDate,
  todayISO,
  cansLabel,
  toast,
} from '../store'
import { PageHead, QtyStepper, NotFound } from '../components/ui'
import { useSeo } from '../seo'

function EmptyCart({ title = 'Košík je prázdny' }) {
  return (
    <div className="empty wrap">
      <div className="empty-art" aria-hidden="true">
        :
      </div>
      <h1>{title}</h1>
      <p>Nie je v ňom žiadna plechovka. Vyber si príchuť alebo si namiešaj trojbalíček.</p>
      <div className="empty-actions">
        <Link className="btn" to="/shop">
          Do obchodu
        </Link>
        <Link className="btn btn-ghost" to="/trojbalicek">
          Trojbalíček
        </Link>
      </div>
    </div>
  )
}

function Totals({ t }) {
  return (
    <dl className="totals">
      <div>
        <dt>Medzisúčet ({cansLabel(t.cans)})</dt>
        <dd>{money(t.subtotal)}</dd>
      </div>
      {t.discount > 0 && (
        <div className="discount">
          <dt>Zľava na trojbalíček (−{BUNDLE_DISCOUNT_PCT} %)</dt>
          <dd>−{money(t.discount)}</dd>
        </div>
      )}
      <div>
        <dt>Osobný odber</dt>
        <dd>Zdarma</dd>
      </div>
      <div className="grand">
        <dt>Spolu</dt>
        <dd data-testid="total">{money(t.total)}</dd>
      </div>
    </dl>
  )
}

export function Cart() {
  const lines = useStore(cartStore)
  const t = cartTotals(lines)
  useSeo({ title: 'Košík', noindex: true })
  if (!t.rows.length) return <EmptyCart />

  return (
    <>
      <PageHead eyebrow="Krok 1 z 2" title="Košík" />
      <div className="wrap section-tight checkout-layout">
        <ul className="cart-list">
          {t.rows.map((r) => (
            <li key={r.id} className="cart-row" data-line={r.id}>
              <div className={`cart-thumbs n${r.images.length}`}>
                {r.images.map((p) => (
                  <span key={p.slug} style={{ '--soft': p.soft }}>
                    <img src={p.img} alt={`Plechovka RE:CAN ${p.name}`} />
                  </span>
                ))}
              </div>
              <div className="cart-main">
                <h2>
                  {r.type === 'single' ? <Link to={`/products/${r.slug}`}>{r.title}</Link> : r.title}
                  {r.type === 'bundle' && <span className="tag tag-sale">−{BUNDLE_DISCOUNT_PCT} % balíček</span>}
                </h2>
                <p className="muted">{r.detail}</p>
                <p className="unit">
                  {r.unitOriginal !== r.unit && <s>{money(r.unitOriginal)}</s>} {money(r.unit)}{' '}
                  <small>/ {r.type === 'bundle' ? 'balíček' : 'kus'}</small>
                </p>
              </div>
              <div className="cart-controls">
                <QtyStepper value={r.qty} onChange={(q) => setQty(r.id, q)} label={`Množstvo: ${r.title} ${r.detail}`} />
                <strong className="line-total">{money(r.total)}</strong>
                <button
                  type="button"
                  className="text-link danger"
                  onClick={() => {
                    removeLine(r.id)
                    toast(`${r.title} bol odstránený z košíka.`)
                  }}
                  aria-label={`Odstrániť ${r.title} ${r.detail} z košíka`}
                >
                  Odstrániť
                </button>
              </div>
            </li>
          ))}
        </ul>
        <aside className="summary" aria-label="Súhrn košíka">
          <h2>Súhrn</h2>
          <Totals t={t} />
          <Link className="btn btn-block" to="/checkout">
            Pokračovať k objednávke
          </Link>
          <Link className="btn btn-ghost btn-block" to="/shop">
            Pokračovať v nákupe
          </Link>
          <p className="note">Platíš až pri prevzatí, hotovosťou alebo kartou.</p>
        </aside>
      </div>
    </>
  )
}

const emailOk = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)

function validate(v) {
  const e = {}
  if (v.name.trim().length < 2) e.name = 'Zadaj meno (aspoň 2 znaky).'
  if (!v.email.trim()) e.email = 'Zadaj e-mail.'
  else if (!emailOk(v.email.trim())) e.email = 'E-mail nemá správny tvar, napríklad meno@priklad.sk.'
  if (!v.pickup) e.pickup = 'Vyber dátum osobného odberu.'
  else if (!/^\d{4}-\d{2}-\d{2}$/.test(v.pickup) || Number.isNaN(new Date(v.pickup).getTime())) e.pickup = 'Dátum nie je platný.'
  else if (v.pickup < todayISO()) e.pickup = 'Dátum odberu nemôže byť v minulosti.'
  return e
}

function Field({ id, label, error, hint, ...props }) {
  const describedBy = [hint && `${id}-hint`, error && `${id}-err`].filter(Boolean).join(' ') || undefined
  return (
    <div className={`field ${error ? 'has-error' : ''}`}>
      <label htmlFor={id}>{label}</label>
      <input id={id} name={id} aria-invalid={error ? 'true' : undefined} aria-describedby={describedBy} {...props} />
      {hint && (
        <p className="hint" id={`${id}-hint`}>
          {hint}
        </p>
      )}
      {error && (
        <p className="error" id={`${id}-err`} role="alert">
          {error}
        </p>
      )}
    </div>
  )
}

export function Checkout() {
  const lines = useStore(cartStore)
  const t = cartTotals(lines)
  const navigate = useNavigate()
  useSeo({ title: 'Dokončenie objednávky', noindex: true })
  const [values, setValues] = useState({ name: '', email: '', pickup: '' })
  const [touched, setTouched] = useState({})
  const [submitted, setSubmitted] = useState(false)

  if (!t.rows.length) return <EmptyCart title="Nie je čo objednať" />

  const errors = validate(values)
  const show = (k) => (submitted || touched[k] ? errors[k] : undefined)
  const bind = (k) => ({
    value: values[k],
    onChange: (e) => setValues((v) => ({ ...v, [k]: e.target.value })),
    onBlur: () => setTouched((x) => ({ ...x, [k]: true })),
    error: show(k),
  })

  const submit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    const first = Object.keys(errors)[0]
    if (first) {
      document.getElementById(first)?.focus()
      return
    }
    const order = createOrder({ name: values.name.trim(), email: values.email.trim(), pickup: values.pickup })
    if (order) navigate(`/objednavka/${order.id}`, { replace: true })
  }

  return (
    <>
      <PageHead eyebrow="Krok 2 z 2" title="Dokončenie objednávky" />
      <div className="wrap section-tight checkout-layout">
        <form className="form-card" onSubmit={submit} noValidate>
          <h2>Kontaktné údaje a odber</h2>
          <Field id="name" label="Meno" autoComplete="name" placeholder="Meno a priezvisko" {...bind('name')} />
          <Field id="email" label="E-mail" type="email" inputMode="email" autoComplete="email" placeholder="meno@priklad.sk" {...bind('email')} />
          <Field
            id="pickup"
            label="Dátum osobného odberu"
            type="date"
            min={todayISO()}
            hint={`${pickupPoint.name}, ${pickupPoint.hours}. ${pickupPoint.payment}.`}
            {...bind('pickup')}
          />
          <button type="submit" className="btn btn-block">
            Objednať s platbou pri odbere · {money(t.total)}
          </button>
          <Link className="text-link" to="/cart">
            ← Späť do košíka
          </Link>
        </form>
        <aside className="summary" aria-label="Zhrnutie objednávky">
          <h2>Zhrnutie</h2>
          <ul className="mini-list">
            {t.rows.map((r) => (
              <li key={r.id}>
                <span>
                  {r.qty}× {r.title}
                  <small>{r.detail}</small>
                </span>
                <b>{money(r.total)}</b>
              </li>
            ))}
          </ul>
          <Totals t={t} />
        </aside>
      </div>
    </>
  )
}

export function OrderItems({ order }) {
  return (
    <>
      <ul className="mini-list">
        {order.items.map((it, i) => (
          <li key={i}>
            <span>
              {it.qty}× {it.title}
              <small>{it.detail}</small>
            </span>
            <b>{money(it.total)}</b>
          </li>
        ))}
      </ul>
      <Totals t={order} />
    </>
  )
}

export function OrderConfirmation() {
  const { id } = useParams()
  const order = useStore(ordersStore).find((o) => o.id === id)
  useSeo({ title: 'Objednávka prijatá', noindex: true })
  if (!order)
    return <NotFound title="Objednávku sme nenašli" text="Skontroluj číslo objednávky alebo pokračuj do obchodu." />

  return (
    <div className="wrap narrow confirm">
      <p className="confirm-badge" aria-hidden="true">
        ✓
      </p>
      <p className="eyebrow">Objednávka prijatá</p>
      <h1>Ďakujeme, {order.name}!</h1>
      <p className="lead">
        Číslo objednávky <b data-testid="order-id">{order.id}</b>. Termín osobného odberu: <b>{formatDate(order.pickup)}</b>.
      </p>
      <div className="form-card">
        <h2>Súhrn objednávky</h2>
        <OrderItems order={order} />
        <p className="note">
          Objednávku si v zvolený deň prevezmeš na výdajnom mieste {pickupPoint.name} ({pickupPoint.hours}). Stačí povedať
          číslo objednávky. {pickupPoint.payment}. Nezabudni priniesť prázdne plechovky na refill.
        </p>
      </div>
      <div className="empty-actions">
        <Link className="btn" to="/shop">
          Späť do obchodu
        </Link>
        <Link className="btn btn-ghost" to="/refill">
          Ako funguje refill
        </Link>
      </div>
    </div>
  )
}
