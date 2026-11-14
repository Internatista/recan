import { Link } from 'react-router-dom'
import { PageHead, Steps, refillSteps } from '../components/ui'
import { Cover } from '../components/Visuals'
import { pickupPoint } from '../data'
import { useSeo } from '../seo'

export function Story() {
  useSeo({
    title: 'Príbeh značky',
    description: 'Ako vznikol RE:CAN, čo znamená názov a prečo stavíme na ovocné chute, aktívny život a plechovky s druhým životom.',
  })
  return (
    <>
      <PageHead eyebrow="Príbeh značky" title="Prečo RE:CAN">
        Ovocné chute, aktívny život a plechovka, ktorá nekončí v koši.
      </PageHead>
      <div className="wrap narrow section-tight prose">
        <Cover cover="all" alt="Štyri plechovky RE:CAN vedľa seba" className="article-cover" />
        <h2>Ako značka vznikla</h2>
        <p>
          RE:CAN vznikol ako odpoveď na presladené, priemyselne vyrábané nápoje v jednorazových obaloch. Chceli sme funkčný
          ovocný drink, ktorý chutí po ovocí, a obal, ktorý sa po dopití vráti späť do obehu.
        </p>
        <h2>Čo spája</h2>
        <p>
          Tri veci, ktoré sú nám blízke. Ovocné chute, pretože po nich siahame najčastejšie. Aktívny život, pretože nápoj berieme
          na tréning, do školy aj von. A premýšľanie o obaloch, pretože najlepší obal je ten, ktorý netreba vyrobiť znova.
        </p>
        <h2>Čo znamená názov</h2>
        <p>
          <b>RE</b> je predpona troch slov z etikety: refill, recharge, reuse. <b>CAN</b> je plechovka, ale po anglicky aj
          „môžeš“. Dvojbodka medzi nimi je krátka pauza na rozhodnutie, čo s obalom ďalej.
        </p>
        <h2>Vízia a misia</h2>
        <p>
          Chceme byť značkou novej éry funkčných nápojov, v ktorej idú čerstvosť a udržateľnosť ruka v ruke. Našou misiou je
          prinášať ľuďom každodenný „recharge“ z kvalitných surovín a v cirkulárnom systéme Refill – Reuse – Recharge, ktorý šetrí
          prírodu aj peňaženku pri každom ďalšom naplnení.
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
        <p>
          <Link className="btn" to="/shop">
            Pozrieť príchute
          </Link>{' '}
          <Link className="btn btn-ghost" to="/refill">
            Ako funguje refill
          </Link>
        </p>
      </div>
    </>
  )
}

export function Refill() {
  useSeo({
    title: 'Refill – vráť plechovku, ďalšie naplnenie so zľavou',
    description: 'Prines prázdnu plechovku RE:CAN späť. Vyčistíme ju, naplníme, nanovo uzavrieme a ďalší nápoj máš so zľavou.',
  })
  return (
    <>
      <PageHead eyebrow="Refill" title="Vyber. Vychutnaj. Vráť.">
        Keď dopiješ, plechovku nevyhadzuj. Prines ju späť a ďalšie naplnenie máš so zľavou.
      </PageHead>
      <div className="wrap section-tight">
        <Steps items={refillSteps} />
      </div>
      <div className="wrap narrow section-tight">
        <div className="compare">
          <div>
            <h2>Čo získaš ty</h2>
            <ul>
              <li>Zľavu na každé ďalšie naplnenie vrátenej plechovky.</li>
              <li>Čerstvo naplnený a uzavretý nápoj.</li>
              <li>Menej odpadu doma aj v taške.</li>
            </ul>
          </div>
          <div>
            <h2>Čo robíme my</h2>
            <ul>
              <li>Vrátenú plechovku skontrolujeme a vyčistíme.</li>
              <li>Naplníme ju tvojou príchuťou.</li>
              <li>Zalisujeme nový vrchnák, aby bola opäť hermeticky uzavretá.</li>
            </ul>
          </div>
        </div>
        <div className="prose">
          <h2>Kde plechovku vrátiš</h2>
          <p>
            Prázdnu plechovku prines pri najbližšom osobnom odbere na výdajné miesto {pickupPoint.name} ({pickupPoint.hours}).
            Zľavu za refill ti odpočítame priamo pri prevzatí objednávky.
          </p>
          <h2>Prečo to robíme</h2>
          <p>
            Najlepší obal je ten, ktorý netreba vyrobiť znova. Hliníková plechovka je odolná a dá sa používať opakovane, preto
            sme okolo nej postavili celý systém Refill – Reuse – Recharge.
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
