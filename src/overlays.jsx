// ============================================================
// Overlays: carrito, checkout, buscador, login/cuenta, notify
// ============================================================

const Drawer = ({ open, onClose, side = 'right', title, children, width = 480 }) => {
  if (!open) return null;
  return (
    <div className="fade-in" style={{ position: 'fixed', inset: 0, zIndex: 150 }}>
      <div onClick={onClose} style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)' }} />
      <div style={{
        position: 'absolute', top: 0, bottom: 0, [side]: 0, width,
        maxWidth: '100vw',
        background: 'var(--bg-2)',
        borderLeft: side === 'right' ? '1px solid var(--line)' : 'none',
        borderRight: side === 'left' ? '1px solid var(--line)' : 'none',
        display: 'flex', flexDirection: 'column',
        animation: `slideIn${side === 'right' ? 'R' : 'L'} 0.35s cubic-bezier(0.4,0,0.2,1)`
      }}>
        <style>{`
          @keyframes slideInR { from { transform: translateX(100%); } to { transform: translateX(0); } }
          @keyframes slideInL { from { transform: translateX(-100%); } to { transform: translateX(0); } }
        `}</style>
        <div style={{
          padding: '24px 28px', borderBottom: '1px solid var(--line)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center'
        }}>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--accent)', letterSpacing: '0.25em', textTransform: 'uppercase' }}>
            {title}
          </div>
          <button onClick={onClose} style={{ color: 'var(--text)', display: 'flex' }}>
            <Icon name="close" size={18} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

const CartDrawer = ({ open, onClose, cart, onRemove, onQty, onCheckout }) => {
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);

  return (
    <Drawer open={open} onClose={onClose} title={`Tu bolsa (${cart.length})`} width={460}>
      <div style={{ flex: 1, overflowY: 'auto', padding: cart.length ? '0' : '40px 28px' }}>
        {cart.length === 0 ? (
          <div style={{ textAlign: 'center', color: 'var(--text-dim)' }}>
            <div style={{ fontFamily: 'var(--display)', fontSize: 28, fontStyle: 'italic', marginBottom: 12, color: 'var(--text)' }}>
              Tu bolsa está vacía
            </div>
            <div style={{ fontSize: 13 }}>Agregá un par para empezar.</div>
          </div>
        ) : cart.map(it => {
          const brand = BRANDS.find(b => b.id === it.brand);
          return (
            <div key={it.id + it.size} style={{
              display: 'grid', gridTemplateColumns: '80px 1fr auto', gap: 16,
              padding: '20px 28px', borderBottom: '1px solid var(--line)'
            }}>
              <div style={{ width: 80, height: 80, background: 'var(--bg-3)', overflow: 'hidden' }}>
                {it.img
                  ? <img src={it.img} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  : <ImgPlaceholder label={brand?.name} />
                }
              </div>
              <div>
                <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--accent)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 4 }}>
                  {brand?.name}
                </div>
                <div style={{ fontSize: 14, color: 'var(--text)', marginBottom: 6, lineHeight: 1.3 }}>{it.name}</div>
                <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--text-dim)', letterSpacing: '0.12em' }}>
                  TALLE {it.size} · x{it.qty}
                </div>
              </div>
              <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div style={{ fontFamily: 'var(--display)', fontSize: 16, color: 'var(--cream)' }}>
                  {fmtPrice(it.price * it.qty)}
                </div>
                <button onClick={() => onRemove(it.id, it.size)} style={{
                  fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--text-muted)',
                  letterSpacing: '0.15em', textTransform: 'uppercase',
                  paddingBottom: 2, borderBottom: '1px solid var(--line)'
                }}>Quitar</button>
              </div>
            </div>
          );
        })}
      </div>

      {cart.length > 0 && (
        <div style={{ padding: 28, borderTop: '1px solid var(--line)', background: 'var(--bg-3)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <span style={{ color: 'var(--text-dim)', fontSize: 13 }}>Subtotal</span>
            <span style={{ color: 'var(--text)', fontSize: 14 }}>{fmtPrice(total)}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
            <span style={{ color: 'var(--text-dim)', fontSize: 13 }}>Envío</span>
            <span style={{ color: total > 400000 ? '#a7e3a7' : 'var(--text)', fontSize: 14 }}>
              {total > 400000 ? 'Gratis' : fmtPrice(8000)}
            </span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 24, paddingTop: 16, borderTop: '1px solid var(--line)' }}>
            <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--text)', letterSpacing: '0.2em', textTransform: 'uppercase' }}>Total</span>
            <span style={{ fontFamily: 'var(--display)', fontSize: 28, color: 'var(--accent-bright)' }}>
              {fmtPrice(total + (total > 400000 ? 0 : 8000))}
            </span>
          </div>
          <button className="btn btn-primary" onClick={onCheckout} style={{ width: '100%' }}>
            Finalizar compra <Icon name="arrow_right" size={14} />
          </button>
        </div>
      )}
    </Drawer>
  );
};

