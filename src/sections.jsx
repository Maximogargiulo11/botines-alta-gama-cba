// ============================================================
// Secciones varias: brands grid, sobre nosotros, testimoniales
// ============================================================

const BrandsGrid = ({ onBrand }) => {
  return (
    <section id="brands" data-screen-label="03 Brands" style={{ padding: '120px 0 100px', background: 'var(--bg)' }}>
      <div className="container">
        <SectionHeader
          eyebrow="Marcas que trabajamos"
          title={<>Cuatro marcas.<br /><em style={{ fontFamily: 'var(--display)' }}>Una sola curaduría.</em></>}
          subtitle="Traemos exclusivamente los últimos lanzamientos de las líneas elite. Nada de réplicas, nada de stock viejo. Solo lo que se usa hoy en el fútbol profesional."
          right={
            <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--text-muted)', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
              47 modelos activos
            </div>
          }
        />

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 1,
          background: 'var(--line)',
          border: '1px solid var(--line)',
        }}>
          {BRANDS.map((b) => (
            <BrandCard key={b.id} brand={b} onSelect={() => onBrand(b.id)} />
          ))}
        </div>
      </div>
    </section>
  );
};

const BrandCard = ({ brand, onSelect }) => {
  const [hover, setHover] = useState(false);
  return (
    <button
      onClick={onSelect}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: hover ? 'var(--bg-3)' : 'var(--bg)',
        border: 'none',
        padding: '56px 32px 32px',
        textAlign: 'left',
        cursor: 'pointer',
        transition: 'background 0.4s ease',
        minHeight: 360,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Hover accent shimmer */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 1,
        background: brand.accent,
        transform: hover ? 'scaleX(1)' : 'scaleX(0)',
        transformOrigin: 'left',
        transition: 'transform 0.5s ease'
      }} />

      <div>
        <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--text-muted)', letterSpacing: '0.25em', marginBottom: 24 }}>
          0{BRANDS.indexOf(brand) + 1} / 04
        </div>
        <div style={{
          fontFamily: 'var(--display)',
          fontSize: 48,
          fontWeight: 500,
          color: hover ? brand.accent : 'var(--text)',
          letterSpacing: '-0.02em',
          marginBottom: 12,
          transition: 'color 0.3s',
          textTransform: brand.id === 'adidas' || brand.id === 'puma' ? 'lowercase' : 'none'
        }}>
          {brand.name}
        </div>
        <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--text-dim)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 24 }}>
          {brand.tagline}
        </div>

        {/* Lineas */}
        <div style={{
          maxHeight: hover ? 200 : 0,
          overflow: 'hidden',
          transition: 'max-height 0.4s ease, opacity 0.3s',
          opacity: hover ? 1 : 0,
        }}>
          {brand.models.map(m => (
            <div key={m} style={{
              fontSize: 13, color: 'var(--text-dim)',
              padding: '6px 0',
              borderBottom: '1px solid var(--line)',
              display: 'flex', justifyContent: 'space-between'
            }}>
              <span>{m}</span>
              <Icon name="arrow_right" size={12} />
            </div>
          ))}
        </div>
      </div>

      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
        paddingTop: 24, borderTop: '1px solid var(--line)'
      }}>
        <div>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--text-muted)', letterSpacing: '0.2em' }}>MODELOS</div>
          <div style={{ fontFamily: 'var(--display)', fontSize: 28, color: 'var(--text)', marginTop: 2 }}>{brand.count}</div>
        </div>
        <div style={{
          width: 40, height: 40, borderRadius: '50%',
          border: '1px solid var(--line-strong)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'all 0.3s',
          background: hover ? brand.accent : 'transparent',
          color: hover ? '#000' : 'var(--text)',
          borderColor: hover ? brand.accent : 'var(--line-strong)'
        }}>
          <Icon name="arrow_right" size={14} />
        </div>
      </div>
    </button>
  );
};

