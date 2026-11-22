import citrus from './assets/citrus-charge.webp'
import watermelon from './assets/watermelon-lime.webp'
import tropical from './assets/tropical.webp'
import berry from './assets/berry-blast.webp'
import coco from './assets/coco-mint-lime.webp'
import cocoVisual from './assets/coco-mint-lime-visual.webp'
import grapefruit from './assets/pink-grapefruit.webp'
import grapefruitVisual from './assets/pink-grapefruit-visual.webp'
import peach from './assets/peach-apricot.webp'
import peachVisual from './assets/peach-apricot-visual.webp'
import grape from './assets/grape-blackberry.webp'
import grapeVisual from './assets/grape-blackberry-visual.webp'
import cherry from './assets/cherry-pomegranate.webp'
import cherryVisual from './assets/cherry-pomegranate-visual.webp'
import apple from './assets/green-apple-kiwi.webp'
import appleVisual from './assets/green-apple-kiwi-visual.webp'

// Prices are kept in cents to avoid rounding errors.
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
    categories: ['vitamin', 'citrus'],
    ingredients:
      'Water, orange juice from concentrate (12%), lemon juice from concentrate (4%), sugar, minerals (sodium citrate, potassium citrate, magnesium citrate), acidity regulator: citric acid, natural flavouring, vitamin C, niacin (B3), vitamin B6, vitamin B12.',
    name: 'Citrus Charge',
    flavor: 'Orange and lemon',
    character: 'A fresh citrus taste',
    short: 'Orange with lemon. A bright, juicy and straightforward taste.',
    description:
      'Citrus Charge is built on a pair everyone knows: sweeter orange and sharper lemon. It is the most straightforward flavour in the collection – fresh, citrusy, no detours.',
    moment: 'Great for mornings, training sessions and long days at school.',
    img: citrus,
    color: '#f5921b',
    alt: '#ffc93c',
    soft: '#ffe6bf',
    on: '#1e1e1e',
    fruits: ['orange', 'lemon'],
  },
  {
    slug: 'watermelon-lime',
    categories: ['vitamin', 'summer', 'fresh'],
    ingredients:
      'Water, watermelon juice from concentrate (12%), lime juice from concentrate (4%), sugar, minerals (sodium citrate, potassium citrate, magnesium citrate), acidity regulator: citric acid, natural flavouring, vitamin C, niacin (B3), vitamin B6, vitamin B12.',
    name: 'Watermelon Lime',
    flavor: 'Watermelon and lime',
    character: 'A light summer combination',
    short: 'Watermelon with lime. A light taste that reminds you of summer.',
    description:
      'Watermelon Lime combines the gentle sweetness of watermelon with tangier lime. The result is a light summer combination that never feels heavy or too sweet.',
    moment: 'Great for the pitch, the terrace and warm afternoons.',
    img: watermelon,
    color: '#f25a63',
    alt: '#86c63f',
    soft: '#ffdcde',
    on: '#1e1e1e',
    fruits: ['watermelon', 'lime'],
  },
  {
    slug: 'tropical',
    categories: ['vitamin', 'summer'],
    ingredients:
      'Water, mango purée (8%), pineapple juice from concentrate (5%), passion fruit juice from concentrate (3%), sugar, minerals (sodium citrate, potassium citrate, magnesium citrate), acidity regulator: citric acid, natural flavouring, vitamin C, niacin (B3), vitamin B6, vitamin B12.',
    name: 'Tropical',
    flavor: 'Mango, passion fruit and pineapple',
    character: 'A bold tropical fruit taste',
    short: 'Mango, passion fruit and pineapple. The boldest fruit taste in the range.',
    description:
      'Tropical is the richest flavour in the collection. Mango brings body, passion fruit a tangier note and pineapple a juicy finish. A bold tropical fruit taste for those who want to taste the fruit from the very first sip.',
    moment: 'Great when you want something bolder than plain water.',
    img: tropical,
    color: '#f7ab1e',
    alt: '#ffd35c',
    soft: '#ffecbf',
    on: '#1e1e1e',
    fruits: ['mango', 'passion', 'pineapple'],
  },
  {
    slug: 'berry-blast',
    categories: ['vitamin', 'berry'],
    ingredients:
      'Water, blueberry juice from concentrate (7%), raspberry juice from concentrate (5%), blackcurrant juice from concentrate (4%), sugar, minerals (sodium citrate, potassium citrate, magnesium citrate), acidity regulator: citric acid, natural flavouring, vitamin C, niacin (B3), vitamin B6, vitamin B12.',
    name: 'Berry Blast',
    flavor: 'Blueberry, raspberry and blackcurrant',
    character: 'An intense mix of forest berries',
    short: 'Blueberry, raspberry and blackcurrant. A darker, more intense taste.',
    description:
      'Berry Blast is an intense mix of forest berries. Blueberry is the base, raspberry adds a sweet-and-sour note and blackcurrant brings depth. The darkest flavour in the collection.',
    moment: 'Great for evenings after training or for studying.',
    img: berry,
    color: '#3d49c9',
    alt: '#f26d75',
    soft: '#dfe2fb',
    on: '#f5f3ee',
    fruits: ['blueberry', 'raspberry', 'currant'],
  },
  {
    slug: 'coco-mint-lime',
    categories: ['vitamin', 'summer', 'fresh'],
    ingredients:
      'Water, coconut water from concentrate (10%), lime juice from concentrate (4%), sugar, mint extract, minerals (sodium citrate, potassium citrate, magnesium citrate), acidity regulator: citric acid, natural flavouring, vitamin C, niacin (B3), vitamin B6, vitamin B12.',
    name: 'Coco Mint Lime',
    flavor: 'Coconut, lime and mint',
    character: 'A cool, refreshing combination',
    short: 'Coconut with lime and a touch of mint. Cool and refreshing.',
    description:
      'Coco Mint Lime pairs the soft sweetness of coconut with zesty lime and a cool finish of mint. The most refreshing flavour in the collection, with added vitamins B3, B6 and B12.',
    moment: 'Great for hot days, long rallies and cooling down after training.',
    img: coco,
    visual: cocoVisual,
    color: '#4fc0bd',
    alt: '#9edcc4',
    soft: '#d6f1ef',
    on: '#1e1e1e',
    fruits: ['coconut', 'lime', 'mint'],
  },
  {
    slug: 'pink-grapefruit',
    categories: ['vitamin', 'citrus'],
    ingredients:
      'Water, pink grapefruit juice from concentrate (10%), blood orange juice from concentrate (5%), sugar, minerals (sodium citrate, potassium citrate, magnesium citrate), acidity regulator: citric acid, natural flavouring, vitamin C, niacin (B3), vitamin B6, vitamin B12.',
    name: 'Pink Grapefruit',
    flavor: 'Grapefruit and blood orange',
    character: 'A sharp, zesty citrus taste',
    short: 'Pink grapefruit with blood orange. Sharp, zesty and a little bitter.',
    description:
      'Pink Grapefruit combines tangy grapefruit with the deeper sweetness of blood orange. A sharper citrus flavour than Citrus Charge, with a pleasantly bitter finish and added vitamins B3, B6 and B12.',
    moment: 'Great after training and whenever you want something less sweet.',
    img: grapefruit,
    visual: grapefruitVisual,
    color: '#f26b5b',
    alt: '#f7a85c',
    soft: '#ffdcd5',
    on: '#1e1e1e',
    fruits: ['grapefruit', 'bloodorange'],
  },
  {
    slug: 'peach-apricot',
    categories: ['vitamin', 'summer'],
    ingredients:
      'Water, peach purée (8%), apricot purée (5%), sugar, minerals (sodium citrate, potassium citrate, magnesium citrate), acidity regulator: citric acid, natural flavouring, vitamin C, niacin (B3), vitamin B6, vitamin B12.',
    name: 'Peach Apricot',
    flavor: 'Peach and apricot',
    character: 'A smooth, mellow fruit taste',
    short: 'Peach with apricot. Smooth, soft and easy to drink.',
    description:
      'Peach Apricot brings together juicy peach and sweet apricot. It is the softest and smoothest flavour in the collection, with added vitamins B3, B6 and B12.',
    moment: 'Great for long days, lectures and everything in between.',
    img: peach,
    visual: peachVisual,
    color: '#f0916a',
    alt: '#f6c587',
    soft: '#ffe3d3',
    on: '#1e1e1e',
    fruits: ['peach', 'apricot'],
  },
  {
    slug: 'grape-blackberry',
    categories: ['vitamin', 'berry'],
    ingredients:
      'Water, red grape juice from concentrate (10%), blackberry juice from concentrate (5%), sugar, minerals (sodium citrate, potassium citrate, magnesium citrate), acidity regulator: citric acid, natural flavouring, vitamin C, niacin (B3), vitamin B6, vitamin B12.',
    name: 'Grape Blackberry',
    flavor: 'Grape and blackberry',
    character: 'A deep, juicy berry taste',
    short: 'Grape with blackberry. Deep, juicy and full of flavour.',
    description:
      'Grape Blackberry combines sweet red grape with the tangy depth of blackberry. A rich, dark flavour with added vitamins B3, B6 and B12.',
    moment: 'Great for intense training sessions and evening matches.',
    img: grape,
    visual: grapeVisual,
    color: '#6a3fb8',
    alt: '#a650b8',
    soft: '#e7ddf7',
    on: '#f5f3ee',
    fruits: ['grape', 'blackberry'],
  },
  {
    slug: 'cherry-pomegranate',
    categories: ['vitamin', 'berry'],
    ingredients:
      'Water, sour cherry juice from concentrate (8%), pomegranate juice from concentrate (6%), sugar, minerals (sodium citrate, potassium citrate, magnesium citrate), acidity regulator: citric acid, natural flavouring, vitamin C, niacin (B3), vitamin B6, vitamin B12.',
    name: 'Cherry Pomegranate',
    flavor: 'Cherry and pomegranate',
    character: 'A bold, sweet-and-sour taste',
    short: 'Cherry with pomegranate. Bold, sweet-and-sour and intense.',
    description:
      'Cherry Pomegranate pairs ripe cherry with tart pomegranate. A bold, sweet-and-sour flavour with added vitamins B3, B6 and B12.',
    moment: 'Great when you need a bold taste for a long day.',
    img: cherry,
    visual: cherryVisual,
    color: '#b8204b',
    alt: '#f08f8a',
    soft: '#f8d6de',
    on: '#f5f3ee',
    fruits: ['cherry', 'pomegranate'],
  },
  {
    slug: 'green-apple-kiwi',
    categories: ['vitamin', 'fresh'],
    ingredients:
      'Water, green apple juice from concentrate (10%), kiwi purée (4%), sugar, minerals (sodium citrate, potassium citrate, magnesium citrate), acidity regulator: citric acid, natural flavouring, vitamin C, niacin (B3), vitamin B6, vitamin B12.',
    name: 'Green Apple Kiwi',
    flavor: 'Green apple and kiwi',
    character: 'A crisp, fresh fruit taste',
    short: 'Green apple with kiwi. Crisp, fresh and slightly tart.',
    description:
      'Green Apple Kiwi combines crisp green apple with fresh, slightly tart kiwi. A clean, bright flavour with added vitamins B3, B6 and B12.',
    moment: 'Great for focused study sessions and morning training.',
    img: apple,
    visual: appleVisual,
    color: '#2faa72',
    alt: '#a6dfbd',
    soft: '#d5f0e2',
    on: '#1e1e1e',
    fruits: ['apple', 'kiwi'],
  },
]

