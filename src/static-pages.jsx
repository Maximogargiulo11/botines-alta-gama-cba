// ============================================================
// Static pages — Política de Cambios, FAQ, 404
// ============================================================

function PoliticaCambiosPage() {
  return (
    <main className="container" style={{ paddingTop: 56, paddingBottom: 40, maxWidth: 880 }}>
      <BackLink to="/" label="Volver a Lanzamientos" />
      <PageHeader
        eyebrow="Información para el cliente"
        title="Política de Cambio y Devolución"
        sub="Última actualización: 01 de abril de 2026. Aplicable a todas las compras presenciales y online."
        marginTop={32}
      />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 36 }}>
        <PolicyBlock n="01" titulo="Plazos de cambio">
          <p>Todos los botines vendidos por Botines Alta Gama CBA cuentan con un plazo de <strong>30 días corridos</strong> desde la fecha de compra para solicitar cambio por talle o defecto de fábrica. El plazo se cuenta desde la fecha de retiro en local o desde la entrega documentada del envío.</p>
          <p>El producto debe presentarse en condiciones originales: caja, accesorios, etiquetas y bolsa de transporte cuando corresponda. No se aceptan cambios de botines usados en superficie deportiva.</p>
        </PolicyBlock>

        <PolicyBlock n="02" titulo="Cambios por talle">
          <p>Si el talle no es el correcto, podés acercarte al local de Av. Colón 1247 para realizar el cambio sin costo. Sujeto a disponibilidad de stock del talle solicitado en el mismo modelo y colorway.</p>
          <p>En caso de no haber stock disponible, ofrecemos:</p>
          <ul>
            <li>Reserva sin cargo por un plazo de 60 días.</li>
            <li>Crédito por el monto pagado para usar en cualquier producto del catálogo.</li>
            <li>Cambio por otro modelo, abonando o recibiendo la diferencia.</li>
          </ul>
        </PolicyBlock>

        <PolicyBlock n="03" titulo="Devoluciones y reintegros">
          <p>Las devoluciones con reintegro del dinero están sujetas a la Ley de Defensa del Consumidor (Ley 24.240) y se procesan en compras realizadas a distancia (web, WhatsApp o redes sociales) dentro de los 10 días corridos desde la recepción del producto.</p>
          <p>El reintegro se realiza por el mismo medio de pago utilizado en la compra. Tiempo estimado de acreditación: 5 a 10 días hábiles según entidad.</p>
        </PolicyBlock>

        <PolicyBlock n="04" titulo="Defectos de fábrica">
          <p>Todos nuestros productos cuentan con garantía oficial de la marca (adidas, Nike, Puma, New Balance) por un plazo de <strong>6 meses</strong> contra defectos de fabricación. La garantía no cubre desgaste por uso normal ni daños por uso inadecuado.</p>
          <p>Para gestionar una garantía, escribinos a <strong>hola@botinesaltagama.com.ar</strong> con foto del defecto y comprobante de compra.</p>
        </PolicyBlock>

        <PolicyBlock n="05" titulo="Productos excluidos">
          <p>Las ediciones limitadas, signatures numeradas y productos de archivo (como la línea F50 Tunit Archive) están sujetos a una política especial. En estos casos, solo se aceptan cambios por defecto de fábrica, no por talle. Esta condición se informa al momento de la compra.</p>
        </PolicyBlock>
      </div>

      <div style={{
        marginTop: 56,
        padding: '32px 28px',
        border: '1px solid var(--line-strong)',
        background: 'var(--bg-2)'
      }}>
        <div className="eyebrow" style={{ marginBottom: 12 }}>¿Tenés dudas?</div>
        <p style={{ color: 'var(--text-dim)', fontSize: 15, marginBottom: 16, lineHeight: 1.6 }}>
          Nuestro equipo está disponible para resolver cualquier consulta sobre tu compra.
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
          <a href="https://wa.me/5493515558190" target="_blank" rel="noopener" className="btn btn-primary">WhatsApp</a>
          <L to="/faq" className="btn btn-ghost">Ver Preguntas Frecuentes</L>
        </div>
      </div>
    </main>
  );
}

