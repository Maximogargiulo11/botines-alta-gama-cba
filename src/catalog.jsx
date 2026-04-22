// ============================================================
// Catálogo con filtros por marca + talle
// ============================================================

const Catalog = ({ onViewProduct, brandFilter, setBrandFilter }) => {
  const [sizeFilter, setSizeFilter] = useState(null);
  const [sortBy, setSortBy] = useState('featured');
  const [wishlist, setWishlist] = useState(new Set());

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
    <section id="catalog" data-screen-label="04 Catalog" style={{ padding: '120px 0', background: 'var(--bg)' }}>
      <div className="container">
        <SectionHeader
          eyebrow="Catálogo completo"
          title={<>La colección<br /><em>disponible hoy.</em></>}
          subtitle="Todos los pares en stock, con talles reales y fotos propias. Filtrá por marca, talle o modelo."
        />

        {/* Filter bar */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr auto',
          alignItems: 'center',
          gap: 24,
          marginBottom: 40,
          paddingBottom: 20,
          borderBottom: '1px solid var(--line)',
          flexWrap: 'wrap'
        }}>
          <div style={{ display: 'flex', gap: 24, alignItems: 'center', flexWrap: 'wrap' }}>
            {/* Marca */}
            <FilterGroup label="Marca">
              <FilterPill active={!brandFilter} onClick={() => setBrandFilter(null)}>Todas</FilterPill>
              {BRANDS.map(b => (
                <FilterPill key={b.id} active={brandFilter === b.id} onClick={() => setBrandFilter(b.id)}>
                  {b.name}
                </FilterPill>
              ))}
            </FilterGroup>

            <div style={{ width: 1, height: 28, background: 'var(--line)' }} />

            {/* Talle */}
            <FilterGroup label="Talle">
              <FilterPill active={!sizeFilter} onClick={() => setSizeFilter(null)}>Todos</FilterPill>
              {ALL_SIZES.map(s => (
                <FilterPill key={s} active={sizeFilter === s} onClick={() => setSizeFilter(s)}>
                  {s}
                </FilterPill>
              ))}
            </FilterGroup>
          </div>

          {/* Sort */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--text-muted)', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
              Orden:
            </span>
            <select value={sortBy} onChange={e => setSortBy(e.target.value)} style={{
              background: 'transparent', color: 'var(--text)',
              border: '1px solid var(--line-strong)', padding: '8px 12px',
              fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.1em'
            }}>
              <option value="featured" style={{ background: '#000' }}>DESTACADOS</option>
              <option value="price-asc" style={{ background: '#000' }}>PRECIO ↑</option>
              <option value="price-desc" style={{ background: '#000' }}>PRECIO ↓</option>
            </select>
          </div>
        </div>

        {/* Result count */}
        <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--text-muted)', letterSpacing: '0.2em', marginBottom: 32 }}>
          {filtered.length.toString().padStart(2, '0')} PARES DISPONIBLES
          {brandFilter && <span style={{ color: 'var(--accent)' }}> · {BRANDS.find(b => b.id === brandFilter)?.name}</span>}
          {sizeFilter && <span style={{ color: 'var(--accent)' }}> · TALLE {sizeFilter}</span>}
        </div>

        {/* Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 1,
          background: 'var(--line)',
          borderTop: '1px solid var(--line)',
          borderLeft: '1px solid var(--line)',
        }}>
          {filtered.length === 0 ? (
            <div style={{ gridColumn: '1 / -1', background: 'var(--bg)', padding: '80px 40px', textAlign: 'center' }}>
              <div style={{ fontFamily: 'var(--display)', fontSize: 32, color: 'var(--text-dim)', fontStyle: 'italic' }}>
                Sin resultados
              </div>
              <div style={{ color: 'var(--text-muted)', marginTop: 12 }}>Probá ajustando los filtros.</div>
            </div>
          ) : filtered.map(p => (
            <ProductCard key={p.id} p={p}
              onView={() => onViewProduct(p.id)}
              onWish={() => toggleWish(p.id)}
              wished={wishlist.has(p.id)}
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
    padding: '7px 14px',
    fontFamily: 'var(--mono)',
    fontSize: 11,
    letterSpacing: '0.15em',
    textTransform: 'uppercase',
    background: active ? 'var(--accent)' : 'transparent',
    color: active ? '#000' : 'var(--text-dim)',
    border: '1px solid',
    borderColor: active ? 'var(--accent)' : 'var(--line-strong)',
    transition: 'all 0.2s',
    cursor: 'pointer'
  }}
    onMouseEnter={e => { if (!active) e.currentTarget.style.borderColor = 'var(--accent)'; }}
    onMouseLeave={e => { if (!active) e.currentTarget.style.borderColor = 'var(--line-strong)'; }}
  >
    {children}
  </button>
);

const ProductCard = ({ p, onView, onWish, wished }) => {
  const [hover, setHover] = useState(false);
  const brand = BRANDS.find(b => b.id === p.brand);

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: 'var(--bg)',
        padding: 24,
        cursor: 'pointer',
        position: 'relative',
        transition: 'background 0.3s'
      }}
      onClick={onView}
    >
      {/* Image */}
      <div style={{ position: 'relative', marginBottom: 20 }}>
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

        {/* Badges sobre imagen */}
        <div style={{ position: 'absolute', top: 12, left: 12, display: 'flex', flexDirection: 'column', gap: 6 }}>
          {p.badge && <Badge variant={p.badge === 'Edición Limitada' ? 'solid' : 'dark'}>{p.badge}</Badge>}
        </div>

        {/* Wishlist */}
        <button onClick={(e) => { e.stopPropagation(); onWish(); }}
          style={{
            position: 'absolute', top: 12, right: 12,
            width: 36, height: 36,
            background: 'rgba(10,10,10,0.7)',
            backdropFilter: 'blur(8px)',
            border: '1px solid var(--line)',
            color: wished ? 'var(--accent)' : 'var(--text)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer'
          }}>
          <Icon name="heart" size={14} style={{ fill: wished ? 'currentColor' : 'none' }} />
        </button>

        {/* Quick view strip */}
        <div style={{
          position: 'absolute', left: 0, right: 0, bottom: 0,
          padding: '12px 16px',
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
      </div>

      {/* Info */}
      <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--accent)', letterSpacing: '0.22em', textTransform: 'uppercase', marginBottom: 8 }}>
        {brand?.name}
      </div>
      <div style={{
        fontFamily: 'var(--display)',
        fontSize: 18,
        color: 'var(--text)',
        marginBottom: 4,
        lineHeight: 1.3,
      }}>
        {p.name}
      </div>
      <div style={{ fontSize: 12, color: 'var(--text-dim)', marginBottom: 16 }}>
        {p.colorway}
      </div>

      {/* Talles compactos */}
      <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', marginBottom: 16 }}>
        {ALL_SIZES.map(s => {
          const available = p.sizes.includes(s);
          return (
            <span key={s} style={{
              fontFamily: 'var(--mono)',
              fontSize: 10,
              padding: '4px 8px',
              border: '1px solid',
              borderColor: available ? 'var(--line-strong)' : 'var(--line)',
              color: available ? 'var(--text)' : 'var(--text-muted)',
              textDecoration: available ? 'none' : 'line-through',
              opacity: available ? 1 : 0.4,
              background: 'transparent'
            }}>{s}</span>
          );
        })}
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 16, borderTop: '1px solid var(--line)' }}>
        <span style={{ fontFamily: 'var(--display)', fontSize: 20, color: 'var(--cream)' }}>
          {fmtPrice(p.price)}
        </span>
        <span style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--text-muted)', letterSpacing: '0.15em' }}>
          3× {fmtPrice(Math.round(p.price / 3))}
        </span>
      </div>
    </div>
  );
};

Object.assign(window, { Catalog, ProductCard });
