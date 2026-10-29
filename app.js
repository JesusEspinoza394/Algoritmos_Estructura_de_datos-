const app = document.querySelector("#app");

const icons = {
  brand: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M20.4 8.7c0 5.1-8.4 10-8.4 10s-8.4-4.9-8.4-10a4.4 4.4 0 0 1 8.4-1.8 4.4 4.4 0 0 1 8.4 1.8Z" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  user: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M20 21a8 8 0 0 0-16 0M12 13a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  admin: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/><path d="m9 12 2 2 4-4" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  arrow: `<svg class="arrow" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  back: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m15 18-6-6 6-6M9 12h11" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  enter: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M10 17l5-5-5-5m5 5H3m9-9h7a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-7" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  community: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2m16 0v-2a4 4 0 0 0-3-3.87M14 3.13a4 4 0 0 1 0 7.75M10 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z" transform="translate(2 0)" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  logout: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M10 17l5-5-5-5m5 5H3m9-9h7a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-7" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  box: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m12 3 9 5-9 5-9-5 9-5Zm-9 5v8l9 5 9-5V8m-9 5v8" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  check: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m5 12 4 4L19 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  refresh: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M20 7v5h-5M4 17v-5h5m-3.5-3A7 7 0 0 1 17 6l3 6M4 12l3 6a7 7 0 0 0 11.5-3" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
};

const brand = (className = "brand") => `
  <a class="${className}" href="/login-cuenta" data-route="/login-cuenta" aria-label="TodoSuma, inicio">
    <span class="brand-mark">${icons.brand}</span>
    <span>TodoSuma</span>
  </a>
`;

const storyPanel = `
  <aside class="story-panel" aria-label="Acerca de TodoSuma">
    ${brand()}
    <div class="story-content">
      <p class="eyebrow">Una comunidad que acompaña</p>
      <h1>Un pequeño gesto puede <span>cambiar mucho.</span></h1>
      <p class="story-copy">Conectamos a personas que necesitan apoyo con una comunidad dispuesta a ayudar. Cada paso cuenta cuando lo damos juntos.</p>
    </div>
    <div class="community-note">
      <span class="community-icon">${icons.community}</span>
      <span>Un espacio cercano, solidario y creado para apoyarnos.</span>
    </div>
  </aside>
`;

const layout = (content) => `
  ${storyPanel}
  <section class="form-panel">
    <div class="form-wrap">
      ${brand("brand mobile-brand")}
      ${content}
      <p class="form-footer">TodoSuma · Apoyo que conecta</p>
    </div>
  </section>
`;

const escapeHtml = (value) => String(value ?? "").replace(/[&<>"']/g, (character) => ({
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
}[character]));

function getSavedUser() {
  try {
    return JSON.parse(sessionStorage.getItem("manos_cerca_user") || "{}");
  } catch {
    return {};
  }
}

function portalLayout({ name, email, role, content, tabs = "" }) {
  const initial = (name || email || "U").trim().charAt(0).toUpperCase();
  return `
    <section class="portal-shell">
      <header class="portal-header">
        <div class="portal-header-main">
          ${brand("brand portal-brand")}
          ${tabs}
        </div>
        <div class="account-menu">
          <span class="account-avatar" aria-hidden="true">${escapeHtml(initial)}</span>
          <span class="account-info">
            <strong>${escapeHtml(name || (role === "admin" ? "Administrador" : "Usuario"))}</strong>
            <span>${escapeHtml(email || "")}</span>
          </span>
          <button class="logout-button" type="button" data-action="logout">
            ${icons.logout}<span>Cerrar sesión</span>
          </button>
        </div>
      </header>
      <section class="portal-content">${content}</section>
    </section>
  `;
}

let adminDonations = [];
let adminDonationStatus = "pending";
let adminRequestId = 0;

