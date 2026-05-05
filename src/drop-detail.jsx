// ============================================================
// DropDetail — pantalla editorial estilo artículo de revista
// Hero full-bleed, lead, why-section, facts grid, galería editorial
// ============================================================

const DropDetail = ({ dropId, onClose }) => {
  const drop = PAST_DROPS.find(d => d.id === dropId);

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    window.scrollTo({ top: 0, behavior: 'instant' });
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  if (!drop) return null;

  const gallery = drop.gallery && drop.gallery.length > 0
    ? drop.gallery
    : (drop.img ? [drop.img] : []);

  const heroImg = gallery[0] || drop.img;
  const restGallery = gallery.slice(1);

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 200,
      background: 'var(--bg)',
      overflowY: 'auto',
      animation: 'fadeIn 0.4s ease-out'
    }}>
      {/* Top bar — minimal, flotante */}
      <div style={{
        position: 'fixed', top: 24, left: 24, right: 24, zIndex: 20,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        pointerEvents: 'none'
      }}>
        <button onClick={onClose} style={{
          fontFamily: 'var(--mono)', fontSize: 11,
          color: 'var(--cream)', letterSpacing: '0.22em', textTransform: 'uppercase',
          display: 'flex', alignItems: 'center', gap: 10,
          cursor: 'pointer',
          padding: '12px 18px',
          background: 'rgba(0,0,0,0.5)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.18)',
          pointerEvents: 'auto',
          transition: 'all 0.3s'
        }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(0,0,0,0.8)'; e.currentTarget.style.borderColor = 'var(--accent)'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'rgba(0,0,0,0.5)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.18)'; }}
        >
          <Icon name="arrow_left" size={14} /> Volver al listado
        </button>
        <div style={{
          fontFamily: 'var(--mono)', fontSize: 10,
          color: 'var(--cream)',
          letterSpacing: '0.25em', textTransform: 'uppercase',
          padding: '12px 18px',
          background: 'rgba(0,0,0,0.5)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.18)',
          pointerEvents: 'auto'
        }}>
          Bot. Alta Gama Editorial
        </div>
      </div>

      {/* HERO full-bleed con título superpuesto */}
      <section style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        overflow: 'hidden'
      }}>
        {heroImg ? (
          <img src={heroImg}
            style={{
              width: '100%', height: '100%', objectFit: 'cover',
              objectPosition: 'center'
            }} />
        ) : (
          <div className="img-placeholder" data-label={drop.imgLabel || drop.title} style={{ width: '100%', height: '100%' }} />
        )}

        {/* Degradé inferior fuerte para el título */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(180deg, rgba(0,0,0,0.4) 0%, transparent 30%, transparent 50%, rgba(0,0,0,0.95) 100%)'
        }} />

        {/* Issue stamp top-right */}
        <div style={{
          position: 'absolute', top: 100, right: 32,
          fontFamily: 'var(--mono)', fontSize: 10,
          color: 'rgba(255,255,255,0.6)',
          letterSpacing: '0.3em', textTransform: 'uppercase',
          textAlign: 'right',
          lineHeight: 1.8
        }}>
          ISSUE 003<br/>
          DROP REPORT
        </div>

        {/* Bottom title block */}
        <div className="container" style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          padding: '0 32px 64px'
        }}>
          <div style={{
            fontFamily: 'var(--mono)', fontSize: 11,
            letterSpacing: '0.3em', textTransform: 'uppercase',
            color: 'var(--accent)',
            marginBottom: 28,
            display: 'flex', alignItems: 'center', gap: 14
          }}>
            <span style={{ width: 32, height: 1, background: 'var(--accent)' }} />
            {drop.brand} · {drop.subtitle}
          </div>

          <h1 style={{
            fontFamily: 'var(--display)',
            fontSize: 'clamp(64px, 11vw, 184px)',
            lineHeight: 0.85,
            letterSpacing: '-0.04em',
            fontWeight: 400,
            color: 'var(--cream)',
            marginBottom: 32,
            maxWidth: 1100
          }}>
            {drop.title.split(' ').map((w, i, arr) =>
              i === arr.length - 1
                ? <span key={i} style={{ fontStyle: 'italic' }}>{w}</span>
                : <span key={i}>{w} </span>
            )}
          </h1>

          <div style={{
            display: 'flex', gap: 32, flexWrap: 'wrap',
            paddingTop: 24,
            borderTop: '1px solid rgba(255,255,255,0.18)',
            fontFamily: 'var(--mono)',
            fontSize: 11,
            color: 'rgba(255,255,255,0.7)',
            letterSpacing: '0.18em',
            textTransform: 'uppercase'
          }}>
            <div>
              <div style={{ fontSize: 9, opacity: 0.6, marginBottom: 4 }}>Fecha de drop</div>
              <div style={{ color: 'var(--cream)' }}>{drop.date}</div>
            </div>
            <div>
              <div style={{ fontSize: 9, opacity: 0.6, marginBottom: 4 }}>Estado</div>
              <div style={{ color: 'var(--cream)' }}>{drop.status}</div>
            </div>
            {drop.units && (
              <div>
                <div style={{ fontSize: 9, opacity: 0.6, marginBottom: 4 }}>Tirada</div>
                <div style={{ color: 'var(--cream)' }}>{drop.units} unidades</div>
              </div>
            )}
            {drop.collection && (
              <div style={{ flex: '1 1 auto', minWidth: 200 }}>
                <div style={{ fontSize: 9, opacity: 0.6, marginBottom: 4 }}>Colección</div>
                <div style={{ color: 'var(--cream)' }}>{drop.collection}</div>
              </div>
            )}
          </div>

          {/* Scroll cue */}
          <div style={{
            position: 'absolute', bottom: 24, right: 32,
            fontFamily: 'var(--mono)', fontSize: 10,
            color: 'rgba(255,255,255,0.5)', letterSpacing: '0.3em',
            display: 'flex', alignItems: 'center', gap: 10
          }}>
            SEGUIR LEYENDO <Icon name="arrow_down" size={12} />
          </div>
        </div>
      </section>

      {/* LEAD paragraph */}
      {drop.lead && (
        <section style={{ padding: '120px 32px 60px' }}>
          <div style={{ maxWidth: 880, margin: '0 auto' }}>
            <p style={{
              fontFamily: 'var(--display)',
              fontStyle: 'italic',
              fontWeight: 400,
              fontSize: 'clamp(24px, 3vw, 38px)',
              lineHeight: 1.35,
              color: 'var(--cream)',
              letterSpacing: '-0.01em',
              textWrap: 'balance'
            }}>
              {drop.lead}
            </p>
          </div>
        </section>
      )}

      {/* WHY section — body text con dropcap */}
      {drop.why && (
        <section style={{ padding: '40px 32px 80px' }}>
          <div style={{
            maxWidth: 1200, margin: '0 auto',
            display: 'grid', gridTemplateColumns: '180px 1fr',
            gap: 60, alignItems: 'start'
          }}>
            <div style={{
              fontFamily: 'var(--mono)', fontSize: 11,
              color: 'var(--accent)', letterSpacing: '0.25em',
              textTransform: 'uppercase',
              position: 'sticky', top: 100
            }}>
              ¿Por qué este<br/>botín es<br/>especial?
            </div>
            <div>
              <p style={{
                fontSize: 18, lineHeight: 1.7,
                color: 'var(--text)',
                maxWidth: 720,
                textWrap: 'pretty'
              }}>
                <span style={{
                  float: 'left',
                  fontFamily: 'var(--display)',
                  fontSize: 88,
                  lineHeight: 0.85,
                  marginRight: 14,
                  marginTop: 8,
                  color: 'var(--accent)',
                  fontWeight: 600
                }}>
                  {drop.why[0]}
                </span>
                {drop.why.slice(1)}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* PULL QUOTE / facts strip */}
      {drop.facts && drop.facts.length > 0 && (
        <section style={{
          padding: '80px 32px',
          borderTop: '1px solid var(--line)',
          borderBottom: '1px solid var(--line)',
          background: 'var(--bg-2)'
        }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div style={{
              fontFamily: 'var(--mono)', fontSize: 11,
              color: 'var(--accent)', letterSpacing: '0.25em',
              textTransform: 'uppercase',
              marginBottom: 40
            }}>
              Datos & detalles
            </div>
            <div style={{
              display: 'grid',
              gridTemplateColumns: `repeat(${Math.min(drop.facts.length, 5)}, 1fr)`,
              gap: 0,
              borderTop: '1px solid var(--line)'
            }}>
              {drop.facts.map(([k, v], i) => (
                <div key={i} style={{
                  padding: '32px 24px 32px 0',
                  borderRight: i < drop.facts.length - 1 ? '1px solid var(--line)' : 'none',
                  paddingLeft: i === 0 ? 0 : 24
                }}>
                  <div style={{
                    fontFamily: 'var(--mono)', fontSize: 9,
                    color: 'var(--text-muted)',
                    letterSpacing: '0.25em', textTransform: 'uppercase',
                    marginBottom: 14
                  }}>
                    {k}
                  </div>
                  <div style={{
                    fontFamily: 'var(--display)',
                    fontSize: 22,
                    lineHeight: 1.25,
                    color: 'var(--cream)',
                    fontStyle: 'italic'
                  }}>
                    {v}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* GALLERY editorial — fotos grandes alternando */}
      {restGallery.length > 0 && (
        <section style={{ padding: '120px 0 80px' }}>
          <div className="container" style={{ marginBottom: 60 }}>
            <div style={{
              fontFamily: 'var(--mono)', fontSize: 11,
              color: 'var(--accent)', letterSpacing: '0.25em',
              textTransform: 'uppercase',
              marginBottom: 18
            }}>
              Galería · {String(restGallery.length).padStart(2, '0')}
            </div>
            <h2 style={{
              fontFamily: 'var(--display)',
              fontSize: 'clamp(40px, 5vw, 72px)',
              lineHeight: 0.95,
              color: 'var(--cream)',
              letterSpacing: '-0.025em',
              fontWeight: 400,
              maxWidth: 800
            }}>
              El bot<span style={{ fontStyle: 'italic' }}>í</span>n,<br/>
              en detalle.
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 64 }}>
            {restGallery.map((src, i) => {
              const layout = i % 3;
              if (layout === 0) {
                return (
                  <figure key={i} style={{ width: '100%' }}>
                    <img src={src} style={{ width: '100%', height: 'min(80vh, 900px)', objectFit: 'cover', display: 'block' }} />
                    <figcaption style={{
                      maxWidth: 1200, margin: '20px auto 0',
                      padding: '0 32px',
                      fontFamily: 'var(--mono)', fontSize: 10,
                      color: 'var(--text-muted)',
                      letterSpacing: '0.25em', textTransform: 'uppercase'
                    }}>
                      Fig. 0{i + 1} · {drop.title}
                    </figcaption>
                  </figure>
                );
              } else if (layout === 1) {
                return (
                  <figure key={i} style={{ maxWidth: 1100, margin: '0 auto', padding: '0 32px', width: '100%' }}>
                    <img src={src} style={{ width: '100%', aspectRatio: '4/5', objectFit: 'cover', display: 'block' }} />
                    <figcaption style={{
                      marginTop: 16,
                      fontFamily: 'var(--mono)', fontSize: 10,
                      color: 'var(--text-muted)',
                      letterSpacing: '0.25em', textTransform: 'uppercase'
                    }}>
                      Fig. 0{i + 1} · Detalle
                    </figcaption>
                  </figure>
                );
              } else {
                return (
                  <figure key={i} style={{
                    maxWidth: 1400, margin: '0 auto',
                    padding: '0 32px',
                    width: '100%',
                    display: 'grid',
                    gridTemplateColumns: '1fr 2fr',
                    gap: 40,
                    alignItems: 'end'
                  }}>
                    <figcaption style={{
                      fontFamily: 'var(--mono)', fontSize: 10,
                      color: 'var(--text-muted)',
                      letterSpacing: '0.25em', textTransform: 'uppercase',
                      paddingBottom: 24,
                      lineHeight: 1.8
                    }}>
                      Fig. 0{i + 1}<br/>
                      <span style={{ color: 'var(--accent)' }}>{drop.colorway}</span>
                    </figcaption>
                    <img src={src} style={{ width: '100%', aspectRatio: '5/4', objectFit: 'cover', display: 'block' }} />
                  </figure>
                );
              }
            })}
          </div>
        </section>
      )}

      {/* DESIGNER + COLORWAY block */}
      <section style={{
        padding: '100px 32px',
        borderTop: '1px solid var(--line)'
      }}>
        <div style={{
          maxWidth: 1200, margin: '0 auto',
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 40
        }}>
          {drop.designer && (
            <div>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--text-muted)', letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: 14 }}>
                Diseño
              </div>
              <div style={{ fontFamily: 'var(--display)', fontSize: 22, lineHeight: 1.3, color: 'var(--cream)', fontStyle: 'italic' }}>
                {drop.designer}
              </div>
            </div>
          )}
          {drop.colorway && (
            <div>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--text-muted)', letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: 14 }}>
                Colorway
              </div>
              <div style={{ fontFamily: 'var(--display)', fontSize: 22, lineHeight: 1.3, color: 'var(--cream)', fontStyle: 'italic' }}>
                {drop.colorway}
              </div>
            </div>
          )}
          {drop.price && (
            <div>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--text-muted)', letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: 14 }}>
                Precio de referencia
              </div>
              <div style={{ fontFamily: 'var(--display)', fontSize: 22, lineHeight: 1.3, color: 'var(--cream)', fontStyle: 'italic' }}>
                ${drop.price.toLocaleString('es-AR')}
              </div>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--text-muted)', marginTop: 6, letterSpacing: '0.1em' }}>
                Consultar disponibilidad y talles por WhatsApp
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Final block — back to listing */}
      <section style={{
        padding: '120px 32px 100px',
        borderTop: '1px solid var(--line)',
        textAlign: 'center'
      }}>
        <div style={{
          fontFamily: 'var(--mono)', fontSize: 10,
          color: 'var(--text-muted)',
          letterSpacing: '0.3em', textTransform: 'uppercase',
          marginBottom: 32
        }}>
          Fin del artículo
        </div>
        <h3 style={{
          fontFamily: 'var(--display)',
          fontSize: 'clamp(32px, 4vw, 56px)',
          color: 'var(--cream)',
          marginBottom: 40,
          fontStyle: 'italic',
          fontWeight: 400,
          letterSpacing: '-0.02em'
        }}>
          Seguí explorando el archivo.
        </h3>
        <button onClick={onClose} className="btn btn-primary"
          style={{ padding: '18px 32px', fontSize: 12 }}>
          <Icon name="arrow_left" size={14} /> Volver al listado
        </button>

        <div style={{
          marginTop: 80,
          fontFamily: 'var(--mono)', fontSize: 10,
          color: 'var(--text-muted)',
          letterSpacing: '0.25em'
        }}>
          BOTINES ALTA GAMA · CBA · MMXXVI
        </div>
      </section>
    </div>
  );
};

Object.assign(window, { DropDetail });
