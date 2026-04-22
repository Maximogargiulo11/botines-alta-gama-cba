// ============================================================
// Primitivos reutilizables
// ============================================================

const { useState, useEffect, useRef, useMemo, useCallback } = React;

// Moneda argentina
const fmtPrice = (n) => {
  return '$' + n.toLocaleString('es-AR', { maximumFractionDigits: 0 });
};

// Placeholder de imagen con patrón de rayas + etiqueta monospace
const ImgPlaceholder = ({ label = 'PRODUCT SHOT', aspect = '1/1', style = {}, children }) => (
  <div className="img-placeholder" data-label={label}
    style={{ aspectRatio: aspect, width: '100%', ...style }}>
    {children}
  </div>
);

// Imagen real o placeholder
const ProductImage = ({ src, alt, label, aspect = '1/1', fit = 'cover', style = {} }) => {
  if (src) {
    return (
      <div style={{ aspectRatio: aspect, width: '100%', background: 'var(--bg-3)', overflow: 'hidden', ...style }}>
        <img src={src} alt={alt} style={{ width: '100%', height: '100%', objectFit: fit, display: 'block' }} />
      </div>
    );
  }
  return <ImgPlaceholder label={label || alt || 'PRODUCT'} aspect={aspect} style={style} />;
};

// Divider con texto mono
const SectionHeader = ({ eyebrow, title, subtitle, right, align = 'left' }) => (
  <div style={{
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    gap: 40,
    marginBottom: 48,
    flexWrap: 'wrap'
  }}>
    <div style={{ maxWidth: 700, textAlign: align }}>
      {eyebrow && (
        <div className="eyebrow" style={{ marginBottom: 16, display: 'flex', alignItems: 'center', gap: 12, justifyContent: align === 'center' ? 'center' : 'flex-start' }}>
          <span style={{ width: 24, height: 1, background: 'var(--accent)' }} />
          {eyebrow}
        </div>
      )}
      <h2 style={{
        fontFamily: 'var(--display)',
        fontWeight: 400,
        fontSize: 'clamp(36px, 5vw, 64px)',
        lineHeight: 1.02,
        letterSpacing: '-0.02em',
      }}>
        {title}
      </h2>
      {subtitle && (
        <p style={{
          marginTop: 20,
          color: 'var(--text-dim)',
          fontSize: 15,
          lineHeight: 1.6,
          maxWidth: 520,
        }}>
          {subtitle}
        </p>
      )}
    </div>
    {right}
  </div>
);

// Badge
const Badge = ({ children, variant = 'default', style = {} }) => {
  const variants = {
    default: { background: 'rgba(200,152,83,0.15)', color: 'var(--accent)', border: '1px solid rgba(200,152,83,0.3)' },
    solid: { background: 'var(--accent)', color: '#0a0a0a' },
    outline: { background: 'transparent', color: 'var(--text)', border: '1px solid var(--line-strong)' },
    dark: { background: 'rgba(0,0,0,0.6)', color: 'var(--text)', border: '1px solid var(--line)' },
  };
  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      fontFamily: 'var(--mono)',
      fontSize: 10,
      letterSpacing: '0.18em',
      textTransform: 'uppercase',
      padding: '6px 10px',
      fontWeight: 500,
      ...variants[variant],
      ...style,
    }}>
      {children}
    </span>
  );
};

// Marquee (para la banda anunciante)
const Marquee = ({ items }) => {
  const track = [...items, ...items]; // duplicado para loop
  return (
    <div style={{
      borderTop: '1px solid var(--line)',
      borderBottom: '1px solid var(--line)',
      overflow: 'hidden',
      background: 'var(--bg)',
      padding: '16px 0'
    }}>
      <div className="marquee-track">
        {track.map((it, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', gap: 60,
            fontFamily: 'var(--display)',
            fontStyle: 'italic',
            fontSize: 20,
            color: 'var(--text)',
            whiteSpace: 'nowrap'
          }}>
            <span>{it}</span>
            <span style={{ width: 6, height: 6, background: 'var(--accent)', borderRadius: '50%' }} />
          </div>
        ))}
      </div>
    </div>
  );
};

Object.assign(window, {
  fmtPrice, ImgPlaceholder, ProductImage, SectionHeader, Badge, Marquee,
  useState, useEffect, useRef, useMemo, useCallback
});
