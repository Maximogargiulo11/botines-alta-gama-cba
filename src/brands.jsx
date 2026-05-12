// ============================================================
// /marcas — Index of all brands
// /marcas/[marca] — Models within a brand
// /marcas/[marca]/[modelo] — Stock + sizes
// ============================================================

function BrandsIndexPage() {
  return (
    <main className="container" style={{ paddingTop: 56, paddingBottom: 40 }}>
      <PageHeader
        eyebrow="Catálogo"
        title="Marcas"
        sub="Curamos las cuatro casas que definen el botín de élite. Cada una con su catálogo importado oficial."
      />
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(420px, 100%), 1fr))',
        gap: 24
      }}>
        {BRANDS_INFO.map(b => (
          <L to={`/marcas/${b.slug}`} key={b.slug} className="brand-card">
            <div style={{ position: 'relative', aspectRatio: '4 / 3', overflow: 'hidden', background: 'var(--bg-3)' }}>
              <img src={b.cover} alt={b.name}
                className="zoom-img"
                style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.7)' }}
                onError={(e) => { e.target.style.display = 'none'; }} />
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(135deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0) 50%, rgba(0,0,0,0.7) 100%)'
              }}></div>
              <div style={{
                position: 'absolute', inset: 0,
                padding: 36,
                display: 'flex', flexDirection: 'column', justifyContent: 'space-between'
              }}>
                <div className="eyebrow">{b.modelos.length} modelos disponibles</div>
                <div>
                  <h2 style={{
                    fontFamily: 'var(--display)',
                    fontSize: 'clamp(40px, 5vw, 64px)',
                    fontWeight: 600, lineHeight: 0.95,
                    letterSpacing: '-0.02em',
                    marginBottom: 8
                  }}>{b.name}</h2>
                  <div style={{
                    fontFamily: 'var(--display)', fontStyle: 'italic',
                    fontSize: 18, color: 'rgba(255,255,255,0.85)'
                  }}>{b.tagline}</div>
                </div>
              </div>
            </div>
          </L>
        ))}
      </div>
      <style>{`
        .brand-card .zoom-img {
          transition: transform 0.9s cubic-bezier(0.2, 0.8, 0.2, 1);
        }
        .brand-card:hover .zoom-img {
          transform: scale(1.06);
        }
      `}</style>
    </main>
  );
}

// -------------------------------------------------------------

function BrandModelsPage({ brandSlug }) {
  const b = findBrand(brandSlug);
  useEffect(() => { if (!b) navigate('/marcas'); }, [b]);
  if (!b) return null;

  return (
    <main className="container" style={{ paddingTop: 40, paddingBottom: 40 }}>
      <BackLink to="/marcas" label="Volver a Marcas" />
      <PageHeader
        eyebrow={`${b.modelos.length} modelos`}
        title={b.name}
        sub={b.tagline}
        marginTop={32}
      />

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(320px, 100%), 1fr))',
        gap: 24
      }}>
        {b.modelos.map(m => {
          const stockCount = getStock(b.slug, m.slug).length;
          return (
            <L to={`/marcas/${b.slug}/${m.slug}`} key={m.slug} className="model-card">
              <div style={{ position: 'relative', aspectRatio: '5 / 4', overflow: 'hidden', background: 'var(--bg-3)' }}>
                <img src={m.cover} alt={m.name}
                  className="zoom-img"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={(e) => { e.target.style.display = 'none'; }} />
                <div style={{
                  position: 'absolute', top: 14, right: 14,
                  fontFamily: 'var(--mono)', fontSize: 10,
                  letterSpacing: '0.18em', textTransform: 'uppercase',
                  background: 'rgba(0,0,0,0.6)', padding: '6px 10px',
                  border: '1px solid rgba(255,255,255,0.25)'
                }}>{stockCount} en stock</div>
              </div>
              <div style={{ paddingTop: 18, paddingBottom: 4 }}>
                <h3 style={{
                  fontFamily: 'var(--display)',
                  fontSize: 28, fontWeight: 600,
                  lineHeight: 1, letterSpacing: '-0.01em',
                  marginBottom: 6
                }}>{m.name}</h3>
                <div style={{ fontFamily: 'var(--display)', fontStyle: 'italic', color: 'var(--text-dim)', fontSize: 15 }}>{m.tagline}</div>
              </div>
            </L>
          );
        })}
      </div>
      <style>{`
        .model-card .zoom-img {
          transition: transform 0.7s cubic-bezier(0.2, 0.8, 0.2, 1);
        }
        .model-card:hover .zoom-img { transform: scale(1.05); }
        .model-card h3 { transition: color 0.25s; }
        .model-card:hover h3 { color: var(--text-dim); }
      `}</style>
    </main>
  );
}

