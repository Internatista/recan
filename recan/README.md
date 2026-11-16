# RE:CAN – e-shop

Vite + React + React Router. No backend; data (cart, orders, articles) is stored in the browser's localStorage.

## Running

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build to dist/
npm run preview  # preview the build
```

## Deployment

This is an SPA with real URLs, so the host must redirect all paths to `index.html`.
`vercel.json` (Vercel) and `public/_redirects` (Netlify) are included.

## Structure

- `src/data.js` – products, prices, FAQ, initial articles, ingredients, nutrition, pickup point
- `src/store.js` – cart, orders, articles, discount calculation
- `src/pages/` – pages, `src/components/` – gallery, three-pack, visuals
- `src/assets/` – can cut-outs (WebP)

## Pages

`/`, `/shop`, `/products/:slug`, `/bundle`, `/cart`, `/checkout`, `/order/:id`,
`/blog`, `/blog/:slug`, `/story`, `/refill`, `/admin`, `/app/`

## Technical notes

- Payment happens at pickup; the site has no payment gateway.
- Data (cart, orders, articles) is stored in the browser's localStorage.
- `/admin` is protected by a login: username `admin`, password `Recan2026!`. Verification happens in the browser (the password is stored as a SHA-256 hash) and the session lasts until the tab is closed.
- The admin contains 10 test orders in different statuses; the "Restore test orders" button resets them to their original state.
- SEO: title, description, canonical and Open Graph for every page, structured data (Product, BlogPosting, Organization); `sitemap.xml` and `robots.txt` are generated at build time from `SITE_URL` or the Vercel production domain.

## Brand guidelines

Colours (Soft Oat, Charcoal, Matcha Sage, Peach Protein, Berry Breeze), IBM Plex Sans and the logo are taken from the brand manual.
The display typeface Boldfat Mighty is a paid font and is not included; Titan One is used instead.

## Mobile app

Runs at `/app/` (file `public/app/index.html`; the copy in `mobile-app/index.html` can also be opened with a double-click). On desktop it is shown in an iPhone 17 frame (402 × 874 points) scaled to the window height; on a phone it fills the whole screen. The cart and refill card are saved in the browser.
