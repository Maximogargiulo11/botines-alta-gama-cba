// ============================================================
// Top bar + navegación
// ============================================================

const TopStrip = () => (
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
        Envíos a todo el país · Córdoba Capital
      </span>
      <span style={{ display: 'flex', gap: 24 }}>
        <span>Autenticidad garantizada</span>
        <span style={{ color: 'var(--accent)' }}>·</span>
        <span>3 cuotas sin interés</span>
      </span>
    </div>
  </div>
);

const Nav = ({ onOpen, cartCount, activeSection, onNavTo }) => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { id: 'drops', label: 'Drops' },
    { id: 'brands', label: 'Marcas' },
    { id: 'catalog', label: 'Catálogo' },
    { id: 'about', label: 'Historia' },
  ];

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 50,
      background: scrolled ? 'rgba(10,10,10,0.85)' : 'transparent',
      backdropFilter: scrolled ? 'blur(16px)' : 'none',
      borderBottom: scrolled ? '1px solid var(--line)' : '1px solid transparent',
      transition: 'all 0.3s ease',
    }}>
      <div className="container" style={{
        display: 'grid',
        gridTemplateColumns: '1fr auto 1fr',
        alignItems: 'center',
        padding: '20px 32px',
        gap: 24,
      }}>
        {/* Nav izq */}
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
                position: 'relative',
                padding: '4px 0'
              }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'}
              onMouseLeave={e => e.currentTarget.style.color = activeSection === l.id ? 'var(--accent)' : 'var(--text)'}
            >
              {l.label}
            </button>
          ))}
        </nav>

        {/* Logo centrado */}
        <button onClick={() => onNavTo('home')} style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2,
          cursor: 'pointer'
        }}>
          <div style={{
            fontFamily: 'var(--display)',
            fontSize: 22,
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

        {/* Actions derecha */}
        <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', alignItems: 'center' }}>
          <IconBtn onClick={() => onOpen('search')} name="search" />
          <IconBtn onClick={() => onOpen('account')} name="user" />
          <button onClick={() => onOpen('cart')}
            style={{
              position: 'relative',
              padding: '10px 16px 10px 14px',
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              border: '1px solid var(--line-strong)',
              color: 'var(--text)',
              fontFamily: 'var(--mono)',
              fontSize: 11,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              transition: 'all 0.2s',
              cursor: 'pointer'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'var(--accent)';
              e.currentTarget.style.color = 'var(--accent)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'var(--line-strong)';
              e.currentTarget.style.color = 'var(--text)';
            }}
          >
            <Icon name="bag" size={16} />
            Bolsa ({cartCount})
          </button>
        </div>
      </div>
    </header>
  );
};

const IconBtn = ({ onClick, name }) => (
  <button onClick={onClick}
    style={{
      width: 40, height: 40,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      color: 'var(--text)',
      transition: 'color 0.2s',
    }}
    onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'}
    onMouseLeave={e => e.currentTarget.style.color = 'var(--text)'}
  >
    <Icon name={name} size={18} />
  </button>
);

Object.assign(window, { TopStrip, Nav });