export const CATEGORIES = [
  { id: 'vitamin', label: 'Vitamin', description: 'Every RE:CAN flavour contains vitamins B3, B6 and B12.' },
  { id: 'summer', label: 'Summer', description: 'Light, fruity flavours for warm days.' },
  { id: 'citrus', label: 'Citrus', description: 'Fresh and zesty citrus flavours.' },
  { id: 'berry', label: 'Berries & dark fruit', description: 'Deeper, more intense fruit flavours.' },
  { id: 'fresh', label: 'Fresh & crisp', description: 'Cool, clean and refreshing.' },
]
export const categoryById = (id) => CATEGORIES.find((c) => c.id === id)

export const bySlug = (slug) => products.find((p) => p.slug === slug)

export const VOLUME = '500 ml'
export const nutrition = [
  { label: 'Energy', per100: '82 kJ / 19 kcal', perCan: '410 kJ / 97 kcal' },
  { label: 'Fat', per100: '0 g', perCan: '0 g' },
  { label: 'Carbohydrates', per100: '4.6 g', perCan: '23 g' },
  { label: 'of which sugars', per100: '4.4 g', perCan: '22 g' },
  { label: 'Protein', per100: '0 g', perCan: '0 g' },
  { label: 'Salt', per100: '0.12 g', perCan: '0.60 g' },
  { label: 'Potassium', per100: '30 mg', perCan: '150 mg' },
  { label: 'Magnesium', per100: '12 mg', perCan: '60 mg' },
  { label: 'Niacin (B3)', per100: '1.6 mg (10% RI)', perCan: '8 mg (50% RI)' },
  { label: 'Vitamin B6', per100: '0.14 mg (10% RI)', perCan: '0.7 mg (50% RI)' },
  { label: 'Vitamin B12', per100: '0.25 µg (10% RI)', perCan: '1.25 µg (50% RI)' },
]
export const ALLERGENS = 'Contains no allergens under Regulation (EU) No 1169/2011.'
export const STORAGE = 'Store in a cool, dry place. Once opened, consume within 24 hours.'

