// ============================================================
// HOME — Portada editorial estilo SoccerBible
// ============================================================

function HomePage() {
  const featured = ARTICLES.filter(a => a.destacado);
  const rest = ARTICLES.filter(a => !a.destacado);
  // Take all sorted by date desc — fechaISO is sortable
  const sorted = [...ARTICLES].sort((a, b) => b.fechaISO.localeCompare(a.fechaISO));
  const mainArticle = sorted[0];
  const sideArticles = sorted.slice(1, 4);
  const latest = sorted.slice(0, 4);

  return (
    <main>
      <HeroCarousel articles={featured} />
      <TodayEditorial main={mainArticle} side={sideArticles} />
      <LatestNews items={latest} />
      <HomeFooterLinks />
    </main>
  );
}

// ============================================================
// HERO CAROUSEL
// ============================================================

function HeroCarousel({ articles }) {
  const [idx, setIdx] = useState(0);
  const total = articles.length;

  useEffect(() => {
    if (total <= 1) return;
    const t = setInterval(() => {
      setIdx(i => (i + 1) % total);
    }, 6000);
    return () => clearInterval(t);
  }, [total]);

  const go = (delta) => setIdx(i => (i + delta + total) % total);

  return (
    <section style={{ position: 'relative', background: '#000', overflow: 'hidden' }}>
      <div style={{ position: 'relative', height: 'min(86vh, 760px)', minHeight: 520 }}>
        {articles.map((a, i) => (
          <L to={`/lanzamientos/${a.slug}`} key={a.slug}>
            <div style={{
              position: 'absolute', inset: 0,
              opacity: i === idx ? 1 : 0,
              transition: 'opacity 0.9s ease',
              pointerEvents: i === idx ? 'auto' : 'none'
            }}>
              <img src={a.imagen} alt={a.titulo} style={{
                width: '100%', height: '100%', objectFit: 'cover'
              }} onError={(e) => { e.target.style.display = 'none'; }} />
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0) 35%, rgba(0,0,0,0.85) 100%)'
              }}></div>
              <div className="container" style={{
                position: 'absolute', left: 0, right: 0, bottom: 0,
                paddingBottom: 64
              }}>
                <div style={{
                  display: 'inline-flex', gap: 14, alignItems: 'center',
                  marginBottom: 18
                }}>
                  <span className="eyebrow" style={{ background: '#fff', color: '#000', padding: '6px 12px' }}>
                    {a.marca}
                  </span>
                  <span className="eyebrow" style={{ color: '#fff' }}>{a.categoria} · {a.fecha}</span>
                </div>
                <h1 style={{
                  fontFamily: 'var(--display)',
                  fontSize: 'clamp(36px, 5.6vw, 80px)',
                  fontWeight: 600,
                  lineHeight: 1.05,
                  maxWidth: 1000,
                  letterSpacing: '-0.01em',
                  textWrap: 'pretty'
                }}>
                  {a.titulo}
                </h1>
                <p style={{
                  fontFamily: 'var(--display)', fontStyle: 'italic',
                  fontSize: 'clamp(15px, 1.6vw, 20px)',
                  color: 'rgba(255,255,255,0.8)',
                  marginTop: 18, maxWidth: 720, lineHeight: 1.5,
                  textWrap: 'pretty'
                }}>
                  {a.descripcionCorta}
                </p>
              </div>
            </div>
          </L>
        ))}

        {total > 1 && (
          <React.Fragment>
            <button onClick={(e) => { e.preventDefault(); go(-1); }} aria-label="Anterior" style={arrowBtn('left')}>‹</button>
            <button onClick={(e) => { e.preventDefault(); go(1); }} aria-label="Siguiente" style={arrowBtn('right')}>›</button>
            <div style={{
              position: 'absolute', bottom: 22, left: 0, right: 0,
              display: 'flex', justifyContent: 'center', gap: 8
            }}>
              {articles.map((_, i) => (
                <button key={i}
                  onClick={(e) => { e.preventDefault(); setIdx(i); }}
                  aria-label={`Slide ${i + 1}`}
                  style={{
                    width: i === idx ? 28 : 8, height: 4,
                    background: i === idx ? '#fff' : 'rgba(255,255,255,0.4)',
                    transition: 'all 0.3s', padding: 0
                  }}></button>
              ))}
            </div>
          </React.Fragment>
        )}
      </div>
    </section>
  );
}

const arrowBtn = (side) => ({
  position: 'absolute',
  top: '50%', transform: 'translateY(-50%)',
  [side]: 16,
  width: 50, height: 50,
  background: 'rgba(0,0,0,0.45)',
  border: '1px solid rgba(255,255,255,0.4)',
  color: '#fff',
  fontSize: 28, lineHeight: 1,
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  cursor: 'pointer',
  transition: 'all 0.25s',
  backdropFilter: 'blur(8px)'
});

// ============================================================
// TODAY EDITORIAL — main article + side column
// ============================================================

