# Interfaz de Manos Cerca

Interfaz web responsive para seleccionar cuenta, iniciar sesión y registrar usuarios. Los formularios se conectan a la API Flask, que guarda y consulta la información en Neon.

## Ejecutar en Windows

Abre una terminal en esta carpeta y ejecuta:

```powershell
py server.py
```

Abre `http://127.0.0.1:8000/login-cuenta` en el navegador. El servidor local permite abrir y recargar directamente las rutas de la interfaz. Por defecto, la versión local llama a la API Flask en `http://127.0.0.1:5000`; para usar otro backend, define `API_BASE_URL` antes de iniciar `server.py`.

## Rutas incluidas

- `/login-cuenta`: selección entre usuario y administrador.
- `/login-usuario`: inicio de sesión de usuario con correo y contraseña.
- `/login-administrador`: acceso alternativo al inicio de sesión de administrador.
- `/registrame-usuario`: registro con nombre, correo, edad y contraseña.
- `/registrarse`: acceso alternativo al formulario de registro.
- `/registrarme-ususario`: acceso alternativo al formulario de registro.
- `/login-admin`: inicio de sesión de administrador con correo y contraseña.
- `/formulario-donacion-usuario`: formulario protegido para registrar una donación.
- `/gracias-por-donar`: confirmación de una donación guardada.
- `/admin-donaciones`: listado protegido de donaciones para administración.

## Conexión con la API y Neon

La interfaz **no se conecta directamente a Neon**. El navegador envía los formularios a la API Flask; la API usa la variable privada `DATABASE_URL` para hablar con Neon.

El `config.js` del repositorio contiene únicamente una URL de ejemplo. No pongas la URL de producción directamente en el código versionado. En Render, el proceso de build genera un `config.js` para el sitio publicado a partir de `API_BASE_URL`, sin alterar el ejemplo.

Para compilar localmente en PowerShell:

```powershell
$env:API_BASE_URL = "http://127.0.0.1:5000"
py build.py
```

El resultado se genera en la carpeta `build/`.

### Configurar el Static Site en Render

- **Build Command:** `python build.py`
- **Publish Directory:** `build`
- En **Environment**, agrega `API_BASE_URL` con la URL base de la API que utilizará este sitio (por ejemplo, `https://tu-api.onrender.com`).

Así, quien copie el repositorio tendrá que configurar la URL de su propia API antes de publicar. `API_BASE_URL` no es una credencial: se incorpora al `config.js` generado y cualquier visitante del sitio publicado puede verla. Nunca pongas contraseñas, `DATABASE_URL` ni `JWT_SECRET_KEY` en el servicio estático.

Si el sitio publica el `config.js` del repositorio con `https://tu-api.example.com`, el build no está usando `build/` o falta configurar `API_BASE_URL`. Revisa **Publish Directory = `build`**, guarda la variable en el Static Site y ejecuta un nuevo deploy con limpieza de caché.

Configura `FRONTEND_ORIGINS` en el servicio de la API en Render con el origen exacto desde el que se sirve esta página, incluyendo `https://` y sin una ruta final; por ejemplo, `https://mi-interfaz.onrender.com`. Para permitir el origen publicado y la prueba local, sepáralos con una coma. Después de cambiar esta variable, vuelve a desplegar la API.

La pantalla de administrador solicita correo electrónico, pero la ruta de la API compara ese valor con `ADMIN_USERNAME`. Configura `ADMIN_USERNAME` en Render con el mismo correo que se escribirá en el formulario.

El registro escribe usuarios en la base de Neon y devuelve un token de acceso; el inicio de sesión consulta esas cuentas. Tras autenticarse, la interfaz lleva al formulario de donación. Las donaciones se guardan en Neon y se muestran en el panel protegido del administrador. Los tokens se guardan en `sessionStorage` y solo duran mientras exista la sesión de esa pestaña.

La prioridad se asigna por la API, no por el navegador: alimentos recibe 1 (máxima prioridad), ropa y calzado 2, higiene personal 3, y juguetes, útiles escolares y otro reciben 4 (menor prioridad). No se muestra en el formulario ni en la confirmación del donante; el panel administrador ordena primero la prioridad más alta (1, luego 2, 3 y 4).

En el panel administrativo, la pestaña «En cola» permite alternar entre «Desencolar» (prioridad mayor a menor: 1 → 4) y «Encolar» (menor a mayor: 4 → 1); los empates conservan el orden de llegada. El buscador acepta el ID del usuario, muestra cuántas donaciones ha registrado en total y permite enviar su donación pendiente de mayor prioridad (número 1). La donación se quita de la cola y permanece en «Enviadas». «Albergues apoyados» cuenta los nombres únicos de albergues considerando todas las donaciones, por eso mantiene el mismo valor en ambas pestañas. Las vistas de usuario usan un diseño compacto y de una sola columna tanto en escritorio como en celular.

No agregues contraseñas, `DATABASE_URL` ni claves secretas a `config.js`.

Para validar el build, ejecuta `py -m unittest discover -s tests`.
