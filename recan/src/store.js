import { useSyncExternalStore } from 'react'
import {
  products,
  bySlug,
  PRICE,
  BUNDLE_ORIGINAL,
  BUNDLE_PRICE,
  BUNDLE_SIZE,
  MAX_QTY,
  seedArticles,
  ORDER_STATUSES,
} from './data'

// ---------- small store on top of localStorage ----------
function createStore(key, fallback, sanitize = (v) => v) {
  const load = () => {
    try {
      const raw = localStorage.getItem(key)
      if (raw === null) return fallback
      return sanitize(JSON.parse(raw))
    } catch {
      return fallback
    }
  }
  let state = load()
  const subs = new Set()
  const emit = () => subs.forEach((fn) => fn())
  window.addEventListener('storage', (e) => {
    if (e.key === key || e.key === null) {
      state = load()
      emit()
    }
  })
  return {
    get: () => state,
    set(next) {
      state = typeof next === 'function' ? next(state) : next
      try {
        localStorage.setItem(key, JSON.stringify(state))
      } catch {
        /* storage full or unavailable – state stays in memory */
      }
      emit()
    },
    subscribe(fn) {
      subs.add(fn)
      return () => subs.delete(fn)
    },
  }
}
export const useStore = (store) => useSyncExternalStore(store.subscribe, store.get)

const clampQty = (n) => Math.max(1, Math.min(MAX_QTY, Math.round(Number(n)) || 1))
const order = (slug) => products.findIndex((p) => p.slug === slug)

// ---------- cart ----------
// line: { id, type: 'single', slug, qty } | { id, type: 'bundle', slugs: [3], qty }
const sanitizeCart = (lines) =>
  Array.isArray(lines)
    ? lines
        .filter((l) =>
          l && l.type === 'bundle'
            ? Array.isArray(l.slugs) &&
              l.slugs.length === BUNDLE_SIZE &&
              new Set(l.slugs).size === BUNDLE_SIZE &&
              l.slugs.every(bySlug)
            : l && l.type === 'single' && bySlug(l.slug),
        )
        .map((l) => ({ ...l, qty: clampQty(l.qty) }))
    : []

export const cartStore = createStore('recan.cart.v1', [], sanitizeCart)

function upsert(line) {
  cartStore.set((lines) => {
    const hit = lines.find((l) => l.id === line.id)
    return hit
      ? lines.map((l) => (l.id === line.id ? { ...l, qty: clampQty(l.qty + line.qty) } : l))
      : [...lines, { ...line, qty: clampQty(line.qty) }]
  })
}
export const addSingle = (slug, qty = 1) => upsert({ id: `p:${slug}`, type: 'single', slug, qty })
export const addBundle = (slugs) => {
  const sorted = [...slugs].sort((a, b) => order(a) - order(b))
  upsert({ id: `b:${sorted.join('+')}`, type: 'bundle', slugs: sorted, qty: 1 })
}
export const setQty = (id, qty) =>
  cartStore.set((lines) => lines.map((l) => (l.id === id ? { ...l, qty: clampQty(qty) } : l)))
export const removeLine = (id) => cartStore.set((lines) => lines.filter((l) => l.id !== id))

// The discount depends only on the line type, so it can never carry over to single items.
export function describeLine(line) {
  if (line.type === 'bundle') {
    const items = line.slugs.map(bySlug)
    return {
      ...line,
      title: 'Three-pack',
      detail: items.map((p) => p.name).join(' + '),
      images: items,
      cans: BUNDLE_SIZE * line.qty,
      unit: BUNDLE_PRICE,
      unitOriginal: BUNDLE_ORIGINAL,
      total: BUNDLE_PRICE * line.qty,
      original: BUNDLE_ORIGINAL * line.qty,
    }
  }
  const p = bySlug(line.slug)
  return {
    ...line,
    title: p.name,
    detail: p.flavor,
    images: [p],
    cans: line.qty,
    unit: PRICE,
    unitOriginal: PRICE,
    total: PRICE * line.qty,
    original: PRICE * line.qty,
  }
}
export function cartTotals(lines) {
  const rows = lines.map(describeLine)
  const subtotal = rows.reduce((s, r) => s + r.original, 0)
  const total = rows.reduce((s, r) => s + r.total, 0)
  return { rows, subtotal, discount: subtotal - total, total, cans: rows.reduce((s, r) => s + r.cans, 0) }
}

// ---------- orders ----------
// Test orders so the admin is never empty, in any browser.
function snapshot(id, createdAt, name, email, pickup, status, lines) {
  const { rows, subtotal, discount, total, cans } = cartTotals(lines)
  return {
    id,
    createdAt,
    name,
    email,
    pickup,
    status,
    test: true,
    items: rows.map((r) => ({
      type: r.type,
      title: r.title,
      detail: r.detail,
      qty: r.qty,
      unit: r.unit,
      unitOriginal: r.unitOriginal,
      total: r.total,
    })),
    cans,
    subtotal,
    discount,
    total,
  }
}
const one = (slug, qty) => ({ id: `p:${slug}`, type: 'single', slug, qty })
const pack = (slugs, qty = 1) => ({ id: `b:${slugs.join('+')}`, type: 'bundle', slugs, qty })
const [N, P, R, D] = ORDER_STATUSES

