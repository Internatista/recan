# RE:CAN – školský prototyp e-shopu

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

- `src/data.js` – produkty, ceny, FAQ, úvodné články, stav údajov (doložené / modelové / nedoplnené)
- `src/store.js` – košík, objednávky, články, výpočet zľavy
- `src/pages/` – stránky, `src/components/` – galéria, trojbalíček, vizuály
- `src/assets/` – výrezy plechoviek (WebP)

## Stránky

`/`, `/shop`, `/products/:slug`, `/trojbalicek`, `/cart`, `/checkout`, `/objednavka/:id`,
`/blog`, `/blog/:slug`, `/pribeh`, `/refill`, `/admin`

## Demo obmedzenia

- Žiadna platba, e-mail ani reálny odber.
- `/admin` je otvorený demo editor, nie zabezpečené prihlásenie. Dáta sú len v danom prehliadači.
- Objem, zloženie, výživové údaje a alergény sú označené ako nedoplnené.
- Druhý obrázok v galérii je modelový vizuál poskladaný z výrezu plechovky a kresleného ovocia.

## Brand guidelines

Farby (Soft Oat, Charcoal, Matcha Sage, Peach Protein, Berry Breeze), IBM Plex Sans a logo sú prevzaté z manuálu.
Nadpisové písmo Boldfat Mighty je platené a v projekte nie je; nahrádza ho Titan One.

## Prototyp mobilnej aplikácie

`mobile-app/index.html` – samostatný súbor, stačí ho otvoriť v prehliadači na počítači (dvojklik).
