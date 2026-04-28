// ============================================================
// Hero — editorial full-bleed con la campaña Hora Dorada
// ============================================================

const Hero = ({ onExplore, onViewProduct }) => {
  const isMobile = useMobile();

  return (
    <section data-screen-label="01 Hero" style={{
      position: 'relative',
      minHeight: isMobile ? '100svh' : 'calc(100vh - 85px)',
      background: 'var(--bg)',
      overflow: 'hidden'
    }}>
      {/* Background image */}
      <div style={{ position: 'absolute', inset: 0 }}>
        <img src="assets/hero-messi-standing.jpg" alt="Hora Dorada campaign"
          style={{
            width: '100%', height: '100%',
            objectFit: 'cover',
            objectPosition: isMobile ? '70% top' : 'center top',
            opacity: 0.95
          }} />
        <div style={{
          position: 'absolute', inset: 0,
          background: isMobile
            ? 'linear-gradient(180deg, rgba(10,10,10,0.3) 0%, rgba(10,10,10,0.75) 50%, rgba(10,10,10,0.97) 100%)'
            : 'linear-gradient(90deg, rgba(10,10,10,0.85) 0%, rgba(10,10,10,0.4) 40%, rgba(10,10,10,0) 65%)'
        }} />
        <div style={{
          position: 'absolute', left: 0, right: 0, bottom: 0, height: '30%',
          background: 'linear-gradient(180deg, transparent, rgba(10,10,10,0.9))'
        }} />
      </div>

      <div className="container" style={{
        position: 'relative',
        minHeight: isMobile ? '100svh' : 'calc(100vh - 85px)',
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
        alignItems: isMobile ? 'flex-end' : 'center',
        padding: isMobile ? '80px 20px 48px' : '80px 32px',
        gap: 40
      }}>
        {/* Bloque con copy */}
        <div className="fade-up" style={{ maxWidth: isMobile ? '100%' : 560 }}>
          <div className="eyebrow" style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: isMobile ? 16 : 24 }}>
            <span style={{ width: 28, height: 1, background: 'var(--accent)' }} />
            LANZAMIENTO · 18.04.2026
          </div>

          <h1 style={{
            fontFamily: 'var(--display)',
            fontWeight: 400,
            fontSize: isMobile ? 'clamp(52px, 15vw, 80px)' : 'clamp(56px, 8vw, 116px)',
            lineHeight: 0.92,
            letterSpacing: '-0.035em',
            color: 'var(--cream)',
            marginBottom: isMobile ? 20 : 28,
            fontStyle: 'italic'
          }}>
            Hora<br/>
            <span style={{ color: 'var(--accent-bright)', fontStyle: 'normal', fontWeight: 500 }}>Dorada</span>
          </h1>

          <p style={{
            fontSize: isMobile ? 15 : 17,
            lineHeight: 1.55,
            color: 'var(--text-dim)',
            marginBottom: isMobile ? 28 : 40,
            maxWidth: 460,
            textWrap: 'pretty'
          }}>
            adidas presenta la nueva signature F50 de Messi. Edición limitada —
            120 unidades para Argentina.{' '}
            <span style={{ color: 'var(--cream)' }}>Ya disponible en Botines Alta Gama CBA.</span>
          </p>

          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: isMobile ? 28 : 48 }}>
            <button className="btn btn-primary" onClick={() => onViewProduct('f50-hora-dorada')}
              style={{ flex: isMobile ? 1 : 'none' }}>
              Ver el F50 <Icon name="arrow_right" size={14} />
            </button>
            <button className="btn btn-ghost" onClick={onExplore}
              style={{ flex: isMobile ? 1 : 'none' }}>
              Catálogo
            </button>
          </div>

          {/* Metadata fila */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: isMobile ? 16 : 24,
            paddingTop: isMobile ? 20 : 24,
            borderTop: '1px solid var(--line)',
            fontFamily: 'var(--mono)',
          }}>
            {[
              { label: 'Colorway', value: 'Solar Gold' },
              { label: 'Talles', value: '40 — 44' },
              { label: 'Precio', value: '$489.990', accent: true },
            ].map(m => (
              <div key={m.label}>
                <div style={{ fontSize: 9, color: 'var(--text-muted)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 6 }}>{m.label}</div>
                <div style={{ fontSize: isMobile ? 11 : 12, color: m.accent ? 'var(--accent)' : 'var(--text)' }}>{m.value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Tarjeta flotante — solo desktop */}
        {!isMobile && (
          <div className="fade-up" style={{
            justifySelf: 'end',
            position: 'relative',
            width: '100%',
            maxWidth: 380,
            animationDelay: '0.2s'
          }}>
            <div style={{
              background: 'rgba(28,25,22,0.5)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(200,152,83,0.25)',
              padding: 24,
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <Badge variant="default">Edición limitada</Badge>
                <span style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--text-muted)', letterSpacing: '0.2em' }}>120 / 120</span>
              </div>
              <div style={{ aspectRatio: '1/1.2', overflow: 'hidden', marginBottom: 20 }}>
                <img src="assets/botin-dorado-rock.jpg" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--accent)', letterSpacing: '0.22em', marginBottom: 8 }}>
                ADIDAS · SIGNATURE MESSI
              </div>
              <div style={{ fontFamily: 'var(--display)', fontSize: 24, color: 'var(--text)', lineHeight: 1.2, marginBottom: 16, fontStyle: 'italic' }}>
                F50 Hora Dorada Elite
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 16, borderTop: '1px solid var(--line)' }}>
                <span style={{ fontFamily: 'var(--display)', fontSize: 22, color: 'var(--cream)' }}>$489.990</span>
                <button onClick={() => onViewProduct('f50-hora-dorada')}
                  style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.2em', color: 'var(--accent)', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: 6 }}>
                  Ver ficha <Icon name="arrow_right" size={12} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Scroll indicator */}
      {!isMobile && (
        <div style={{
          position: 'absolute',
          bottom: 32, left: '50%', transform: 'translateX(-50%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10,
          color: 'var(--text-muted)', fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.25em'
        }}>
          SCROLL
          <div style={{ width: 1, height: 32, background: 'linear-gradient(180deg, var(--accent), transparent)' }} />
        </div>
      )}
    </section>
  );
};

Object.assign(window, { Hero });
