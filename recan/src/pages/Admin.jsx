import { useState } from 'react'
import { Link } from 'react-router-dom'
import { COVER_PRESETS, ORDER_STATUSES } from '../data'
import {
  useStore,
  articlesStore,
  ordersStore,
  sortedArticles,
  saveArticle,
  deleteArticle,
  resetArticles,
  setOrderStatus,
  resetOrders,
  formatDate,
  money,
  toast,
} from '../store'
import { useSeo } from '../seo'
import { Cover } from '../components/Visuals'
import { OrderItems } from './Cart'

const blank = { title: '', category: '', excerpt: '', body: '', cover: 'all' }

// Shrinks an uploaded image so it fits into localStorage.
function readImage(file) {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith('image/')) return reject(new Error('The file is not an image.'))
    const url = URL.createObjectURL(file)
    const img = new Image()
    img.onload = () => {
      const scale = Math.min(1, 1200 / img.width)
      const canvas = document.createElement('canvas')
      canvas.width = Math.round(img.width * scale)
      canvas.height = Math.round(img.height * scale)
      canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height)
      URL.revokeObjectURL(url)
      resolve(canvas.toDataURL('image/jpeg', 0.8))
    }
    img.onerror = () => {
      URL.revokeObjectURL(url)
      reject(new Error('The image could not be loaded.'))
    }
    img.src = url
  })
}

function ArticleForm({ initial, onDone }) {
  const editing = Boolean(initial)
  const [v, setV] = useState(initial ? { ...blank, ...initial } : blank)
  const [errors, setErrors] = useState({})
  const set = (k) => (e) => setV((x) => ({ ...x, [k]: e.target.value }))
  const custom = v.cover.startsWith('data:image/')

  const submit = (e) => {
    e.preventDefault()
    const err = {}
    if (!v.title.trim()) err.title = 'Enter the article title.'
    if (!v.category.trim()) err.category = 'Enter a category.'
    if (!v.excerpt.trim()) err.excerpt = 'Enter a short intro.'
    if (!v.body.trim()) err.body = 'Enter the article text.'
    setErrors(err)
    const first = Object.keys(err)[0]
    if (first) return document.getElementById(`a-${first}`)?.focus()
    const saved = saveArticle(
      { title: v.title.trim(), category: v.category.trim(), excerpt: v.excerpt.trim(), body: v.body.trim(), cover: v.cover },
      initial?.slug,
    )
    toast(editing ? 'Changes saved.' : 'Article created.', saved && { to: `/blog/${saved.slug}`, label: 'View' })
    onDone()
  }

  const upload = async (e) => {
    const file = e.target.files?.[0]
    e.target.value = ''
    if (!file) return
    try {
      const data = await readImage(file)
      setV((x) => ({ ...x, cover: data }))
      setErrors((x) => ({ ...x, cover: undefined }))
    } catch (err) {
      setErrors((x) => ({ ...x, cover: err.message }))
    }
  }

  const text = (k, label, { hint, ...props } = {}) => (
    <div className={`field ${errors[k] ? 'has-error' : ''}`}>
      <label htmlFor={`a-${k}`}>{label}</label>
      {props.rows ? (
        <textarea id={`a-${k}`} value={v[k]} onChange={set(k)} aria-invalid={errors[k] ? 'true' : undefined} {...props} />
      ) : (
        <input id={`a-${k}`} value={v[k]} onChange={set(k)} aria-invalid={errors[k] ? 'true' : undefined} {...props} />
      )}
      {hint && <p className="hint">{hint}</p>}
      {errors[k] && (
        <p className="error" role="alert">
          {errors[k]}
        </p>
      )}
    </div>
  )

  return (
    <form className="form-card" onSubmit={submit} noValidate aria-label={editing ? 'Edit article' : 'New article'}>
      <h2>{editing ? 'Edit article' : 'New article'}</h2>
      {text('title', 'Title', { maxLength: 120 })}
      {text('category', 'Category', { maxLength: 40, placeholder: 'E.g. Lifestyle' })}
      {text('excerpt', 'Short intro', { rows: 3, maxLength: 300 })}
      {text('body', 'Full text', { rows: 12, hint: 'Separate paragraphs with an empty line. Text is shown as plain text; HTML is not executed.' })}

      <fieldset className="cover-picker">
        <legend>Cover image</legend>
        <div className="cover-options">
          {COVER_PRESETS.map((c) => (
            <label key={c.id} className={v.cover === c.id ? 'is-on' : ''}>
              <input type="radio" name="cover" value={c.id} checked={v.cover === c.id} onChange={set('cover')} />
              <Cover cover={c.id} />
              <span>{c.label}</span>
            </label>
          ))}
          {custom && (
            <label className="is-on">
              <input type="radio" name="cover" checked readOnly />
              <Cover cover={v.cover} />
              <span>Custom image</span>
            </label>
          )}
        </div>
        <label className="btn btn-ghost btn-small upload">
          Upload custom image
          <input type="file" accept="image/*" onChange={upload} className="sr-only" />
        </label>
        {errors.cover && (
          <p className="error" role="alert">
            {errors.cover}
          </p>
        )}
      </fieldset>

      <div className="form-actions">
        <button type="submit" className="btn">
          {editing ? 'Save changes' : 'Create article'}
        </button>
        <button type="button" className="btn btn-ghost" onClick={onDone}>
          Cancel
        </button>
      </div>
    </form>
  )
}

