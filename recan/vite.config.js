import { readFileSync } from 'node:fs'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Site address: SITE_URL, otherwise the Vercel production domain, otherwise the local preview.
const SITE_URL = (
  process.env.SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : 'http://localhost:4173')
).replace(/\/$/, '')

function seoFiles() {
  return {
    name: 'recan-seo-files',
    transformIndexHtml: { order: 'pre', handler: (html) => html.replaceAll('%SITE_URL%', SITE_URL) },
    generateBundle() {
      // Product and article slugs are read straight from the source data.
      const data = readFileSync(new URL('./src/data.js', import.meta.url), 'utf8')
      const slugs = [...data.matchAll(/slug: '([a-z0-9-]+)'/g)].map((m) => m[1])
      const productSection = data.slice(data.indexOf('export const products'), data.indexOf('export const bySlug'))
      const products = slugs.filter((s) => productSection.includes(`slug: '${s}'`))
      const articles = slugs.filter((s) => !products.includes(s))
      const today = new Date().toISOString().slice(0, 10)
      const routes = [
        ['/', '1.0', 'weekly'],
        ['/shop', '0.9', 'weekly'],
        ...products.map((s) => [`/products/${s}`, '0.8', 'monthly']),
        ['/bundle', '0.7', 'monthly'],
        ['/story', '0.6', 'monthly'],
        ['/refill', '0.6', 'monthly'],
        ['/blog', '0.7', 'weekly'],
        ['/app/', '0.5', 'monthly'],
        ...articles.map((s) => [`/blog/${s}`, '0.5', 'monthly']),
      ]
      const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    ([path, priority, freq]) =>
      `  <url><loc>${SITE_URL}${path}</loc><lastmod>${today}</lastmod><changefreq>${freq}</changefreq><priority>${priority}</priority></url>`,
  )
  .join('\n')}
</urlset>
`
      this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: xml })
      this.emitFile({
        type: 'asset',
        fileName: 'robots.txt',
        source: `User-agent: *\nAllow: /\nDisallow: /admin\nDisallow: /cart\nDisallow: /checkout\nDisallow: /order/\n\nSitemap: ${SITE_URL}/sitemap.xml\n`,
      })
    },
  }
}

export default defineConfig({ plugins: [react(), seoFiles()] })
