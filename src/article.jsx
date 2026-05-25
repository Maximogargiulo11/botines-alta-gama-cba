// ============================================================
// Article detail — SoccerBible-style editorial layout
// /lanzamientos/[slug]
// ============================================================

// ── Helpers de video ──────────────────────────────────────────
function getYoutubeId(url) {
  if (!url) return null;
  const m = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/);
  return m ? m[1] : null;
}
function isDirectVideo(url) {
  return url && /\.(mp4|webm|ogg|mov)(\?|$)/i.test(url);
}

function ArticlePage({ slug }) {
  const a = findArticle(slug);

  useEffect(() => {
    if (!a) navigate('/');
  }, [a]);

  if (!a) return null;

  // Normaliza galería: preserva {type, url, size, layout} para soporte de video
  const galleryItems = (a.galeria && a.galeria.length > 0 ? a.galeria : (a.imagen ? [a.imagen] : []))
    .map(g => {
      if (typeof g === 'string') return { type: 'image', url: g, size: 'full', layout: 'solo' };
      return { type: g.type || 'image', url: g.url || '', size: g.size || 'full', layout: g.layout || 'solo' };
    })
    .filter(item => item.url);

  const heroImg    = galleryItems[0]?.url || a.imagen;
  const inlineItems = galleryItems.slice(1);

  // Producto relacionado — busca en STOCK por id
  const productoRelacionado = (() => {
    if (!a.productoRelacionadoId || !window.STOCK) return null;
    for (const productos of Object.values(window.STOCK)) {
      const p = productos.find(p => p.id === a.productoRelacionadoId);
      if (p) return p;
    }
    return null;
  })();

  const related = [...ARTICLES.filter((x) => x.slug !== a.slug)].sort((x, y) => {
    const sameX = x.marcaSlug === a.marcaSlug ? 1 : 0;
    const sameY = y.marcaSlug === a.marcaSlug ? 1 : 0;
    return sameY - sameX || y.fechaISO.localeCompare(x.fechaISO);
  }).slice(0, 3);

  const paras = a.contenido;

  return (
    <article>
      {/* ============ HERO ============ */}
      <SBHero img={heroImg} title={a.titulo} videoPortada={a.videoPortada} />

      {/* ============ BREADCRUMB + TITLE + META ============ */}
      <section className="container" style={{ paddingTop: 40 }}>
        <Breadcrumb crumbs={[
          { label: 'Inicio', to: '/' },
          { label: 'Lanzamientos', to: '/' },
          { label: a.titulo }
        ]} />

        <div style={{ maxWidth: 880, margin: '24px auto 0' }}>
          <div className="eyebrow" style={{ marginBottom: 18 }}>{a.categoria} · {a.marca}</div>
          <h1 style={{
            fontFamily: 'var(--display)',
            fontSize: 'clamp(34px, 4.8vw, 64px)',
            fontWeight: 600, lineHeight: 1.05,
            letterSpacing: '-0.02em',
            textWrap: 'pretty'
          }}>{a.titulo}</h1>

          <p style={{
            fontFamily: 'var(--display)',
            fontStyle: 'italic',
            fontSize: 'clamp(17px, 1.6vw, 22px)',
            color: 'var(--text-dim)',
            marginTop: 20,
            lineHeight: 1.55,
            textWrap: 'pretty',
            maxWidth: 760
          }}>{a.descripcionCorta}</p>

          <div style={{
            marginTop: 28,
            paddingTop: 22,
            borderTop: '1px solid var(--line)',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            gap: 18, flexWrap: 'wrap'
          }}>
            <div style={{
              fontFamily: 'var(--mono)', fontSize: 11,
              letterSpacing: '0.18em', textTransform: 'uppercase',
              color: 'var(--text-muted)'
            }}>
              {a.fecha} · <span style={{ color: 'var(--text-dim)' }}>Botines Alta Gama CBA</span>
            </div>
            <ShareRow title={a.titulo} slug={a.slug} />
          </div>
        </div>
      </section>

      {/* ============ BODY — 720px column ============ */}
      <section className="container" style={{ paddingTop: 56, paddingBottom: 48 }}>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          {paras.map((p, i) =>
            <React.Fragment key={i}>
              <BodyParagraph isFirst={i === 0}>{p}</BodyParagraph>

              {i === 0 && inlineItems[0] &&
                <WideMedia item={inlineItems[0]} alt={`${a.titulo} — Fig. 01`} caption={a.coleccion || null} />
              }
              {i === 2 && inlineItems[1] &&
                <WideMedia item={inlineItems[1]} alt={`${a.titulo} — Fig. 02`} caption={a.detallesTecnicos?.colorways?.[0] || null} />
              }
            </React.Fragment>
          )}

          {/* Items 2+ con soporte de tamaño y pares lado a lado */}
          {(() => {
            const items = inlineItems.slice(2);
            if (!items.length) return null;
            const result = [];
            let i = 0;
            while (i < items.length) {
              const cur  = items[i];
              const next = items[i + 1];
              if (cur.layout === 'pair-left' && next?.layout === 'pair-right') {
                result.push(
                  <div key={i} style={{
                    display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12,
                    margin: '40px calc(-1 * min(80px, 7vw)) 48px'
                  }} className="wide-figure">
                    <WideMedia item={cur}  noPad alt={`${a.titulo} — Fig. 0${i + 3}`} caption={null} />
                    <WideMedia item={next} noPad alt={`${a.titulo} — Fig. 0${i + 4}`} caption={null} />
                  </div>
                );
                i += 2;
              } else {
                result.push(
                  <WideMedia key={i} item={cur} alt={`${a.titulo} — Fig. 0${i + 3}`} caption={`Detalle ${i + 3}`} />
                );
                i++;
              }
            }
            return result;
          })()}

          {/* Tags + share final */}
          <div style={{
            marginTop: 56, paddingTop: 24,
            borderTop: '1px solid var(--line)',
            display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 18
          }}>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <Tag>{a.marca}</Tag>
              <Tag>{a.categoria}</Tag>
              {a.fecha && <Tag>{a.fecha}</Tag>}
            </div>
            <ShareRow title={a.titulo} slug={a.slug} compact />
          </div>
        </div>
      </section>

      {/* ============ PRODUCT ANNOUNCEMENT ============ */}
      {productoRelacionado && (
        <ProductAnnouncementBlock
          producto={productoRelacionado}
          brand={a.marca}
          marcaSlug={a.marcaSlug}
          modeloSlug={a.modeloSlug}
        />
      )}

      {/* ============ INSTAGRAM PROFILE ============ */}
      {a.instagramHandle && <InstagramProfileSection handle={a.instagramHandle} />}

      {/* ============ INSTAGRAM POST EMBED ============ */}
      {a.urlInstagram && <InstagramSection url={a.urlInstagram} />}

      {/* ============ RELATED ARTICLES ============ */}
      <RelatedArticles items={related} />
    </article>
  );
}

