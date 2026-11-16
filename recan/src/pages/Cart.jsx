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

function EmptyCart({ title = 'Your cart is empty' }) {
  return (
    <div className="empty wrap">
      <div className="empty-art" aria-hidden="true">
        :
      </div>
      <h1>{title}</h1>
      <p>There are no cans in it yet. Pick a flavour or build a three-pack.</p>
      <div className="empty-actions">
        <Link className="btn" to="/shop">
          Go to shop
        </Link>
        <Link className="btn btn-ghost" to="/bundle">
          Three-pack
        </Link>
      </div>
    </div>
  )
}

function Totals({ t }) {
  return (
    <dl className="totals">
      <div>
        <dt>Subtotal ({cansLabel(t.cans)})</dt>
        <dd>{money(t.subtotal)}</dd>
      </div>
      {t.discount > 0 && (
        <div className="discount">
          <dt>Three-pack discount (−{BUNDLE_DISCOUNT_PCT}%)</dt>
          <dd>−{money(t.discount)}</dd>
        </div>
      )}
      <div>
        <dt>Pickup</dt>
        <dd>Free</dd>
      </div>
      <div className="grand">
        <dt>Total</dt>
        <dd data-testid="total">{money(t.total)}</dd>
      </div>
    </dl>
  )
}

export function Cart() {
  const lines = useStore(cartStore)
  const t = cartTotals(lines)
  useSeo({ title: 'Cart', noindex: true })
  if (!t.rows.length) return <EmptyCart />

  return (
    <>
      <PageHead eyebrow="Step 1 of 2" title="Cart" />
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
                  {r.type === 'bundle' && <span className="tag tag-sale">−{BUNDLE_DISCOUNT_PCT}% pack</span>}
                </h2>
                <p className="muted">{r.detail}</p>
                <p className="unit">
                  {r.unitOriginal !== r.unit && <s>{money(r.unitOriginal)}</s>} {money(r.unit)}{' '}
                  <small>/ {r.type === 'bundle' ? 'pack' : 'can'}</small>
                </p>
              </div>
              <div className="cart-controls">
                <QtyStepper value={r.qty} onChange={(q) => setQty(r.id, q)} label={`Quantity: ${r.title} ${r.detail}`} />
                <strong className="line-total">{money(r.total)}</strong>
                <button
                  type="button"
                  className="text-link danger"
                  onClick={() => {
                    removeLine(r.id)
                    toast(`${r.title} was removed from the cart.`)
                  }}
                  aria-label={`Remove ${r.title} ${r.detail} from cart`}
                >
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
        <aside className="summary" aria-label="Cart summary">
          <h2>Summary</h2>
          <Totals t={t} />
          <Link className="btn btn-block" to="/checkout">
            Proceed to checkout
          </Link>
          <Link className="btn btn-ghost btn-block" to="/shop">
            Continue shopping
          </Link>
          <p className="note">You pay only on collection, in cash or by card.</p>
        </aside>
      </div>
    </>
  )
}

const emailOk = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)

function validate(v) {
  const e = {}
  if (v.name.trim().length < 2) e.name = 'Enter your name (at least 2 characters).'
  if (!v.email.trim()) e.email = 'Enter your e-mail.'
  else if (!emailOk(v.email.trim())) e.email = 'The e-mail format is not valid, for example name@example.com.'
  if (!v.pickup) e.pickup = 'Choose a pickup date.'
  else if (!/^\d{4}-\d{2}-\d{2}$/.test(v.pickup) || Number.isNaN(new Date(v.pickup).getTime())) e.pickup = 'The date is not valid.'
  else if (v.pickup < todayISO()) e.pickup = 'The pickup date cannot be in the past.'
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
  useSeo({ title: 'Checkout', noindex: true })
  const [values, setValues] = useState({ name: '', email: '', pickup: '' })
  const [touched, setTouched] = useState({})
  const [submitted, setSubmitted] = useState(false)

  if (!t.rows.length) return <EmptyCart title="Nothing to order" />

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
    if (order) navigate(`/order/${order.id}`, { replace: true })
  }

  return (
    <>
      <PageHead eyebrow="Step 2 of 2" title="Checkout" />
      <div className="wrap section-tight checkout-layout">
        <form className="form-card" onSubmit={submit} noValidate>
          <h2>Contact details and pickup</h2>
          <Field id="name" label="Name" autoComplete="name" placeholder="First and last name" {...bind('name')} />
          <Field id="email" label="E-mail" type="email" inputMode="email" autoComplete="email" placeholder="name@example.com" {...bind('email')} />
          <Field
            id="pickup"
            label="Pickup date"
            type="date"
            min={todayISO()}
            hint={`${pickupPoint.name}, ${pickupPoint.hours}. ${pickupPoint.payment}.`}
            {...bind('pickup')}
          />
          <button type="submit" className="btn btn-block">
            Order and pay on pickup · {money(t.total)}
          </button>
          <Link className="text-link" to="/cart">
            ← Back to cart
          </Link>
        </form>
        <aside className="summary" aria-label="Order summary">
          <h2>Summary</h2>
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
  useSeo({ title: 'Order received', noindex: true })
  if (!order)
    return <NotFound title="Order not found" text="Check the order number or continue to the shop." />

  return (
    <div className="wrap narrow confirm">
      <p className="confirm-badge" aria-hidden="true">
        ✓
      </p>
      <p className="eyebrow">Order received</p>
      <h1>Thank you, {order.name}!</h1>
      <p className="lead">
        Order number <b data-testid="order-id">{order.id}</b>. Pickup date: <b>{formatDate(order.pickup)}</b>.
      </p>
      <div className="form-card">
        <h2>Order summary</h2>
        <OrderItems order={order} />
        <p className="note">
          Collect your order on the chosen day at the {pickupPoint.name} pickup point ({pickupPoint.hours}). Just give us
          your order number. {pickupPoint.payment}. Don't forget to bring your empty cans for a refill.
        </p>
      </div>
      <div className="empty-actions">
        <Link className="btn" to="/shop">
          Back to shop
        </Link>
        <Link className="btn btn-ghost" to="/refill">
          How refill works
        </Link>
      </div>
    </div>
  )
}
