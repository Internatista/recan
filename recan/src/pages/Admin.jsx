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
  formatDate,
  money,
  toast,
} from '../store'
import { PageHead } from '../components/ui'
import { Cover } from '../components/Visuals'
import { OrderItems } from './Cart'

const blank = { title: '', category: '', excerpt: '', body: '', cover: 'all' }

// Zmenší nahraný obrázok, aby sa zmestil do localStorage.
function readImage(file) {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith('image/')) return reject(new Error('Súbor nie je obrázok.'))
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
      reject(new Error('Obrázok sa nepodarilo načítať.'))
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
    if (!v.title.trim()) err.title = 'Zadaj názov článku.'
    if (!v.category.trim()) err.category = 'Zadaj kategóriu.'
    if (!v.excerpt.trim()) err.excerpt = 'Zadaj krátky úvod.'
    if (!v.body.trim()) err.body = 'Zadaj text článku.'
    setErrors(err)
    const first = Object.keys(err)[0]
    if (first) return document.getElementById(`a-${first}`)?.focus()
    const saved = saveArticle(
      { title: v.title.trim(), category: v.category.trim(), excerpt: v.excerpt.trim(), body: v.body.trim(), cover: v.cover },
      initial?.slug,
    )
    toast(editing ? 'Zmeny sú uložené.' : 'Článok je vytvorený.', saved && { to: `/blog/${saved.slug}`, label: 'Zobraziť' })
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
    <form className="form-card" onSubmit={submit} noValidate aria-label={editing ? 'Úprava článku' : 'Nový článok'}>
      <h2>{editing ? 'Upraviť článok' : 'Nový článok'}</h2>
      {text('title', 'Názov', { maxLength: 120 })}
      {text('category', 'Kategória', { maxLength: 40, placeholder: 'Napr. Životný štýl' })}
      {text('excerpt', 'Krátky úvod', { rows: 3, maxLength: 300 })}
      {text('body', 'Celý text', { rows: 12, hint: 'Odseky oddeľ prázdnym riadkom. Text sa zobrazí ako obyčajný text, HTML sa nevykonáva.' })}

      <fieldset className="cover-picker">
        <legend>Titulný obrázok</legend>
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
              <span>Vlastný obrázok</span>
            </label>
          )}
        </div>
        <label className="btn btn-ghost btn-small upload">
          Nahrať vlastný obrázok
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
          {editing ? 'Uložiť zmeny' : 'Vytvoriť článok'}
        </button>
        <button type="button" className="btn btn-ghost" onClick={onDone}>
          Zrušiť
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
          + Nový článok
        </button>
        <button
          type="button"
          className="text-link"
          onClick={() => {
            resetArticles()
            toast('Pôvodné tri články sú obnovené.')
          }}
        >
          Obnoviť pôvodné články
        </button>
      </div>
      {!articles.length && (
        <div className="empty-inline">
          <p>Žiadne články. Vytvor prvý alebo obnov pôvodné.</p>
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
              <div className="confirm-inline" role="alertdialog" aria-label={`Potvrdenie odstránenia článku ${a.title}`}>
                <span>Naozaj odstrániť?</span>
                <button
                  type="button"
                  className="btn btn-small btn-danger"
                  onClick={() => {
                    deleteArticle(a.slug)
                    setConfirm(null)
                    toast('Článok je odstránený.')
                  }}
                >
                  Áno, odstrániť
                </button>
                <button type="button" className="btn btn-small btn-ghost" onClick={() => setConfirm(null)}>
                  Nie
                </button>
              </div>
            ) : (
              <div className="admin-item-actions">
                <button type="button" className="btn btn-small btn-ghost" onClick={() => setMode(a.slug)}>
                  Upraviť
                </button>
                <button type="button" className="btn btn-small btn-ghost danger" onClick={() => setConfirm(a.slug)}>
                  Odstrániť
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
        <h2>Žiadne objednávky</h2>
        <p>Nová objednávka sa tu objaví hneď po dokončení nákupu.</p>
        <Link className="btn" to="/shop">
          Do obchodu
        </Link>
      </div>
    )
  return (
    <ul className="order-list">
      {orders.map((o) => (
        <li key={o.id} className="order-card" data-order={o.id}>
          <header>
            <div>
              <h3>{o.id}</h3>
              <p className="muted">
                Vytvorená{' '}
                {new Date(o.createdAt).toLocaleString('sk-SK', { dateStyle: 'medium', timeStyle: 'short' })}
              </p>
            </div>
            <div className="field status-field">
              <label htmlFor={`st-${o.id}`}>Stav</label>
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
              <dt>Meno</dt>
              <dd>{o.name}</dd>
            </div>
            <div>
              <dt>E-mail</dt>
              <dd>{o.email}</dd>
            </div>
            <div>
              <dt>Termín odberu</dt>
              <dd>{formatDate(o.pickup)}</dd>
            </div>
            <div>
              <dt>Spolu</dt>
              <dd>{money(o.total)}</dd>
            </div>
          </dl>
          <details>
            <summary>Položky ({o.items.length})</summary>
            <OrderItems order={o} />
          </details>
        </li>
      ))}
    </ul>
  )
}

export default function Admin() {
  const [tab, setTab] = useState('articles')
  const count = useStore(ordersStore).length
  return (
    <>
      <PageHead eyebrow="RE:CAN" title="Administrácia">
        Správa článkov a objednávok.
      </PageHead>
      <div className="wrap section-tight">
        <div className="tabs" role="tablist" aria-label="Sekcie editora">
          <button type="button" role="tab" aria-selected={tab === 'articles'} onClick={() => setTab('articles')}>
            Články
          </button>
          <button type="button" role="tab" aria-selected={tab === 'orders'} onClick={() => setTab('orders')}>
            Objednávky ({count})
          </button>
        </div>
        <div role="tabpanel">{tab === 'articles' ? <Articles /> : <Orders />}</div>
      </div>
    </>
  )
}
