import citrus from './assets/citrus-charge.webp'
import watermelon from './assets/watermelon-lime.webp'
import tropical from './assets/tropical.webp'
import berry from './assets/berry-blast.webp'

// Ceny držíme v centoch, aby sa vyhli chybám zaokrúhľovania.
export const PRICE = 420
export const BUNDLE_SIZE = 3
export const BUNDLE_DISCOUNT_PCT = 10
export const BUNDLE_ORIGINAL = PRICE * BUNDLE_SIZE
export const BUNDLE_PRICE = Math.round((BUNDLE_ORIGINAL * (100 - BUNDLE_DISCOUNT_PCT)) / 100)
export const MAX_QTY = 24

export const COLLECTION = 'RE:CAN Electrolytes'

export const products = [
  {
    slug: 'citrus-charge',
    ingredients:
      'Voda, pomarančová šťava z koncentrátu (12 %), citrónová šťava z koncentrátu (4 %), cukor, minerálne látky (citrát sodný, citrát draselný, citrát horečnatý), regulátor kyslosti: kyselina citrónová, prírodná aróma, vitamín C.',
    name: 'Citrus Charge',
    flavor: 'Pomaranč a citrón',
    character: 'Svieža citrusová chuť',
    short: 'Pomaranč s citrónom. Jasná, šťavnatá a priamočiara chuť.',
    description:
      'Citrus Charge stavia na dvojici, ktorú pozná každý: sladší pomaranč a ostrejší citrón. Je to najpriamejšia príchuť kolekcie – svieža, citrusová, bez zbytočných odbočiek.',
    moment: 'Hodí sa k ránu, k tréningu aj k dlhému dňu v škole.',
    img: citrus,
    color: '#f5921b',
    alt: '#ffc93c',
    soft: '#ffe6bf',
    on: '#1e1e1e',
    fruits: ['orange', 'lemon'],
  },
  {
    slug: 'watermelon-lime',
    ingredients:
      'Voda, šťava z vodného melóna z koncentrátu (12 %), limetková šťava z koncentrátu (4 %), cukor, minerálne látky (citrát sodný, citrát draselný, citrát horečnatý), regulátor kyslosti: kyselina citrónová, prírodná aróma, vitamín C.',
    name: 'Watermelon Lime',
    flavor: 'Vodný melón a limetka',
    character: 'Ľahká letná kombinácia',
    short: 'Vodný melón s limetkou. Ľahká chuť, ktorá pripomína leto.',
    description:
      'Watermelon Lime spája jemnú sladkosť vodného melóna s kyslejšou limetkou. Výsledkom je ľahká letná kombinácia, ktorá nepôsobí ťažko ani presladene.',
    moment: 'Hodí sa na ihrisko, na terasu a na teplé popoludnia.',
    img: watermelon,
    color: '#f25a63',
    alt: '#86c63f',
    soft: '#ffdcde',
    on: '#1e1e1e',
    fruits: ['watermelon', 'lime'],
  },
  {
    slug: 'tropical',
    ingredients:
      'Voda, mangové pyré (8 %), ananásová šťava z koncentrátu (5 %), šťava z marakuje z koncentrátu (3 %), cukor, minerálne látky (citrát sodný, citrát draselný, citrát horečnatý), regulátor kyslosti: kyselina citrónová, prírodná aróma, vitamín C.',
    name: 'Tropical',
    flavor: 'Mango, marakuja a ananás',
    character: 'Výrazná tropická ovocná chuť',
    short: 'Mango, marakuja a ananás. Najvýraznejšia ovocná chuť v ponuke.',
    description:
      'Tropical je najsýtejšia príchuť kolekcie. Mango dáva plnosť, marakuja kyslejší tón a ananás šťavnatý záver. Výrazná tropická ovocná chuť pre tých, ktorí chcú z plechovky cítiť ovocie na prvý dúšok.',
    moment: 'Hodí sa vtedy, keď chceš niečo výraznejšie než obyčajnú vodu.',
    img: tropical,
    color: '#f7ab1e',
    alt: '#ffd35c',
    soft: '#ffecbf',
    on: '#1e1e1e',
    fruits: ['mango', 'passion', 'pineapple'],
  },
  {
    slug: 'berry-blast',
    ingredients:
      'Voda, čučoriedková šťava z koncentrátu (7 %), malinová šťava z koncentrátu (5 %), šťava z čiernych ríbezlí z koncentrátu (4 %), cukor, minerálne látky (citrát sodný, citrát draselný, citrát horečnatý), regulátor kyslosti: kyselina citrónová, prírodná aróma, vitamín C.',
    name: 'Berry Blast',
    flavor: 'Čučoriedka, malina a čierna ríbezľa',
    character: 'Intenzívna kombinácia lesného ovocia',
    short: 'Čučoriedka, malina a čierna ríbezľa. Tmavšia a intenzívnejšia chuť.',
    description:
      'Berry Blast je intenzívna kombinácia lesného ovocia. Čučoriedka je základ, malina pridáva sladkokyslý tón a čierna ríbezľa hĺbku. Najtmavšia príchuť kolekcie.',
    moment: 'Hodí sa na večer po tréningu alebo k učeniu.',
    img: berry,
    color: '#3d49c9',
    alt: '#f26d75',
    soft: '#dfe2fb',
    on: '#f5f3ee',
    fruits: ['blueberry', 'raspberry', 'currant'],
  },
]

