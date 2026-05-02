// ============================================================
// Drops: countdown + archivo de drops pasados
// ============================================================

const useCountdown = (targetISO) => {
  const [remaining, setRemaining] = useState(() => computeRemaining(targetISO));
  useEffect(() => {
    const id = setInterval(() => setRemaining(computeRemaining(targetISO)), 1000);
    return () => clearInterval(id);
  }, [targetISO]);
  return remaining;
};

function computeRemaining(targetISO) {
  const diff = Math.max(0, new Date(targetISO).getTime() - Date.now());
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const mins = Math.floor((diff % 3600000) / 60000);
  const secs = Math.floor((diff % 60000) / 1000);
  return { days, hours, mins, secs };
}

const pad = (n) => n.toString().padStart(2, '0');

const DropsSection = ({ onNotify, onViewAll }) => {
  const t = useCountdown(NEXT_DROP.dateISO);
  const isMobile = useMobile();

  return (
    <section id="drops" data-screen-label="02 Drops" style={{
      position: 'relative',
      padding: isMobile ? '72px 0' : '120px 0',
      background: 'var(--bg-2)',
      borderTop: '1px solid var(--line)',
      borderBottom: '1px solid var(--line)',
      overflow: 'hidden'
    }}>
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse at 80% 20%, rgba(200,152,83,0.08), transparent 60%)'
      }} />

      <div className="container" style={{ position: 'relative' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1.1fr 0.9fr',
          gap: isMobile ? 40 : 80,
          alignItems: 'center',
          marginBottom: isMobile ? 60 : 100
        }}>
          {/* Countdown */}
          <div>
            <div className="eyebrow" style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: isMobile ? 16 : 24 }}>
              <span style={{ width: 28, height: 1, background: 'var(--accent)' }} />
              Próximo drop
            </div>
            <h2 style={{
              fontFamily: 'var(--display)',
              fontSize: isMobile ? 'clamp(40px, 12vw, 60px)' : 'clamp(44px, 6vw, 80px)',
              lineHeight: 0.98,
              letterSpacing: '-0.025em',
              color: 'var(--cream)',
              marginBottom: isMobile ? 16 : 24,
              fontStyle: 'italic'
            }}>
              Mercurial<br />
              <span style={{ color: 'var(--accent)', fontStyle: 'normal' }}>Superfly 10</span>
            </h2>
            {!isMobile && (
              <p style={{ fontSize: 16, color: 'var(--text-dim)', lineHeight: 1.6, maxWidth: 480, marginBottom: 32, textWrap: 'pretty' }}>
                {NEXT_DROP.description}
              </p>
            )}

            {/* Countdown */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: isMobile ? 8 : 16,
              marginBottom: isMobile ? 28 : 40,
              maxWidth: isMobile ? '100%' : 520
            }}>
              {[
                { label: 'Días', val: pad(t.days) },
                { label: 'Hs', val: pad(t.hours) },
                { label: 'Min', val: pad(t.mins) },
                { label: 'Seg', val: pad(t.secs) }
              ].map((c, i) => (
                <div key={i} style={{
                  border: '1px solid var(--line)',
                  background: 'rgba(10,10,10,0.5)',
                  padding: isMobile ? '14px 8px' : '20px 16px',
                  textAlign: 'center',
                }}>
                  <div style={{
                    fontFamily: 'var(--display)',
                    fontSize: isMobile ? 'clamp(32px, 8vw, 44px)' : 'clamp(40px, 5vw, 56px)',
                    lineHeight: 1,
                    color: 'var(--accent-bright)',
                    fontVariantNumeric: 'tabular-nums'
                  }}>
                    {c.val}
                  </div>
                  <div style={{
                    fontFamily: 'var(--mono)',
                    fontSize: 9,
                    letterSpacing: '0.25em',
                    color: 'var(--text-muted)',
                    textTransform: 'uppercase',
                    marginTop: 6
                  }}>
                    {c.label}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: 14, alignItems: 'center', flexWrap: 'wrap' }}>
              <button className="btn btn-primary" onClick={onNotify}
                style={{ flex: isMobile ? 1 : 'none' }}>
                Avisame <Icon name="bolt" size={14} />
              </button>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--text-muted)', letterSpacing: '0.12em' }}>
                {NEXT_DROP.units} unidades · {fmtPrice(NEXT_DROP.price)}
              </div>
            </div>
          </div>

          {/* Preview visual — solo desktop */}
          {!isMobile && (
            <div style={{ position: 'relative', aspectRatio: '4/5', maxWidth: 480, justifySelf: 'end', width: '100%' }}>
              <div style={{
                position: 'absolute', inset: 0,
                background: 'var(--bg-3)',
                backgroundImage: 'repeating-linear-gradient(45deg, rgba(200,152,83,0.08) 0, rgba(200,152,83,0.08) 1px, transparent 1px, transparent 12px)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                border: '1px solid var(--line)'
              }}>
                <div style={{ textAlign: 'center', padding: 40 }}>
                  <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--accent)', letterSpacing: '0.3em', marginBottom: 16 }}>
                    TEASER · EN 7 DÍAS
                  </div>
                  <div style={{ fontFamily: 'var(--display)', fontSize: 32, color: 'var(--text-dim)', fontStyle: 'italic', lineHeight: 1.2, marginBottom: 20 }}>
                    La silueta se<br/>revela pronto.
                  </div>
                  <div style={{
                    width: '100%', aspectRatio: '1/1', maxWidth: 280, margin: '0 auto',
                    background: 'rgba(10,10,10,0.6)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    border: '1px solid rgba(200,152,83,0.2)'
                  }}>
                    <div style={{ fontSize: 64, color: 'var(--accent)', opacity: 0.6, fontFamily: 'var(--display)', fontStyle: 'italic' }}>?</div>
                  </div>
                </div>
              </div>
              <div style={{
                position: 'absolute', top: -1, right: -1, padding: '8px 14px',
                background: 'var(--accent)', color: '#000',
                fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.2em'
              }}>
                28 / 04 / 2026
              </div>
            </div>
          )}
        </div>

        {/* Drops anteriores */}
        <div style={{ paddingTop: isMobile ? 40 : 60, borderTop: '1px solid var(--line)' }}>
          <SectionHeader
            eyebrow="Archivo"
            title="Drops recientes"
            right={!isMobile && (
              <button onClick={onViewAll} style={{
                fontFamily: 'var(--mono)', fontSize: 11,
                color: 'var(--text)', letterSpacing: '0.2em', textTransform: 'uppercase',
                display: 'flex', alignItems: 'center', gap: 10,
                paddingBottom: 4, borderBottom: '1px solid var(--line-strong)'
              }}>
                Ver todos <Icon name="arrow_right" size={12} />
              </button>
            )}
          />
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
            gap: isMobile ? 28 : 32
          }}>
            {ALL_DROPS.slice(0, 3).map((d, i) => (
              <DropCard key={d.id} drop={d} idx={i} isMobile={isMobile} />
            ))}
          </div>
          {isMobile && (
            <div style={{ textAlign: 'center', marginTop: 32 }}>
              <button onClick={onViewAll} className="btn btn-ghost" style={{ width: '100%', justifyContent: 'center' }}>
                Ver todos los drops <Icon name="arrow_right" size={14} />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

const DropCard = ({ drop, idx, isMobile }) => {
  const [hover, setHover] = useState(false);
  return (
    <article
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{ cursor: 'pointer' }}
    >
      <div style={{
        position: 'relative',
        aspectRatio: isMobile ? '16/9' : '4/5',
        overflow: 'hidden', marginBottom: 16, background: 'var(--bg-3)'
      }}>
        {drop.img ? (
          <img src={drop.img}
            style={{
              width: '100%', height: '100%', objectFit: 'cover',
              transform: hover ? 'scale(1.03)' : 'scale(1)',
              transition: 'transform 0.6s ease'
            }} />
        ) : (
          <ImgPlaceholder label={drop.imgLabel} aspect={isMobile ? '16/9' : '4/5'} />
        )}
        <div style={{
          position: 'absolute', top: 12, left: 12,
          fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.2em',
          color: drop.status === 'AGOTADO' ? '#ef9b9b' : drop.status === 'POCAS UNIDADES' ? 'var(--accent)' : '#a7e3a7',
          padding: '5px 10px',
          background: 'rgba(0,0,0,0.6)',
          backdropFilter: 'blur(8px)',
          border: '1px solid currentColor'
        }}>
          {drop.status}
        </div>
        <div style={{
          position: 'absolute', bottom: 12, right: 12,
          fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--cream)',
          letterSpacing: '0.2em', opacity: 0.8
        }}>
          {drop.date}
        </div>
      </div>

      <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--accent)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 8 }}>
        0{idx + 1} · {drop.brand}
      </div>
      <h3 style={{
        fontFamily: 'var(--display)',
        fontSize: isMobile ? 22 : 28, color: 'var(--text)', fontStyle: 'italic', marginBottom: 4,
        lineHeight: 1.15
      }}>
        {drop.title}
      </h3>
      <p style={{ color: 'var(--text-dim)', fontSize: 13 }}>{drop.subtitle}</p>
    </article>
  );
};