// -------------------------------------------------------------
// MODEL STOCK PAGE
// -------------------------------------------------------------

function ModelStockPage({ brandSlug, modelSlug }) {
  const b = findBrand(brandSlug);
  const m = findModel(b, modelSlug);
  useEffect(() => {
    if (!b) { navigate('/marcas'); return; }
    if (!m) navigate(`/marcas/${b.slug}`);
  }, [b, m]);
  if (!b || !m) return null;

  const stock = getStock(b.slug, m.slug);

  return (
    <main className="container" style={{ paddingTop: 40, paddingBottom: 40 }}>
      <BackLink to={`/marcas/${b.slug}`} label={`Volver a ${b.name}`} />

      <div style={{
        display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between',
        gap: 24, marginTop: 32, marginBottom: 48,
        paddingBottom: 24, borderBottom: '1px solid var(--line)'
      }}>
        <div>
          <div className="eyebrow" style={{ marginBottom: 14 }}>{b.name} · {stock.length} productos en stock</div>
          <h1 style={{
            fontFamily: 'var(--display)',
            fontSize: 'clamp(44px, 6vw, 84px)',
            fontWeight: 600, lineHeight: 0.95,
            letterSpacing: '-0.02em'
          }}>{m.name}</h1>
          <div style={{ marginTop: 12, fontFamily: 'var(--display)', fontStyle: 'italic', color: 'var(--text-dim)', fontSize: 18 }}>
            {m.tagline}
          </div>
        </div>
        <div style={{
          fontFamily: 'var(--mono)', fontSize: 11,
          letterSpacing: '0.2em', textTransform: 'uppercase',
          color: 'var(--text-muted)'
        }}>
          Importación oficial · Retiro en Córdoba
        </div>
      </div>

      {/* PRODUCTS GRID */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 64 }}>
        {stock.map(p => <ProductCard key={p.id} product={p} />)}
      </div>

      {/* SIZE TABLE */}
      <SizeReferenceTable />

      <div style={{ marginTop: 56 }}>
        <BackLink to={`/marcas/${b.slug}`} label={`Volver a ${b.name}`} />
      </div>
    </main>
  );
}

function ProductCard({ product }) {
  const [selected, setSelected] = useState(null);
  const available = new Set(product.tallesDisponibles.map(t => t.us));
  const cart = useCart();

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.1fr)',
      gap: 48, alignItems: 'start',
      background: 'var(--bg-2)',
      border: '1px solid var(--line)',
      padding: 28
    }} className="product-row">
      <div style={{ aspectRatio: '1 / 1', overflow: 'hidden', background: 'var(--bg-3)' }}>
        <img src={product.imagen} alt={product.modelo}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          onError={(e) => { e.target.style.display = 'none'; }} />
      </div>

      <div>
        <div className="eyebrow" style={{ marginBottom: 10 }}>Disponible · Stock real</div>
        <h2 style={{
          fontFamily: 'var(--display)',
          fontSize: 'clamp(24px, 2.5vw, 32px)',
          fontWeight: 600, lineHeight: 1.1, letterSpacing: '-0.01em',
          marginBottom: 6
        }}>{product.modelo}</h2>
        <div style={{ fontFamily: 'var(--display)', fontStyle: 'italic', color: 'var(--text-dim)', fontSize: 17, marginBottom: 22 }}>
          {product.colorway}
        </div>

        <div style={{
          fontFamily: 'var(--display)',
          fontSize: 30, fontWeight: 600,
          marginBottom: 28
        }}>{fmtPrice(product.precio)}</div>

        <div className="eyebrow" style={{ marginBottom: 14 }}>Talles disponibles</div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(96px, 1fr))',
          gap: 8, marginBottom: 24
        }}>
          {SIZE_TABLE.map(t => {
            const isAvail = available.has(t.us);
            const isSel = selected === t.us;
            return (
              <button key={t.us}
                disabled={!isAvail}
                onClick={() => setSelected(isSel ? null : t.us)}
                className="size-btn"
                style={{
                  padding: '10px 6px',
                  border: '1px solid',
                  borderColor: isSel ? '#fff' : (isAvail ? 'var(--line-strong)' : 'var(--line)'),
                  background: isSel ? '#fff' : 'transparent',
                  color: isSel ? '#000' : (isAvail ? '#fff' : 'var(--text-muted)'),
                  cursor: isAvail ? 'pointer' : 'not-allowed',
                  opacity: isAvail ? 1 : 0.35,
                  textAlign: 'center',
                  fontFamily: 'var(--mono)',
                  fontSize: 11,
                  letterSpacing: '0.06em',
                  transition: 'all 0.2s',
                  textDecoration: !isAvail ? 'line-through' : 'none'
                }}>
                <div style={{ fontWeight: 600 }}>US {t.us}</div>
                <div style={{ fontSize: 10, opacity: 0.7, marginTop: 2 }}>UK {t.uk}</div>
              </button>
            );
          })}
        </div>

        <div style={{
          display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center'
        }}>
          <button className="btn btn-primary" disabled={!selected}
            onClick={() => { if (selected) cart.add(product, selected); }}
            style={{ opacity: selected ? 1 : 0.4, cursor: selected ? 'pointer' : 'not-allowed' }}>
            {selected ? `Agregar al carrito · US ${selected}` : 'Seleccioná un talle'}
          </button>
          <a href="https://wa.me/5493515558190"
            target="_blank" rel="noopener"
            className="btn btn-ghost">
            Consultar por WhatsApp
          </a>
        </div>
      </div>

      <style>{`
        .size-btn:hover:not(:disabled) {
          border-color: #fff !important;
          background: rgba(255,255,255,0.08);
        }
        @media (max-width: 800px) {
          .product-row {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
          }
        }
      `}</style>
    </div>
  );
}

