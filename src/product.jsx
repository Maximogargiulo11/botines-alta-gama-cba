// ============================================================
// Product detail overlay
// ============================================================

const ProductDetail = ({ productId, onClose, onAddToCart }) => {
  const p = PRODUCTS.find(x => x.id === productId);
  const [size, setSize] = useState(null);
  const [imgIdx, setImgIdx] = useState(0);
  if (!p) return null;

  const brand = BRANDS.find(b => b.id === p.brand);
  const gallery = p.id === 'f50-hora-dorada'
    ? ['assets/botin-dorado-rock.jpg', 'assets/hero-messi-standing.jpg', 'assets/botin-suela.jpg', 'assets/messi-sitting-rock.jpg']
    : [null, null, null];

  const add = () => {
    if (!size) { alert('Elegí un talle'); return; }
    onAddToCart({ ...p, size, qty: 1 });
    onClose();
  };

  return (
    <div className="fade-in" style={{
      position: 'fixed', inset: 0, zIndex: 200, background: 'var(--bg)',
      overflowY: 'auto'
    }}>
      {/* Top close bar */}
      <div style={{
        position: 'sticky', top: 0, zIndex: 5,
        background: 'rgba(10,10,10,0.9)', backdropFilter: 'blur(16px)',
        borderBottom: '1px solid var(--line)',
        padding: '16px 32px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center'
      }}>
        <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--text-muted)', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
          <span style={{ color: 'var(--accent)' }}>●</span> FICHA DE PRODUCTO
        </div>
        <button onClick={onClose} style={{
          display: 'flex', alignItems: 'center', gap: 10,
          fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase',
          color: 'var(--text)',
          padding: '8px 16px', border: '1px solid var(--line-strong)'
        }}>
          Cerrar <Icon name="close" size={14} />
        </button>
      </div>

      <div className="container" style={{
        display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: 80, padding: '60px 32px 120px'
      }}>
        {/* Gallery */}
        <div>
          <div style={{ aspectRatio: '4/5', background: 'var(--bg-3)', marginBottom: 16, overflow: 'hidden' }}>
            {gallery[imgIdx] ? (
              <img src={gallery[imgIdx]} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <ImgPlaceholder label={p.imgLabel || p.name} aspect="4/5" />
            )}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
            {gallery.map((src, i) => (
              <button key={i} onClick={() => setImgIdx(i)} style={{
                aspectRatio: '1/1', overflow: 'hidden',
                background: 'var(--bg-3)',
                border: '1px solid', borderColor: imgIdx === i ? 'var(--accent)' : 'var(--line)',
                padding: 0, cursor: 'pointer'
              }}>
                {src ? (
                  <img src={src} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <div style={{
                    width: '100%', height: '100%',
                    backgroundImage: 'repeating-linear-gradient(45deg, rgba(200,152,83,0.08) 0, rgba(200,152,83,0.08) 1px, transparent 1px, transparent 8px)'
                  }} />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Info */}
        <div>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--accent)', letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: 16 }}>
            {brand.name} · {p.line}
          </div>
          <h1 style={{
            fontFamily: 'var(--display)', fontSize: 56, fontStyle: 'italic',
            letterSpacing: '-0.02em', lineHeight: 1.02, marginBottom: 20, color: 'var(--cream)'
          }}>
            {p.name}
          </h1>
          <div style={{ fontSize: 15, color: 'var(--text-dim)', marginBottom: 32, lineHeight: 1.6, textWrap: 'pretty' }}>
            Colorway <span style={{ color: 'var(--cream)' }}>{p.colorway}</span>. Una silueta que redefine la velocidad en el fútbol profesional, con upper ultraligero y placa de carbono para máxima transferencia de energía.
          </div>

          {/* Precio */}
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 16, marginBottom: 32, paddingBottom: 24, borderBottom: '1px solid var(--line)' }}>
            <span style={{ fontFamily: 'var(--display)', fontSize: 44, color: 'var(--cream)' }}>{fmtPrice(p.price)}</span>
            <span style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--text-dim)', letterSpacing: '0.15em' }}>
              3 cuotas sin interés de {fmtPrice(Math.round(p.price / 3))}
            </span>
          </div>

          {/* Talles */}
          <div style={{ marginBottom: 32 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 14 }}>
              <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--text)', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
                Seleccioná talle
              </span>
              <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--text-muted)', letterSpacing: '0.15em' }}>
                Guía de talles
              </span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 6 }}>
              {ALL_SIZES.map(s => {
                const avail = p.sizes.includes(s);
                const active = size === s;
                return (
                  <button key={s} disabled={!avail}
                    onClick={() => setSize(s)}
                    style={{
                      padding: '14px 0',
                      fontFamily: 'var(--mono)',
                      fontSize: 13,
                      background: active ? 'var(--accent)' : 'transparent',
                      color: active ? '#000' : avail ? 'var(--text)' : 'var(--text-muted)',
                      border: '1px solid',
                      borderColor: active ? 'var(--accent)' : avail ? 'var(--line-strong)' : 'var(--line)',
                      cursor: avail ? 'pointer' : 'not-allowed',
                      opacity: avail ? 1 : 0.35,
                      textDecoration: avail ? 'none' : 'line-through',
                      position: 'relative'
                    }}
                  >
                    {s}
                  </button>
                );
              })}
            </div>
          </div>

          {/* CTAs */}
          <div style={{ display: 'flex', gap: 10, marginBottom: 32 }}>
            <button onClick={add} className="btn btn-primary" style={{ flex: 1, padding: '18px 28px' }}>
              Agregar a la bolsa <Icon name="bag" size={14} />
            </button>
            <button style={{
              width: 56, border: '1px solid var(--line-strong)',
              color: 'var(--text)', display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              <Icon name="heart" size={18} />
            </button>
          </div>

          {/* Metadata expandible */}
          <div style={{ display: 'grid', gap: 1, background: 'var(--line)', border: '1px solid var(--line)' }}>
            {[
              { icon: 'shield', title: 'Autenticidad', text: 'Certificado + foto del par antes del envío' },
              { icon: 'truck', title: 'Envío', text: '48h a todo el país · Gratis >$400.000' },
              { icon: 'check', title: 'Cambios', text: 'Cambio de talle sin costo dentro de los 7 días' },
            ].map(m => (
              <div key={m.title} style={{ background: 'var(--bg)', padding: '18px 20px', display: 'flex', gap: 14, alignItems: 'center' }}>
                <div style={{ color: 'var(--accent)', flexShrink: 0 }}>
                  <Icon name={m.icon} size={16} />
                </div>
                <div>
                  <div style={{ fontSize: 12, color: 'var(--text)', marginBottom: 2, fontWeight: 500 }}>{m.title}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-dim)' }}>{m.text}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

Object.assign(window, { ProductDetail });
