import { Link } from 'react-router-dom'
import { PageHead, Steps, refillSteps } from '../components/ui'
import { Cover } from '../components/Visuals'

export function Story() {
  return (
    <>
      <PageHead eyebrow="Príbeh značky" title="Prečo RE:CAN">
        Školský projekt, ktorý spája ovocné chute, aktívny život a premýšľanie o obaloch.
      </PageHead>
      <div className="wrap narrow section-tight prose">
        <Cover cover="all" alt="Štyri plechovky RE:CAN vedľa seba" className="article-cover" />
        <h2>Ako značka vznikla</h2>
        <p>
          RE:CAN vznikol v rámci školského projektu, ktorý prepája elektronické obchodovanie a marketing. Úlohou bolo navrhnúť
          značku a postaviť k nej e-shop. Nie je za tým firma ani výroba, je to koncept.
        </p>
        <h2>Čo spája</h2>
        <p>
          Tri veci, ktoré sú nám blízke. Ovocné chute, pretože po nich siahame najčastejšie. Aktívny život, pretože nápoj berieme
          na tréning, do školy aj von. A premýšľanie o obaloch, pretože plechovka sa zvyčajne končí v koši a nikto sa nad tým
          nepozastaví.
        </p>
        <h2>Čo znamená názov</h2>
        <p>
          <b>RE</b> je predpona troch slov z etikety: refill, recharge, reuse. <b>CAN</b> je plechovka, ale po anglicky aj
          „môžeš“. Dvojbodka medzi nimi je krátka pauza na rozhodnutie, čo s obalom ďalej.
        </p>
        <h2>Slogany</h2>
        <ul>
          <li>
            <b>Good drink. Second life.</b> Najprv chuť, potom druhý život obalu. V tomto poradí.
          </li>
          <li>
            <b>Refill. Recharge. Reuse.</b> Doplniť, nabrať silu, znovu využiť. Tri slová, ktoré sú na každej plechovke.
          </li>
        </ul>
        <p className="note">
          RE:CAN je koncept. Nápoje sa nevyrábajú ani nepredávajú a tento web je prototyp bez reálnych platieb.
        </p>
        <p>
          <Link className="btn" to="/shop">
            Pozrieť príchute
          </Link>{' '}
          <Link className="btn btn-ghost" to="/refill">
            Refill koncept
          </Link>
        </p>
      </div>
    </>
  )
}

export function Refill() {
  return (
    <>
      <PageHead eyebrow="Refill koncept" title="Vyber. Vychutnaj. Vráť.">
        Náš návrh, ako by obal mohol dostať druhý život. Zatiaľ iba na papieri.
      </PageHead>
      <div className="wrap section-tight">
        <Steps items={refillSteps} />
      </div>
      <div className="wrap narrow section-tight">
        <div className="compare">
          <div>
            <h2>Čo je koncept</h2>
            <ul>
              <li>Myšlienka vrátenia obalu po vypití nápoja.</li>
              <li>Tri kroky: výber nápoja, vychutnanie, návrat obalu.</li>
              <li>Komunikácia značky, ktorá na obal upozorňuje.</li>
            </ul>
          </div>
          <div>
            <h2>Čo nie je realita</h2>
            <ul>
              <li>Neexistuje zberné ani odberné miesto.</li>
              <li>Obaly sa reálne nezbierajú ani znovu neplnia.</li>
              <li>Nemáme žiadne namerané výsledky ani čísla o ušetrenom odpade.</li>
            </ul>
          </div>
        </div>
        <div className="prose">
          <h2>Čo by bolo treba overiť</h2>
          <p>
            Netvrdíme, že bežnú nápojovú plechovku možno bezpečne opakovane plniť. Na to nemáme overené podklady. Kým by refill
            mohol fungovať, bolo by treba vyriešiť, aký obal je na opätovné použitie vhodný, ako by sa čistil a kontroloval, kde by
            ho zákazník vracal a aké hygienické a právne pravidlá sa na to vzťahujú.
          </p>
          <p>
            „Druhý život“ preto zatiaľ chápeme široko: ako opätovné použitie tam, kde je bezpečné, alebo ako vrátenie materiálu do
            obehu. Ktorá cesta dáva zmysel, je otázka pre ďalšiu fázu projektu.
          </p>
          <p>
            <Link className="text-link" to="/blog/co-pre-nas-znamena-refill">
              Článok: Čo pre nás znamená refill →
            </Link>
          </p>
        </div>
      </div>
    </>
  )
}