function SizeReferenceTable() {
  return (
    <section style={{ marginTop: 80 }}>
      <div style={{
        paddingBottom: 18, borderBottom: '1px solid var(--line)', marginBottom: 24,
        display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16
      }}>
        <h3 style={{
          fontFamily: 'var(--display)',
          fontSize: 'clamp(22px, 2.4vw, 30px)',
          fontWeight: 600, letterSpacing: '-0.01em'
        }}>Tabla universal de talles</h3>
        <div className="eyebrow" style={{ color: 'var(--text-muted)' }}>US · UK · EU · CM</div>
      </div>
      <div style={{ overflowX: 'auto' }}>
        <table style={{
          width: '100%', minWidth: 520, borderCollapse: 'collapse',
          fontFamily: 'var(--mono)', fontSize: 13
        }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--line-strong)' }}>
              {['US', 'UK', 'EU', 'CM'].map(h => (
                <th key={h} style={{
                  padding: '14px 8px', textAlign: 'left',
                  fontSize: 11, letterSpacing: '0.22em',
                  color: 'var(--text-muted)', fontWeight: 500
                }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {SIZE_TABLE.map(t => (
              <tr key={t.us} style={{ borderBottom: '1px solid var(--line)' }}>
                <td style={{ padding: '12px 8px', fontWeight: 600 }}>{t.us}</td>
                <td style={{ padding: '12px 8px', color: 'var(--text-dim)' }}>{t.uk}</td>
                <td style={{ padding: '12px 8px', color: 'var(--text-dim)' }}>{t.eu}</td>
                <td style={{ padding: '12px 8px', color: 'var(--text-dim)' }}>{t.cm}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function PageHeader({ eyebrow, title, sub, marginTop }) {
  return (
    <div style={{
      marginTop: marginTop || 0,
      marginBottom: 48,
      paddingBottom: 24,
      borderBottom: '1px solid var(--line)'
    }}>
      {eyebrow && <div className="eyebrow" style={{ marginBottom: 16 }}>{eyebrow}</div>}
      <h1 style={{
        fontFamily: 'var(--display)',
        fontSize: 'clamp(44px, 6vw, 84px)',
        fontWeight: 600, lineHeight: 0.95,
        letterSpacing: '-0.02em'
      }}>{title}</h1>
      {sub && (
        <p style={{
          marginTop: 16,
          fontFamily: 'var(--display)', fontStyle: 'italic',
          color: 'var(--text-dim)', fontSize: 'clamp(16px, 1.6vw, 20px)',
          maxWidth: 720, lineHeight: 1.5
        }}>{sub}</p>
      )}
    </div>
  );
}

Object.assign(window, { BrandsIndexPage, BrandModelsPage, ModelStockPage, PageHeader });
