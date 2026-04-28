// ============================================================
// Catálogo con filtros por marca + talle
// ============================================================

const Catalog = ({ onViewProduct, brandFilter, setBrandFilter }) => {
  const [sizeFilter, setSizeFilter] = useState(null);
  const [sortBy, setSortBy] = useState('featured');
  const [wishlist, setWishlist] = useState(new Set());
  const isMobile = useMobile();

  const toggleWish = (id) => {
    setWishlist(s => {
      const n = new Set(s);
      n.has(id) ? n.delete(id) : n.add(id);
      return n;
    });
  };

  const filtered = useMemo(() => {
    let list = PRODUCTS.filter(p =>
      (!brandFilter || p.brand === brandFilter) &&
      (!sizeFilter || p.sizes.includes(sizeFilter))
    );
    if (sortBy === 'price-asc') list = [...list].sort((a,b) => a.price - b.price);
    else if (sortBy === 'price-desc') list = [...list].sort((a,b) => b.price - a.price);
    else if (sortBy === 'featured') list = [...list].sort((a,b) => (b.featured?1:0) - (a.featured?1:0));
    return list;
  }, [brandFilter, sizeFilter, sortBy]);

  return (
    <section id="catalog" data-screen-label="04 Catalog" style={{ padding: isMobile ? '72px 0' : '120px 0', background: 'var(--bg)' }}>
      <div className="container">
        <SectionHeader
          eyebrow="Catálogo completo"
          title={<>La colección<br /><em>disponible hoy.</em></>}
          subtitle={isMobile ? null : "Todos los pares en stock, con talles reales. Filtrá por marca, talle o modelo."}
        />

        {/* Filtros */}
        <div style={{ marginBottom: 24, paddingBottom: 20, borderBottom: '1px solid var(--line)' }}>
          {/* Marca — scroll horizontal en mobile */}
          <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }} className="h-scroll">
            <div style={{ display: 'flex', gap: isMobile ? 16 : 24, alignItems: 'center', paddingBottom: 16, minWidth: 'max-content' }}>
              <span style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--text-muted)', letterSpacing: '0.2em', textTransform: 'uppercase', flexShrink: 0 }}>Marca</span>
              <div style={{ display: 'flex', gap: 6 }}>
                <FilterPill active={!brandFilter} onClick={() => setBrandFilter(null)}>Todas</FilterPill>
                {BRANDS.map(b => (
                  <FilterPill key={b.id} active={brandFilter === b.id} onClick={() => setBrandFilter(b.id)}>
                    {b.name}
                  </FilterPill>
                ))}
              </div>
            </div>
          </div>

          {/* Talle + orden */}
          <div style={{ display: 'flex', gap: 12, alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap' }}>
            <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch', flex: 1 }} className="h-scroll">
              <div style={{ display: 'flex', gap: 6, minWidth: 'max-content' }}>
                <FilterPill active={!sizeFilter} onClick={() => setSizeFilter(null)}>Todos</FilterPill>
                {ALL_SIZES.map(s => (
                  <FilterPill key={s} active={sizeFilter === s} onClick={() => setSizeFilter(s)}>{s}</FilterPill>
                ))}
              </div>
            </div>
            <select value={sortBy} onChange={e => setSortBy(e.target.value)} style={{
              background: 'transparent', color: 'var(--text)',
              border: '1px solid var(--line-strong)', padding: '8px 10px',
              fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.1em',
              flexShrink: 0
            }}>
              <option value="featured" style={{ background: '#000' }}>DESTACADOS</option>
              <option value="price-asc" style={{ background: '#000' }}>PRECIO ↑</option>
              <option value="price-desc" style={{ background: '#000' }}>PRECIO ↓</option>
            </select>
          </div>
        </div>

        {/* Conteo */}
        <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--text-muted)', letterSpacing: '0.2em', marginBottom: 24 }}>
          {filtered.length.toString().padStart(2, '0')} PARES
          {brandFilter && <span style={{ color: 'var(--accent)' }}> · {BRANDS.find(b => b.id === brandFilter)?.name}</span>}
          {sizeFilter && <span style={{ color: 'var(--accent)' }}> · T.{sizeFilter}</span>}
        </div>

        {/* Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
          gap: 1,
          background: 'var(--line)',
          borderTop: '1px solid var(--line)',
          borderLeft: '1px solid var(--line)',
        }}>
          {filtered.length === 0 ? (
            <div style={{ gridColumn: '1 / -1', background: 'var(--bg)', padding: '60px 20px', textAlign: 'center' }}>
              <div style={{ fontFamily: 'var(--display)', fontSize: 28, color: 'var(--text-dim)', fontStyle: 'italic' }}>Sin resultados</div>
              <div style={{ color: 'var(--text-muted)', marginTop: 12 }}>Probá ajustando los filtros.</div>
            </div>
          ) : filtered.map(p => (
            <ProductCard key={p.id} p={p}
              onView={() => onViewProduct(p.id)}
              onWish={() => toggleWish(p.id)}
              wished={wishlist.has(p.id)}
              isMobile={isMobile}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const FilterGroup = ({ label, children }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
    <span style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--text-muted)', letterSpacing: '0.2em', textTransform: 'uppercase' }}>{label}</span>
    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>{children}</div>
  </div>
);

const FilterPill = ({ active, onClick, children }) => (
  <button onClick={onClick} style={{
    padding: '7px 12px',
    fontFamily: 'var(--mono)',
    fontSize: 11,
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    background: active ? 'var(--accent)' : 'transparent',
    color: active ? '#000' : 'var(--text-dim)',
    border: '1px solid',
    borderColor: active ? 'var(--accent)' : 'var(--line-strong)',
    transition: 'all 0.2s',
    cursor: 'pointer',
    whiteSpace: 'nowrap'
  }}>
    {children}
  </button>
);

const ProductCard = ({ p, onView, onWish, wished, isMobile }) => {
  const [hover, setHover] = useState(false);
  const brand = BRANDS.find(b => b.id === p.brand);

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: 'var(--bg)',
        padding: isMobile ? 12 : 24,
        cursor: 'pointer',
        position: 'relative',
        transition: 'background 0.3s'
      }}
      onClick={onView}
    >
      {/* Image */}
      <div style={{ position: 'relative', marginBottom: isMobile ? 12 : 20 }}>
        {p.img ? (
          <div style={{ aspectRatio: '1/1', overflow: 'hidden', background: 'var(--bg-3)' }}>
            <img src={p.img} alt={p.name}
              style={{
                width: '100%', height: '100%', objectFit: p.imgFit || 'cover',
                transform: hover ? 'scale(1.05)' : 'scale(1)',
                transition: 'transform 0.6s ease'
              }} />
          </div>
        ) : (
          <ImgPlaceholder label={p.imgLabel || p.name} aspect="1/1" />
        )}

        {/* Badges */}
        <div style={{ position: 'absolute', top: 8, left: 8, display: 'flex', flexDirection: 'column', gap: 4 }}>
          {p.badge && <Badge variant={p.badge === 'Edición Limitada' ? 'solid' : 'dark'} style={{ fontSize: 9, padding: '4px 8px' }}>{p.badge}</Badge>}
        </div>

        {/* Wishlist */}
        <button onClick={(e) => { e.stopPropagation(); onWish(); }}
          style={{
            position: 'absolute', top: 8, right: 8,
            width: isMobile ? 30 : 36, height: isMobile ? 30 : 36,
            background: 'rgba(10,10,10,0.7)',
            backdropFilter: 'blur(8px)',
            border: '1px solid var(--line)',
            color: wished ? 'var(--accent)' : 'var(--text)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer'
          }}>
          <Icon name="heart" size={12} style={{ fill: wished ? 'currentColor' : 'none' }} />
        </button>

        {/* Quick view — solo desktop */}
        {!isMobile && (
          <div style={{
            position: 'absolute', left: 0, right: 0, bottom: 0,
            padding: '10px 14px',
            background: 'rgba(10,10,10,0.85)',
            backdropFilter: 'blur(10px)',
            transform: hover ? 'translateY(0)' : 'translateY(100%)',
            transition: 'transform 0.3s ease',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.2em',
            color: 'var(--accent)', textTransform: 'uppercase'
          }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Icon name="eye" size={12} /> Ver ficha</span>
            <span>{p.sizes.length} talles</span>
          </div>
        )}
      </div>

      {/* Info */}
      <div style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--accent)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 6 }}>
        {brand?.name}
      </div>
      <div style={{ fontFamily: 'var(--display)', fontSize: isMobile ? 14 : 18, color: 'var(--text)', marginBottom: isMobile ? 2 : 4, lineHeight: 1.3 }}>
        {p.name}
      </div>
      {!isMobile && (
        <div style={{ fontSize: 12, color: 'var(--text-dim)', marginBottom: 14 }}>{p.colorway}</div>
      )}

      {/* Talles compactos — ocultos en mobile para ahorrar espacio */}
      {!isMobile && (
        <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', marginBottom: 14 }}>
          {ALL_SIZES.map(s => {
            const available = p.sizes.includes(s);
            return (
              <span key={s} style={{
                fontFamily: 'var(--mono)', fontSize: 10, padding: '3px 6px',
                border: '1px solid',
                borderColor: available ? 'var(--line-strong)' : 'var(--line)',
                color: available ? 'var(--text)' : 'var(--text-muted)',
                textDecoration: available ? 'none' : 'line-through',
                opacity: available ? 1 : 0.4,
              }}>{s}</span>
            );
          })}
        </div>
      )}

      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        paddingTop: isMobile ? 10 : 14, borderTop: '1px solid var(--line)',
        marginTop: isMobile ? 8 : 0
      }}>
        <span style={{ fontFamily: 'var(--display)', fontSize: isMobile ? 15 : 20, color: 'var(--cream)' }}>
          {fmtPrice(p.price)}
        </span>
        {!isMobile && (
          <span style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--text-muted)', letterSpacing: '0.1em' }}>
            3× {fmtPrice(Math.round(p.price / 3))}
          </span>
        )}
      </div>
    </div>
  );
};

Object.assign(window, { Catalog, ProductCard });
