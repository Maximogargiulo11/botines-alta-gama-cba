// ============================================================
// CART — Global state, drawer, page, checkout
// ============================================================

const CART_KEY = 'bagcba_cart_v1';

const loadCart = () => {
  try { return JSON.parse(localStorage.getItem(CART_KEY) || '[]'); }
  catch (e) { return []; }
};
const saveCart = (c) => localStorage.setItem(CART_KEY, JSON.stringify(c));

const CartContext = React.createContext(null);

function CartProvider({ children }) {
  const [items, setItems] = useState(loadCart);
  const [open, setOpen] = useState(false);

  useEffect(() => { saveCart(items); }, [items]);

  const add = useCallback((product, talle) => {
    setItems(curr => {
      const key = product.id + '-' + talle;
      const exists = curr.find(i => i.key === key);
      if (exists) {
        return curr.map(i => i.key === key ? { ...i, qty: i.qty + 1 } : i);
      }
      return [...curr, {
        key,
        id: product.id,
        modelo: product.modelo,
        colorway: product.colorway,
        precio: product.precio,
        imagen: product.imagen,
        talle,
        qty: 1
      }];
    });
    setOpen(true);
  }, []);

  const remove = useCallback((key) => {
    setItems(curr => curr.filter(i => i.key !== key));
  }, []);

  const updateQty = useCallback((key, delta) => {
    setItems(curr => curr
      .map(i => i.key === key ? { ...i, qty: Math.max(1, i.qty + delta) } : i)
      .filter(i => i.qty > 0)
    );
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const count = items.reduce((s, i) => s + i.qty, 0);
  const subtotal = items.reduce((s, i) => s + i.precio * i.qty, 0);

  return (
    <CartContext.Provider value={{ items, add, remove, updateQty, clear, count, subtotal, open, setOpen }}>
      {children}
    </CartContext.Provider>
  );
}

const useCart = () => React.useContext(CartContext);

// ============================================================
// CART ICON (for navbar)
// ============================================================
function CartIconButton() {
  const cart = useCart();
  return (
    <button
      onClick={() => cart.setOpen(true)}
      aria-label={`Carrito (${cart.count})`}
      style={{
        position: 'relative',
        display: 'flex', alignItems: 'center', gap: 8,
        padding: '8px 14px',
        border: '1px solid var(--line-strong)',
        fontFamily: 'var(--mono)', fontSize: 11,
        letterSpacing: '0.18em', textTransform: 'uppercase',
        color: '#fff',
        transition: 'all 0.25s'
      }}
      className="cart-icon-btn"
    >
      <svg width="14" height="16" viewBox="0 0 14 16" fill="none" stroke="currentColor" strokeWidth="1.4">
        <path d="M2 4h10l-1 10H3L2 4z"/>
        <path d="M5 4V2.5a2 2 0 014 0V4"/>
      </svg>
      <span>Carrito</span>
      <span style={{
        minWidth: 20, height: 20, padding: '0 6px',
        background: cart.count > 0 ? '#fff' : 'transparent',
        color: cart.count > 0 ? '#000' : 'var(--text-dim)',
        border: cart.count > 0 ? 'none' : '1px solid var(--line)',
        fontSize: 10, fontWeight: 700,
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center'
      }}>{cart.count}</span>
      <style>{`
        .cart-icon-btn:hover { border-color: #fff; background: rgba(255,255,255,0.05); }
      `}</style>
    </button>
  );
}

// ============================================================
// CART DRAWER (slides in from right)
// ============================================================
function CartDrawer() {
  const cart = useCart();
  const { open, setOpen, items, subtotal, count, remove, updateQty } = cart;

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <React.Fragment>
      <div style={{
        position: 'fixed', inset: 0,
        background: 'rgba(0,0,0,0.6)',
        backdropFilter: 'blur(4px)',
        opacity: open ? 1 : 0,
        pointerEvents: open ? 'auto' : 'none',
        transition: 'opacity 0.3s',
        zIndex: 90
      }} onClick={() => setOpen(false)}></div>

      <aside style={{
        position: 'fixed', top: 0, right: 0, bottom: 0,
        width: 'min(440px, 100vw)',
        background: '#000',
        borderLeft: '1px solid var(--line-strong)',
        transform: open ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)',
        zIndex: 100,
        display: 'flex', flexDirection: 'column'
      }}>
        <div style={{
          padding: '22px 28px',
          borderBottom: '1px solid var(--line)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between'
        }}>
          <div>
            <div className="eyebrow" style={{ marginBottom: 6 }}>{count} {count === 1 ? 'producto' : 'productos'}</div>
            <h2 style={{
              fontFamily: 'var(--display)',
              fontSize: 26, fontWeight: 600, letterSpacing: '-0.01em'
            }}>Tu carrito</h2>
          </div>
          <button onClick={() => setOpen(false)} aria-label="Cerrar" style={{
            width: 36, height: 36, border: '1px solid var(--line-strong)',
            fontSize: 22, lineHeight: 1
          }}>×</button>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: '8px 0' }}>
          {items.length === 0 ? (
            <div style={{ padding: '64px 28px', textAlign: 'center' }}>
              <div style={{
                fontFamily: 'var(--display)', fontStyle: 'italic',
                fontSize: 22, color: 'var(--text-dim)', marginBottom: 12, lineHeight: 1.3
              }}>Tu carrito está vacío.</div>
              <p style={{ color: 'var(--text-muted)', fontSize: 14, marginBottom: 24 }}>
                Empezá explorando los lanzamientos o el catálogo por marca.
              </p>
              <L to="/marcas" className="btn btn-primary" style={{ fontSize: 11 }}
                 ariaLabel="Explorar marcas">
                <span onClick={() => setOpen(false)}>Explorar Marcas</span>
              </L>
            </div>
          ) : (
            items.map(it => (
              <div key={it.key} style={{
                padding: '20px 28px',
                borderBottom: '1px solid var(--line)',
                display: 'grid',
                gridTemplateColumns: '84px 1fr auto',
                gap: 16, alignItems: 'start'
              }}>
                <div style={{ aspectRatio: '1 / 1', overflow: 'hidden', background: 'var(--bg-3)' }}>
                  <img src={it.imagen} alt={it.modelo}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    onError={(e) => { e.target.style.display = 'none'; }} />
                </div>
                <div style={{ minWidth: 0 }}>
                  <div style={{
                    fontFamily: 'var(--display)',
                    fontSize: 16, fontWeight: 600,
                    lineHeight: 1.25, marginBottom: 4,
                    textWrap: 'pretty'
                  }}>{it.modelo}</div>
                  <div style={{
                    fontFamily: 'var(--display)', fontStyle: 'italic',
                    color: 'var(--text-dim)', fontSize: 13, marginBottom: 10
                  }}>{it.colorway}</div>
                  <div style={{
                    display: 'inline-flex', alignItems: 'center',
                    border: '1px solid var(--line)',
                    fontFamily: 'var(--mono)', fontSize: 11
                  }}>
                    <button onClick={() => updateQty(it.key, -1)}
                      style={{ padding: '4px 10px', color: 'var(--text-dim)' }}>−</button>
                    <span style={{ padding: '4px 12px', minWidth: 28, textAlign: 'center', borderLeft: '1px solid var(--line)', borderRight: '1px solid var(--line)' }}>{it.qty}</span>
                    <button onClick={() => updateQty(it.key, 1)}
                      style={{ padding: '4px 10px', color: 'var(--text-dim)' }}>+</button>
                  </div>
                  <div style={{
                    fontFamily: 'var(--mono)', fontSize: 10,
                    letterSpacing: '0.18em', textTransform: 'uppercase',
                    color: 'var(--text-muted)', marginTop: 8
                  }}>Talle US {it.talle}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontFamily: 'var(--display)', fontSize: 17, fontWeight: 600, marginBottom: 8 }}>
                    {fmtPrice(it.precio * it.qty)}
                  </div>
                  <button onClick={() => remove(it.key)}
                    style={{
                      fontFamily: 'var(--mono)', fontSize: 10,
                      letterSpacing: '0.18em', textTransform: 'uppercase',
                      color: 'var(--text-muted)', borderBottom: '1px solid var(--line)'
                    }}>Quitar</button>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div style={{
            padding: '22px 28px',
            borderTop: '1px solid var(--line-strong)',
            background: 'var(--bg-2)'
          }}>
            <div style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
              marginBottom: 18
            }}>
              <div className="eyebrow">Subtotal</div>
              <div style={{ fontFamily: 'var(--display)', fontSize: 26, fontWeight: 600 }}>
                {fmtPrice(subtotal)}
              </div>
            </div>
            <p style={{
              fontFamily: 'var(--mono)', fontSize: 10,
              letterSpacing: '0.15em', textTransform: 'uppercase',
              color: 'var(--text-muted)', marginBottom: 16
            }}>10% off pagando en efectivo o transferencia</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <button onClick={() => { setOpen(false); navigate('/carrito'); }} className="btn btn-primary">
                Finalizar compra →
              </button>
              <button onClick={() => setOpen(false)} className="btn btn-ghost">
                Seguir explorando
              </button>
            </div>
          </div>
        )}
      </aside>
    </React.Fragment>
  );
}

