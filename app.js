const app = document.querySelector("#app");

const icons = {
  brand: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M20.4 8.7c0 5.1-8.4 10-8.4 10s-8.4-4.9-8.4-10a4.4 4.4 0 0 1 8.4-1.8 4.4 4.4 0 0 1 8.4 1.8Z" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  user: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M20 21a8 8 0 0 0-16 0M12 13a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  admin: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/><path d="m9 12 2 2 4-4" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  arrow: `<svg class="arrow" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  back: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m15 18-6-6 6-6M9 12h11" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  enter: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M10 17l5-5-5-5m5 5H3m9-9h7a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-7" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  community: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2m16 0v-2a4 4 0 0 0-3-3.87M14 3.13a4 4 0 0 1 0 7.75M10 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z" transform="translate(2 0)" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
};

const brand = (className = "brand") => `
  <a class="${className}" href="/login-cuenta" data-route="/login-cuenta" aria-label="Manos Cerca, inicio">
    <span class="brand-mark">${icons.brand}</span>
    <span>manos cerca</span>
  </a>
`;

const storyPanel = `
  <aside class="story-panel" aria-label="Acerca de Manos Cerca">
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
      <p class="form-footer">Manos Cerca · Apoyo que conecta</p>
    </div>
  </section>
`;

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
    <p class="form-notice" data-notice hidden></p>
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
    <p class="form-notice" data-notice hidden></p>
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
    <p class="form-notice" data-notice hidden></p>
  `),
};

function currentRoute() {
  return window.location.pathname.replace(/\/+$/, "") || "/login-cuenta";
}

function render() {
  const route = currentRoute();
  const page = pages[route] || pages["/login-cuenta"];
  if (!pages[route]) {
    window.history.replaceState({}, "", "/login-cuenta");
  }
  app.innerHTML = page();
}

function navigate(path) {
  if (path === currentRoute()) return;
  window.history.pushState({}, "", path);
  render();
  window.scrollTo(0, 0);
}

app.addEventListener("click", (event) => {
  const link = event.target.closest("[data-route]");
  if (!link || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
    return;
  }
  event.preventDefault();
  navigate(link.dataset.route);
});

app.addEventListener("submit", (event) => {
  const form = event.target.closest("[data-form]");
  if (!form) return;

  event.preventDefault();
  const notice = app.querySelector("[data-notice]");
  notice.hidden = false;
  notice.textContent = "Este diseño es una maqueta visual. El formulario todavía no está conectado a la API.";
});

window.addEventListener("popstate", render);

render();
