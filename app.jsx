/* ============================================================
   Platería Madrid — App principal
   ============================================================ */
const { useState: aUseState, useEffect: aUseEffect, useMemo: aUseMemo } = React;

/* ---------- CART DRAWER ---------- */
function flyToBag(originEl) {
  const bag = document.querySelector('.header-right .icon-btn:last-of-type');
  if (!bag || !originEl) return;
  const start = originEl.getBoundingClientRect();
  const end = bag.getBoundingClientRect();
  const startX = start.left + start.width / 2;
  const startY = start.top + start.height / 2;
  const endX = end.left + end.width / 2;
  const endY = end.top + end.height / 2;

  // Crear pájaro / bolsa volando
  const flyer = document.createElement('div');
  flyer.className = 'fly-to-bag';
  flyer.innerHTML = `
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#fff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
      <path d="M5 8h14l-1 12H6L5 8Z" fill="#2440e6"/>
      <path d="M9 8a3 3 0 0 1 6 0"/>
    </svg>
  `;
  document.body.appendChild(flyer);
  flyer.style.left = startX + 'px';
  flyer.style.top = startY + 'px';

  // Trail de chispas
  const sparks = [];
  for (let i = 0; i < 5; i++) {
    const s = document.createElement('div');
    s.className = 'fly-spark';
    s.style.left = startX + 'px';
    s.style.top = startY + 'px';
    document.body.appendChild(s);
    sparks.push(s);
  }

  const dx = endX - startX;
  const dy = endY - startY;
  const midX = dx * 0.5 + (Math.random() * 80 - 40);
  const midY = dy * 0.5 - Math.abs(dx) * 0.35 - 60;

  const anim = flyer.animate([
    { transform: 'translate(-50%, -50%) scale(0.4) rotate(-20deg)', offset: 0, opacity: 0 },
    { transform: 'translate(-50%, -50%) scale(1.3) rotate(-8deg)', offset: 0.15, opacity: 1 },
    { transform: `translate(calc(-50% + ${midX}px), calc(-50% + ${midY}px)) scale(1.1) rotate(180deg)`, offset: 0.55, opacity: 1 },
    { transform: `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px)) scale(0.4) rotate(360deg)`, offset: 1, opacity: 0.2 },
  ], {
    duration: 850, easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
  });

  sparks.forEach((s, i) => {
    s.animate([
      { transform: 'translate(-50%, -50%) scale(0)', offset: 0, opacity: 0 },
      { transform: `translate(calc(-50% + ${(Math.random()*60-30)}px), calc(-50% + ${(Math.random()*60-30)}px)) scale(1.2)`, offset: 0.4, opacity: 1 },
      { transform: `translate(calc(-50% + ${dx + (Math.random()*40-20)}px), calc(-50% + ${dy + (Math.random()*40-20)}px)) scale(0)`, offset: 1, opacity: 0 },
    ], {
      duration: 800 + i * 40, delay: i * 50, easing: 'cubic-bezier(0.4, 0, 0.2, 1)', fill: 'forwards',
    });
  });

  anim.onfinish = () => {
    flyer.remove();
    sparks.forEach(s => s.remove());
    // Hacer rebotar la bolsa
    bag.classList.remove('bag-bump');
    void bag.offsetWidth; // reflow
    bag.classList.add('bag-bump');
    setTimeout(() => bag.classList.remove('bag-bump'), 700);
  };
}

