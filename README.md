# Interfaz de Manos Cerca

Maqueta web responsive para las pantallas de selección de cuenta, inicio de sesión y registro de usuarios.

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

Los formularios validan campos en el navegador, pero esta maqueta aún no envía solicitudes a la API.
