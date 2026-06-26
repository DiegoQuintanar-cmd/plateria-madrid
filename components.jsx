/* ============================================================
   Platería Madrid v2 — Componentes (con nav animada)
   ============================================================ */
const { useState, useEffect, useRef, useMemo, useCallback } = React;

/* ---------- LOGO ---------- */
function Logo({ size = "lg", inverse = false, variant }) {
  // Default: header → script text, footer (inverse) → image medallion
  const v = variant || (inverse ? "image" : "script");
  if (v === "script") return <LogoScript size={size} inverse={inverse} />;
  return <LogoImage size={size} inverse={inverse} />;
}

function LogoScript({ size = "lg", inverse = false }) {
  const scales = { sm: 0.7, md: 0.85, lg: 1, xl: 1.25 };
  const s = scales[size] || 1;
  return (
    <div className={"logo logo-script" + (inverse ? " logo-inverse" : "")}
         style={{ "--logo-scale": s }}>
      <div className="logo-script-row">
        <span className="logo-script-text">Platería&nbsp;<i>Madrid</i></span>
      </div>
      <div className="logo-script-rule" aria-hidden="true">
        <span></span>
        <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1">
          <path d="M2 8 L8 2 L14 8 L8 14 Z" />
          <circle cx="8" cy="8" r="1.4" fill="currentColor" />
        </svg>
        <span></span>
      </div>
      <div className="logo-script-sub">Un arte en plata</div>
    </div>
  );
}

function LogoImage({ size = "lg", inverse = false }) {
  const heights = { sm: 44, md: 60, lg: 76, xl: 110 };
  const h = heights[size] || heights.lg;
  return (
    <div className={"logo" + (inverse ? " logo-inverse" : "")}>
      <img
        src="assets/logo-pm-dark.png"
        alt="Platería Madrid"
        style={{ height: h, width: "auto", display: "block" }}
      />
    </div>
  );
}

function LogoMark({ width = 32, inverse = false }) {
  return (
    <img
      src="assets/logo-pm-dark.png"
      alt="Platería Madrid"
      width={width} height={width}
      style={{ display: "block", objectFit: "contain" }}
    />
  );
}

