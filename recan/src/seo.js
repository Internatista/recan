import { useEffect } from 'react'

const SITE = 'RE:CAN'
const DEFAULT_TITLE = 'RE:CAN – Good drink. Second life.'
const DEFAULT_DESC =
  'RE:CAN – ovocné nápoje s elektrolytmi v plechovke, ktorá dostane druhý život. Objednaj online, vyzdvihni osobne, plechovku vráť na refill.'

function setMeta(attr, key, content) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function setCanonical(href) {
  let el = document.head.querySelector('link[rel="canonical"]')
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', 'canonical')
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

// Nastaví title, description, canonical, Open Graph a voliteľne štruktúrované dáta pre aktuálnu stránku.
export function useSeo({ title, description = DEFAULT_DESC, noindex = false, jsonLd = null, image } = {}) {
  const ld = jsonLd ? JSON.stringify(jsonLd) : ''
  useEffect(() => {
    const fullTitle = title ? `${title} | ${SITE}` : DEFAULT_TITLE
    const url = window.location.origin + window.location.pathname
    document.title = fullTitle
    setMeta('name', 'description', description)
    setMeta('name', 'robots', noindex ? 'noindex, nofollow' : 'index, follow')
    setMeta('property', 'og:title', fullTitle)
    setMeta('property', 'og:description', description)
    setMeta('property', 'og:url', url)
    setMeta('property', 'og:image', image ? new URL(image, window.location.origin).href : `${window.location.origin}/og.png`)
    setMeta('name', 'twitter:title', fullTitle)
    setMeta('name', 'twitter:description', description)
    setCanonical(url)

    let script
    if (ld) {
      script = document.createElement('script')
      script.type = 'application/ld+json'
      script.dataset.seo = 'page'
      script.textContent = ld
      document.head.appendChild(script)
    }
    return () => script?.remove()
  }, [title, description, noindex, ld, image])
}