const pages = {
  "/login-cuenta": () => layout(`
    <div class="form-heading">
      <h2>Qué bueno tenerte aquí</h2>
      <p>Para continuar, cuéntanos cómo quieres ingresar.</p>
    </div>
    <div class="role-options">
      <a class="role-card" href="/login-usuario" data-route="/login-usuario">
        <span class="role-icon">${icons.user}</span>
        <span class="role-copy">
          <strong>Soy usuario</strong>
          <span>Quiero encontrar apoyo o colaborar.</span>
        </span>
        ${icons.arrow}
      </a>
      <a class="role-card" href="/login-admin" data-route="/login-admin">
        <span class="role-icon admin">${icons.admin}</span>
        <span class="role-copy">
          <strong>Soy administrador</strong>
          <span>Ingresar al espacio de administración.</span>
        </span>
        ${icons.arrow}
      </a>
    </div>
  `),

  "/login-usuario": () => layout(`
    <a class="back-link" href="/login-cuenta" data-route="/login-cuenta">${icons.back} Volver a elegir tipo de cuenta</a>
    <div class="form-heading compact">
      <h2>Hola de nuevo</h2>
      <p>Ingresa a tu cuenta para continuar.</p>
    </div>
    <form class="form-fields" data-form="user-login">
      <div class="field">
        <label for="user-email">Correo electrónico</label>
        <input id="user-email" name="email" type="email" autocomplete="email" placeholder="tu@correo.com" required>
      </div>
      <div class="field">
        <label for="user-password">Contraseña</label>
        <input id="user-password" name="password" type="password" autocomplete="current-password" placeholder="Escribe tu contraseña" required>
      </div>
      <button class="submit-button" type="submit">Iniciar sesión ${icons.enter}</button>
    </form>
    <p class="register-prompt">¿No tienes cuenta? <a class="inline-link" href="/registrame-usuario" data-route="/registrame-usuario">Registrarme</a></p>
    <p class="form-notice" data-notice role="status" aria-live="polite" hidden></p>
  `),

  "/registrame-usuario": () => layout(`
    <a class="back-link" href="/login-usuario" data-route="/login-usuario">${icons.back} Volver al inicio de sesión</a>
    <div class="form-heading compact">
      <h2>Creemos tu cuenta</h2>
      <p>Completa tus datos para formar parte de la comunidad.</p>
    </div>
    <form class="form-fields" data-form="user-register">
      <div class="field">
        <label for="register-name">Nombre completo</label>
        <input id="register-name" name="name" type="text" autocomplete="name" maxlength="120" placeholder="Tu nombre" required>
      </div>
      <div class="field">
        <label for="register-email">Correo electrónico</label>
        <input id="register-email" name="email" type="email" autocomplete="email" placeholder="tu@correo.com" required>
      </div>
      <div class="field">
        <label for="register-age">Edad</label>
        <input id="register-age" name="age" type="number" min="0" max="120" step="1" inputmode="numeric" placeholder="Tu edad" required>
      </div>
      <div class="field">
        <label for="register-password">Contraseña</label>
        <input id="register-password" name="password" type="password" autocomplete="new-password" minlength="8" maxlength="128" placeholder="Mínimo 8 caracteres" required>
        <p class="field-hint">Usa al menos 8 caracteres.</p>
      </div>
      <button class="submit-button" type="submit">Crear mi cuenta ${icons.enter}</button>
    </form>
    <p class="register-prompt">¿Ya tienes cuenta? <a class="inline-link" href="/login-usuario" data-route="/login-usuario">Inicia sesión</a></p>
    <p class="form-notice" data-notice role="status" aria-live="polite" hidden></p>
  `),

  "/login-admin": () => layout(`
    <a class="back-link" href="/login-cuenta" data-route="/login-cuenta">${icons.back} Volver a elegir tipo de cuenta</a>
    <div class="form-heading compact">
      <h2>Acceso de administración</h2>
      <p>Ingresa con las credenciales asignadas a tu cuenta.</p>
    </div>
    <form class="form-fields" data-form="admin-login">
      <div class="field">
        <label for="admin-email">Correo electrónico</label>
        <input id="admin-email" name="email" type="email" autocomplete="username" placeholder="admin@correo.com" required>
      </div>
      <div class="field">
        <label for="admin-password">Contraseña</label>
        <input id="admin-password" name="password" type="password" autocomplete="current-password" placeholder="Escribe tu contraseña" required>
      </div>
      <button class="submit-button" type="submit">Iniciar sesión ${icons.enter}</button>
    </form>
    <p class="form-notice" data-notice role="status" aria-live="polite" hidden></p>
  `),

  "/formulario-donacion-usuario": () => {
    const user = getSavedUser();
    return portalLayout({
      name: user.name,
      email: user.email,
      role: "user",
      tabs: `<nav class="portal-tabs" aria-label="Navegación de usuario"><span class="portal-tab active">${icons.box} Nueva donación</span></nav>`,
      content: `
        <section class="portal-intro">
          <p class="eyebrow">Tu generosidad llega más lejos</p>
          <h1>Comparte algo bueno.</h1>
          <p>Cuéntanos qué deseas donar y a qué albergue te gustaría apoyar.</p>
        </section>
        <section class="donation-card">
          <div class="card-heading">
            <span class="role-icon">${icons.box}</span>
            <div><h2>Tu donación</h2><p>Completa los datos para que podamos coordinarla.</p></div>
          </div>
          <form class="form-fields donation-fields" data-form="donation">
            <div class="field">
              <label for="donation-type">Tipo de objeto a donar</label>
              <select id="donation-type" name="object_type" required>
                <option value="" selected disabled>Selecciona una categoría</option>
                <option>Alimentos</option>
                <option>Ropa y calzado</option>
                <option>Higiene personal</option>
                <option>Útiles escolares</option>
                <option>Juguetes</option>
                <option>Otro</option>
              </select>
            </div>
            <div class="field">
              <label for="shelter-name">Nombre del albergue</label>
              <input id="shelter-name" name="shelter_name" type="text" maxlength="160" placeholder="¿A qué albergue deseas ayudar?" required>
            </div>
            <div class="field">
              <label for="donation-message">Mensaje</label>
              <textarea id="donation-message" name="message" rows="5" maxlength="2000" placeholder="Cuéntanos algo sobre tu donación..." required></textarea>
              <p class="field-hint">Máximo 2000 caracteres.</p>
            </div>
            <button class="submit-button" type="submit">Enviar donación ${icons.enter}</button>
          </form>
          <p class="form-notice" data-notice role="status" aria-live="polite" hidden></p>
        </section>
      `,
    });
  },

  "/gracias-por-donar": () => {
    const user = getSavedUser();
    return `
      <section class="thanks-screen">
        <div class="thanks-card">
          <span class="thanks-icon">${icons.check}</span>
          <p class="eyebrow">Un gesto que transforma</p>
          <h1>¡Gracias por donar${user.name ? `, ${escapeHtml(user.name.split(" ")[0])}` : ""}!</h1>
          <p>Tu generosidad ya está registrada. Gracias por acercar apoyo a quienes más lo necesitan.</p>
          <a class="submit-button thanks-action" href="/formulario-donacion-usuario" data-route="/formulario-donacion-usuario">Hacer otra donación</a>
          <button class="text-button" type="button" data-action="logout">Cerrar sesión</button>
        </div>
      </section>
    `;
  },

  "/admin-donaciones": () => {
    const user = getSavedUser();
    return portalLayout({
      name: "Administrador",
      email: user.email,
      role: "admin",
      tabs: `
        <nav class="portal-tabs" aria-label="Cola de donaciones">
          <button class="portal-tab ${adminDonationStatus === "pending" ? "active" : ""}" type="button" data-admin-status="pending">${icons.box} En cola</button>
          <button class="portal-tab ${adminDonationStatus === "sent" ? "active" : ""}" type="button" data-admin-status="sent">Enviadas</button>
        </nav>
      `,
      content: `
        <section class="portal-intro admin-intro">
          <p class="eyebrow">Panel de administración</p>
          <h1>${adminDonationStatus === "pending" ? "Cola prioritaria" : "Historial de enviadas"}</h1>
          <p>${adminDonationStatus === "pending" ? "La cola muestra primero el número de prioridad más alto. Si empatan, se muestra primero la donación más antigua." : "Consulta las donaciones que ya fueron marcadas como enviadas."}</p>
        </section>
        <section class="admin-summary" aria-label="Resumen de donaciones">
          <div class="summary-card"><span>${adminDonationStatus === "pending" ? "Donaciones en cola" : "Donaciones enviadas"}</span><strong data-total-count>—</strong></div>
          <div class="summary-card"><span>Albergues apoyados</span><strong data-shelter-count>—</strong></div>
          <button class="refresh-button" type="button" data-action="refresh">${icons.refresh} Actualizar</button>
        </section>
        <section class="donations-panel">
          <div class="donations-toolbar">
            <span class="result-count" data-result-count></span>
          </div>
          <p class="form-notice admin-notice" data-admin-notice role="status" aria-live="polite" hidden></p>
          <div class="donation-list" data-donation-list aria-live="polite">
            <div class="empty-state"><span class="loading-dot"></span> Cargando donaciones...</div>
          </div>
        </section>
      `,
    });
  },
};

