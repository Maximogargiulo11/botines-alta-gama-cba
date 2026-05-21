// ============================================================
// Tweaks — Three expressive controls that reshape the feel
// ============================================================

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "vibe": "editorial",
  "imagery": "full",
  "rhythm": "comfort"
}/*EDITMODE-END*/;

const VIBES = {
  editorial: {
    label: 'Editorial',
    swatches: ['#000000', '#ffffff', '#dcdcdc'],
    css: `
      --bg: #000000; --bg-2: #0a0a0a; --bg-3: #141414;
      --line: rgba(255,255,255,0.1); --line-strong: rgba(255,255,255,0.22);
      --text: #ffffff; --text-dim: rgba(255,255,255,0.62); --text-muted: rgba(255,255,255,0.42);
      --accent: #ffffff;
      --display: 'Playfair Display', serif;
      --body: 'Inter', sans-serif;
    `,
    extra: `
      h1, h2, h3 { font-weight: 600; letter-spacing: -0.015em; }
    `
  },
  sport: {
    label: 'Sport Hype',
    swatches: ['#070708', '#ccff33', '#ffffff'],
    css: `
      --bg: #070708; --bg-2: #0e0e10; --bg-3: #17171a;
      --line: rgba(204,255,51,0.12); --line-strong: rgba(204,255,51,0.30);
      --text: #ffffff; --text-dim: rgba(255,255,255,0.66); --text-muted: rgba(255,255,255,0.42);
      --accent: #ccff33;
      --display: 'Inter', sans-serif;
      --body: 'Inter', sans-serif;
    `,
    extra: `
      h1, h2, h3 {
        font-weight: 800 !important;
        letter-spacing: -0.04em !important;
        text-transform: uppercase;
        font-style: normal !important;
      }
      h1 em, h2 em, h3 em { font-style: normal !important; color: var(--accent) !important; }
      .eyebrow { color: var(--accent) !important; }
      p[style*="italic"] { font-style: normal !important; font-weight: 500; }
      .btn-primary { background: var(--accent); color: #000; }
      .btn-ghost:hover { color: var(--accent) !important; border-color: var(--accent) !important; }
    `
  },
  atelier: {
    label: 'Atelier',
    swatches: ['#1a1410', '#c89853', '#f3dfb8'],
    css: `
      --bg: #1a1410; --bg-2: #221a14; --bg-3: #2d2319;
      --line: rgba(243,223,184,0.10); --line-strong: rgba(243,223,184,0.22);
      --text: #f3dfb8; --text-dim: rgba(243,223,184,0.62); --text-muted: rgba(243,223,184,0.42);
      --accent: #c89853;
      --display: 'Bodoni Moda', serif;
      --body: 'Inter', sans-serif;
    `,
    extra: `
      h1, h2, h3 {
        font-weight: 500;
        letter-spacing: -0.015em;
      }
      h1 { font-style: italic; }
      .eyebrow { color: var(--accent) !important; }
      ::selection { background: var(--accent); color: #1a1410; }
    `
  }
};

const IMAGERY = {
  full: { label: 'Color', filter: 'none' },
  mono: { label: 'Monocromo', filter: 'grayscale(1) contrast(1.05)' },
  wash: { label: 'Lavado editorial', filter: 'saturate(0.55) contrast(1.04) brightness(0.96)' }
};

const RHYTHM = {
  comfort: { label: 'Confort', scale: 1 },
  spacious: { label: 'Aireado', scale: 1.45 },
  compact: { label: 'Compacto', scale: 0.72 }
};

function buildCSS(tweaks) {
  const vibe = VIBES[tweaks.vibe] || VIBES.editorial;
  const imagery = IMAGERY[tweaks.imagery] || IMAGERY.full;
  const rhythm = RHYTHM[tweaks.rhythm] || RHYTHM.comfort;
  const s = rhythm.scale;

  return `
    :root {
      ${vibe.css}
    }
    body { background: var(--bg); color: var(--text); font-family: var(--body); }

    /* Vibe overrides */
    ${vibe.extra}

    /* Imagery filter — only on content imagery, not logos/icons */
    article img, section img,
    .news-card img, .rel-card img, .brand-card img, .model-card img,
    .wide-figure img, .prod-announce img {
      filter: ${imagery.filter};
      transition: filter 0.4s ease;
    }

    /* Rhythm — scale section padding */
    main section { padding-top: calc(${56 * s}px); padding-bottom: calc(${40 * s}px); }
    article section { padding-top: calc(${56 * s}px); padding-bottom: calc(${40 * s}px); }
    article section:first-child { padding-top: 0; padding-bottom: 0; }
    article .container[style*="paddingTop: 40"] { padding-top: calc(${40 * s}px) !important; }
  `;
}

function TweaksController() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  useEffect(() => {
    let style = document.getElementById('__tweaks-overrides');
    if (!style) {
      style = document.createElement('style');
      style.id = '__tweaks-overrides';
      document.head.appendChild(style);
    }
    style.textContent = buildCSS(t);
  }, [t]);

  return (
    <TweaksPanel>
      <TweakSection label="Vibe" />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {Object.entries(VIBES).map(([key, v]) => (
          <button key={key}
            onClick={() => setTweak('vibe', key)}
            className="twk-row"
            style={{
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '8px 10px',
              border: '1px solid',
              borderColor: t.vibe === key ? 'rgba(41,38,27,0.55)' : 'rgba(41,38,27,0.12)',
              background: t.vibe === key ? 'rgba(41,38,27,0.06)' : 'transparent',
              cursor: 'pointer', textAlign: 'left',
              font: 'inherit', color: 'inherit', fontWeight: t.vibe === key ? 600 : 400
            }}>
            <span style={{
              display: 'inline-flex', borderRadius: 4, overflow: 'hidden',
              boxShadow: '0 0 0 1px rgba(0,0,0,0.08)'
            }}>
              {v.swatches.map((c, i) => (
                <span key={i} style={{ width: 14, height: 22, background: c, display: 'block' }} />
              ))}
            </span>
            <span style={{ flex: 1 }}>{v.label}</span>
            {t.vibe === key && <span style={{ fontSize: 11, opacity: 0.6 }}>●</span>}
          </button>
        ))}
      </div>

      <TweakSection label="Trato de imagen" />
      <TweakRadio
        value={t.imagery}
        options={Object.entries(IMAGERY).map(([key, v]) => ({ value: key, label: v.label }))}
        onChange={(v) => setTweak('imagery', v)}
      />

      <TweakSection label="Ritmo" />
      <TweakRadio
        value={t.rhythm}
        options={Object.entries(RHYTHM).map(([key, v]) => ({ value: key, label: v.label }))}
        onChange={(v) => setTweak('rhythm', v)}
      />
    </TweaksPanel>
  );
}

Object.assign(window, { TweaksController });
