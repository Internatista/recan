import { Link } from 'react-router-dom'
import { PageHead, Steps, refillSteps } from '../components/ui'
import { Cover } from '../components/Visuals'
import { pickupPoint } from '../data'
import { useSeo } from '../seo'

export function Story() {
  useSeo({
    title: 'Brand story',
    description: 'How RE:CAN started, what the name means and why we build on fruit flavours, an active life and cans with a second life.',
  })
  return (
    <>
      <PageHead eyebrow="Brand story" title="Why RE:CAN">
        Fruit flavours, an active life and a can that does not end up in the bin.
      </PageHead>
      <div className="wrap narrow section-tight prose">
        <Cover cover="all" alt="Four RE:CAN cans side by side" className="article-cover" />
        <h2>How the brand started</h2>
        <p>
          RE:CAN started as an answer to oversweetened, industrially produced drinks in single-use packaging. We wanted a
          functional fruit drink that actually tastes of fruit, and a can that goes back into circulation once it is empty.
        </p>
        <h2>What it brings together</h2>
        <p>
          Three things that matter to us. Fruit flavours, because that is what we reach for most often. An active life,
          because we take our drinks to training, to school and outdoors. And thinking about packaging, because the best
          packaging is the one that does not need to be made again.
        </p>
        <h2>What the name means</h2>
        <p>
          <b>RE</b> is the prefix of three words from the label: refill, recharge, reuse. <b>CAN</b> is the can, but also
          "you can". The colon between them is a short pause to decide what to do with the can next.
        </p>
        <h2>Vision and mission</h2>
        <p>
          We want to be a brand in a new era of functional drinks, where freshness and sustainability go hand in hand. Our
          mission is to give people an everyday "recharge" made from quality ingredients, within a circular Refill – Reuse –
          Recharge system that saves both nature and your wallet with every refill.
        </p>
        <h2>Slogans</h2>
        <ul>
          <li>
            <b>Good drink. Second life.</b> First the taste, then the can's second life. In that order.
          </li>
          <li>
            <b>Refill. Recharge. Reuse.</b> Fill up, get your energy back, use again. Three words printed on every can.
          </li>
        </ul>
        <p>
          <Link className="btn" to="/shop">
            See the flavours
          </Link>{' '}
          <Link className="btn btn-ghost" to="/refill">
            How refill works
          </Link>
        </p>
      </div>
    </>
  )
}

export function Refill() {
  useSeo({
    title: 'Refill – return your can, get your next refill discounted',
    description: 'Bring your empty RE:CAN can back. We clean it, refill it, seal it again and your next drink is discounted.',
  })
  return (
    <>
      <PageHead eyebrow="Refill" title="Choose. Enjoy. Return.">
        When you finish your drink, don't throw the can away. Bring it back and your next refill is discounted.
      </PageHead>
      <div className="wrap section-tight">
        <Steps items={refillSteps} />
      </div>
      <div className="wrap narrow section-tight">
        <div className="compare">
          <div>
            <h2>What you get</h2>
            <ul>
              <li>A discount on every refill of a returned can.</li>
              <li>A freshly filled and sealed drink.</li>
              <li>Less waste at home and in your bag.</li>
            </ul>
          </div>
          <div>
            <h2>What we do</h2>
            <ul>
              <li>We check and clean the returned can.</li>
              <li>We fill it with your chosen flavour.</li>
              <li>We press on a new lid so it is hermetically sealed again.</li>
            </ul>
          </div>
        </div>
        <div className="prose">
          <h2>Where to return your can</h2>
          <p>
            Bring your empty can with your next pickup to the {pickupPoint.name} pickup point ({pickupPoint.hours}). We deduct
            the refill discount right when you collect your order.
          </p>
          <h2>Why we do it</h2>
          <p>
            The best packaging is the one that does not need to be made again. An aluminium can is durable and can be used
            again and again, so we built the whole Refill – Reuse – Recharge system around it.
          </p>
          <p>
            <Link className="text-link" to="/blog/what-refill-means-to-us">
              Article: What refill means to us →
            </Link>
          </p>
        </div>
      </div>
    </>
  )
}
