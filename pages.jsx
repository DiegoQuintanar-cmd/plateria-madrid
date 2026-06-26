/* ============================================================
   Platería Madrid — Páginas (Home, Categoría, Producto, Checkout)
   ============================================================ */
const { useState: pUseState, useMemo: pUseMemo, useEffect: pUseEffect } = React;

/* ===================== HOME ===================== */
function HomePage({ navigate, addToCart, favorites, toggleFav }) {
  const { CATEGORIES, PRODUCTS, formatMXN } = window.PLATERIA;
  const featured = PRODUCTS.filter(p => p.tag === "Best-seller").slice(0, 8);

  return (
    <React.Fragment>
      {/* HERO EDITORIAL */}
      <section className="hero">
        <div className="hero-main">
          <h1 className="hero-title" data-reveal="up">
            Plata <em>ley&nbsp;.925</em>, hecha
            <br/>para un <em>recuerdo</em>.
          </h1>
          <div className="hero-meta" data-reveal="fade">
            <span>Edición 2026 · Nº 14 · Mineral del Monte</span>
            <span className="pill">26 piezas nuevas →</span>
          </div>
        </div>
      </section>

      {/* CARRUSEL EDITORIAL */}
      <div data-reveal="scale">
      <Carousel slides={[
        {
          image: "assets/blackfriday-00.jpg",
          bare: true,
          cta: "Ver descuentos",
          onCta: () => navigate({ view: "category", cat: "anillos" }),
        },
        {
          image: "assets/couple-01.jpg",
          eyebrow: "Para los dos",
          title: "Un detalle para estar en pareja",
          body: "Argollas, lazos, arras y piezas a juego — el lenguaje secreto que dice \"somos uno\" sin tener que decirlo.",
          cta: "Ver Para matrimonio",
          onCta: () => navigate({ view: "category", cat: "argollas" }),
        },
        {
          image: "assets/coleccion-02.jpg",
          eyebrow: "Colección",
          title: "Explora nuestra colección de joyería en plata ley .925",
          body: "Collares, pulseras, anillos y aretes con piedras de importación, tallados a mano en Mineral del Monte. Descubre la pieza que cuenta tu historia.",
          cta: "Ver colección",
          onCta: () => navigate({ view: "coleccion" }),
        },
        {
          image: "assets/man-03.jpg",
          eyebrow: "Para él",
          title: "El detalle que lo distingue",
          body: "Anillos, sellos y cadenas en plata maciza — la presencia silenciosa que se nota incluso entre la multitud.",
          cta: "Ver Para caballero",
          onCta: () => navigate({ view: "category", cat: "anillos", aud: "caballero" }),
        },
        {
          image: "assets/wholesale-04.jpg",
          eyebrow: "Mayoreo",
          title: "Precios de mayoreo",
          body: "Catálogo completo de plata .925 con hasta 40% de descuento, precios preferenciales y entregas programadas — diseñado para joyerías, talleres y revendedores.",
          cta: "Calcula tu descuento",
          onCta: () => navigate({ view: "mayoreo" }),
        },
        {
          image: "assets/stones-05.jpg",
          eyebrow: "Piedras finas",
          title: "Piedras de importación a tu alcance",
          body: "Agua marina, moisanita, turquesa, alejandrina, ónix, y más — engastadas a mano sobre plata .925.",
          cta: "Ver piezas con piedra",
          onCta: () => navigate({ view: "category", cat: "anillos" }),
        },
        {
          image: "assets/tienda-06.jpg",
          eyebrow: "Tienda física",
          title: "Visítanos en nuestra tienda física",
          body: "Ubicados en el histórico centro del bello pueblo mágico, Mineral del Monte, Hidalgo, México.",
        },
      ]} />
      </div>

      {/* STRIP DE GARANTÍAS */}
      <div className="strip">
        <div className="strip-inner" data-reveal-group>
          <div className="strip-item" data-reveal="up">
            <div className="si-ic"><Icon name="ring" size={22} /></div>
            <div><strong>Plata .925 certificada</strong>Punzonada pieza por pieza</div>
          </div>
          <div className="strip-item" data-reveal="up">
            <div className="si-ic"><Icon name="pencil" size={22} /></div>
            <div><strong>Grabado sin costo</strong>Letras, nombre o fecha</div>
          </div>
          <div className="strip-item" data-reveal="up">
            <div className="si-ic"><Icon name="truck" size={22} /></div>
            <div><strong>Envío asegurado</strong>Llega en 2-4 días</div>
          </div>
          <div className="strip-item" data-reveal="up">
            <div className="si-ic"><Icon name="card" size={22} /></div>
            <div><strong>12 MSI con Mercado Pago</strong>En tarjetas participantes</div>
          </div>
        </div>
      </div>

      {/* CATEGORÍAS — mosaico editorial */}
      <section className="section">
        <div className="section-head" data-reveal>
          <div className="section-eyebrow"><span className="star">✦</span> 14 familias · +70 piezas</div>
          <h2 className="section-title">El catálogo, por <em>familia</em>.</h2>
          <p className="section-sub">Cada categoría tiene su versión para dama y caballero. Los artículos religiosos se filtran por tradición: católica, masónica, ortodoxa, judaíca y más.</p>
        </div>
        <div className="cat-grid" data-reveal-group>
          {[
            { id: "argollas", count: "6 piezas", tile: "tile-6" },
            { id: "anillos", count: "8 piezas", tile: "tile-3" },
            { id: "aretes", count: "6 piezas", tile: "tile-3" },
            { id: "religiosos", count: "12 piezas", tile: "tile-4" },
            { id: "cadenas", count: "5 piezas", tile: "tile-4" },
            { id: "pulseras", count: "5 piezas", tile: "tile-4" },
            { id: "brazaletes", count: "4 piezas", tile: "tile-3" },
            { id: "relojes", count: "4 piezas", tile: "tile-3" },
            { id: "rosarios", count: "5 piezas", tile: "tile-3" },
            { id: "dijes", count: "5 piezas", tile: "tile-3" },
          ].map(({ id, count, tile }) => {
            const cat = CATEGORIES.find(c => c.id === id);
            return (
              <div key={id} className={"cat-card " + tile} role="button" tabIndex={0}
                   data-reveal="up"
                   onClick={() => navigate({ view: "category", cat: id })}>
                <div className="cc-photo">
                  <PhotoSlot label={cat.name.toUpperCase()} id={`cat-${id}`} small solid />
                </div>
                <div className="cc-body">
                  <div>
                    <div className="cc-name">{cat.name}</div>
                    <div className="cc-meta">{count}</div>
                  </div>
                  <span className="cc-arrow"><Icon name="arrow-ne" size={16} /></span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* EDITORIAL — Para matrimonio + Religioso */}
      <section className="editorial" data-reveal-group>
        <div className="ed-card" role="button" tabIndex={0}
             data-reveal="left"
             onClick={() => navigate({ view: "category", cat: "argollas" })}
             style={{ background: "var(--bg-elev)", cursor: "pointer" }}>
          <div style={{ position: "absolute", inset: 0 }}>
            <PhotoSlot label="Editorial: Argollas" id="ed-arg" small solid />
          </div>
          <span className="sticker hot" style={{ top: 24, right: 24 }}>∞ Para matrimonio</span>
          <div className="ed-body">
            <div className="ed-eyebrow">Argollas · Lazos · Arras</div>
            <h3 className="ed-title">Una sola <em>historia</em>, en plata.</h3>
            <span className="btn btn-sm" style={{ pointerEvents: "none" }}>Ver colección →</span>
          </div>
        </div>
        <div className="ed-card" role="button" tabIndex={0}
             data-reveal="right"
             onClick={() => navigate({ view: "category", cat: "religiosos" })}
             style={{ cursor: "pointer" }}>
          <div style={{ position: "absolute", inset: 0 }}>
            <PhotoSlot label="Editorial: Religioso" id="ed-rel" small solid />
          </div>
          <span className="sticker cobalt" style={{ top: 24, right: 24, transform: "rotate(6deg)" }}>✝ Religioso</span>
          <div className="ed-body">
            <div className="ed-eyebrow">Católica · Masónica · Ortodoxa</div>
            <h3 className="ed-title">Devoción <em>tejida</em> en plata.</h3>
            <span className="btn btn-sm" style={{ pointerEvents: "none" }}>Ver colección →</span>
          </div>
        </div>
      </section>

      {/* COLLAGE EDITORIAL — El significado de "Un arte en plata" */}
      <section className="manifesto">
        <div className="manifesto-grid">
          {/* Columna izquierda */}
          <figure className="mf mf-a" data-reveal="up">
            <img src="assets/collage-rings-hands.jpg" alt="Argollas en pareja" loading="lazy" />
            <figcaption>I · La promesa</figcaption>
          </figure>
          <figure className="mf mf-b" data-reveal="up">
            <img src="assets/collage-tree.jpg" alt="Dijes árbol de la vida" loading="lazy" />
            <figcaption>VII · La raíz</figcaption>
          </figure>

          {/* Bloque central de texto */}
          <div className="mf-statement" data-reveal="fade">
            <div className="mf-eyebrow"><span className="star">✦</span> Manifiesto</div>
            <h2 className="mf-title">El significado de <em>"Un arte en&nbsp;plata"</em></h2>
            <p className="mf-body">
              No vendemos metal: tallamos memoria. Cada pieza nace de la mano de un
              orfebre que conoce el peso de una promesa, el brillo de un primer "sí"
              y la devoción que se lleva al pecho.
            </p>
            <p className="mf-sign">— Taller Madrid, desde 2002</p>
          </div>

          {/* Imágenes que rodean el texto */}
          <figure className="mf mf-c" data-reveal="up">
            <img src="assets/collage-diamond-bw.jpg" alt="Anillos de diamante" loading="lazy" />
            <figcaption>II · El detalle</figcaption>
          </figure>
          <figure className="mf mf-d" data-reveal="up">
            <img src="assets/collage-love.jpg" alt="Pulsera Love" loading="lazy" />
            <figcaption>V · El amor</figcaption>
          </figure>
          <figure className="mf mf-e" data-reveal="up">
            <img src="assets/collage-hands-jewel.jpg" alt="Manos con joyería" loading="lazy" />
            <figcaption>III · El gesto</figcaption>
          </figure>
          <figure className="mf mf-f" data-reveal="up">
            <img src="assets/collage-eternity.jpg" alt="Anillos de eternidad" loading="lazy" />
            <figcaption>VI · El color</figcaption>
          </figure>
          <figure className="mf mf-g" data-reveal="up">
            <img src="assets/collage-tennis.jpg" alt="Pulsera tennis" loading="lazy" />
            <figcaption>IV · La luz</figcaption>
          </figure>
          <figure className="mf mf-h" data-reveal="up">
            <img src="assets/collage-chain.jpg" alt="Cadena de plata" loading="lazy" />
            <figcaption>VIII · La fuerza</figcaption>
          </figure>
          <figure className="mf mf-i" data-reveal="up">
            <img src="assets/collage-earrings.jpg" alt="Aretes en plata" loading="lazy" />
            <figcaption>IX · El brillo</figcaption>
          </figure>
        </div>
      </section>

      {/* DESTACADOS */}
      <section className="section">
        <div className="section-head" data-reveal>
          <div className="section-eyebrow"><span className="star">✦</span> Top ventas · 2026</div>
          <h2 className="section-title">Lo más <em>querido</em> de la casa.</h2>
        </div>
        <div className="prod-grid" data-reveal-group>
          {featured.map(p => (
            <ProductCard
              key={p.id}
              product={p}
              onOpen={(id) => navigate({ view: "product", id })}
              onAdd={addToCart}
              onFav={toggleFav}
              faved={favorites.has(p.id)}
            />
          ))}
        </div>
      </section>

      {/* BANNER MAYOREO */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="mayoreo-banner" role="button" tabIndex={0} data-reveal="up"
             onClick={() => navigate({ view: "mayoreo" })}>
          <div className="mb-photo">
            <img src="assets/mayoreo-ambar.jpg" alt="Anillos de plata al mayoreo" loading="lazy" />
          </div>
          <div className="mb-body">
            <div className="mb-eyebrow"><span className="star">✦</span> Precios de mayoreo</div>
            <h2 className="mb-title">¿Quieres iniciar tu negocio<br/>en la <em>joyería de plata</em>?</h2>
            <p className="mb-sub">Da clic aquí para conocer nuestros precios de mayoreo y empieza a surtir tu joyería con plata .925 de Mineral del Monte.</p>
            <div className="mb-chips">
              <span className="mb-chip">Desde 30% OFF</span>
              <span className="mb-chip">Hasta 40% OFF</span>
            </div>
            <span className="mb-cta">Conocer precios de mayoreo <span className="mb-arrow">→</span></span>
          </div>
        </div>
      </section>

      {/* PARA MATRIMONIO — full bleed */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="section-head" data-reveal>
          <div className="section-eyebrow"><span className="star">∞</span> Para matrimonio</div>
          <h2 className="section-title">El día <em>más grande</em>, en plata.</h2>
          <p className="section-sub">Argollas para dama y caballero, lazos trenzados y arras matrimoniales — todo agrupado en una sola colección.</p>
        </div>
        <div className="prod-grid" data-reveal-group>
          {PRODUCTS.filter(p => ["argollas", "lazos", "arras"].includes(p.cat)).slice(0, 8).map(p => (
            <ProductCard key={p.id} product={p}
              onOpen={(id) => navigate({ view: "product", id })}
              onAdd={addToCart}
              onFav={toggleFav}
              faved={favorites.has(p.id)} />
          ))}
        </div>
      </section>
    </React.Fragment>
  );
}

/* ===================== CATEGORY ===================== */
function CategoryPage({ route, navigate, addToCart, favorites, toggleFav }) {
  const { CATEGORIES, PRODUCTS, RELIGIOUS_TRADITIONS, MATERIALS, findCategory } = window.PLATERIA;
  const cat = findCategory(route.cat);
  const [aud, setAud] = pUseState(route.aud || "todos");
  const [tradition, setTradition] = pUseState("todas");
  const [sort, setSort] = pUseState("recom");
  const [matFilter, setMatFilter] = pUseState(new Set());
  const [maxPrice, setMaxPrice] = pUseState(null);

  // Panel de filtros colapsable + borrador (se confirma con "Aplicar")
  const [filtersOpen, setFiltersOpen] = pUseState(false);
  const [dAud, setDAud] = pUseState(route.aud || "todos");
  const [dTradition, setDTradition] = pUseState("todas");
  const [dMat, setDMat] = pUseState(new Set());
  const [dMaxPrice, setDMaxPrice] = pUseState(null);

  pUseEffect(() => {
    setAud(route.aud || "todos");
    setTradition("todas");
    setMatFilter(new Set());
    setMaxPrice(null);
    setDAud(route.aud || "todos");
    setDTradition("todas");
    setDMat(new Set());
    setDMaxPrice(null);
    setFiltersOpen(false);
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [route.cat, route.aud]);

  const isReligious = ["religiosos", "rosarios"].includes(cat.id);

  const filtered = pUseMemo(() => {
    let list = PRODUCTS.filter(p => p.cat === cat.id);
    if (aud !== "todos") list = list.filter(p => p.aud === aud || p.aud === "unisex");
    if (isReligious && tradition !== "todas") list = list.filter(p => p.tradition === tradition);
    if (matFilter.size > 0) list = list.filter(p => matFilter.has(p.material));
    if (maxPrice) list = list.filter(p => p.price <= maxPrice);
    if (sort === "price-asc") list = [...list].sort((a,b) => a.price - b.price);
    if (sort === "price-desc") list = [...list].sort((a,b) => b.price - a.price);
    if (sort === "new") list = [...list].sort((a,b) => (a.tag === "Nuevo" ? -1 : 1));
    return list;
  }, [cat.id, aud, tradition, matFilter, maxPrice, sort]);

  const groupBreadcrumb =
    ["argollas", "lazos", "arras"].includes(cat.id) ? { id: "matrimonio", label: "Para matrimonio" } :
    ["religiosos", "rosarios", "relicarios"].includes(cat.id) ? { id: "religioso", label: "Religioso" } :
    aud === "dama" ? { id: "dama", label: "Para dama" } :
    aud === "caballero" ? { id: "caballero", label: "Para caballero" } :
    { id: "joyeria", label: "Joyería" };

  function toggleMat(m) {
    const next = new Set(dMat);
    if (next.has(m)) next.delete(m); else next.add(m);
    setDMat(next);
  }

  // Cambiar "Para" desde la barra superior aplica al instante y mantiene sincronizado el borrador
  function pickAud(a) { setAud(a); setDAud(a); }

  // Al abrir el panel, el borrador refleja los filtros ya aplicados
  function openFilters() {
    setDAud(aud);
    setDTradition(tradition);
    setDMat(new Set(matFilter));
    setDMaxPrice(maxPrice);
    setFiltersOpen(true);
  }

  // "Aplicar": confirma el borrador y muestra los productos
  function applyFilters() {
    setAud(dAud);
    setTradition(dTradition);
    setMatFilter(new Set(dMat));
    setMaxPrice(dMaxPrice);
    setFiltersOpen(false);
  }

  function clearFilters() {
    setDAud("todos");
    setDTradition("todas");
    setDMat(new Set());
    setDMaxPrice(null);
  }

  // Cuántas piezas resultarían con el borrador actual (vista previa en el botón)
  const draftCount = pUseMemo(() => {
    let list = PRODUCTS.filter(p => p.cat === cat.id);
    if (dAud !== "todos") list = list.filter(p => p.aud === dAud || p.aud === "unisex");
    if (isReligious && dTradition !== "todas") list = list.filter(p => p.tradition === dTradition);
    if (dMat.size > 0) list = list.filter(p => dMat.has(p.material));
    if (dMaxPrice) list = list.filter(p => p.price <= dMaxPrice);
    return list.length;
  }, [cat.id, dAud, dTradition, dMat, dMaxPrice, isReligious]);

  return (
    <div className="cat-page">
      <div className="crumbs">
        <a onClick={() => navigate({ view: "home" })}>Inicio</a>
        <span className="sep">/</span>
        <a onClick={() => {
          if (groupBreadcrumb.id === "joyeria") navigate({ view: "coleccion" });
          else if (groupBreadcrumb.id === "dama" || groupBreadcrumb.id === "caballero") navigate({ view: "category", cat: cat.id, aud: groupBreadcrumb.id });
          else navigate({ view: "coleccion" });
        }} style={{ cursor: "pointer" }}>{groupBreadcrumb.label}</a>
        <span className="sep">/</span>
        <span className="here">{cat.name}</span>
      </div>

      <div className="cat-head">
        <div>
          <h1>{cat.name}</h1>
          <div className="cat-sub">{cat.blurb}</div>
        </div>
        <div className="cat-count">{String(filtered.length).padStart(2, "0")} piezas</div>
      </div>

      <div className={"cat-layout " + (filtersOpen ? "filters-open" : "filters-closed")}>
        <aside className="filters">
          <button className={"filters-toggle" + (filtersOpen ? " open" : "")}
                  onClick={() => filtersOpen ? setFiltersOpen(false) : openFilters()}
                  aria-expanded={filtersOpen}>
            <span>Filtros</span>
            <span className="arrow">›</span>
          </button>

          {filtersOpen && (
            <div className="filters-body">
              {/* Dama / Caballero — siempre disponible salvo para arras/lazos */}
              {!["arras", "lazos"].includes(cat.id) && (
                <div className="filter-group">
                  <h4>Para</h4>
                  <div className="chip-row">
                    <button className={"chip" + (dAud === "todos" ? " active" : "")} onClick={() => setDAud("todos")}>Todos</button>
                    <button className={"chip" + (dAud === "dama" ? " active" : "")} onClick={() => setDAud("dama")}>Dama</button>
                    <button className={"chip" + (dAud === "caballero" ? " active" : "")} onClick={() => setDAud("caballero")}>Caballero</button>
                  </div>
                </div>
              )}

              {/* Tradición religiosa */}
              {isReligious && (
                <div className="filter-group">
                  <h4>Tradición</h4>
                  <div className="chip-row">
                    <button className={"chip" + (dTradition === "todas" ? " active" : "")} onClick={() => setDTradition("todas")}>Todas</button>
                    {RELIGIOUS_TRADITIONS.map(t => (
                      <button key={t.id} className={"chip" + (dTradition === t.id ? " active" : "")}
                              onClick={() => setDTradition(t.id)}>{t.name}</button>
                    ))}
                  </div>
                </div>
              )}

              <div className="filter-group">
                <h4>Material</h4>
                {MATERIALS.map(m => {
                  const n = PRODUCTS.filter(p => p.cat === cat.id && p.material === m).length;
                  if (n === 0) return null;
                  return (
                    <label key={m} className="filter-line">
                      <span>
                        <input type="checkbox" checked={dMat.has(m)} onChange={() => toggleMat(m)} /> {m}
                      </span>
                      <span className="num">{n}</span>
                    </label>
                  );
                })}
              </div>

              <div className="filter-group">
                <h4>Precio máximo</h4>
                <div className="chip-row">
                  {[1000, 2500, 5000, 10000].map(v => (
                    <button key={v} className={"chip" + (dMaxPrice === v ? " active" : "")}
                            onClick={() => setDMaxPrice(dMaxPrice === v ? null : v)}>
                      hasta ${v.toLocaleString("es-MX")}
                    </button>
                  ))}
                </div>
              </div>

              <div className="filter-group">
                <h4>Acabado</h4>
                {window.PLATERIA.FINISHES.map(f => (
                  <label key={f} className="filter-line">
                    <span><input type="checkbox" /> {f}</span>
                  </label>
                ))}
              </div>

              <div className="filter-group">
                <h4>Grabado</h4>
                <label className="filter-line"><span><input type="checkbox" defaultChecked /> Personalizable</span></label>
                <label className="filter-line"><span><input type="checkbox" /> Sin grabado</span></label>
              </div>

              <button className="filters-apply" onClick={applyFilters}>
                <span>Aplicar</span>
                <span className="ct">· {String(draftCount).padStart(2, "0")} piezas</span>
              </button>
              <button className="filters-clear" onClick={clearFilters}>Limpiar filtros</button>
            </div>
          )}
        </aside>

        <div>
          <div className="toolbar">
            <div className="pill-tabs">
              <button className={aud === "todos" ? "active" : ""} onClick={() => pickAud("todos")}>Todos</button>
              <button className={aud === "dama" ? "active" : ""} onClick={() => pickAud("dama")}>Dama</button>
              <button className={aud === "caballero" ? "active" : ""} onClick={() => pickAud("caballero")}>Caballero</button>
            </div>
            <select value={sort} onChange={(e) => setSort(e.target.value)}>
              <option value="recom">Recomendado</option>
              <option value="new">Más nuevos</option>
              <option value="price-asc">Precio: menor a mayor</option>
              <option value="price-desc">Precio: mayor a menor</option>
            </select>
          </div>

          {filtered.length === 0 ? (
            <div style={{ textAlign: "center", padding: "80px 20px", color: "var(--ink-mute)" }}>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 48, fontStyle: "italic", color: "var(--silver)" }}>—</div>
              <p>Aún no hay piezas con estos filtros.</p>
            </div>
          ) : (
            <div className="prod-grid">
              {filtered.map(p => (
                <ProductCard
                  key={p.id}
                  product={p}
                  onOpen={(id) => navigate({ view: "product", id })}
                  onAdd={addToCart}
                  onFav={toggleFav}
                  faved={favorites.has(p.id)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ===================== PRODUCT DETAIL ===================== */
function ProductPage({ route, navigate, addToCart, favorites, toggleFav }) {
  const { findProduct, findCategory, formatMXN, PRODUCTS } = window.PLATERIA;
  const product = findProduct(route.id);
  if (!product) return <div className="pdp">Producto no encontrado.</div>;
  const cat = findCategory(product.cat);

  const [activePhoto, setActivePhoto] = pUseState(0);
  const [size, setSize] = pUseState(null);
  const [qty, setQty] = pUseState(1);
  const [tab, setTab] = pUseState("desc");
  const [engraving, setEngraving] = pUseState("");
  const [withBox, setWithBox] = pUseState(true);

  pUseEffect(() => {
    setActivePhoto(0); setSize(null); setQty(1); setTab("desc"); setEngraving(""); setWithBox(true);
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [product.id]);

  const sizes = ["argollas","anillos"].includes(product.cat)
    ? ["4","5","6","7","8","9","10","11","12"]
    : ["cadenas","esclavas","brazaletes","pulseras"].includes(product.cat)
      ? ["S","M","L","XL"]
      : null;

  const related = PRODUCTS.filter(p => p.cat === product.cat && p.id !== product.id).slice(0, 4);

  return (
    <div className="pdp">
      <div className="crumbs">
        <a onClick={() => navigate({ view: "home" })}>Inicio</a>
        <span className="sep">/</span>
        <a onClick={() => navigate({ view: "category", cat: product.cat })}>{cat.name}</a>
        <span className="sep">/</span>
        <span className="here">{product.name}</span>
      </div>

      <div className="pdp-grid">
        <div className="pdp-gallery">
          <div className="pdp-thumbs">
            {[0,1,2,3].map(i => (
              <button key={i} className={"pdp-thumb" + (activePhoto === i ? " active" : "")}
                      onClick={() => setActivePhoto(i)}>
                <PhotoSlot label={`V${i+1}`} small solid />
              </button>
            ))}
          </div>
          <div className="pdp-main">
            <PhotoSlot label={product.name.toUpperCase()} id={`${product.id} · vista ${activePhoto + 1}`} />
            <div className="pdp-zoom">⊕ Click para acercar</div>
          </div>
        </div>

        <div className="pdp-info">
          <div className="cat">{cat.name} · {product.aud === "unisex" ? "Unisex" : product.aud === "dama" ? "Dama" : "Caballero"}</div>
          <h1>{product.name}</h1>
          <div className="sku">SKU · {product.id.toUpperCase()}</div>

          <div className="pdp-price">
            <span className="price">{formatMXN(product.price)}</span>
            {product.was && <span className="was">{formatMXN(product.was)}</span>}
            {product.was && <span className="save">Ahorras {formatMXN(product.was - product.price)}</span>}
          </div>
          <div className="pdp-mp">
            <span className="mp-mark">MP</span>
            <span>12 meses sin intereses de <strong>{formatMXN(Math.round(product.price / 12))}</strong> con Mercado Pago</span>
          </div>

          <div className="pdp-desc">
            Pieza elaborada artesanalmente en {product.material.toLowerCase()} con acabado {(product.finish || "pulido espejo").toLowerCase()}. Cada {cat.name.toLowerCase().replace(/s$/, "")} pasa por
            ocho manos en nuestro taller de la calle Madrid antes de salir punzonada y certificada.
          </div>

          <div className="pdp-options">
            {sizes && (
              <div>
                <div className="opt-label">
                  <span>Talla</span>
                  <span className="selected">{size ? `Seleccionada: ${size}` : "Elige una talla"}</span>
                </div>
                <div className="size-row">
                  {sizes.map(s => (
                    <button key={s} className={"size-chip" + (size === s ? " active" : "")} onClick={() => setSize(s)}>{s}</button>
                  ))}
                </div>
              </div>
            )}

            <div>
              <div className="opt-label">
                <span>Grabado personalizado</span>
                <span className="selected">Hasta 18 caracteres · sin costo</span>
              </div>
              <input
                value={engraving}
                onChange={(e) => setEngraving(e.target.value.slice(0, 18))}
                placeholder="Ej. M & A · 24·06·26"
                style={{
                  width: "100%", padding: "12px 14px",
                  border: "1px solid var(--line)", background: "var(--bg-elev)",
                  fontSize: 14, fontFamily: "var(--font-display)", letterSpacing: "0.04em"
                }}
              />
            </div>

            <div>
              <div className="opt-label"><span>Cantidad</span></div>
              <div className="qty-row">
                <div className="qty">
                  <button onClick={() => setQty(Math.max(1, qty - 1))}><Icon name="minus" size={14} /></button>
                  <input value={qty} onChange={(e) => setQty(Math.max(1, parseInt(e.target.value) || 1))} />
                  <button onClick={() => setQty(qty + 1)}><Icon name="plus" size={14} /></button>
                </div>
                <label style={{ display: "inline-flex", gap: 8, fontSize: 13, color: "var(--ink-soft)", alignItems: "center" }}>
                  <input type="checkbox" checked={withBox} onChange={(e) => setWithBox(e.target.checked)} />
                  Empaque de regalo · gratis
                </label>
              </div>
            </div>
          </div>

          <div className="pdp-cta">
            <button className="btn btn-lg" onClick={() => addToCart(product, { qty, size, engraving })}>
              Añadir al carrito · {formatMXN(product.price * qty)}
            </button>
            <button className={"btn btn-ghost btn-lg"} onClick={() => toggleFav(product.id)} aria-label="Favoritos">
              <Icon name={favorites.has(product.id) ? "heart-fill" : "heart"} />
            </button>
          </div>

          <div className="pdp-meta">
            <div className="pm-item"><Icon name="ship" /><div><strong>Envío en 2-4 días</strong><br/>Gratis sobre $1,500</div></div>
            <div className="pm-item"><Icon name="return" /><div><strong>30 días</strong><br/>de devolución</div></div>
            <div className="pm-item"><Icon name="shield" /><div><strong>Garantía de por vida</strong><br/>en piezas .925</div></div>
            <div className="pm-item"><Icon name="diamond" /><div><strong>Punzonada .925</strong><br/>certificada</div></div>
          </div>
        </div>
      </div>

      {/* TABS */}
      <div className="pdp-tabs">
        <div className="pdp-tabs-head">
          {[
            ["desc", "Descripción"],
            ["specs", "Especificaciones"],
            ["care", "Cuidado"],
            ["ship", "Envío y devolución"],
          ].map(([k, l]) => (
            <button key={k} className={"pdp-tab" + (tab === k ? " active" : "")} onClick={() => setTab(k)}>{l}</button>
          ))}
        </div>
        <div className="pdp-tab-body">
          {tab === "desc" && (
            <p>
              {product.name} es una pieza pensada para usarse a diario. Se trabaja en {product.material.toLowerCase()},
              con acabado {(product.finish || "pulido espejo").toLowerCase()}, y se entrega en estuche
              firmado por la casa. Cada pieza incluye certificado de autenticidad y se puede grabar sin costo
              con la fecha, iniciales o frase que prefieras.
            </p>
          )}
          {tab === "specs" && (
            <dl>
              <dt>Material</dt><dd>{product.material}</dd>
              <dt>Acabado</dt><dd>{product.finish || "Pulido espejo"}</dd>
              <dt>Categoría</dt><dd>{cat.name}</dd>
              <dt>Para</dt><dd>{product.aud === "unisex" ? "Dama y caballero" : product.aud === "dama" ? "Dama" : "Caballero"}</dd>
              {product.tradition && <React.Fragment><dt>Tradición</dt><dd>{window.PLATERIA.RELIGIOUS_TRADITIONS.find(t => t.id === product.tradition)?.name}</dd></React.Fragment>}
              <dt>SKU</dt><dd>{product.id.toUpperCase()}</dd>
              <dt>Hechura</dt><dd>Taller Madrid, Ciudad de México</dd>
            </dl>
          )}
          {tab === "care" && (
            <React.Fragment>
              <p>La plata vive contigo: oscurece con el tiempo y eso es parte de su carácter. Para conservar el brillo original:</p>
              <ul style={{ lineHeight: 1.8 }}>
                <li>Limpia con un paño suave de algodón después de cada uso.</li>
                <li>Guarda en bolsa anti-óxido o en el estuche original.</li>
                <li>Evita el contacto con perfumes, cloro y agua salada.</li>
                <li>Para piedras, no uses limpiadores ultrasónicos.</li>
              </ul>
            </React.Fragment>
          )}
          {tab === "ship" && (
            <dl>
              <dt>Envío estándar</dt><dd>2 a 4 días hábiles · gratis en pedidos {">"} $1,500</dd>
              <dt>Envío express</dt><dd>24 hrs en CDMX · $150 MXN</dd>
              <dt>Devoluciones</dt><dd>30 días desde la entrega · sin costo</dd>
              <dt>Cambios</dt><dd>Disponibles en tienda y por paquetería</dd>
            </dl>
          )}
        </div>
      </div>

      {/* RELACIONADOS */}
      <section className="section" style={{ paddingLeft: 0, paddingRight: 0, paddingBottom: 0 }}>
        <div className="section-head">
          <div className="section-eyebrow">También de la casa</div>
          <h2 className="section-title">Otras piezas en <em>{cat.name.toLowerCase()}</em></h2>
        </div>
        <div className="prod-grid">
          {related.map(p => (
            <ProductCard key={p.id} product={p}
              onOpen={(id) => navigate({ view: "product", id })}
              onAdd={addToCart} onFav={toggleFav} faved={favorites.has(p.id)} />
          ))}
        </div>
      </section>
    </div>
  );
}

/* ===================== CHECKOUT ===================== */
function CheckoutPage({ cart, navigate, formatMXN, onPlaceOrder }) {
  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.qty, 0);
  const shipping = subtotal > 1500 ? 0 : 150;
  const total = subtotal + shipping;

  const [pay, setPay] = pUseState("mp-credit");
  const [installments, setInstallments] = pUseState(12);
  const [email, setEmail] = pUseState("");

  return (
    <div className="checkout">
      <div>
        <div className="crumbs" style={{ marginBottom: 26 }}>
          <a onClick={() => navigate({ view: "home" })}>Inicio</a>
          <span className="sep">/</span>
          <span className="here">Checkout</span>
        </div>

        {/* 1. Contacto */}
        <h2><span className="step-num">1</span> Contacto</h2>
        <div className="field">
          <label>Correo electrónico</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="tu@correo.com" />
        </div>
        <label style={{ fontSize: 13, color: "var(--ink-soft)", display: "inline-flex", gap: 8, alignItems: "center", marginBottom: 28 }}>
          <input type="checkbox" defaultChecked /> Recibir confirmación y novedades por correo
        </label>

        {/* 2. Envío */}
        <h2 style={{ marginTop: 28 }}><span className="step-num">2</span> Envío</h2>
        <div className="field"><label>Nombre completo</label><input placeholder="Nombre y apellidos" /></div>
        <div className="field"><label>Calle y número</label><input placeholder="Av. Madrid 215" /></div>
        <div className="field-row">
          <div className="field"><label>Código postal</label><input placeholder="06000" /></div>
          <div className="field"><label>Colonia</label><input placeholder="Centro" /></div>
        </div>
        <div className="field-row">
          <div className="field"><label>Ciudad</label><input placeholder="Ciudad de México" /></div>
          <div className="field"><label>Estado</label><input placeholder="CDMX" /></div>
        </div>
        <div className="field"><label>Teléfono</label><input placeholder="+52 …" /></div>

        {/* 3. Pago */}
        <h2 style={{ marginTop: 36 }}><span className="step-num">3</span> Método de pago</h2>
        <p style={{ color: "var(--ink-mute)", fontSize: 13, marginTop: -8, marginBottom: 18 }}>
          Pagos procesados de forma segura por <strong style={{ color: "var(--ink)" }}>Mercado Pago</strong>.
        </p>

        <div className="pay-method">
          {[
            { id: "mp-credit",  title: "Tarjeta de crédito",   sub: "Visa · Mastercard · Amex · hasta 12 MSI", ic: "VS" },
            { id: "mp-debit",   title: "Tarjeta de débito",    sub: "Visa Débito · Mastercard Débito",         ic: "DB" },
            { id: "mp-wallet",  title: "Dinero en Mercado Pago", sub: "Paga con tu saldo o cuenta MP",          ic: "MP" },
            { id: "mp-cash",    title: "Efectivo · OXXO",      sub: "Recibe tu cupón para pagar en tienda",     ic: "OX" },
          ].map(opt => (
            <button key={opt.id} className={"pay-card" + (pay === opt.id ? " active" : "")} onClick={() => setPay(opt.id)}>
              <div className="pay-ic">{opt.ic}</div>
              <div>
                <div className="pay-title">{opt.title}</div>
                <div className="pay-sub">{opt.sub}</div>
              </div>
            </button>
          ))}
        </div>

        {/* Panel MP */}
        {(pay === "mp-credit" || pay === "mp-debit") && (
          <div className="mp-panel">
            <div className="mp-head">
              <span className="mp-mark">MP</span>
              <span>Pago seguro con Mercado Pago</span>
            </div>
            <div className="field"><label>Número de tarjeta</label><input placeholder="•••• •••• •••• ••••" /></div>
            <div className="field-row">
              <div className="field"><label>Vencimiento</label><input placeholder="MM / AA" /></div>
              <div className="field"><label>CVV</label><input placeholder="•••" /></div>
            </div>
            <div className="field"><label>Nombre como aparece en la tarjeta</label><input placeholder="Nombre y apellidos" /></div>
            {pay === "mp-credit" && (
              <div className="field">
                <label>Meses sin intereses</label>
                <select value={installments} onChange={(e) => setInstallments(parseInt(e.target.value))}>
                  <option value={1}>1 pago de {formatMXN(total)}</option>
                  <option value={3}>3 pagos de {formatMXN(Math.round(total / 3))} · sin intereses</option>
                  <option value={6}>6 pagos de {formatMXN(Math.round(total / 6))} · sin intereses</option>
                  <option value={12}>12 pagos de {formatMXN(Math.round(total / 12))} · sin intereses</option>
                </select>
              </div>
            )}
          </div>
        )}
        {pay === "mp-wallet" && (
          <div className="mp-panel">
            <div className="mp-head"><span className="mp-mark">MP</span><span>Pago con saldo Mercado Pago</span></div>
            <p style={{ fontSize: 14, color: "var(--ink-soft)" }}>
              Te redirigiremos a Mercado Pago para confirmar el cargo con tu cuenta. No compartimos tus datos
              con la tienda.
            </p>
          </div>
        )}
        {pay === "mp-cash" && (
          <div className="mp-panel">
            <div className="mp-head"><span className="mp-mark">MP</span><span>Pago en efectivo · OXXO</span></div>
            <p style={{ fontSize: 14, color: "var(--ink-soft)" }}>
              Recibirás un cupón con código de barras por correo. Tienes 3 días hábiles para pagarlo en cualquier
              tienda OXXO. Tu pedido se envía cuando se confirma el pago.
            </p>
          </div>
        )}

        <button className="btn btn-lg btn-block" style={{ marginTop: 28 }} onClick={onPlaceOrder}>
          Pagar {formatMXN(total)} con Mercado Pago
        </button>
        <p style={{ fontSize: 11, color: "var(--ink-mute)", textAlign: "center", marginTop: 14, letterSpacing: "0.06em" }}>
          Al confirmar aceptas los términos y condiciones · Conexión cifrada SSL
        </p>
      </div>

      {/* Resumen */}
      <aside className="summary">
        <h3>Tu pedido</h3>
        {cart.length === 0 ? (
          <p style={{ color: "var(--ink-mute)" }}>Tu carrito está vacío.</p>
        ) : (
          <React.Fragment>
            {cart.map((item, idx) => (
              <div key={idx} className="sum-row">
                <div className="sr-photo"><PhotoSlot small solid label="" /></div>
                <div>
                  <div className="sr-name">{item.product.name}</div>
                  <div className="sr-meta">
                    {item.size && `Talla ${item.size} · `}
                    Cant. {item.qty}
                    {item.engraving && ` · "${item.engraving}"`}
                  </div>
                </div>
                <div className="sr-price">{formatMXN(item.product.price * item.qty)}</div>
              </div>
            ))}
            <div className="sum-totals">
              <div className="cart-line"><span>Subtotal</span><span>{formatMXN(subtotal)}</span></div>
              <div className="cart-line">
                <span>Envío</span>
                <span>{shipping === 0 ? "Gratis" : formatMXN(shipping)}</span>
              </div>
              <div className="cart-line"><span>Impuestos</span><span>Incluidos</span></div>
              <div className="cart-line total"><span>Total</span><span className="v">{formatMXN(total)}</span></div>
            </div>
            <p style={{ fontSize: 12, color: "var(--ink-mute)", marginTop: 16, lineHeight: 1.5 }}>
              <strong style={{ color: "var(--ink)" }}>12 MSI</strong> de {formatMXN(Math.round(total / 12))} con tarjetas
              participantes de Mercado Pago.
            </p>
          </React.Fragment>
        )}
      </aside>
    </div>
  );
}

/* ===================== ORDER CONFIRMATION ===================== */
function ConfirmationPage({ orderId, navigate, formatMXN }) {
  return (
    <div className="section" style={{ maxWidth: 720, textAlign: "center", padding: "96px 32px" }}>
      <div style={{
        width: 64, height: 64, borderRadius: "50%",
        border: "1px solid var(--ink)",
        margin: "0 auto 24px",
        display: "flex", alignItems: "center", justifyContent: "center"
      }}>
        <Icon name="check" size={26} />
      </div>
      <div className="section-eyebrow">Gracias por tu compra</div>
      <h1 style={{ fontFamily: "var(--font-display)", fontSize: 48, fontWeight: 400, margin: "8px 0 18px" }}>
        Tu pedido está <em style={{ fontStyle: "italic", color: "var(--bronze)" }}>en camino</em>
      </h1>
      <p style={{ color: "var(--ink-soft)", fontSize: 15, maxWidth: 480, margin: "0 auto 8px" }}>
        Recibirás un correo de confirmación con los detalles de tu pedido y el seguimiento del envío en cuanto Mercado Pago confirme el cargo.
      </p>
      <div className="sku" style={{ fontFamily: "var(--font-mono)", margin: "28px 0", color: "var(--ink-mute)", letterSpacing: "0.18em" }}>
        N° de pedido · <strong style={{ color: "var(--ink)" }}>{orderId}</strong>
      </div>
      <button className="btn" onClick={() => navigate({ view: "home" })}>Volver al inicio</button>
    </div>
  );
}

/* ===================== HISTORIA ===================== */
function HistoriaPage({ navigate }) {
  return (
    <div className="historia">
      {/* HERO */}
      <header className="hist-hero">
        <div className="hist-hero-bg">
          <img src="assets/hist-plaza.jpg" alt="Plaza de Mineral del Monte" />
          <div className="hist-hero-scrim"></div>
        </div>
        <div className="hist-hero-inner">
          <button className="hist-back" onClick={() => navigate({ view: "home" })}>← Volver a la tienda</button>
          <div className="hist-eyebrow"><span className="star">✦</span> Nuestra historia</div>
          <h1 className="hist-title">Donde la plata<br/><em>se vuelve memoria</em></h1>
          <p className="hist-lede">
            La historia de Platería Madrid no comienza el día que abrimos las puertas:
            empieza 470 años atrás, en las entrañas de Mineral del Monte.
          </p>
          <div className="hist-scroll">↓ Desliza para descubrirla</div>
        </div>
      </header>

      {/* INTRO — 470 años */}
      <section className="hist-section hist-intro">
        <div className="hist-bignum" data-reveal="up">470</div>
        <div className="hist-intro-text" data-reveal="up">
          <p className="hist-drop">
            <span className="dropcap">L</span>os inicios de Platería Madrid no nacen solo de la planeación de un puesto,
            ni del día en que se tomó la decisión de emprender. Todo empieza
            <strong> hace 470 años</strong>, en los acontecimientos que marcaron la historia de la
            minería en Mineral del Monte — donde se forjaron los pilares de la creación de las joyas
            en plata, hoy categorizadas como pieza fundamental del atractivo masculino, femenino y de
            la relación en pareja.
          </p>
        </div>
      </section>

      {/* LÍNEA DE TIEMPO */}
      <section className="hist-timeline">
        <div className="hist-tl-head" data-reveal="up">
          <div className="section-eyebrow"><span className="star">✦</span> Línea del tiempo</div>
          <h2 className="hist-h2">De la veta a la <em>vitrina</em></h2>
        </div>

        <div className="hist-step" data-reveal="up">
          <div className="hist-step-media">
            <img src="assets/hist-mineros.jpg" alt="Mineros de Real del Monte" loading="lazy" />
            <span className="hist-step-tag">Siglo XVI</span>
          </div>
          <div className="hist-step-body">
            <div className="hist-step-year">Siglo XVI</div>
            <h3>El descubrimiento de la plata</h3>
            <p>
              Con el hallazgo de plata en el siglo XVI nace la vocación minera de la región.
              Generaciones de mineros descendieron cada día a la montaña, esforzándose en la
              extracción del metal que se volvería clave en la economía mexicana.
            </p>
          </div>
        </div>

        <div className="hist-step reverse" data-reveal="up">
          <div className="hist-step-media">
            <img src="assets/hist-regla.jpg" alt="Hacienda de beneficio Santa María Regla" loading="lazy" />
            <span className="hist-step-tag">Siglo XVII</span>
          </div>
          <div className="hist-step-body">
            <div className="hist-step-year">Siglo XVII</div>
            <h3>Haciendas de beneficio</h3>
            <p>
              Se construyen haciendas como <strong>Santa María Regla</strong>, donde se procesaban
              los minerales con métodos rudimentarios de fundición. El beneficio de la plata empieza
              a darle forma al paisaje y a la vida del pueblo.
            </p>
          </div>
        </div>

        <div className="hist-step" data-reveal="up">
          <div className="hist-step-media">
            <img src="assets/hist-compania.jpg" alt="Compañía Real del Monte y Pachuca" loading="lazy" />
            <span className="hist-step-tag">1727</span>
          </div>
          <div className="hist-step-body">
            <div className="hist-step-year">1727</div>
            <h3>Fundación de la Compañía Real del Monte y Pachuca</h3>
            <p>
              Se establece una de las empresas mineras más importantes de México, que operó por
              más de 250 años. Sus socavones, malacates y haciendas marcaron para siempre el paisaje
              y el oficio de la región.
            </p>
          </div>
        </div>

        <div className="hist-step reverse" data-reveal="up">
          <div className="hist-step-media">
            <img src="assets/hist-auge.jpg" alt="Auge minero en Real del Monte" loading="lazy" />
            <span className="hist-step-tag">Siglo XVIII</span>
          </div>
          <div className="hist-step-body">
            <div className="hist-step-year">Siglo XVIII</div>
            <h3>Auge minero</h3>
            <p>
              La extracción de plata y oro convierte a Real del Monte en un motor económico del
              virreinato. Las vetas de la sierra atraen capital, ingenio y miles de manos que
              transforman la montaña en riqueza.
            </p>
          </div>
        </div>

        <div className="hist-step" data-reveal="up">
          <div className="hist-step-media">
            <img src="assets/hist-ingleses.jpg" alt="Mineros ingleses de Cornualles" loading="lazy" />
            <span className="hist-step-tag">1824</span>
          </div>
          <div className="hist-step-body">
            <div className="hist-step-year">1824</div>
            <h3>Llegada de mineros ingleses</h3>
            <p>
              Expertos de Cornualles introducen nuevas técnicas y tradiciones, como el famoso
              <strong> paste</strong>. Su huella perdura hoy en la gastronomía, la arquitectura y
              hasta en el fútbol del pueblo.
            </p>
          </div>
        </div>

        <div className="hist-step reverse" data-reveal="up">
          <div className="hist-step-media">
            <img src="assets/hist-vapor.jpg" alt="Máquina de vapor de la mina La Dificultad" loading="lazy" />
            <span className="hist-step-tag">1889</span>
          </div>
          <div className="hist-step-body">
            <div className="hist-step-year">1889</div>
            <h3>Revolución tecnológica</h3>
            <p>
              Se instala en la mina <strong>La Dificultad</strong> la máquina de vapor más poderosa
              de la región, marcando el inicio de la minería industrial. El acero y el vapor
              redefinen para siempre el ritmo del trabajo bajo tierra.
            </p>
          </div>
        </div>

        <div className="hist-step" data-reveal="up">
          <div className="hist-step-media">
            <img src="assets/hist-declive.jpg" alt="Mineros del siglo XX" loading="lazy" />
            <span className="hist-step-tag">Siglo XX</span>
          </div>
          <div className="hist-step-body">
            <div className="hist-step-year">Siglo XX</div>
            <h3>Declive y preservación</h3>
            <p>
              La producción disminuye, pero la memoria no se apaga: se crean museos y archivos para
              conservar el legado minero. La identidad de Mineral del Monte se transforma de socavón
              en patrimonio.
            </p>
          </div>
        </div>

        <div className="hist-step reverse" data-reveal="up">
          <div className="hist-step-media">
            <img src="assets/hist-cierre.jpg" alt="Casa de máquinas de la Compañía Real del Monte y Pachuca" loading="lazy" />
            <span className="hist-step-tag">1983</span>
          </div>
          <div className="hist-step-body">
            <div className="hist-step-year">1983</div>
            <h3>Cierre de la Compañía Real del Monte y Pachuca</h3>
            <p>
              Finaliza la operación de la histórica empresa, pero su legado queda resguardado en el
              <strong> Archivo Histórico y Museo de Minería</strong>. Lo que un día fue industria,
              hoy es memoria viva del pueblo.
            </p>
          </div>
        </div>

        <div className="hist-step" data-reveal="up">
          <div className="hist-step-media">
            <img src="assets/hist-patrimonio.jpg" alt="Museo de sitio Mina La Dificultad" loading="lazy" />
            <span className="hist-step-tag">1990 — Actualidad</span>
          </div>
          <div className="hist-step-body">
            <div className="hist-step-year">1990 — Actualidad</div>
            <h3>Patrimonio cultural</h3>
            <p>
              La minería se convierte en atractivo turístico y cultural, con museos como la
              <strong> Mina de Acosta</strong> y la <strong>Mina La Dificultad</strong>, además de la
              <strong> Ruta de la Plata</strong>. El pasado minero renace hoy como orgullo del Pueblo Mágico.
            </p>
          </div>
        </div>

        <div className="hist-step reverse" data-reveal="up">
          <div className="hist-step-media">
            <img src="assets/hist-estatua.jpg" alt="Monumento al minero" loading="lazy" />
            <span className="hist-step-tag">1994</span>
          </div>
          <div className="hist-step-body">
            <div className="hist-step-year">1994</div>
            <h3>Nacen las primeras orfebrerías</h3>
            <p>
              Muchos años después, tras una larga tradición de talleres y orfebrerías, en 1994 surgen
              los primeros negocios de joyería en plata en el Pueblo Mágico. Poco a poco, Mineral del
              Monte se llenó de manos dedicadas a labrar el metal.
            </p>
          </div>
        </div>
      </section>

      {/* HOMENAJE — DÍA DEL MINERO */}
      <section className="hist-tribute">
        <div className="hist-tribute-bg">
          <img src="assets/hist-minero-dia.jpg" alt="Ofrenda floral al minero en su día" />
          <div className="hist-tribute-scrim"></div>
        </div>
        <div className="hist-tribute-inner" data-reveal="up">
          <div className="hist-tribute-date">
            <span className="htd-day">11</span>
            <span className="htd-month">Julio</span>
          </div>
          <div className="hist-tribute-eyebrow"><span className="star">✦</span> Día oficial del Minero en México</div>
          <h2 className="hist-tribute-title">
            Porque Platería Madrid<br/><em>reconoce el esfuerzo</em>
          </h2>
          <p className="hist-tribute-body">
            Cada 11 de julio honramos la memoria de los hombres que dedicaron su vida —y muchas veces
            la entregaron— en las entrañas de la montaña. Su sudor en la oscuridad fue el que hizo
            brotar la plata a la luz.
          </p>
          <p className="hist-tribute-body">
            Hoy, cada joya que ves brillar es un eco de su esfuerzo. A ellos, los mineros de Mineral
            del Monte, nuestro respeto eterno: <strong>sin sus manos, no existiría la nuestra.</strong>
          </p>
          <div className="hist-tribute-sign">— En memoria y gratitud, Platería Madrid</div>
        </div>
      </section>

      {/* PUENTE — Gracias a eso */}
      <section className="hist-bridge">
        <div className="hist-bridge-inner" data-reveal="up">
          <span className="hist-bridge-line"></span>
          <p className="hist-bridge-text">Gracias a eso</p>
          <span className="hist-bridge-line"></span>
        </div>
      </section>

      {/* HITO 2002 */}
      <section className="hist-founding">
        <div className="hist-founding-inner" data-reveal="up">
          <div className="hist-founding-year">2002</div>
          <h2 className="hist-founding-title">Nace <em>Platería Madrid</em></h2>
          <p className="hist-founding-body">
            En el año 2002 florece el grandioso emprendimiento: la creación de la joyería en plata
            <strong> Platería Madrid</strong>. Tras varios años en la profesión, nos hemos colocado
            entre las joyerías más reconocidas de Mineral del Monte, con una clientela satisfecha que
            regresa por el cuidado de cada pieza.
          </p>
          <p className="hist-founding-body">
            Hoy miramos al futuro: crecer aún más para ofrecer joyería en plata de la
            <strong> más alta calidad de México</strong>.
          </p>
        </div>
      </section>

      {/* CIERRE / CTA */}
      <section className="hist-cta">
        <div className="hist-cta-inner" data-reveal="up">
          <div className="hist-eyebrow"><span className="star">✦</span> Una herencia que se lleva puesta</div>
          <h2 className="hist-cta-title">Cada pieza guarda <em>470 años</em> de oficio</h2>
          <p>Descubre la colección que continúa la tradición de los orfebres de Mineral del Monte.</p>
          <div className="hist-cta-actions">
            <button className="btn btn-pop btn-lg" onClick={() => navigate({ view: "category", cat: "anillos" })}>
              Ver la colección →
            </button>
            <button className="btn btn-ghost btn-lg" onClick={() => navigate({ view: "category", cat: "argollas" })}>
              Para matrimonio
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ===================== SOPORTE / ATENCIÓN AL CLIENTE ===================== */
function SoportePage({ navigate }) {
  const wa = () => window.PLATERIA_WA.abrir("¡Hola Platería Madrid! Necesito ayuda con una consulta. 🙏");

  return (
    <div className="soporte">
      {/* HERO split */}
      <section className="sop-hero">
        <div className="sop-hero-text">
          <button className="hist-back" onClick={() => navigate({ view: "home" })}>← Volver a la tienda</button>
          <div className="sop-eyebrow">
            <WhatsAppGlyph size={16} color="#25d366" />
            Atención al cliente
          </div>
          <h1 className="sop-title">Estamos a un<br/><em>mensaje</em> de distancia</h1>
          <p className="sop-lede">
            En Platería Madrid te atendemos de manera personal por WhatsApp. Resolvemos dudas de
            tallas, grabados, disponibilidad y envíos — con la calidez de quien atiende su propia tienda.
          </p>
          <div className="sop-actions">
            <button className="sop-wa-btn" onClick={wa}>
              <WhatsAppGlyph size={20} color="#fff" />
              Escríbenos por WhatsApp
            </button>
            <div className="sop-hours">
              <span className="sop-dot"></span>
              Lun a Sáb · 10:00 – 19:00 h
            </div>
          </div>
        </div>
        <div className="sop-hero-media" data-reveal="fade">
          <img src="assets/soporte-phone.jpg" alt="Teléfono sobre mesa de madera" />
          {/* Burbuja de chat flotante sobre la pantalla del teléfono */}
          <div className="sop-phone-chat">
            <div className="spc-bubble in">¡Hola! 👋 Bienvenido a Platería Madrid</div>
            <div className="spc-bubble in">¿En qué pieza te podemos ayudar hoy?</div>
            <div className="spc-bubble out">Hola, ¿tienen argollas talla 6? 💍</div>
            <div className="spc-typing"><span></span><span></span><span></span></div>
          </div>
        </div>
      </section>

      {/* CÓMO TE AYUDAMOS */}
      <section className="sop-section">
        <div className="section-head" data-reveal="up" style={{ alignItems: "center", textAlign: "center" }}>
          <div className="section-eyebrow"><span className="star">✦</span> Cómo te ayudamos</div>
          <h2 className="section-title">Todo lo que puedes <em>consultar</em></h2>
        </div>
        <div className="sop-cards" data-reveal-group>
          {[
            { ic: "diamond", t: "Tallas y medidas", d: "Te guiamos para elegir la talla perfecta de anillos, argollas y esclavas." },
            { ic: "pencil",  t: "Grabado personalizado", d: "Nombres, fechas o iniciales — sin costo en cualquier pieza." },
            { ic: "ring",    t: "Disponibilidad", d: "Confirmamos existencias y te apartamos la pieza que te gustó." },
            { ic: "truck",   t: "Envíos y rastreo", d: "Resolvemos dudas de paquetería, tiempos y seguimiento de tu pedido." },
            { ic: "card",    t: "Pagos y MSI", d: "Te explicamos los meses sin intereses y métodos de pago con Mercado Pago." },
            { ic: "shield",  t: "Garantía y cuidado", d: "Asesoría sobre garantía de por vida y limpieza de tu plata .925." },
          ].map((c, i) => (
            <div key={i} className="sop-card" data-reveal="up">
              <div className="sop-card-ic"><Icon name={c.ic} size={22} /></div>
              <h3>{c.t}</h3>
              <p>{c.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PASOS */}
      <section className="sop-steps-wrap">
        <div className="sop-steps-inner">
          <div className="sop-steps-head" data-reveal="up">
            <div className="section-eyebrow"><span className="star">✦</span> Así de fácil</div>
            <h2 className="sop-h2">Tres pasos para <em>conversar</em></h2>
          </div>
          <div className="sop-steps" data-reveal-group>
            <div className="sop-step" data-reveal="up">
              <div className="sop-step-num">01</div>
              <h4>Toca el botón</h4>
              <p>Abre WhatsApp directo desde aquí con un mensaje listo para enviar.</p>
            </div>
            <div className="sop-step" data-reveal="up">
              <div className="sop-step-num">02</div>
              <h4>Cuéntanos</h4>
              <p>Dinos qué pieza te interesa o qué duda tienes. Sin formularios, sin esperas.</p>
            </div>
            <div className="sop-step" data-reveal="up">
              <div className="sop-step-num">03</div>
              <h4>Te atendemos</h4>
              <p>Una persona real de la tienda te responde con gusto y te acompaña en tu compra.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="sop-cta">
        <div className="sop-cta-inner" data-reveal="up">
          <WhatsAppGlyph size={48} color="#25d366" />
          <h2 className="sop-cta-title">¿List@ para <em>escribirnos</em>?</h2>
          <p>Con gusto resolvemos cualquier duda sobre nuestras piezas en plata.</p>
          <button className="sop-wa-btn lg" onClick={wa}>
            <WhatsAppGlyph size={22} color="#fff" />
            Iniciar conversación
          </button>
          <p className="sop-cta-note">Te responderemos en horario de tienda · Lun a Sáb 10:00 – 19:00 h</p>
        </div>
      </section>
    </div>
  );
}

/* ===================== GUÍA DE TALLAS ===================== */
function TallasPage({ navigate }) {
  const wa = () => window.PLATERIA_WA.abrir("¡Hola! Necesito ayuda para saber mi talla de anillo. 💍");

  return (
    <div className="tallas">
      {/* HERO */}
      <header className="tallas-hero">
        <div className="tallas-hero-bg">
          <img src="assets/tallas-mandrel.jpg" alt="Mandril y calibrador de tallas de anillo" />
          <div className="tallas-hero-scrim"></div>
        </div>
        <div className="tallas-hero-inner">
          <button className="hist-back" onClick={() => navigate({ view: "home" })}>← Volver a la tienda</button>
          <div className="hist-eyebrow"><span className="star">✦</span> Guía de tallas</div>
          <h1 className="tallas-title">Encuentra tu<br/><em>talla perfecta</em></h1>
          <p className="tallas-lede">
            Acertar la talla es el primer paso para que tu anillo se sienta como si siempre hubiera
            estado ahí. Te enseñamos a medirla en casa, con cosas que ya tienes a la mano.
          </p>
        </div>
      </header>

      {/* MÉTODOS */}
      <section className="tallas-section">
        <div className="section-head" data-reveal="up" style={{ alignItems: "center", textAlign: "center" }}>
          <div className="section-eyebrow"><span className="star">✦</span> Tres maneras sencillas</div>
          <h2 className="section-title">Mídela <em>en casa</em></h2>
        </div>

        <div className="tallas-methods" data-reveal-group>
          <div className="tallas-method" data-reveal="up">
            <div className="tm-num">01</div>
            <h3>Con un hilo o tira de papel</h3>
            <ol>
              <li>Enrolla un hilo o una tira de papel alrededor de la base del dedo.</li>
              <li>Marca con un bolígrafo el punto donde se cierra el círculo.</li>
              <li>Estira el hilo y mide los milímetros con una regla.</li>
              <li>Ese número es la <strong>circunferencia</strong>: compárala en la tabla de abajo.</li>
            </ol>
          </div>

          <div className="tallas-method" data-reveal="up">
            <div className="tm-num">02</div>
            <h3>Con un anillo que ya tengas</h3>
            <ol>
              <li>Toma un anillo que te quede bien en ese dedo.</li>
              <li>Mide el <strong>diámetro interno</strong> (de borde a borde por dentro) en milímetros.</li>
              <li>Busca ese diámetro en la tabla para conocer tu talla.</li>
              <li>Es el método más exacto si ya tienes una pieza de referencia.</li>
            </ol>
          </div>

          <div className="tallas-method" data-reveal="up">
            <div className="tm-num">03</div>
            <h3>Déjanoslo a nosotros</h3>
            <ol>
              <li>Si tienes dudas, escríbenos por WhatsApp.</li>
              <li>Te guiamos paso a paso con fotos y video.</li>
              <li>También puedes pasar a la tienda y te medimos con instrumento profesional.</li>
              <li>Así aseguramos que tu anillo quede perfecto.</li>
            </ol>
            <button className="tallas-wa" onClick={wa}>
              <WhatsAppGlyph size={18} color="#fff" />
              Pedir ayuda por WhatsApp
            </button>
          </div>
        </div>
      </section>

      {/* TABLA DE EQUIVALENCIAS */}
      <section className="tallas-table-wrap">
        <div className="tallas-table-inner">
          <div className="tallas-table-head" data-reveal="up">
            <div className="section-eyebrow"><span className="star">✦</span> Tabla de equivalencias</div>
            <h2 className="tallas-h2">De milímetros a <em>talla mexicana</em></h2>
            <p>Encuentra el diámetro o la circunferencia que mediste y lee tu talla.</p>
          </div>
          <div className="tallas-table-scroll" data-reveal="up">
            <table className="tallas-table">
              <thead>
                <tr>
                  <th>Talla (MX)</th>
                  <th>Diámetro interno</th>
                  <th>Circunferencia</th>
                  <th>US</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["4", "14.9 mm", "46.8 mm", "4"],
                  ["5", "15.7 mm", "49.3 mm", "5"],
                  ["6", "16.5 mm", "51.9 mm", "6"],
                  ["7", "17.3 mm", "54.4 mm", "7"],
                  ["8", "18.1 mm", "57.0 mm", "8"],
                  ["9", "18.9 mm", "59.5 mm", "9"],
                  ["10", "19.8 mm", "62.1 mm", "10"],
                  ["11", "20.6 mm", "64.6 mm", "11"],
                  ["12", "21.4 mm", "67.2 mm", "12"],
                ].map((row, i) => (
                  <tr key={i}>
                    <td className="tt-size">{row[0]}</td>
                    <td>{row[1]}</td>
                    <td>{row[2]}</td>
                    <td>{row[3]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* TIPS */}
      <section className="tallas-section">
        <div className="section-head" data-reveal="up" style={{ alignItems: "center", textAlign: "center" }}>
          <div className="section-eyebrow"><span className="star">✦</span> Consejos de orfebre</div>
          <h2 className="section-title">Para no <em>fallar</em></h2>
        </div>
        <div className="tallas-tips" data-reveal-group>
          {[
            { ic: "spark", t: "Mide al final del día", d: "Los dedos se hinchan ligeramente con el calor y la actividad; esa es tu medida real de uso diario." },
            { ic: "diamond", t: "Considera el nudillo", d: "Si tu nudillo es más grueso, mide ahí también y elige un punto intermedio cómodo." },
            { ic: "ring", t: "Bandas anchas, una talla más", d: "Los anillos gruesos aprietan más: si la banda es ancha, sube media o una talla." },
            { ic: "shield", t: "Evita medir con frío", d: "Con frío los dedos se encogen y la talla sale más chica de lo que en realidad necesitas." },
          ].map((c, i) => (
            <div key={i} className="tallas-tip" data-reveal="up">
              <div className="tallas-tip-ic"><Icon name={c.ic} size={20} /></div>
              <div>
                <h4>{c.t}</h4>
                <p>{c.d}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="tallas-cta">
        <div className="tallas-cta-inner" data-reveal="up">
          <h2 className="tallas-cta-title">¿Aún con <em>dudas</em>?</h2>
          <p>Escríbenos y te ayudamos a encontrar tu talla exacta antes de comprar.</p>
          <div className="tallas-cta-actions">
            <button className="tallas-wa lg" onClick={wa}>
              <WhatsAppGlyph size={20} color="#fff" />
              Pedir ayuda por WhatsApp
            </button>
            <button className="btn btn-ghost btn-lg" onClick={() => navigate({ view: "category", cat: "anillos" })}>
              Ver anillos
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ===================== MAYOREO ===================== */
function MayoreoPage({ navigate }) {
  const { formatMXN } = window.PLATERIA;
  const wa = () => window.PLATERIA_WA.abrir("¡Hola! Me interesa conocer más sobre los precios de mayoreo de Platería Madrid. 💎");

  const [monto, setMonto] = pUseState(30000);

  // Escalonado: 10k→30%, 20k→35%, 30k+→40%
  function descuentoPara(m) {
    if (m >= 30000) return 0.40;
    if (m >= 20000) return 0.35;
    if (m >= 10000) return 0.30;
    return 0;
  }
  const desc = descuentoPara(monto);
  const ahorro = Math.round(monto * desc);
  const pagas = monto - ahorro;
  const faltaSiguiente =
    monto < 10000 ? 10000 - monto :
    monto < 20000 ? 20000 - monto :
    monto < 30000 ? 30000 - monto : 0;
  const siguienteNivel =
    monto < 10000 ? "30%" :
    monto < 20000 ? "35%" :
    monto < 30000 ? "40%" : null;

  const niveles = [
    { min: 10000, desc: "30%", label: "Desde $10,000" },
    { min: 20000, desc: "35%", label: "Desde $20,000" },
    { min: 30000, desc: "40%", label: "Desde $30,000" },
  ];

  return (
    <div className="mayoreo">
      {/* HERO */}
      <header className="may-hero">
        <div className="may-hero-bg">
          <img src="assets/mayoreo-mano.jpg" alt="Selección de anillos de plata" />
          <div className="may-hero-scrim"></div>
        </div>
        <div className="may-hero-inner">
          <button className="hist-back" onClick={() => navigate({ view: "home" })}>← Volver a la tienda</button>
          <div className="hist-eyebrow"><span className="star">✦</span> Programa de mayoreo</div>
          <h1 className="may-title">Surte tu negocio<br/>con <em>plata de ley</em></h1>
          <p className="may-lede">
            Compra al mayoreo directamente del taller en Mineral del Monte y obtén hasta
            <strong> 40% de descuento</strong>. Ideal para joyerías, revendedores y quienes
            quieren iniciar su propio negocio en la plata.
          </p>
          <div className="may-actions">
            <a className="may-wa-btn" onClick={wa}>
              <WhatsAppGlyph size={20} color="#fff" />
              Hablar con un asesor
            </a>
            <a className="may-link" onClick={() => document.querySelector('.may-calc-wrap')?.scrollIntoView({ behavior: 'smooth' })}>
              Calcular mi descuento ↓
            </a>
          </div>
        </div>
      </header>

      {/* NIVELES DE DESCUENTO */}
      <section className="may-section">
        <div className="section-head" data-reveal="up" style={{ alignItems: "center", textAlign: "center" }}>
          <div className="section-eyebrow"><span className="star">✦</span> Entre más llevas, más ahorras</div>
          <h2 className="section-title">Niveles de <em>descuento</em></h2>
        </div>
        <div className="may-tiers" data-reveal-group>
          {niveles.map((n, i) => (
            <div key={i} className={"may-tier" + (i === 2 ? " featured" : "")} data-reveal="up">
              {i === 2 && <div className="may-tier-badge">Máximo ahorro</div>}
              <div className="may-tier-pct">{n.desc}</div>
              <div className="may-tier-off">de descuento</div>
              <div className="may-tier-min">En compras {n.label} MXN</div>
            </div>
          ))}
        </div>
      </section>

      {/* CALCULADORA */}
      <section className="may-calc-wrap">
        <div className="may-calc-inner">
          <div className="may-calc-head">
            <div className="section-eyebrow"><span className="star">✦</span> Calculadora de mayoreo</div>
            <h2 className="may-h2">¿Cuánto <em>pagarías</em>?</h2>
            <p>Ingresa el monto que piensas comprar a precio de tienda y descubre tu total con descuento.</p>
          </div>

          <div className="may-calc">
            <div className="may-calc-input">
              <label>Monto a precio de tienda (MXN)</label>
              <div className="may-input-field">
                <span className="may-input-prefix">$</span>
                <input
                  type="number"
                  value={monto}
                  min={0}
                  step={500}
                  onChange={(e) => setMonto(Math.max(0, parseInt(e.target.value) || 0))}
                />
              </div>
              <input
                type="range"
                className="may-slider"
                min={0} max={60000} step={500}
                value={Math.min(monto, 60000)}
                onChange={(e) => setMonto(parseInt(e.target.value))}
              />
              <div className="may-quick">
                {[10000, 20000, 30000, 50000].map(v => (
                  <button key={v} className={"may-quick-btn" + (monto === v ? " active" : "")}
                          onClick={() => setMonto(v)}>
                    {formatMXN(v)}
                  </button>
                ))}
              </div>
            </div>

            <div className="may-calc-result">
              {desc > 0 ? (
                <React.Fragment>
                  <div className="may-result-badge">{Math.round(desc * 100)}% de descuento aplicado</div>
                  <div className="may-result-row">
                    <span>Precio de tienda</span>
                    <span className="may-strike">{formatMXN(monto)}</span>
                  </div>
                  <div className="may-result-row">
                    <span>Tu ahorro</span>
                    <span className="may-save">− {formatMXN(ahorro)}</span>
                  </div>
                  <div className="may-result-total">
                    <span>Pagas en mayoreo</span>
                    <span className="may-total-val">{formatMXN(pagas)}</span>
                  </div>
                </React.Fragment>
              ) : (
                <div className="may-result-empty">
                  <div className="may-result-empty-ic"><Icon name="diamond" size={28} /></div>
                  <p>El mayoreo aplica desde <strong>{formatMXN(10000)}</strong>.</p>
                  {faltaSiguiente > 0 && (
                    <p className="may-falta">Agrega {formatMXN(faltaSiguiente)} más para obtener <strong>{siguienteNivel}</strong> de descuento.</p>
                  )}
                </div>
              )}

              {desc > 0 && faltaSiguiente > 0 && siguienteNivel && (
                <div className="may-upsell">
                  💡 Suma {formatMXN(faltaSiguiente)} más y subes a <strong>{siguienteNivel}</strong> de descuento.
                </div>
              )}
              {desc === 0.40 && (
                <div className="may-upsell max">🎉 ¡Estás en el nivel máximo de descuento!</div>
              )}

              <button className="may-wa-btn full" onClick={wa}>
                <WhatsAppGlyph size={20} color="#fff" />
                Cotizar este pedido
              </button>
            </div>
          </div>
          <p className="may-calc-note">
            * Los descuentos aplican tanto en compras en tienda como en línea, sobre el precio de
            lista. Sujeto a disponibilidad de inventario.
          </p>
        </div>
      </section>

      {/* REGLAS Y VENTAJAS DEL MAYOREO */}
      <section className="may-section">
        <div className="section-head" data-reveal="up" style={{ alignItems: "center", textAlign: "center" }}>
          <div className="section-eyebrow"><span className="star">✦</span> Más que un descuento</div>
          <h2 className="section-title">Ventajas de ser <em>mayorista</em></h2>
        </div>
        <div className="may-rules">
          <div className="may-rule">
            <div className="may-rule-ic"><Icon name="diamond" size={24} /></div>
            <div className="may-rule-num">01</div>
            <h3>Asesoría en producto</h3>
            <p>Te ayudamos a elegir las piezas más vendidas para que inviertas en lo que de verdad se mueve y tu negocio arranque con el pie derecho.</p>
          </div>
          <div className="may-rule">
            <div className="may-rule-ic"><Icon name="return" size={24} /></div>
            <div className="may-rule-num">02</div>
            <h3>Cambio de piezas</h3>
            <p>Si una pieza no logras venderla, la puedes cambiar por otra — siempre que esté en buen estado. Así nunca te quedas con inventario detenido.</p>
          </div>
          <div className="may-rule">
            <div className="may-rule-ic"><Icon name="shield" size={24} /></div>
            <div className="may-rule-num">03</div>
            <h3>Precio de cartera de por vida</h3>
            <p>Al entrar a nuestra cartera de mayoristas, conservas el mismo precio preferencial siempre — aunque después compres una sola pieza, la que sea.</p>
          </div>
        </div>
      </section>

      {/* BENEFICIOS + GALERÍA */}
      <section className="may-section" style={{ paddingTop: 0 }}>
        <div className="may-benefits-grid">
          <div className="may-benefits" data-reveal="up">
            <div className="section-eyebrow"><span className="star">✦</span> Por qué comprar con nosotros</div>
            <h2 className="may-h2 dark">Plata de origen,<br/><em>precio de origen</em></h2>
            <ul className="may-benefit-list">
              <li><div className="mbl-ic"><Icon name="diamond" size={18} /></div><div><strong>Plata .925 certificada</strong>Punzonada pieza por pieza en nuestro taller.</div></li>
              <li><div className="mbl-ic"><Icon name="ring" size={18} /></div><div><strong>Catálogo completo</strong>Anillos, cadenas, dijes, esclavas, religiosos y más.</div></li>
              <li><div className="mbl-ic"><Icon name="truck" size={18} /></div><div><strong>Envíos a todo México</strong>Empaque seguro y entregas programadas.</div></li>
              <li><div className="mbl-ic"><Icon name="card" size={18} /></div><div><strong>Pagos flexibles</strong>Acepta Mercado Pago y transferencia.</div></li>
            </ul>
          </div>
          <div className="may-gallery" data-reveal="up">
            <div className="may-gal-item tall"><img src="assets/mayoreo-cajas.jpg" alt="Anillos en exhibición" loading="lazy" /></div>
            <div className="may-gal-item"><img src="assets/mayoreo-solitario.jpg" alt="Solitarios de plata" loading="lazy" /></div>
            <div className="may-gal-item"><img src="assets/mayoreo-ambar.jpg" alt="Anillos de ámbar" loading="lazy" /></div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="may-cta">
        <div className="may-cta-inner" data-reveal="up">
          <WhatsAppGlyph size={48} color="#25d366" />
          <h2 className="may-cta-title">Empecemos tu <em>negocio</em></h2>
          <p>Cuéntanos qué piezas te interesan y te armamos una cotización de mayoreo a tu medida.</p>
          <button className="may-wa-btn lg" onClick={wa}>
            <WhatsAppGlyph size={22} color="#fff" />
            Solicitar cotización
          </button>
        </div>
      </section>
    </div>
  );
}

/* ===================== CAMBIOS Y DEVOLUCIONES ===================== */
function DevolucionesPage({ navigate }) {
  const wa = () => window.PLATERIA_WA.abrir("¡Hola! Tengo una duda sobre la política de cambios. 🙏");

  return (
    <div className="devol">
      {/* HERO split: imagen sticky + intro */}
      <section className="dev-hero">
        <div className="dev-hero-media" data-reveal="fade">
          <img src="assets/devoluciones-hero.jpg" alt="Política de cambios y garantía" />
          {/* Conversación de WhatsApp sobre el espacio oscuro del teléfono */}
          <div className="dev-phone-chat">
            <div className="spc-bubble out">Hola 👋 ¿Puedo cambiar un anillo que compré?</div>
            <div className="spc-bubble in">¡Claro! Tienes 15 días y la pieza debe estar sin uso 💍</div>
            <div className="spc-bubble out">¿Y si fue compra en línea?</div>
            <div className="spc-bubble in">Nos escribes por aquí con tu N° de orden y te guiamos ✨</div>
            <div className="spc-typing"><span></span><span></span><span></span></div>
          </div>
          <div className="dev-hero-tag">
            <span className="dev-tag-clock">⏱</span>
            15 días para cambios
          </div>
        </div>
        <div className="dev-hero-text">
          <button className="hist-back" onClick={() => navigate({ view: "home" })}>← Volver a la tienda</button>
          <div className="hist-eyebrow"><span className="star">✦</span> Cambios y garantía</div>
          <h1 className="dev-title">Compra con<br/><em>total tranquilidad</em></h1>
          <p className="dev-lede">
            En Platería Madrid queremos que ames cada una de tus piezas de plata. Por el momento
            <strong> no realizamos devoluciones ni reembolsos</strong>, pero sí te ofrecemos el
            <strong> cambio de tu pieza</strong> y garantía por defectos de fabricación. Aquí te lo
            explicamos claro y sin letras chiquitas.
          </p>
          <div className="dev-pills">
            <span className="dev-pill"><strong>15</strong> días para cambios</span>
            <span className="dev-pill"><strong>30</strong> días de garantía</span>
            <span className="dev-pill">Cambio por otra pieza</span>
          </div>
        </div>
      </section>

      {/* POLÍTICA EN PASOS */}
      <section className="dev-body">
        {/* 01 Plazo */}
        <article className="dev-block" data-reveal="up">
          <div className="dev-block-num">01</div>
          <div className="dev-block-content">
            <h2>Plazo para solicitar tu cambio</h2>
            <p>
              Tienes <strong>15 días naturales</strong> a partir de la fecha de compra —o de la
              entrega del pedido, si fue compra en línea— para solicitar el <strong>cambio</strong> de
              tu pieza. Te recomendamos revisar tu joya en cuanto la recibas.
            </p>
            <div className="dev-note">
              <span className="dev-note-ic">!</span>
              <div>
                <strong>Importante:</strong> por el momento <em>no aceptamos devoluciones ni hacemos
                reembolsos</em> en efectivo o a tarjeta. Lo que sí ofrecemos es el cambio de tu pieza
                por otra de igual o mayor valor.
              </div>
            </div>
          </div>
        </article>

        {/* 02 Condiciones */}
        <article className="dev-block" data-reveal="up">
          <div className="dev-block-num">02</div>
          <div className="dev-block-content">
            <h2>Condiciones del producto</h2>
            <p>Para poder proceder, la joya debe cumplir con lo siguiente:</p>
            <ul className="dev-check">
              <li>Estar en <strong>perfectas condiciones</strong>, sin señales de uso, rayaduras ni desgaste.</li>
              <li>Conservar su <strong>empaque original</strong> (caja, bolsa de terciopelo) y etiquetas.</li>
              <li>Presentar el <strong>ticket de compra</strong>, nota de remisión o número de pedido en línea.</li>
            </ul>
          </div>
        </article>

        {/* 03 Aplica / No aplica */}
        <article className="dev-block" data-reveal="up">
          <div className="dev-block-num">03</div>
          <div className="dev-block-content">
            <h2>¿Qué aplica y qué no?</h2>
            <div className="dev-split">
              <div className="dev-split-card yes">
                <div className="dss-head"><span className="dss-ic">✓</span> Sí se puede cambiar</div>
                <ul>
                  <li>Anillos, cadenas, pulseras, dijes y esclavas sin uso</li>
                  <li>Piezas con su empaque y etiquetas completas</li>
                  <li>Solicitudes dentro de los 15 días posteriores a la compra</li>
                </ul>
              </div>
              <div className="dev-split-card no">
                <div className="dss-head"><span className="dss-ic">✕</span> No aplica cambio</div>
                <ul>
                  <li><strong>Aretes y pendientes</strong> (por salud e higiene)</li>
                  <li>Piezas <strong>personalizadas o grabadas</strong> a petición</li>
                  <li>Joyas modificadas en talla o diseño fuera de nuestro taller</li>
                  <li>Productos de <strong>Liquidación o Rebajas</strong></li>
                </ul>
              </div>
            </div>
          </div>
        </article>

        {/* 04 Cómo realizar el proceso */}
        <article className="dev-block" data-reveal="up">
          <div className="dev-block-num">04</div>
          <div className="dev-block-content">
            <h2>¿Cómo realizar el proceso?</h2>
            <div className="dev-process">
              <div className="dev-proc-card">
                <div className="dpc-ic"><Icon name="diamond" size={20} /></div>
                <h3>En tienda física</h3>
                <p>Visítanos con la pieza en su empaque original y tu ticket. El cambio se realiza al momento, sujeto a disponibilidad de inventario.</p>
              </div>
              <div className="dev-proc-card">
                <div className="dpc-ic"><WhatsAppGlyph size={20} color="#141312" /></div>
                <h3>En compras en línea</h3>
                <p>Escríbenos por WhatsApp con tu número de orden y fotos de la pieza. Te damos las instrucciones de envío para realizar tu cambio. Los costos de envío corren por cuenta del cliente, salvo que el producto haya llegado defectuoso.</p>
                <button className="dev-wa" onClick={wa}>
                  <WhatsAppGlyph size={16} color="#fff" /> Iniciar mi solicitud
                </button>
              </div>
            </div>
          </div>
        </article>

        {/* 05 Opciones de cambio */}
        <article className="dev-block" data-reveal="up">
          <div className="dev-block-num">05</div>
          <div className="dev-block-content">
            <h2>Opciones de cambio</h2>
            <ul className="dev-check">
              <li><strong>Cambio por otra pieza del mismo valor:</strong> elige cualquier otra joya equivalente y te la llevas al instante.</li>
              <li><strong>Cambio por una pieza de mayor valor:</strong> solo pagas la diferencia.</li>
              <li><strong>Cambio por una pieza de menor valor:</strong> te entregamos un <strong>cupón de crédito</strong> por la diferencia, para que lo uses en tu próxima compra.</li>
            </ul>
          </div>
        </article>

        {/* 06 Garantía */}
        <article className="dev-block dev-warranty" data-reveal="up">
          <div className="dev-block-num">06</div>
          <div className="dev-block-content">
            <h2>Garantía por defectos de fabricación</h2>
            <p>
              Todas nuestras piezas cuentan con <strong>30 días de garantía</strong> por defectos de
              fabricación (por ejemplo, un broche defectuoso o una soldadura frágil). En esos casos
              reparamos o cambiamos tu pieza sin costo.
            </p>
            <div className="dev-note">
              <span className="dev-note-ic">!</span>
              <div>
                <strong>Importante:</strong> la garantía no cubre el <em>oscurecimiento natural de la
                plata</em> (sulfuración) —un proceso normal del metal que se soluciona con una limpieza
                adecuada— ni los daños por mal uso (cadenas rotas por jalones, golpes o contacto con químicos).
              </div>
            </div>
          </div>
        </article>
      </section>

      {/* CTA */}
      <section className="dev-cta">
        <div className="dev-cta-inner" data-reveal="up">
          <h2 className="dev-cta-title">¿Tienes una <em>duda puntual</em>?</h2>
          <p>Con gusto te orientamos sobre tu cambio o garantía.</p>
          <div className="dev-cta-actions">
            <button className="dev-wa lg" onClick={wa}>
              <WhatsAppGlyph size={20} color="#fff" /> Escríbenos por WhatsApp
            </button>
            <button className="btn btn-ghost btn-lg" onClick={() => navigate({ view: "soporte" })}>
              Atención al cliente
            </button>
          </div>
          <p className="dev-cta-note">Política vigente · Platería Madrid · Mineral del Monte, Hidalgo</p>
        </div>
      </section>
    </div>
  );
}

/* ===================== ENVÍOS ===================== */
function EnviosPage({ navigate }) {
  const wa = () => window.PLATERIA_WA.abrir("¡Hola! Tengo una duda sobre el envío de mi pedido. 📦");

  // ===== Cielo dinámico: día / noche según la hora =====
  // ===== Cielo dinámico: día / atardecer / noche según la hora =====
  const [sky, setSky] = pUseState("day"); // "day" | "sunset" | "night"
  const [raining, setRaining] = pUseState(false);
  const [delivery, setDelivery] = pUseState("play"); // "play" | "rest"

  pUseEffect(() => {
    // Mini-video de entrega: corre una vez (~16s) y luego el camión descansa estacionado
    const t = setTimeout(() => setDelivery("rest"), 16200);
    return () => clearTimeout(t);
  }, []);

  pUseEffect(() => {
    // Día: 8:00–15:59 · Atardecer: 16:00–18:59 · Noche: 19:00–7:59
    function evalSky() {
      const h = new Date().getHours();
      if (h >= 8 && h < 16) setSky("day");
      else if (h >= 16 && h < 19) setSky("sunset");
      else setSky("night");
    }
    evalSky();
    const dayTimer = setInterval(evalSky, 60000); // re-evalúa cada minuto
    return () => clearInterval(dayTimer);
  }, []);

  pUseEffect(() => {
    // Ciclo de lluvia: llueve 1 min, despeja 10 min, y vuelve a llover
    const RAIN_MS = 60000;     // 1 minuto lloviendo
    const CLEAR_MS = 600000;   // 10 minutos despejado
    let timer;
    function startRain() {
      setRaining(true);
      timer = setTimeout(() => {
        setRaining(false);
        timer = setTimeout(startRain, CLEAR_MS);
      }, RAIN_MS);
    }
    // primera lluvia tras 10 min de gracia para que se aprecie el cielo despejado
    timer = setTimeout(startRain, CLEAR_MS);
    return () => clearTimeout(timer);
  }, []);

  // Gotas de lluvia (posiciones fijas)
  const drops = pUseMemo(() => Array.from({ length: 60 }, (_, i) => ({
    left: (i * 1.7 + (i % 5) * 3) % 100,
    delay: (i % 12) * 0.09,
    dur: 0.5 + (i % 6) * 0.08,
  })), []);
  // Estrellas para la noche
  const stars = pUseMemo(() => Array.from({ length: 40 }, (_, i) => ({
    left: (i * 2.6 + (i % 7) * 4) % 100,
    top: (i * 3.1 + (i % 5) * 6) % 70,
    size: 1 + (i % 3),
    delay: (i % 10) * 0.3,
  })), []);

  return (
    <div className="envios">
      {/* HERO con animación de camión */}
      <header className="env-hero">
        <div className="env-hero-inner">
          <button className="hist-back" onClick={() => navigate({ view: "home" })}>← Volver a la tienda</button>
          <div className="hist-eyebrow"><span className="star">✦</span> Envíos</div>
          <h1 className="env-title">Tu plata viaja<br/><em>segura a casa</em></h1>
          <p className="env-lede">
            Realizamos envíos a <strong>toda la República Mexicana</strong> a través de
            <strong> DHL</strong>, con empaque protegido y rastreo en cada paso del camino.
          </p>
        </div>

        {/* ESCENA ANIMADA */}
        <div className={"env-scene " + sky + (raining ? " rain" : "")} aria-hidden="true">
          {/* Cielo: sol (día/atardecer) o luna + estrellas (noche) */}
          <div className="env-sky">
            {sky === "night" ? (
              <React.Fragment>
                <div className="env-moon"><span className="env-moon-crater m1"></span><span className="env-moon-crater m2"></span><span className="env-moon-crater m3"></span></div>
                {stars.map((s, i) => (
                  <span key={i} className="env-star" style={{ left: s.left + "%", top: s.top + "%", width: s.size + "px", height: s.size + "px", animationDelay: s.delay + "s" }}></span>
                ))}
              </React.Fragment>
            ) : (
              <div className="env-sun"><span className="env-sun-glow"></span></div>
            )}
            {/* Nubes que cruzan toda la pantalla en bucle */}
            <span className="env-cloud c1"></span>
            <span className="env-cloud c2"></span>
            <span className="env-cloud c3"></span>
            <span className="env-cloud c4"></span>
            <span className="env-cloud c5"></span>
          </div>

          {/* Lluvia */}
          <div className="env-rain">
            {drops.map((d, i) => (
              <span key={i} className="env-drop" style={{ left: d.left + "%", animationDelay: d.delay + "s", animationDuration: d.dur + "s" }}></span>
            ))}
          </div>

          <div className={"env-truck-track delivery-" + delivery}>
            {/* Tienda de salida (azul) */}
            <div className="env-store">
              <div className="env-store-roof"></div>
              <div className="env-store-sign">PLATERÍA</div>
              <div className="env-store-awning"></div>
              <div className="env-store-body">
                <div className="env-store-door"></div>
              </div>
            </div>

            {/* Casa de destino */}
            <div className="env-house">
              <div className="env-house-roof"></div>
              <div className="env-house-body">
                <div className="env-house-window"></div>
                <div className="env-house-door"></div>
              </div>
            </div>

            {/* Paquete que la tienda lanza al camión */}
            <div className="env-pkg"><span className="env-box-tape"></span></div>

            {/* Caja entregada a la casa */}
            <div className="env-box">
              <span className="env-box-tape"></span>
            </div>

            <div className="env-truck">
              {/* Estela de velocidad */}
              <span className="env-speed s1"></span>
              <span className="env-speed s2"></span>
              <span className="env-speed s3"></span>
              {/* Camión SVG estilo DHL (mira a la DERECHA: cabina a la derecha, puerta trasera a la izquierda) */}
              <svg viewBox="0 0 220 120" width="240" className="env-truck-svg">
                {/* Caja de carga (izquierda) */}
                <rect x="20" y="34" width="138" height="62" rx="4" fill="#ffcc00" stroke="#141312" strokeWidth="3"/>
                {/* Líneas DHL */}
                <text x="48" y="76" fontFamily="Hanken Grotesk, sans-serif" fontSize="26" fontWeight="800" fill="#d40511" fontStyle="italic">DHL</text>
                {/* Cabina (derecha) */}
                <path d="M158 96 V52 H186 L214 72 V96 Z" fill="#ffcc00" stroke="#141312" strokeWidth="3" strokeLinejoin="round"/>
                {/* Ventana */}
                <path d="M186 56 H204 L214 70 H186 Z" fill="#cfe8ff" stroke="#141312" strokeWidth="2.5" strokeLinejoin="round"/>
                {/* Puerta trasera (izquierda) que se abre */}
                <rect className="env-truck-door" x="19" y="36" width="7" height="58" rx="1" fill="#e6b800" stroke="#141312" strokeWidth="2.5"/>
                {/* Ruedas */}
                <circle cx="60" cy="100" r="16" fill="#141312"/>
                <circle cx="60" cy="100" r="6" fill="#8a8479"/>
                <circle cx="160" cy="100" r="16" fill="#141312"/>
                <circle cx="160" cy="100" r="6" fill="#8a8479"/>
              </svg>
            </div>
          </div>

          {/* Carretera */}
          <div className="env-road">
            <div className="env-road-dashes"></div>
          </div>
        </div>
      </header>

      {/* FRANJA DE DATOS */}
      <section className="env-strip">
        <div className="env-strip-inner">
          <div className="env-stat" data-reveal="up">
            <div className="env-stat-ic"><Icon name="truck" size={24} /></div>
            <div className="env-stat-num">DHL</div>
            <div className="env-stat-label">Paquetería oficial</div>
          </div>
          <div className="env-stat" data-reveal="up">
            <div className="env-stat-ic"><Icon name="diamond" size={24} /></div>
            <div className="env-stat-num">2–5</div>
            <div className="env-stat-label">Días hábiles</div>
          </div>
          <div className="env-stat" data-reveal="up">
            <div className="env-stat-ic"><Icon name="shield" size={24} /></div>
            <div className="env-stat-num">100%</div>
            <div className="env-stat-label">Asegurado</div>
          </div>
          <div className="env-stat" data-reveal="up">
            <div className="env-stat-ic"><Icon name="spark" size={24} /></div>
            <div className="env-stat-num">MX</div>
            <div className="env-stat-label">Cobertura nacional</div>
          </div>
        </div>
      </section>

      {/* DETALLE */}
      <section className="env-section">
        <div className="env-cards">
          <article className="env-card" data-reveal="up">
            <div className="env-card-ic"><Icon name="truck" size={22} /></div>
            <h3>Envíos a todo México por DHL</h3>
            <p>
              Todos nuestros pedidos se envían exclusivamente por <strong>DHL</strong> a cualquier
              estado de la <strong>República Mexicana</strong>. Elegimos a DHL por su seguridad,
              cobertura y rapidez para que tu joya llegue en perfectas condiciones.
            </p>
          </article>
          <article className="env-card" data-reveal="up">
            <div className="env-card-ic"><Icon name="diamond" size={22} /></div>
            <h3>Tiempos de entrega</h3>
            <p>
              El tiempo estimado es de <strong>2 a 5 días hábiles</strong> una vez confirmado tu
              pago, dependiendo de tu ciudad. En zonas extendidas puede tomar un par de días más.
            </p>
          </article>
          <article className="env-card" data-reveal="up">
            <div className="env-card-ic"><Icon name="ship" size={22} /></div>
            <h3>Rastreo en tiempo real</h3>
            <p>
              En cuanto tu pedido sale del taller, te compartimos tu <strong>número de guía DHL</strong>
              para que sigas tu paquete en cada paso, hasta que toque tu puerta.
            </p>
          </article>
          <article className="env-card" data-reveal="up">
            <div className="env-card-ic"><Icon name="shield" size={22} /></div>
            <h3>Empaque seguro y discreto</h3>
            <p>
              Cada pieza viaja en su estuche, protegida y en empaque discreto y asegurado, para que
              llegue intacta y lista para regalar o presumir.
            </p>
          </article>
        </div>
      </section>

      {/* NOTA */}
      <section className="env-section" style={{ paddingTop: 0 }}>
        <div className="env-note" data-reveal="up">
          <span className="env-note-ic"><Icon name="spark" size={18} /></span>
          <div>
            <strong>Por ahora solo enviamos dentro de México.</strong> Estamos trabajando para llevar
            la plata de Mineral del Monte más lejos muy pronto. ¿Dudas con tu envío? Escríbenos y te ayudamos.
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="env-cta">
        <div className="env-cta-inner" data-reveal="up">
          <WhatsAppGlyph size={48} color="#25d366" />
          <h2 className="env-cta-title">¿Dudas con tu <em>envío</em>?</h2>
          <p>Escríbenos por WhatsApp y con gusto rastreamos tu pedido o resolvemos cualquier duda.</p>
          <button className="dev-wa lg" onClick={wa}>
            <WhatsAppGlyph size={20} color="#fff" /> Escríbenos por WhatsApp
          </button>
        </div>
      </section>
    </div>
  );
}

/* ===================== COLECCIÓN (categorías) ===================== */
function ColeccionPage({ navigate }) {
  const cats = [
    { id: "anillos",    name: "Anillos",    img: "cat-anillos",    n: "01", blurb: "Solitarios, sellos y diseño" },
    { id: "aretes",     name: "Aretes",     img: "cat-aretes",     n: "02", blurb: "Studs, arracadas y candongas" },
    { id: "pulseras",   name: "Pulsos",     img: "cat-pulseras",   n: "03", blurb: "Tejidos finos en plata" },
    { id: "brazaletes", name: "Brazaletes", img: "cat-brazaletes", n: "04", blurb: "Presencia sólida y rotunda" },
    { id: "cadenas",    name: "Cadenas",    img: "cat-cadenas",    n: "05", blurb: "Clásicas y contemporáneas" },
    { id: "dijes",      name: "Dijes",      img: "cat-dijes",      n: "06", blurb: "Detalles que cuentan historia" },
    { id: "esclavas",   name: "Esclavas",   img: "cat-esclavas",   n: "07", blurb: "Grabadas al detalle" },
    { id: "relojes",    name: "Relojes",    img: "cat-relojes",    n: "08", blurb: "Mecánica fina y atemporal" },
    { id: "argollas",   name: "Argollas",   img: "cat-argollas",   n: "09", blurb: "Para una sola historia" },
  ];

  return (
    <div className="coleccion">
      <header className="col-head">
        <button className="hist-back" onClick={() => navigate({ view: "home" })}>← Volver a la tienda</button>
        <div className="hist-eyebrow"><span className="star">✦</span> Colección · Plata ley .925</div>
        <h1 className="col-title">Explora por <em>categoría</em></h1>
        <p className="col-lede">
          Cada familia tiene su versión para dama y caballero. Elige una categoría para descubrir
          todas nuestras piezas, talladas a mano en Mineral del Monte.
        </p>
      </header>

      <section className="col-grid-wrap">
        <div className="col-grid">
          {cats.map((c) => (
            <button key={c.id} className="col-card" onClick={() => navigate({ view: "category", cat: c.id })}>
              <div className="col-card-img">
                <img src={`assets/${c.img}.jpg`} alt={c.name} loading="lazy" />
                <span className="col-card-num">{c.n}</span>
              </div>
              <div className="col-card-overlay">
                <div className="col-card-inner">
                  <h3>{c.name}</h3>
                  <p>{c.blurb}</p>
                  <span className="col-card-cta">Ver categoría <span className="ccc-arrow">→</span></span>
                </div>
              </div>
              <div className="col-card-bar">
                <span className="ccb-name">{c.name}</span>
                <span className="ccb-plus">+</span>
              </div>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}

/* ===================== CUIDADO DE LA PLATA ===================== */
function CuidadoPage({ navigate }) {
  const wa = () => window.PLATERIA_WA.abrir("¡Hola! Tengo una duda sobre el cuidado de mi pieza de plata. 🤍");
  return (
    <div className="cuidado">
      <header className="col-head">
        <button className="hist-back" onClick={() => navigate({ view: "home" })}>← Volver a la tienda</button>
        <div className="hist-eyebrow"><span className="star">✦</span> Cuidado del producto</div>
        <h1 className="col-title">El cuidado de tu <em>plata .925</em></h1>
        <p className="col-lede">
          La plata es un metal vivo: con el paso del tiempo y el contacto con el ambiente puede
          oscurecerse. No es un defecto, sino una reacción natural — el azufre y la humedad del aire
          forman una capa oscura sobre la superficie. Con cuidados muy sencillos, tu pieza recupera su
          brillo y te acompaña toda la vida.
        </p>
      </header>

      <section className="cuid-body">
        <div className="hist-care-grid">
          <div className="care-col care-do" data-reveal="up">
            <span className="care-tag">Cuidados</span>
            <h3 className="care-col-title">Cómo conservar su brillo</h3>
            <ul className="care-list">
              <li>
                <span className="care-bullet do">✓</span>
                <span><strong>Guárdala seca y aislada.</strong> En su estuche o en una bolsa de tela, lejos de la humedad y separada de otras piezas para que no se rayen entre sí.</span>
              </li>
              <li>
                <span className="care-bullet do">✓</span>
                <span><strong>Sécala después de usarla.</strong> Pásale un paño suave y seco para retirar el sudor y los aceites de la piel antes de guardarla.</span>
              </li>
              <li>
                <span className="care-bullet do">✓</span>
                <span><strong>Póntela al final.</strong> Después del perfume, la crema y el maquillaje — nunca antes.</span>
              </li>
              <li>
                <span className="care-bullet do">✓</span>
                <span><strong>Limpieza profunda en casa.</strong> Agua tibia con un poco de jabón neutro, frota con suavidad y seca por completo.</span>
              </li>
              <li>
                <span className="care-bullet do">✓</span>
                <span><strong>Úsala seguido.</strong> El contacto natural con la piel ayuda a mantener su brillo y a evitar que se oscurezca.</span>
              </li>
            </ul>
          </div>

          <div className="care-col care-risk" data-reveal="up">
            <span className="care-tag risk">Qué la daña</span>
            <h3 className="care-col-title">Riesgos que oscurecen la plata</h3>
            <ul className="care-list">
              <li>
                <span className="care-bullet risk">✕</span>
                <span><strong>Perfumes, cremas y maquillaje.</strong> Sus químicos aceleran el oscurecimiento y dejan residuo sobre el metal.</span>
              </li>
              <li>
                <span className="care-bullet risk">✕</span>
                <span><strong>Cloro y agua salada.</strong> Quítatela antes de la alberca, el mar y la regadera; manchan y opacan la plata.</span>
              </li>
              <li>
                <span className="care-bullet risk">✕</span>
                <span><strong>Productos de limpieza.</strong> Cloro, amoniaco y desinfectantes del hogar pueden corroer la superficie.</span>
              </li>
              <li>
                <span className="care-bullet risk">✕</span>
                <span><strong>Humedad y sudor.</strong> Guardarla mojada o en ambientes húmedos acelera la oxidación natural del metal.</span>
              </li>
              <li>
                <span className="care-bullet risk">✕</span>
                <span><strong>Golpes y superficies duras.</strong> Caídas o roce con otras piezas pueden deformar, rayar o aflojar las piedras.</span>
              </li>
            </ul>
          </div>
        </div>

        <p className="hist-care-note">
          ¿Tu pieza perdió brillo? No te preocupes — escríbenos y te asesoramos sobre cómo devolverle
          su lustre. Toda nuestra joyería en plata .925 cuenta con <strong>garantía de por vida</strong>.
        </p>
      </section>

      {/* CTA */}
      <section className="hist-cta">
        <div className="hist-cta-inner" data-reveal="up">
          <div className="hist-eyebrow"><span className="star">✦</span> ¿Aún tienes dudas?</div>
          <h2 className="hist-cta-title">Te ayudamos a <em>cuidar</em> tu plata</h2>
          <p>Escríbenos por WhatsApp y con gusto te asesoramos sobre la limpieza y el cuidado de cada pieza.</p>
          <div className="hist-cta-actions">
            <button className="btn btn-pop btn-lg" onClick={wa}>Escríbenos por WhatsApp →</button>
            <button className="btn btn-ghost btn-lg" onClick={() => navigate({ view: "coleccion" })}>
              Ver la colección
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

Object.assign(window, {
  HomePage, CategoryPage, ProductPage, CheckoutPage, ConfirmationPage, HistoriaPage, SoportePage, TallasPage, MayoreoPage, DevolucionesPage, EnviosPage, ColeccionPage, CuidadoPage,
});
