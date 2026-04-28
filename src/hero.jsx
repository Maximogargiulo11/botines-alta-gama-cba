// ============================================================
// Hero — F50 Tunit como protagonista (verde flúor + azul eléctrico)
// ============================================================

const Hero = ({ onExplore, onViewProduct }) => {
  return (
    <section data-screen-label="01 Hero Tunit" style={{
      position: 'relative',
      minHeight: 'calc(100vh - 85px)',
      background: 'var(--bg)',
      overflow: 'hidden'
    }}>
      {/* Background image con degradé */}
      <div style={{ position: 'absolute', inset: 0 }}>
        <img src="assets/tunit-hero-main.jpg" alt="F50 Tunit campaign"
          style={{
            width: '100%', height: '100%',
            objectFit: 'cover',
            objectPosition: 'center center',
            opacity: 0.95
          }} />
        {/* Degradé izq para legibilidad texto */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(90deg, rgba(5,13,24,0.94) 0%, rgba(5,13,24,0.55) 40%, rgba(5,13,24,0.1) 65%, rgba(5,13,24,0) 80%)'
        }} />
        {/* Degradé inferior */}
        <div style={{
          position: 'absolute', left: 0, right: 0, bottom: 0, height: '30%',
          background: 'linear-gradient(180deg, transparent, rgba(5,13,24,0.9))'
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
        <div className="fade-up" style={{ maxWidth: 580 }}>
          <div className="eyebrow" style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 24 }}>
            <span className="volt-dot" />
            LANZAMIENTO · 23.04.2026
          </div>

          <h1 style={{
            fontFamily: 'var(--display)',
            fontWeight: 400,
            fontSize: 'clamp(56px, 8vw, 124px)',
            lineHeight: 0.92,
            letterSpacing: '-0.035em',
            color: 'var(--cream)',
            marginBottom: 28,
          }}>
            <span style={{ fontStyle: 'italic' }}>F50</span><br/>
            <span style={{ color: 'var(--accent)', fontWeight: 600, letterSpacing: '-0.04em' }}>TUNIT</span>
          </h1>

          <p style={{
            fontSize: 17,
            lineHeight: 1.55,
            color: 'var(--text-dim)',
            marginBottom: 40,
            maxWidth: 480,
            textWrap: 'pretty'
          }}>
            adidas toca el archivo una vez más. El último lanzamiento del icónico
            F50 Tunit regresa con upper desmontable en solar yellow y placa de carbono.
            <span style={{ color: 'var(--cream)' }}> 80 unidades para Argentina.</span>
          </p>

          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginBottom: 48 }}>
            <button className="btn btn-primary" onClick={() => onViewProduct('f50-tunit')}>
              Ver el F50 Tunit <Icon name="arrow_right" size={14} />
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
              <div style={{ fontSize: 12, color: 'var(--text)' }}>Solar Yellow</div>
            </div>
            <div>
              <div style={{ fontSize: 10, color: 'var(--text-muted)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 6 }}>Talles</div>
              <div style={{ fontSize: 12, color: 'var(--text)' }}>40 — 44</div>
            </div>
            <div>
              <div style={{ fontSize: 10, color: 'var(--text-muted)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 6 }}>Precio</div>
              <div style={{ fontSize: 12, color: 'var(--accent)' }}>$529.990</div>
            </div>
          </div>
        </div>

        {/* Bloque derecho — tarjeta flotante */}
        <div className="fade-up" style={{
          justifySelf: 'end',
          position: 'relative',
          width: '100%',
          maxWidth: 400,
          animationDelay: '0.2s'
        }}>
          <div style={{
            background: 'rgba(10,22,36,0.55)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(204,255,51,0.3)',
            padding: 24,
            boxShadow: '0 20px 60px rgba(30,108,255,0.15)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <Badge variant="solid">Nuevo Drop</Badge>
              <span style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--text-muted)', letterSpacing: '0.2em' }}>
                80 / 80
              </span>
            </div>

            <div style={{ aspectRatio: '1/1.2', overflow: 'hidden', marginBottom: 20, background: '#0a1626' }}>
              <img src="assets/tunit-card-hero.jpg"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>

            <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--accent)', letterSpacing: '0.22em', marginBottom: 8 }}>
              ADIDAS · F50 TUNIT
            </div>
            <div style={{ fontFamily: 'var(--display)', fontSize: 24, color: 'var(--text)', lineHeight: 1.2, marginBottom: 16, fontStyle: 'italic' }}>
              F50 Tunit Archive
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 16, borderTop: '1px solid var(--line)' }}>
              <span style={{ fontFamily: 'var(--display)', fontSize: 22, color: 'var(--cream)' }}>$529.990</span>
              <button onClick={() => onViewProduct('f50-tunit')}
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
