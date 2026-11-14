import { Link, useParams } from 'react-router-dom'
import { useStore, articlesStore, sortedArticles, formatDate } from '../store'
import { ArticleCard, PageHead, NotFound } from '../components/ui'
import { Cover } from '../components/Visuals'

export function Blog() {
  const articles = sortedArticles(useStore(articlesStore))
  return (
    <>
      <PageHead eyebrow="Journal" title="Čítanie k plechovke">
        O značke, malých rituáloch a o tom, čo si predstavujeme pod slovom refill.
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
            <p>Zatiaľ tu nie sú žiadne články.</p>
            <Link className="btn btn-ghost" to="/admin">
              Pridať článok v demo editore
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
  if (!a) return <NotFound title="Článok sme nenašli" text="Možno bol odstránený v demo editore." />

  // Text z editora vykresľujeme ako obyčajný text po odsekoch, nikdy ako HTML.
  const paragraphs = String(a.body || '')
    .split(/\n\s*\n/)
    .map((s) => s.trim())
    .filter(Boolean)

  return (
    <article className="article wrap narrow">
      <Link className="text-link" to="/blog">
        ← Späť na články
      </Link>
      <p className="eyebrow">
        {a.category} · <time dateTime={a.date}>{formatDate(a.date)}</time>
      </p>
      <h1>{a.title}</h1>
      {a.excerpt && <p className="lead">{a.excerpt}</p>}
      <Cover cover={a.cover} alt={`Titulný obrázok článku ${a.title}`} className="article-cover" />
      <div className="prose">
        {paragraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
      <Link className="btn btn-ghost" to="/blog">
        ← Späť na články
      </Link>
    </article>
  )
}
