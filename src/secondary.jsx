// ============================================================
// Secondary Launch — Hora Dorada como segundo lanzamiento
// Sección editorial con paleta cálida (contraste intencional con el hero frío)
// ============================================================

const SecondaryLaunch = ({ onViewProduct }) => {
  return (
    <section data-screen-label="03 Hora Dorada" id="hora-dorada" style={{
      position: 'relative',
      padding: '0',
      background: '#2a1810',
      borderTop: '1px solid var(--line)',
      borderBottom: '1px solid var(--line)',
      overflow: 'hidden'
    }}>
      {/* Banda anunciante entre lanzamientos */}
      <div style={{
        background: 'var(--bg)',
        padding: '14px 0',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
        overflow: 'hidden'
      }}>
        <div className="marquee-track">
          {[...Array(2)].flatMap((_, k) => (
            ['SEGUNDO LANZAMIENTO', 'HORA DORADA · SIGNATURE MESSI', 'EDICIÓN LIMITADA 120 UNIDADES', 'DISPONIBLE AHORA'].map((t, i) => (
              <div key={`${k}-${i}`} style={{
                display: 'flex', alignItems: 'center', gap: 60,
                fontFamily: 'var(--display)',
                fontStyle: 'italic',
                fontSize: 18,
                color: '#d4a574',
                whiteSpace: 'nowrap'
              }}>
                <span>{t}</span>
                <span style={{ width: 6, height: 6, background: '#d4a574', borderRadius: '50%' }} />
              </div>
            ))
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: '100vh' }}>
        {/* Columna izq — Imagen full-bleed */}
        <div style={{ position: 'relative', overflow: 'hidden', minHeight: 600 }}>
          <img src="assets/hora-dorada-messi-standing.jpg"
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }} />
          {/* Overlay con degrade sutil */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(90deg, transparent 70%, rgba(42,24,16,0.4))'
          }} />
          {/* Corner marker */}
          <div style={{
            position: 'absolute', top: 24, left: 24,
            fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.25em',
            color: '#f3dfb8', padding: '8px 12px',
            background: 'rgba(0,0,0,0.4)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(243,223,184,0.3)'
          }}>
            02 · LANZAMIENTO SECUNDARIO
          </div>
        </div>

        {/* Columna der — Contenido */}
        <div style={{
          padding: '100px 80px',
          display: 'flex', flexDirection: 'column', justifyContent: 'center',
          color: '#f5e8d4',
          background: 'linear-gradient(135deg, #2a1810 0%, #3d241a 100%)'
        }}>
          <div style={{
            fontFamily: 'var(--mono)', fontSize: 11,
            letterSpacing: '0.25em', textTransform: 'uppercase',
            color: '#d4a574',
            marginBottom: 24,
            display: 'flex', alignItems: 'center', gap: 14
          }}>
            <span style={{ width: 28, height: 1, background: '#d4a574' }} />
            Signature Messi · FW26
          </div>

          <h2 style={{
            fontFamily: 'var(--display)',
            fontSize: 'clamp(56px, 7vw, 104px)',
            lineHeight: 0.95,
            letterSpacing: '-0.03em',
            marginBottom: 28,
            color: '#f3dfb8',
            fontWeight: 400
          }}>
            Hora<br/>
            <span style={{ fontStyle: 'italic', color: '#e8b76c' }}>Dorada</span>
          </h2>

          <p style={{
            fontSize: 16, lineHeight: 1.6,
            color: 'rgba(245,232,212,0.75)',
            marginBottom: 40,
            maxWidth: 460,
            textWrap: 'pretty'
          }}>
            adidas presenta la nueva signature F50 de Messi. Un tributo al momento en que
            la luz se vuelve oro. <span style={{ color: '#f3dfb8' }}>120 unidades
            en edición limitada</span>, con colorway Solar Gold y acabado metálico único.
          </p>

          {/* Mini galería */}
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 12, marginBottom: 40
          }}>
            {[
              'assets/hora-dorada-boot.jpg',
              'assets/hora-dorada-closeup.jpg',
              'assets/hora-dorada-sole.jpg'
            ].map((src, i) => (
              <div key={i} style={{
                aspectRatio: '3/4',
                overflow: 'hidden',
                border: '1px solid rgba(212,165,116,0.25)',
                cursor: 'pointer',
                transition: 'transform 0.3s'
              }}
                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.02)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
              >
                <img src={src} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', gap: 14, alignItems: 'center', flexWrap: 'wrap', marginBottom: 32 }}>
            <button onClick={() => onViewProduct('f50-hora-dorada')} style={{
              padding: '16px 28px',
              background: '#e8b76c',
              color: '#2a1810',
              fontFamily: 'var(--body)',
              fontSize: 12, fontWeight: 600,
              letterSpacing: '0.2em', textTransform: 'uppercase',
              display: 'inline-flex', alignItems: 'center', gap: 10,
              transition: 'all 0.3s',
              cursor: 'pointer',
              border: 'none'
            }}
              onMouseEnter={e => { e.currentTarget.style.background = '#f3c77a'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = '#e8b76c'; e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              Ver el Hora Dorada <Icon name="arrow_right" size={14} />
            </button>
            <button style={{
              padding: '16px 28px',
              background: 'transparent',
              color: '#f3dfb8',
              fontFamily: 'var(--body)',
              fontSize: 12, fontWeight: 600,
              letterSpacing: '0.2em', textTransform: 'uppercase',
              border: '1px solid rgba(243,223,184,0.3)',
              cursor: 'pointer'
            }}>
              Ver campaña completa
            </button>
          </div>

          {/* Metadata */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 20,
            paddingTop: 28,
            borderTop: '1px solid rgba(243,223,184,0.15)',
            fontFamily: 'var(--mono)',
            maxWidth: 480
          }}>
            <div>
              <div style={{ fontSize: 10, color: 'rgba(243,223,184,0.5)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 6 }}>Colorway</div>
              <div style={{ fontSize: 12, color: '#f3dfb8' }}>Solar Gold</div>
            </div>
            <div>
              <div style={{ fontSize: 10, color: 'rgba(243,223,184,0.5)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 6 }}>Unidades</div>
              <div style={{ fontSize: 12, color: '#f3dfb8' }}>120 exclusivas</div>
            </div>
            <div>
              <div style={{ fontSize: 10, color: 'rgba(243,223,184,0.5)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 6 }}>Precio</div>
              <div style={{ fontSize: 12, color: '#e8b76c' }}>$489.990</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

Object.assign(window, { SecondaryLaunch });
