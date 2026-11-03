import json
import os
import shutil
from pathlib import Path
from urllib.parse import urlparse


ROOT = Path(__file__).resolve().parent
OUTPUT = ROOT / "build"
STATIC_FILES = ("index.html", "styles.css", "app.js")


def build_site(api_base_url, output_dir=OUTPUT):
    api_base_url = api_base_url.strip().rstrip("/")
    parsed_url = urlparse(api_base_url)
    if (
        parsed_url.scheme not in {"https", "http"}
        or not parsed_url.netloc
        or parsed_url.username
        or parsed_url.password
        or parsed_url.query
        or parsed_url.fragment
    ):
        raise ValueError("API_BASE_URL debe ser una URL HTTP(S) válida sin credenciales.")
    if parsed_url.hostname is None or parsed_url.hostname.endswith(".example.com"):
        raise ValueError(
            "API_BASE_URL todavía tiene un dominio de ejemplo. Configura la URL real de tu API."
        )

    output_dir = Path(output_dir)
    output_dir.mkdir(parents=True, exist_ok=True)

    for filename in STATIC_FILES:
        shutil.copy2(ROOT / filename, output_dir / filename)

    config = (
        "window.APP_CONFIG = Object.freeze("
        + json.dumps({"apiBaseUrl": api_base_url}, ensure_ascii=True)
        + ");\n"
    )
    (output_dir / "config.js").write_text(config, encoding="utf-8")
    return output_dir


def main():
    api_base_url = os.environ.get("API_BASE_URL")
    if not api_base_url:
        raise SystemExit(
            "Falta API_BASE_URL. Configúrala en Render antes de construir el sitio."
        )
    try:
        output_dir = build_site(api_base_url)
    except ValueError as error:
        raise SystemExit(str(error)) from error
    print(f"Sitio compilado correctamente en {output_dir}")


if __name__ == "__main__":
    main()
