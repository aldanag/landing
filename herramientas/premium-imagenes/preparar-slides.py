"""Prepara las láminas del carrusel (imagen 6) con las dos fotos del hombre.

Soltar las dos fotos del hombre en la carpeta `fotos/slides-nuevos/` (con el nombre que sea: .jpg, .png o .webp).
La primera (por orden de nombre) es la lámina 1 y la segunda la lámina 2. También sirven los nombres
`fotos/slide-hombre-1.jpg` y `fotos/slide-hombre-2.jpg`.

Después correr:  python -X utf8 preparar-slides.py
Recorta cada foto con la proporción del carrusel, ANCLADA ARRIBA (así no se corta la cabeza) y la guarda en
src/assets/premium-overlays/carrusel-1.webp y carrusel-2.webp, en la landing y en web-premium.
La tercera foto es opcional: si hay una tercera en `fotos/slides-nuevos/` se usa como lámina 3; si no, la lámina 3 queda lisa (violeta).
"""
import pathlib
import sys
from PIL import Image

AQUI = pathlib.Path(__file__).parent
FOTOS = AQUI / "fotos"
SALIDAS = [
    AQUI.parent.parent / "src" / "assets" / "premium-overlays",
    AQUI.parent.parent.parent / "web-premium" / "src" / "assets" / "premium-overlays",
]
PROPORCION = 812 / 218  # ancho / alto del carrusel en la imagen

nuevas = sorted(q for q in (FOTOS / "slides-nuevos").glob("*") if q.suffix.lower() in (".jpg", ".jpeg", ".png", ".webp"))
for n in (1, 2, 3):
    origen = FOTOS / f"slide-hombre-{n}.jpg"
    if len(nuevas) >= n:
        origen = nuevas[n - 1]
    if not origen.exists():
        if n == 3:
            print("lámina 3: sin foto (queda lisa)")
            continue
        sys.exit(f"Falta la foto {n}: soltala en {FOTOS / 'slides-nuevos'}")
    print(f"lámina {n}: {origen.name}")
    im = Image.open(origen).convert("RGB")
    alto = round(im.width / PROPORCION)
    y = 0  # arriba: la cabeza queda dentro
    im = im.crop((0, y, im.width, min(im.height, y + alto))).resize((1000, round(1000 / PROPORCION)), Image.LANCZOS)
    for carpeta in SALIDAS:
        carpeta.mkdir(parents=True, exist_ok=True)
        im.save(carpeta / f"carrusel-{n}.webp", "WEBP", quality=86, method=6)
    print(f"carrusel-{n}.webp listo")