const AboutSection = () => (
  <section id="about" data-screen-label="06 About" style={{ padding: '120px 0', background: 'var(--bg-2)', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}>
    <div className="container" style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 80, alignItems: 'center' }}>
      <div>
        <div className="eyebrow" style={{ marginBottom: 20 }}>Desde Córdoba</div>
        <h2 style={{
          fontFamily: 'var(--display)',
          fontSize: 'clamp(44px, 5vw, 72px)',
          lineHeight: 1.02,
          letterSpacing: '-0.02em',
          marginBottom: 32,
          color: 'var(--cream)'
        }}>
          Los últimos lanzamientos,<br />
          <em style={{ color: 'var(--accent)' }}>antes que nadie.</em>
        </h2>
        <p style={{ fontSize: 16, color: 'var(--text-dim)', lineHeight: 1.7, marginBottom: 20, maxWidth: 520, textWrap: 'pretty' }}>
          Botines Alta Gama CBA nace de la obsesión por el detalle. Somos un showroom
          curado en Córdoba Capital que trae únicamente las líneas elite de Nike, adidas,
          Puma y New Balance — las mismas que usan los jugadores profesionales.
        </p>
        <p style={{ fontSize: 16, color: 'var(--text-dim)', lineHeight: 1.7, marginBottom: 40, maxWidth: 520, textWrap: 'pretty' }}>
          Cada par se selecciona, verifica y fotografía en nuestro espacio antes de
          salir a la venta. Autenticidad garantizada con certificado.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, auto)', gap: 48, paddingTop: 32, borderTop: '1px solid var(--line)' }}>
          {[
            { v: '200+', l: 'Pares vendidos' },
            { v: '100%', l: 'Originales' },
            { v: '24h', l: 'Respuesta' },
          ].map(s => (
            <div key={s.l}>
              <div style={{ fontFamily: 'var(--display)', fontSize: 40, color: 'var(--accent)', fontStyle: 'italic' }}>{s.v}</div>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--text-muted)', letterSpacing: '0.2em', textTransform: 'uppercase', marginTop: 4 }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ position: 'relative', aspectRatio: '3/4' }}>
        <img src="assets/messi-sitting.jpg"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{
          position: 'absolute', bottom: 24, left: 24, right: 24,
          padding: 20,
          background: 'rgba(10,10,10,0.7)',
          backdropFilter: 'blur(10px)',
          borderLeft: '2px solid var(--accent)'
        }}>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--accent)', letterSpacing: '0.2em', marginBottom: 6 }}>SHOWROOM</div>
          <div style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.4 }}>
            Visitá nuestro showroom con cita previa. Probá, compará, elegí.
          </div>
        </div>
      </div>
    </div>
  </section>
);

const Testimonials = () => (
  <section style={{ padding: '100px 0', background: 'var(--bg)', borderBottom: '1px solid var(--line)' }}>
    <div className="container">
      <SectionHeader
        eyebrow="Lo que dicen"
        title={<>Confían en nuestra curaduría.</>}
      />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1, background: 'var(--line)' }}>
        {TESTIMONIALS.map((t, i) => (
          <div key={i} style={{ background: 'var(--bg)', padding: '40px 32px' }}>
            <div style={{ color: 'var(--accent)', display: 'flex', gap: 4, marginBottom: 20 }}>
              {[1,2,3,4,5].map(n => <Icon key={n} name="star" size={14} stroke={1.8} />)}
            </div>
            <p style={{
              fontFamily: 'var(--display)',
              fontSize: 22,
              lineHeight: 1.35,
              color: 'var(--cream)',
              marginBottom: 32,
              fontStyle: 'italic',
              textWrap: 'pretty'
            }}>
              "{t.text}"
            </p>
            <div style={{ paddingTop: 20, borderTop: '1px solid var(--line)' }}>
              <div style={{ fontSize: 14, color: 'var(--text)', marginBottom: 2 }}>{t.name}</div>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--text-muted)', letterSpacing: '0.2em', textTransform: 'uppercase' }}>{t.role}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const TrustStrip = () => (
  <section style={{ padding: '48px 0', background: 'var(--bg-2)', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}>
    <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 40 }}>
      {[
        { icon: 'shield', title: '', sub: 'Certificado de autenticidad' },
        { icon: 'truck', title: 'Envío en 48h', sub: 'A todo el país' },
        { icon: 'check', title: '3 cuotas sin interés', sub: 'Todas las tarjetas' },
        { icon: 'spark', title: 'Asesoría por talle', sub: 'WhatsApp directo' }
      ].map((f, i) => (
        <div key={i} style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
          <div style={{
            width: 44, height: 44, border: '1px solid var(--line-strong)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'var(--accent)', flexShrink: 0
          }}>
            <Icon name={f.icon} size={18} />
          </div>
          <div>
            <div style={{ fontSize: 14, color: 'var(--text)', marginBottom: 4, fontWeight: 500 }}>{f.title}</div>
            <div style={{ fontSize: 12, color: 'var(--text-dim)' }}>{f.sub}</div>
          </div>
        </div>
      ))}
    </div>
  </section>
);

Object.assign(window, { BrandsGrid, AboutSection, Testimonials, TrustStrip });