function CartDrawer({ open, onClose, cart, updateQty, removeItem, navigateToCheckout, formatMXN }) {
  if (!open) return null;
  const subtotal = cart.reduce((s, i) => s + i.product.price * i.qty, 0);
  const count = cart.reduce((s, i) => s + i.qty, 0);

  function keepBrowsing(e) {
    flyToBag(e.currentTarget);
    setTimeout(onClose, 280);
  }

  return (
    <React.Fragment>
      <div className="drawer-scrim" onClick={onClose}></div>
      <aside className="drawer">
        <div className="drawer-head">
          <div>
            <h3>Tu bolsa</h3>
            <div className="count">{count} {count === 1 ? "pieza" : "piezas"}</div>
          </div>
          <button className="drawer-close" onClick={onClose} aria-label="Cerrar"><Icon name="close" /></button>
        </div>
        {cart.length === 0 ? (
          <div className="empty-cart">
            <div className="ec-glyph">∅</div>
            <h4 style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 500, color: "var(--ink)", margin: "0 0 8px" }}>
              Tu bolsa está vacía
            </h4>
            <p style={{ maxWidth: 240 }}>Empieza por las piezas más queridas de la casa o explora la nueva colección.</p>
            <button className="btn btn-line btn-sm" style={{ marginTop: 18 }} onClick={keepBrowsing}>Seguir mirando →</button>
          </div>
        ) : (
          <React.Fragment>
            <div className="cart-list">
              {cart.map((item, idx) => (
                <div key={idx} className="cart-row">
                  <div className="cr-photo"><PhotoSlot small solid label="" /></div>
                  <div>
                    <div className="cr-name">{item.product.name}</div>
                    <div className="cr-meta">
                      {item.size && `Talla ${item.size}`}
                      {item.size && item.engraving && " · "}
                      {item.engraving && `Grabado: "${item.engraving}"`}
                      {!item.size && !item.engraving && (item.product.aud === "dama" ? "Dama" : item.product.aud === "caballero" ? "Caballero" : "Unisex")}
                    </div>
                    <div className="cr-qty">
                      <button onClick={() => updateQty(idx, item.qty - 1)} aria-label="Menos">−</button>
                      <span>{item.qty}</span>
                      <button onClick={() => updateQty(idx, item.qty + 1)} aria-label="Más">+</button>
                    </div>
                  </div>
                  <div>
                    <div className="cr-price">{formatMXN(item.product.price * item.qty)}</div>
                    <button className="cr-remove" onClick={() => removeItem(idx)}>Quitar</button>
                  </div>
                </div>
              ))}
            </div>
            <div className="drawer-foot">
              <div className="cart-line"><span>Subtotal</span><span>{formatMXN(subtotal)}</span></div>
              <div className="cart-line"><span>Envío</span><span>{subtotal > 1500 ? "Gratis" : formatMXN(150)}</span></div>
              <div className="cart-line total"><span>Total</span><span className="v">{formatMXN(subtotal + (subtotal > 1500 ? 0 : 150))}</span></div>
              <p style={{ fontSize: 11, color: "var(--ink-mute)", margin: "10px 0 16px", letterSpacing: "0.06em" }}>
                <strong style={{ color: "var(--ink)" }}>12 MSI</strong> disponibles con Mercado Pago
              </p>
              <button className="btn btn-block" onClick={navigateToCheckout}>Ir al pago</button>
              <button className="btn btn-line btn-block btn-sm" style={{ marginTop: 8 }} onClick={keepBrowsing}>Seguir mirando →</button>
            </div>
          </React.Fragment>
        )}
      </aside>
    </React.Fragment>
  );
}

/* ---------- LOGIN MODAL ---------- */
function LoginModal({ open, onClose, onLogin }) {
  const [mode, setMode] = aUseState("login");
  const [email, setEmail] = aUseState("");
  const [name, setName] = aUseState("");
  if (!open) return null;

  function withProvider(p) {
    onLogin({
      name: p === "apple" ? "María" : p === "google" ? "Carlos" : p === "facebook" ? "Sofía" : "Diego",
      provider: p,
    });
  }
  function withEmail(e) {
    e.preventDefault();
    onLogin({ name: name || (email.split("@")[0] || "Tú"), provider: "email" });
  }

  return (
    <div className="modal-scrim" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}><Icon name="close" /></button>
        <div className="modal-head">
          <h2>{mode === "login" ? "Bienvenido de vuelta" : "Crea tu cuenta"}</h2>
          <p>{mode === "login" ? "Inicia sesión para ver tus pedidos y favoritos" : "Únete a la casa y obtén grabado gratuito"}</p>
        </div>
        <div className="modal-body">
          <div className="sso-list">
            <button className="sso-btn" onClick={() => withProvider("apple")}>
              <SsoIcon provider="apple" />
              Continuar con Apple
            </button>
            <button className="sso-btn" onClick={() => withProvider("google")}>
              <SsoIcon provider="google" />
              Continuar con Google
            </button>
            <button className="sso-btn" onClick={() => withProvider("facebook")}>
              <SsoIcon provider="facebook" />
              Continuar con Facebook
            </button>
            <button className="sso-btn" onClick={() => withProvider("x")}>
              <SsoIcon provider="x" />
              Continuar con X
            </button>
          </div>
          <div className="divider">o con correo</div>
          <form onSubmit={withEmail}>
            {mode === "register" && (
              <div className="field">
                <label>Nombre</label>
                <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Tu nombre" />
              </div>
            )}
            <div className="field">
              <label>Correo electrónico</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="tu@correo.com" required />
            </div>
            <div className="field">
              <label>Contraseña</label>
              <input type="password" placeholder="••••••••" required />
            </div>
            {mode === "login" && (
              <div style={{ textAlign: "right", marginTop: -8, marginBottom: 14 }}>
                <a style={{ fontSize: 12, color: "var(--ink-soft)", textDecoration: "underline", textUnderlineOffset: 3 }}>¿Olvidaste tu contraseña?</a>
              </div>
            )}
            <button className="btn btn-block" type="submit">
              {mode === "login" ? "Iniciar sesión" : "Crear cuenta"}
            </button>
          </form>
        </div>
        <div className="modal-foot">
          {mode === "login" ? (
            <p>¿Nueva en la casa? <a onClick={() => setMode("register")}>Crea tu cuenta</a></p>
          ) : (
            <p>¿Ya tienes cuenta? <a onClick={() => setMode("login")}>Inicia sesión</a></p>
          )}
        </div>
      </div>
    </div>
  );
}