function currentRoute() {
  return window.location.pathname.replace(/\/+$/, "") || "/login-cuenta";
}

function render() {
  let route = currentRoute();
  const expectedRole = route === "/admin-donaciones"
    ? "admin"
    : ["/formulario-donacion-usuario", "/gracias-por-donar"].includes(route)
      ? "user"
      : null;
  const savedRole = sessionStorage.getItem("manos_cerca_role");
  const accessToken = sessionStorage.getItem("manos_cerca_access_token");
  if (expectedRole && (!accessToken || savedRole !== expectedRole)) {
    route = expectedRole === "admin" ? "/login-admin" : "/login-usuario";
    window.history.replaceState({}, "", route);
  }
  const page = pages[route] || pages["/login-cuenta"];
  if (!pages[route]) {
    window.history.replaceState({}, "", "/login-cuenta");
  }
  app.classList.toggle("app-portal", route === "/formulario-donacion-usuario" || route === "/admin-donaciones");
  app.classList.toggle("app-thanks", route === "/gracias-por-donar");
  app.innerHTML = page();
  if (route === "/admin-donaciones") {
    loadAdminDonations();
  }
}

function navigate(path) {
  if (path === currentRoute()) return;
  window.history.pushState({}, "", path);
  render();
  window.scrollTo(0, 0);
}