// ============================================================
// CART PAGE (/carrito) — full-page checkout
// ============================================================
function CartPage() {
  const cart = useCart();
  const { items, subtotal, remove, updateQty, clear } = cart;
  const [step, setStep] = useState('cart'); // 'cart' | 'datos' | 'pago' | 'ok'
  const [pago, setPago] = useState('transferencia');
  const [envio, setEnvio] = useState('retiro');

  const descuento = pago === 'efectivo' || pago === 'transferencia' ? subtotal * 0.10 : 0;
  const costoEnvio = envio === 'retiro' ? 0 : (subtotal > 250000 ? 0 : 8500);
  const total = subtotal - descuento + costoEnvio;

  if (step === 'ok') {
    return (
      <main className="container" style={{ paddingTop: 80, paddingBottom: 120, maxWidth: 720, textAlign: 'center' }}>
        <div className="eyebrow" style={{ marginBottom: 14 }}>Pedido confirmado</div>
        <h1 style={{
          fontFamily: 'var(--display)',
          fontSize: 'clamp(40px, 5.5vw, 68px)',
          fontWeight: 600, letterSpacing: '-0.02em', lineHeight: 1.05
        }}>Gracias. Tu pedido fue recibido.</h1>
        <p style={{
          marginTop: 20, color: 'var(--text-dim)',
          fontFamily: 'var(--display)', fontStyle: 'italic',
          fontSize: 19, lineHeight: 1.5
        }}>
          Te enviamos un email con la confirmación y los datos para completar el pago. En menos de una hora te contactamos por WhatsApp para coordinar la entrega.
        </p>
        <div style={{
          marginTop: 36,
          padding: 24, border: '1px solid var(--line)',
          fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--text-dim)',
          letterSpacing: '0.1em', textTransform: 'uppercase'
        }}>
          Orden #BAG-{Math.floor(100000 + Math.random() * 900000)}
        </div>
        <div style={{ marginTop: 36, display: 'inline-flex', gap: 12 }}>
          <L to="/" className="btn btn-primary">Volver a Lanzamientos</L>
        </div>
      </main>
    );
  }

  if (items.length === 0) {
    return (
      <main className="container" style={{ paddingTop: 80, paddingBottom: 120, maxWidth: 720, textAlign: 'center' }}>
        <div className="eyebrow" style={{ marginBottom: 14 }}>Carrito</div>
        <h1 style={{
          fontFamily: 'var(--display)',
          fontSize: 'clamp(40px, 5.5vw, 68px)',
          fontWeight: 600, letterSpacing: '-0.02em', lineHeight: 1.05
        }}>Tu carrito está vacío.</h1>
        <p style={{
          marginTop: 20, color: 'var(--text-dim)',
          fontFamily: 'var(--display)', fontStyle: 'italic',
          fontSize: 19, maxWidth: 520, marginLeft: 'auto', marginRight: 'auto'
        }}>Todavía no agregaste ningún botín. Explorá los lanzamientos o el catálogo por marca para empezar.</p>
        <div style={{ marginTop: 32, display: 'inline-flex', gap: 12 }}>
          <L to="/" className="btn btn-primary">Ver Lanzamientos</L>
          <L to="/marcas" className="btn btn-ghost">Ver Marcas</L>
        </div>
      </main>
    );
  }

  return (
    <main className="container" style={{ paddingTop: 56, paddingBottom: 60 }}>
      <BackLink to="/marcas" label="Seguir comprando" />

      <div style={{
        marginTop: 32, marginBottom: 40,
        paddingBottom: 24, borderBottom: '1px solid var(--line)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 16
      }}>
        <div>
          <div className="eyebrow" style={{ marginBottom: 14 }}>
            {items.length} {items.length === 1 ? 'producto' : 'productos'} · paso {step === 'cart' ? '1' : step === 'datos' ? '2' : '3'} de 3
          </div>
          <h1 style={{
            fontFamily: 'var(--display)',
            fontSize: 'clamp(40px, 5.5vw, 72px)',
            fontWeight: 600, letterSpacing: '-0.02em', lineHeight: 0.95
          }}>
            {step === 'cart' ? 'Tu carrito' : step === 'datos' ? 'Tus datos' : 'Pago'}
          </h1>
        </div>
        <CheckoutSteps step={step} />
      </div>

      <div className="cart-grid" style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 1.55fr) minmax(280px, 1fr)',
        gap: 48, alignItems: 'start'
      }}>
        <div>
          {step === 'cart' && (
            <CartLineItems items={items} remove={remove} updateQty={updateQty} clear={clear} />
          )}
          {step === 'datos' && (
            <DatosForm envio={envio} setEnvio={setEnvio} subtotal={subtotal} />
          )}
          {step === 'pago' && (
            <PagoForm pago={pago} setPago={setPago} />
          )}
        </div>

        <aside style={{ position: 'sticky', top: 96 }}>
          <OrderSummary
            items={items} subtotal={subtotal}
            descuento={descuento} envio={costoEnvio} total={total}
            pago={pago} envioMode={envio}
            step={step} setStep={setStep}
            onConfirm={() => { setStep('ok'); clear(); }}
          />
        </aside>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .cart-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
        }
      `}</style>
    </main>
  );
}

function CheckoutSteps({ step }) {
  const steps = [
    { id: 'cart', label: 'Carrito' },
    { id: 'datos', label: 'Datos' },
    { id: 'pago', label: 'Pago' }
  ];
  const activeIdx = steps.findIndex(s => s.id === step);
  return (
    <div style={{
      display: 'flex', gap: 4,
      fontFamily: 'var(--mono)', fontSize: 10,
      letterSpacing: '0.15em', textTransform: 'uppercase'
    }}>
      {steps.map((s, i) => (
        <div key={s.id} style={{
          padding: '8px 12px',
          border: '1px solid',
          borderColor: i <= activeIdx ? '#fff' : 'var(--line)',
          background: i === activeIdx ? '#fff' : 'transparent',
          color: i === activeIdx ? '#000' : (i < activeIdx ? '#fff' : 'var(--text-muted)')
        }}>
          {String(i + 1).padStart(2, '0')} {s.label}
        </div>
      ))}
    </div>
  );
}

function CartLineItems({ items, remove, updateQty, clear }) {
  return (
    <div>
      {items.map(it => (
        <div key={it.key} style={{
          display: 'grid',
          gridTemplateColumns: '140px minmax(0, 1fr) auto',
          gap: 24, alignItems: 'start',
          padding: '24px 0',
          borderBottom: '1px solid var(--line)'
        }}
        className="cart-line-row">
          <div style={{ aspectRatio: '1 / 1', overflow: 'hidden', background: 'var(--bg-3)' }}>
            <img src={it.imagen} alt={it.modelo}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              onError={(e) => { e.target.style.display = 'none'; }} />
          </div>
          <div>
            <div style={{
              fontFamily: 'var(--display)',
              fontSize: 22, fontWeight: 600,
              lineHeight: 1.2, marginBottom: 6,
              letterSpacing: '-0.005em',
              textWrap: 'pretty'
            }}>{it.modelo}</div>
            <div style={{
              fontFamily: 'var(--display)', fontStyle: 'italic',
              color: 'var(--text-dim)', fontSize: 15, marginBottom: 16
            }}>{it.colorway}</div>
            <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
              <div style={{
                fontFamily: 'var(--mono)', fontSize: 11,
                letterSpacing: '0.18em', textTransform: 'uppercase',
                color: 'var(--text-dim)',
                padding: '6px 10px', border: '1px solid var(--line)'
              }}>Talle US {it.talle}</div>
              <div style={{
                display: 'inline-flex', alignItems: 'center',
                border: '1px solid var(--line)',
                fontFamily: 'var(--mono)', fontSize: 12
              }}>
                <button onClick={() => updateQty(it.key, -1)}
                  style={{ padding: '6px 12px', color: 'var(--text-dim)' }}>−</button>
                <span style={{ padding: '6px 14px', minWidth: 36, textAlign: 'center', borderLeft: '1px solid var(--line)', borderRight: '1px solid var(--line)' }}>{it.qty}</span>
                <button onClick={() => updateQty(it.key, 1)}
                  style={{ padding: '6px 12px', color: 'var(--text-dim)' }}>+</button>
              </div>
              <button onClick={() => remove(it.key)} style={{
                fontFamily: 'var(--mono)', fontSize: 10,
                letterSpacing: '0.18em', textTransform: 'uppercase',
                color: 'var(--text-muted)',
                paddingBottom: 3, borderBottom: '1px solid var(--line)'
              }}>Quitar</button>
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontFamily: 'var(--display)', fontSize: 24, fontWeight: 600 }}>
              {fmtPrice(it.precio * it.qty)}
            </div>
            {it.qty > 1 && (
              <div style={{
                fontFamily: 'var(--mono)', fontSize: 10,
                letterSpacing: '0.15em', color: 'var(--text-muted)',
                marginTop: 4
              }}>{fmtPrice(it.precio)} c/u</div>
            )}
          </div>
        </div>
      ))}
      <div style={{ paddingTop: 18, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
        <button onClick={() => { if (confirm('¿Vaciar el carrito?')) clear(); }}
          style={{
            fontFamily: 'var(--mono)', fontSize: 10,
            letterSpacing: '0.18em', textTransform: 'uppercase',
            color: 'var(--text-muted)',
            paddingBottom: 3, borderBottom: '1px solid var(--line)'
          }}>Vaciar carrito</button>
        <L to="/marcas" style={{
          fontFamily: 'var(--mono)', fontSize: 10,
          letterSpacing: '0.18em', textTransform: 'uppercase',
          color: 'var(--text-dim)',
          paddingBottom: 3, borderBottom: '1px solid var(--line)'
        }}>+ Agregar otro modelo</L>
      </div>
      <style>{`
        @media (max-width: 600px) {
          .cart-line-row { grid-template-columns: 100px 1fr !important; }
          .cart-line-row > div:last-child { grid-column: 2; text-align: left !important; }
        }
      `}</style>
    </div>
  );
}

function DatosForm({ envio, setEnvio, subtotal }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      <section>
        <div className="eyebrow" style={{ marginBottom: 16 }}>Datos personales</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }} className="form-grid-2">
          <FormField label="Nombre" placeholder="Tomás" />
          <FormField label="Apellido" placeholder="Rodríguez" />
          <FormField label="Email" placeholder="tomas@email.com" type="email" full />
          <FormField label="Teléfono / WhatsApp" placeholder="+54 351 555 0000" full />
          <FormField label="DNI" placeholder="38.456.789" />
        </div>
      </section>

      <section>
        <div className="eyebrow" style={{ marginBottom: 16 }}>Entrega</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <RadioOption
            checked={envio === 'retiro'}
            onChange={() => setEnvio('retiro')}
            title="Retiro en local — Av. Colón 1247, Córdoba Capital"
            sub="Disponible hoy si confirmás antes de las 17h · Sin costo"
            price={0}
          />
          <RadioOption
            checked={envio === 'cordoba'}
            onChange={() => setEnvio('cordoba')}
            title="Envío Córdoba Capital"
            sub="24 a 48 hs por moto · Gratis en compras +$250.000"
            price={subtotal > 250000 ? 0 : 8500}
          />
          <RadioOption
            checked={envio === 'andreani'}
            onChange={() => setEnvio('andreani')}
            title="Envío al interior — Andreani"
            sub="3 a 5 días hábiles · Tarifa según destino"
            price={subtotal > 250000 ? 0 : 8500}
          />
        </div>
      </section>

      {envio !== 'retiro' && (
        <section>
          <div className="eyebrow" style={{ marginBottom: 16 }}>Dirección de envío</div>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 14 }} className="form-grid-2">
            <FormField label="Calle y número" placeholder="Av. Colón 1247" full />
            <FormField label="Piso / Depto" placeholder="3°B (opcional)" />
            <FormField label="Localidad" placeholder="Córdoba" />
            <FormField label="Código postal" placeholder="5000" />
            <FormField label="Provincia" placeholder="Córdoba" full />
          </div>
        </section>
      )}

      <style>{`
        .form-grid-2 > .full { grid-column: 1 / -1; }
        @media (max-width: 600px) {
          .form-grid-2 { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}

function FormField({ label, placeholder, type, full }) {
  return (
    <label className={full ? 'full' : ''}>
      <span style={{
        display: 'block',
        fontFamily: 'var(--mono)', fontSize: 10,
        letterSpacing: '0.18em', textTransform: 'uppercase',
        color: 'var(--text-muted)', marginBottom: 8
      }}>{label}</span>
      <input type={type || 'text'} placeholder={placeholder} style={{
        width: '100%',
        background: 'transparent',
        border: '1px solid var(--line-strong)',
        color: '#fff',
        padding: '14px 16px',
        fontSize: 15,
        fontFamily: 'var(--body)',
        outline: 'none',
        transition: 'border-color 0.2s'
      }}
      onFocus={(e) => e.target.style.borderColor = '#fff'}
      onBlur={(e) => e.target.style.borderColor = ''} />
    </label>
  );
}

function RadioOption({ checked, onChange, title, sub, price }) {
  return (
    <label style={{
      display: 'grid',
      gridTemplateColumns: '20px 1fr auto',
      gap: 16, alignItems: 'center',
      padding: '18px 20px',
      border: '1px solid',
      borderColor: checked ? '#fff' : 'var(--line-strong)',
      background: checked ? 'rgba(255,255,255,0.05)' : 'transparent',
      cursor: 'pointer',
      transition: 'all 0.2s'
    }}>
      <span style={{
        width: 18, height: 18, borderRadius: '50%',
        border: '1px solid',
        borderColor: checked ? '#fff' : 'var(--line-strong)',
        position: 'relative'
      }}>
        {checked && <span style={{
          position: 'absolute', inset: 4,
          background: '#fff', borderRadius: '50%'
        }}></span>}
      </span>
      <input type="radio" checked={checked} onChange={onChange} style={{ display: 'none' }} />
      <div>
        <div style={{ fontWeight: 500, fontSize: 15, marginBottom: 4 }}>{title}</div>
        <div style={{ color: 'var(--text-dim)', fontSize: 13 }}>{sub}</div>
      </div>
      <div style={{
        fontFamily: 'var(--mono)', fontSize: 12,
        letterSpacing: '0.1em',
        color: price === 0 ? '#fff' : 'var(--text-dim)',
        textTransform: 'uppercase'
      }}>
        {price === 0 ? 'Gratis' : '+' + fmtPrice(price)}
      </div>
    </label>
  );
}

function PagoForm({ pago, setPago }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      <section>
        <div className="eyebrow" style={{ marginBottom: 16 }}>Forma de pago</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <RadioOption
            checked={pago === 'transferencia'}
            onChange={() => setPago('transferencia')}
            title="Transferencia bancaria"
            sub="10% off · Te enviamos los datos al confirmar"
            price={0}
          />
          <RadioOption
            checked={pago === 'efectivo'}
            onChange={() => setPago('efectivo')}
            title="Efectivo en local"
            sub="10% off · Reservamos el par hasta 48 hs"
            price={0}
          />
          <RadioOption
            checked={pago === 'tarjeta'}
            onChange={() => setPago('tarjeta')}
            title="Tarjeta de crédito"
            sub="Hasta 12 cuotas sin interés con bancos seleccionados"
            price={0}
          />
          <RadioOption
            checked={pago === 'mp'}
            onChange={() => setPago('mp')}
            title="MercadoPago"
            sub="Crédito, débito o saldo en cuenta · Cuotas según tu tarjeta"
            price={0}
          />
        </div>
      </section>

      {pago === 'tarjeta' && (
        <section>
          <div className="eyebrow" style={{ marginBottom: 16 }}>Datos de la tarjeta</div>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: 14 }} className="form-grid-2">
            <FormField label="Número de tarjeta" placeholder="4509 9535 6623 3704" full />
            <FormField label="Nombre como figura" placeholder="TOMAS RODRIGUEZ" full />
            <FormField label="Vencimiento" placeholder="MM / AA" />
            <FormField label="CVV" placeholder="123" />
            <FormField label="Cuotas" placeholder="1 cuota" />
          </div>
        </section>
      )}

      <p style={{
        fontFamily: 'var(--mono)', fontSize: 10,
        letterSpacing: '0.15em', textTransform: 'uppercase',
        color: 'var(--text-muted)'
      }}>
        Conexión segura · Tus datos están protegidos · No almacenamos información sensible
      </p>
    </div>
  );
}

