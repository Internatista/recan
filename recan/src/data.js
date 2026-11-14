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

// Rozlišujeme doložené údaje (z etikiet a zadania) od modelových a nedoplnených.
export const productFacts = [
  { label: 'Kolekcia', value: COLLECTION, status: 'doložené' },
  { label: 'Označenie na etikete', value: 'Electrolytes', status: 'doložené' },
  { label: 'Cena', value: '4,20 € za kus', status: 'modelové' },
  { label: 'Objem', value: 'Nedoplnené', status: 'nedoplnené' },
  { label: 'Presné zloženie', value: 'Nedoplnené', status: 'nedoplnené' },
  { label: 'Množstvo elektrolytov', value: 'Nedoplnené', status: 'nedoplnené' },
  { label: 'Výživové hodnoty', value: 'Nedoplnené', status: 'nedoplnené' },
  { label: 'Alergény', value: 'Nedoplnené', status: 'nedoplnené' },
]

export const ORDER_STATUSES = ['Nová', 'Pripravuje sa', 'Pripravená na odber', 'Dokončená']

export const COVER_PRESETS = [
  { id: 'all', label: 'Všetky príchute' },
  ...products.map((p) => ({ id: p.slug, label: p.name })),
]

export const faq = [
  {
    q: 'Ako si vyzdvihnem objednávku?',
    a: 'Pri objednávke si vyberieš dátum osobného odberu. V tomto školskom prototype je odber iba modelový: neexistuje reálna prevádzka ani adresa, na ktorej by na teba objednávka čakala. Po odoslaní uvidíš potvrdenie s číslom objednávky a zvoleným termínom.',
  },
  {
    q: 'Ako funguje refill?',
    a: 'Refill je zatiaľ návrh, nie spustená služba. Myšlienka je jednoduchá: vyberieš si nápoj, vychutnáš si ho a obal vrátiš, aby dostal druhý život. Ako presne by vrátenie a ďalšie využitie obalu prebiehalo, v praxi overené nie je.',
  },
  {
    q: 'Kde nájdem zloženie a alergény?',
    a: 'Na detaile každého produktu v časti Zloženie a výživové údaje. Presné zloženie, výživové hodnoty a alergény v podkladoch školského konceptu zatiaľ nie sú, preto sú tam označené ako nedoplnené. Nič si nedomýšľame.',
  },
  {
    q: 'Bude mi účtovaná skutočná platba?',
    a: 'Nie. Ide o školský demo nákup bez platobnej brány. Nikde nezadávaš údaje o karte a nič sa neúčtuje. Do formulára prosím zadávaj fiktívne údaje.',
  },
]

export const demoContact = {
  email: 'ahoj@recan.example',
  instagram: '@recan.demo',
  pickup: 'Modelové odberné miesto (bez reálnej adresy)',
}

export const seedArticles = [
  {
    slug: 'preco-sme-vytvorili-recan',
    title: 'Prečo sme vytvorili RE:CAN',
    category: 'Príbeh značky',
    date: '2026-10-20',
    cover: 'all',
    excerpt:
      'RE:CAN vznikol ako školský projekt. Chceli sme nápoj, ktorý chutí po ovocí, patrí k aktívnemu dňu a núti premýšľať, čo sa stane s plechovkou potom.',
    body: `RE:CAN vznikol v škole, v rámci projektu, ktorý prepája elektronické obchodovanie a marketing. Zadanie bolo navrhnúť značku a e-shop. My sme si k tomu pridali vlastnú otázku: dá sa vymyslieť nápoj, pri ktorom obal nie je len odpad na konci, ale súčasť príbehu od začiatku?

Začali sme tým, čo sami pijeme. Po tréningu, cez prestávku, pri učení. Väčšinou siahame po niečom ovocnom a studenom. Preto sú základom RE:CAN štyri ovocné príchute s označením Electrolytes: Citrus Charge, Watermelon Lime, Tropical a Berry Blast.

Názov je slovná hračka. RE ako refill, recharge a reuse, CAN ako plechovka, ale aj ako „môžeš“. Dvojbodka medzi nimi je pauza: chvíľa, keď sa napiješ a rozhodneš sa, čo s obalom ďalej. Z toho vyšiel aj slogan Good drink. Second life.

Na etiketách je hráč v pohybe a oblúk ihriska. Nechceli sme značku pre profesionálnych športovcov, skôr pre ľudí, ktorí sa radi hýbu a majú svoje malé každodenné rituály.

Treba povedať aj to, čím RE:CAN nie je. Nie je to hotový produkt v obchodoch. Je to koncept a tento web je prototyp. Receptúru, výživové údaje ani refill proces overené nemáme, a tak o nich netvrdíme nič, čo nevieme doložiť.`,
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

K rituálu podľa nás patrí aj koniec. Prázdna plechovka zvyčajne skončí v koši bez toho, aby si to niekto všimol. V RE:CAN chceme, aby aj tento krok bol vedomý. O tom, ako si to predstavujeme, píšeme v článku o refille.

Ak chceš vyskúšať viac nálad naraz, na webe si môžeš namiešať trojbalíček z troch rôznych príchutí. Aj to je spôsob, ako si nájsť vlastný rituál.`,
  },
  {
    slug: 'co-pre-nas-znamena-refill',
    title: 'Čo pre nás znamená refill',
    category: 'Refill koncept',
    date: '2026-11-05',
    cover: 'berry-blast',
    excerpt:
      'Refill je v RE:CAN zatiaľ myšlienka, nie služba. Vysvetľujeme, ako si ju predstavujeme a čo všetko by sme museli overiť, kým by mohla fungovať.',
    body: `Slovo refill máme priamo na plechovke, tak je fér vysvetliť, čo ním myslíme. A rovnako fér je povedať hneď na začiatku: je to návrh. Žiadnu refill prevádzku nemáme a nič z toho, čo opisujeme, sme v praxi netestovali.

Predstava má tri kroky. Vyberieš si nápoj. Vychutnáš si ho. Obal vrátiš. Tretí krok je ten, na ktorom nám záleží najviac, pretože práve tam sa bežne príbeh obalu končí.

Čo sa s vráteným obalom stane ďalej, je otvorená otázka. Druhý život môže znamenať rôzne veci: opätovné použitie tam, kde je to bezpečné a technicky možné, alebo vrátenie materiálu späť do obehu. Netvrdíme, že bežnú nápojovú plechovku možno bezpečne znova naplniť. Na také tvrdenie nemáme podklady.

Keby mal koncept prejsť do reality, potrebovali by sme odpovede na viac otázok. Aký obal je na to vhodný? Kto a ako ho čistí a kontroluje? Kde ho zákazník vráti a čo ho k tomu motivuje? Čo na to hovoria hygienické a právne predpisy? To sú úlohy pre ďalšiu fázu, nie pre školský prototyp.

Prečo o tom teda píšeme už teraz? Pretože značka môže meniť návyky aj tým, ako o obale hovorí. Ak si pri RE:CAN čo i len na chvíľu položíš otázku „a čo s plechovkou?“, slogan Good drink. Second life. splnil svoj prvý účel.`,
  },
]