app.addEventListener("click", (event) => {
  const action = event.target.closest("[data-action]");
  if (action?.dataset.action === "logout") {
    sessionStorage.removeItem("manos_cerca_access_token");
    sessionStorage.removeItem("manos_cerca_role");
    sessionStorage.removeItem("manos_cerca_user");
    adminDonations = [];
    navigate("/login-cuenta");
    return;
  }
  if (action?.dataset.action === "refresh") {
    loadAdminDonations();
    return;
  }
  const sendButton = event.target.closest("[data-send-donation]");
  if (sendButton) {
    markDonationSent(sendButton);
    return;
  }
  const statusTab = event.target.closest("[data-admin-status]");
  if (statusTab && statusTab.dataset.adminStatus !== adminDonationStatus) {
    adminDonationStatus = statusTab.dataset.adminStatus;
    render();
    return;
  }
  const filterButton = event.target.closest("[data-admin-filter]");
  if (filterButton) {
    app.querySelectorAll("[data-admin-filter]").forEach((button) => {
      const active = button === filterButton;
      button.classList.toggle("active", active);
      button.setAttribute("aria-selected", String(active));
    });
    renderAdminDonations(filterButton.dataset.adminFilter);
    return;
  }

  const link = event.target.closest("[data-route]");
  if (!link || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
    return;
  }
  event.preventDefault();
  navigate(link.dataset.route);
});

async function sendApiRequest(path, { method = "POST", values, token, query } = {}) {
  const baseUrl = window.APP_CONFIG?.apiBaseUrl?.replace(/\/+$/, "");
  if (!baseUrl) {
    throw new Error("Falta configurar la dirección de la API en config.js.");
  }

  const queryString = query ? `?${new URLSearchParams(query)}` : "";
  const headers = {};
  if (values) headers["Content-Type"] = "application/json";
  if (token) headers.Authorization = `Bearer ${token}`;
  const response = await fetch(`${baseUrl}${path}${queryString}`, {
    method,
    headers,
    ...(values ? { body: JSON.stringify(values) } : {}),
  });

  let result;
  try {
    result = JSON.parse(await response.text());
  } catch {
    throw new Error(
      `La API respondió con un formato inesperado (HTTP ${response.status}). Revisa los logs del servicio backend en Render.`,
    );
  }

  if (!response.ok) {
    throw new Error(result.error || result.message || `Error de la API (${response.status}).`);
  }
  return result;
}