function TodayEditorial({ main, side }) {
  return (
    <section className="container" style={{ paddingTop: 80, paddingBottom: 40 }}>
      <SectionHeader title="Hoy" sub="Lo último seleccionado por el equipo editorial" />

      <div className="today-grid" style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 1.55fr) minmax(0, 1fr)',
        gap: 48
      }}>
        <L to={`/lanzamientos/${main.slug}`} className="article-card-lg">
          <div style={{ aspectRatio: '4 / 3', overflow: 'hidden', position: 'relative', background: 'var(--bg-3)' }}>
            <img src={main.imagen} alt={main.titulo} className="zoom-img" style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => { e.target.style.display = 'none'; }} />
          </div>
          <div style={{ paddingTop: 22 }}>
            <div className="eyebrow" style={{ marginBottom: 14 }}>{main.marca} · {main.fecha}</div>
            <h2 style={{
              fontFamily: 'var(--display)',
              fontSize: 'clamp(28px, 3.6vw, 46px)',
              fontWeight: 600, lineHeight: 1.1,
              letterSpacing: '-0.01em',
              marginBottom: 14,
              textWrap: 'pretty'
            }}>{main.titulo}</h2>
            <p style={{
              color: 'var(--text-dim)',
              fontSize: 16, lineHeight: 1.65,
              maxWidth: 620,
              textWrap: 'pretty'
            }}>{main.descripcionCorta}</p>
          </div>
        </L>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
          {side.map(a => (
            <L to={`/lanzamientos/${a.slug}`} key={a.slug} className="side-card">
              <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: 18, alignItems: 'start' }}>
                <div style={{ aspectRatio: '1 / 1', overflow: 'hidden', background: 'var(--bg-3)' }}>
                  <img src={a.imagen} alt={a.titulo} className="zoom-img" style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => { e.target.style.display = 'none'; }} />
                </div>
                <div>
                  <div className="eyebrow" style={{ marginBottom: 8, fontSize: 10 }}>{a.marca} · {a.fecha}</div>
                  <h3 style={{
                    fontFamily: 'var(--display)',
                    fontSize: 19, lineHeight: 1.2,
                    fontWeight: 600,
                    letterSpacing: '-0.005em',
                    textWrap: 'pretty'
                  }}>{a.titulo}</h3>
                </div>
              </div>
            </L>
          ))}
        </div>
      </div>

      <style>{`
        .article-card-lg .zoom-img,
        .side-card .zoom-img {
          transition: transform 0.7s cubic-bezier(0.2, 0.8, 0.2, 1);
        }
        .article-card-lg:hover .zoom-img,
        .side-card:hover .zoom-img {
          transform: scale(1.04);
        }
        .article-card-lg h2,
        .side-card h3 {
          transition: color 0.25s;
        }
        .side-card:hover h3 {
          color: var(--text-dim);
        }
        @media (max-width: 900px) {
          .today-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}

// ============================================================
// LATEST NEWS — 4 compact cards
// ============================================================

function LatestNews({ items }) {
  return (
    <section className="container" style={{ paddingTop: 60, paddingBottom: 40 }}>
      <SectionHeader title="Últimas Noticias" sub="Toda la cobertura reciente" />

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
        gap: 28
      }}>
        {items.map(a => (
          <L to={`/lanzamientos/${a.slug}`} key={a.slug} className="news-card">
            <div style={{ aspectRatio: '4 / 3', overflow: 'hidden', background: 'var(--bg-3)' }}>
              <img src={a.imagen} alt={a.titulo} className="zoom-img" style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => { e.target.style.display = 'none'; }} />
            </div>
            <div style={{ paddingTop: 16 }}>
              <div className="eyebrow" style={{ marginBottom: 8, fontSize: 10 }}>{a.categoria}</div>
              <h3 style={{
                fontFamily: 'var(--display)',
                fontSize: 18, lineHeight: 1.25,
                fontWeight: 600,
                marginBottom: 6,
                textWrap: 'pretty'
              }}>{a.titulo}</h3>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--text-muted)', letterSpacing: '0.1em' }}>
                {a.marca.toUpperCase()} · {a.fecha}
              </div>
            </div>
          </L>
        ))}
      </div>

      <style>{`
        .news-card .zoom-img {
          transition: transform 0.7s cubic-bezier(0.2, 0.8, 0.2, 1);
        }
        .news-card:hover .zoom-img {
          transform: scale(1.05);
        }
        .news-card h3 { transition: color 0.25s; }
        .news-card:hover h3 { color: var(--text-dim); }
      `}</style>
    </section>
  );
}

function SectionHeader({ title, sub }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
      gap: 24, marginBottom: 36,
      paddingBottom: 18, borderBottom: '1px solid var(--line)'
    }}>
      <div>
        <h2 style={{
          fontFamily: 'var(--display)',
          fontSize: 'clamp(28px, 3vw, 38px)',
          fontWeight: 600,
          letterSpacing: '-0.01em',
          lineHeight: 1
        }}>{title}</h2>
        {sub && (
          <div style={{ marginTop: 8, color: 'var(--text-muted)', fontSize: 13, fontStyle: 'italic', fontFamily: 'var(--display)' }}>
            {sub}
          </div>
        )}
      </div>
    </div>
  );
}

function HomeFooterLinks() {
  return (
    <section className="container" style={{ paddingTop: 60, paddingBottom: 20 }}>
      <div style={{
        borderTop: '1px solid var(--line)',
        paddingTop: 24,
        display: 'flex', flexWrap: 'wrap', gap: 24,
        fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase'
      }}>
        <L to="/politica-cambios" style={{ color: 'var(--text-dim)' }}>Política de Cambio y Devolución</L>
        <L to="/faq" style={{ color: 'var(--text-dim)' }}>Preguntas Frecuentes</L>
      </div>
    </section>
  );
}

Object.assign(window, { HomePage });
