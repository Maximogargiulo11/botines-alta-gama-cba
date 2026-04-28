// ============================================================
// Top bar + navegación
// ============================================================

const TopStrip = () => {
  const isMobile = useMobile();
  return (
    <div style={{
      background: '#000',
      color: 'var(--text-dim)',
      fontFamily: 'var(--mono)',
      fontSize: 10,
      letterSpacing: '0.2em',
      textTransform: 'uppercase',
      padding: '8px 0',
      borderBottom: '1px solid var(--line)',
    }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 20 }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ width: 6, height: 6, background: 'var(--accent)', borderRadius: '50%', boxShadow: '0 0 8px var(--accent)' }} />
          Envíos a todo el país · Cba
        </span>
        {!isMobile && (
          <span style={{ display: 'flex', gap: 24 }}>
            <span>Autenticidad garantizada</span>
            <span style={{ color: 'var(--accent)' }}>·</span>
            <span>3 cuotas sin interés</span>
          </span>
        )}
      </div>
    </div>
  );
};

const Nav = ({ onOpen, cartCount, activeSection, onNavTo }) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const isMobile = useMobile();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!isMobile) setMenuOpen(false);
  }, [isMobile]);

  const links = [
    { id: 'drops', label: 'Drops' },
    { id: 'brands', label: 'Marcas' },
    { id: 'catalog', label: 'Catálogo' },
    { id: 'about', label: 'Historia' },
  ];

  const handleNav = (id) => {
    onNavTo(id);
    setMenuOpen(false);
  };

  return (
    <>
      <header style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        background: scrolled || menuOpen ? 'rgba(10,10,10,0.95)' : 'transparent',
        backdropFilter: scrolled || menuOpen ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--line)' : '1px solid transparent',
        transition: 'all 0.3s ease',
      }}>
        <div className="container" style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr auto 1fr' : '1fr auto 1fr',
          alignItems: 'center',
          padding: isMobile ? '16px 20px' : '20px 32px',
          gap: 24,
        }}>
          {/* Izquierda: nav links (desktop) o hamburger (mobile) */}
          {isMobile ? (
            <button onClick={() => setMenuOpen(o => !o)} style={{
              width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'var(--text)'
            }}>
              <Icon name={menuOpen ? 'close' : 'menu'} size={20} />
            </button>
          ) : (
            <nav style={{ display: 'flex', gap: 36 }}>
              {links.map(l => (
                <button key={l.id} onClick={() => onNavTo(l.id)}
                  style={{
                    fontFamily: 'var(--mono)',
                    fontSize: 11,
                    letterSpacing: '0.22em',
                    textTransform: 'uppercase',
                    color: activeSection === l.id ? 'var(--accent)' : 'var(--text)',
                    transition: 'color 0.2s',
                    padding: '4px 0'
                  }}
                  onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'}
                  onMouseLeave={e => e.currentTarget.style.color = activeSection === l.id ? 'var(--accent)' : 'var(--text)'}
                >
                  {l.label}
                </button>
              ))}
            </nav>
          )}

          {/* Logo centrado */}
          <button onClick={() => handleNav('home')} style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, cursor: 'pointer'
          }}>
            <div style={{
              fontFamily: 'var(--display)',
              fontSize: isMobile ? 18 : 22,
              fontWeight: 500,
              letterSpacing: '0.15em',
              color: 'var(--text)',
              lineHeight: 1
            }}>
              BOTINES
            </div>
            <div style={{
              fontFamily: 'var(--mono)',
              fontSize: 9,
              letterSpacing: '0.42em',
              color: 'var(--accent)',
              marginTop: 4
            }}>
              ALTA GAMA · CBA
            </div>
          </button>

          {/* Acciones derecha */}
          <div style={{ display: 'flex', gap: isMobile ? 4 : 8, justifyContent: 'flex-end', alignItems: 'center' }}>
            <IconBtn onClick={() => onOpen('search')} name="search" />
            {!isMobile && <IconBtn onClick={() => onOpen('account')} name="user" />}
            <button onClick={() => onOpen('cart')}
              style={{
                position: 'relative',
                padding: isMobile ? '8px 12px' : '10px 16px 10px 14px',
                display: 'flex', alignItems: 'center', gap: 8,
                border: '1px solid var(--line-strong)',
                color: 'var(--text)',
                fontFamily: 'var(--mono)',
                fontSize: 11,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                transition: 'all 0.2s',
                cursor: 'pointer'
              }}
            >
              <Icon name="bag" size={16} />
              {!isMobile && `Bolsa `}({cartCount})
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu overlay */}
      {isMobile && menuOpen && (
        <div className="fade-in" style={{
          position: 'fixed', inset: 0, zIndex: 49,
          background: 'rgba(10,10,10,0.98)',
          display: 'flex', flexDirection: 'column',
          padding: '100px 40px 40px'
        }}>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {links.map((l, i) => (
              <button key={l.id} onClick={() => handleNav(l.id)}
                style={{
                  fontFamily: 'var(--display)',
                  fontSize: 'clamp(36px, 10vw, 52px)',
                  fontStyle: 'italic',
                  letterSpacing: '-0.02em',
                  color: activeSection === l.id ? 'var(--accent)' : 'var(--text)',
                  textAlign: 'left',
                  padding: '12px 0',
                  borderBottom: '1px solid var(--line)',
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  animationDelay: `${i * 0.05}s`
                }}
              >
                {l.label}
                <Icon name="arrow_right" size={20} />
              </button>
            ))}
          </nav>
          <div style={{ marginTop: 'auto', display: 'flex', gap: 16, paddingTop: 40 }}>
            <button onClick={() => { onOpen('account'); setMenuOpen(false); }}
              style={{
                flex: 1, padding: '14px', border: '1px solid var(--line-strong)',
                color: 'var(--text)', fontFamily: 'var(--mono)', fontSize: 11,
                letterSpacing: '0.2em', textTransform: 'uppercase',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10
              }}>
              <Icon name="user" size={16} /> Mi cuenta
            </button>
          </div>
        </div>
      )}
    </>
  );
};

const IconBtn = ({ onClick, name }) => (
  <button onClick={onClick}
    style={{
      width: 40, height: 40,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      color: 'var(--text)', transition: 'color 0.2s',
    }}
    onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'}
    onMouseLeave={e => e.currentTarget.style.color = 'var(--text)'}
  >
    <Icon name={name} size={18} />
  </button>
);

Object.assign(window, { TopStrip, Nav });