// =============================================================
// HERO — soporta imagen y video de portada
// =============================================================
function SBHero({ img, title, videoPortada }) {
  const ytId    = getYoutubeId(videoPortada);
  const isDirect = isDirectVideo(videoPortada);

  return (
    <section style={{ position: 'relative', width: '100%', overflow: 'hidden', background: '#000' }}>
      <div style={{
        position: 'relative',
        height: '70vh', minHeight: 400, maxHeight: 860,
        display: 'flex', alignItems: 'center', justifyContent: 'center'
      }}>
        {ytId ? (
          <iframe
            src={`https://www.youtube.com/embed/${ytId}?autoplay=1&mute=1&loop=1&playlist=${ytId}&controls=0&showinfo=0&rel=0&modestbranding=1`}
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none' }}
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen title={title}
          />
        ) : isDirect ? (
          <video src={videoPortada} autoPlay muted loop playsInline
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        ) : (
          <img src={img} alt={title} style={{
            width: '100%', height: '100%', objectFit: 'cover', display: 'block'
          }} onError={(e) => { e.target.style.display = 'none'; }} />
        )}
      </div>
    </section>
  );
}

// =============================================================
// Breadcrumb
// =============================================================
function Breadcrumb({ crumbs }) {
  return (
    <nav aria-label="Breadcrumb" style={{
      fontFamily: 'var(--mono)', fontSize: 11,
      letterSpacing: '0.16em', textTransform: 'uppercase',
      color: 'var(--text-muted)',
      display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 8
    }}>
      {crumbs.map((c, i) =>
        <React.Fragment key={i}>
          {c.to ?
            <L to={c.to} style={{ color: 'var(--text-dim)' }} className="bc-link">{c.label}</L> :
            <span style={{ color: '#fff', textWrap: 'pretty', maxWidth: '70vw', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.label}</span>
          }
          {i < crumbs.length - 1 && <span style={{ color: 'var(--text-muted)' }}>›</span>}
        </React.Fragment>
      )}
      <style>{`.bc-link:hover { color: #fff !important; }`}</style>
    </nav>
  );
}

// =============================================================
// Share row
// =============================================================
function ShareRow({ title, slug, compact }) {
  const [copied, setCopied] = useState(false);
  const url = typeof window !== 'undefined' ? `${window.location.origin}${window.location.pathname}#/lanzamientos/${slug}` : '';
  const text = encodeURIComponent(title);
  const enc = encodeURIComponent(url);

  const shares = [
    { id: 'fb', label: 'Facebook', href: `https://www.facebook.com/sharer/sharer.php?u=${enc}`,
      svg: <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H8V12h2.44V9.9c0-2.4 1.43-3.73 3.62-3.73 1.05 0 2.15.19 2.15.19v2.36h-1.21c-1.19 0-1.56.74-1.56 1.5V12h2.66l-.43 2.89h-2.23v6.99A10 10 0 0 0 22 12z" /></svg> },
    { id: 'x', label: 'Twitter/X', href: `https://twitter.com/intent/tweet?text=${text}&url=${enc}`,
      svg: <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg> },
    { id: 'wa', label: 'WhatsApp', href: `https://api.whatsapp.com/send?text=${text}%20${enc}`,
      svg: <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163a11.867 11.867 0 0 1-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 0 1 8.413 3.488 11.824 11.824 0 0 1 3.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 0 1-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 0 0 1.51 5.26L3.5 18.59l3.154-1.398zm10.413-7.137c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.149-.174.198-.298.297-.497.099-.198.05-.371-.025-.521-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.298-1.04 1.017-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.711.306 1.265.489 1.697.625.713.227 1.362.195 1.875.118.572-.085 1.759-.719 2.007-1.413.247-.694.247-1.289.173-1.413z" /></svg> }
  ];

  const onCopy = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    }
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      {!compact &&
        <span style={{
          fontFamily: 'var(--mono)', fontSize: 10,
          letterSpacing: '0.22em', textTransform: 'uppercase',
          color: 'var(--text-muted)', marginRight: 4
        }}>Compartir</span>
      }
      {shares.map((s) =>
        <a key={s.id} href={s.href} target="_blank" rel="noopener noreferrer"
          aria-label={`Compartir en ${s.label}`}
          className="share-btn">
          {s.svg}
        </a>
      )}
      <button onClick={onCopy} aria-label="Copiar link" className="share-btn">
        {copied ?
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M5 12l4 4 10-11" /></svg> :
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M10 14l-1 1a4 4 0 1 1-5.66-5.66l3-3A4 4 0 0 1 11 7" /><path d="M14 10l1-1a4 4 0 1 1 5.66 5.66l-3 3A4 4 0 0 1 13 17" /></svg>
        }
      </button>
      <style>{`
        .share-btn {
          width: 34px; height: 34px;
          display: inline-flex; align-items: center; justify-content: center;
          border: 1px solid var(--line-strong);
          color: var(--text-dim);
          transition: all 0.2s;
          background: transparent;
        }
        .share-btn:hover { border-color: #fff; color: #fff; }
      `}</style>
    </div>
  );
}

// =============================================================
// Body components
// =============================================================
function BodyParagraph({ children, isFirst }) {
  return (
    <p style={{
      fontFamily: 'var(--body)',
      fontSize: 'clamp(16px, 1.18vw, 18px)',
      lineHeight: 1.82,
      color: '#dcdcdc',
      marginBottom: 32,
      textWrap: 'pretty',
      fontWeight: isFirst ? 500 : 400
    }}>{children}</p>
  );
}

// ── WideFigure: imagen con relación de aspecto 3:2 fija ────────────
function WideFigure({ src, alt, caption, size, noPad }) {
  const sz = size || 'full';
  const figStyle = noPad
    ? { margin: 0 }
    : sz === 'full'
    ? { margin: '40px calc(-1 * min(80px, 7vw)) 48px', maxWidth: 'calc(100% + 2 * min(80px, 7vw))' }
    : sz === 'medium'
    ? { margin: '40px 0 48px' }
    : { margin: '40px auto 48px', maxWidth: '55%' };
  return (
    <figure style={figStyle} className={!noPad && sz === 'full' ? 'wide-figure' : ''}>
      {/* Aspect ratio 3:2 fijo para que todas las imágenes sean del mismo tamaño */}
      <div style={{ aspectRatio: '3/2', overflow: 'hidden', background: 'var(--bg-3)' }}>
        <img src={src} alt={alt} style={{
          width: '100%', height: '100%',
          display: 'block', objectFit: 'cover'
        }} onError={(e) => { e.target.style.display = 'none'; }} />
      </div>
      {caption &&
        <figcaption style={{
          marginTop: 14,
          fontFamily: 'var(--mono)', fontSize: 11,
          letterSpacing: '0.15em', textTransform: 'uppercase',
          color: 'var(--text-muted)',
          textAlign: 'center'
        }}>{caption}</figcaption>
      }
      <style>{`
        @media (max-width: 720px) { .wide-figure { margin-left: 0 !important; margin-right: 0 !important; } }
      `}</style>
    </figure>
  );
}

// =============================================================
// WideMedia — imagen o video a ancho extendido
// =============================================================
function WideMedia({ item, alt, caption, noPad }) {
  const type = item?.type || 'image';
  const url  = typeof item === 'string' ? item : (item?.url || '');
  const size = typeof item === 'object' ? (item?.size || 'full') : 'full';
  const sz   = size;

  if (type === 'video') {
    const ytId = getYoutubeId(url);
    const figStyle = noPad
      ? { margin: 0 }
      : sz === 'full'
      ? { margin: '40px calc(-1 * min(80px, 7vw)) 48px', maxWidth: 'calc(100% + 2 * min(80px, 7vw))' }
      : sz === 'medium'
      ? { margin: '40px 0 48px' }
      : { margin: '40px auto 48px', maxWidth: '55%' };
    return (
      <figure style={figStyle} className={!noPad && sz === 'full' ? 'wide-figure' : ''}>
        {ytId ? (
          <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, background: '#000' }}>
            <iframe
              src={`https://www.youtube.com/embed/${ytId}?rel=0&modestbranding=1`}
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none' }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen title={alt}
            />
          </div>
        ) : (
          <video src={url} controls playsInline
            style={{ width: '100%', display: 'block', background: '#000', maxHeight: 600 }}
          />
        )}
        {caption && (
          <figcaption style={{
            marginTop: 14, fontFamily: 'var(--mono)', fontSize: 11,
            letterSpacing: '0.15em', textTransform: 'uppercase',
            color: 'var(--text-muted)', textAlign: 'center'
          }}>{caption}</figcaption>
        )}
        <style>{`@media (max-width: 720px) { .wide-figure { margin-left: 0 !important; margin-right: 0 !important; } }`}</style>
      </figure>
    );
  }

  return <WideFigure src={url} alt={alt} caption={caption} size={size} noPad={noPad} />;
}

