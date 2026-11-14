# RE:CAN – e-shop

Vite + React + React Router. Bez backendu, dáta (košík, objednávky, články) sú v localStorage prehliadača.

## Spustenie

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # produkčný build do dist/
npm run preview  # náhľad buildu
```

## Nasadenie

Ide o SPA so skutočnými URL, hosting preto musí všetky cesty presmerovať na `index.html`.
Pripravené sú `vercel.json` (Vercel) a `public/_redirects` (Netlify).

## Štruktúra

- `src/data.js` – produkty, ceny, FAQ, úvodné články, zloženie, výživové údaje, výdajné miesto
- `src/store.js` – košík, objednávky, články, výpočet zľavy
- `src/pages/` – stránky, `src/components/` – galéria, trojbalíček, vizuály
- `src/assets/` – výrezy plechoviek (WebP)

## Stránky

`/`, `/shop`, `/products/:slug`, `/trojbalicek`, `/cart`, `/checkout`, `/objednavka/:id`,
`/blog`, `/blog/:slug`, `/pribeh`, `/refill`, `/admin`

## Technické poznámky

- Platba prebieha pri osobnom odbere, web platobnú bránu nemá.
- Dáta (košík, objednávky, články) sa ukladajú do localStorage prehliadača.
- `/admin` nemá prihlásenie.

## Brand guidelines

Farby (Soft Oat, Charcoal, Matcha Sage, Peach Protein, Berry Breeze), IBM Plex Sans a logo sú prevzaté z manuálu.
Nadpisové písmo Boldfat Mighty je platené a v projekte nie je; nahrádza ho Titan One.

## Mobilná aplikácia

`mobile-app/index.html` – samostatný súbor, stačí ho otvoriť v prehliadači na počítači (dvojklik).