const SearchOverlay = ({ open, onClose, onViewProduct }) => {
  const [q, setQ] = useState('');
  const results = useMemo(() => {
    if (!q.trim()) return [];
    const s = q.toLowerCase();
    return PRODUCTS.filter(p =>
      p.name.toLowerCase().includes(s) ||
      p.brand.toLowerCase().includes(s) ||
      p.line.toLowerCase().includes(s) ||
      p.colorway.toLowerCase().includes(s)
    ).slice(0, 6);
  }, [q]);

  useEffect(() => {
    if (!open) setQ('');
  }, [open]);

  if (!open) return null;
  return (
    <div className="fade-in" style={{ position: 'fixed', inset: 0, zIndex: 160 }}>
      <div onClick={onClose} style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)' }} />
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0,
        background: 'var(--bg-2)', borderBottom: '1px solid var(--line)'
      }}>
        <div className="container" style={{ padding: '32px 32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20, paddingBottom: 20, borderBottom: '1px solid var(--line-strong)' }}>
            <Icon name="search" size={20} />
            <input
              autoFocus
              value={q}
              onChange={e => setQ(e.target.value)}
              placeholder="Buscar modelo, marca, colorway..."
              style={{
                flex: 1,
                background: 'transparent', border: 'none', outline: 'none',
                color: 'var(--text)', fontSize: 24,
                fontFamily: 'var(--display)',
                padding: 0
              }}
            />
            <button onClick={onClose} style={{ color: 'var(--text-dim)', fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.2em' }}>
              ESC
            </button>
          </div>

          {q.trim() && results.length === 0 && (
            <div style={{ padding: '32px 0', color: 'var(--text-dim)' }}>Sin resultados para "{q}"</div>
          )}

          {results.length > 0 && (
            <div style={{ padding: '20px 0', display: 'grid', gap: 1, background: 'var(--line)' }}>
              {results.map(p => (
                <button key={p.id} onClick={() => { onViewProduct(p.id); onClose(); }}
                  style={{
                    display: 'grid', gridTemplateColumns: '60px 1fr auto', gap: 16,
                    padding: '14px 16px', background: 'var(--bg-2)',
                    alignItems: 'center', cursor: 'pointer', textAlign: 'left'
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-3)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'var(--bg-2)'}
                >
                  <div style={{ width: 60, height: 60, background: 'var(--bg-3)', overflow: 'hidden' }}>
                    {p.img ? <img src={p.img} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      : <div style={{ width: '100%', height: '100%', backgroundImage: 'repeating-linear-gradient(45deg, rgba(200,152,83,0.08) 0, rgba(200,152,83,0.08) 1px, transparent 1px, transparent 8px)' }} />}
                  </div>
                  <div>
                    <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--accent)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 4 }}>
                      {BRANDS.find(b => b.id === p.brand)?.name}
                    </div>
                    <div style={{ color: 'var(--text)', fontSize: 14 }}>{p.name}</div>
                  </div>
                  <div style={{ fontFamily: 'var(--display)', fontSize: 16, color: 'var(--cream)' }}>{fmtPrice(p.price)}</div>
                </button>
              ))}
            </div>
          )}

          {!q.trim() && (
            <div style={{ padding: '32px 0' }}>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--text-muted)', letterSpacing: '0.25em', marginBottom: 16, textTransform: 'uppercase' }}>
                Búsquedas populares
              </div>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                {['F50 Hora Dorada', 'Mercurial', 'Phantom', 'Predator', 'Puma Future', 'Furon V7'].map(t => (
                  <button key={t} onClick={() => setQ(t)} style={{
                    padding: '10px 16px', border: '1px solid var(--line-strong)',
                    color: 'var(--text)', fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.15em',
                    textTransform: 'uppercase', background: 'transparent'
                  }}>{t}</button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const AccountDrawer = ({ open, onClose }) => {
  const [mode, setMode] = useState('login');
  return (
    <Drawer open={open} onClose={onClose} title="Mi cuenta" width={420}>
      <div style={{ padding: 28 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0, marginBottom: 32, border: '1px solid var(--line-strong)' }}>
          {['login', 'register'].map(m => (
            <button key={m} onClick={() => setMode(m)} style={{
              padding: '12px 0',
              fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase',
              background: mode === m ? 'var(--accent)' : 'transparent',
              color: mode === m ? '#000' : 'var(--text-dim)',
              cursor: 'pointer'
            }}>
              {m === 'login' ? 'Ingresar' : 'Crear cuenta'}
            </button>
          ))}
        </div>

        <h3 style={{ fontFamily: 'var(--display)', fontSize: 32, fontStyle: 'italic', color: 'var(--cream)', marginBottom: 8, lineHeight: 1.1 }}>
          {mode === 'login' ? 'Bienvenido de vuelta.' : 'Unite al club.'}
        </h3>
        <p style={{ color: 'var(--text-dim)', fontSize: 13, marginBottom: 32 }}>
          {mode === 'login'
            ? 'Accedé a tus pedidos y lista de deseos.'
            : 'Acceso anticipado a drops y notificaciones de stock.'}
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {mode === 'register' && (
            <Field label="Nombre" placeholder="Tu nombre completo" />
          )}
          <Field label="Email" placeholder="tu@email.com" type="email" />
          <Field label="Contraseña" placeholder="••••••••" type="password" />
          <button className="btn btn-primary" style={{ marginTop: 8 }} onClick={(e) => { e.preventDefault(); onClose(); }}>
            {mode === 'login' ? 'Ingresar' : 'Crear cuenta'} <Icon name="arrow_right" size={14} />
          </button>
        </div>

        <div style={{ marginTop: 32, paddingTop: 24, borderTop: '1px solid var(--line)', color: 'var(--text-muted)', fontSize: 12, textAlign: 'center' }}>
          {mode === 'login' ? '¿Olvidaste tu contraseña?' : 'Al registrarte aceptás nuestras condiciones.'}
        </div>
      </div>
    </Drawer>
  );
};

const Field = ({ label, ...rest }) => (
  <div>
    <label style={{ display: 'block', fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--text-dim)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 8 }}>
      {label}
    </label>
    <input {...rest} style={{
      width: '100%', padding: '14px 16px',
      background: 'transparent', color: 'var(--text)',
      border: '1px solid var(--line-strong)',
      fontFamily: 'var(--body)', fontSize: 14,
      outline: 'none',
      transition: 'border-color 0.2s'
    }}
      onFocus={e => e.currentTarget.style.borderColor = 'var(--accent)'}
      onBlur={e => e.currentTarget.style.borderColor = 'var(--line-strong)'}
    />
  </div>
);

// ============================================================
// Checkout completo (full-screen multi-step)
// ============================================================

const Checkout = ({ open, onClose, cart, onClearCart }) => {
  const [step, setStep] = useState(1);
  const [done, setDone] = useState(false);
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const shipping = total > 400000 ? 0 : 8000;

  useEffect(() => {
    if (open) { setStep(1); setDone(false); }
  }, [open]);

  if (!open) return null;

  const next = () => {
    if (step < 3) setStep(step + 1);
    else { setDone(true); onClearCart(); }
  };

  return (
    <div className="fade-in" style={{ position: 'fixed', inset: 0, zIndex: 180, background: 'var(--bg)', overflowY: 'auto' }}>
      <div style={{
        padding: '20px 32px',
        borderBottom: '1px solid var(--line)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        position: 'sticky', top: 0, background: 'rgba(10,10,10,0.9)', backdropFilter: 'blur(16px)', zIndex: 2
      }}>
        <div style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.2em', color: 'var(--accent)', textTransform: 'uppercase' }}>
          ● CHECKOUT
        </div>
        <button onClick={onClose} style={{ display: 'flex', alignItems: 'center', gap: 10, color: 'var(--text)', fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase' }}>
          Cancelar <Icon name="close" size={14} />
        </button>
      </div>

      {done ? (
        <div style={{ maxWidth: 640, margin: '0 auto', padding: '120px 32px', textAlign: 'center' }}>
          <div style={{ width: 80, height: 80, margin: '0 auto 32px', border: '1px solid var(--accent)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)' }}>
            <Icon name="check" size={32} />
          </div>
          <div className="eyebrow" style={{ marginBottom: 20 }}>Orden confirmada</div>
          <h2 style={{ fontFamily: 'var(--display)', fontSize: 56, fontStyle: 'italic', color: 'var(--cream)', lineHeight: 1.02, letterSpacing: '-0.02em', marginBottom: 20 }}>
            Tu par está en camino.
          </h2>
          <p style={{ color: 'var(--text-dim)', fontSize: 16, marginBottom: 40, maxWidth: 440, margin: '0 auto 40px', textWrap: 'pretty' }}>
            Orden <span style={{ color: 'var(--accent)' }}>#BAG-{Math.floor(Math.random() * 9999).toString().padStart(4, '0')}</span>. Recibirás un email con el tracking en los próximos minutos.
          </p>
          <button onClick={onClose} className="btn btn-primary">Volver al catálogo</button>
        </div>
      ) : (
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 60, padding: '60px 32px' }}>
          <div>
            {/* Step indicator */}
            <div style={{ display: 'flex', gap: 12, marginBottom: 48 }}>
              {['Contacto', 'Envío', 'Pago'].map((s, i) => (
                <div key={s} style={{ flex: 1, paddingBottom: 12, borderBottom: '2px solid', borderColor: i + 1 <= step ? 'var(--accent)' : 'var(--line)' }}>
                  <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--text-muted)', letterSpacing: '0.2em' }}>0{i + 1}</div>
                  <div style={{ fontSize: 14, color: i + 1 <= step ? 'var(--text)' : 'var(--text-muted)', marginTop: 4 }}>{s}</div>
                </div>
              ))}
            </div>

            <h2 style={{ fontFamily: 'var(--display)', fontSize: 40, fontStyle: 'italic', color: 'var(--cream)', marginBottom: 32, letterSpacing: '-0.01em' }}>
              {step === 1 ? 'Tus datos' : step === 2 ? 'Dirección de envío' : 'Método de pago'}
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {step === 1 && (<>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  <Field label="Nombre" placeholder="Mateo" />
                  <Field label="Apellido" placeholder="Silva" />
                </div>
                <Field label="Email" placeholder="tu@email.com" type="email" />
                <Field label="Teléfono" placeholder="351 555 5555" />
              </>)}

              {step === 2 && (<>
                <Field label="Dirección" placeholder="Av. Colón 123, 3B" />
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
                  <Field label="Ciudad" placeholder="Córdoba" />
                  <Field label="Provincia" placeholder="Córdoba" />
                  <Field label="CP" placeholder="5000" />
                </div>
                <div style={{ padding: 16, border: '1px solid var(--line)', background: 'var(--bg-2)', display: 'flex', gap: 14, alignItems: 'center' }}>
                  <Icon name="truck" size={18} style={{ color: 'var(--accent)' }} />
                  <div style={{ fontSize: 13, color: 'var(--text-dim)' }}>
                    Envío en 48hs hábiles vía Correo Argentino / Andreani.
                  </div>
                </div>
              </>)}

              {step === 3 && (<>
                {[
                  { t: 'Tarjeta de crédito', s: 'Visa, Mastercard, Amex · hasta 3 cuotas sin interés', on: true },
                  { t: 'Transferencia bancaria', s: '10% de descuento adicional', on: false },
                  { t: 'MercadoPago', s: 'Todas las formas de pago', on: false },
                ].map((o, i) => (
                  <label key={i} style={{
                    display: 'flex', gap: 14, padding: 20,
                    border: '1px solid', borderColor: o.on ? 'var(--accent)' : 'var(--line-strong)',
                    background: o.on ? 'rgba(200,152,83,0.06)' : 'transparent',
                    cursor: 'pointer'
                  }}>
                    <span style={{
                      width: 18, height: 18, borderRadius: '50%',
                      border: '1px solid var(--line-strong)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0, marginTop: 2
                    }}>
                      {o.on && <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--accent)' }} />}
                    </span>
                    <div>
                      <div style={{ fontSize: 14, color: 'var(--text)', marginBottom: 4 }}>{o.t}</div>
                      <div style={{ fontSize: 12, color: 'var(--text-dim)' }}>{o.s}</div>
                    </div>
                  </label>
                ))}
                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: 16, marginTop: 8 }}>
                  <Field label="Nº tarjeta" placeholder="0000 0000 0000 0000" />
                  <Field label="Vence" placeholder="MM/AA" />
                  <Field label="CVV" placeholder="123" />
                </div>
              </>)}
            </div>

            <div style={{ display: 'flex', gap: 12, marginTop: 40 }}>
              {step > 1 && (
                <button onClick={() => setStep(step - 1)} className="btn btn-ghost">
                  <Icon name="chevron_left" size={14} /> Atrás
                </button>
              )}
              <button onClick={next} className="btn btn-primary" style={{ flex: 1 }}>
                {step === 3 ? 'Confirmar y pagar' : 'Continuar'} <Icon name="arrow_right" size={14} />
              </button>
            </div>
          </div>

          {/* Resumen */}
          <aside style={{ background: 'var(--bg-2)', border: '1px solid var(--line)', padding: 28, alignSelf: 'start', position: 'sticky', top: 100 }}>
            <div className="eyebrow" style={{ marginBottom: 20 }}>Tu orden</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 24, paddingBottom: 20, borderBottom: '1px solid var(--line)' }}>
              {cart.map(it => (
                <div key={it.id + it.size} style={{ display: 'grid', gridTemplateColumns: '56px 1fr auto', gap: 12, alignItems: 'center' }}>
                  <div style={{ width: 56, height: 56, background: 'var(--bg-3)', overflow: 'hidden' }}>
                    {it.img ? <img src={it.img} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      : <div style={{ width: '100%', height: '100%', backgroundImage: 'repeating-linear-gradient(45deg, rgba(200,152,83,0.08) 0, rgba(200,152,83,0.08) 1px, transparent 1px, transparent 6px)' }} />}
                  </div>
                  <div>
                    <div style={{ fontSize: 12, color: 'var(--text)', lineHeight: 1.3 }}>{it.name}</div>
                    <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--text-muted)', letterSpacing: '0.15em', marginTop: 2 }}>T. {it.size} · x{it.qty}</div>
                  </div>
                  <div style={{ fontFamily: 'var(--display)', fontSize: 14, color: 'var(--cream)' }}>{fmtPrice(it.price * it.qty)}</div>
                </div>
              ))}
            </div>

            {[
              { l: 'Subtotal', v: fmtPrice(total) },
              { l: 'Envío', v: shipping === 0 ? 'Gratis' : fmtPrice(shipping) }
            ].map(r => (
              <div key={r.l} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: 13, color: 'var(--text-dim)' }}>
                <span>{r.l}</span><span style={{ color: 'var(--text)' }}>{r.v}</span>
              </div>
            ))}
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 16, marginTop: 16, borderTop: '1px solid var(--line)' }}>
              <span style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text)' }}>Total</span>
              <span style={{ fontFamily: 'var(--display)', fontSize: 28, color: 'var(--accent-bright)' }}>{fmtPrice(total + shipping)}</span>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
};