function PolicyBlock({ n, titulo, children }) {
  return (
    <div style={{
      display: 'grid', gridTemplateColumns: '60px minmax(0, 1fr)',
      gap: 28, alignItems: 'start',
      paddingBottom: 32, borderBottom: '1px solid var(--line)'
    }}>
      <div style={{
        fontFamily: 'var(--mono)', fontSize: 14,
        letterSpacing: '0.18em', color: 'var(--text-muted)',
        paddingTop: 4
      }}>{n}</div>
      <div>
        <h2 style={{
          fontFamily: 'var(--display)',
          fontSize: 'clamp(22px, 2.4vw, 28px)',
          fontWeight: 600, marginBottom: 14,
          letterSpacing: '-0.01em'
        }}>{titulo}</h2>
        <div style={{ color: 'var(--text-dim)', fontSize: 15, lineHeight: 1.75, display: 'flex', flexDirection: 'column', gap: 14 }}>
          {children}
        </div>
      </div>
      <style>{`
        ul { padding-left: 18px; display: flex; flex-direction: column; gap: 6px; }
        strong { color: #fff; font-weight: 600; }
      `}</style>
    </div>
  );
}

// =============================================================
// FAQ Page
// =============================================================

const FAQ = [
  {
    cat: 'Compras y pagos',
    items: [
      { q: '¿Qué medios de pago aceptan?', a: 'Aceptamos efectivo, transferencia bancaria, MercadoPago, y todas las tarjetas de crédito y débito en hasta 12 cuotas sin interés con bancos seleccionados. Los pagos en efectivo y transferencia tienen un 10% de descuento.' },
      { q: '¿Hacen envíos a todo el país?', a: 'Sí. Trabajamos con Andreani y OCA para envíos a todo el territorio argentino. El envío estándar tarda 3 a 5 días hábiles desde Córdoba Capital. Envío gratis en compras superiores a $250.000.' },
      { q: '¿Puedo retirar en local?', a: 'Por supuesto. Nuestro local en Av. Colón 1247, Córdoba Capital, está abierto de lunes a sábados de 10 a 20h. El retiro es sin costo y permite probarte el botín antes de llevarlo.' }
    ]
  },
  {
    cat: 'Productos y autenticidad',
    items: [
      { q: '¿Los botines son originales?', a: 'Cien por ciento originales, con importación oficial. Trabajamos directamente con distribuidores autorizados de adidas, Nike, Puma y New Balance. Cada par tiene su SKU verificable y, en el caso de ediciones limitadas, certificado individual.' },
      { q: '¿Cómo sé si un talle me va a quedar?', a: 'En cada página de modelo publicamos la tabla universal de talles US/UK/EU/CM. Si tenés dudas, escribinos por WhatsApp con la medida de tu pie en centímetros y te asesoramos. Cada marca calza diferente, no todos los talles 9 US son iguales.' },
      { q: '¿Qué pasa si el botín que quiero no está en stock?', a: 'Llevamos lista de espera para todos los modelos. Escribinos el modelo y talle que buscás y te avisamos apenas haya reposición. También aceptamos seña por modelos en preventa.' }
    ]
  },
  {
    cat: 'Envíos y entregas',
    items: [
      { q: '¿Cuánto tarda mi pedido?', a: 'Pedidos retirados en local: disponibles el mismo día si confirmás el pago antes de las 17h. Envíos a Córdoba Capital: 24-48 hs por moto. Envíos al interior: 3 a 5 días hábiles por Andreani.' },
      { q: '¿Puedo cambiar la dirección de envío?', a: 'Sí, mientras el paquete no haya sido despachado. Una vez en tránsito, no es posible modificar el destino. Si tu pedido está demorado, contactanos y revisamos juntos el tracking.' }
    ]
  },
  {
    cat: 'Cambios y garantías',
    items: [
      { q: '¿Cuánto tiempo tengo para cambiar el talle?', a: '30 días corridos desde la compra, siempre que el botín no haya sido usado en superficie deportiva. Tiene que estar en condiciones originales: caja, accesorios y bolsa cuando corresponda.' },
      { q: '¿Qué cubre la garantía?', a: 'Defectos de fábrica por 6 meses desde la compra. No cubre desgaste normal, uso indebido ni daños por mala conservación. Para iniciar el reclamo necesitamos foto del defecto y comprobante de compra.' }
    ]
  }
];