export const bySlug = (slug) => products.find((p) => p.slug === slug)

export const VOLUME = '500 ml'
export const nutrition = [
  { label: 'Energia', per100: '82 kJ / 19 kcal', perCan: '410 kJ / 97 kcal' },
  { label: 'Tuky', per100: '0 g', perCan: '0 g' },
  { label: 'Sacharidy', per100: '4,6 g', perCan: '23 g' },
  { label: 'z toho cukry', per100: '4,4 g', perCan: '22 g' },
  { label: 'Bielkoviny', per100: '0 g', perCan: '0 g' },
  { label: 'Soľ', per100: '0,12 g', perCan: '0,60 g' },
  { label: 'Draslík', per100: '30 mg', perCan: '150 mg' },
  { label: 'Horčík', per100: '12 mg', perCan: '60 mg' },
]
export const ALLERGENS = 'Neobsahuje alergény podľa nariadenia (EÚ) č. 1169/2011.'
export const STORAGE = 'Skladuj v chlade a suchu. Po otvorení spotrebuj do 24 hodín.'

export const pickupPoint = {
  name: 'RE:CAN Point',
  hours: 'Po – Pi 9:00 – 17:00',
  payment: 'Platba pri prevzatí, hotovosťou alebo kartou',
}

export const ORDER_STATUSES = ['Nová', 'Pripravuje sa', 'Pripravená na odber', 'Dokončená']

export const COVER_PRESETS = [
  { id: 'all', label: 'Všetky príchute' },
  ...products.map((p) => ({ id: p.slug, label: p.name })),
]

export const faq = [
  {
    q: 'Ako si vyzdvihnem objednávku?',
    a: 'Pri objednávke si vyberieš dátum osobného odberu. V zvolený deň si nákup prevezmeš na výdajnom mieste RE:CAN Point (Po – Pi 9:00 – 17:00). Stačí povedať číslo objednávky, ktoré uvidíš v potvrdení.',
  },
  {
    q: 'Ako funguje refill?',
    a: 'Keď dopiješ, plechovku nevyhadzuj. Prines ju pri ďalšom odbere späť, my ju skontrolujeme, vyčistíme, naplníme a nanovo uzavrieme. Za vrátenú plechovku máš zľavu na ďalšie naplnenie.',
  },
  {
    q: 'Kde nájdem zloženie a alergény?',
    a: 'Na detaile každého produktu v časti Zloženie a výživové údaje. Nájdeš tam zoznam zložiek, výživové hodnoty na 100 ml aj na celú plechovku a informáciu o alergénoch.',
  },
  {
    q: 'Ako a kedy platím?',
    a: 'Platíš až pri prevzatí na výdajnom mieste, hotovosťou alebo kartou. Pri objednávke na webe nezadávaš žiadne platobné údaje a osobný odber je zdarma.',
  },
]

