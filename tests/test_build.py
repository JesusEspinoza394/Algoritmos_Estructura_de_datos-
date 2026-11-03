import tempfile
import unittest
from pathlib import Path

from build import build_site


class BuildSiteTestCase(unittest.TestCase):
    def test_build_uses_requested_api_url_without_changing_example_config(self):
        source_config = Path(__file__).resolve().parents[1] / "config.js"
        original_config = source_config.read_text(encoding="utf-8")

        with tempfile.TemporaryDirectory() as temporary_directory:
            output_dir = build_site(
                "https://api.example.test/",
                Path(temporary_directory) / "site",
            )
            generated_config = (output_dir / "config.js").read_text(
                encoding="utf-8"
            )
            self.assertTrue((output_dir / "index.html").is_file())
            self.assertTrue((output_dir / "styles.css").is_file())
            self.assertTrue((output_dir / "app.js").is_file())

        self.assertIn("https://api.example.test", generated_config)
        self.assertEqual(source_config.read_text(encoding="utf-8"), original_config)

    def test_build_rejects_urls_with_embedded_credentials(self):
        with tempfile.TemporaryDirectory() as temporary_directory:
            with self.assertRaises(ValueError):
                build_site(
                    "https://user:password@api.example.test",
                    Path(temporary_directory) / "site",
                )


if __name__ == "__main__":
    unittest.main()
