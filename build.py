import os
import sys
import zipfile

ZIP_NAME = "cc-autoclicker.zip"
SOURCE_DIR = "src"
OUT_DIR = "out"

INCLUDE_LIST = [
    "manifest.json",
    "content.js",
    "injected_cheat.js",
    "icons"
]

def main():
    base_dir = os.path.dirname(os.path.abspath(__file__))
    src_path = os.path.join(base_dir, SOURCE_DIR)
    out_path = os.path.join(base_dir, OUT_DIR)
    zip_file_path = os.path.join(out_path, ZIP_NAME)

    print(f"Packaging extension from '{SOURCE_DIR}'...")

    if not os.path.exists(src_path):
        print(f"ERROR: Source directory '{SOURCE_DIR}' not found.")
        sys.exit(1)

    if not os.path.exists(out_path):
        os.makedirs(out_path)
        print(f"Created '{OUT_DIR}' directory.")

    try:
        with zipfile.ZipFile(zip_file_path, "w", zipfile.ZIP_DEFLATED) as zipf:
            for item in INCLUDE_LIST:
                abs_path = os.path.join(src_path, item)

                if not os.path.isfile(abs_path):
                    print(f"Adding file: {item}")
                    zipf.write(abs_path, arcname=item)

                elif os.path.isdir(abs_path):
                    print(f"Adding folder {item}/")
                    for root, _, files in os.walk(abs_path):
                        for file in files:
                            full_path = os.path.join(root, file)
                            rel_path = os.path.relpath(full_path, src_path)
                            zipf.write(full_path, arcname=rel_path)

        print(f"Success! Created '{ZIP_NAME}' in '{OUT_DIR}'.")

    except Exception as e:
        print(f"ERROR: Packaging failed - {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()