// =============================================================
// Product Announcement — bloque editorial full-width
// =============================================================
function ProductAnnouncementBlock({ producto, brand, marcaSlug, modeloSlug }) {
  const bSlug = marcaSlug  || (brand || '').toLowerCase().replace(/\s+/g, '-');
  const mSlug = modeloSlug || producto.modeloSlug
    || (producto.modelo || '').split(' ')[0].toLowerCase().replace(/[^a-z0-9]/g, '-');

  return (
    <section style={{
      borderTop: '1px solid var(--line-strong)',
      borderBottom: '1px solid var(--line-strong)',
      background: 'var(--bg-2)',
      overflow: 'hidden',
    }}>
      <div className="prod-announce-grid">
        {/* Imagen del producto */}
        <div style={{ background: 'var(--bg-3)', overflow: 'hidden', minHeight: 320 }}>
          <img
            src={producto.imagen}
            alt={producto.modelo}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', aspectRatio: '1/1' }}
            onError={(e) => { e.target.style.display = 'none'; }}
          />
        </div>

        {/* Info */}
        <div style={{
          padding: 'clamp(32px, 5vw, 72px)',
          display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 18
        }}>
          <div className="eyebrow">{brand} · Disponible en catálogo</div>

          <h3 style={{
            fontFamily: 'var(--display)',
            fontSize: 'clamp(26px, 3vw, 44px)',
            fontWeight: 600, lineHeight: 1.05,
            letterSpacing: '-0.015em'
          }}>{producto.modelo}</h3>

          {producto.colorway && (
            <p style={{
              fontFamily: 'var(--display)', fontStyle: 'italic',
              color: 'var(--text-dim)', fontSize: 'clamp(15px, 1.4vw, 19px)', lineHeight: 1.4
            }}>{producto.colorway}</p>
          )}

          <div style={{
            fontFamily: 'var(--display)',
            fontSize: 'clamp(28px, 2.8vw, 40px)',
            fontWeight: 600, letterSpacing: '-0.01em'
          }}>
            {fmtPrice(producto.precio)}
          </div>

          {(producto.tallesDisponibles?.length > 0) && (
            <div>
              <div style={{
                fontFamily: 'var(--mono)', fontSize: 10,
                letterSpacing: '0.2em', textTransform: 'uppercase',
                color: 'var(--text-muted)', marginBottom: 10
              }}>Talles disponibles (EU)</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {producto.tallesDisponibles.map(t => (
                  <span key={t.eu} style={{
                    padding: '5px 11px',
                    border: '1px solid var(--line-strong)',
                    fontFamily: 'var(--mono)', fontSize: 11,
                    color: 'var(--text-dim)'
                  }}>{t.eu}</span>
                ))}
              </div>
            </div>
          )}

          <L
            to={`/marcas/${bSlug}/${mSlug}`}
            className="btn btn-primary"
            style={{ alignSelf: 'flex-start', marginTop: 8 }}
          >
            Ver en catálogo →
          </L>
        </div>
      </div>

      <style>{`
        .prod-announce-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
        }
        @media (max-width: 768px) {
          .prod-announce-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

function Tag({ children }) {
  return (
    <span style={{
      fontFamily: 'var(--mono)', fontSize: 10,
      letterSpacing: '0.2em', textTransform: 'uppercase',
      color: 'var(--text-dim)',
      padding: '6px 12px',
      border: '1px solid var(--line)',
      display: 'inline-block'
    }}>{children}</span>
  );
}

// =============================================================
// Instagram — Perfil (follow CTA)
// =============================================================
function InstagramProfileSection({ handle }) {
  const clean = (handle || '')
    .replace(/^@/, '')
    .replace(/https?:\/\/(?:www\.)?instagram\.com\//, '')
    .replace(/\/+$/, '')
    .trim();
  if (!clean) return null;

  return (
    <section style={{
      background: 'var(--bg-2)',
      borderTop: '1px solid var(--line)',
      borderBottom: '1px solid var(--line)',
      padding: '80px 0'
    }}>
      <div className="container" style={{ maxWidth: 640, textAlign: 'center' }}>
        {/* Instagram icon */}
        <svg width="44" height="44" viewBox="0 0 24 24" fill="none"
          stroke="var(--gold)" strokeWidth="1.4"
          style={{ display: 'block', margin: '0 auto 28px' }}>
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r="1.3" fill="var(--gold)" stroke="none" />
        </svg>

        <div className="eyebrow" style={{ marginBottom: 16 }}>Seguinos</div>
        <h2 style={{
          fontFamily: 'var(--display)',
          fontSize: 'clamp(30px, 4vw, 54px)',
          fontWeight: 600, letterSpacing: '-0.015em', lineHeight: 1.05,
          marginBottom: 20
        }}>@{clean}</h2>
        <p style={{
          color: 'var(--text-dim)', fontSize: 'clamp(15px, 1.4vw, 18px)',
          fontFamily: 'var(--display)', fontStyle: 'italic',
          lineHeight: 1.6, maxWidth: 440, margin: '0 auto 40px'
        }}>
          Drops exclusivos, novedades y contenido detrás de escena.
        </p>
        <a
          href={`https://www.instagram.com/${clean}/`}
          target="_blank" rel="noopener noreferrer"
          className="btn btn-primary"
          style={{ fontSize: 11, letterSpacing: '0.2em' }}
        >
          Seguir en Instagram
        </a>
      </div>
    </section>
  );
}

// =============================================================
// Instagram — Post embed
// =============================================================
function InstagramSection({ url }) {
  const m = url.match(/instagram\.com\/(?:p|reel)\/([A-Za-z0-9_-]+)/);
  const code = m ? m[1] : null;
  const embedSrc = code ? `https://www.instagram.com/p/${code}/embed/captioned/?cr=1&theme=dark` : null;

  return (
    <section style={{
      background: 'var(--bg-2)',
      borderTop: '1px solid var(--line)',
      borderBottom: '1px solid var(--line)',
      padding: '80px 0'
    }}>
      <div className="container" style={{ maxWidth: 880 }}>
        <div style={{
          display: 'flex', alignItems: 'baseline', justifyContent: 'space-between',
          gap: 16, marginBottom: 32, flexWrap: 'wrap'
        }}>
          <div>
            <div className="eyebrow" style={{ marginBottom: 12 }}>Comunidad</div>
            <h2 style={{
              fontFamily: 'var(--display)',
              fontSize: 'clamp(28px, 3.4vw, 42px)',
              fontWeight: 600, letterSpacing: '-0.01em', lineHeight: 1.1
            }}>Seguinos en Instagram</h2>
          </div>
          <a href="https://www.instagram.com/botinesaltagamacba/"
            target="_blank" rel="noopener noreferrer"
            className="btn btn-ghost">
            Ver en Instagram →
          </a>
        </div>

        <div style={{
          background: '#000', border: '1px solid var(--line)',
          maxWidth: 540, margin: '0 auto', minHeight: 600
        }}>
          {embedSrc ?
            <iframe src={embedSrc} width="100%" height="780" frameBorder="0"
              scrolling="no" allowTransparency="true"
              style={{ display: 'block', border: 'none', background: '#000', maxWidth: '100%' }}
              title="Instagram post" />
            :
            <div style={{ padding: 60, textAlign: 'center', color: 'var(--text-dim)' }}>
              No se pudo cargar el post de Instagram.
            </div>
          }
        </div>
      </div>
    </section>
  );
}

// =============================================================
// Related articles
// =============================================================
function RelatedArticles({ items }) {
  return (
    <section className="container" style={{ paddingTop: 80, paddingBottom: 40 }}>
      <div style={{
        display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
        gap: 16, marginBottom: 32, paddingBottom: 18, borderBottom: '1px solid var(--line)', flexWrap: 'wrap'
      }}>
        <h2 style={{
          fontFamily: 'var(--display)',
          fontSize: 'clamp(28px, 3vw, 38px)',
          fontWeight: 600, letterSpacing: '-0.01em', lineHeight: 1
        }}>Más lanzamientos</h2>
        <L to="/" style={{
          fontFamily: 'var(--mono)', fontSize: 11,
          letterSpacing: '0.2em', textTransform: 'uppercase',
          color: 'var(--text-dim)',
          paddingBottom: 4, borderBottom: '1px solid var(--line-strong)'
        }}>Ver todos →</L>
      </div>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(min(260px, 100%), 1fr))',
        gap: 28
      }}>
        {items.map((a) =>
          <L to={`/lanzamientos/${a.slug}`} key={a.slug} className="rel-card">
            <div style={{ aspectRatio: '3/2', overflow: 'hidden', background: 'var(--bg-3)' }}>
              <img src={a.imagen} alt={a.titulo}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.7s cubic-bezier(0.2,0.8,0.2,1)' }}
                className="zoom-img"
                onError={(e) => { e.target.style.display = 'none'; }} />
            </div>
            <div style={{ paddingTop: 16 }}>
              <div className="eyebrow" style={{ marginBottom: 8, fontSize: 10 }}>{a.marca} · {a.fecha}</div>
              <h3 style={{
                fontFamily: 'var(--display)',
                fontSize: 19, fontWeight: 600,
                lineHeight: 1.2, marginBottom: 4,
                letterSpacing: '-0.005em',
                textWrap: 'pretty'
              }}>{a.titulo}</h3>
              <div style={{ color: 'var(--text-muted)', fontSize: 13, fontStyle: 'italic', fontFamily: 'var(--display)' }}>
                {a.categoria}
              </div>
            </div>
          </L>
        )}
      </div>
      <style>{`
        .rel-card .zoom-img { transition: transform 0.7s cubic-bezier(0.2,0.8,0.2,1); }
        .rel-card:hover .zoom-img { transform: scale(1.05); }
        .rel-card h3 { transition: color 0.25s; }
        .rel-card:hover h3 { color: var(--text-dim); }
      `}</style>
    </section>
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
    }}>← {label}</L>
  );
}

Object.assign(window, { ArticlePage, BackLink });