/* ---------- ICONOS ---------- */
function Icon({ name, size = 18 }) {
  const props = { width: size, height: size, fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round" };
  switch (name) {
    case "search":  return <svg {...props} viewBox="0 0 24 24"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>;
    case "user":    return <svg {...props} viewBox="0 0 24 24"><circle cx="12" cy="8" r="4" /><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6" /></svg>;
    case "bag":     return <svg {...props} viewBox="0 0 24 24"><path d="M5 8h14l-1 12H6L5 8Z" /><path d="M9 8a3 3 0 0 1 6 0" /></svg>;
    case "heart":   return <svg {...props} viewBox="0 0 24 24"><path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.7A4 4 0 0 1 19 10c0 5.5-7 10-7 10Z" /></svg>;
    case "heart-fill": return <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.7A4 4 0 0 1 19 10c0 5.5-7 10-7 10Z" /></svg>;
    case "close":   return <svg {...props} viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18" /></svg>;
    case "minus":   return <svg {...props} viewBox="0 0 24 24"><path d="M5 12h14" /></svg>;
    case "plus":    return <svg {...props} viewBox="0 0 24 24"><path d="M12 5v14M5 12h14" /></svg>;
    case "arrow":   return <svg {...props} viewBox="0 0 24 24"><path d="M5 12h14M14 6l6 6-6 6" /></svg>;
    case "arrow-ne":return <svg {...props} viewBox="0 0 24 24"><path d="M7 17 17 7M9 7h8v8" /></svg>;
    case "check":   return <svg {...props} viewBox="0 0 24 24"><path d="m5 12 5 5 9-11" /></svg>;
    case "ship":    return <svg {...props} viewBox="0 0 24 24"><path d="M3 16V8h11v8M14 11h5l2 3v2h-7" /><circle cx="7" cy="18" r="2" /><circle cx="17" cy="18" r="2" /></svg>;
    case "shield":  return <svg {...props} viewBox="0 0 24 24"><path d="M12 3 4 6v6c0 4.5 3.5 8 8 9 4.5-1 8-4.5 8-9V6l-8-3Z" /><path d="m9 12 2 2 4-5" /></svg>;
    case "return":  return <svg {...props} viewBox="0 0 24 24"><path d="M9 7H5V3" /><path d="M5 7a8 8 0 1 1-2 8" /></svg>;
    case "diamond": return <svg {...props} viewBox="0 0 24 24"><path d="M6 9 12 3l6 6-6 12L6 9Z" /><path d="M6 9h12M12 3v18" /></svg>;
    case "spark":   return <svg {...props} viewBox="0 0 24 24"><path d="M12 3v6M12 15v6M3 12h6M15 12h6M6 6l3 3M15 15l3 3M18 6l-3 3M9 15l-3 3" /></svg>;
    case "ring":    return <svg {...props} viewBox="0 0 24 24"><path d="m9 3 3-1 3 1-1.5 3h-3L9 3Z" /><circle cx="12" cy="15" r="6" /></svg>;
    case "pencil":  return <svg {...props} viewBox="0 0 24 24"><path d="M4 20h4L20 8l-4-4L4 16v4Z" /><path d="m14 6 4 4" /></svg>;
    case "card":    return <svg {...props} viewBox="0 0 24 24"><rect x="3" y="6" width="18" height="13" rx="2" /><path d="M3 10h18" /><path d="M7 15h4" /></svg>;
    case "truck":   return <svg {...props} viewBox="0 0 24 24"><path d="M3 17V6h11v11M14 10h4l3 3.5V17h-7" /><circle cx="7" cy="18" r="2" /><circle cx="17" cy="18" r="2" /></svg>;
    case "menu":    return <svg {...props} viewBox="0 0 24 24"><path d="M3 6h18M3 12h18M3 18h18" /></svg>;
    default: return null;
  }
}

/* ---------- SSO icons ---------- */
function SsoIcon({ provider }) {
  switch (provider) {
    case "apple":
      return (
        <svg className="sso-ic" viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
          <path d="M17.6 13c0-2.4 2-3.5 2.1-3.6-1.1-1.6-2.9-1.9-3.5-1.9-1.5-.2-2.9.9-3.6.9-.8 0-1.9-.9-3.2-.8-1.6 0-3.1 1-4 2.4-1.7 3-.4 7.3 1.2 9.7.8 1.2 1.7 2.5 2.9 2.4 1.2 0 1.6-.7 3.1-.7s1.8.7 3.1.7c1.3 0 2-1.2 2.8-2.4.9-1.4 1.3-2.7 1.3-2.8-.1-.1-2.4-1-2.2-3.9zM15.3 6.4c.6-.8 1.1-1.9 1-3.1-.9 0-2 .6-2.6 1.4-.6.7-1.1 1.8-1 2.9 1 .1 2-.4 2.6-1.2z"/>
        </svg>
      );
    case "google":
      return (
        <svg className="sso-ic" viewBox="0 0 24 24" width="18" height="18">
          <path fill="#4285F4" d="M22 12.2c0-.7-.1-1.4-.2-2H12v3.9h5.6c-.2 1.3-1 2.4-2.1 3.1v2.6h3.4c2-1.8 3.1-4.5 3.1-7.6z"/>
          <path fill="#34A853" d="M12 22c2.8 0 5.2-.9 6.9-2.5l-3.4-2.6c-.9.6-2.1 1-3.5 1-2.7 0-5-1.8-5.8-4.3H2.7v2.7C4.5 19.7 8 22 12 22z"/>
          <path fill="#FBBC05" d="M6.2 13.6c-.2-.6-.3-1.3-.3-2s.1-1.4.3-2V6.9H2.7C2 8.4 1.6 10.1 1.6 12c0 1.9.4 3.6 1.1 5.1l3.5-3.5z"/>
          <path fill="#EA4335" d="M12 5.4c1.5 0 2.9.5 4 1.5l3-3C17.2 2.3 14.8 1.4 12 1.4 8 1.4 4.5 3.7 2.7 7l3.5 2.7c.8-2.5 3.1-4.3 5.8-4.3z"/>
        </svg>
      );
    case "facebook":
      return (
        <svg className="sso-ic" viewBox="0 0 24 24" width="18" height="18">
          <path fill="#1877F2" d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.7l-.4 2.9h-2.3v7A10 10 0 0 0 22 12z"/>
        </svg>
      );
    case "x":
      return (
        <svg className="sso-ic" viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.66l-5.214-6.817-5.967 6.817H1.677l7.73-8.835L1.254 2.25h6.829l4.713 6.231 5.448-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117l11.966 15.644Z"/>
        </svg>
      );
    default: return null;
  }
}

/* ---------- PHOTO SLOT ---------- */
function PhotoSlot({ label = "Foto del producto", id = "", small = false, solid = false }) {
  return (
    <div className={"photo-slot" + (solid ? " solid" : "")}>
      <div className="ps-tag">
        {label}
        {!small && id && <small>{id}</small>}
      </div>
    </div>
  );
}

/* ===========================================================
   CAROUSEL — deslizable con drag, flechas, autoplay
   =========================================================== */
function Carousel({ slides, autoplayMs = 5000 }) {
  const [idx, setIdx] = useState(0);
  const [drag, setDrag] = useState(0);
  const [paused, setPaused] = useState(false);     // pausa al hover
  const [stopped, setStopped] = useState(false);   // pausa permanente al interactuar
  const startX = useRef(null);
  const trackRef = useRef(null);
  const widthRef = useRef(0);
  const [isDragging, setIsDragging] = useState(false);
  const total = slides.length;

  useEffect(() => {
    function update() { widthRef.current = trackRef.current?.offsetWidth || 0; }
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // Autoplay: avanza solo, se detiene permanentemente cuando el usuario interactúa
  useEffect(() => {
    if (stopped || paused || total < 2 || isDragging) return;
    const t = setInterval(() => {
      setIdx(i => (i + 1) % total);
    }, autoplayMs);
    return () => clearInterval(t);
  }, [stopped, paused, isDragging, total, autoplayMs]);

  const go = (i, userInitiated = false) => {
    if (userInitiated) setStopped(true);
    setIdx(((i % total) + total) % total);
  };
  const prev = () => go(idx - 1, true);
  const next = () => go(idx + 1, true);

  function onDown(clientX) {
    startX.current = clientX;
    setIsDragging(true);
  }
  function onMove(clientX) {
    if (startX.current == null) return;
    const dx = clientX - startX.current;
    setDrag(dx);
  }
  function onUp() {
    if (startX.current == null) return;
    const w = widthRef.current || 1;
    const threshold = w * 0.18;
    if (Math.abs(drag) > threshold) {
      setStopped(true); // el usuario arrastró → detener autoplay
      if (drag < 0) setIdx(i => (i + 1) % total);
      else setIdx(i => ((i - 1) % total + total) % total);
    }
    startX.current = null;
    setDrag(0);
    setIsDragging(false);
  }

  const translate = -(idx * 100) + (drag / (widthRef.current || 1)) * 100;

  return (
    <section className="carousel"
             onMouseEnter={() => setPaused(true)}
             onMouseLeave={() => setPaused(false)}>
      <div className="carousel-stage"
           onMouseDown={(e) => onDown(e.clientX)}
           onMouseMove={(e) => isDragging && onMove(e.clientX)}
           onMouseUp={onUp}
           onMouseLeave={onUp}
           onTouchStart={(e) => onDown(e.touches[0].clientX)}
           onTouchMove={(e) => onMove(e.touches[0].clientX)}
           onTouchEnd={onUp}>
        <div
          ref={trackRef}
          className={"carousel-track" + (isDragging ? " dragging" : "")}
          style={{ transform: `translateX(${translate}%)` }}
        >
          {slides.map((s, i) => (
            <div key={i} className={"carousel-slide" + (s.bare ? " bare" : "")}>
              <div className="cs-photo"
                   onClick={s.bare && s.onCta ? (e) => { e.stopPropagation(); setStopped(true); s.onCta(); } : undefined}
                   style={s.bare && s.onCta ? { cursor: "pointer" } : undefined}>
                {s.image ? (
                  <img src={s.image} alt={s.title || "Promoción"} draggable={false} />
                ) : (
                  <PhotoSlot label={s.placeholder || "Próxima imagen"} id={`carrusel-${i+1}`} small solid />
                )}
                {!s.bare && <div className="cs-vignette"></div>}
              </div>
              {s.bare && s.cta && (
                <button className="btn btn-pop cs-cta-bare"
                        onClick={(e) => { e.stopPropagation(); setStopped(true); s.onCta && s.onCta(); }}>
                  {s.cta} →
                </button>
              )}
              {!s.bare && (
                <div className="cs-overlay">
                  <div className="cs-meta">
                    <span className="cs-num">{String(i + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}</span>
                    {s.eyebrow && <span className="cs-eyebrow">{s.eyebrow}</span>}
                  </div>
                  <h3 className="cs-title">{s.title}</h3>
                  {s.body && <p className="cs-body">{s.body}</p>}
                  {s.cta && (
                    <button className="btn btn-pop btn-sm" style={{ marginTop: 18 }}
                            onClick={(e) => { e.stopPropagation(); setStopped(true); s.onCta && s.onCta(); }}>
                      {s.cta} →
                    </button>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        <button className="carousel-arrow prev" onClick={prev} aria-label="Anterior">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 6l-6 6 6 6" />
          </svg>
        </button>
        <button className="carousel-arrow next" onClick={next} aria-label="Siguiente">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 6l6 6-6 6" />
          </svg>
        </button>

        {/* Indicador de autoplay (pequeña barra que se llena) */}
        {!stopped && total > 1 && (
          <div className="carousel-autoplay" aria-hidden="true">
            <div className={"cap-bar" + (paused || isDragging ? " paused" : "")}
                 key={idx}
                 style={{ animationDuration: `${autoplayMs}ms` }}></div>
          </div>
        )}
      </div>

      <div className="carousel-dots">
        {slides.map((_, i) => (
          <button key={i}
                  className={"carousel-dot" + (i === idx ? " active" : "")}
                  onClick={() => go(i, true)}
                  aria-label={`Slide ${i + 1}`}>
            <span></span>
          </button>
        ))}
      </div>
    </section>
  );
}

/* ---------- PRODUCT CARD ---------- */
function ProductCard({ product, onOpen, onAdd, onFav, faved }) {
  const { formatMXN } = window.PLATERIA;
  return (
    <div className="prod-card" data-reveal="up" onClick={() => onOpen(product.id)}>
      <div className="pc-photo">
        <PhotoSlot label={product.name.toUpperCase()} id={product.id} small solid />
        {product.tag && (
          <div className={"pc-badge" + (product.tag === "Nuevo" ? " hot" : "")}>{product.tag}</div>
        )}
        <button
          className={"pc-fav" + (faved ? " active" : "")}
          onClick={(e) => { e.stopPropagation(); onFav(product.id); }}
          aria-label="Favoritos">
          <Icon name={faved ? "heart-fill" : "heart"} size={15} />
        </button>
        <button className="pc-quick" onClick={(e) => { e.stopPropagation(); onAdd(product); }}>
          Añadir al carrito →
        </button>
      </div>
      <div className="pc-body">
        <div className="pc-cat">{product.aud === "unisex" ? "Unisex" : (product.aud === "dama" ? "Dama" : "Caballero")}</div>
        <div className="pc-name">{product.name}</div>
        <div className="pc-price">
          {product.was && <s>{formatMXN(product.was)}</s>}
          {formatMXN(product.price)}
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   NAV ITEM ANIMADO
   ============================================================ */
function NavItem({ group, isOpen, isActive, onOpen, onClose, onPick, findCategory }) {
  return (
    <div style={{ position: "relative", display: "flex" }}
         onMouseEnter={() => group.items.length > 0 && onOpen(group.id)}
         onMouseLeave={onClose}>
      <button
        className={"nav-item" + (isOpen || isActive ? " active" : "")}
        data-key={group.id}
        onClick={() => {
          if (group.id === "novedades") return;
          if (isOpen) onClose(); else onOpen(group.id);
        }}
      >
        <span className="nav-sticker">{group.sticker}</span>
        <span className="nav-item-label">
          <span className="nav-item-track">
            <span className="nav-item-text">{group.label}</span>
            <span className="nav-item-text alt">{group.altLabel || group.label}</span>
          </span>
          {group.items.length > 0 && <span className="nav-chev">▾</span>}
        </span>
      </button>
      {isOpen && group.items.length > 0 && (
        <div className="megamenu">
          <div className="mm-title">{group.note || "Explora la familia"}</div>
          {group.items.map(catId => {
            const c = findCategory(catId);
            return (
              <button key={catId} className="mm-item" onClick={() => onPick(group, catId)}>
                → {c.name}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

/* ===========================================================
   CONFIG WHATSAPP — un solo lugar para el número de la tienda
   =========================================================== */
// Pega aquí el número con lada internacional, p.ej. "525500000000"
// (52 = México). Déjalo vacío para mostrar un aviso amistoso mientras tanto.
window.PLATERIA_WA = {
  phone: "",  // ← número sin "+" ni espacios
  abrir(mensaje) {
    const texto = mensaje || "¡Hola! Me interesa una pieza de Platería Madrid.";
    if (!this.phone) {
      alert("Pronto conectaremos el WhatsApp de la tienda. ¡Gracias por tu interés!");
      return;
    }
    const url = `https://wa.me/${this.phone}?text=${encodeURIComponent(texto)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  }
};

/* ===========================================================
   WHATSAPP WIDGET — botón flotante
   =========================================================== */
function WhatsAppWidget() {
  const [open, setOpen] = useState(false);
  const [pulsing, setPulsing] = useState(true);

  // Parpadea (2 veces) al inicio y luego cada 2 minutos
  useEffect(() => {
    const PULSE_MS = 4600;      // duración de 2 parpadeos (2 × 2.2s + margen)
    const INTERVAL_MS = 120000; // 2 minutos
    const timers = [];

    // detener el primer ciclo tras 2 parpadeos
    timers.push(setTimeout(() => setPulsing(false), PULSE_MS));

    // reactivar cada 2 minutos
    const interval = setInterval(() => {
      setPulsing(true);
      const t = setTimeout(() => setPulsing(false), PULSE_MS);
      timers.push(t);
    }, INTERVAL_MS);

    return () => { timers.forEach(clearTimeout); clearInterval(interval); };
  }, []);

  // Número aún por definir. Cuando lo tengas, pon aquí los dígitos con
  // lada internacional, p.ej. "525500000000" (52 = México). Déjalo vacío
  // para que el widget muestre un aviso amistoso mientras tanto.
  const PHONE = window.PLATERIA_WA?.phone || ""; // configurado en PLATERIA_WA
  const MENSAJE = "¡Hola! Me interesa una pieza de Platería Madrid.";

  function abrirWhatsApp() {
    window.PLATERIA_WA.abrir(MENSAJE);
  }

  return (
    <div className="wa-widget">
      {open && (
        <div className="wa-card">
          <button className="wa-card-close" onClick={() => setOpen(false)} aria-label="Cerrar">
            <Icon name="close" size={14} />
          </button>
          <div className="wa-card-head">
            <div className="wa-avatar">
              <WhatsAppGlyph size={22} color="#fff" />
            </div>
            <div>
              <div className="wa-card-name">Platería Madrid</div>
              <div className="wa-card-status"><span className="wa-dot"></span> En línea · responde rápido</div>
            </div>
          </div>
          <div className="wa-card-body">
            <div className="wa-bubble">
              ¡Hola! 👋 ¿Buscas una pieza en especial, tallas o un grabado? Escríbenos por WhatsApp y te atendemos al momento.
            </div>
          </div>
          <button className="wa-card-cta" onClick={abrirWhatsApp}>
            <WhatsAppGlyph size={18} color="#fff" />
            Iniciar conversación
          </button>
        </div>
      )}
      <button
        className={"wa-fab" + (open ? " active" : "")}
        onClick={() => setOpen(o => !o)}
        aria-label="Abrir chat de WhatsApp">
        {open ? <Icon name="close" size={24} /> : <WhatsAppGlyph size={30} color="#fff" />}
        {!open && pulsing && <span className="wa-pulse"></span>}
      </button>
    </div>
  );
}

function WhatsAppGlyph({ size = 28, color = "#fff" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill={color} aria-hidden="true">
      <path d="M16 3C8.8 3 3 8.8 3 16c0 2.4.6 4.6 1.8 6.6L3 29l6.6-1.7c1.9 1 4.1 1.6 6.4 1.6 7.2 0 13-5.8 13-13S23.2 3 16 3Zm0 23.6c-2.1 0-4-.6-5.7-1.6l-.4-.2-3.9 1 1-3.8-.3-.4c-1.1-1.7-1.7-3.7-1.7-5.8C5 10 9.9 5.1 16 5.1S27 10 27 16 22.1 26.6 16 26.6Zm6-7.9c-.3-.2-1.9-1-2.2-1-.3-.1-.5-.2-.8.2-.2.3-.8 1-1 1.2-.2.2-.4.2-.7.1-.3-.2-1.4-.5-2.6-1.6-1-.9-1.6-1.9-1.8-2.3-.2-.3 0-.5.1-.7l.5-.6c.2-.2.2-.3.3-.6.1-.2 0-.4 0-.6 0-.2-.8-1.9-1-2.6-.3-.7-.6-.6-.8-.6h-.7c-.2 0-.6.1-.9.4-.3.3-1.2 1.2-1.2 2.9 0 1.7 1.2 3.3 1.4 3.6.2.2 2.5 3.8 6 5.3.8.4 1.5.6 2 .7.8.3 1.6.2 2.2.1.7-.1 1.9-.8 2.2-1.5.3-.8.3-1.4.2-1.5-.1-.2-.3-.2-.6-.4Z"/>
    </svg>
  );
}
function Header({ route, navigate, cartCount, openCart, openLogin, isAuthed, userName }) {
  const { NAV_GROUPS, findCategory } = window.PLATERIA;
  const [openGroup, setOpenGroup] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSub, setMobileSub] = useState(null);   // grupo expandido en el drawer
  const [searchOpen, setSearchOpen] = useState(false);
  const [dark, setDark] = useState(() => {
    try { return document.documentElement.getAttribute("data-theme") === "dark"; }
    catch (e) { return false; }
  });
  const navRef = useRef(null);

  // Modo nocturno — aplica el atributo en <html> y lo recuerda
  useEffect(() => {
    const root = document.documentElement;
    if (dark) root.setAttribute("data-theme", "dark");
    else root.removeAttribute("data-theme");
    try { localStorage.setItem("pm-theme", dark ? "dark" : "light"); } catch (e) {}
  }, [dark]);

  // Inyectar etiquetas alternas + stickers para la animación
  const navGroups = useMemo(() => NAV_GROUPS.map(g => ({
    ...g,
    altLabel: g.id === "dama" ? "Para Ella" :
              g.id === "caballero" ? "Para Él" :
              g.id === "matrimonio" ? "Para Los dos" :
              g.id === "religioso" ? "Devoción" :
              g.id === "novedades" ? "2026" : g.label,
    sticker: g.id === "dama" ? "♀ ella" :
             g.id === "caballero" ? "♂ él" :
             g.id === "matrimonio" ? "∞ ambos" :
             g.id === "religioso" ? "✝ fe" :
             g.id === "novedades" ? "NEW" : "",
  })), []);

  useEffect(() => {
    function onClick(e) {
      if (navRef.current && !navRef.current.contains(e.target)) setOpenGroup(null);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  function pick(group, catId) {
    setOpenGroup(null);
    setMobileOpen(false);
    setMobileSub(null);
    navigate({ view: "category", cat: catId, aud: ["dama", "caballero"].includes(group.id) ? group.id : null });
  }

  // Bloquea el scroll del fondo cuando el menú móvil está abierto
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  // Marquee items
  const marqueeItems = [
    "Envío gratis sobre $1,500",
    "Grabado sin costo en cualquier pieza",
    "12 MSI con Mercado Pago",
    "Hecho a mano en Mineral del Monte desde 2002",
    "Edición 2026 disponible ahora",
    "Plata .925 certificada",
  ];

  return (
    <React.Fragment>
      <div className="topstack" ref={(el) => { window.__topstack = el; }}>
        <header className="header">
          <div className="header-inner">
            <div className="header-left">
              {/* Hamburguesa — solo móvil */}
              <button className="icon-btn hamburger" onClick={() => setMobileOpen(true)} aria-label="Menú">
                <Icon name="menu" size={22} />
              </button>
              {/* Buscador — solo escritorio */}
              <div className="search-pill">
                <Icon name="search" size={14} />
                <input placeholder="Buscar anillos, cadenas, arras…" />
              </div>
            </div>
            <div className="header-center">
              <button className="logo" onClick={() => navigate({ view: "home" })} aria-label="Inicio"
                      style={{ background: "none", border: 0, cursor: "pointer", padding: 0 }}>
                <Logo />
              </button>
            </div>
            <div className="header-right">
              {/* Lupa — solo móvil */}
              <button className="icon-btn search-toggle" onClick={() => setSearchOpen(s => !s)} aria-label="Buscar">
                <Icon name="search" size={20} />
              </button>
              <button className={"icon-btn theme-toggle" + (dark ? " on" : "")} onClick={() => setDark(d => !d)}
                      aria-label={dark ? "Activar modo claro" : "Activar modo nocturno"}
                      title={dark ? "Modo claro" : "Modo nocturno"}>
                {dark ? (
                  <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <circle cx="12" cy="12" r="4.2" />
                    <path d="M12 2.5v2.4M12 19.1v2.4M4.3 4.3l1.7 1.7M18 18l1.7 1.7M2.5 12h2.4M19.1 12h2.4M4.3 19.7l1.7-1.7M18 6l1.7-1.7" />
                  </svg>
                ) : (
                  <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M20.5 14.2A8.3 8.3 0 0 1 9.8 3.5a8.3 8.3 0 1 0 10.7 10.7z" />
                  </svg>
                )}
              </button>
              <button className="icon-btn account-btn" onClick={openLogin}>
                <Icon name="user" />
                <span className="label-hide">{isAuthed ? userName : "Cuenta"}</span>
              </button>
              <button className="icon-btn fav-btn">
                <Icon name="heart" />
              </button>
              <button className="icon-btn" onClick={openCart} style={{ background: "var(--ink)", color: "var(--bg)" }}>
                <Icon name="bag" />
                <span className="label-hide">Bolsa</span>
                {cartCount > 0 && <span className="badge">{cartCount}</span>}
              </button>
            </div>
          </div>
          {/* Barra de búsqueda expandible (móvil) */}
          {searchOpen && (
            <div className="mobile-search">
              <Icon name="search" size={16} />
              <input autoFocus placeholder="Buscar anillos, cadenas, arras…" />
              <button onClick={() => setSearchOpen(false)} aria-label="Cerrar"><Icon name="close" size={18} /></button>
            </div>
          )}
        </header>
        <nav className="navbar" ref={navRef}>
          <div className="navbar-inner">
            {navGroups.map(group => {
              const isOpen = openGroup === group.id;
              const isActive = route.view === "category" && group.items.includes(route.cat) && (
                route.aud === group.id ||
                (group.id === "matrimonio" && ["argollas","lazos","arras"].includes(route.cat)) ||
                (group.id === "religioso" && ["rosarios","religiosos","relicarios"].includes(route.cat))
              );
              return (
                <NavItem
                  key={group.id}
                  group={group}
                  isOpen={isOpen}
                  isActive={isActive}
                  onOpen={(id) => setOpenGroup(id)}
                  onClose={() => setOpenGroup(null)}
                  onPick={pick}
                  findCategory={findCategory}
                />
              );
            })}
          </div>
        </nav>
      </div>

      {/* ===== MENÚ MÓVIL (drawer) ===== */}
      {mobileOpen && (
        <div className="msheet-scrim" onClick={() => { setMobileOpen(false); setMobileSub(null); }}>
          <aside className="msheet" onClick={(e) => e.stopPropagation()}>
            <div className="msheet-head">
              <span className="msheet-brand">Platería <em>Madrid</em></span>
              <button className="msheet-close" onClick={() => { setMobileOpen(false); setMobileSub(null); }} aria-label="Cerrar">
                <Icon name="close" size={20} />
              </button>
            </div>
            <nav className="msheet-nav">
              {navGroups.map(group => {
                const expandable = group.items.length > 0;
                const expanded = mobileSub === group.id;
                return (
                  <div key={group.id} className="msheet-group">
                    <button
                      className={"msheet-link" + (expanded ? " open" : "")}
                      onClick={() => {
                        if (group.id === "novedades") { navigate({ view: "novedades" }); setMobileOpen(false); return; }
                        if (expandable) setMobileSub(expanded ? null : group.id);
                      }}>
                      <span>{group.label}</span>
                      {expandable && <span className="msheet-chev">{expanded ? "−" : "+"}</span>}
                    </button>
                    {expandable && expanded && (
                      <div className="msheet-sub">
                        {group.items.map(catId => {
                          const c = findCategory(catId);
                          return (
                            <button key={catId} className="msheet-subitem" onClick={() => pick(group, catId)}>
                              {c.name}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>
            <div className="msheet-foot">
              <button className="btn btn-line btn-block btn-sm" onClick={() => { setMobileOpen(false); openLogin(); }}>
                {isAuthed ? `Hola, ${userName}` : "Iniciar sesión"}
              </button>
              <button className="btn btn-block btn-sm" style={{ marginTop: 8 }} onClick={() => { setMobileOpen(false); navigate({ view: "historia" }); }}>
                Nuestra historia
              </button>
            </div>
          </aside>
        </div>
      )}
    </React.Fragment>
  );
}

/* ---------- FOOTER ---------- */
function Footer({ navigate }) {
  const go = (r) => (e) => { e.preventDefault(); navigate && navigate(r); };
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-grid" data-reveal-group>
          <div data-reveal="up">
            <div className="brand-lock"><Logo size="xl" inverse /></div>
            <p style={{ maxWidth: 360, lineHeight: 1.6 }}>
              Joyería en plata fina elaborada por orfebres mexicanos.
              Diseñamos piezas para acompañarte cada día y los días que
              recordarás siempre.
            </p>
            <form className="news" onSubmit={(e) => e.preventDefault()}>
              <input placeholder="Tu correo" />
              <button type="submit">Únete</button>
            </form>
          </div>
          <div data-reveal="up">
            <h5>Tienda</h5>
            <a onClick={go({ view: "coleccion" })} style={{ cursor: "pointer" }}>Joyería</a><a onClick={go({ view: "category", cat: "argollas" })} style={{ cursor: "pointer" }}>Para matrimonio</a><a onClick={go({ view: "category", cat: "religiosos" })} style={{ cursor: "pointer" }}>Religioso</a><a onClick={go({ view: "category", cat: "relojes" })} style={{ cursor: "pointer" }}>Relojes</a><a onClick={go({ view: "novedades" })} style={{ cursor: "pointer" }}>Novedades</a>
          </div>
          <div data-reveal="up">
            <h5>Servicio</h5>
            <a onClick={go({ view: "soporte" })} style={{ cursor: "pointer" }}>Atención al cliente</a><a onClick={go({ view: "tallas" })} style={{ cursor: "pointer" }}>Guía de tallas</a><a onClick={go({ view: "mayoreo" })} style={{ cursor: "pointer" }}>Mayoreo</a><a onClick={go({ view: "devoluciones" })} style={{ cursor: "pointer" }}>Cambios y garantía</a><a onClick={go({ view: "envios" })} style={{ cursor: "pointer" }}>Envíos</a>
          </div>
          <div data-reveal="up">
            <h5>Sobre</h5>
            <a onClick={go({ view: "historia" })} style={{ cursor: "pointer" }}>Nuestra historia</a><a onClick={go({ view: "cuidado" })} style={{ cursor: "pointer" }}>Cuidado de tu plata</a><a onClick={go({ view: "soporte" })} style={{ cursor: "pointer" }}>Contáctanos</a>
          </div>
          <div data-reveal="up">
            <h5>Contacto</h5>
            <p>Av. Hidalgo 74, Ahuizote, Centro, 42135 Mineral del Monte, Hidalgo, México</p>
            <a>+52 55 0000 0000</a>
            <a>hola@plateriamadrid.mx</a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Platería Madrid · Hecho a mano en México</span>
          <span>Pago seguro · Mercado Pago</span>
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, {
  Logo, LogoImage, LogoScript, LogoMark, Icon, SsoIcon, PhotoSlot,
  Carousel, ProductCard, Header, Footer, NavItem,
  WhatsAppWidget, WhatsAppGlyph,
});