export const seedArticles = [
  {
    slug: 'preco-sme-vytvorili-recan',
    title: 'Prečo sme vytvorili RE:CAN',
    category: 'Príbeh značky',
    date: '2026-10-20',
    cover: 'all',
    excerpt:
      'Chceli sme nápoj, ktorý chutí po ovocí, patrí k aktívnemu dňu a núti premýšľať, čo sa stane s plechovkou potom.',
    body: `RE:CAN vznikol z jednoduchej nespokojnosti. Väčšina nápojov, po ktorých siahame po tréningu alebo cez prestávku, je presladená a končí v jednorazovom obale. Položili sme si otázku: dá sa vymyslieť nápoj, pri ktorom obal nie je odpad na konci, ale súčasť príbehu od začiatku?

Začali sme tým, čo sami pijeme. Po tréningu, cez prestávku, pri učení. Väčšinou siahame po niečom ovocnom a studenom. Preto sú základom RE:CAN štyri ovocné príchute s elektrolytmi: Citrus Charge, Watermelon Lime, Tropical a Berry Blast.

Názov je slovná hračka. RE ako refill, recharge a reuse, CAN ako plechovka, ale aj ako „môžeš“. Dvojbodka medzi nimi je pauza: chvíľa, keď sa napiješ a rozhodneš sa, čo s obalom ďalej. Z toho vyšiel aj slogan Good drink. Second life.

Na etiketách je hráč v pohybe a oblúk ihriska. Nechceli sme značku pre profesionálnych športovcov, skôr pre ľudí, ktorí sa radi hýbu a majú svoje malé každodenné rituály.

Dnes si RE:CAN objednáš online a vyzdvihneš osobne. Prázdnu plechovku prinesieš späť a ďalšie naplnenie máš so zľavou. Tak si predstavujeme dobrý nápoj s druhým životom.`,
  },
  {
    slug: 'cerstvost-ma-svoj-ritual',
    title: 'Čerstvosť má svoj rituál',
    category: 'Životný štýl',
    date: '2026-10-28',
    cover: 'watermelon-lime',
    excerpt:
      'Otvorenie studenej plechovky je malý moment, ktorý vie rozdeliť deň na pred a po. Píšeme o tom, prečo nás bavia práve takéto drobné rituály.',
    body: `Každý má cez deň pár chvíľ, ktoré sa opakujú. Ranná káva, cesta do školy, rozcvička pred zápasom. Nie sú veľké, ale držia deň pokope. Keď sme rozmýšľali, kam RE:CAN patrí, vyšlo nám, že presne sem.

Studená plechovka má vlastný rituál. Vytiahneš ju z chladničky, na povrchu sa zrazí voda, ozve sa známe cvaknutie. Až potom príde chuť. Preto sú na našich vizuáloch kvapky a ovocie v pohybe: chceli sme zachytiť práve ten okamih pred prvým dúškom.

Štyri príchute sme navrhli tak, aby sa hodili k rôznym momentom. Citrus Charge je priamy a svieži. Watermelon Lime je ľahký a letný. Tropical je výrazný. Berry Blast je tmavší a intenzívnejší. Nie je to rebríček, skôr nálady.

K rituálu podľa nás patrí aj koniec. Prázdna plechovka zvyčajne skončí v koši bez toho, aby si to niekto všimol. V RE:CAN chceme, aby aj tento krok bol vedomý. O tom, ako to u nás funguje, píšeme v článku o refille.

Ak chceš vyskúšať viac nálad naraz, na webe si môžeš namiešať trojbalíček z troch rôznych príchutí. Aj to je spôsob, ako si nájsť vlastný rituál.`,
  },
  {
    slug: 'co-pre-nas-znamena-refill',
    title: 'Čo pre nás znamená refill',
    category: 'Refill',
    date: '2026-11-05',
    cover: 'berry-blast',
    excerpt:
      'Refill máme priamo na plechovke. Vysvetľujeme, ako u nás funguje a prečo sme okolo neho postavili celú značku.',
    body: `Slovo refill máme priamo na plechovke, tak je fér vysvetliť, čo ním myslíme. Nie je to slogan do počtu. Je to spôsob, akým RE:CAN funguje.

Má tri kroky. Vyberieš si nápoj. Vychutnáš si ho. Obal vrátiš. Tretí krok je ten, na ktorom nám záleží najviac, pretože práve tam sa bežne príbeh obalu končí.

Vrátenú plechovku skontrolujeme a vyčistíme. Potom ju naplníme príchuťou, ktorú si vyberieš, a tlakovým strojom zalisujeme nový vrchnák. Dostaneš čerstvo uzavretý nápoj v obale, ktorý si už raz držal v ruke.

Za každú vrátenú plechovku máš zľavu na ďalšie naplnenie. Refill tak šetrí nielen hliník, ale aj tvoju peňaženku. Zľavu ti odpočítame priamo pri osobnom odbere.

Veríme, že značka môže meniť návyky aj tým, ako o obale hovorí. Ak si pri RE:CAN položíš otázku „a čo s plechovkou?“, slogan Good drink. Second life. splnil svoj účel.`,
  },
]
