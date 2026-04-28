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

const DropsSection = ({ onNotify }) => {
  const t = useCountdown(NEXT_DROP.dateISO);

  return (
    <section id="drops" data-screen-label="02 Drops" style={{
      position: 'relative',
      padding: '120px 0',
      background: 'var(--bg-2)',
      borderTop: '1px solid var(--line)',
      borderBottom: '1px solid var(--line)',
      overflow: 'hidden'
    }}>
      {/* Fondo con textura radial */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse at 80% 20%, rgba(200,152,83,0.08), transparent 60%)'
      }} />

      <div className="container" style={{ position: 'relative' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: 80, alignItems: 'center', marginBottom: 100 }}>
          {/* Izq — Countdown */}
          <div>
            <div className="eyebrow" style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
              <span style={{ width: 28, height: 1, background: 'var(--accent)' }} />
              Próximo drop
            </div>
            <h2 style={{
              fontFamily: 'var(--display)',
              fontSize: 'clamp(44px, 6vw, 80px)',
              lineHeight: 0.98,
              letterSpacing: '-0.025em',
              color: 'var(--cream)',
              marginBottom: 24,
              fontStyle: 'italic'
            }}>
              Mercurial<br />
              <span style={{ color: 'var(--accent)', fontStyle: 'normal' }}>Superfly 10</span>
            </h2>
            <p style={{ fontSize: 16, color: 'var(--text-dim)', lineHeight: 1.6, maxWidth: 480, marginBottom: 32, textWrap: 'pretty' }}>
              {NEXT_DROP.description}
            </p>

            {/* Countdown big */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: 16,
              marginBottom: 40,
              maxWidth: 520
            }}>
              {[
                { label: 'Días', val: pad(t.days) },
                { label: 'Horas', val: pad(t.hours) },
                { label: 'Min', val: pad(t.mins) },
                { label: 'Seg', val: pad(t.secs) }
              ].map((c, i) => (
                <div key={i} style={{
                  border: '1px solid var(--line)',
                  background: 'rgba(10,10,10,0.5)',
                  padding: '20px 16px',
                  textAlign: 'center',
                  position: 'relative'
                }}>
                  <div style={{
                    fontFamily: 'var(--display)',
                    fontSize: 'clamp(40px, 5vw, 56px)',
                    lineHeight: 1,
                    color: 'var(--accent-bright)',
                    fontVariantNumeric: 'tabular-nums'
                  }}>
                    {c.val}
                  </div>
                  <div style={{
                    fontFamily: 'var(--mono)',
                    fontSize: 9,
                    letterSpacing: '0.3em',
                    color: 'var(--text-muted)',
                    textTransform: 'uppercase',
                    marginTop: 8
                  }}>
                    {c.label}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: 14, alignItems: 'center', flexWrap: 'wrap' }}>
              <button className="btn btn-primary" onClick={onNotify}>
                Avisame del lanzamiento <Icon name="bolt" size={14} />
              </button>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--text-muted)', letterSpacing: '0.15em' }}>
                {NEXT_DROP.units} unidades · {fmtPrice(NEXT_DROP.price)}
              </div>
            </div>
          </div>

          {/* Der — preview visual */}
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
            {/* Corner marker */}
            <div style={{
              position: 'absolute', top: -1, right: -1, padding: '8px 14px',
              background: 'var(--accent)', color: '#000',
              fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.2em'
            }}>
              28 / 04 / 2026
            </div>
          </div>
        </div>

        {/* Drops anteriores */}
        <div style={{ paddingTop: 60, borderTop: '1px solid var(--line)' }}>
          <SectionHeader
            eyebrow="Archivo"
            title="Drops recientes"
            right={
              <button style={{
                fontFamily: 'var(--mono)', fontSize: 11,
                color: 'var(--text)', letterSpacing: '0.2em', textTransform: 'uppercase',
                display: 'flex', alignItems: 'center', gap: 10,
                paddingBottom: 4, borderBottom: '1px solid var(--line-strong)'
              }}>
                Ver todos <Icon name="arrow_right" size={12} />
              </button>
            }
          />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32 }}>
            {PAST_DROPS.map((d, i) => (
              <DropCard key={d.id} drop={d} idx={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const DropCard = ({ drop, idx }) => {
  const [hover, setHover] = useState(false);
  return (
    <article
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{ cursor: 'pointer' }}
    >
      <div style={{ position: 'relative', aspectRatio: '4/5', overflow: 'hidden', marginBottom: 20, background: 'var(--bg-3)' }}>
        {drop.img ? (
          <img src={drop.img}
            style={{
              width: '100%', height: '100%', objectFit: 'cover',
              transform: hover ? 'scale(1.03)' : 'scale(1)',
              transition: 'transform 0.6s ease'
            }} />
        ) : (
          <ImgPlaceholder label={drop.imgLabel} aspect="4/5" />
        )}
        <div style={{
          position: 'absolute', top: 16, left: 16,
          fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.22em',
          color: drop.status === 'AGOTADO' ? '#ef9b9b' : drop.status === 'POCAS UNIDADES' ? 'var(--accent)' : '#a7e3a7',
          padding: '6px 10px',
          background: 'rgba(0,0,0,0.6)',
          backdropFilter: 'blur(8px)',
          border: '1px solid currentColor'
        }}>
          {drop.status}
        </div>
        <div style={{
          position: 'absolute', bottom: 16, right: 16,
          fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--cream)',
          letterSpacing: '0.2em', opacity: 0.8
        }}>
          {drop.date}
        </div>
      </div>

      <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--accent)', letterSpacing: '0.22em', textTransform: 'uppercase', marginBottom: 10 }}>
        0{idx + 1} · {drop.brand}
      </div>
      <h3 style={{
        fontFamily: 'var(--display)',
        fontSize: 28, color: 'var(--text)', fontStyle: 'italic', marginBottom: 6,
        lineHeight: 1.15
      }}>
        {drop.title}
      </h3>
      <p style={{ color: 'var(--text-dim)', fontSize: 13 }}>{drop.subtitle}</p>
    </article>
  );
};

Object.assign(window, { DropsSection });
