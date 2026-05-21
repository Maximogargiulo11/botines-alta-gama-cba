// ============================================================
// /marcas — Index of all brands
// /marcas/[marca] — Models within a brand
// /marcas/[marca]/[modelo] — Catalog grid (image + name + price)
// /marcas/[marca]/[modelo]/[productoId] — Product detail (PDP)
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
        .brand-card .zoom-img { transition: transform 0.9s cubic-bezier(0.2, 0.8, 0.2, 1); }
        .brand-card:hover .zoom-img { transform: scale(1.06); }
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
        .model-card .zoom-img { transition: transform 0.7s cubic-bezier(0.2, 0.8, 0.2, 1); }
        .model-card:hover .zoom-img { transform: scale(1.05); }
        .model-card h3 { transition: color 0.25s; }
        .model-card:hover h3 { color: var(--text-dim); }
      `}</style>
    </main>
  );
}

// -------------------------------------------------------------
// MODEL CATALOG — clean grid: image + name + price only
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
  const [sort, setSort] = useState('relevance');

  const sorted = [...stock].sort((a, b) => {
    if (sort === 'price-asc') return a.precio - b.precio;
    if (sort === 'price-desc') return b.precio - a.precio;
    if (sort === 'name') return a.modelo.localeCompare(b.modelo);
    return 0;
  });

  return (
    <main className="container" style={{ paddingTop: 40, paddingBottom: 60 }}>
      <BackLink to={`/marcas/${b.slug}`} label={`Volver a ${b.name}`} />

      <div style={{
        display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between',
        gap: 24, marginTop: 32, marginBottom: 36,
        paddingBottom: 22, borderBottom: '1px solid var(--line)'
      }}>
        <div>
          <div className="eyebrow" style={{ marginBottom: 14 }}>{b.name} · {stock.length} productos en stock</div>
          <h1 style={{
            fontFamily: 'var(--display)',
            fontSize: 'clamp(44px, 6vw, 84px)',
            fontWeight: 600, lineHeight: 0.95,
            letterSpacing: '-0.02em'
          }}>{m.name}</h1>
          <div style={{ marginTop: 10, fontFamily: 'var(--display)', fontStyle: 'italic', color: 'var(--text-dim)', fontSize: 18 }}>
            {m.tagline}
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <span className="eyebrow" style={{ color: 'var(--text-muted)' }}>Ordenar:</span>
          <select value={sort} onChange={(e) => setSort(e.target.value)}
            style={{
              background: 'transparent', color: '#fff',
              border: '1px solid var(--line-strong)',
              padding: '8px 12px',
              fontFamily: 'var(--mono)', fontSize: 11,
              letterSpacing: '0.12em', textTransform: 'uppercase'
            }}>
            <option value="relevance" style={{ background: '#000' }}>Destacados</option>
            <option value="price-asc" style={{ background: '#000' }}>Precio: menor a mayor</option>
            <option value="price-desc" style={{ background: '#000' }}>Precio: mayor a menor</option>
            <option value="name" style={{ background: '#000' }}>Nombre</option>
          </select>
        </div>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(min(280px, 100%), 1fr))',
        gap: 20
      }}>
        {sorted.map(p => (
          <CatalogCard key={p.id} product={p} brandSlug={b.slug} modelSlug={m.slug} />
        ))}
      </div>

      <div style={{ marginTop: 56 }}>
        <BackLink to={`/marcas/${b.slug}`} label={`Volver a ${b.name}`} />
      </div>
    </main>
  );
}

function CatalogCard({ product, brandSlug, modelSlug }) {
  return (
    <L to={`/marcas/${brandSlug}/${modelSlug}/${product.id}`} className="catalog-card">
      <div style={{
        position: 'relative',
        aspectRatio: '1 / 1',
        overflow: 'hidden',
        background: 'var(--bg-2)'
      }}>
        <img src={product.imagen} alt={product.modelo}
          className="cat-img"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          onError={(e) => { e.target.style.display = 'none'; }} />
        <div className="cat-overlay" style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(180deg, transparent 60%, rgba(0,0,0,0.4))',
          opacity: 0, transition: 'opacity 0.3s'
        }}></div>
        <div className="cat-cta" style={{
          position: 'absolute', bottom: 14, left: 14, right: 14,
          padding: '10px 14px',
          background: '#fff', color: '#000',
          fontFamily: 'var(--body)', fontSize: 11, fontWeight: 600,
          letterSpacing: '0.18em', textTransform: 'uppercase',
          textAlign: 'center',
          opacity: 0, transform: 'translateY(8px)',
          transition: 'all 0.3s'
        }}>
          Ver producto →
        </div>
      </div>

      <div style={{ padding: '14px 4px 4px' }}>
        <h3 style={{
          fontFamily: 'var(--body)',
          fontSize: 14, fontWeight: 500,
          color: '#fff',
          marginBottom: 6, lineHeight: 1.3,
          textWrap: 'pretty'
        }}>{product.modelo}</h3>
        <div style={{
          fontFamily: 'var(--body)', fontSize: 14, fontWeight: 600, color: '#fff'
        }}>{fmtPrice(product.precio)}</div>
      </div>
      <style>{`
        .catalog-card { display: block; }
        .catalog-card .cat-img { transition: transform 0.7s cubic-bezier(0.2,0.8,0.2,1); }
        .catalog-card:hover .cat-img { transform: scale(1.04); }
        .catalog-card:hover .cat-overlay { opacity: 1; }
        .catalog-card:hover .cat-cta { opacity: 1; transform: translateY(0); }
      `}</style>
    </L>
  );
}

// -------------------------------------------------------------
// PRODUCT DETAIL PAGE (PDP)
// -------------------------------------------------------------

function ProductDetailPage({ brandSlug, modelSlug, productoId }) {
  const b = findBrand(brandSlug);
  const m = findModel(b, modelSlug);
  const stock = getStock(brandSlug, modelSlug);
  const product = stock.find(p => p.id === productoId);
  const otherProducts = stock.filter(p => p.id !== productoId);

  const cart = useCart();
  const [selected, setSelected] = useState(null);
  const [imgIdx, setImgIdx] = useState(0);
  const [openAcc, setOpenAcc] = useState('descripcion');
  const [showSizeError, setShowSizeError] = useState(false);

  useEffect(() => {
    if (!b) { navigate('/marcas'); return; }
    if (!m) { navigate(`/marcas/${b.slug}`); return; }
    if (!product) { navigate(`/marcas/${b.slug}/${m.slug}`); return; }
  }, [b, m, product]);

  if (!b || !m || !product) return null;

  const gallery = getProductGallery(product, b.slug, m.slug);
  const available = new Set(product.tallesDisponibles.map(t => t.us));

  const handleAdd = () => {
    if (!selected) { setShowSizeError(true); return; }
    setShowSizeError(false);
    cart.add(product, selected);
  };

  return (
    <main className="container" style={{ paddingTop: 32, paddingBottom: 80 }}>
      <nav aria-label="Breadcrumb" style={{
        fontFamily: 'var(--mono)', fontSize: 11,
        letterSpacing: '0.15em', textTransform: 'uppercase',
        color: 'var(--text-muted)',
        display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 8,
        marginBottom: 32
      }}>
        <L to="/marcas" style={{ color: 'var(--text-dim)' }} className="bc-link">Stock</L>
        <span>›</span>
        <L to={`/marcas/${b.slug}`} style={{ color: 'var(--text-dim)' }} className="bc-link">{b.name}</L>
        <span>›</span>
        <L to={`/marcas/${b.slug}/${m.slug}`} style={{ color: 'var(--text-dim)' }} className="bc-link">{m.name}</L>
        <span>›</span>
        <span style={{ color: '#fff' }}>{product.modelo}</span>
        <style>{`.bc-link:hover { color: #fff !important; }`}</style>
      </nav>

      <div className="pdp-grid" style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 1.25fr) minmax(360px, 0.85fr)',
        gap: 48, alignItems: 'flex-start'
      }}>
        {/* GALLERY */}
        <div>
          <div style={{
            aspectRatio: '1 / 1',
            background: 'var(--bg-2)',
            overflow: 'hidden',
            marginBottom: 12
          }}>
            <img src={gallery[imgIdx]} alt={product.modelo}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              onError={(e) => { e.target.style.display = 'none'; }} />
          </div>
          {gallery.length > 1 && (
            <div style={{
              display: 'grid',
              gridTemplateColumns: `repeat(${Math.min(gallery.length, 6)}, 1fr)`,
              gap: 8
            }}>
              {gallery.map((src, i) => (
                <button key={i} onClick={() => setImgIdx(i)}
                  style={{
                    aspectRatio: '1 / 1',
                    background: 'var(--bg-2)',
                    overflow: 'hidden', padding: 0,
                    border: '1px solid',
                    borderColor: i === imgIdx ? '#fff' : 'var(--line)',
                    opacity: i === imgIdx ? 1 : 0.65,
                    transition: 'all 0.2s', cursor: 'pointer'
                  }}>
                  <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    onError={(e) => { e.target.style.display = 'none'; }} />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* INFO */}
        <aside style={{ position: 'sticky', top: 96 }} className="pdp-info">
          <div className="eyebrow" style={{ marginBottom: 12 }}>{b.name} · {m.name}</div>
          <h1 style={{
            fontFamily: 'var(--display)',
            fontSize: 'clamp(28px, 3.4vw, 40px)',
            fontWeight: 600, lineHeight: 1.05,
            letterSpacing: '-0.015em',
            marginBottom: 8
          }}>{product.modelo}</h1>
          <div style={{
            fontFamily: 'var(--display)', fontStyle: 'italic',
            color: 'var(--text-dim)', fontSize: 17, marginBottom: 24
          }}>{product.colorway}</div>

          <div style={{
            fontFamily: 'var(--display)',
            fontSize: 'clamp(28px, 3vw, 36px)', fontWeight: 600,
            marginBottom: 8
          }}>{fmtPrice(product.precio)}</div>
          <div style={{
            fontFamily: 'var(--mono)', fontSize: 10,
            letterSpacing: '0.16em', textTransform: 'uppercase',
            color: 'var(--text-muted)', marginBottom: 28
          }}>
            3 cuotas sin interés de {fmtPrice(Math.round(product.precio / 3))} · 10% off transferencia
          </div>

          {otherProducts.length > 0 && (
            <div style={{ marginBottom: 28 }}>
              <div className="eyebrow" style={{ marginBottom: 12, color: 'var(--text-dim)' }}>
                Otros colorways disponibles
              </div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {otherProducts.slice(0, 5).map(op => (
                  <L key={op.id} to={`/marcas/${b.slug}/${m.slug}/${op.id}`}
                    title={op.colorway}
                    style={{
                      width: 56, height: 56,
                      overflow: 'hidden',
                      border: '1px solid var(--line-strong)',
                      display: 'block'
                    }}
                    className="cw-swatch">
                    <img src={op.imagen} alt={op.colorway}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      onError={(e) => { e.target.style.display = 'none'; }} />
                  </L>
                ))}
              </div>
              <style>{`.cw-swatch { transition: all 0.2s; } .cw-swatch:hover { border-color: #fff !important; transform: scale(1.04); }`}</style>
            </div>
          )}

          <div style={{
            display: 'flex', justifyContent: 'space-between',
            alignItems: 'baseline', marginBottom: 12
          }}>
            <div className="eyebrow">Seleccionar talle</div>
            <span style={{
              fontFamily: 'var(--mono)', fontSize: 10,
              letterSpacing: '0.16em', textTransform: 'uppercase',
              color: 'var(--text-dim)',
              borderBottom: '1px solid var(--line)',
              cursor: 'pointer'
            }} onClick={() => setOpenAcc('talles')}>Guía de talles</span>
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(82px, 1fr))',
            gap: 6, marginBottom: showSizeError ? 8 : 24
          }}>
            {SIZE_TABLE.map(t => {
              const isAvail = available.has(t.us);
              const isSel = selected === t.us;
              return (
                <button key={t.us}
                  disabled={!isAvail}
                  onClick={() => { setSelected(isSel ? null : t.us); setShowSizeError(false); }}
                  className="pdp-size-btn"
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
                    letterSpacing: '0.04em',
                    transition: 'all 0.15s',
                    textDecoration: !isAvail ? 'line-through' : 'none'
                  }}>
                  <div style={{ fontWeight: 600 }}>US {t.us}</div>
                  <div style={{ fontSize: 9, opacity: 0.65, marginTop: 2 }}>UK {t.uk}</div>
                </button>
              );
            })}
          </div>
          {showSizeError && (
            <div style={{
              fontFamily: 'var(--mono)', fontSize: 11,
              letterSpacing: '0.1em', color: '#ff7a7a',
              padding: '10px 12px', border: '1px solid #ff7a7a',
              marginBottom: 16
            }}>Seleccioná un talle para continuar</div>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <button className="btn btn-primary" onClick={handleAdd}
              style={{ padding: '18px 24px', fontSize: 13 }}>
              {selected ? `Agregar al carrito · US ${selected}` : 'Agregar al carrito'} →
            </button>
            <a href={`https://wa.me/5493515558190?text=${encodeURIComponent(`Hola! Consulto por el ${product.modelo} (${product.colorway})`)}`}
              target="_blank" rel="noopener"
              className="btn btn-ghost"
              style={{ padding: '18px 24px', fontSize: 12 }}>
              Consultar por WhatsApp
            </a>
          </div>

          <ul style={{
            listStyle: 'none', padding: 0,
            marginTop: 28, paddingTop: 20,
            borderTop: '1px solid var(--line)',
            display: 'flex', flexDirection: 'column', gap: 10,
            fontFamily: 'var(--mono)', fontSize: 11,
            letterSpacing: '0.1em', textTransform: 'uppercase',
            color: 'var(--text-dim)'
          }}>
            <li>· Importación oficial — caja sellada</li>
            <li>· Envío 48 hs a todo el país</li>
            <li>· Cambio sin costo 30 días</li>
            <li>· 3 cuotas sin interés con todas las tarjetas</li>
          </ul>

          <div style={{ marginTop: 32, borderTop: '1px solid var(--line)' }}>
            <PdpAccordion id="descripcion" title="Descripción"
              open={openAcc === 'descripcion'} onToggle={setOpenAcc}>
              <p style={{ color: 'var(--text-dim)', fontSize: 14, lineHeight: 1.7 }}>
                {productDescription(product, b, m)}
              </p>
            </PdpAccordion>
            <PdpAccordion id="caracteristicas" title="Características"
              open={openAcc === 'caracteristicas'} onToggle={setOpenAcc}>
              <ul style={{ paddingLeft: 18, color: 'var(--text-dim)', fontSize: 14, lineHeight: 1.85, display: 'flex', flexDirection: 'column', gap: 6 }}>
                {productFeatures(product, b, m).map((f, i) => <li key={i}>{f}</li>)}
              </ul>
            </PdpAccordion>
            <PdpAccordion id="talles" title="Guía de talles"
              open={openAcc === 'talles'} onToggle={setOpenAcc}>
              <SizeReferenceTable compact />
            </PdpAccordion>
            <PdpAccordion id="envios" title="Envíos y cambios"
              open={openAcc === 'envios'} onToggle={setOpenAcc}>
              <p style={{ color: 'var(--text-dim)', fontSize: 14, lineHeight: 1.7, marginBottom: 8 }}>
                Despachamos en 24 hs hábiles desde Córdoba Capital. Andreani 48–72 hs al resto del país.
              </p>
              <p style={{ color: 'var(--text-dim)', fontSize: 14, lineHeight: 1.7 }}>
                Cambio de talle sin costo dentro de los 30 días, siempre que el producto no haya sido usado en superficie deportiva.
              </p>
            </PdpAccordion>
          </div>
        </aside>
      </div>

      {otherProducts.length > 0 && (
        <section style={{ marginTop: 100, paddingTop: 40, borderTop: '1px solid var(--line)' }}>
          <h2 style={{
            fontFamily: 'var(--display)',
            fontSize: 'clamp(24px, 2.6vw, 32px)',
            fontWeight: 600, letterSpacing: '-0.01em',
            marginBottom: 24
          }}>Más {m.name}</h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(240px, 100%), 1fr))',
            gap: 20
          }}>
            {otherProducts.slice(0, 4).map(p => (
              <CatalogCard key={p.id} product={p} brandSlug={b.slug} modelSlug={m.slug} />
            ))}
          </div>
        </section>
      )}

      <style>{`
        .pdp-size-btn:hover:not(:disabled) { border-color: #fff !important; background: rgba(255,255,255,0.06); }
        @media (max-width: 900px) {
          .pdp-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
          .pdp-info { position: static !important; }
        }
      `}</style>
    </main>
  );
}

