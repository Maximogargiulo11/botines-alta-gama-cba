// ============================================================
// App root — router switch
// ============================================================

function App() {
  const path = useRoute();
  const [, forceUpdate] = useState(0);
  useEffect(() => {
    const h = () => forceUpdate(n => n + 1);
    window.addEventListener('sanity-loaded', h);
    window.addEventListener('data-loaded', h);
    return () => {
      window.removeEventListener('sanity-loaded', h);
      window.removeEventListener('data-loaded', h);
    };
  }, []);

  let page;
  if (path === '/' || path === '') {
    page = <HomePage />;
  } else if (path.startsWith('/lanzamientos/')) {
    const slug = path.replace('/lanzamientos/', '');
    page = <ArticlePage slug={slug} />;
  } else if (path === '/marcas') {
    page = <BrandsIndexPage />;
  } else if (path.startsWith('/marcas/')) {
    const parts = path.replace('/marcas/', '').split('/').filter(Boolean);
    if (parts.length === 1) {
      page = <BrandModelsPage brandSlug={parts[0]} />;
    } else if (parts.length === 2) {
      page = <ModelStockPage brandSlug={parts[0]} modelSlug={parts[1]} />;
    } else {
      page = <NotFoundPage />;
    }
  } else if (path === '/politica-cambios') {
    page = <PoliticaCambiosPage />;
  } else if (path === '/faq') {
    page = <FAQPage />;
  } else if (path === '/carrito') {
    page = <CartPage />;
  } else {
    page = <NotFoundPage />;
  }

  return (
    <CartProvider>
      <Navbar />
      <div key={path} className="page-fade">
        {page}
      </div>
      <Footer />
      <CartDrawer />
      <style>{`
        .page-fade { animation: pageIn 0.5s cubic-bezier(0.2, 0.8, 0.2, 1) both; }
        @keyframes pageIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </CartProvider>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
