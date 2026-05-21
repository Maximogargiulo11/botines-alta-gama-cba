// ============================================================
// Navbar minimalista + Footer global
// ============================================================

function Navbar() {
  const path = useRoute();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [path]);

  const isMarcas = path === '/marcas' || path.startsWith('/marcas/');
  const isHome = path === '/' || path.startsWith('/lanzamientos');

  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 60,
      background: scrolled ? 'rgba(0,0,0,0.92)' : 'rgba(0,0,0,0.6)',
      backdropFilter: 'blur(18px)',
      WebkitBackdropFilter: 'blur(18px)',
      borderBottom: '1px solid var(--line)',
      transition: 'background 0.3s ease'
    }}>
      <div className="container" style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        height: 72
      }}>
        <L to="/" style={{
          fontFamily: 'var(--display)',
          fontSize: 20, fontWeight: 600,
          letterSpacing: '0.04em',
          display: 'flex', alignItems: 'center', gap: 10
        }}>
          <span style={{
            width: 8, height: 8, background: '#fff', borderRadius: '50%',
            display: 'inline-block'
          }}></span>
          BOTINES ALTA GAMA <span style={{ color: 'var(--text-dim)', fontWeight: 400, fontStyle: 'italic' }}>CBA</span>
        </L>

        <nav style={{ display: 'none', alignItems: 'center', gap: 40 }} className="navlinks">
          <L to="/" className={isHome ? 'navlink active' : 'navlink'}>Lanzamientos</L>
          <L to="/marcas" className={isMarcas ? 'navlink active' : 'navlink'}>Marcas</L>
        </nav>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <CartIconButton />
        </div>

        <button
          aria-label="Menu"
          onClick={() => setOpen(o => !o)}
          style={{
            display: 'flex', flexDirection: 'column', gap: 4,
            padding: 8
          }}
          className="navtoggle"
        >
          <span style={{ width: 22, height: 1, background: '#fff', transition: 'all 0.3s', transform: open ? 'translateY(2.5px) rotate(45deg)' : 'none' }}></span>
          <span style={{ width: 22, height: 1, background: '#fff', transition: 'all 0.3s', opacity: open ? 0 : 1 }}></span>
          <span style={{ width: 22, height: 1, background: '#fff', transition: 'all 0.3s', transform: open ? 'translateY(-2.5px) rotate(-45deg)' : 'none' }}></span>
        </button>
      </div>

      {open && (
        <div className="mobilemenu" style={{
          background: 'rgba(0,0,0,0.98)',
          borderTop: '1px solid var(--line)',
          padding: '20px 0'
        }}>
          <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <L to="/" style={{ fontFamily: 'var(--display)', fontSize: 28, padding: '14px 0', borderBottom: '1px solid var(--line)' }}>Lanzamientos</L>
            <L to="/marcas" style={{ fontFamily: 'var(--display)', fontSize: 28, padding: '14px 0', borderBottom: '1px solid var(--line)' }}>Marcas</L>
            <L to="/carrito" style={{ fontFamily: 'var(--display)', fontSize: 28, padding: '14px 0' }}>Carrito</L>
          </div>
        </div>
      )}

      <style>{`
        .navlink {
          font-family: var(--body);
          font-size: 12px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--text-dim);
          font-weight: 500;
          padding: 8px 2px;
          border-bottom: 1px solid transparent;
          transition: all 0.25s ease;
        }
        .navlink:hover { color: var(--text); }
        .navlink.active {
          color: var(--gold);
          border-bottom-color: var(--gold);
        }
        @media (min-width: 900px) {
          .navlinks { display: flex !important; }
          .navtoggle { display: none !important; }
          .mobilemenu { display: none !important; }
        }
        @media (max-width: 480px) {
          .cart-icon-btn span:nth-of-type(1) { display: none; }
        }
      `}</style>
    </header>
  );
}

function Footer() {
  return (
    <footer style={{
      background: 'var(--bg-2)',
      borderTop: '1px solid var(--line)',
      marginTop: 80, padding: '60px 0 32px'
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: 48,
          paddingBottom: 48,
          borderBottom: '1px solid var(--line)'
        }}>
          <div>
            <div style={{ fontFamily: 'var(--display)', fontSize: 22, fontWeight: 600, marginBottom: 14, letterSpacing: '0.02em' }}>
              Botines Alta Gama <span style={{ fontStyle: 'italic', color: 'var(--text-dim)' }}>CBA</span>
            </div>
            <p style={{ color: 'var(--text-dim)', fontSize: 13, lineHeight: 1.7, maxWidth: 320 }}>
              Importadores oficiales de botines premium en Córdoba, Argentina. Curaduría editorial diaria + stock disponible para retiro inmediato.
            </p>
          </div>

          <div>
            <div className="eyebrow" style={{ marginBottom: 16 }}>Navegación</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <L to="/" className="footerlink">Lanzamientos</L>
              <L to="/marcas" className="footerlink">Marcas</L>
              <L to="/carrito" className="footerlink">Carrito</L>
            </div>
          </div>

          <div>
            <div className="eyebrow" style={{ marginBottom: 16 }}>Ayuda</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <L to="/politica-cambios" className="footerlink">Política de Cambio y Devolución</L>
              <L to="/faq" className="footerlink">Preguntas Frecuentes</L>
            </div>
          </div>

          <div>
            <div className="eyebrow" style={{ marginBottom: 16 }}>Contacto</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, color: 'var(--text-dim)', fontSize: 13 }}>
              <span>Av. Colón 1247, Córdoba Capital</span>
              <span>+54 351 555 8190</span>
              <span>hola@botinesaltagama.com.ar</span>
              <span>Lun–Sáb 10–20h</span>
            </div>
          </div>
        </div>

        <div style={{
          display: 'flex', flexWrap: 'wrap',
          justifyContent: 'space-between', alignItems: 'center',
          paddingTop: 24, gap: 16,
          color: 'var(--text-muted)', fontSize: 11,
          fontFamily: 'var(--mono)', letterSpacing: '0.15em', textTransform: 'uppercase'
        }}>
          <span>© 2026 BOTINES ALTA GAMA CBA · TODOS LOS DERECHOS RESERVADOS</span>
          <span>CABA · CÓRDOBA · ROSARIO · MENDOZA</span>
        </div>
      </div>
      <style>{`
        .footerlink {
          color: var(--text-dim);
          font-size: 13px;
          transition: color 0.2s;
        }
        .footerlink:hover { color: #fff; }
      `}</style>
    </footer>
  );
}

Object.assign(window, { Navbar, Footer });
