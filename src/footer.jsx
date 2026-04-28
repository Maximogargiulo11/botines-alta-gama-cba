// ============================================================
// Footer + banda marquee
// ============================================================

const Footer = () => (
  <>
    <Marquee items={[
      'F50 HORA DORADA DISPONIBLE',
      'MERCURIAL SUPERFLY 10 — PRÓXIMO DROP',
      'ENVÍOS A TODO EL PAÍS',
      '3 CUOTAS SIN INTERÉS',
      'AUTENTICIDAD GARANTIZADA',
      'SHOWROOM CÓRDOBA CAPITAL',
    ]} />

    <footer style={{ background: 'var(--bg)', padding: '100px 0 32px', borderTop: '1px solid var(--line)' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr 1fr', gap: 60, paddingBottom: 80, borderBottom: '1px solid var(--line)' }}>
          <div>
            <div style={{ fontFamily: 'var(--display)', fontSize: 36, fontStyle: 'italic', color: 'var(--cream)', lineHeight: 1.1, marginBottom: 24, letterSpacing: '-0.02em' }}>
              Alta gama,<br /><span style={{ color: 'var(--accent)' }}>cerca tuyo.</span>
            </div>
            <p style={{ color: 'var(--text-dim)', fontSize: 14, lineHeight: 1.6, maxWidth: 360, marginBottom: 24, textWrap: 'pretty' }}>
              Showroom de botines elite en Córdoba Capital. Solo las líneas pro de las 4 marcas principales.
            </p>
            <div style={{ display: 'flex', gap: 10 }}>
              <SocialBtn icon="whatsapp" label="WhatsApp" />
              <SocialBtn icon="instagram" label="Instagram" />
              <SocialBtn icon="mail" label="Email" />
            </div>
          </div>

          <FooterCol title="Navegar" links={['Drops', 'Marcas', 'Catálogo', 'Historia', 'Contacto']} />
          <FooterCol title="Ayuda" links={['Guía de talles', 'Envíos', 'Cambios', 'Autenticidad', 'Preguntas frecuentes']} />
          <div>
            <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--accent)', letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: 20 }}>
              Contacto
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14, fontSize: 13, color: 'var(--text-dim)' }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <Icon name="pin" size={14} style={{ color: 'var(--accent)', marginTop: 2, flexShrink: 0 }} />
                <span>Córdoba Capital<br />Argentina</span>
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

            <button className="btn btn-ghost" style={{ marginTop: 24, width: '100%' }}>
              Visitar showroom <Icon name="arrow_right" size={12} />
            </button>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 32, flexWrap: 'wrap', gap: 16, fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--text-muted)', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
          <span>© 2026 Botines Alta Gama CBA — Todos los derechos reservados</span>
          <div style={{ display: 'flex', gap: 32 }}>
            <span>Términos</span>
            <span>Privacidad</span>
            <span>Cookies</span>
          </div>
        </div>
      </div>
    </footer>

    {/* Floating WhatsApp */}
    <a href="#" onClick={(e) => e.preventDefault()} style={{
      position: 'fixed', bottom: 24, left: 24, zIndex: 40,
      width: 56, height: 56, borderRadius: '50%',
      background: 'var(--accent)',
      color: '#0a0a0a',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      boxShadow: '0 10px 40px rgba(200,152,83,0.4)',
      transition: 'transform 0.2s'
    }}
      onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
      onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
    >
      <Icon name="whatsapp" size={24} stroke={2} />
    </a>
  </>
);

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
    <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--accent)', letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: 20 }}>
      {title}
    </div>
    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
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
