// ============================================================
// Hero — editorial full-bleed con la campaña Hora Dorada
// ============================================================

const Hero = ({ onExplore, onViewProduct }) => {
  return (
    <section data-screen-label="01 Hero" style={{
      position: 'relative',
      minHeight: 'calc(100vh - 85px)',
      background: 'var(--bg)',
      overflow: 'hidden'
    }}>
      {/* Background image con degradé */}
      <div style={{ position: 'absolute', inset: 0 }}>
        <img src="assets/hero-messi-standing.jpg" alt="Hora Dorada campaign"
          style={{
            width: '100%', height: '100%',
            objectFit: 'cover',
            objectPosition: 'center top',
            opacity: 0.95
          }} />
        {/* Degradé izq para legibilidad texto */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(90deg, rgba(10,10,10,0.85) 0%, rgba(10,10,10,0.4) 40%, rgba(10,10,10,0) 65%)'
        }} />
        {/* Degradé inferior */}
        <div style={{
          position: 'absolute', left: 0, right: 0, bottom: 0, height: '30%',
          background: 'linear-gradient(180deg, transparent, rgba(10,10,10,0.9))'
        }} />
      </div>

      <div className="container" style={{
        position: 'relative',
        minHeight: 'calc(100vh - 85px)',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        alignItems: 'center',
        padding: '80px 32px',
        gap: 40
      }}>
        {/* Bloque izq con copy */}
        <div className="fade-up" style={{ maxWidth: 560 }}>
          <div className="eyebrow" style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 24 }}>
            <span style={{ width: 28, height: 1, background: 'var(--accent)' }} />
            LANZAMIENTO · 18.04.2026
          </div>

          <h1 style={{
            fontFamily: 'var(--display)',
            fontWeight: 400,
            fontSize: 'clamp(56px, 8vw, 116px)',
            lineHeight: 0.92,
            letterSpacing: '-0.035em',
            color: 'var(--cream)',
            marginBottom: 28,
            fontStyle: 'italic'
          }}>
            Hora<br/>
            <span style={{ color: 'var(--accent-bright)', fontStyle: 'normal', fontWeight: 500 }}>Dorada</span>
          </h1>

          <p style={{
            fontSize: 17,
            lineHeight: 1.55,
            color: 'var(--text-dim)',
            marginBottom: 40,
            maxWidth: 460,
            textWrap: 'pretty'
          }}>
            adidas presenta la nueva signature F50 de Messi. Edición limitada —
            120 unidades para Argentina. <span style={{ color: 'var(--cream)' }}>
            Ya disponible en Botines Alta Gama CBA.</span>
          </p>

          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginBottom: 48 }}>
            <button className="btn btn-primary" onClick={() => onViewProduct('f50-hora-dorada')}>
              Ver el F50 <Icon name="arrow_right" size={14} />
            </button>
            <button className="btn btn-ghost" onClick={onExplore}>
              Explorar catálogo
            </button>
          </div>

          {/* Metadata fila */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 24,
            paddingTop: 24,
            borderTop: '1px solid var(--line)',
            fontFamily: 'var(--mono)',
          }}>
            <div>
              <div style={{ fontSize: 10, color: 'var(--text-muted)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 6 }}>Colorway</div>
              <div style={{ fontSize: 12, color: 'var(--text)' }}>Solar Gold</div>
            </div>
            <div>
              <div style={{ fontSize: 10, color: 'var(--text-muted)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 6 }}>Talles</div>
              <div style={{ fontSize: 12, color: 'var(--text)' }}>40 — 44</div>
            </div>
            <div>
              <div style={{ fontSize: 10, color: 'var(--text-muted)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 6 }}>Precio</div>
              <div style={{ fontSize: 12, color: 'var(--accent)' }}>$489.990</div>
            </div>
          </div>
        </div>

        {/* Bloque derecho — tarjeta flotante con botín */}
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
              <span style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--text-muted)', letterSpacing: '0.2em' }}>
                120 / 120
              </span>
            </div>

            <div style={{ aspectRatio: '1/1.2', overflow: 'hidden', marginBottom: 20 }}>
              <img src="assets/botin-dorado-rock.jpg"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
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
                style={{
                  fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.2em',
                  color: 'var(--accent)', textTransform: 'uppercase',
                  display: 'flex', alignItems: 'center', gap: 6
                }}>
                Ver ficha <Icon name="arrow_right" size={12} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: 'absolute',
        bottom: 32, left: '50%', transform: 'translateX(-50%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10,
        color: 'var(--text-muted)',
        fontFamily: 'var(--mono)',
        fontSize: 10,
        letterSpacing: '0.25em'
      }}>
        SCROLL
        <div style={{ width: 1, height: 32, background: 'linear-gradient(180deg, var(--accent), transparent)' }} />
      </div>
    </section>
  );
};

Object.assign(window, { Hero });