function PdpAccordion({ id, title, open, onToggle, children }) {
  return (
    <div style={{ borderBottom: '1px solid var(--line)' }}>
      <button
        onClick={() => onToggle(open ? null : id)}
        style={{
          width: '100%', padding: '18px 0',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          fontFamily: 'var(--body)', fontSize: 13, fontWeight: 600,
          letterSpacing: '0.05em', color: '#fff',
          textAlign: 'left'
        }}>
        <span>{title}</span>
        <span style={{
          fontSize: 22, lineHeight: 1, color: 'var(--text-dim)',
          transition: 'transform 0.3s',
          transform: open ? 'rotate(45deg)' : 'rotate(0)',
          display: 'inline-block'
        }}>+</span>
      </button>
      {open && <div style={{ paddingBottom: 20 }}>{children}</div>}
    </div>
  );
}

function getProductGallery(product, brandSlug, modelSlug) {
  if (product.galeria && product.galeria.length > 0) return product.galeria;
  const article = ARTICLES.find(a => a.marcaSlug === brandSlug && a.modeloSlug === modelSlug);
  if (article && article.galeria && article.galeria.length > 1) {
    return [product.imagen, ...article.galeria.filter(g => g !== product.imagen).slice(0, 4)];
  }
  return [product.imagen];
}

