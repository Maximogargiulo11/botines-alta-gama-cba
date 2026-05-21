// ============================================================
// Hash-based router — paths like #/marcas/adidas/f50
// ============================================================

const { useState, useEffect, useCallback } = React;

function parseHash() {
  let h = window.location.hash || '#/';
  if (!h.startsWith('#')) h = '#' + h;
  let path = h.slice(1);
  if (!path.startsWith('/')) path = '/' + path;
  // strip trailing slash except for root
  if (path.length > 1 && path.endsWith('/')) path = path.slice(0, -1);
  return path;
}

function useRoute() {
  const [path, setPath] = useState(parseHash());
  useEffect(() => {
    const onHash = () => {
      setPath(parseHash());
      window.scrollTo({ top: 0, behavior: 'instant' });
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);
  return path;
}

function navigate(to) {
  if (!to.startsWith('/')) to = '/' + to;
  window.location.hash = '#' + to;
}

// Link component that uses our hash router
function L({ to, children, className, style, ariaLabel }) {
  const onClick = (e) => {
    e.preventDefault();
    navigate(to);
  };
  return (
    <a href={'#' + to} onClick={onClick} className={className} style={style} aria-label={ariaLabel}>
      {children}
    </a>
  );
}

// Helper: find article by slug
const findArticle = (slug) => ARTICLES.find(a => a.slug === slug);
const findBrand = (slug) => BRANDS_INFO.find(b => b.slug === slug);
const findModel = (brand, modelSlug) => brand && brand.modelos.find(m => m.slug === modelSlug);
const getStock = (brandSlug, modelSlug) => STOCK[brandSlug + '/' + modelSlug] || [];
const findProductById = (id) => {
  for (const key in STOCK) {
    const found = STOCK[key].find(p => p.id === id);
    if (found) return found;
  }
  return null;
};

// Format price in ARS
const fmtPrice = (n) => '$' + n.toLocaleString('es-AR');

Object.assign(window, { useRoute, navigate, L, findArticle, findBrand, findModel, getStock, findProductById, fmtPrice, parseHash });