const DropsPage = ({ onClose }) => {
  const isMobile = useMobile();

  return (
    <div className="fade-in" style={{
      minHeight: 'calc(100vh - 85px)',
      background: 'var(--bg)',
    }}>
      {/* Sticky sub-header (below the Nav) */}
      <div style={{
        position: 'sticky',
        top: isMobile ? 76 : 96,
        background: 'rgba(0,0,0,0.92)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid var(--line)',
        padding: isMobile ? '16px 20px' : '18px 32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        zIndex: 10
      }}>
        <button
          onClick={onClose}
          style={{
            display: 'flex', alignItems: 'center', gap: 10,
            fontFamily: 'var(--mono)', fontSize: 11,
            letterSpacing: '0.2em', textTransform: 'uppercase',
            color: 'var(--text-dim)'
          }}
        >
          <Icon name="chevron_left" size={16} />
          Volver
        </button>
        <div style={{
          fontFamily: 'var(--mono)', fontSize: 10,
          letterSpacing: '0.25em', textTransform: 'uppercase',
          color: 'var(--text-muted)'
        }}>
          {ALL_DROPS.length} drops
        </div>
      </div>

      <div className="container" style={{ paddingTop: isMobile ? 48 : 72, paddingBottom: 100 }}>
        <div style={{ marginBottom: isMobile ? 48 : 72 }}>
          <div className="eyebrow" style={{ marginBottom: 16 }}>Archivo completo</div>
          <h1 style={{
            fontFamily: 'var(--display)',
            fontSize: isMobile ? 'clamp(48px, 14vw, 72px)' : 'clamp(56px, 7vw, 96px)',
            lineHeight: 0.95,
            letterSpacing: '-0.03em',
            fontStyle: 'italic',
            color: 'var(--cream)'
          }}>
            Todos los<br />
            <span style={{ fontStyle: 'normal', color: 'var(--accent)' }}>Drops</span>
          </h1>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
          gap: isMobile ? 40 : 48
        }}>
          {ALL_DROPS.map((d, i) => (
            <DropCard key={d.id} drop={d} idx={i} isMobile={isMobile} />
          ))}
        </div>
      </div>
    </div>
  );
};

Object.assign(window, { DropsSection, DropsPage });
