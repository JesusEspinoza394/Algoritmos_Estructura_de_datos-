# Interfaz de Manos Cerca

Interfaz web responsive para seleccionar cuenta, iniciar sesión y registrar usuarios. Los formularios se conectan a la API Flask, que guarda y consulta la información en Neon.

## Ejecutar en Windows

Abre una terminal en esta carpeta y ejecuta:

```powershell
py server.py
```

Abre `http://127.0.0.1:8000/login-cuenta` en el navegador. El servidor local permite abrir y recargar directamente las rutas de la interfaz.

## Rutas incluidas

- `/login-cuenta`: selección entre usuario y administrador.
- `/login-usuario`: inicio de sesión de usuario con correo y contraseña.
- `/registrame-usuario`: registro con nombre, correo, edad y contraseña.
- `/login-admin`: inicio de sesión de administrador con correo y contraseña.
- `/formulario-donacion-usuario`: formulario protegido para registrar una donación.
- `/gracias-por-donar`: confirmación de una donación guardada.
- `/admin-donaciones`: listado protegido de donaciones para administración.

## Conexión con la API y Neon

La interfaz **no se conecta directamente a Neon**. El navegador envía los formularios a la API Flask; la API usa la variable privada `DATABASE_URL` para hablar con Neon.

`config.js` contiene la URL pública de la API:

```js
window.APP_CONFIG = Object.freeze({
  apiBaseUrl: "https://api-algoritmos-trabajo.onrender.com",
});
```

Si la API tiene otro dominio, cambia esa URL. Para probar con una API Flask ejecutándose en la misma computadora, usa `http://127.0.0.1:5000`.

Configura `FRONTEND_ORIGINS` en el servicio de la API en Render con el origen exacto desde el que se sirve esta página, incluyendo `https://` y sin una ruta final; por ejemplo, `https://mi-interfaz.onrender.com`. Para permitir el origen publicado y la prueba local, sepáralos con una coma. Después de cambiar esta variable, vuelve a desplegar la API.

La pantalla de administrador solicita correo electrónico, pero la ruta de la API compara ese valor con `ADMIN_USERNAME`. Configura `ADMIN_USERNAME` en Render con el mismo correo que se escribirá en el formulario.

El registro escribe usuarios en la base de Neon y devuelve un token de acceso; el inicio de sesión consulta esas cuentas. Tras autenticarse, la interfaz lleva al formulario de donación. Las donaciones se guardan en Neon y se muestran en el panel protegido del administrador. Los tokens se guardan en `sessionStorage` y solo duran mientras exista la sesión de esa pestaña.

La prioridad se asigna por la API, no por el navegador: juguetes, útiles escolares y otro reciben 1; higiene personal, 2; ropa y calzado, 3; alimentos, 4. No se muestra en el formulario ni en la confirmación del donante; el panel administrador muestra el nivel y ordena primero las donaciones con prioridad 1.

No agregues contraseñas, `DATABASE_URL` ni claves secretas a `config.js`.
