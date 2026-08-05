/* =========================================================
   VELAS STUDIO — app.js
   Vanilla JS. All state persisted to localStorage.
   ========================================================= */
(function () {
  "use strict";

  /* ---------------------------------------------------------
     STORAGE KEYS
     --------------------------------------------------------- */
  const LS_KEYS = {
    welcomed: "vs_welcomed",
    checklistProduccion: "vs_checklist_produccion",
    checklistVenta: "vs_checklist_venta",
    lastScreen: "vs_last_screen",
  };

  /* ---------------------------------------------------------
     CONTENT DATA
     --------------------------------------------------------- */
  const CHECKLIST_PRODUCCION = [
    "Moldes limpios",
    "Cera pesada",
    "Fragancia preparada",
    "Colorante listo",
    "Temperatura correcta",
    "Recipientes preparados",
    "Etiquetas listas",
  ];

  const CHECKLIST_VENTA = [
    "Fotos con buena luz",
    "Precio calculado",
    "Empaque revisado",
    "Descripción del producto lista",
    "Publicación programada",
    "Método de pago definido",
  ];

  const TIPS = [
    { title: "Elegí el pabilo correcto", body: "Un pabilo muy fino deja la vela con un pozo de cera sin quemar; uno muy grueso genera humo y una llama inestable. Hacé pruebas pequeñas antes de producir en volumen." },
    { title: "Menos fragancia es más", body: "Superar el porcentaje recomendado por el fabricante no intensifica el aroma en frío, y puede afectar la combustión. Respetá siempre la ficha técnica de tu esencia." },
    { title: "Fotografiá con luz natural", body: "La luz de ventana, sin flash directo, resalta la textura de la cera y los colores reales. Es la forma más simple de mejorar tus fotos de producto sin invertir en equipo." },
    { title: "Cobrá tu tiempo, no solo los materiales", body: "El precio de una vela no es solo la suma de insumos: tu tiempo de preparación, curado y empaque también tiene valor. Usá la calculadora para no subestimarlo." },
    { title: "Llevá un registro simple", body: "Anotar qué combinaciones de cera, pabilo y fragancia funcionaron mejor te ahorra tiempo en cada nueva producción y te ayuda a mantener la consistencia." },
  ];

  const FAQ = [
    { q: "¿Cuánto dura el curado de una vela?", a: "Depende del tipo de cera: la de soja suele necesitar entre 24 y 72 horas, mientras que otras ceras pueden requerir hasta dos semanas para liberar todo su aroma." },
    { q: "¿Por qué mi vela se hunde en el centro?", a: "Es normal en ceras de soja por la contracción al enfriar. Un segundo vertido fino sobre la superficie, una vez fría la primera capa, corrige el acabado." },
    { q: "¿Cómo elijo el precio de venta?", a: "Sumá todos tus costos de producción, agregá el margen que buscás obtener y usá la calculadora de esta app para automatizar el cálculo por unidad." },
    { q: "¿Qué recipientes puedo reutilizar?", a: "Vidrios sin grietas que resistan calor son ideales. Limpiá bien los restos de cera anterior con agua caliente antes de reutilizarlos." },
    { q: "¿Necesito colorante para vender bien?", a: "No es obligatorio. Muchas marcas artesanales destacan justamente por el color natural de la cera; el colorante es una decisión estética, no técnica." },
  ];

  const SAFETY = [
    "Nunca dejes la cera derritiéndose sin supervisión.",
    "Usá guantes y protegé la superficie de trabajo del calor.",
    "Mantené el área ventilada mientras trabajás con fragancias.",
    "Ten siempre un extintor o manta ignífuga cerca de tu zona de trabajo.",
    "No viertas cera caliente por el desagüe: dejala enfriar y desechala en sólidos.",
    "Etiquetá tus velas con advertencias de uso para tus clientes.",
  ];

  const QUOTES = [
    "Cada vela que enciendes es una pequeña prueba de que tu constancia se nota.",
    "Lo artesanal no compite en velocidad, compite en detalle.",
    "Un buen producto se construye repitiendo el mismo cuidado, una y otra vez.",
    "Tu taller de hoy es el negocio que estás construyendo para mañana.",
    "La consistencia en tus procesos es lo que tus clientes reconocerán como calidad.",
    "Cada lote que curás con paciencia mejora el siguiente.",
  ];

  /* ---------------------------------------------------------
     INSPIRACIÓN — illustrated gallery data
     Self-contained SVG illustrations (no external images),
     so the gallery works fully offline and without licensing
     concerns.
     --------------------------------------------------------- */
  function buildCandleSVG(cfg) {
    const {
      jar = "#7C5CFF",
      jarDeep = "#5F41E0",
      rim = "#F8F5EF",
      band = "#C5A46D",
      flameOuter = "#DEC596",
      flameInner = "#C5A46D",
      decor = "none",
      jarWidthRatio = 0.42,
      jarHeightRatio = 0.36,
    } = cfg;

    const size = 100;
    const cx = size / 2;
    const jarW = size * jarWidthRatio;
    const jarH = size * jarHeightRatio;
    const jarTop = size * 0.52;
    const jarBottom = jarTop + jarH;
    const jarLeft = cx - jarW / 2;
    const jarRight = cx + jarW / 2;
    const r = jarW * 0.16;
    const rimH = jarH * 0.2;
    const wickTop = size * 0.30;

    let decorMarkup = "";

    if (decor === "leaves") {
      decorMarkup = `
        <path d="M${jarLeft + jarW * 0.04} ${jarBottom - jarH * 0.05} q-10 -4 -13 -14 q11 1 16 9 q2 3 -3 5z" fill="#335A49"/>
        <path d="M${jarRight - jarW * 0.04} ${jarBottom - jarH * 0.05} q10 -4 13 -14 q-11 1 -16 9 q-2 3 3 5z" fill="#5C856F"/>
        <circle cx="${cx}" cy="${jarTop - 4}" r="2.4" fill="#7C5CFF"/>
      `;
    } else if (decor === "dots") {
      decorMarkup = `
        <circle cx="${jarLeft + jarW * 0.22}" cy="${jarTop + rimH + jarH * 0.28}" r="2.2" fill="#7C5CFF"/>
        <circle cx="${jarLeft + jarW * 0.5}" cy="${jarTop + rimH + jarH * 0.5}" r="2.6" fill="#F8F5EF"/>
        <circle cx="${jarLeft + jarW * 0.76}" cy="${jarTop + rimH + jarH * 0.32}" r="1.8" fill="#7C5CFF"/>
        <circle cx="${jarLeft + jarW * 0.62}" cy="${jarTop + rimH + jarH * 0.62}" r="1.6" fill="#F8F5EF"/>
      `;
    } else if (decor === "ring") {
      decorMarkup = `
        <rect x="${jarLeft}" y="${jarTop + rimH + jarH * 0.14}" width="${jarW}" height="${jarH * 0.05}" fill="${band}"/>
        <rect x="${jarLeft}" y="${jarTop + rimH + jarH * 0.26}" width="${jarW}" height="${jarH * 0.02}" fill="${band}" opacity="0.6"/>
      `;
    } else if (decor === "sprig") {
      decorMarkup = `
        <path d="M${jarLeft + jarW * 0.1} ${jarTop - 2} q-2 -10 -9 -14 q9 -1 13 8 q1 3 -4 6z" fill="#335A49"/>
        <path d="M${jarLeft + jarW * 0.1} ${jarTop - 2} q3 -9 11 -12 q-4 8 -7 13 q-2 2 -4 -1z" fill="#5C856F"/>
        <circle cx="${jarLeft + jarW * 0.08}" cy="${jarTop - 15}" r="2.3" fill="#B5533F"/>
        <circle cx="${jarRight - jarW * 0.12}" cy="${jarTop + rimH + jarH * 0.3}" r="2" fill="${band}"/>
      `;
    } else if (decor === "ribbon") {
      const nY = jarTop + rimH * 0.4;
      decorMarkup = `
        <path d="M${cx} ${nY} c-9 -3 -13 4 -8 8 c4 3 8 -1 8 -4 c0 3 4 7 8 4 c5 -4 1 -11 -8 -8z" fill="#5F41E0"/>
        <circle cx="${cx}" cy="${nY + 1}" r="2.6" fill="${band}"/>
        <path d="M${cx - 3} ${nY + 5} l-4 10 l4 -2 l3 3z" fill="#5F41E0"/>
        <path d="M${cx + 3} ${nY + 5} l4 10 l-4 -2 l-3 3z" fill="#7C5CFF"/>
      `;
    } else if (decor === "waves") {
      decorMarkup = `
        <path d="M${cx - 14} ${wickTop - 10} q4 -6 0 -12 q-4 6 0 12z" fill="none" stroke="${band}" stroke-width="1.6" stroke-linecap="round" opacity="0.8"/>
        <path d="M${cx + 14} ${wickTop - 8} q4 -6 0 -12 q-4 6 0 12z" fill="none" stroke="${band}" stroke-width="1.6" stroke-linecap="round" opacity="0.6"/>
        <path d="M${cx} ${wickTop - 18} q4 -6 0 -12 q-4 6 0 12z" fill="none" stroke="${band}" stroke-width="1.6" stroke-linecap="round" opacity="0.5"/>
      `;
    }

    return `
      <svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="${cx}" cy="${wickTop - 9}" rx="6.2" ry="9.4" fill="${flameOuter}"/>
        <ellipse cx="${cx}" cy="${wickTop - 8}" rx="2.6" ry="4.6" fill="${flameInner}" opacity="0.0"/>
        <ellipse cx="${cx}" cy="${wickTop - 7.4}" rx="2.3" ry="4.2" fill="#2C2440"/>
        <line x1="${cx}" y1="${wickTop}" x2="${cx}" y2="${jarTop + rimH * 0.4}" stroke="#3C332C" stroke-width="1.3" stroke-linecap="round"/>
        <ellipse cx="${jarLeft + jarW / 2}" cy="${jarBottom + 2}" rx="${jarW * 0.42}" ry="3" fill="#17151F" opacity="0.12"/>
        <rect x="${jarLeft}" y="${jarTop}" width="${jarW}" height="${jarH}" rx="${r}" fill="${jar}"/>
        <rect x="${jarLeft}" y="${jarTop + jarH * 0.42}" width="${jarW}" height="${jarH * 0.58}" fill="${jarDeep}"/>
        <rect x="${jarLeft}" y="${jarBottom - r}" width="${jarW}" height="${r}" rx="${r}" fill="${jarDeep}"/>
        <rect x="${jarLeft}" y="${jarTop}" width="${jarW}" height="${rimH}" rx="${r}" fill="${rim}"/>
        <rect x="${jarLeft}" y="${jarTop + rimH * 0.55}" width="${jarW}" height="${rimH * 0.45}" fill="${rim}"/>
        <rect x="${jarLeft}" y="${jarTop + rimH}" width="${jarW}" height="${jarH * 0.05}" fill="${band}"/>
        <rect x="${jarLeft + jarW * 0.14}" y="${jarTop + rimH + jarH * 0.1}" width="${jarW * 0.09}" height="${jarH * 0.62}" rx="${jarW * 0.045}" fill="#ffffff" opacity="0.18"/>
        ${decorMarkup}
      </svg>
    `;
  }

  const INSPIRATION = [
    {
      id: "aromaticas",
      label: "Velas aromáticas",
      items: [
        { caption: "Un aroma bien elegido convierte un producto simple en una experiencia.", cfg: { jar: "#8E72FF", jarDeep: "#6A4CE0", decor: "waves" } },
        { caption: "Combiná notas cítricas y amaderadas para una fragancia con carácter propio.", cfg: { jar: "#7C5CFF", jarDeep: "#5F41E0", decor: "waves", jarHeightRatio: 0.32 } },
        { caption: "El primer contacto con tu marca casi siempre empieza por el olfato.", cfg: { jar: "#9A85FF", jarDeep: "#7C5CFF", decor: "waves", jarWidthRatio: 0.36 } },
      ],
    },
    {
      id: "decorativas",
      label: "Velas decorativas",
      items: [
        { caption: "Los detalles pequeños son los que hacen que alguien la elija a ella y no a otra.", cfg: { jar: "#D7BE8E", jarDeep: "#C5A46D", band: "#7C5CFF", decor: "dots" } },
        { caption: "Jugar con texturas y color es la firma visual de tu marca.", cfg: { jar: "#D7BE8E", jarDeep: "#9C7C43", band: "#7C5CFF", decor: "dots", jarWidthRatio: 0.46 } },
        { caption: "Una vela decorativa se diseña para quedarse a la vista, incluso apagada.", cfg: { jar: "#E4CFA0", jarDeep: "#C5A46D", band: "#5F41E0", decor: "dots", jarHeightRatio: 0.3 } },
      ],
    },
    {
      id: "premium",
      label: "Velas premium",
      items: [
        { caption: "Lo premium no grita: se nota en el peso del vidrio y el cuidado del acabado.", cfg: { jar: "#231D33", jarDeep: "#17151F", band: "#C5A46D", rim: "#F1ECE0", decor: "ring" } },
        { caption: "Un empaque cuidado justifica un precio más alto y lo comunica sin palabras.", cfg: { jar: "#2A2340", jarDeep: "#17151F", band: "#C5A46D", rim: "#F1ECE0", decor: "ring", jarWidthRatio: 0.38 } },
        { caption: "La exclusividad se construye con ediciones limitadas y series numeradas.", cfg: { jar: "#1B1826", jarDeep: "#0F0D16", band: "#DEC596", rim: "#F8F5EF", decor: "ring", jarHeightRatio: 0.34 } },
      ],
    },
    {
      id: "minimalistas",
      label: "Velas minimalistas",
      items: [
        { caption: "Menos elementos, más atención en cada uno de ellos.", cfg: { jar: "#EFE9DC", jarDeep: "#DDD3BE", band: "#C5A46D", rim: "#FFFFFF", decor: "none" } },
        { caption: "Un diseño limpio envejece mejor que una tendencia pasajera.", cfg: { jar: "#F1ECE0", jarDeep: "#E4DCC8", band: "#9C7C43", rim: "#FFFFFF", decor: "none", jarWidthRatio: 0.36 } },
        { caption: "El silencio visual deja que el aroma sea el verdadero protagonista.", cfg: { jar: "#E8E1D2", jarDeep: "#D7CBB1", band: "#C5A46D", rim: "#FFFFFF", decor: "none", jarHeightRatio: 0.3 } },
      ],
    },
    {
      id: "florales",
      label: "Velas florales",
      items: [
        { caption: "Las flores prensadas convierten cada vela en una pieza única e irrepetible.", cfg: { jar: "#3F6E58", jarDeep: "#335A49", decor: "leaves" } },
        { caption: "Una colección floral cambia con las estaciones y le da motivos para volver.", cfg: { jar: "#4A7D64", jarDeep: "#335A49", decor: "leaves", jarWidthRatio: 0.44 } },
        { caption: "Lo botánico conecta tu marca con lo natural y lo hecho a mano.", cfg: { jar: "#335A49", jarDeep: "#274435", decor: "leaves", jarHeightRatio: 0.32 } },
      ],
    },
    {
      id: "navidenas",
      label: "Velas navideñas",
      items: [
        { caption: "Las fechas especiales son la mejor excusa para lanzar una edición limitada.", cfg: { jar: "#335A49", jarDeep: "#274435", band: "#C5A46D", decor: "sprig" } },
        { caption: "Canela, pino y naranja: una combinación que se vende sola en diciembre.", cfg: { jar: "#3F6E58", jarDeep: "#335A49", band: "#DEC596", decor: "sprig", jarWidthRatio: 0.44 } },
        { caption: "Un packaging festivo puede duplicar el valor percibido del mismo producto.", cfg: { jar: "#274435", jarDeep: "#1E3529", band: "#C5A46D", decor: "sprig", jarHeightRatio: 0.34 } },
      ],
    },
    {
      id: "regalo",
      label: "Velas para regalo",
      items: [
        { caption: "Un buen empaque hace que regalar tu producto se sienta especial desde el primer momento.", cfg: { jar: "#7C5CFF", jarDeep: "#5F41E0", band: "#C5A46D", decor: "ribbon" } },
        { caption: "Pensá el set de regalo como una experiencia completa, no solo como un producto.", cfg: { jar: "#8E72FF", jarDeep: "#6A4CE0", band: "#DEC596", decor: "ribbon", jarWidthRatio: 0.4 } },
        { caption: "Una tarjeta escrita a mano transforma una compra en un recuerdo.", cfg: { jar: "#6A4CE0", jarDeep: "#5F41E0", band: "#C5A46D", decor: "ribbon", jarHeightRatio: 0.33 } },
      ],
    },
  ];

  /* ---------------------------------------------------------
     STORAGE HELPERS
     --------------------------------------------------------- */
  function lsGet(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      if (raw === null) return fallback;
      return JSON.parse(raw);
    } catch (e) {
      return fallback;
    }
  }
  function lsSet(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      /* storage unavailable, fail silently */
    }
  }

  /* ---------------------------------------------------------
     TOAST
     --------------------------------------------------------- */
  const toastEl = document.getElementById("toast");
  let toastTimer = null;
  function showToast(msg) {
    toastEl.textContent = msg;
    toastEl.classList.add("is-visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove("is-visible"), 2200);
  }

  /* ---------------------------------------------------------
     CONFIRM MODAL
     --------------------------------------------------------- */
  const modalOverlay = document.getElementById("modal-overlay");
  const modalTitle = document.getElementById("modal-title");
  const modalText = document.getElementById("modal-text");
  const modalConfirmBtn = document.getElementById("modal-confirm-btn");
  const modalCancelBtn = document.getElementById("modal-cancel-btn");
  let modalResolve = null;

  function confirmDialog(title, text) {
    modalTitle.textContent = title;
    modalText.textContent = text;
    modalOverlay.hidden = false;
    return new Promise((resolve) => {
      modalResolve = resolve;
    });
  }
  modalConfirmBtn.addEventListener("click", () => {
    modalOverlay.hidden = true;
    if (modalResolve) modalResolve(true);
  });
  modalCancelBtn.addEventListener("click", () => {
    modalOverlay.hidden = true;
    if (modalResolve) modalResolve(false);
  });
  modalOverlay.addEventListener("click", (e) => {
    if (e.target === modalOverlay) {
      modalOverlay.hidden = true;
      if (modalResolve) modalResolve(false);
    }
  });

  /* ---------------------------------------------------------
     WELCOME SCREEN
     --------------------------------------------------------- */
  const welcomeScreen = document.getElementById("welcome-screen");
  const appRoot = document.getElementById("app");
  const welcomeStartBtn = document.getElementById("welcome-start-btn");

  function initWelcome() {
    const welcomed = lsGet(LS_KEYS.welcomed, false);
    if (welcomed) {
      dismissWelcome({ animate: false });
    } else {
      welcomeScreen.hidden = false;
      appRoot.hidden = true;
    }
  }

  function dismissWelcome(opts) {
    opts = opts || {};
    // Belt-and-braces removal: the hidden attribute alone isn't enough if any
    // rule sets display on this element, so we also force display:none inline
    // and finally drop the node from the DOM entirely once any transition ends.
    welcomeScreen.hidden = true;
    welcomeScreen.style.display = "none";
    if (welcomeScreen.parentNode) {
      welcomeScreen.parentNode.removeChild(welcomeScreen);
    }
    appRoot.hidden = false;
    // Guarantee the app opens pinned to the very top, with no leftover scroll offset.
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }

  welcomeStartBtn.addEventListener("click", () => {
    lsSet(LS_KEYS.welcomed, true);
    welcomeScreen.style.opacity = "0";
    welcomeScreen.style.transform = "translateY(-8px)";
    welcomeScreen.style.transition = "all 0.35s ease";
    setTimeout(() => dismissWelcome({ animate: true }), 320);
  });

  /* ---------------------------------------------------------
     NAVIGATION
     --------------------------------------------------------- */
  const screens = Array.from(document.querySelectorAll(".screen"));
  const navItems = Array.from(document.querySelectorAll(".nav-item"));

  function goToScreen(name, opts) {
    opts = opts || {};
    screens.forEach((s) => {
      s.hidden = s.dataset.screen !== name;
    });
    navItems.forEach((n) => {
      n.classList.toggle("is-active", n.dataset.nav === name);
    });
    lsSet(LS_KEYS.lastScreen, name);
    window.scrollTo(0, 0);

    if (name === "produccion" && opts.tab) {
      setProduccionTab(opts.tab);
    }
    if (name === "mas" && opts.tab) {
      setMasTab(opts.tab);
    }
  }

  navItems.forEach((btn) => {
    btn.addEventListener("click", () => goToScreen(btn.dataset.nav));
  });

  document.querySelectorAll("[data-nav]").forEach((el) => {
    if (el.classList.contains("nav-item")) return; // already bound
    el.addEventListener("click", () => {
      goToScreen(el.dataset.nav, { tab: el.dataset.tab });
    });
  });

  document.getElementById("home-progress-teaser").addEventListener("click", () => goToScreen("produccion"));

  /* ---------------------------------------------------------
     GREETING + MOTIVATIONAL QUOTE (Inicio)
     --------------------------------------------------------- */
  function setGreeting() {
    const hour = new Date().getHours();
    const el = document.getElementById("inicio-greeting-time");
    let text = "Buenas noches";
    if (hour < 12) text = "Buenos días";
    else if (hour < 19) text = "Buenas tardes";
    el.textContent = text;
  }

  function setDailyQuote() {
    const dayIndex = Math.floor(Date.now() / 86400000) % QUOTES.length;
    document.getElementById("motivational-quote").textContent = QUOTES[dayIndex];
  }

  /* ---------------------------------------------------------
     CALCULADORA
     --------------------------------------------------------- */
  const calcForm = document.getElementById("calc-form");
  const calcResetBtn = document.getElementById("calc-reset-btn");
  const calcResults = document.getElementById("calc-results");

  const calcInputs = {
    cera: document.getElementById("calc-cera"),
    esencia: document.getElementById("calc-esencia"),
    recipiente: document.getElementById("calc-recipiente"),
    pabilo: document.getElementById("calc-pabilo"),
    otros: document.getElementById("calc-otros"),
    cantidad: document.getElementById("calc-cantidad"),
    margen: document.getElementById("calc-margen"),
  };

  function money(n) {
    if (!isFinite(n)) n = 0;
    return "$" + n.toLocaleString("es-CO", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  calcForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const cera = parseFloat(calcInputs.cera.value) || 0;
    const esencia = parseFloat(calcInputs.esencia.value) || 0;
    const recipiente = parseFloat(calcInputs.recipiente.value) || 0;
    const pabilo = parseFloat(calcInputs.pabilo.value) || 0;
    const otros = parseFloat(calcInputs.otros.value) || 0;
    const cantidad = Math.max(1, parseFloat(calcInputs.cantidad.value) || 1);
    const margen = Math.max(0, parseFloat(calcInputs.margen.value) || 0);

    const costoTotal = cera + esencia + recipiente + pabilo + otros;
    const costoPorVela = costoTotal / cantidad;
    const precioSugerido = costoPorVela * (1 + margen / 100);
    const gananciaUnidad = precioSugerido - costoPorVela;
    const gananciaTotal = gananciaUnidad * cantidad;
    const margenObtenido = precioSugerido > 0 ? (gananciaUnidad / precioSugerido) * 100 : 0;

    document.getElementById("res-precio").textContent = money(precioSugerido);
    document.getElementById("res-costo").textContent = money(costoPorVela);
    document.getElementById("res-ganancia-unidad").textContent = money(gananciaUnidad);
    document.getElementById("res-ganancia-total").textContent = money(gananciaTotal);
    document.getElementById("res-margen-obtenido").textContent = Math.round(margenObtenido) + "%";

    // Re-trigger the reveal / shine animations even if results were already visible
    calcResults.hidden = false;
    const hero = calcResults.querySelector(".result-hero");
    const shine = calcResults.querySelector(".result-hero-shine");
    const grid = calcResults.querySelector(".result-grid");
    [hero, shine, grid].forEach((el) => {
      el.style.animation = "none";
      // force reflow so the animation restarts
      void el.offsetWidth;
      el.style.animation = "";
    });

    calcResults.scrollIntoView({ behavior: "smooth", block: "nearest" });
  });

  calcResetBtn.addEventListener("click", () => {
    calcForm.reset();
    calcResults.hidden = true;
    showToast("Campos borrados");
  });

  /* ---------------------------------------------------------
     PRODUCCIÓN — checklists + tabs + celebration
     --------------------------------------------------------- */
  const listProduccionEl = document.getElementById("list-produccion");
  const listVentaEl = document.getElementById("list-venta");
  const countProduccionEl = document.getElementById("count-produccion");
  const countVentaEl = document.getElementById("count-venta");

  const celebrationOverlay = document.getElementById("celebration-overlay");
  const celebrationText = document.getElementById("celebration-text");
  const celebrationCloseBtn = document.getElementById("celebration-close-btn");

  const CELEBRATION_MESSAGES = {
    produccion: "Todo está listo para comenzar tu producción.",
    venta: "Todo está listo para tu próxima venta.",
  };

  function showCelebration(tabKey) {
    celebrationText.textContent = CELEBRATION_MESSAGES[tabKey] || CELEBRATION_MESSAGES.produccion;
    celebrationOverlay.hidden = false;
    // restart confetti animation
    const confettiSpans = celebrationOverlay.querySelectorAll(".celebration-confetti span");
    confettiSpans.forEach((s) => {
      s.style.animation = "none";
      void s.offsetWidth;
      s.style.animation = "";
    });
  }
  celebrationCloseBtn.addEventListener("click", () => { celebrationOverlay.hidden = true; });
  celebrationOverlay.addEventListener("click", (e) => {
    if (e.target === celebrationOverlay) celebrationOverlay.hidden = true;
  });

  function renderChecklist(items, storageKey, listEl, countEl, tabKey) {
    const state = lsGet(storageKey, {});
    listEl.innerHTML = "";

    items.forEach((label, idx) => {
      const checked = !!state[idx];
      const li = document.createElement("li");
      li.className = "checklist-item" + (checked ? " is-checked" : "");
      li.innerHTML = `
        <span class="checklist-box" aria-hidden="true">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M5 13l4.5 4.5L19 8" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </span>
        <span class="checklist-text">${label}</span>
      `;
      li.addEventListener("click", () => {
        const s = lsGet(storageKey, {});
        const wasComplete = items.every((_, i) => s[i]);
        s[idx] = !s[idx];
        lsSet(storageKey, s);
        renderChecklist(items, storageKey, listEl, countEl, tabKey);
        renderHomeProgress();
        const isCompleteNow = items.every((_, i) => s[i]);
        if (!wasComplete && isCompleteNow) {
          showCelebration(tabKey);
        }
      });
      listEl.appendChild(li);
    });

    const doneCount = items.filter((_, idx) => state[idx]).length;
    countEl.textContent = `${doneCount}/${items.length}`;
  }

  function renderChecklists() {
    renderChecklist(CHECKLIST_PRODUCCION, LS_KEYS.checklistProduccion, listProduccionEl, countProduccionEl, "produccion");
    renderChecklist(CHECKLIST_VENTA, LS_KEYS.checklistVenta, listVentaEl, countVentaEl, "venta");
  }

  function setProduccionTab(tab) {
    const tabs = document.querySelectorAll('#screen-produccion .tab');
    const panelProd = document.getElementById("panel-produccion");
    const panelVenta = document.getElementById("panel-venta");
    tabs.forEach((t) => {
      const active = t.dataset.tabTarget === tab;
      t.classList.toggle("is-active", active);
      t.setAttribute("aria-selected", active ? "true" : "false");
    });
    panelProd.hidden = tab !== "produccion";
    panelVenta.hidden = tab !== "venta";
  }

  document.querySelectorAll('#screen-produccion .tab').forEach((t) => {
    t.addEventListener("click", () => setProduccionTab(t.dataset.tabTarget));
  });

  /* ---------------------------------------------------------
     HOME — progress teaser (production checklists)
     --------------------------------------------------------- */
  const MINI_CIRCUMFERENCE = 2 * Math.PI * 18; // r=18

  function renderHomeProgress() {
    const prodState = lsGet(LS_KEYS.checklistProduccion, {});
    const ventaState = lsGet(LS_KEYS.checklistVenta, {});

    const prodDone = CHECKLIST_PRODUCCION.filter((_, i) => prodState[i]).length;
    const ventaDone = CHECKLIST_VENTA.filter((_, i) => ventaState[i]).length;
    const prodPct = prodDone / CHECKLIST_PRODUCCION.length;
    const ventaPct = ventaDone / CHECKLIST_VENTA.length;

    const prodCircle = document.querySelector("#mini-ring-produccion .mini-ring-fill");
    const ventaCircle = document.querySelector("#mini-ring-venta .mini-ring-fill");
    prodCircle.style.strokeDasharray = MINI_CIRCUMFERENCE.toFixed(1);
    prodCircle.style.strokeDashoffset = (MINI_CIRCUMFERENCE * (1 - prodPct)).toFixed(1);
    ventaCircle.style.strokeDasharray = MINI_CIRCUMFERENCE.toFixed(1);
    ventaCircle.style.strokeDashoffset = (MINI_CIRCUMFERENCE * (1 - ventaPct)).toFixed(1);

    const totalDone = prodDone + ventaDone;
    const sub = document.getElementById("home-progress-sub");
    if (totalDone === 0) {
      sub.textContent = "Todavía no marcaste ningún ítem";
    } else if (prodDone === CHECKLIST_PRODUCCION.length && ventaDone === CHECKLIST_VENTA.length) {
      sub.textContent = "¡Las dos checklists están completas!";
    } else {
      sub.textContent = `Producción ${prodDone}/${CHECKLIST_PRODUCCION.length} · Venta ${ventaDone}/${CHECKLIST_VENTA.length}`;
    }
  }

  /* ---------------------------------------------------------
     INSPIRACIÓN — gallery + lightbox
     --------------------------------------------------------- */
  const inspiracionChips = document.getElementById("inspiracion-chips");
  const inspiracionSections = document.getElementById("inspiracion-sections");
  const lightboxOverlay = document.getElementById("lightbox-overlay");
  const lightboxArt = document.getElementById("lightbox-art");
  const lightboxCategory = document.getElementById("lightbox-category");
  const lightboxCaption = document.getElementById("lightbox-caption");
  const lightboxCloseBtn = document.getElementById("lightbox-close-btn");

  function openLightbox(categoryLabel, item) {
    lightboxArt.innerHTML = buildCandleSVG(item.cfg);
    lightboxCategory.textContent = categoryLabel;
    lightboxCaption.textContent = item.caption;
    lightboxOverlay.hidden = false;
  }
  lightboxCloseBtn.addEventListener("click", () => { lightboxOverlay.hidden = true; });
  lightboxOverlay.addEventListener("click", (e) => {
    if (e.target === lightboxOverlay) lightboxOverlay.hidden = true;
  });

  function renderInspiracionChips() {
    inspiracionChips.innerHTML = "";
    INSPIRATION.forEach((cat, i) => {
      const chip = document.createElement("button");
      chip.type = "button";
      chip.className = "tab" + (i === 0 ? " is-active" : "");
      chip.textContent = cat.label;
      chip.addEventListener("click", () => {
        const target = document.getElementById("gallery-" + cat.id);
        if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
        document.querySelectorAll("#inspiracion-chips .tab").forEach((t) => t.classList.remove("is-active"));
        chip.classList.add("is-active");
      });
      inspiracionChips.appendChild(chip);
    });
  }

  function renderInspiracionGallery() {
    inspiracionSections.innerHTML = "";
    INSPIRATION.forEach((cat) => {
      const section = document.createElement("div");
      section.className = "gallery-section";
      section.id = "gallery-" + cat.id;

      const head = document.createElement("div");
      head.className = "gallery-section-head";
      head.innerHTML = `<span class="gallery-section-title">${cat.label}</span><span class="gallery-section-count">${cat.items.length} ideas</span>`;
      section.appendChild(head);

      const row = document.createElement("div");
      row.className = "gallery-row";

      cat.items.forEach((item) => {
        const card = document.createElement("button");
        card.type = "button";
        card.className = "gallery-card";
        card.innerHTML = `
          <span class="gallery-card-art">${buildCandleSVG(item.cfg)}</span>
          <span class="gallery-card-caption">${item.caption.length > 46 ? item.caption.slice(0, 44) + "…" : item.caption}</span>
        `;
        card.addEventListener("click", () => openLightbox(cat.label, item));
        row.appendChild(card);
      });

      section.appendChild(row);
      inspiracionSections.appendChild(section);
    });
  }

  /* ---------------------------------------------------------
     MÁS — sub tabs, accordions, safety, settings
     --------------------------------------------------------- */
  const masPanels = {
    consejos: document.getElementById("mas-consejos"),
    faq: document.getElementById("mas-faq"),
    seguridad: document.getElementById("mas-seguridad"),
    acerca: document.getElementById("mas-acerca"),
    contacto: document.getElementById("mas-contacto"),
    ajustes: document.getElementById("mas-ajustes"),
  };

  function setMasTab(tab) {
    const tabs = document.querySelectorAll('#screen-mas .tab');
    tabs.forEach((t) => {
      const active = t.dataset.masTarget === tab;
      t.classList.toggle("is-active", active);
      t.setAttribute("aria-selected", active ? "true" : "false");
    });
    Object.keys(masPanels).forEach((key) => {
      masPanels[key].hidden = key !== tab;
    });
  }

  document.querySelectorAll('#screen-mas .tab').forEach((t) => {
    t.addEventListener("click", () => setMasTab(t.dataset.masTarget));
  });

  function buildAccordion(containerEl, items, iconSvg) {
    containerEl.innerHTML = "";
    items.forEach((entry) => {
      const title = entry.title || entry.q;
      const body = entry.body || entry.a;
      const item = document.createElement("div");
      item.className = "accordion-item";
      item.innerHTML = `
        <div class="accordion-head">
          <span class="accordion-icon" aria-hidden="true">${iconSvg}</span>
          <span class="accordion-title">${title}</span>
          <span class="accordion-chevron" aria-hidden="true">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </span>
        </div>
        <div class="accordion-body"><div class="accordion-body-inner">${body}</div></div>
      `;
      item.querySelector(".accordion-head").addEventListener("click", () => {
        item.classList.toggle("is-open");
      });
      containerEl.appendChild(item);
    });
  }

  function renderTipsAndFaq() {
    const bulbIcon = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M9 18h6M10 21h4M12 3a6 6 0 00-3.6 10.8c.5.4.8 1 .8 1.7V16h5.6v-.5c0-.7.3-1.3.8-1.7A6 6 0 0012 3z" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    const qIcon = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.8"/><path d="M9.5 9.2a2.5 2.5 0 114 2c-.8.6-1.4 1-1.4 2.1" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><circle cx="12" cy="16.6" r="1" fill="currentColor"/></svg>';
    buildAccordion(document.getElementById("tips-list"), TIPS, bulbIcon);
    buildAccordion(document.getElementById("faq-list"), FAQ.map((f) => ({ title: f.q, body: f.a })), qIcon);
  }

  function renderSafety() {
    const el = document.getElementById("safety-list");
    el.innerHTML = "";
    SAFETY.forEach((text) => {
      const li = document.createElement("li");
      li.textContent = text;
      el.appendChild(li);
    });
  }

  /* Settings actions */
  document.getElementById("btn-reset-progress").addEventListener("click", async () => {
    const ok = await confirmDialog(
      "Restablecer progreso",
      "Se pondrán en cero ambas checklists de producción y venta. Esta acción no se puede deshacer."
    );
    if (!ok) return;
    lsSet(LS_KEYS.checklistProduccion, {});
    lsSet(LS_KEYS.checklistVenta, {});
    renderChecklists();
    renderHomeProgress();
    showToast("Progreso restablecido");
  });

  document.getElementById("btn-delete-data").addEventListener("click", async () => {
    const ok = await confirmDialog(
      "Eliminar todos los datos",
      "Se borrará todo lo guardado por Velas Studio en este dispositivo, incluyendo la pantalla de bienvenida. Esta acción no se puede deshacer."
    );
    if (!ok) return;
    Object.values(LS_KEYS).forEach((k) => localStorage.removeItem(k));
    showToast("Datos eliminados");
    setTimeout(() => window.location.reload(), 600);
  });

  /* ---------------------------------------------------------
     INIT
     --------------------------------------------------------- */
  function init() {
    initWelcome();
    setGreeting();
    setDailyQuote();
    renderChecklists();
    renderHomeProgress();
    renderInspiracionChips();
    renderInspiracionGallery();
    renderTipsAndFaq();
    renderSafety();

    const lastScreen = lsGet(LS_KEYS.lastScreen, "inicio");
    // "curso" no longer exists — fall back to inicio if an old install has it saved
    const validScreens = ["inicio", "calculadora", "produccion", "inspiracion", "mas"];
    goToScreen(validScreens.includes(lastScreen) ? lastScreen : "inicio");
  }

  document.addEventListener("DOMContentLoaded", init);

  /* ---------------------------------------------------------
     SERVICE WORKER REGISTRATION
     --------------------------------------------------------- */
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("service-worker.js").catch(() => {
        /* offline install not critical to core functionality */
      });
    });
  }
})();