function Articles() {
  const articles = sortedArticles(useStore(articlesStore))
  const [mode, setMode] = useState(null) // null | 'new' | slug
  const [confirm, setConfirm] = useState(null)

  if (mode) {
    const initial = mode === 'new' ? null : articles.find((a) => a.slug === mode)
    return <ArticleForm key={mode} initial={initial} onDone={() => setMode(null)} />
  }

  return (
    <div>
      <div className="admin-bar">
        <button type="button" className="btn" onClick={() => setMode('new')}>
          + New article
        </button>
        <button
          type="button"
          className="text-link"
          onClick={() => {
            resetArticles()
            toast('The original three articles have been restored.')
          }}
        >
          Restore original articles
        </button>
      </div>
      {!articles.length && (
        <div className="empty-inline">
          <p>No articles. Create the first one or restore the originals.</p>
        </div>
      )}
      <ul className="admin-list">
        {articles.map((a) => (
          <li key={a.slug} data-article={a.slug}>
            <Cover cover={a.cover} className="admin-thumb" />
            <div className="admin-item-main">
              <h3>{a.title}</h3>
              <p className="muted">
                {a.category} · {formatDate(a.date)} · <Link to={`/blog/${a.slug}`}>/blog/{a.slug}</Link>
              </p>
            </div>
            {confirm === a.slug ? (
              <div className="confirm-inline" role="alertdialog" aria-label={`Confirm deleting article ${a.title}`}>
                <span>Really delete?</span>
                <button
                  type="button"
                  className="btn btn-small btn-danger"
                  onClick={() => {
                    deleteArticle(a.slug)
                    setConfirm(null)
                    toast('Article deleted.')
                  }}
                >
                  Yes, delete
                </button>
                <button type="button" className="btn btn-small btn-ghost" onClick={() => setConfirm(null)}>
                  No
                </button>
              </div>
            ) : (
              <div className="admin-item-actions">
                <button type="button" className="btn btn-small btn-ghost" onClick={() => setMode(a.slug)}>
                  Edit
                </button>
                <button type="button" className="btn btn-small btn-ghost danger" onClick={() => setConfirm(a.slug)}>
                  Delete
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

function Orders() {
  const orders = useStore(ordersStore)
  if (!orders.length)
    return (
      <div className="empty-inline">
        <h2>No orders</h2>
        <p>A new order will appear here as soon as a purchase is completed.</p>
        <div className="empty-actions">
          <Link className="btn" to="/shop">
            Go to shop
          </Link>
          <button type="button" className="btn btn-ghost" onClick={resetOrders}>
            Load test orders
          </button>
        </div>
      </div>
    )
  const counts = ORDER_STATUSES.map((st) => [st, orders.filter((o) => o.status === st).length])
  return (
    <>
      <div className="admin-bar">
        <ul className="status-summary" aria-label="Orders by status">
          {counts.map(([st, n], i) => (
            <li key={st} data-status={i}>
              <b>{n}</b> {st}
            </li>
          ))}
        </ul>
        <button
          type="button"
          className="text-link"
          onClick={() => {
            resetOrders()
            toast('Test orders have been restored.')
          }}
        >
          Restore test orders
        </button>
      </div>
    <ul className="order-list">
      {orders.map((o) => (
        <li key={o.id} className="order-card" data-order={o.id}>
          <header>
            <div>
              <h3>
                {o.id} {o.test && <span className="tag tag-ned">test</span>}
              </h3>
              <p className="muted">
                Created{' '}
                {new Date(o.createdAt).toLocaleString('en-GB', { dateStyle: 'medium', timeStyle: 'short' })}
              </p>
            </div>
            <div className="field status-field">
              <label htmlFor={`st-${o.id}`}>Status</label>
              <select
                id={`st-${o.id}`}
                value={o.status}
                data-status={ORDER_STATUSES.indexOf(o.status)}
                onChange={(e) => {
                  setOrderStatus(o.id, e.target.value)
                  toast(`${o.id}: ${e.target.value}`)
                }}
              >
                {ORDER_STATUSES.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </div>
          </header>
          <dl className="order-meta">
            <div>
              <dt>Name</dt>
              <dd>{o.name}</dd>
            </div>
            <div>
              <dt>E-mail</dt>
              <dd>{o.email}</dd>
            </div>
            <div>
              <dt>Pickup date</dt>
              <dd>{formatDate(o.pickup)}</dd>
            </div>
            <div>
              <dt>Total</dt>
              <dd>{money(o.total)}</dd>
            </div>
          </dl>
          <details>
            <summary>Items ({o.items.length})</summary>
            <OrderItems order={o} />
          </details>
        </li>
      ))}
    </ul>
    </>
  )
}

// Admin login. Verification happens in the browser (the site has no backend),
// the password is stored only as a SHA-256 hash and the session lasts until the tab is closed.
const ADMIN_USER = 'admin'
const ADMIN_HASH = '5f803048e654ca84ee8b1886c4fcebeb2ed04a8e5f47e2c88b6e7242a9ff3c5c'
const SESSION_KEY = 'recan.admin.session'
const MAX_ATTEMPTS = 5
const LOCK_MS = 30000

async function sha256(text) {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text))
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, '0')).join('')
}
const readSession = () => {
  try {
    return sessionStorage.getItem(SESSION_KEY) === ADMIN_USER
  } catch {
    return false
  }
}

function Login({ onLogin }) {
  const [user, setUser] = useState('')
  const [pass, setPass] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  const [attempts, setAttempts] = useState(0)
  const [lockedUntil, setLockedUntil] = useState(0)

  const submit = async (e) => {
    e.preventDefault()
    if (Date.now() < lockedUntil) {
      setError(`Too many attempts. Try again in ${Math.ceil((lockedUntil - Date.now()) / 1000)} s.`)
      return
    }
    if (!user.trim() || !pass) {
      setError('Enter both username and password.')
      return
    }
    setBusy(true)
    let ok = false
    try {
      ok = user.trim().toLowerCase() === ADMIN_USER && (await sha256(pass)) === ADMIN_HASH
    } catch {
      setError('Login requires a secure connection (https).')
      setBusy(false)
      return
    }
    setBusy(false)
    if (ok) {
      try {
        sessionStorage.setItem(SESSION_KEY, ADMIN_USER)
      } catch {
        /* session stays in memory */
      }
      onLogin()
      return
    }
    const n = attempts + 1
    setPass('')
    if (n >= MAX_ATTEMPTS) {
      setAttempts(0)
      setLockedUntil(Date.now() + LOCK_MS)
      setError('Too many incorrect attempts. Login is locked for 30 seconds.')
    } else {
      setAttempts(n)
      setError(`Incorrect username or password. Attempts left: ${MAX_ATTEMPTS - n}.`)
    }
  }

  return (
    <div className="wrap login-wrap">
      <form className="form-card login-card" onSubmit={submit} noValidate aria-labelledby="login-title">
        <p className="eyebrow">RE:CAN</p>
        <h1 id="login-title">Admin</h1>
        <p className="muted">Log in to manage orders and articles.</p>
        <div className={`field ${error ? 'has-error' : ''}`}>
          <label htmlFor="login-user">Username</label>
          <input id="login-user" autoComplete="username" value={user} onChange={(e) => setUser(e.target.value)} />
        </div>
        <div className={`field ${error ? 'has-error' : ''}`}>
          <label htmlFor="login-pass">Password</label>
          <input
            id="login-pass"
            type="password"
            autoComplete="current-password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
          />
        </div>
        {error && (
          <p className="error" role="alert">
            {error}
          </p>
        )}
        <button type="submit" className="btn btn-block" disabled={busy}>
          {busy ? 'Checking…' : 'Log in'}
        </button>
      </form>
    </div>
  )
}

export default function Admin() {
  const [authed, setAuthed] = useState(readSession)
  useSeo({ title: 'Admin', noindex: true })
  if (!authed) return <Login onLogin={() => setAuthed(true)} />
  const logout = () => {
    try {
      sessionStorage.removeItem(SESSION_KEY)
    } catch {
      /* nothing */
    }
    setAuthed(false)
    toast('You have been logged out.')
  }
  return <Dashboard onLogout={logout} />
}

function Dashboard({ onLogout }) {
  const [tab, setTab] = useState('orders')
  const orders = useStore(ordersStore)
  const open = orders.filter((o) => o.status !== ORDER_STATUSES[ORDER_STATUSES.length - 1]).length
  return (
    <>
      <div className="page-head wrap admin-head">
        <div>
          <p className="eyebrow">RE:CAN · logged in as admin</p>
          <h1>Admin</h1>
          <p className="lead">
            {orders.length} orders, {open} of them open.
          </p>
        </div>
        <button type="button" className="btn btn-ghost btn-small" onClick={onLogout}>
          Log out
        </button>
      </div>
      <div className="wrap section-tight">
        <div className="tabs" role="tablist" aria-label="Admin sections">
          <button type="button" role="tab" aria-selected={tab === 'orders'} onClick={() => setTab('orders')}>
            Orders ({orders.length})
          </button>
          <button type="button" role="tab" aria-selected={tab === 'articles'} onClick={() => setTab('articles')}>
            Articles
          </button>
        </div>
        <div role="tabpanel">{tab === 'articles' ? <Articles /> : <Orders />}</div>
      </div>
    </>
  )
}
