// ============================================================
// App principal
// ============================================================

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "#ffffff",
  "display": "'Playfair Display', serif",
  "heroLayout": "split",
  "columns": 4,
  "theme": "dark"
}/*EDITMODE-END*/;

const THEMES = {
  dark: {
    '--bg': '#000000',
    '--bg-2': '#0a0a0a',
    '--bg-3': '#141414',
    '--text': '#ffffff',
    '--cream': '#ffffff',
  },
  sepia: {
    '--bg': '#1a1410',
    '--bg-2': '#221a14',
    '--bg-3': '#2d2319',
    '--text': '#f5e8d4',
    '--cream': '#f3dfb8',
  }
};

const App = () => {
  const [section, setSection] = useState('home');
  const [brandFilter, setBrandFilter] = useState(null);
  const [productOpen, setProductOpen] = useState(null);
  const [cart, setCart] = useState([]);
  const [overlay, setOverlay] = useState(null); // 'cart' | 'search' | 'account' | null
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [notifyOpen, setNotifyOpen] = useState(false);
  const [tweaks, setTweaks] = useState(TWEAK_DEFAULTS);
  const [tweaksOpen, setTweaksOpen] = useState(false);
  const [dropsPageOpen, setDropsPageOpen] = useState(false);

  // Tweaks protocol
  useEffect(() => {
    const onMsg = (e) => {
      const d = e.data || {};
      if (d.type === '__activate_edit_mode') setTweaksOpen(true);
      if (d.type === '__deactivate_edit_mode') setTweaksOpen(false);
    };
    window.addEventListener('message', onMsg);
    window.parent.postMessage({ type: '__edit_mode_available' }, '*');
    return () => window.removeEventListener('message', onMsg);
  }, []);

  // Apply tweaks to CSS vars
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--accent', tweaks.accent);
    // deriva accent-bright y accent-deep por lightness trick
    root.style.setProperty('--accent-bright', tweaks.accent);
    root.style.setProperty('--display', tweaks.display);
    const th = THEMES[tweaks.theme] || THEMES.dark;
    Object.entries(th).forEach(([k, v]) => root.style.setProperty(k, v));
  }, [tweaks]);

  // Navegación
  const navTo = useCallback((id) => {
    setSection(id);
    if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          const y = el.getBoundingClientRect().top + window.scrollY - 85;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }, 50);
    }
  }, []);

  // Observer para sección activa
  useEffect(() => {
    const ids = ['drops', 'brands', 'catalog', 'about'];
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) setSection(e.target.id);
      });
    }, { rootMargin: '-50% 0px -40% 0px' });
    ids.forEach(id => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  const addToCart = (item) => {
    setCart(c => {
      const idx = c.findIndex(x => x.id === item.id && x.size === item.size);
      if (idx >= 0) {
        const nx = [...c]; nx[idx] = { ...nx[idx], qty: nx[idx].qty + item.qty };
        return nx;
      }
      return [...c, item];
    });
    setOverlay('cart');
  };
  const removeFromCart = (id, size) => setCart(c => c.filter(x => !(x.id === id && x.size === size)));

  const handleBrand = (b) => {
    setBrandFilter(b);
    navTo('catalog');
  };

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  return (
    <>
      <TopStrip />
      <Nav
        activeSection={section}
        cartCount={cartCount}
        onOpen={(k) => setOverlay(k)}
        onNavTo={navTo}
      />
      <main>
        {dropsPageOpen ? (
          <DropsPage onClose={() => { setDropsPageOpen(false); window.scrollTo({ top: 0, behavior: 'instant' }); }} />
        ) : (
          <>
            <Hero
              onExplore={() => navTo('catalog')}
              onViewProduct={(id) => setProductOpen(id)}
            />

            <TrustStrip />

            <SecondaryLaunch onViewProduct={(id) => setProductOpen(id)} />

            <DropsSection onNotify={() => setNotifyOpen(true)} onViewAll={() => { setDropsPageOpen(true); window.scrollTo({ top: 0, behavior: 'instant' }); }} />

            <BrandsGrid onBrand={handleBrand} />

            <Catalog
              onViewProduct={(id) => setProductOpen(id)}
              brandFilter={brandFilter}
              setBrandFilter={setBrandFilter}
            />

            <AboutSection />

            <Testimonials />
          </>
        )}
      </main>
      <Footer />

      {/* Overlays */}
      {productOpen && (
        <ProductDetail
          productId={productOpen}
          onClose={() => setProductOpen(null)}
          onAddToCart={addToCart}
        />
      )}
      <CartDrawer
        open={overlay === 'cart'}
        onClose={() => setOverlay(null)}
        cart={cart}
        onRemove={removeFromCart}
        onQty={() => {}}
        onCheckout={() => { setOverlay(null); setCheckoutOpen(true); }}
      />
      <SearchOverlay
        open={overlay === 'search'}
        onClose={() => setOverlay(null)}
        onViewProduct={(id) => setProductOpen(id)}
      />
      <AccountDrawer
        open={overlay === 'account'}
        onClose={() => setOverlay(null)}
      />
      <Checkout
        open={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        cart={cart}
        onClearCart={() => setCart([])}
      />
      <NotifyModal
        open={notifyOpen}
        onClose={() => setNotifyOpen(false)}
      />

      {tweaksOpen && (
        <TweaksPanel tweaks={tweaks} setTweaks={setTweaks} onClose={() => setTweaksOpen(false)} />
      )}
    </>
  );
};

// Mount
const rootEl = document.getElementById('root');
rootEl.innerHTML = '';
ReactDOM.createRoot(rootEl).render(<App />);