function saveSession(result, role, email = "") {
  if (typeof result.access_token !== "string" || !result.access_token) {
    throw new Error("La API no devolvió el token de acceso esperado.");
  }
  sessionStorage.setItem("manos_cerca_access_token", result.access_token);
  sessionStorage.setItem("manos_cerca_role", role);
  sessionStorage.setItem(
    "manos_cerca_user",
    JSON.stringify(result.user || { name: "Administrador", email }),
  );
}

function showNotice(notice, message) {
  notice.hidden = false;
  notice.textContent = message;
}

app.addEventListener("submit", async (event) => {
  const form = event.target.closest("[data-form]");
  if (!form || form.dataset.form === "donation") return;

  event.preventDefault();
  const notice = app.querySelector("[data-notice]");
  const submitButton = form.querySelector('button[type="submit"]');
  const originalButtonContent = submitButton.innerHTML;
  const values = Object.fromEntries(new FormData(form).entries());

  submitButton.disabled = true;
  submitButton.textContent = "Conectando...";
  form.setAttribute("aria-busy", "true");
  notice.hidden = true;

  try {
    if (form.dataset.form === "user-register") {
      const result = await sendApiRequest("/api/auth/register", {
        values: {
          name: values.name,
          email: values.email,
          age: Number(values.age),
          password: values.password,
        },
      });
      saveSession(result, "user", values.email);
      navigate("/formulario-donacion-usuario");
      return;
    }

    const isAdmin = form.dataset.form === "admin-login";
    const result = await sendApiRequest(
      isAdmin ? "/api/admin/login" : "/api/auth/login",
      {
        values: isAdmin
          ? { username: values.email, password: values.password }
          : { email: values.email, password: values.password },
      },
    );
    saveSession(result, isAdmin ? "admin" : "user", values.email);
    navigate(isAdmin ? "/admin-donaciones" : "/formulario-donacion-usuario");
  } catch (error) {
    const message = error instanceof TypeError
      ? "No se pudo conectar con la API. Verifica su URL, que esté activa y que permita el origen de esta página."
      : error.message;
    showNotice(notice, message);
  } finally {
    if (form.isConnected) {
      submitButton.disabled = false;
      submitButton.innerHTML = originalButtonContent;
      form.removeAttribute("aria-busy");
    }
  }
});

async function loadAdminDonations() {
  const list = app.querySelector("[data-donation-list]");
  if (!list) return;
  const requestId = ++adminRequestId;
  const requestedStatus = adminDonationStatus;
  const token = sessionStorage.getItem("manos_cerca_access_token");
  list.innerHTML = `<div class="empty-state"><span class="loading-dot"></span> Actualizando donaciones...</div>`;
  try {
    const result = await sendApiRequest("/api/admin/donations", {
      method: "GET",
      token,
      query: { status: requestedStatus },
    });
    if (
      requestId !== adminRequestId
      || currentRoute() !== "/admin-donaciones"
      || adminDonationStatus !== requestedStatus
    ) return;
    if (!Array.isArray(result.donations)) {
      throw new Error("La API no devolvió una lista de donaciones válida.");
    }
    adminDonations = result.donations;
    const shelterCount = new Set(
      adminDonations.map((donation) => donation.shelter_name.trim().toLocaleLowerCase()),
    ).size;
    app.querySelector("[data-total-count]").textContent = String(adminDonations.length);
    app.querySelector("[data-shelter-count]").textContent = String(shelterCount);
    renderAdminDonations();
  } catch (error) {
    if (
      requestId !== adminRequestId
      || currentRoute() !== "/admin-donaciones"
      || adminDonationStatus !== requestedStatus
    ) return;
    const message = error instanceof TypeError
      ? "No se pudo conectar con la API. Verifica su URL, que esté activa y que permita el origen de esta página."
      : error.message;
    list.innerHTML = `<div class="empty-state error-state">${escapeHtml(message)}</div>`;
  }
}