export const seedOrders = [
  snapshot('RC-261114-T010', '2026-11-14T16:42:00.000Z', 'Tomáš Horváth', 'tomas.horvath@example.com', '2026-11-18', N, [
    one('tropical', 2),
    one('citrus-charge', 1),
  ]),
  snapshot('RC-261114-T009', '2026-11-14T09:15:00.000Z', 'Lucia Bieliková', 'lucia.bielikova@example.com', '2026-11-17', N, [
    pack(['citrus-charge', 'watermelon-lime', 'berry-blast']),
  ]),
  snapshot('RC-261113-T008', '2026-11-13T18:03:00.000Z', 'Martin Kováč', 'martin.kovac@example.com', '2026-11-17', P, [
    one('berry-blast', 6),
  ]),
  snapshot('RC-261113-T007', '2026-11-13T11:27:00.000Z', 'Simona Vargová', 'simona.vargova@example.com', '2026-11-16', P, [
    pack(['citrus-charge', 'watermelon-lime', 'tropical']),
    one('watermelon-lime', 2),
  ]),
  snapshot('RC-261112-T006', '2026-11-12T20:48:00.000Z', 'Peter Novák', 'peter.novak@example.com', '2026-11-15', R, [
    one('citrus-charge', 4),
  ]),
  snapshot('RC-261112-T005', '2026-11-12T07:55:00.000Z', 'Katarína Hudáková', 'katarina.hudakova@example.com', '2026-11-14', R, [
    pack(['watermelon-lime', 'tropical', 'berry-blast'], 2),
  ]),
  snapshot('RC-261110-T004', '2026-11-10T15:10:00.000Z', 'Jakub Mráz', 'jakub.mraz@example.com', '2026-11-12', D, [
    one('tropical', 3),
    one('berry-blast', 3),
  ]),
  snapshot('RC-261109-T003', '2026-11-09T12:34:00.000Z', 'Eva Lukáčová', 'eva.lukacova@example.com', '2026-11-11', D, [
    pack(['citrus-charge', 'tropical', 'berry-blast']),
  ]),
  snapshot('RC-261107-T002', '2026-11-07T17:21:00.000Z', 'Michal Šimko', 'michal.simko@example.com', '2026-11-10', D, [
    one('watermelon-lime', 12),
  ]),
  snapshot('RC-261105-T001', '2026-11-05T10:02:00.000Z', 'Zuzana Kráľová', 'zuzana.kralova@example.com', '2026-11-07', D, [
    one('citrus-charge', 1),
    one('watermelon-lime', 1),
    one('tropical', 1),
    one('berry-blast', 1),
  ]),
]

export const ordersStore = createStore('recan.orders.v3', seedOrders, (v) => (Array.isArray(v) ? v : seedOrders))
export const resetOrders = () => ordersStore.set(seedOrders)

export function createOrder({ name, email, pickup }) {
  const { rows, subtotal, discount, total, cans } = cartTotals(cartStore.get())
  if (!rows.length) return null
  const now = new Date()
  const stamp = now.toISOString().slice(2, 10).replace(/-/g, '')
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase().padEnd(4, 'X')
  const orderObj = {
    id: `RC-${stamp}-${rand}`,
    createdAt: now.toISOString(),
    name,
    email,
    pickup,
    status: ORDER_STATUSES[0],
    items: rows.map((r) => ({
      type: r.type,
      title: r.title,
      detail: r.detail,
      qty: r.qty,
      unit: r.unit,
      unitOriginal: r.unitOriginal,
      total: r.total,
    })),
    cans,
    subtotal,
    discount,
    total,
  }
  ordersStore.set((list) => [orderObj, ...list])
  cartStore.set([])
  return orderObj
}
export const setOrderStatus = (id, status) =>
  ordersStore.set((list) => list.map((o) => (o.id === id ? { ...o, status } : o)))

// ---------- articles ----------
export const articlesStore = createStore('recan.articles.v3', seedArticles, (v) =>
  Array.isArray(v) ? v.filter((a) => a && a.slug && a.title) : seedArticles,
)

export const slugify = (text) =>
  text
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 70) || 'article'

export function saveArticle(data, existingSlug) {
  let saved
  articlesStore.set((list) => {
    if (existingSlug) {
      return list.map((a) => (a.slug === existingSlug ? (saved = { ...a, ...data, slug: a.slug }) : a))
    }
    const base = slugify(data.title)
    let slug = base
    for (let i = 2; list.some((a) => a.slug === slug); i++) slug = `${base}-${i}`
    saved = { ...data, slug, date: new Date().toISOString().slice(0, 10) }
    return [saved, ...list]
  })
  return saved
}
export const deleteArticle = (slug) => articlesStore.set((list) => list.filter((a) => a.slug !== slug))
export const resetArticles = () => articlesStore.set(seedArticles)
export const sortedArticles = (list) => [...list].sort((a, b) => (a.date < b.date ? 1 : -1))

// ---------- toast ----------
let toastState = null
let toastTimer
const toastSubs = new Set()
export const toastStore = {
  get: () => toastState,
  subscribe(fn) {
    toastSubs.add(fn)
    return () => toastSubs.delete(fn)
  },
}
export function toast(message, link) {
  toastState = { message, link, key: Date.now() }
  toastSubs.forEach((fn) => fn())
  clearTimeout(toastTimer)
  toastTimer = setTimeout(dismissToast, 3600)
}
export function dismissToast() {
  toastState = null
  toastSubs.forEach((fn) => fn())
}

// ---------- formatting ----------
const eur = new Intl.NumberFormat('en-IE', { style: 'currency', currency: 'EUR' })
export const money = (cents) => eur.format(cents / 100)
export const formatDate = (iso) => {
  const d = new Date(iso.length === 10 ? `${iso}T12:00:00` : iso)
  return Number.isNaN(d.getTime()) ? iso : d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
}
export const todayISO = () => {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}
export const cansLabel = (n) => (n === 1 ? '1 can' : `${n} cans`)
