// ============================================================
// Iconografía — SVGs simples stroke-only
// ============================================================

const Icon = ({ name, size = 20, stroke = 1.5, style = {}, ...rest }) => {
  const paths = {
    search: <><circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" /></>,
    cart: <><path d="M6 6h15l-1.5 9h-12z" /><circle cx="9" cy="20" r="1.5" /><circle cx="18" cy="20" r="1.5" /><path d="M6 6 4.5 3H2" /></>,
    user: <><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8" /></>,
    menu: <><path d="M4 7h16" /><path d="M4 12h16" /><path d="M4 17h16" /></>,
    close: <><path d="M6 6l12 12" /><path d="M18 6l-6 12" style={{display:'none'}}/><path d="M6 18 18 6" /></>,
    arrow_right: <><path d="M5 12h14" /><path d="m13 5 7 7-7 7" /></>,
    arrow_left: <><path d="M19 12H5" /><path d="m11 5-7 7 7 7" /></>,
    arrow_down: <><path d="M12 5v14" /><path d="m5 13 7 7 7-7" /></>,
    arrow_ul: <><path d="M17 17 7 7" /><path d="M7 17V7h10" /></>,
    check: <><path d="m5 12 5 5 10-11" /></>,
    plus: <><path d="M12 5v14" /><path d="M5 12h14" /></>,
    minus: <><path d="M5 12h14" /></>,
    star: <><path d="m12 3 2.5 6 6.5.5-5 4.5 1.5 6.5-5.5-3.5-5.5 3.5 1.5-6.5-5-4.5 6.5-.5z"/></>,
    truck: <><rect x="2" y="7" width="13" height="9" /><path d="M15 10h4l3 3v3h-7" /><circle cx="6" cy="18" r="2" /><circle cx="18" cy="18" r="2" /></>,
    shield: <><path d="M12 3 4 6v6c0 4.5 3.5 8.5 8 9 4.5-.5 8-4.5 8-9V6z" /><path d="m9 12 2 2 4-5" /></>,
    heart: <><path d="M20.5 7.5a5 5 0 0 0-8.5-3 5 5 0 0 0-8.5 3c0 6 8.5 11 8.5 11s8.5-5 8.5-11z" /></>,
    filter: <><path d="M4 5h16" /><path d="M7 12h10" /><path d="M10 19h4" /></>,
    chevron_down: <><path d="m6 9 6 6 6-6" /></>,
    chevron_right: <><path d="m9 6 6 6-6 6" /></>,
    chevron_left: <><path d="m15 6-6 6 6 6" /></>,
    whatsapp: <><path d="M20.5 12a8.5 8.5 0 1 1-4.3-7.4L20 3l-1.6 3.6A8.5 8.5 0 0 1 20.5 12z"/><path d="M8 10c0 4 2.5 6.5 6.5 6.5l1.5-2-2.5-1-1 1c-1.5-.5-2.5-1.5-3-3l1-1-1-2.5-2 1.5z" fill="currentColor" stroke="none"/></>,
    instagram: <><rect x="3" y="3" width="18" height="18" rx="4" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/></>,
    spark: <><path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6"/></>,
    bolt: <><path d="M13 3 4 14h7l-1 7 9-11h-7z"/></>,
    bag: <><path d="M6 8h12l-1 12H7z" /><path d="M9 8V5a3 3 0 0 1 6 0v3" /></>,
    pin: <><path d="M12 22s7-7 7-12a7 7 0 0 0-14 0c0 5 7 12 7 12z" /><circle cx="12" cy="10" r="2.5" /></>,
    mail: <><rect x="3" y="5" width="18" height="14" /><path d="m3 6 9 7 9-7" /></>,
    eye: <><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3" /></>,
  };

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size} height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={style}
      {...rest}
    >
      {paths[name]}
    </svg>
  );
};

// Wordmark / logo de la marca
const LogoMark = ({ size = 28, color = 'var(--accent)' }) => (
  <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Botín estilizado minimal */}
    <path d="M4 26 C 4 22, 8 18, 14 18 L 28 18 C 34 18, 36 22, 36 26 L 36 30 L 4 30 Z"
          stroke={color} strokeWidth="1.5" fill="none"/>
    <path d="M14 18 L 14 12 L 26 15 L 28 18"
          stroke={color} strokeWidth="1.5" fill="none" strokeLinejoin="miter"/>
    <path d="M18 14 L 20 14 M 22 15 L 24 15.5"
          stroke={color} strokeWidth="1" fill="none"/>
  </svg>
);

Object.assign(window, { Icon, LogoMark });