function FAQPage() {
  const [openId, setOpenId] = useState('0-0');
  return (
    <main className="container" style={{ paddingTop: 56, paddingBottom: 40, maxWidth: 980 }}>
      <BackLink to="/" label="Volver a Lanzamientos" />
      <PageHeader
        eyebrow="Centro de ayuda"
        title="Preguntas Frecuentes"
        sub="Todo lo que necesitás saber antes y después de tu compra. Si no encontrás respuesta, escribinos."
        marginTop={32}
      />

      <div style={{ display: 'flex', flexDirection: 'column', gap: 56 }}>
        {FAQ.map((cat, ci) => (
          <div key={ci}>
            <div className="eyebrow" style={{ marginBottom: 20 }}>{cat.cat}</div>
            <div>
              {cat.items.map((it, i) => {
                const id = `${ci}-${i}`;
                const isOpen = openId === id;
                return (
                  <div key={id} style={{ borderTop: '1px solid var(--line)' }}>
                    <button
                      onClick={() => setOpenId(isOpen ? null : id)}
                      style={{
                        width: '100%', textAlign: 'left',
                        padding: '22px 0',
                        display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
                        gap: 24, color: '#fff'
                      }}>
                      <span style={{
                        fontFamily: 'var(--display)',
                        fontSize: 'clamp(18px, 1.8vw, 22px)',
                        fontWeight: 500, lineHeight: 1.3,
                        letterSpacing: '-0.005em',
                        textWrap: 'pretty'
                      }}>{it.q}</span>
                      <span style={{
                        fontFamily: 'var(--display)',
                        fontSize: 28, lineHeight: 1,
                        color: 'var(--text-dim)',
                        transition: 'transform 0.3s',
                        transform: isOpen ? 'rotate(45deg)' : 'rotate(0)',
                        flexShrink: 0
                      }}>+</span>
                    </button>
                    {isOpen && (
                      <div style={{
                        paddingBottom: 26,
                        color: 'var(--text-dim)', fontSize: 15, lineHeight: 1.75,
                        maxWidth: 760
                      }}>{it.a}</div>
                    )}
                  </div>
                );
              })}
              <div style={{ borderTop: '1px solid var(--line)' }}></div>
            </div>
          </div>
        ))}
      </div>

      <div style={{
        marginTop: 64,
        padding: '40px 36px',
        border: '1px solid var(--line-strong)',
        background: 'var(--bg-2)',
        display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between',
        gap: 28
      }}>
        <div style={{ maxWidth: 520 }}>
          <div className="eyebrow" style={{ marginBottom: 12 }}>¿No encontraste lo que buscabas?</div>
          <h3 style={{
            fontFamily: 'var(--display)',
            fontSize: 'clamp(22px, 2.4vw, 30px)',
            fontWeight: 600, lineHeight: 1.2, letterSpacing: '-0.01em'
          }}>Escribinos directamente y te respondemos en menos de una hora.</h3>
        </div>
        <a href="https://wa.me/5493515558190" target="_blank" rel="noopener" className="btn btn-primary">Hablar por WhatsApp</a>
      </div>
    </main>
  );
}

// =============================================================
// 404 / Not found
// =============================================================

function NotFoundPage() {
  return (
    <main className="container" style={{ paddingTop: 120, paddingBottom: 120, textAlign: 'center' }}>
      <div className="eyebrow" style={{ marginBottom: 18 }}>Error 404</div>
      <h1 style={{
        fontFamily: 'var(--display)',
        fontSize: 'clamp(60px, 9vw, 140px)',
        fontWeight: 600, letterSpacing: '-0.03em', lineHeight: 1
      }}>Página no encontrada</h1>
      <p style={{
        marginTop: 24, color: 'var(--text-dim)',
        fontFamily: 'var(--display)', fontStyle: 'italic',
        fontSize: 20, maxWidth: 540, marginLeft: 'auto', marginRight: 'auto'
      }}>El link que seguiste no existe o fue movido. Volvé al inicio para seguir explorando.</p>
      <div style={{ marginTop: 32, display: 'inline-flex', gap: 12 }}>
        <L to="/" className="btn btn-primary">Volver al inicio</L>
        <L to="/marcas" className="btn btn-ghost">Ver Marcas</L>
      </div>
    </main>
  );
}

Object.assign(window, { PoliticaCambiosPage, FAQPage, NotFoundPage });
