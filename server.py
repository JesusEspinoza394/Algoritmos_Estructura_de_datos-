from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import unquote, urlsplit


APP_DIR = Path(__file__).resolve().parent
APP_ROUTES = {
    "/",
    "/login-cuenta",
    "/login-usuario",
    "/registrame-usuario",
    "/login-admin",
    "/formulario-donacion-usuario",
    "/gracias-por-donar",
    "/admin-donaciones",
}


class AppHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(APP_DIR), **kwargs)

    def do_GET(self):
        path = unquote(urlsplit(self.path).path)
        if path in APP_ROUTES:
            self.path = "/index.html"
        super().do_GET()


if __name__ == "__main__":
    address = ("127.0.0.1", 8000)
    print(f"App disponible en http://{address[0]}:{address[1]}/login-cuenta")
    ThreadingHTTPServer(address, AppHandler).serve_forever()
