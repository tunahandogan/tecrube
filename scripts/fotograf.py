"""Gelen fotoğrafları siteye hazırlar: `python scripts/fotograf.py <klasör>`.

Klasördeki dosyalar docs/fotograflar.md'deki adlarla (uzantı fark etmez) bulunur,
EXIF yönüne göre döndürülür, uzun kenarı en fazla 2000px olacak şekilde küçültülür,
konum dahil tüm meta veriden arındırılır ve public/images/<ad>.jpg olarak yazılır.
"""
import sys
from pathlib import Path

try:
    from PIL import Image, ImageOps
except ImportError:
    sys.exit("Pillow gerekli: pip install pillow")

NAMES = ["hero", "bina", "sinif", "kabin-salonu", "kutuphane", "deneme", "kurucu"]
MAX_SIDE = 2000

if len(sys.argv) != 2:
    sys.exit("Kullanım: python scripts/fotograf.py <gelen-fotograflar-klasoru>")

src = Path(sys.argv[1])
out = Path(__file__).resolve().parent.parent / "public" / "images"
out.mkdir(parents=True, exist_ok=True)

found = 0
for file in sorted(src.iterdir()):
    if file.stem.lower() not in NAMES:
        continue
    with Image.open(file) as im:
        im = ImageOps.exif_transpose(im).convert("RGB")
        im.thumbnail((MAX_SIDE, MAX_SIDE))
        target = out / f"{file.stem.lower()}.jpg"
        im.save(target, "JPEG", quality=82, optimize=True, progressive=True)
    found += 1
    print(f"{file.name} -> {target.relative_to(out.parent.parent)} ({target.stat().st_size // 1024} KB)")

missing = [n for n in NAMES if not (out / f"{n}.jpg").exists()]
print(f"{found} fotoğraf hazırlandı." + (f" Eksik: {', '.join(missing)}" if missing else " Tüm alanlar dolu."))
