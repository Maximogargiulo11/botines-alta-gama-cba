// ============================================================
// Footer + banda marquee
// ============================================================

const Footer = () => {
  const isMobile = useMobile();
  return (
    <>
      <Marquee items={[
        'F50 HORA DORADA DISPONIBLE',
        'MERCURIAL SUPERFLY 10 — PRÓXIMO DROP',
        'ENVÍOS A TODO EL PAÍS',
        '3 CUOTAS SIN INTERÉS',
        'AUTENTICIDAD GARANTIZADA',
        'SHOWROOM CÓRDOBA CAPITAL',
      ]} />

      <footer style={{ background: 'var(--bg)', padding: isMobile ? '60px 0 24px' : '100px 0 32px', borderTop: '1px solid var(--line)' }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1.4fr 1fr 1fr 1fr',
            gap: isMobile ? 40 : 60,
            paddingBottom: isMobile ? 40 : 80,
            borderBottom: '1px solid var(--line)'
          }}>
            <div>
              <div style={{ fontFamily: 'var(--display)', fontSize: isMobile ? 28 : 36, fontStyle: 'italic', color: 'var(--cream)', lineHeight: 1.1, marginBottom: 16, letterSpacing: '-0.02em' }}>
                Alta gama,<br /><span style={{ color: 'var(--accent)' }}>cerca tuyo.</span>
              </div>
              <p style={{ color: 'var(--text-dim)', fontSize: 14, lineHeight: 1.6, marginBottom: 20, textWrap: 'pretty' }}>
                Showroom de botines elite en Córdoba Capital.
              </p>
              <div style={{ display: 'flex', gap: 10 }}>
                <SocialBtn icon="whatsapp" label="WhatsApp" />
                <SocialBtn icon="instagram" label="Instagram" />
                <SocialBtn icon="mail" label="Email" />
              </div>
            </div>

            {isMobile ? (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
                <FooterCol title="Navegar" links={['Drops', 'Marcas', 'Catálogo', 'Historia']} />
                <FooterCol title="Ayuda" links={['Guía de talles', 'Envíos', 'Cambios', 'Autenticidad']} />
              </div>
            ) : (
              <>
                <FooterCol title="Navegar" links={['Drops', 'Marcas', 'Catálogo', 'Historia', 'Contacto']} />
                <FooterCol title="Ayuda" links={['Guía de talles', 'Envíos', 'Cambios', 'Autenticidad', 'Preguntas frecuentes']} />
              </>
            )}

            <div>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--accent)', letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: 16 }}>
                Contacto
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, fontSize: 13, color: 'var(--text-dim)' }}>
                <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  <Icon name="pin" size={14} style={{ color: 'var(--accent)', marginTop: 2, flexShrink: 0 }} />
                  <span>Córdoba Capital, Argentina</span>
                </div>
                <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  <Icon name="whatsapp" size={14} style={{ color: 'var(--accent)', marginTop: 2, flexShrink: 0 }} />
                  <span>+54 351 XXX XXXX</span>
                </div>
                <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  <Icon name="instagram" size={14} style={{ color: 'var(--accent)', marginTop: 2, flexShrink: 0 }} />
                  <span>@botinesaltagamacba</span>
                </div>
              </div>
            </div>
          </div>

          <div style={{
            display: 'flex',
            justifyContent: 'space-between', alignItems: 'center',
            paddingTop: 24, flexWrap: 'wrap', gap: 12,
            fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--text-muted)',
            letterSpacing: '0.15em', textTransform: 'uppercase'
          }}>
            <span>© 2026 Botines Alta Gama CBA</span>
            <div style={{ display: 'flex', gap: isMobile ? 16 : 32 }}>
              <span>Términos</span>
              <span>Privacidad</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp */}
      <a href="#" onClick={(e) => e.preventDefault()} style={{
        position: 'fixed', bottom: 24, left: 24, zIndex: 40,
        width: 52, height: 52, borderRadius: '50%',
        background: 'var(--accent)',
        color: '#0a0a0a',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 10px 40px rgba(200,152,83,0.4)',
        transition: 'transform 0.2s'
      }}
        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
      >
        <Icon name="whatsapp" size={22} stroke={2} />
      </a>
    </>
  );
};

const SocialBtn = ({ icon, label }) => (
  <button style={{
    width: 40, height: 40,
    border: '1px solid var(--line-strong)',
    color: 'var(--text)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    transition: 'all 0.2s'
  }}
    aria-label={label}
    onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent)'; }}
    onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--line-strong)'; e.currentTarget.style.color = 'var(--text)'; }}
  >
    <Icon name={icon} size={16} />
  </button>
);

const FooterCol = ({ title, links }) => (
  <div>
    <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--accent)', letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: 16 }}>
      {title}
    </div>
    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
      {links.map(l => (
        <li key={l}>
          <a href="#" style={{ color: 'var(--text-dim)', fontSize: 13, transition: 'color 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--text-dim)'}
          >
            {l}
          </a>
        </li>
      ))}
    </ul>
  </div>
);

Object.assign(window, { Footer });