/* ---------- APP ---------- */
function App() {
  const { formatMXN } = window.PLATERIA;
  const [route, setRoute] = aUseState({ view: "home" });
  const [cart, setCart] = aUseState([]);
  const [favorites, setFavorites] = aUseState(new Set());
  const [cartOpen, setCartOpen] = aUseState(false);
  const [loginOpen, setLoginOpen] = aUseState(false);
  const [user, setUser] = aUseState(null);
  const [orderId, setOrderId] = aUseState(null);

  // Persistir bolsa
  aUseEffect(() => {
    try {
      const raw = localStorage.getItem("plateria-cart");
      if (raw) {
        const arr = JSON.parse(raw);
        const restored = arr.map(item => ({ ...item, product: window.PLATERIA.findProduct(item.productId) })).filter(i => i.product);
        setCart(restored);
      }
      const u = localStorage.getItem("plateria-user");
      if (u) setUser(JSON.parse(u));
      const fav = localStorage.getItem("plateria-fav");
      if (fav) setFavorites(new Set(JSON.parse(fav)));
    } catch (e) {}
  }, []);
  aUseEffect(() => {
    try {
      localStorage.setItem("plateria-cart",
        JSON.stringify(cart.map(({ product, ...rest }) => ({ productId: product.id, ...rest }))));
    } catch (e) {}
  }, [cart]);
  aUseEffect(() => {
    try { user ? localStorage.setItem("plateria-user", JSON.stringify(user)) : localStorage.removeItem("plateria-user"); } catch (e) {}
  }, [user]);
  aUseEffect(() => {
    try { localStorage.setItem("plateria-fav", JSON.stringify([...favorites])); } catch (e) {}
  }, [favorites]);

  function navigate(r) {
    setRoute(r);
    setCartOpen(false);
    if (r && r.scrollTo) {
      // Esperar a que la nueva vista se monte, luego desplazar a la sección
      let tries = 0;
      const seek = () => {
        const el = document.querySelector(r.scrollTo);
        if (el) {
          const top = el.getBoundingClientRect().top + window.scrollY - 80;
          window.scrollTo({ top, behavior: "smooth" });
        } else if (tries++ < 30) {
          requestAnimationFrame(seek);
        }
      };
      requestAnimationFrame(seek);
    } else {
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  }

  // ===== Reveal on scroll: IntersectionObserver + scroll fallback =====
  aUseEffect(() => {
    window.__revealMounted = true;
    window.__revealScanCount = 0;
    function revealVisible() {
      const vh = window.innerHeight || document.documentElement.clientHeight;
      const trigger = vh * 0.92;
      document.querySelectorAll("[data-reveal]:not(.in-view)").forEach(el => {
        const r = el.getBoundingClientRect();
        if (r.top < trigger && r.bottom > 0) {
          el.classList.add("in-view");
        }
      });
    }

    // IntersectionObserver primario (cuando funcione, lo más eficiente)
    let io;
    if (typeof IntersectionObserver !== "undefined") {
      io = new IntersectionObserver((entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add("in-view");
            io.unobserve(e.target);
          }
        });
      }, { rootMargin: "0px 0px -8% 0px", threshold: 0.05 });
    }

    let pending;
    function scan() {
      window.__revealScanCount = (window.__revealScanCount || 0) + 1;
      if (io) {
        document.querySelectorAll("[data-reveal]:not(.in-view)").forEach(el => io.observe(el));
      }
      revealVisible();
    }
    function scheduleScan() {
      if (pending) return;
      pending = setTimeout(() => {
        pending = null;
        scan();
      }, 16);
    }

    // Inicial + en cada scroll (esto funciona en cualquier entorno)
    scan(); // sin esperar a rAF
    window.addEventListener("scroll", scheduleScan, { passive: true });
    window.addEventListener("resize", scheduleScan, { passive: true });

    return () => {
      if (pending) clearTimeout(pending);
      window.removeEventListener("scroll", scheduleScan);
      window.removeEventListener("resize", scheduleScan);
      if (io) io.disconnect();
    };
  }, [route.view]);

  // ===== Header oculto al bajar / visible al subir =====
  aUseEffect(() => {
    let lastY = window.scrollY;
    function onScroll() {
      const el = window.__topstack;
      const y = window.scrollY;
      if (el) {
        const goingDown = y > lastY;
        if (y < 160) {
          el.classList.remove("ts-hidden");
        } else if (goingDown && y - lastY > 4) {
          el.classList.add("ts-hidden");
        } else if (!goingDown && lastY - y > 4) {
          el.classList.remove("ts-hidden");
        }
      }
      lastY = y;
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function addToCart(product, opts = {}) {
    const { qty = 1, size = null, engraving = "" } = opts;
    setCart(prev => {
      const matchIdx = prev.findIndex(i => i.product.id === product.id && i.size === size && i.engraving === engraving);
      if (matchIdx >= 0) {
        const next = [...prev];
        next[matchIdx] = { ...next[matchIdx], qty: next[matchIdx].qty + qty };
        return next;
      }
      return [...prev, { product, qty, size, engraving }];
    });
    setCartOpen(true);
  }
  function updateQty(idx, qty) {
    if (qty <= 0) { removeItem(idx); return; }
    setCart(prev => prev.map((it, i) => i === idx ? { ...it, qty } : it));
  }
  function removeItem(idx) {
    setCart(prev => prev.filter((_, i) => i !== idx));
  }
  function toggleFav(id) {
    setFavorites(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }
  function placeOrder() {
    const id = "PM-" + Math.random().toString(36).slice(2, 8).toUpperCase();
    setOrderId(id);
    setCart([]);
    navigate({ view: "confirmation" });
  }

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  let page = null;
  if (route.view === "home") page = <HomePage navigate={navigate} addToCart={addToCart} favorites={favorites} toggleFav={toggleFav} />;
  else if (route.view === "category") page = <CategoryPage route={route} navigate={navigate} addToCart={addToCart} favorites={favorites} toggleFav={toggleFav} />;
  else if (route.view === "product") page = <ProductPage route={route} navigate={navigate} addToCart={addToCart} favorites={favorites} toggleFav={toggleFav} />;
  else if (route.view === "checkout") page = <CheckoutPage cart={cart} navigate={navigate} formatMXN={formatMXN} onPlaceOrder={placeOrder} />;
  else if (route.view === "confirmation") page = <ConfirmationPage orderId={orderId} navigate={navigate} formatMXN={formatMXN} />;
  else if (route.view === "novedades") page = <HomePage navigate={navigate} addToCart={addToCart} favorites={favorites} toggleFav={toggleFav} />;
  else if (route.view === "historia") page = <HistoriaPage navigate={navigate} />;
  else if (route.view === "soporte") page = <SoportePage navigate={navigate} />;
  else if (route.view === "tallas") page = <TallasPage navigate={navigate} />;
  else if (route.view === "mayoreo") page = <MayoreoPage navigate={navigate} />;
  else if (route.view === "devoluciones") page = <DevolucionesPage navigate={navigate} />;
  else if (route.view === "envios") page = <EnviosPage navigate={navigate} />;
  else if (route.view === "coleccion") page = <ColeccionPage navigate={navigate} />;
  else if (route.view === "cuidado") page = <CuidadoPage navigate={navigate} />;

  return (
    <div className="app-shell">
      <Header
        route={route}
        navigate={navigate}
        cartCount={cartCount}
        openCart={() => setCartOpen(true)}
        openLogin={() => user ? setLoginOpen(false) || setUser(null) : setLoginOpen(true)}
        isAuthed={!!user}
        userName={user?.name || ""}
      />
      <main style={{ flex: 1 }}>{page}</main>
      <Footer navigate={navigate} />

      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        cart={cart}
        updateQty={updateQty}
        removeItem={removeItem}
        formatMXN={formatMXN}
        navigateToCheckout={() => { setCartOpen(false); navigate({ view: "checkout" }); }}
      />

      <LoginModal
        open={loginOpen}
        onClose={() => setLoginOpen(false)}
        onLogin={(u) => { setUser(u); setLoginOpen(false); }}
      />

      <WhatsAppWidget />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
