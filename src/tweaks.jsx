// ============================================================
// Tweaks panel
// ============================================================

const TweaksPanel = ({ tweaks, setTweaks, onClose }) => {
  const set = (k, v) => {
    const next = { ...tweaks, [k]: v };
    setTweaks(next);
    try { window.parent.postMessage({ type: '__edit_mode_set_keys', edits: { [k]: v } }, '*'); } catch(e){}
  };

  return (
    <div className="tweaks-panel">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, paddingBottom: 12, borderBottom: '1px solid var(--line)' }}>
        <h3 style={{ margin: 0, padding: 0, border: 'none' }}>Tweaks</h3>
        <button onClick={onClose} style={{ color: 'var(--text-dim)', display: 'flex' }}>
          <Icon name="close" size={14} />
        </button>
      </div>

      <div className="tweak-row">
        <label>Color de acento</label>
        <div className="tweak-swatches">
          {[
            { v: '#c89853', label: 'Dorado' },
            { v: '#d4d4d4', label: 'Platino' },
            { v: '#ff3b30', label: 'Rojo' },
            { v: '#39ff14', label: 'Verde flúor' },
            { v: '#7aa2ff', label: 'Cyan' },
          ].map(c => (
            <button key={c.v}
              className={'tweak-swatch' + (tweaks.accent === c.v ? ' active' : '')}
              onClick={() => set('accent', c.v)}
              style={{ background: c.v }}
              title={c.label}
            />
          ))}
        </div>
      </div>

      <div className="tweak-row">
        <label>Tipografía display</label>
        <div className="tweak-options">
          {[
            { v: "'Playfair Display', serif", label: 'Playfair' },
            { v: "'Cormorant Garamond', serif", label: 'Cormorant' },
            { v: "'Bodoni Moda', serif", label: 'Bodoni' },
          ].map(f => (
            <button key={f.v} className={tweaks.display === f.v ? 'active' : ''} onClick={() => set('display', f.v)}>
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div className="tweak-row">
        <label>Layout del hero</label>
        <div className="tweak-options">
          <button className={tweaks.heroLayout === 'split' ? 'active' : ''} onClick={() => set('heroLayout', 'split')}>Split</button>
          <button className={tweaks.heroLayout === 'centered' ? 'active' : ''} onClick={() => set('heroLayout', 'centered')}>Centrado</button>
          <button className={tweaks.heroLayout === 'fullbleed' ? 'active' : ''} onClick={() => set('heroLayout', 'fullbleed')}>Editorial</button>
        </div>
      </div>

      <div className="tweak-row">
        <label>Densidad del catálogo</label>
        <div className="tweak-options">
          <button className={tweaks.columns === 3 ? 'active' : ''} onClick={() => set('columns', 3)}>3 cols</button>
          <button className={tweaks.columns === 4 ? 'active' : ''} onClick={() => set('columns', 4)}>4 cols</button>
        </div>
      </div>

      <div className="tweak-row">
        <label>Modo</label>
        <div className="tweak-options">
          <button className={tweaks.theme === 'dark' ? 'active' : ''} onClick={() => set('theme', 'dark')}>Oscuro</button>
          <button className={tweaks.theme === 'sepia' ? 'active' : ''} onClick={() => set('theme', 'sepia')}>Sepia</button>
        </div>
      </div>

      <div style={{ marginTop: 20, paddingTop: 14, borderTop: '1px solid var(--line)', color: 'var(--text-muted)', fontSize: 9, letterSpacing: '0.15em', textTransform: 'uppercase' }}>
        Ajustes persistentes · Prototipo
      </div>
    </div>
  );
};

Object.assign(window, { TweaksPanel });