const NotifyModal = ({ open, onClose }) => {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  useEffect(() => { if (open) { setEmail(''); setSent(false); } }, [open]);
  if (!open) return null;
  return (
    <div className="fade-in" style={{ position: 'fixed', inset: 0, zIndex: 170, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div onClick={onClose} style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(10px)' }} />
      <div style={{ position: 'relative', width: 480, maxWidth: 'calc(100vw - 40px)', background: 'var(--bg-2)', border: '1px solid var(--line-strong)', padding: 40 }}>
        <button onClick={onClose} style={{ position: 'absolute', top: 16, right: 16, color: 'var(--text-dim)' }}>
          <Icon name="close" size={16} />
        </button>
        {sent ? (
          <div style={{ textAlign: 'center' }}>
            <div style={{ color: 'var(--accent)', marginBottom: 16, display: 'flex', justifyContent: 'center' }}>
              <Icon name="check" size={32} />
            </div>
            <h3 style={{ fontFamily: 'var(--display)', fontSize: 32, fontStyle: 'italic', color: 'var(--cream)', marginBottom: 12 }}>Listo.</h3>
            <p style={{ color: 'var(--text-dim)', fontSize: 14 }}>Te avisamos 2 horas antes del drop.</p>
          </div>
        ) : (<>
          <div className="eyebrow" style={{ marginBottom: 16 }}>Acceso anticipado</div>
          <h3 style={{ fontFamily: 'var(--display)', fontSize: 32, fontStyle: 'italic', color: 'var(--cream)', lineHeight: 1.1, marginBottom: 12, letterSpacing: '-0.01em' }}>
            Reservá tu par.
          </h3>
          <p style={{ color: 'var(--text-dim)', fontSize: 14, marginBottom: 28, lineHeight: 1.6 }}>
            Dejanos tu email y te avisamos apenas el Mercurial Superfly 10 esté disponible. Los suscriptores tienen 2h de ventaja.
          </p>
          <div style={{ display: 'flex', gap: 10 }}>
            <input value={email} onChange={e => setEmail(e.target.value)} placeholder="tu@email.com" style={{
              flex: 1, padding: '14px 16px', background: 'transparent',
              border: '1px solid var(--line-strong)', color: 'var(--text)',
              fontSize: 14, outline: 'none'
            }} />
            <button className="btn btn-primary" onClick={() => setSent(true)}>Avisarme</button>
          </div>
        </>)}
      </div>
    </div>
  );
};

Object.assign(window, { CartDrawer, SearchOverlay, AccountDrawer, Checkout, NotifyModal });
