import { Link, useParams } from 'react-router-dom'
import { useStore, articlesStore, sortedArticles, formatDate } from '../store'
import { ArticleCard, PageHead, NotFound } from '../components/ui'
import { Cover } from '../components/Visuals'
import { useSeo } from '../seo'

export function Blog() {
  const articles = sortedArticles(useStore(articlesStore))
  useSeo({
    title: 'Blog – drinks, rituals and refill',
    description: 'RE:CAN articles about our brand story, everyday rituals and how can refill works.',
  })
  return (
    <>
      <PageHead eyebrow="Blog" title="Reading with your can">
        About the brand, small rituals and what we mean by the word refill.
      </PageHead>
      <div className="wrap section-tight">
        {articles.length ? (
          <div className="article-grid">
            {articles.map((a) => (
              <ArticleCard key={a.slug} a={a} />
            ))}
          </div>
        ) : (
          <div className="empty-inline">
            <p>New articles are on the way.</p>
            <Link className="btn btn-ghost" to="/shop">
              Go to shop
            </Link>
          </div>
        )}
      </div>
    </>
  )
}

export function Article() {
  const { slug } = useParams()
  const a = useStore(articlesStore).find((x) => x.slug === slug)
  useSeo(
    a
      ? {
          title: a.title,
          description: a.excerpt,
          jsonLd: {
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: a.title,
            description: a.excerpt,
            datePublished: a.date,
            articleSection: a.category,
            publisher: { '@type': 'Organization', name: 'RE:CAN' },
          },
        }
      : { title: 'Article not found', noindex: true },
  )
  if (!a) return <NotFound title="Article not found" text="It may have been moved or removed." />

  // Editor text is rendered as plain text split into paragraphs, never as HTML.
  const paragraphs = String(a.body || '')
    .split(/\n\s*\n/)
    .map((s) => s.trim())
    .filter(Boolean)

  return (
    <article className="article wrap narrow">
      <Link className="text-link" to="/blog">
        ← Back to articles
      </Link>
      <p className="eyebrow">
        {a.category} · <time dateTime={a.date}>{formatDate(a.date)}</time>
      </p>
      <h1>{a.title}</h1>
      {a.excerpt && <p className="lead">{a.excerpt}</p>}
      <Cover cover={a.cover} alt={`Cover image for ${a.title}`} className="article-cover" />
      <div className="prose">
        {paragraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
      <Link className="btn btn-ghost" to="/blog">
        ← Back to articles
      </Link>
    </article>
  )
}