export const pickupPoint = {
  name: 'RE:CAN Point',
  hours: 'Mon – Fri 9:00 – 17:00',
  payment: 'Pay on collection, in cash or by card',
}

export const ORDER_STATUSES = ['New', 'Being prepared', 'Ready for pickup', 'Completed']

export const COVER_PRESETS = [
  { id: 'all', label: 'All flavours' },
  ...products.map((p) => ({ id: p.slug, label: p.name })),
]

export const faq = [
  {
    q: 'How do I collect my order?',
    a: 'When ordering, you choose a pickup date. On that day, collect your order at the RE:CAN Point pickup location (Mon – Fri 9:00 – 17:00). Just give us the order number shown in your confirmation.',
  },
  {
    q: 'How does refill work?',
    a: "When you finish your drink, don't throw the can away. Bring it back with your next pickup and we will check it, clean it, refill it and seal it again. Every returned can gets you a discount on your next refill.",
  },
  {
    q: 'Where can I find the ingredients and allergens?',
    a: 'On each product page, in the Ingredients and nutrition section. You will find the full ingredient list, nutrition values per 100 ml and per can, and allergen information.',
  },
  {
    q: 'How and when do I pay?',
    a: 'You pay only when you collect your order at the pickup point, in cash or by card. You do not enter any payment details when ordering online, and pickup is free.',
  },
]

