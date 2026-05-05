// ============================================================
// AllDropsView — vista de pantalla completa con todos los drops
// ============================================================

const AllDropsView = ({ open, onClose, onOpenDrop }) => {
  const [filter, setFilter] = useState('all'); // all | available | sold-out

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
      window.scrollTo(0, 0);
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  const filtered = PAST_DROPS.filter(d => {
    if (filter === 'all') return true;
    if (filter === 'available') return d.status === 'DISPONIBLE' || d.status === 'POCAS UNIDADES';
    if (filter === 'sold-out') return d.status === 'AGOTADO';
    return true;
  });

  const counts = {
    all: PAST_DROPS.length,
    available: PAST_DROPS.filter(d => d.status === 'DISPONIBLE' || d.status === 'POCAS UNIDADES').length,
    'sold-out': PAST_DROPS.filter(d => d.status === 'AGOTADO').length
  };

  return (
    <div className="fade-in" style={{
      position: 'fixed', inset: 0, zIndex: 200,
      background: 'var(--bg)',
      overflowY: 'auto'
    }}>
      {/* Top bar sticky */}
      <div style={{
        position: 'sticky', top: 0, zIndex: 5,
        background: 'rgba(10,10,10,0.92)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid var(--line)'
      }}>
        <div className="container" style={{
          padding: '20px 32px',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 24
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <span style={{ width: 8, height: 8, background: 'var(--accent)', borderRadius: '50%', boxShadow: '0 0 12px var(--accent)' }} />
            <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--accent)', letterSpacing: '0.25em', textTransform: 'uppercase' }}>
              Archivo de Drops
            </div>
          </div>
          <button onClick={onClose} style={{
            display: 'flex', alignItems: 'center', gap: 10,
            fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase',
            color: 'var(--text)',
            padding: '10px 18px', border: '1px solid var(--line-strong)',
            transition: 'all 0.2s'
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--line-strong)'; e.currentTarget.style.color = 'var(--text)'; }}
          >
            Volver al inicio <Icon name="close" size={14} />
          </button>
        </div>
      </div>

      {/* Hero / header */}
      <section style={{ padding: '80px 0 60px', borderBottom: '1px solid var(--line)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 60, alignItems: 'flex-end' }}>
            <div>
              <div className="eyebrow" style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 24 }}>
                <span style={{ width: 28, height: 1, background: 'var(--accent)' }} />
                Todos los drops · 2025 · 2026
              </div>
              <h1 style={{
                fontFamily: 'var(--display)',
                fontWeight: 400,
                fontSize: 'clamp(56px, 8vw, 112px)',
                lineHeight: 0.95,
                letterSpacing: '-0.035em',
                color: 'var(--cream)',
                marginBottom: 28,
                fontStyle: 'italic'
              }}>
                Cada drop,<br/>
                <span style={{ color: 'var(--accent)', fontStyle: 'normal', fontWeight: 500 }}>una historia.</span>
              </h1>
              <p style={{
                fontSize: 16, color: 'var(--text-dim)', lineHeight: 1.6, maxWidth: 540,
                textWrap: 'pretty'
              }}>
                El archivo completo de lanzamientos que pasaron por nuestro showroom. Algunos siguen disponibles, otros se fueron en horas. Cada par seleccionado, autenticado y curado.
              </p>
            </div>

            {/* Stats */}
            <div style={{
              display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1,
              background: 'var(--line)', border: '1px solid var(--line)'
            }}>
              {[
                { l: 'Drops totales', v: PAST_DROPS.length.toString().padStart(2, '0') },
                { l: 'Disponibles', v: counts.available.toString().padStart(2, '0') },
                { l: 'Agotados', v: counts['sold-out'].toString().padStart(2, '0') }
              ].map(s => (
                <div key={s.l} style={{ background: 'var(--bg)', padding: '24px 20px' }}>
                  <div style={{
                    fontFamily: 'var(--display)', fontSize: 'clamp(36px, 4vw, 52px)',
                    color: 'var(--accent-bright)', fontStyle: 'italic',
                    lineHeight: 1, fontVariantNumeric: 'tabular-nums'
                  }}>
                    {s.v}
                  </div>
                  <div style={{
                    fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: '0.25em',
                    color: 'var(--text-muted)', textTransform: 'uppercase', marginTop: 10
                  }}>
                    {s.l}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Filter bar */}
      <section style={{ padding: '32px 0', borderBottom: '1px solid var(--line)', background: 'var(--bg-2)' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 24, flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
            <span style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--text-muted)', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
              Filtrar:
            </span>
            {[
              { id: 'all', label: 'Todos' },
              { id: 'available', label: 'Disponibles' },
              { id: 'sold-out', label: 'Agotados' }
            ].map(f => (
              <button key={f.id} onClick={() => setFilter(f.id)} style={{
                padding: '8px 16px',
                fontFamily: 'var(--mono)', fontSize: 11,
                letterSpacing: '0.18em', textTransform: 'uppercase',
                background: filter === f.id ? 'var(--accent)' : 'transparent',
                color: filter === f.id ? '#000' : 'var(--text-dim)',
                border: '1px solid',
                borderColor: filter === f.id ? 'var(--accent)' : 'var(--line-strong)',
                cursor: 'pointer',
                transition: 'all 0.2s',
                display: 'flex', alignItems: 'center', gap: 8
              }}>
                {f.label}
                <span style={{
                  fontSize: 9, opacity: 0.7,
                  padding: '1px 6px',
                  background: filter === f.id ? 'rgba(0,0,0,0.15)' : 'rgba(255,255,255,0.05)'
                }}>
                  {counts[f.id]}
                </span>
              </button>
            ))}
          </div>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--text-muted)', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
            Mostrando {filtered.length.toString().padStart(2, '0')} / {PAST_DROPS.length.toString().padStart(2, '0')}
          </div>
        </div>
      </section>

      {/* Grid */}
      <section style={{ padding: '60px 0 120px' }}>
        <div className="container">
          {filtered.length === 0 ? (
            <div style={{ padding: '80px 40px', textAlign: 'center' }}>
              <div style={{ fontFamily: 'var(--display)', fontSize: 32, color: 'var(--text-dim)', fontStyle: 'italic' }}>
                Sin drops para este filtro
              </div>
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 40,
              rowGap: 64
            }}>
              {filtered.map((d, i) => (
                <DropCardLarge key={d.id} drop={d} idx={i} onClick={() => { onClose(); setTimeout(() => onOpenDrop && onOpenDrop(d.id), 50); }} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Footer CTA */}
      <section style={{ padding: '80px 0', borderTop: '1px solid var(--line)', background: 'var(--bg-2)', textAlign: 'center' }}>
        <div className="container">
          <div className="eyebrow" style={{ marginBottom: 20, justifyContent: 'center', display: 'flex' }}>
            ¿No querés perderte el próximo?
          </div>
          <h2 style={{
            fontFamily: 'var(--display)', fontSize: 'clamp(36px, 5vw, 56px)',
            fontStyle: 'italic', color: 'var(--cream)', lineHeight: 1.05,
            letterSpacing: '-0.02em', marginBottom: 32, maxWidth: 640, margin: '0 auto 32px'
          }}>
            Suscribite y recibí los próximos lanzamientos antes que nadie.
          </h2>
          <button className="btn btn-primary" onClick={onClose}>
            Volver al inicio <Icon name="arrow_right" size={14} />
          </button>
        </div>
      </section>
    </div>
  );
};

const DropCardLarge = ({ drop, idx, onClick }) => {
  const [hover, setHover] = useState(false);
  const statusColor =
    drop.status === 'AGOTADO' ? '#ef9b9b' :
    drop.status === 'POCAS UNIDADES' ? 'var(--accent)' :
    '#a7e3a7';

  return (
    <article
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{ cursor: 'pointer' }}
    >
      <div style={{ position: 'relative', aspectRatio: '4/5', overflow: 'hidden', marginBottom: 20, background: 'var(--bg-3)' }}>
        {drop.img ? (
          <img src={drop.img}
            style={{
              width: '100%', height: '100%', objectFit: 'cover',
              transform: hover ? 'scale(1.04)' : 'scale(1)',
              transition: 'transform 0.7s ease',
              filter: drop.status === 'AGOTADO' ? 'grayscale(0.4) brightness(0.7)' : 'none'
            }} />
        ) : (
          <ImgPlaceholder label={drop.imgLabel} aspect="4/5" />
        )}

        {/* Big number top-left */}
        <div style={{
          position: 'absolute', top: 16, left: 16,
          fontFamily: 'var(--display)', fontSize: 14, fontStyle: 'italic',
          color: 'var(--cream)', opacity: 0.7,
          mixBlendMode: 'difference'
        }}>
          {(idx + 1).toString().padStart(2, '0')} / {PAST_DROPS.length.toString().padStart(2, '0')}
        </div>

        {/* Status badge */}
        <div style={{
          position: 'absolute', top: 16, right: 16,
          fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.22em',
          color: statusColor,
          padding: '6px 10px',
          background: 'rgba(0,0,0,0.65)',
          backdropFilter: 'blur(8px)',
          border: '1px solid currentColor'
        }}>
          {drop.status}
        </div>

        {/* Date bottom-right */}
        <div style={{
          position: 'absolute', bottom: 16, right: 16,
          fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--cream)',
          letterSpacing: '0.2em',
          padding: '6px 10px',
          background: 'rgba(0,0,0,0.55)',
          backdropFilter: 'blur(6px)'
        }}>
          {drop.date}
        </div>

        {/* Hover overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(180deg, transparent 50%, rgba(10,10,10,0.85))',
          opacity: hover ? 1 : 0,
          transition: 'opacity 0.4s ease',
          display: 'flex', alignItems: 'flex-end', padding: 24
        }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 10,
            fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.22em',
            color: 'var(--accent)', textTransform: 'uppercase',
            transform: hover ? 'translateY(0)' : 'translateY(8px)',
            transition: 'transform 0.4s ease'
          }}>
            Ver detalle <Icon name="arrow_right" size={12} />
          </div>
        </div>
      </div>

      <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--accent)', letterSpacing: '0.22em', textTransform: 'uppercase', marginBottom: 10 }}>
        {drop.brand}
      </div>
      <h3 style={{
        fontFamily: 'var(--display)',
        fontSize: 32, color: 'var(--text)', fontStyle: 'italic', marginBottom: 8,
        lineHeight: 1.1, letterSpacing: '-0.01em'
      }}>
        {drop.title}
      </h3>
      <p style={{ color: 'var(--text-dim)', fontSize: 14, lineHeight: 1.5 }}>{drop.subtitle}</p>
    </article>
  );
};

Object.assign(window, { AllDropsView });