function productDescription(p, b, m) {
  if (p.descripcion) return p.descripcion;
  return `${p.modelo} — ${p.colorway}. Botín de élite de la línea ${m.name} de ${b.name}, ` +
    `construido con las mismas tecnologías que usan los jugadores profesionales. ` +
    `Upper de alta gama, mediasuela responsiva y placa de tracción optimizada. Importación oficial con caja, accesorios y bolsa originales.`;
}

function productFeatures(p, b, m) {
  if (p.caracteristicas) return p.caracteristicas;
  return [
    `Construcción premium ${b.name} para superficies firmes (FG)`,
    `Upper técnico con ajuste anatómico y soporte interno reforzado`,
    `Placa de tracción ligera con configuración de tapones optimizada`,
    `Plantilla extraíble OrthoLite® con tratamiento antibacterial`,
    `Línea ${m.name} — ${m.tagline.toLowerCase()}`,
    `Importación oficial · 6 meses de garantía de fábrica`
  ];
}

function SizeReferenceTable({ compact }) {
  return (
    <section style={compact ? {} : { marginTop: 80 }}>
      {!compact && (
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
      )}
      <div style={{ overflowX: 'auto' }}>
        <table style={{
          width: '100%', minWidth: compact ? 0 : 520, borderCollapse: 'collapse',
          fontFamily: 'var(--mono)', fontSize: compact ? 12 : 13
        }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--line-strong)' }}>
              {['US', 'UK', 'EU', 'CM'].map(h => (
                <th key={h} style={{
                  padding: compact ? '8px 6px' : '14px 8px', textAlign: 'left',
                  fontSize: compact ? 10 : 11, letterSpacing: '0.22em',
                  color: 'var(--text-muted)', fontWeight: 500
                }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {SIZE_TABLE.map(t => (
              <tr key={t.us} style={{ borderBottom: '1px solid var(--line)' }}>
                <td style={{ padding: compact ? '8px 6px' : '12px 8px', fontWeight: 600 }}>{t.us}</td>
                <td style={{ padding: compact ? '8px 6px' : '12px 8px', color: 'var(--text-dim)' }}>{t.uk}</td>
                <td style={{ padding: compact ? '8px 6px' : '12px 8px', color: 'var(--text-dim)' }}>{t.eu}</td>
                <td style={{ padding: compact ? '8px 6px' : '12px 8px', color: 'var(--text-dim)' }}>{t.cm}</td>
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

Object.assign(window, { BrandsIndexPage, BrandModelsPage, ModelStockPage, ProductDetailPage, PageHeader });