async function markDonationSent(button) {
  const donationId = button.dataset.sendDonation;
  const originalText = button.textContent;
  button.disabled = true;
  button.textContent = "Enviando...";
  try {
    await sendApiRequest(`/api/admin/donations/${encodeURIComponent(donationId)}/send`, {
      token: sessionStorage.getItem("manos_cerca_access_token"),
    });
    await loadAdminDonations();
  } catch (error) {
    button.disabled = false;
    button.textContent = originalText;
    const notice = app.querySelector("[data-admin-notice]");
    if (notice) showNotice(notice, error.message);
  }
}

function renderAdminDonations() {
  const list = app.querySelector("[data-donation-list]");
  if (!list) return;
  const visibleDonations = adminDonations;
  const countLabel = adminDonationStatus === "pending" ? "en cola" : "enviada";
  app.querySelector("[data-result-count]").textContent =
    `${visibleDonations.length} ${visibleDonations.length === 1 ? `donación ${countLabel}` : `donaciones ${countLabel === "enviada" ? "enviadas" : countLabel}`}`;

  if (visibleDonations.length === 0) {
    list.innerHTML = `<div class="empty-state">${adminDonationStatus === "pending" ? "La cola está vacía. No hay donaciones pendientes." : "Todavía no hay donaciones enviadas."}</div>`;
    return;
  }

  list.innerHTML = visibleDonations.map((donation) => {
    const date = new Date(donation.created_at);
    const dateLabel = Number.isNaN(date.getTime())
      ? "Fecha no disponible"
      : new Intl.DateTimeFormat("es", { dateStyle: "medium", timeStyle: "short" }).format(date);
    return `
      <article class="donation-item">
        <div class="donation-item-icon">${icons.box}</div>
        <div class="donation-item-content">
          <div class="donation-item-heading">
            <h3>${escapeHtml(donation.object_type)}</h3>
            <div class="donation-item-meta">
              <span class="priority-badge priority-${escapeHtml(donation.priority)}">Prioridad ${escapeHtml(donation.priority)}</span>
              <time>${escapeHtml(dateLabel)}</time>
            </div>
          </div>
          <p class="donation-shelter">${escapeHtml(donation.shelter_name)}</p>
          <p class="donation-message">${escapeHtml(donation.message)}</p>
          <div class="donor-info"><span>${escapeHtml(donation.user?.name || "Usuario")}</span><span>${escapeHtml(donation.user?.email || "")}</span></div>
          ${adminDonationStatus === "pending"
            ? `<button class="send-donation-button" type="button" data-send-donation="${escapeHtml(donation.id)}">${icons.check} Enviar</button>`
            : `<p class="sent-status">${icons.check} Enviada${donation.sent_at ? ` el ${escapeHtml(new Intl.DateTimeFormat("es", { dateStyle: "medium", timeStyle: "short" }).format(new Date(donation.sent_at)))}` : ""}</p>`}
        </div>
      </article>
    `;
  }).join("");
}

app.addEventListener("submit", async (event) => {
  const form = event.target.closest('[data-form="donation"]');
  if (!form) return;
  event.preventDefault();
  const notice = app.querySelector("[data-notice]");
  const submitButton = form.querySelector('button[type="submit"]');
  const originalButtonContent = submitButton.innerHTML;
  const values = Object.fromEntries(new FormData(form).entries());
  submitButton.disabled = true;
  submitButton.textContent = "Enviando...";
  form.setAttribute("aria-busy", "true");
  notice.hidden = true;

  try {
    await sendApiRequest("/api/donations", {
      token: sessionStorage.getItem("manos_cerca_access_token"),
      values: {
        object_type: values.object_type,
        shelter_name: values.shelter_name,
        message: values.message,
      },
    });
    navigate("/gracias-por-donar");
  } catch (error) {
    const message = error instanceof TypeError
      ? "No se pudo conectar con la API. Verifica su URL y la configuración CORS de Render."
      : error.message;
    showNotice(notice, message);
  } finally {
    if (form.isConnected) {
      submitButton.disabled = false;
      submitButton.innerHTML = originalButtonContent;
      form.removeAttribute("aria-busy");
    }
  }
});

window.addEventListener("popstate", render);

render();
