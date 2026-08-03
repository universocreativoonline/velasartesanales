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
    courseProgress: "vs_course_progress",
    checklistProduccion: "vs_checklist_produccion",
    checklistVenta: "vs_checklist_venta",
    lastScreen: "vs_last_screen",
  };

  /* ---------------------------------------------------------
     CONTENT DATA
     --------------------------------------------------------- */
  const COURSE_STEPS = [
    {
      id: "materiales",
      title: "Materiales",
      body: "Reúne cera de soja o parafina, pabilos del grosor correcto, esencias aromáticas, recipientes y una báscula. Elegir materiales de buena calidad es la base de una vela que se vende sola."
    },
    {
      id: "preparacion",
      title: "Preparación",
      body: "Organiza tu espacio de trabajo, protege la superficie, pesa las cantidades de cera que vas a usar y ten a mano termómetro, jarra de vertido y pinzas para centrar el pabilo."
    },
    {
      id: "mezcla",
      title: "Mezcla",
      body: "Derrite la cera a la temperatura recomendada por el fabricante, incorpora la fragancia en el punto justo y remueve con movimientos lentos para evitar burbujas de aire."
    },
    {
      id: "vertido",
      title: "Vertido",
      body: "Vierte la mezcla en el recipiente en un solo movimiento continuo, dejando un pequeño remanente para un segundo vertido si la vela se hunde al enfriar."
    },
    {
      id: "curado",
      title: "Curado",
      body: "Deja reposar la vela sin moverla durante el tiempo indicado por el tipo de cera, normalmente entre 24 y 72 horas, para que el aroma se fije correctamente."
    },
    {
      id: "acabado",
      title: "Acabado",
      body: "Corta el pabilo a un centímetro de altura, limpia los bordes del recipiente y revisa que la superficie haya quedado uniforme antes de etiquetar."
    },
    {
      id: "venta",
      title: "Venta",
      body: "Define tu precio con la calculadora, fotografía tu producto con luz natural y prepara una breve historia de marca para tus primeros clientes."
    },
  ];

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
      welcomeScreen.hidden = true;
      appRoot.hidden = false;
    } else {
      welcomeScreen.hidden = false;
      appRoot.hidden = true;
    }
  }

  welcomeStartBtn.addEventListener("click", () => {
    lsSet(LS_KEYS.welcomed, true);
    welcomeScreen.style.opacity = "0";
    welcomeScreen.style.transform = "translateY(-8px)";
    welcomeScreen.style.transition = "all 0.35s ease";
    setTimeout(() => {
      welcomeScreen.hidden = true;
      appRoot.hidden = false;
    }, 320);
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
     CURSO — steps with progress
     --------------------------------------------------------- */
  const cursoStepsList = document.getElementById("curso-steps-list");
  const cursoProgressBar = document.getElementById("curso-progress-bar");
  const cursoProgressPercent = document.getElementById("curso-progress-percent");
  const homeProgressFraction = document.getElementById("home-progress-fraction");
  const homeProgressPercent = document.getElementById("home-progress-percent");
  const homeProgressCircle = document.getElementById("home-progress-circle");
  const homeContinueBtn = document.getElementById("home-continue-btn");

  const CIRCLE_CIRCUMFERENCE = 2 * Math.PI * 27; // r=27

  function getCourseProgress() {
    return lsGet(LS_KEYS.courseProgress, {});
  }
  function setCourseProgress(progress) {
    lsSet(LS_KEYS.courseProgress, progress);
  }

  function renderCourseSteps() {
    const progress = getCourseProgress();
    cursoStepsList.innerHTML = "";

    COURSE_STEPS.forEach((step, i) => {
      const done = !!progress[step.id];
      const item = document.createElement("div");
      item.className = "step-item" + (done ? " is-done" : "");
      item.dataset.stepId = step.id;

      item.innerHTML = `
        <div class="step-head">
          <span class="step-check" data-role="check" aria-hidden="true">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M5 13l4.5 4.5L19 8" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </span>
          <span>
            <span class="step-index">PASO ${i + 1}</span>
            <span class="step-title">${step.title}</span>
          </span>
          <span class="step-chevron" aria-hidden="true">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M9 18l6-6-6-6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </span>
        </div>
        <div class="step-body">
          <div class="step-body-inner">${step.body}</div>
        </div>
      `;

      const head = item.querySelector(".step-head");
      const check = item.querySelector('[data-role="check"]');

      head.addEventListener("click", (e) => {
        // toggle open/closed unless the checkbox itself was tapped
        if (e.target.closest('[data-role="check"]')) return;
        item.classList.toggle("is-open");
      });

      check.addEventListener("click", (e) => {
        e.stopPropagation();
        const prog = getCourseProgress();
        prog[step.id] = !prog[step.id];
        setCourseProgress(prog);
        renderCourseSteps();
        renderHomeProgress();
        if (prog[step.id]) showToast(`"${step.title}" marcado como completado`);
      });

      cursoStepsList.appendChild(item);
    });

    updateCourseProgressUI();
  }

  function updateCourseProgressUI() {
    const progress = getCourseProgress();
    const doneCount = COURSE_STEPS.filter((s) => progress[s.id]).length;
    const pct = Math.round((doneCount / COURSE_STEPS.length) * 100);
    cursoProgressBar.style.width = pct + "%";
    cursoProgressPercent.textContent = pct + "%";
  }

  function renderHomeProgress() {
    const progress = getCourseProgress();
    const doneCount = COURSE_STEPS.filter((s) => progress[s.id]).length;
    const total = COURSE_STEPS.length;
    const pct = Math.round((doneCount / total) * 100);

    homeProgressFraction.textContent = `${doneCount} de ${total} pasos`;
    homeProgressPercent.textContent = pct + "%";

    const offset = CIRCLE_CIRCUMFERENCE - (pct / 100) * CIRCLE_CIRCUMFERENCE;
    homeProgressCircle.style.strokeDasharray = CIRCLE_CIRCUMFERENCE.toFixed(1);
    homeProgressCircle.style.strokeDashoffset = offset.toFixed(1);

    if (doneCount >= total) {
      homeContinueBtn.textContent = "Curso completado — repasar";
    } else if (doneCount === 0) {
      homeContinueBtn.textContent = "Comenzar el curso";
    } else {
      homeContinueBtn.textContent = "Continuar aprendiendo";
    }
  }

  homeContinueBtn.addEventListener("click", () => goToScreen("curso"));

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

    calcResults.hidden = false;
    calcResults.scrollIntoView({ behavior: "smooth", block: "nearest" });
  });

  calcResetBtn.addEventListener("click", () => {
    calcForm.reset();
    calcResults.hidden = true;
    showToast("Campos borrados");
  });

  /* ---------------------------------------------------------
     PRODUCCIÓN — checklists + tabs
     --------------------------------------------------------- */
  const listProduccionEl = document.getElementById("list-produccion");
  const listVentaEl = document.getElementById("list-venta");
  const countProduccionEl = document.getElementById("count-produccion");
  const countVentaEl = document.getElementById("count-venta");

  function renderChecklist(items, storageKey, listEl, countEl) {
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
        s[idx] = !s[idx];
        lsSet(storageKey, s);
        renderChecklist(items, storageKey, listEl, countEl);
      });
      listEl.appendChild(li);
    });

    const doneCount = items.filter((_, idx) => state[idx]).length;
    countEl.textContent = `${doneCount}/${items.length}`;
  }

  function renderChecklists() {
    renderChecklist(CHECKLIST_PRODUCCION, LS_KEYS.checklistProduccion, listProduccionEl, countProduccionEl);
    renderChecklist(CHECKLIST_VENTA, LS_KEYS.checklistVenta, listVentaEl, countVentaEl);
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
     MÁS — sub tabs, accordions, safety, settings
     --------------------------------------------------------- */
  const masPanels = {
    consejos: document.getElementById("mas-consejos"),
    faq: document.getElementById("mas-faq"),
    seguridad: document.getElementById("mas-seguridad"),
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
      "Se pondrá en cero el avance del curso y ambas checklists de producción. Esta acción no se puede deshacer."
    );
    if (!ok) return;
    lsSet(LS_KEYS.courseProgress, {});
    lsSet(LS_KEYS.checklistProduccion, {});
    lsSet(LS_KEYS.checklistVenta, {});
    renderCourseSteps();
    renderHomeProgress();
    renderChecklists();
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
    renderCourseSteps();
    renderHomeProgress();
    renderChecklists();
    renderTipsAndFaq();
    renderSafety();

    const lastScreen = lsGet(LS_KEYS.lastScreen, "inicio");
    goToScreen(lastScreen);
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
