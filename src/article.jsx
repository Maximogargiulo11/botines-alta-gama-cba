// ============================================================
// Article detail — /lanzamientos/[slug]
// ============================================================

function ArticlePage({ slug }) {
  const a = findArticle(slug);

  useEffect(() => {
    if (!a) navigate('/');
  }, [a]);

  if (!a) return null;

  const heroImg = a.imagen;
  const paras = a.contenido;
  const gallery = (a.galeria || []).map(g =>
    typeof g === 'string'
      ? { url: g, size: 'full', layout: 'solo' }
      : { url: g.url || '', size: g.size || 'full', layout: g.layout || 'solo' }
  ).filter(g => g.url);

  const heroBadges = (
    <div style={{ display: 'inline-flex', gap: 12, alignItems: 'center', flexWrap: 'wrap', marginBottom: 18 }}>
      <span className="eyebrow" style={{ background: '#fff', color: '#000', padding: '6px 12px' }}>{a.marca}</span>
      <span className="eyebrow">{a.categoria} · {a.fecha}</span>
    </div>
  );

  return (
    <article>

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section style={{ position: 'relative', height: '85vh', minHeight: 480, overflow: 'hidden', background: '#000' }}>
        {/* Blurred background */}
        <img src={heroImg} alt="" style={{
          position: 'absolute', inset: 0, width: '100%', height: '100%',
          objectFit: 'cover', filter: 'blur(25px)', transform: 'scale(1.1)', opacity: 0.5
        }} onError={e => { e.target.style.display = 'none'; }} />
        {/* Centered full image */}
        <img src={heroImg} alt={a.titulo} className="hero-img-contain" style={{
          position: 'absolute', top: 0, left: '50%',
          transform: 'translateX(-50%)',
          height: '100%', width: 'auto',
          objectFit: 'contain', zIndex: 1
        }} onError={e => { e.target.style.display = 'none'; }} />
        {/* Gradient */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 2,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0) 50%, rgba(0,0,0,0.88) 100%)'
        }} />
        {/* Text */}
        <div className="container" style={{ position: 'absolute', left: 0, right: 0, bottom: 0, paddingBottom: 56, zIndex: 3 }}>
          <BackLink to="/" label="Volver a Lanzamientos" />
          <div style={{ marginTop: 24 }}>{heroBadges}</div>
          <h1 style={{
            fontFamily: 'var(--display)',
            fontSize: 'clamp(38px, 5.4vw, 84px)',
            fontWeight: 600, lineHeight: 1.05,
            letterSpacing: '-0.015em', maxWidth: 1100, textWrap: 'pretty'
          }}>{a.titulo}</h1>
          {a.descripcionCorta && (
            <p style={{
              fontFamily: 'var(--display)', fontStyle: 'italic',
              fontSize: 'clamp(15px, 1.5vw, 19px)',
              lineHeight: 1.55, color: 'rgba(255,255,255,0.8)',
              marginTop: 14, maxWidth: 640, textWrap: 'pretty'
            }}>{a.descripcionCorta}</p>
          )}
        </div>
      </section>

      {/* ── BODY ───────────────────────────────────────────── */}
      <div className="container" style={{ paddingTop: 72, paddingBottom: 40 }}>
        <div className="article-grid" style={{
          display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 280px',
          gap: 64, alignItems: 'start'
        }}>
          <div>
            {paras.map((p, i) => (
              <p key={i} style={{
                fontSize: 'clamp(16px, 1.2vw, 18px)',
                lineHeight: 1.8, marginBottom: 28,
                color: '#e6e6e6', maxWidth: 760, textWrap: 'pretty'
              }}>{p}</p>
            ))}

            {/* Gallery — size and layout configured per image */}
            {gallery.length > 0 && (() => {
              const rows = [];
              let gi = 0;
              while (gi < gallery.length) {
                const cur = gallery[gi], nxt = gallery[gi + 1];
                if (cur.layout === 'pair-left' && nxt && nxt.layout === 'pair-right') {
                  rows.push({ type: 'pair', left: cur, right: nxt, key: gi });
                  gi += 2;
                } else {
                  rows.push({ type: 'solo', item: cur, key: gi });
                  gi++;
                }
              }
              const sW = { full: '100%', medium: '70%', small: '50%' };
              return (
                <div style={{ margin: '40px 0 48px' }}>
                  {rows.map(row => row.type === 'pair' ? (
                    <div key={row.key} className="gallery-pair" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
                      <div style={{ background: 'var(--bg-3)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <img src={row.left.url} alt="" style={{ width: 'auto', height: 'auto', maxWidth: '100%', maxHeight: '50vh', display: 'block' }}
                          onError={e => { e.target.style.display = 'none'; }} />
                      </div>
                      <div style={{ background: 'var(--bg-3)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <img src={row.right.url} alt="" style={{ width: 'auto', height: 'auto', maxWidth: '100%', maxHeight: '50vh', display: 'block' }}
                          onError={e => { e.target.style.display = 'none'; }} />
                      </div>
                    </div>
                  ) : (
                    <div key={row.key} style={{
                      marginBottom: 12, display: 'flex', justifyContent: 'center',
                      marginLeft: row.item.size === 'full' ? 'calc(-1 * min(80px, 6vw))' : 0,
                      marginRight: row.item.size === 'full' ? 'calc(-1 * min(80px, 6vw))' : 0
                    }}>
                      <div style={{ width: sW[row.item.size] || '100%', background: 'var(--bg-3)', display: 'flex', justifyContent: 'center' }}>
                        <img src={row.item.url} alt="" style={{ width: 'auto', height: 'auto', maxWidth: '100%', maxHeight: '65vh', display: 'block' }}
                          onError={e => { e.target.style.display = 'none'; }} />
                      </div>
                    </div>
                  ))}
                </div>
              );
            })()}
          </div>

          <aside style={{ position: 'sticky', top: 96 }}>
            <div className="eyebrow" style={{ marginBottom: 16 }}>Datos técnicos</div>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, color: 'var(--text-dim)' }}>
              <tbody>
                {[
                  ['Suela',     a.detallesTecnicos.suela],
                  ['Terreno',   a.detallesTecnicos.terreno],
                  ['Peso',      a.detallesTecnicos.peso],
                  ['Colorways', a.detallesTecnicos.colorways.join(' · ')]
                ].map(([k, v]) => (
                  <tr key={k} style={{ borderTop: '1px solid var(--line)' }}>
                    <th style={{
                      textAlign: 'left', padding: '14px 0', width: '40%',
                      fontFamily: 'var(--mono)', fontSize: 10,
                      letterSpacing: '0.18em', textTransform: 'uppercase',
                      color: 'var(--text-muted)', fontWeight: 500, verticalAlign: 'top'
                    }}>{k}</th>
                    <td style={{ padding: '14px 0', color: '#fff', fontSize: 14, verticalAlign: 'top', lineHeight: 1.5 }}>{v}</td>
                  </tr>
                ))}
                <tr style={{ borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}>
                  <th style={{
                    textAlign: 'left', padding: '14px 0',
                    fontFamily: 'var(--mono)', fontSize: 10,
                    letterSpacing: '0.18em', textTransform: 'uppercase',
                    color: 'var(--text-muted)', fontWeight: 500, verticalAlign: 'top'
                  }}>Colección</th>
                  <td style={{ padding: '14px 0', color: '#fff', fontSize: 14, fontStyle: 'italic' }}>{a.coleccion}</td>
                </tr>
              </tbody>
            </table>
          </aside>
        </div>

        {/* CTA STOCK */}
        <div style={{
          marginTop: 80, padding: '64px 48px',
          background: 'var(--bg-2)', border: '1px solid var(--line)',
          display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between',
          gap: 32
        }}>
          <div style={{ maxWidth: 600 }}>
            <div className="eyebrow" style={{ marginBottom: 14 }}>Stock disponible</div>
            <h3 style={{
              fontFamily: 'var(--display)',
              fontSize: 'clamp(26px, 3vw, 38px)',
              fontWeight: 600, lineHeight: 1.15, letterSpacing: '-0.01em', textWrap: 'pretty'
            }}>¿Querés este par? Consultá el stock disponible.</h3>
            <p style={{ marginTop: 12, color: 'var(--text-dim)', fontSize: 15, lineHeight: 1.6 }}>
              Tenemos unidades en stock con retiro inmediato en Córdoba. Ver talles, colorways y precios actualizados.
            </p>
          </div>
          <L to={`/marcas/${a.marcaSlug}/${a.modeloSlug}`} className="btn btn-primary" style={{ fontSize: 13 }}>
            Ver stock {a.marca} {a.modeloSlug.toUpperCase()} →
          </L>
        </div>

        <div style={{ marginTop: 56 }}>
          <BackLink to="/" label="Volver a Lanzamientos" />
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .article-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
        }
        @media (max-width: 600px) {
          .gallery-pair {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </article>
  );
}

function BackLink({ to, label }) {
  return (
    <L to={to} style={{
      fontFamily: 'var(--mono)', fontSize: 11,
      letterSpacing: '0.2em', textTransform: 'uppercase',
      color: 'var(--text-dim)',
      display: 'inline-flex', alignItems: 'center', gap: 8,
      paddingBottom: 4, borderBottom: '1px solid var(--line)'
    }}>
      ← {label}
    </L>
  );
}

Object.assign(window, { ArticlePage, BackLink });