export const seedArticles = [
  {
    slug: 'why-we-created-recan',
    title: 'Why we created RE:CAN',
    category: 'Brand story',
    date: '2026-10-20',
    cover: 'all',
    excerpt:
      'We wanted a drink that tastes of fruit, belongs to an active day and makes you think about what happens to the can afterwards.',
    body: `RE:CAN was born out of a simple frustration. Most drinks we reach for after training or during a break are oversweetened and end up in single-use packaging. So we asked ourselves: can we create a drink where the packaging is not waste at the end, but part of the story from the very beginning?

We started with what we drink ourselves. After training, during breaks, while studying. Most of the time we reach for something fruity and cold. That is why RE:CAN is built on ten fruit flavours with electrolytes, from Citrus Charge and Watermelon Lime to Coco Mint Lime and Green Apple Kiwi.

The name is a play on words. RE as in refill, recharge and reuse, CAN as in a can, but also as in "you can". The colon between them is a pause: the moment you take a sip and decide what to do with the can next. That is also where our slogan Good drink. Second life. comes from.

The labels show a player in motion and the curve of a court. We did not want a brand for professional athletes, but for people who like to move and have their own small everyday rituals.

Today you order RE:CAN online and collect it in person. You bring the empty can back and get your next refill at a discount. That is how we imagine a good drink with a second life.`,
  },
  {
    slug: 'freshness-has-its-ritual',
    title: 'Freshness has its ritual',
    category: 'Lifestyle',
    date: '2026-10-28',
    cover: 'watermelon-lime',
    excerpt:
      'Opening a cold can is a small moment that can split a day into before and after. We write about why we love these little rituals.',
    body: `Everyone has a few moments in the day that repeat. Morning coffee, the commute to school, the warm-up before a match. They are not big, but they hold the day together. When we were thinking about where RE:CAN belongs, the answer was right here.

A cold can has its own ritual. You take it out of the fridge, water condenses on the surface, you hear the familiar click. Only then comes the taste. That is why our visuals show droplets and fruit in motion: we wanted to capture exactly that moment before the first sip.

We designed our flavours to suit different moments. Citrus Charge is direct and fresh. Watermelon Lime is light and summery. Coco Mint Lime is cool. Berry Blast and Grape Blackberry are darker and more intense. It is not a ranking, more a set of moods.

We believe the end is part of the ritual too. An empty can usually ends up in the bin without anyone noticing. At RE:CAN we want this step to be a conscious one. We explain how it works in our article about refill.

If you want to try several moods at once, you can build your own three-pack of three different flavours on our website. That is another way to find your own ritual.`,
  },
  {
    slug: 'what-refill-means-to-us',
    title: 'What refill means to us',
    category: 'Refill',
    date: '2026-11-05',
    cover: 'berry-blast',
    excerpt:
      'Refill is printed right on our can. We explain how it works and why we built the whole brand around it.',
    body: `The word refill is printed right on our can, so it is only fair to explain what we mean by it. It is not just a slogan. It is the way RE:CAN works.

There are three steps. You choose a drink. You enjoy it. You return the can. The third step is the one we care about most, because that is usually where the story of the packaging ends.

We check and clean every returned can. Then we fill it with the flavour you choose and use a pressure machine to seal it with a new lid. You get a freshly sealed drink in a can you have already held in your hand once.

Every returned can gets you a discount on your next refill. That way refill saves not only aluminium, but your wallet too. We deduct the discount right at pickup.

We believe a brand can change habits through the way it talks about packaging. If RE:CAN makes you ask "and what about the can?", the slogan Good drink. Second life. has done its job.`,
  },
]