function OrderSummary({ items, subtotal, descuento, envio, total, pago, envioMode, step, setStep, onConfirm }) {
  const totalQty = items.reduce((s, i) => s + i.qty, 0);
  const next = step === 'cart' ? 'datos' : step === 'datos' ? 'pago' : null;
  const prev = step === 'datos' ? 'cart' : step === 'pago' ? 'datos' : null;

  return (
    <div style={{
      background: 'var(--bg-2)',
      border: '1px solid var(--line)',
      padding: 28
    }}>
      <div className="eyebrow" style={{ marginBottom: 18 }}>Resumen del pedido</div>

      {step === 'cart' && (
        <div style={{
          display: 'flex', flexDirection: 'column', gap: 6,
          paddingBottom: 16, borderBottom: '1px solid var(--line)', marginBottom: 16
        }}>
          {items.slice(0, 4).map(it => (
            <div key={it.key} style={{
              display: 'flex', justifyContent: 'space-between', gap: 12,
              fontSize: 13, color: 'var(--text-dim)'
            }}>
              <span style={{ flex: 1, textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                {it.modelo} <span style={{ color: 'var(--text-muted)' }}>· US {it.talle} × {it.qty}</span>
              </span>
              <span style={{ color: '#fff', flexShrink: 0 }}>{fmtPrice(it.precio * it.qty)}</span>
            </div>
          ))}
          {items.length > 4 && (
            <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>+ {items.length - 4} productos más</div>
          )}
        </div>
      )}

      <SummaryLine label={`Subtotal (${totalQty} ${totalQty === 1 ? 'unidad' : 'unidades'})`} value={fmtPrice(subtotal)} />
      {descuento > 0 && <SummaryLine label="Descuento 10%" value={'− ' + fmtPrice(descuento)} accent />}
      {step !== 'cart' && <SummaryLine label={'Envío · ' + envioLabel(envioMode)} value={envio === 0 ? 'Gratis' : fmtPrice(envio)} />}

      <div style={{
        marginTop: 14, paddingTop: 16,
        borderTop: '1px solid var(--line-strong)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'baseline'
      }}>
        <div style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase' }}>Total</div>
        <div style={{ fontFamily: 'var(--display)', fontSize: 32, fontWeight: 600, letterSpacing: '-0.01em' }}>
          {fmtPrice(total)}
        </div>
      </div>

      <div style={{ marginTop: 22, display: 'flex', flexDirection: 'column', gap: 10 }}>
        {next && (
          <button className="btn btn-primary" onClick={() => setStep(next)}>
            {step === 'cart' ? 'Continuar →' : 'Continuar al pago →'}
          </button>
        )}
        {step === 'pago' && (
          <button className="btn btn-primary" onClick={onConfirm}>
            Confirmar pedido · {fmtPrice(total)}
          </button>
        )}
        {prev && (
          <button className="btn btn-ghost" onClick={() => setStep(prev)}>
            ← Volver
          </button>
        )}
      </div>

      <div style={{
        marginTop: 22, paddingTop: 18,
        borderTop: '1px solid var(--line)',
        display: 'flex', flexDirection: 'column', gap: 10,
        fontFamily: 'var(--mono)', fontSize: 10,
        letterSpacing: '0.15em', textTransform: 'uppercase',
        color: 'var(--text-muted)'
      }}>
        <div>· Pago seguro · Datos cifrados</div>
        <div>· Garantía oficial 6 meses</div>
        <div>· Cambio sin costo 30 días</div>
      </div>
    </div>
  );
}

function SummaryLine({ label, value, accent }) {
  return (
    <div style={{
      display: 'flex', justifyContent: 'space-between',
      padding: '6px 0',
      fontSize: 14,
      color: accent ? '#fff' : 'var(--text-dim)'
    }}>
      <span>{label}</span>
      <span style={{ color: accent ? '#fff' : '#fff', fontWeight: accent ? 600 : 400 }}>{value}</span>
    </div>
  );
}

function envioLabel(mode) {
  return mode === 'retiro' ? 'Retiro en local'
    : mode === 'cordoba' ? 'Córdoba Capital'
    : 'Envío al interior';
}

Object.assign(window, { CartProvider, useCart, CartIconButton, CartDrawer, CartPage });
