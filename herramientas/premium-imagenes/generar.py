"""Genera las 7 imágenes del bloque "Funciones Premium" de la landing.

Cada imagen es un HTML de 1200x1200 que se saca a WebP con Playwright y queda en src/assets/premium/
(premium-1.webp ... premium-7.webp, más carrusel-slides.webp y estadisticas-base.webp en src/assets/escenas): la landing las toma sola.

Las fotos de productos todavía no están: donde van aparecen lugares marcados con lo que iría ahí.
Cuando haya fotos, se ponen en FOTOS (arriba) con la ruta del archivo y se vuelve a correr:

    python herramientas/premium-imagenes/generar.py            # las 7
    python herramientas/premium-imagenes/generar.py 3 5        # solo la 3 y la 5
"""
import base64
import pathlib
import sys

from PIL import Image
from playwright.sync_api import sync_playwright

RAIZ = pathlib.Path(__file__).resolve().parents[2]
SALIDA = RAIZ / "src" / "assets" / "premium"
TMP = pathlib.Path(__file__).parent / "_tmp"

# Cuando haya fotos: clave = el nombre del lugar (ver cada escena), valor = ruta del archivo.
CARPETA_FOTOS = pathlib.Path(__file__).parent / "fotos"
_p = lambda n: CARPETA_FOTOS / n
# Recortes de la tienda Moura (plan Premium).
FOTOS = {
    "barra-portada": _p("ropa.jpg"),
    "cat-banner": _p("banner-hombre.jpg"),
    "barra-prod1": _p("remera-mujer.jpg"),
    "barra-prod2": _p("short-mujer.jpg"),
        "cat-prod1": _p("remera-gris.jpg"),
    "cat-prod3": _p("remera-oliva.jpg"),
    "cat-prod2": _p("remera-crema.jpg"),
    "carrito-prod1": _p("rainbow.jpg"),
    "carrito-prod2": _p("witch.jpg"),
    "mkt-prod": _p("remera-crema.jpg"),
    "mkt-aviso": _p("remera-oliva.jpg"),
    "logo-l": _p("logo-l.png"),
    "badge-bf": _p("badge-bf.svg"),
    "badge-hs": _p("badge-hs.svg"),
    "badge-cm": _p("badge-cm.svg"),
    "pixel-meta": _p("pixel-meta.png"),
    "carrito-gris": _p("remera-gris.jpg"),
    "carrito-crema": _p("remera-crema.jpg"),
}
for _i in range(1, 4):
    FOTOS[f"carr{_i}"] = _p("banner.jpg")
# Foto del carrusel (slide de la tienda de hombre): si el archivo está, escena_6 la usa.
if _p("slide-hombre-1.jpg").exists():
    FOTOS["cat-slide"] = _p("slide-hombre-1.jpg")
if _p("slide-hombre-2.jpg").exists():
    FOTOS["cat-slide-2"] = _p("slide-hombre-2.jpg")
if _p("slide-hombre-3.jpg").exists():
    FOTOS["cat-slide-3"] = _p("slide-hombre-3.jpg")
    FOTOS[f"ban{_i}"] = _p("banner.jpg")
for _g in ("almohadones", "living"):
    for _i in range(3):
        FOTOS[f"inv-{_g}{_i}"] = _p("rainbow.jpg" if _i % 2 == 0 else "witch.jpg")


def foto_uri(clave):
    ruta = FOTOS.get(clave)
    if not ruta:
        return None
    ruta = pathlib.Path(ruta)
    tipo = {"png": "png", "jpg": "jpeg", "jpeg": "jpeg", "webp": "webp", "svg": "svg+xml"}[ruta.suffix.lstrip(".").lower()]
    return f"data:image/{tipo};base64," + base64.b64encode(ruta.read_bytes()).decode()


# ------------------------------------------------------------------ estilos
CSS = """
*{box-sizing:border-box;margin:0;padding:0}
html,body{width:1200px;height:1200px;overflow:hidden;font-family:'Manrope',system-ui,sans-serif;color:#17122F}
.stage{position:relative;width:1200px;height:1200px;overflow:hidden;background:#17122F;
  background-image:radial-gradient(ellipse 80% 70% at 20% 14%,rgba(108,79,212,.56),transparent 72%),
  radial-gradient(ellipse 60% 55% at 96% 100%,rgba(185,171,240,.22),transparent 72%)}
.trazo{position:absolute;opacity:.2}
.card{position:absolute;background:#fff;border-radius:46px;padding:44px 48px;box-shadow:0 70px 110px -40px rgba(6,3,24,.95),0 36px 90px -34px rgba(108,79,212,.6),0 0 0 1px rgba(255,255,255,.1)}
.h{font-size:40px;font-weight:800;letter-spacing:-.01em}
.sub{font-size:21px;color:#6b6679;margin-top:8px;line-height:1.35}
.lbl{font-size:19px;font-weight:600;color:#6b6679}
.in{height:62px;border-radius:22px;background:#F6F3FF;box-shadow:inset 0 0 0 1.5px #E6E0F7;padding:0 22px;display:flex;align-items:center;font-size:23px;font-weight:600;gap:14px}
.btn{height:64px;border-radius:22px;background:#6C4FD4;color:#fff;font-size:23px;font-weight:700;display:flex;align-items:center;justify-content:center;padding:0 34px}
.btn.out{background:#fff;color:#17122F;box-shadow:inset 0 0 0 2px #E7E0FA}
.chip{height:50px;border-radius:99px;padding:0 24px;display:flex;align-items:center;font-size:20px;font-weight:700;background:#F4F0FF;color:#4B33A8}
.chip.on{background:#6C4FD4;color:#fff}
.row{display:flex;align-items:center}.col{display:flex;flex-direction:column}
.sticker{position:absolute;border-radius:30px;padding:34px 46px;color:#fff;transform:rotate(-6deg);
  background:linear-gradient(135deg,#8269E0,#5B41C4);box-shadow:0 44px 70px -22px rgba(6,3,24,.8),0 0 70px -12px rgba(130,105,224,.7),inset 0 2px 0 rgba(255,255,255,.28),inset 0 -6px 14px rgba(40,20,110,.35);display:flex;flex-direction:column;align-items:center;gap:8px}
.sticker b{font-size:58px;font-weight:800;line-height:1}
.sticker small{font-size:19px;font-weight:800;letter-spacing:.08em;text-transform:uppercase;opacity:.9}
.pill{position:absolute;display:flex;align-items:center;gap:20px;background:#fff;color:#17122F;border-radius:40px;padding:22px 38px 22px 24px;font-size:31px;font-weight:700;box-shadow:0 40px 64px -26px rgba(6,3,24,.85),0 0 50px -14px rgba(185,171,240,.5),0 0 0 1px rgba(255,255,255,.12);white-space:nowrap}
.pill i{width:58px;height:58px;border-radius:50%;background:#FF9A52;display:flex;align-items:center;justify-content:center;flex:none}
.pill.azul{background:#2B2260;color:#fff;border-radius:30px;padding:20px 38px 20px 22px;box-shadow:0 40px 64px -26px rgba(6,3,24,.85),0 0 0 1px rgba(255,255,255,.16)}
.conexion{position:absolute;left:0;top:0}
.ph{background:linear-gradient(135deg,#E2D9FF,#B9ABF0);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;color:#4B33A8;text-align:center;overflow:hidden;position:relative}
.ph svg{width:34px;height:34px;opacity:.85}.ph span{font-size:15px;font-weight:700;line-height:1.25;max-width:78%}
.ph img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.ph{box-shadow:inset 0 0 0 1px rgba(255,255,255,.45),0 10px 22px -12px rgba(23,18,47,.35)}
.phone{position:absolute;background:#3B3262;border-radius:78px;padding:17px;box-shadow:0 80px 120px -34px rgba(6,3,24,.95),0 40px 100px -30px rgba(108,79,212,.65),inset 0 0 0 2px rgba(255,255,255,.22),inset 0 3px 0 rgba(255,255,255,.3)}
.screen{background:#fff;border-radius:62px;overflow:hidden;position:relative}
.status{height:78px;display:flex;align-items:center;justify-content:space-between;padding:6px 40px 0 44px;font-weight:800;font-size:24px;position:relative;background:#fff}
.island{position:absolute;left:50%;top:18px;width:28%;height:40px;border-radius:30px;background:#0b0818;transform:translateX(-50%)}
.bat{width:42px;height:21px;border:2px solid #17122F;border-radius:7px;position:relative;margin-left:8px}.bat:after{content:"";position:absolute;inset:2px;background:#17122F;border-radius:3px}
.bars{display:flex;align-items:flex-end;gap:3px;height:22px}.bars i{display:block;width:5px;background:#17122F;border-radius:2px}
.tienda-barra{height:50px;display:flex;align-items:center;justify-content:center;gap:34px;font-size:17px;font-weight:700;white-space:nowrap;overflow:hidden}
.tienda-head{height:84px;display:flex;align-items:center;justify-content:space-between;padding:0 34px;background:#fff}
.logo{font-size:23px;font-weight:800;letter-spacing:.26em;white-space:nowrap}
.tienda-iconos{display:flex;gap:26px}.tienda-iconos svg{width:34px;height:34px}
table{border-collapse:collapse;width:100%}th{font-size:16px;letter-spacing:.07em;text-align:left;color:#6b6679;font-weight:800;padding:14px 12px;background:#FAF8FF}
td{font-size:21px;font-weight:600;padding:14px 12px;border-top:1px solid #EFEAFB}
.ok{display:inline-block;background:#DCFCE7;color:#15803D;border-radius:99px;padding:6px 16px;font-size:17px;font-weight:700}
.thumb{width:58px;height:58px;border-radius:14px}
.tog{width:84px;height:48px;border-radius:99px;background:#6C4FD4;position:relative;flex:none}.tog:after{content:"";position:absolute;right:6px;top:6px;width:36px;height:36px;border-radius:50%;background:#fff}.tog.off{background:#D9D2EF}.tog.off:after{right:auto;left:6px}
.barra{height:16px;border-radius:99px;background:#EFEAFB;overflow:hidden}.barra i{display:block;height:100%;border-radius:99px;background:linear-gradient(90deg,#8269E0,#6C4FD4)}
.sw{width:50px;height:50px;border-radius:50%;box-shadow:inset 0 0 0 2px rgba(23,18,47,.12)}
"""

if True:  # imágenes con fondo lila (como las de Funcionalidades); el CSS de arriba es la base oscura
    CSS += """
.stage{background:linear-gradient(180deg,#EFEBFC 0%,#D8CEF5 100%)}
.trazo{opacity:.55}.trazo path{stroke:#B9ABF0}
.card{box-shadow:0 40px 70px -34px rgba(76,52,170,.38),0 0 0 1px rgba(108,79,212,.10)}
.sticker{box-shadow:0 34px 56px -22px rgba(76,52,170,.55),inset 0 2px 0 rgba(255,255,255,.28),inset 0 -6px 14px rgba(40,20,110,.3)}
.pill{box-shadow:0 30px 52px -26px rgba(76,52,170,.4),0 0 0 1px rgba(108,79,212,.1)}
.pill.azul{background:#17122F;box-shadow:0 30px 52px -22px rgba(23,18,47,.55)}
.phone{box-shadow:0 60px 90px -34px rgba(76,52,170,.5),inset 0 0 0 2px rgba(255,255,255,.22),inset 0 3px 0 rgba(255,255,255,.3)}
"""


ICONO_FOTO = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M4 5h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Zm4.5 3a1.8 1.8 0 1 0 0 3.6 1.8 1.8 0 0 0 0-3.6ZM4 17h16l-5.2-6.5-3.6 4.4-2.4-2.9L4 17Z"/></svg>'
CHECK = '<svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#17122F" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>'
TRAZO = '<svg class="trazo" style="{s}" width="360" height="540" viewBox="0 0 286 430" fill="none" overflow="visible"><path d="M313.2 425.5C294.6 387 251.8 351.2 215.3 334.7M215.3 334.7C200.8 328.1 187.3 324.5 176.7 325.1C140 324.9 117 350.2 127.2 370.6C139.8 398 167.2 390.1 193.1 363.7C202.3 354.6 209.9 344.8 215.3 334.7ZM215.3 334.7C227.3 312.3 228.9 288.7 215.1 270.6C197.3 246.5 165 244.9 136.4 226.3C69.6 184.2 30 101.1 13.9 3.6" stroke="#CFC3F7" stroke-width="27.9" stroke-linecap="round"/></svg>'
LUPA = '<svg viewBox="0 0 24 24" fill="none" stroke="#17122F" stroke-width="2.4" stroke-linecap="round"><circle cx="11" cy="11" r="6.5"/><path d="m16 16 4.5 4.5"/></svg>'
CORAZON = '<svg viewBox="0 0 24 24" fill="#17122F"><path d="M12 20.5S3.5 15.4 3.5 9.3A4.8 4.8 0 0 1 12 6.6a4.8 4.8 0 0 1 8.5 2.7c0 6.1-8.5 11.2-8.5 11.2z"/></svg>'
CARRITO = '<svg viewBox="0 0 24 24" fill="#17122F"><path d="M3 4h2.4l.5 2H21l-2 8H8.2l.4 1.6H19V18H7.1L4.4 6H3z"/><circle cx="9" cy="20.5" r="1.7"/><circle cx="17" cy="20.5" r="1.7"/></svg>'
MENU = '<svg viewBox="0 0 24 24" fill="none" stroke="#17122F" stroke-width="2.6" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg>'
FLECHA = '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#6b6679" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="m9 5 7 7-7 7"/></svg>'
BAJAR = '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 4v11m0 0 4-4m-4 4-4-4M5 20h14"/></svg>'


def foto(clave, texto, estilo="", clase=""):
    """Lugar para una foto: la real si está en FOTOS, si no un lugar marcado con lo que iría."""
    uri = foto_uri(clave)
    interior = f'<img src="{uri}">' if uri else f"{ICONO_FOTO}<span>Foto: {texto}</span>"
    return f'<div class="ph {clase}" style="{estilo}">{interior}</div>'


def sticker(titulo, chica, estilo):
    return f'<div class="sticker" style="{estilo}"><b>{titulo}</b><small>{chica}</small></div>'


def pill(texto, estilo):
    """Mensaje superpuesto: siempre píldora azul oscura (criterio de las imágenes)."""
    return f'<div class="pill azul" style="{estilo}"><i>{CHECK}</i>{texto}</div>'


def pill_azul(texto, estilo):
    """Frase clave de la función, superpuesta: píldora azul oscura con el check naranja (criterio de las imágenes)."""
    return f'<div class="pill azul" style="{estilo}"><i>{CHECK}</i>{texto}</div>'


def tarjeta(estilo, interior):
    return f'<div class="card" style="{estilo}">{interior}</div>'


def celular(estilo, alto, contenido):
    barras = "".join(f'<i style="height:{h}px"></i>' for h in (8, 12, 16, 20))
    return f"""<div class="phone" style="{estilo}"><div class="screen" style="height:{alto}px">
      <div class="status"><span>9:41</span><span class="island"></span>
      <span class="row"><span class="bars">{barras}</span><span class="bat"></span></span></div>{contenido}</div></div>"""


def cabecera_tienda(nombre="TU TIENDA"):
    return f'<div class="tienda-head"><span class="logo">{nombre}</span><span class="tienda-iconos">{LUPA}{CORAZON}{CARRITO}{MENU}</span></div>'


def pagina(cuerpo, transparente=False):
    extra = "<style>.stage{background:none !important}</style>" if transparente else ""
    return f"""<!doctype html><html><head><meta charset="utf-8">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Manrope:wght@500;600;700;800&display=swap">
<style>{CSS}</style>{extra}</head><body><div class="stage">{cuerpo}</div></body></html>"""


# ------------------------------------------------------------------ las 7 escenas
CAMPANA = '<svg viewBox="0 0 24 24" fill="#17122F" width="34" height="34"><path d="M12 22a2.4 2.4 0 0 0 2.4-2.4h-4.8A2.4 2.4 0 0 0 12 22Zm7-6.6V11a7 7 0 0 0-5.4-6.8V3.4a1.6 1.6 0 0 0-3.2 0v.8A7 7 0 0 0 5 11v4.4l-1.8 1.8V18h17.6v-.8L19 15.4Z"/></svg>'


def producto_fila(clave, i, precio, nombre=None):
    return (f'<div class="row" style="gap:20px;padding:16px 0;border-top:1px solid #EFEAFB">'
            f'{foto(clave + str(i), "producto", "width:86px;height:86px;border-radius:20px")}'
            f'<div class="col" style="flex:1"><b style="font-size:25px">{nombre or "Producto " + str(i)}</b><span class="lbl">Cantidad: 1</span></div>'
            f'<b style="font-size:25px">{precio}</b></div>')


def escena_1():
    """Categorías con su propia página: menú que se despliega y página de la categoría (como una tienda real)."""
    azul = "#1F3A5F"
    barra = ('<div style="height:46px;background:#17122F;color:#fff;display:flex;align-items:center;justify-content:space-around;'
             'font-size:17px;font-weight:700;white-space:nowrap;overflow:hidden"><span>Envíos a todo el país 💙🤍💙</span>'
             '<span>🔥 Nueva colección 🔥</span><span>HECHO CON 💙 EN ARGENTINA 🧉</span></div>')
    icono = lambda svg: f'<span style="width:26px;height:26px;display:block">{svg}</span>'
    cabecera = (f'<div style="height:78px;display:flex;align-items:center;gap:26px;padding:0 34px;border-bottom:1px solid #EFEAFB;white-space:nowrap">'
                f'<span class="logo" style="font-size:22px">TU TIENDA</span>'
                f'<div style="width:250px;height:48px;border-radius:99px;background:#F3F1F8;display:flex;align-items:center;gap:12px;padding:0 18px;color:#6b6679;font-size:18px;font-weight:600">'
                f'<span style="width:22px;height:22px;display:block">{LUPA}</span>¿Qué estás buscando?</div>'
                f'<div style="margin-left:auto;display:flex;align-items:center;gap:22px;font-size:19px;font-weight:600">'
                f'<span>Inicio</span><span style="color:{azul}">Productos</span><span>Preguntas</span><span>Contacto</span>{icono(CORAZON)}{icono(CARRITO)}</div></div>')
    pared = "#d3b797"  # color de la pared de las fotos de las remeras (arena)
    uri_banner = foto_uri("cat-banner")
    fondo_banner = (f'<img src="{uri_banner}" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center 35%">' if uri_banner else
                    '<div style="position:absolute;right:70px;top:50%;transform:translateY(-50%);font-size:16px;font-weight:700;color:#fff;opacity:.9;text-align:center;line-height:1.35">Foto: modelo<br>a un costado</div>')
    banner = (f'<div style="position:relative;height:250px;background:linear-gradient(90deg,{pared},#DCC39B);overflow:hidden">' + fondo_banner
              + '<div style="position:absolute;inset:0;background:linear-gradient(0deg,rgba(23,18,47,.34),rgba(23,18,47,.18))"></div>'
              + '<div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;color:#fff;font-size:56px;font-weight:800;letter-spacing:-.02em;text-shadow:0 2px 18px rgba(23,18,47,.4)">Remeras</div></div>')
    migas = (f'<div class="row" style="justify-content:space-between;padding:24px 34px 0"><div style="font-size:18px;color:#6b6679;font-weight:600">'
             f'<span style="color:{azul}">Inicio</span> / <span style="color:{azul}">Productos</span> / Remeras</div>'
             f'<div class="row" style="gap:12px;font-size:18px;color:#6b6679;font-weight:600">Ordenar por'
             f'<span style="padding:10px 18px;border-radius:14px;background:#fff;box-shadow:inset 0 0 0 1.5px #D9D2EF;color:#17122F;font-weight:600">Más recientes ⌄</span></div></div>')
    productos = [("Remera gris", "$14.900"), ("Remera crema", "$14.900"), ("Remera oliva", "$14.900")]
    cards = "".join(
        f'<div class="col" style="flex:1;gap:6px">{foto("cat-prod" + str(i), "producto " + str(i), "height:330px;border-radius:18px")}'
        f'<b style="font-size:20px;margin-top:8px">{n}</b><span style="color:{azul};font-weight:800;font-size:20px">{p}</span></div>'
        for i, (n, p) in enumerate(productos, 1))
    ventana = tarjeta("left:50px;top:230px;width:1100px;padding:0;overflow:hidden;border-radius:40px", f"""
      {barra}{cabecera}{banner}{migas}
      <div class="row" style="gap:28px;padding:22px 34px 46px;align-items:flex-start">{cards}</div>""")
    return (TRAZO.format(s="right:-70px;top:-40px") + ventana
            + sticker("Una página", "Para cada categoría", "left:56px;top:118px;white-space:nowrap")
            + pill_azul("Con su propio filtro", "left:700px;top:105px;font-size:31px"))


def lateral_admin(activo, paso=37, hueco=32):
    """Barra lateral colapsada del panel de administración (íconos sólidos, como el panel real).
    Sin la estrella de Reseñas y con un espacio entre grupos (tablero a descuentos | carrusel a medios | tienda a configuración | ayuda y cuenta).
    `paso` es la separación entre íconos y `hueco` el espacio extra entre grupos: se ajustan para que entre todo sin cortarse."""
    solido = lambda d, extra="": f'<svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" {extra}>{d}</svg>'
    iconos = {
        "Estadísticas": solido('<path fill-rule="evenodd" d="M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zm1 4.6a1 1 0 0 0-2 0v1.2a1 1 0 0 0 2 0zM7.6 9.2a1 1 0 0 0-1.4 1.4l.8.9a1 1 0 0 0 1.4-1.4zm9.2 0-.9.9a1 1 0 1 0 1.4 1.4l.9-.9a1 1 0 0 0-1.4-1.4zM12 11l3.5-2.5-2 4.1A2 2 0 1 1 12 11z"/>'),
        "Productos": solido('<path d="M4 3h16a1 1 0 0 1 .9.6L22 7H2l1.100-3.400A1 1 0 0 1 4 3zM2 9h20v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2zm7 2a1 1 0 0 0 0 2h6a1 1 0 0 0 0-2z"/>'),
        "Categorías": solido('<path fill-rule="evenodd" d="M2 4a1 1 0 0 1 1-1h7.200a2 2 0 0 1 1.400.600l8.800 8.800a2 2 0 0 1 0 2.800l-5.400 5.400a2 2 0 0 1-2.800 0L3.400 12.800A2 2 0 0 1 2.800 11.400zm5.500 1.500a1.500 1.500 0 1 0 0 3 1.500 1.500 0 0 0 0-3z"/><path d="M12.500 3H14a2 2 0 0 1 1.400.600l7 7a2 2 0 0 1 0 2.800L19 16.800l2.700-2.700a1 1 0 0 0 0-1.400L13.900 4.900z" opacity=".6"/>'),
        "Pedidos": solido('<path d="M2 3h2.600l.6 2H22l-2.200 8.500H8l.4 1.500H19v2H6.900L3.500 5H2z"/><circle cx="9" cy="20" r="1.700"/><circle cx="17" cy="20" r="1.700"/>'),
        "Clientes": solido('<circle cx="12" cy="8" r="3.400"/><path d="M5.500 20c0-3.600 2.900-6 6.500-6s6.500 2.400 6.500 6z"/><circle cx="5.500" cy="9" r="2.400"/><circle cx="18.500" cy="9" r="2.400"/><path d="M1.500 18c0-2.400 1.600-4 4-4 .7 0 1.300.1 1.900.4-1 1-1.600 2.200-1.800 3.600zM22.500 18c0-2.400-1.600-4-4-4-.7 0-1.300.1-1.900.4 1 1 1.600 2.200 1.800 3.600z"/>'),
        "Descuentos": solido('<path fill-rule="evenodd" d="M3 6h18v3.200a2.800 2.800 0 0 0 0 5.600V18H3v-3.200a2.800 2.800 0 0 0 0-5.600zm6 3.500a1 1 0 0 0 0 2h6a1 1 0 0 0 0-2zm0 3.500a1 1 0 0 0 0 2h6a1 1 0 0 0 0-2z"/>'),
        "Reseñas": solido('<path d="M12 2.500l2.900 6 6.600.9-4.800 4.600 1.200 6.500L12 17.400 6.100 20.500l1.200-6.500L2.500 9.400l6.600-.9z"/>'),
        "Diseño": solido('<path fill-rule="evenodd" d="M12 2a10 10 0 1 0 0 20c1.700 0 2.500-1.300 2-2.700-.5-1.400.3-2.800 1.800-2.800H19a3 3 0 0 0 3-3C22 6.500 17.500 2 12 2zM7 11a1.500 1.500 0 1 1 0-3 1.500 1.500 0 0 1 0 3zm3-3.500a1.500 1.500 0 1 1 0-3 1.500 1.500 0 0 1 0 3zm5 0a1.500 1.500 0 1 1 0-3 1.500 1.500 0 0 1 0 3zm3.500 4a1.500 1.500 0 1 1 0-3 1.500 1.500 0 0 1 0 3z"/>'),
        "Carrusel": solido('<path d="M6 3h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm1 11h12l-3.500-4.500-2.500 3-1.500-1.800zm1.500-7a1.500 1.500 0 1 0 0 3 1.500 1.500 0 0 0 0-3z" fill-rule="evenodd"/><path d="M2 7v12a2 2 0 0 0 2 2h14v-2H4V7z"/>'),
        "Banners": solido('<path d="M4 2.500a1 1 0 0 1 2 0V4h12.500a1 1 0 0 1 .8 1.600L17.400 9l1.900 3.400a1 1 0 0 1-.8 1.600H6v7.500a1 1 0 0 1-2 0z"/>'),
        "Complementos": solido('<path d="M9 3a2 2 0 0 1 4 0v1.500h3.500A1.500 1.500 0 0 1 18 6v3.500h1.500a2 2 0 0 1 0 4H18V17a2 2 0 0 1-2 2h-3.500v-1.500a2 2 0 0 0-4 0V19H5a2 2 0 0 1-2-2v-3.500h1.500a2 2 0 0 0 0-4H3V6a1.500 1.500 0 0 1 1.500-1.500H9z"/>'),
        "Medios": solido('<path d="M4 3h13a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm1 10h11l-3-4-2.500 3-1.500-1.700zM7 6a1.400 1.400 0 1 0 0 2.800A1.400 1.400 0 0 0 7 6z" fill-rule="evenodd"/><path d="M21 8v10a2 2 0 0 1-2 2H7v2h12a4 4 0 0 0 4-4V8z"/>'),
        "Comercial": solido('<path d="M3.500 3h17l1.500 5.500a3 3 0 0 1-5.500 1.700 3 3 0 0 1-5 0 3 3 0 0 1-5 0A3 3 0 0 1 2 8.500zM4 12.500a4 4 0 0 0 1.500-.400V20h13v-7.900a4 4 0 0 0 1.500.4V21a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1z"/>'),
        "Configuración": solido('<path fill-rule="evenodd" d="M10.300 2h3.400l.6 2.600c.6.200 1.100.5 1.600.900l2.500-.8 1.700 3-1.900 1.800c.1.500.1 1 0 1.500l1.900 1.800-1.700 3-2.500-.8c-.5.400-1 .7-1.600.9L13.700 22h-3.400l-.6-2.600c-.6-.2-1.100-.5-1.600-.9l-2.500.8-1.700-3 1.900-1.800a5 5 0 0 1 0-1.500L4 9.200l1.700-3 2.500.8c.5-.4 1-.7 1.600-.9zM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z"/>'),
        "Ayuda": solido('<path fill-rule="evenodd" d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm.1 4.500c-2 0-3.300 1.200-3.400 2.900h1.900c.1-.7.600-1.100 1.400-1.100.800 0 1.300.5 1.300 1.100 0 .6-.3.900-1 1.400-.9.600-1.300 1.200-1.300 2.200v.3h1.800v-.2c0-.6.200-.8.900-1.300.9-.6 1.500-1.300 1.500-2.400 0-1.700-1.400-2.900-3.100-2.900zM11 16.500v2h2v-2z"/>'),
        "Mi cuenta": solido('<circle cx="12" cy="7.500" r="4.500"/><path d="M3.500 21c0-4.400 3.800-7 8.500-7s8.500 2.600 8.500 7z"/>'),
    }
    grupos = [["Estadísticas", "Productos", "Categorías", "Pedidos", "Clientes", "Descuentos"],
              ["Carrusel", "Banners", "Complementos", "Medios"],
              ["Comercial", "Diseño", "Configuración"],
              ["Ayuda", "Mi cuenta"]]
    alto_item = paso - 2
    menu = ""
    for g, grupo in enumerate(grupos):
        for n in grupo:
            menu += (f'<div style="display:flex;align-items:center;justify-content:center;height:{alto_item}px;margin:0 12px 2px;border-radius:13px;'
                     f'{"background:#E2D9FF;color:#6C4FD4" if n == activo else "color:#64748B"}">{iconos[n]}</div>')
        if g < len(grupos) - 1:
            menu += f'<div style="height:{hueco}px"></div>'
    lateral = (f'<div style="position:absolute;left:0;top:0;bottom:0;width:84px;border-right:1px solid #ECE8F5;background:#fff">'
               f'<div style="display:flex;align-items:center;justify-content:center;height:84px;border-bottom:1px solid #ECE8F5">'
               f'<img src="{foto_uri("logo-l")}" style="width:46px;height:46px;border-radius:13px;display:block"></div>'
               f'<div style="padding-top:10px">{menu}</div></div>')
    return lateral


def escena_2(parte="completa"):
    """Panel Clientes (como el dashboard real). Tesis espacial: la tabla es lo principal; la barra lateral se colapsa a íconos
    (el panel real tiene ese botón «) para dar ancho a las columnas; el detalle del cliente se superpone abajo a la derecha y deja
    ver las primeras filas completas."""
    def ico(trazo, relleno=False, tam=20):
        return (f'<svg viewBox="0 0 24 24" width="{tam}" height="{tam}" fill="{"currentColor" if relleno else "none"}" stroke="currentColor" '
                f'stroke-width="2" stroke-linecap="round" stroke-linejoin="round">{trazo}</svg>')
    lateral = lateral_admin("Clientes")
    calendario = ico('<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>', tam=18)
    filtro = lambda ancho: (f'<div style="width:{ancho}px;height:46px;border-radius:12px;background:#fff;box-shadow:inset 0 0 0 1.5px #E6E2F0;display:flex;'
                            f'align-items:center;justify-content:space-between;padding:0 14px;font-size:17px;color:#6b6679;font-weight:500">dd/mm/aaaa<span style="color:#17122F">{calendario}</span></div>')
    cabecera = ('<div style="display:flex;align-items:center;justify-content:space-between;height:84px;padding:0 30px;background:#fff;border-bottom:1px solid #ECE8F5">'
                '<div style="display:flex;align-items:center;gap:18px"><span style="width:44px;height:40px;border-radius:12px;box-shadow:inset 0 0 0 1.5px #E6E2F0;display:flex;align-items:center;justify-content:center;font-size:22px;font-weight:800">«</span>'
                '<span style="font-size:28px;font-weight:800">Clientes</span></div>'
                '<div style="display:flex;align-items:center;gap:12px"><span style="padding:11px 18px;border-radius:12px;box-shadow:inset 0 0 0 1.5px #E6E2F0;font-size:17px;font-weight:600">Ver tienda ↗</span>'
                '<span style="padding:9px 18px;border-radius:99px;background:#E2D9FF;color:#5B41C4;font-size:16px;font-weight:700">Admin</span></div></div>')
    pesta = ('<div style="display:flex;gap:12px"><span style="padding:12px 22px;border-radius:99px;background:#6C4FD4;color:#fff;font-size:18px;font-weight:700">Clientes</span>'
             '<span style="padding:12px 22px;border-radius:99px;background:#fff;box-shadow:inset 0 0 0 1.5px #E6E2F0;font-size:18px;font-weight:700;color:#4A4560">Eliminados (0)</span></div>')
    filtros = (f'<div style="display:flex;align-items:center;gap:12px;margin-top:20px;white-space:nowrap"><span style="font-size:17px;font-weight:600;color:#6b6679">Desde</span>{filtro(160)}'
               f'<span style="font-size:17px;font-weight:600;color:#6b6679">Hasta</span>{filtro(160)}'
               f'<div style="flex:1;height:46px;border-radius:12px;background:#fff;box-shadow:inset 0 0 0 1.5px #E6E2F0;display:flex;align-items:center;padding:0 16px;font-size:17px;color:#8c87a0">Buscar por nombre, email o teléfono…</div>'
               f'</div>')
    info = ('<div style="display:flex;gap:10px;align-items:center;margin-top:18px;font-size:20px;color:#4A4560;white-space:nowrap">'
            '<span style="flex:none;width:20px;height:20px;border-radius:50%;background:#6C4FD4;color:#fff;font-size:13px;font-weight:800;display:flex;align-items:center;justify-content:center">i</span>'
            '<span>Clientes con <b>al menos un pedido entregado</b>.</span></div>')
    cols = "grid-template-columns:34px 1.8fr 1.1fr .7fr .9fr 1.1fr 100px"
    chk = '<span style="width:22px;height:22px;border-radius:6px;box-shadow:inset 0 0 0 2px #6b6679;display:block"></span>'
    clientes = [("Valentina Gómez", "vale.gomez@correo.com", "351 612 7547", 3, "$ 58.400", "16/11/2026"),
                ("Camila Ríos", "camila.rios@correo.com", "351 555 0123", 4, "$ 84.500", "14/11/2026"),
                ("Lucas Pereyra", "lucas.p@correo.com", "261 440 0187", 2, "$ 31.200", "12/11/2026"),
                ("Sofía Medina", "sofi.medina@correo.com", "11 5550 0142", 7, "$ 126.800", "09/11/2026")]
    acciones = ('<div style="display:flex;gap:8px"><span style="width:44px;height:38px;border-radius:10px;box-shadow:inset 0 0 0 1.5px #D9D5E6;display:flex;align-items:center;justify-content:center">'
                + ico('<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>') +
                '</span><span style="width:44px;height:38px;border-radius:10px;box-shadow:inset 0 0 0 1.5px #D9D5E6;display:flex;align-items:center;justify-content:center">'
                + ico('<path d="M3 3l18 18M10.6 5.2A9.6 9.6 0 0 1 12 5c6.5 0 10 7 10 7a17 17 0 0 1-3 3.8M6.3 6.4C3.7 8.1 2 12 2 12s3.5 7 10 7c1.7 0 3.2-.4 4.5-1"/>') + '</span></div>')
    filas = "".join(
        f'<div style="display:grid;{cols};align-items:center;padding:15px 22px;border-top:1px solid #ECE8F5;font-size:18px">{chk}'
        f'<div><b style="font-size:19px">{n}</b><div style="color:#6b6679;font-size:16px;margin-top:2px">{e}</div></div><span>{t}</span>'
        f'<span style="width:32px;height:32px;border-radius:50%;background:#E2D9FF;color:#5B41C4;font-size:15px;font-weight:700;display:flex;align-items:center;justify-content:center">{p}</span>'
        f'<b>{m}</b><span>{u}</span>{acciones}</div>' for n, e, t, p, m, u in clientes)
    tabla = (f'<div style="margin-top:20px;border-radius:14px;background:#fff;box-shadow:inset 0 0 0 1px #ECE8F5;overflow:hidden">'
             f'<div style="display:grid;{cols};align-items:center;padding:15px 22px;background:#FAF9FC;font-size:15px;font-weight:800;letter-spacing:.06em;color:#4A4560">'
             f'{chk}<span>CLIENTE</span><span>TELÉFONO</span><span>PEDIDOS</span><span>TOTAL</span><span>ÚLTIMA COMPRA</span><span></span></div>{filas}</div>')
    principal = (f'<div style="position:absolute;left:84px;right:0;top:0;bottom:0;background:#F4F3F7">{cabecera}'
                 f'<div style="padding:24px 30px 0">{pesta}{filtros}{tabla}</div></div>')
    ventana = tarjeta("left:50px;top:196px;width:1100px;height:770px;padding:0;overflow:hidden;border-radius:40px", f"{lateral}{principal}")
    fila_dato = lambda svg, txt, color="#17122F": (f'<div style="display:flex;align-items:center;gap:14px;height:38px;font-size:20px;color:{color}">'
                                                   f'<span style="color:#6C4FD4;flex:none">{svg}</span>{txt}</div>')
    dato = lambda tit, val: (f'<div style="border-radius:14px;background:#FAFAFC;box-shadow:inset 0 0 0 1.5px #E6E2F0;padding:12px 18px">'
                             f'<div style="font-size:17px;color:#17122F;font-weight:700">{tit}</div><div style="font-size:26px;font-weight:800;margin-top:2px">{val}</div></div>')
    modal = tarjeta("left:630px;top:626px;width:520px;padding:28px 32px 26px;border-radius:26px;box-shadow:0 -26px 56px -6px rgba(76,52,170,.42),0 -6px 18px -4px rgba(23,18,47,.16),0 40px 70px -34px rgba(23,18,47,.4),0 0 0 1px rgba(108,79,212,.14)", f"""
      <div style="display:flex;justify-content:space-between;align-items:center"><div style="font-size:30px;font-weight:800">Valentina Gómez</div>
      <span style="width:44px;height:44px;border-radius:12px;box-shadow:inset 0 0 0 1.5px #E6E2F0;display:flex;align-items:center;justify-content:center;font-size:21px;font-weight:800;color:#4A4560">✕</span></div>
      <div style="margin-top:14px">{fila_dato(ico('<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>'), "vale.gomez@correo.com")}
      {fila_dato(ico('<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A15 15 0 0 1 3 6a2 2 0 0 1 2-2z"/>'), "351 612 7547")}
      {fila_dato(ico('<path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.800 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>'), "Av. Siempreviva 742, Córdoba")}</div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:18px">{dato("Pedidos", "3")}{dato("Total", "$ 58.400")}</div>
      <div style="display:flex;justify-content:flex-end;margin-top:18px"><div id="cerrar" class="btn" style="height:50px;font-size:19px;padding:0 28px">Cerrar</div></div>""")
    if parte == "ventana":  # capa animada: solo el detalle del cliente, sobre fondo transparente
        return modal
    resto = (sticker("Tus clientes", "Pedidos entregados", "left:676px;top:104px;white-space:nowrap")
             + pill("Exportalos para tus campañas", "left:70px;top:1050px;font-size:31px"))
    if parte == "base":  # imagen de la página: el panel de clientes, sin el detalle
        return TRAZO.format(s="left:-100px;top:-120px") + ventana + resto
    return TRAZO.format(s="left:-100px;top:-120px") + ventana + modal + resto


def escena_3(parte="completa"):
    """Inventario por categorías: la lista de categorías del panel y la ventana de stock que abre el botón de cajas."""
    sol = lambda d, tam=20: f'<svg viewBox="0 0 24 24" width="{tam}" height="{tam}" fill="currentColor">{d}</svg>'
    lapiz = sol('<path d="M3 17.500V21h3.500L18 9.500 14.500 6zM20.700 7a1 1 0 0 0 0-1.400l-2.300-2.300a1 1 0 0 0-1.400 0l-1.800 1.800L18.900 8.800z"/>')
    cajas = sol('<path d="M12 2l5 3v6l-5 3-5-3V5zM7 14l5 3v5l-5-3zm10 0v5l-5 3v-5z" opacity=".95"/><path d="M2 12l5-3v6l-5 3zM22 12l-5-3v6l5 3z" opacity=".55"/>')
    papelera = sol('<path d="M9 3h6l1 2h5v2H3V5h5zM5 9h14l-1 12H6z"/>')
    cabecera = ('<div style="display:flex;align-items:center;justify-content:space-between;height:84px;padding:0 30px;background:#fff;border-bottom:1px solid #ECE8F5">'
                '<div style="display:flex;align-items:center;gap:18px"><span style="width:44px;height:40px;border-radius:12px;box-shadow:inset 0 0 0 1.5px #E6E2F0;display:flex;align-items:center;justify-content:center;font-size:22px;font-weight:800">«</span>'
                '<span style="font-size:28px;font-weight:800">Categorías</span></div>'
                '<div style="display:flex;align-items:center;gap:12px"><span style="padding:11px 18px;border-radius:12px;box-shadow:inset 0 0 0 1.5px #E6E2F0;font-size:17px;font-weight:600">Ver tienda ↗</span>'
                '<span style="padding:9px 18px;border-radius:99px;background:#E2D9FF;color:#5B41C4;font-size:16px;font-weight:700">Admin</span></div></div>')
    sub = ('<div style="display:flex;align-items:center;justify-content:space-between"><span style="font-size:19px;color:#6b6679">Organizá el catálogo por categorías</span>'
           '<span style="padding:13px 24px;border-radius:14px;background:#6C4FD4;color:#fff;font-size:18px;font-weight:700">+ Nueva categoría</span></div>')
    cols = "grid-template-columns:1.9fr 2fr .6fr .8fr 170px"
    cats = [("Bermudas", "bermudas"), ("Pantalones", "pantalones"), ("Remeras", "remeras"), ("Camperas", "camperas"), ("Buzos", "buzos"), ("Calzado", "calzado"), ("Accesorios", "accesorios")]
    caja = lambda svg, extra="": (f'<span style="width:48px;height:40px;border-radius:10px;background:#fff;box-shadow:inset 0 0 0 1.5px #D9D5E6;display:flex;align-items:center;justify-content:center;color:#17122F;{extra}">{svg}</span>')
    filas = ""
    for k, (n, sl) in enumerate(cats, 1):
        resaltado = "color:#5B41C4;box-shadow:inset 0 0 0 2px #6C4FD4,0 0 0 5px rgba(108,79,212,.22)" if k == 3 else ""
        filas += (f'<div style="display:grid;{cols};align-items:center;padding:0 24px;height:66px;border-top:1px solid #ECE8F5;font-size:19px">'
                  f'<b>{n}</b><span style="font-family:Consolas,monospace;color:#2A2540;font-size:18px">{sl}</span><span>{k}</span>'
                  f'<span style="justify-self:start;padding:6px 14px;border-radius:99px;background:#DCFCE7;color:#15803D;font-size:16px;font-weight:700">Activa</span>'
                  f'<div style="display:flex;gap:8px;justify-content:flex-end">{caja(lapiz)}{caja(cajas, resaltado)}{caja(papelera, "color:#DC2626;box-shadow:inset 0 0 0 1.5px #F3B4B4")}</div></div>')
    tabla = (f'<div style="margin-top:20px;border-radius:14px;background:#fff;box-shadow:inset 0 0 0 1px #ECE8F5;overflow:hidden">'
             f'<div style="display:grid;{cols};align-items:center;padding:0 24px;height:52px;background:#FAF9FC;font-size:15px;font-weight:800;letter-spacing:.06em;color:#4A4560">'
             f'<span>NOMBRE</span><span>SLUG</span><span>ORDEN</span><span>ESTADO</span><span></span></div>{filas}</div>')
    principal = (f'<div style="position:absolute;left:84px;right:0;top:0;bottom:0;background:#F4F3F7">{cabecera}<div style="padding:26px 30px 0">{sub}{tabla}</div></div>')
    ventana = tarjeta("left:50px;top:196px;width:1100px;height:770px;padding:0;overflow:hidden;border-radius:40px", f"{lateral_admin('Categorías')}{principal}")

    def producto(nombre, k):
        # los campos de precio y stock se dibujan en vivo (InventarioAnimado): acá quedan solo sus lugares, invisibles
        return (f'<div style="display:flex;align-items:center;justify-content:space-between;padding:14px 20px;border-radius:14px;box-shadow:inset 0 0 0 1.5px #E6E2F0;margin-bottom:12px;background:#fff">'
                f'<div style="font-size:21px;font-weight:800">{nombre}</div>'
                f'<div style="display:flex;gap:12px"><span id="fp-{k}" style="display:block;width:130px;height:46px;visibility:hidden"></span>'
                f'<span id="fs-{k}" style="display:block;width:96px;height:46px;visibility:hidden"></span></div></div>')
    lista = producto("Remera gris", 1) + producto("Remera crema", 2) + producto("Remera oliva", 3)
    modal = tarjeta("left:630px;top:640px;width:520px;padding:28px 30px 26px;border-radius:26px;box-shadow:0 -26px 56px -6px rgba(76,52,170,.42),0 -6px 18px -4px rgba(23,18,47,.16),0 40px 70px -34px rgba(23,18,47,.4),0 0 0 1px rgba(108,79,212,.14)", f"""
      <div style="display:flex;justify-content:space-between;align-items:center"><div style="font-size:30px;font-weight:800">Inventario</div>
      <span style="width:44px;height:44px;border-radius:12px;box-shadow:inset 0 0 0 1.5px #E6E2F0;display:flex;align-items:center;justify-content:center;font-size:21px;font-weight:800;color:#4A4560">✕</span></div>
      <div style="display:flex;justify-content:flex-end;gap:12px;padding:0 20px;margin:18px 0 8px;font-size:17px;font-weight:700;color:#17122F"><span style="width:130px">Precio</span><span style="width:96px">Stock</span></div>
      {lista}
      <div style="display:flex;justify-content:flex-end;gap:12px;margin-top:10px">
      <span style="height:52px;padding:0 26px;border-radius:12px;box-shadow:inset 0 0 0 1.5px #D9D5E6;display:flex;align-items:center;font-size:19px;font-weight:700">Cancelar</span>
      <span class="btn" style="height:52px;font-size:19px;padding:0 26px;border-radius:12px">Guardar inventario</span></div>""")
    # línea punteada: del botón de cajas de "Remeras" a la ventana de inventario que abre
    linea = ('<svg class="conexion" width="1200" height="1200" viewBox="0 0 1200 1200" fill="none">'
             '<path d="M1016 618 V642" stroke="#7C6AE0" stroke-width="6" stroke-linecap="round" stroke-dasharray="1 11"/>'
             '<circle cx="1016" cy="642" r="7" fill="#7C6AE0"/></svg>')
    if parte == "ventana":  # capa animada: solo la ventana de inventario y su línea, sobre fondo transparente
        return modal
    resto = (sticker("Inventario", "Por categoría", "left:676px;top:104px;white-space:nowrap")
             + pill("Gestión rápida", "left:70px;top:1050px;font-size:31px"))
    if parte == "base":  # imagen de la página: la lista de categorías, sin la ventana
        return TRAZO.format(s="left:-100px;top:-120px") + ventana + resto
    return TRAZO.format(s="left:-100px;top:-120px") + ventana + modal + resto


def escena_barra():
    """Olvidate de anuncios: la barra de la tienda (con sus mensajes en movimiento en la página), conectada con línea punteada al panel."""
    mensajes = ["🔥 Compra mínima $70.000", "Envíos a todo el país 💙🤍💙", "Solo transferencia"]
    filas = "".join(f'<div class="in" style="margin-top:12px"><span style="color:#B9ABF0;font-size:26px">⠿</span>{m}</div>' for m in mensajes)
    colores = ["#FD5CCE", "#6C4FD4", "#17122F", "#E3F547", "#FF9A52", "#2DB5A0"]
    sw = "".join(f'<span class="sw" style="background:{c};{"box-shadow:0 0 0 4px #fff,0 0 0 7px #6C4FD4" if i == 2 else ""}"></span>' for i, c in enumerate(colores))
    panel = tarjeta("left:620px;top:92px;width:540px", f"""
      <div class="h">Barra promocional</div><div class="sub">Los mensajes se ven arriba de tu tienda.</div>
      <div class="lbl" style="margin-top:26px">Mensajes</div>{filas}
      <div class="in" style="margin-top:12px;background:#fff;color:#6C4FD4;justify-content:center;box-shadow:inset 0 0 0 2px #CFC3F7;border-style:dashed">+ Agregar mensaje</div>
      <div class="lbl" style="margin-top:26px">Color de la barra</div>
      <div class="row" style="gap:16px;margin-top:12px">{sw}</div>
      <div class="row" style="justify-content:flex-end;margin-top:30px"><div class="btn">Guardar</div></div>""")
    productos = [("Remera básica", "$14.900"), ("Short de jean", "$19.900")]
    cards = "".join(
        f'<div class="col" style="flex:1;gap:6px">{foto("barra-prod" + str(k), "producto " + str(k), "height:160px;border-radius:20px")}'
        f'<b style="font-size:19px;margin-top:6px">{n}</b><span style="color:#6C4FD4;font-weight:800;font-size:19px">{p}</span></div>'
        for k, (n, p) in enumerate(productos, 1))
    tel = celular("left:50px;top:445px;width:500px", 900, f"""
      <div class="tienda-barra" style="background:#17122F;color:#fff"><span>🔥 Compra mínima $70.000</span><span>Envíos a todo el país 💙🤍💙</span></div>
      {cabecera_tienda()}{foto("barra-portada", "portada de la tienda", "height:300px;border-radius:0")}
      <div class="row" style="gap:16px;padding:22px 22px 0;align-items:flex-start">{cards}</div>""")
    # línea punteada: sale del final de la barra del celular y entra al primer mensaje del panel
    linea = ('<svg class="conexion" width="1200" height="1200" viewBox="0 0 1200 1200" fill="none">'
             '<path d="M546 565 H584 V300 H626" stroke="#9F8FEF" stroke-width="6" stroke-linecap="round" stroke-dasharray="1 13"/>'
             '<circle cx="546" cy="565" r="10" fill="#fff" stroke="#9F8FEF" stroke-width="4"/>'
             '<circle cx="626" cy="300" r="7" fill="#9F8FEF"/></svg>')
    azul = pill_azul("Sin Lemora Ads", "left:640px;top:900px;font-size:33px")
    return (TRAZO.format(s="right:-80px;top:700px") + tel + linea + panel
            + sticker("Tu barra", "Tus mensajes y tu color", "left:60px;top:150px;white-space:nowrap")
            + azul)


def escena_carrito():
    """Gastos de gestión y envío gratis. Tesis espacial: a la izquierda las dos tarjetas de configuración apiladas (envío gratis
    arriba, gastos de gestión abajo) y a la derecha UN carrito con toda la información (productos, subtotal, envío gratis,
    gastos de gestión y total); una línea punteada une cada tarjeta con la línea del carrito que cambia."""
    azul = "#17122F"
    caja = "margin-top:10px;height:62px;border-radius:12px;background:#fff;box-shadow:inset 0 0 0 1.5px #E6E2F0;display:flex;align-items:center;font-size:25px;font-weight:600;color:#17122F"
    campo = lambda label, valor, flecha="": (
        f'<div style="flex:1"><div style="font-size:22px;font-weight:700;line-height:1.2">{label}</div>'
        f'<div style="{caja};padding:0 18px;justify-content:space-between">{valor}{flecha}</div></div>')
    guardar = '<div class="row" style="justify-content:flex-end;margin-top:37px"><div class="btn" style="height:58px;font-size:22px;padding:0 34px;border-radius:14px">Guardar</div></div>'
    base = "width:520px;padding:30px 32px 28px;border-radius:26px"
    envio = tarjeta(f"left:40px;top:677px;{base}", f"""
      <div style="font-size:36px;font-weight:800">Envío gratuito</div>
      <div style="display:flex;gap:24px;margin-top:33px">{campo("Cantidad mínima", "3")}{campo("Monto mínimo ($)", "50.000")}</div>
      {guardar}""")
    chk = ('<span style="width:28px;height:28px;border-radius:8px;background:#6C4FD4;display:flex;align-items:center;justify-content:center;flex:none">'
           '<svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="#fff" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.500l4.500 4.500L19 7.500"/></svg></span>')
    flecha = '<span style="color:#6b6679;font-size:17px">⌄</span>'
    gestion = tarjeta(f"left:40px;top:230px;{base}", f"""
      <div style="font-size:36px;font-weight:800">Gastos de gestión</div>
      <div style="display:flex;align-items:center;gap:14px;font-size:23px;font-weight:700;margin-top:22px">{chk}Habilitar gastos de gestión</div>
      <div style="display:flex;gap:24px;margin-top:33px">{campo("Tipo de costo", "Costo fijo", flecha)}{campo("Monto fijo", "1.200")}</div>
      {guardar}""")

    # ---- el carrito con toda la información
    carrito_ico = '<svg viewBox="0 0 24 24" width="34" height="34" fill="#6C4FD4"><path d="M2 3h2.600l.6 2H22l-2.200 8.500H8l.4 1.500H19v2H6.900L3.500 5H2z"/><circle cx="9" cy="20" r="1.700"/><circle cx="17" cy="20" r="1.700"/></svg>'
    rayo = '<svg viewBox="0 0 24 24" width="21" height="21" fill="#17122F" style="margin-right:6px"><path d="M13 2L4 14h6l-1 8 9-12h-6z"/></svg>'

    def item(clave, nombre, cant, k, vivo=False):
        uri = foto_uri(clave)
        miniatura = (f'<div style="flex:none;width:96px;height:96px;border-radius:16px;background:#E2D9FF url({uri}) center/cover no-repeat"></div>' if uri
                     else '<div style="flex:none;width:96px;height:96px;border-radius:16px;background:#E2D9FF"></div>')
        paso = lambda t, idn="": f'<span id="{idn}" style="width:40px;height:40px;border-radius:10px;box-shadow:inset 0 0 0 1.5px #E0DCEC;display:flex;align-items:center;justify-content:center;font-size:22px;color:#17122F">{t}</span>'
        oculto = ";color:transparent" if vivo else ""
        return (f'<div style="display:flex;gap:20px;align-items:center;padding:16px 0;border-top:1px solid #ECE8F5">{miniatura}'
                f'<div style="flex:1"><div style="font-size:25px;color:#17122F">{nombre}</div><div style="font-size:22px;color:#6C4FD4;margin-top:2px">$ 14.900</div>'
                f'<div style="display:flex;gap:8px;align-items:center;margin-top:8px">{paso("−")}<span id="q-{k}" style="width:48px;height:40px;border-radius:10px;box-shadow:inset 0 0 0 1.5px #E0DCEC;display:flex;align-items:center;justify-content:center;font-size:22px{oculto}">{cant}</span>{paso("+", f"mas-{k}")}</div></div></div>')
    linea = lambda a, b, idn="", extra="": f'<div id="{idn}" style="display:flex;justify-content:space-between;align-items:center;padding:13px 0;border-bottom:1px solid #ECE8F5;font-size:23px;{extra}"><span>{a}</span><span>{b}</span></div>'
    sombra = "box-shadow:0 -22px 50px -8px rgba(76,52,170,.34),0 -6px 18px -4px rgba(23,18,47,.12),0 40px 70px -34px rgba(23,18,47,.4),0 0 0 1px rgba(108,79,212,.14)"
    carrito = tarjeta(f"left:600px;top:210px;width:560px;height:830px;padding:28px 34px 30px;border-radius:26px;display:flex;flex-direction:column;justify-content:space-between;{sombra}", f"""
      <div>
        <div style="display:flex;align-items:center;gap:14px;font-size:38px;font-weight:600;margin-bottom:10px">{carrito_ico}Tu Carrito</div>
        {item("carrito-gris", "Remera gris", 2, 1, True)}{item("carrito-crema", "Remera crema", 1, 2)}
      </div>
      <div id="resumen" style="visibility:hidden">
        {linea("Subtotal:", "$ 74.500", "ln-sub")}
        {linea("Envío:", '<b style="display:inline-flex;align-items:center">' + rayo + 'Tienes envío gratis</b>', "ln-envio")}
        <div style="margin:6px -16px;padding:0 16px;border-radius:14px;background:#F1ECFF;color:#4B33A8;font-weight:700">{linea("Gastos de gestión:", "$ 1.200", "ln-gastos", "border-bottom:none")}</div>
        {linea("Total:", "$ 75.700", "ln-total", "border-bottom:none;font-weight:700;font-size:27px")}
        <div style="margin-top:4px;height:14px;border-radius:99px;background:#16A34A"></div>
        <div style="font-size:22px;margin-top:12px">¡Ya alcanzaste el envío gratuito!</div>
      </div>
      <div style="height:64px;border-radius:14px;background:{azul};color:#fff;font-size:22px;font-weight:600;display:flex;align-items:center;justify-content:center">Finalizar Compra</div>""")
    lineas = ('<svg class="conexion" width="1200" height="1200" viewBox="0 0 1200 1200" fill="none">'
              '<path d="M560 463 H584 V737 H616" stroke="#7C6AE0" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="1 13"/>'
              '<path d="M560 856 H616" stroke="#7C6AE0" stroke-width="6" stroke-linecap="round" stroke-dasharray="1 13"/>'
              '<circle cx="560" cy="463" r="8" fill="#fff" stroke="#7C6AE0" stroke-width="4"/><circle cx="560" cy="856" r="8" fill="#fff" stroke="#7C6AE0" stroke-width="4"/>'
              '<circle cx="616" cy="737" r="7" fill="#7C6AE0"/><circle cx="616" cy="856" r="7" fill="#7C6AE0"/></svg>')
    return (TRAZO.format(s="right:-100px;top:900px") + TRAZO.format(s="left:625px;top:325px;transform-origin:0 0;transform:rotate(-90deg) scale(1)") + envio + gestion + lineas
            + sticker("Tu carrito", "Gestión y envío gratis", "left:56px;top:56px;white-space:nowrap")
            + pill("Vos elegís las condiciones", "left:360px;top:1068px;font-size:29px"))


def escena_6():
    """Más carrusel y más banners: el panel del carrusel (límites reales), la tienda con el carrusel y un banner, y dos stickers."""
    # miniaturas y fotos de la tienda
    # La foto del carrusel: si está slide-hombre-1.jpg (el hombre caminando por la calle, 16:9), se usa esa; si no, el banner de siempre.
    hay_slide = "cat-slide" in FOTOS
    uri_hero = foto_uri("cat-slide" if hay_slide else "cat-banner")
    pos_hero = "center top" if hay_slide else "center 35%"  # arriba: así no se corta la cabeza de la persona
    uri_prenda = foto_uri("cat-prod1")
    sol = lambda d, tam=20: f'<svg viewBox="0 0 24 24" width="{tam}" height="{tam}" fill="currentColor">{d}</svg>'
    lapiz = sol('<path d="M3 17.500V21h3.500L18 9.500 14.500 6zM20.700 7a1 1 0 0 0 0-1.400l-2.300-2.300a1 1 0 0 0-1.400 0l-1.800 1.800L18.900 8.800z"/>')
    copiar = sol('<path d="M8 3h9a2 2 0 0 1 2 2v11h-2V5H8zM5 7h9a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2z"/>')
    papelera = sol('<path d="M9 3h6l1 2h5v2H3V5h5zM5 9h14l-1 12H6z"/>')
    caja = lambda svg, extra="": (f'<span style="width:46px;height:38px;border-radius:10px;background:#fff;box-shadow:inset 0 0 0 1.5px #D9D5E6;display:flex;align-items:center;justify-content:center;color:#17122F;{extra}">{svg}</span>')
    cabecera = ('<div style="display:flex;align-items:center;justify-content:space-between;height:84px;padding:0 30px;background:#fff;border-bottom:1px solid #ECE8F5">'
                '<div style="display:flex;align-items:center;gap:18px"><span style="width:44px;height:40px;border-radius:12px;box-shadow:inset 0 0 0 1.5px #E6E2F0;display:flex;align-items:center;justify-content:center;font-size:22px;font-weight:800">«</span>'
                '<span style="font-size:28px;font-weight:800">Carrusel</span></div>'
                '<div style="display:flex;align-items:center;gap:12px"><span style="padding:11px 18px;border-radius:12px;box-shadow:inset 0 0 0 1.5px #E6E2F0;font-size:17px;font-weight:600">Ver tienda ↗</span>'
                '<span style="padding:9px 18px;border-radius:99px;background:#E2D9FF;color:#5B41C4;font-size:16px;font-weight:700">Admin</span></div></div>')
    sub = ('<div style="display:flex;align-items:center;justify-content:space-between"><span style="font-size:18px;color:#6b6679;max-width:600px;line-height:1.35">Portada del inicio. Sin elementos activos, la sección desaparece de la tienda.</span>'
           '<span style="padding:13px 24px;border-radius:14px;background:#6C4FD4;color:#fff;font-size:18px;font-weight:700;white-space:nowrap">+ Nuevo elemento</span></div>')
    cols = "grid-template-columns:130px 2.1fr .6fr 1.15fr .8fr 150px"
    uri_foto2 = foto_uri("cat-slide-2") if "cat-slide-2" in FOTOS else uri_hero
    uris_fila = [uri_hero, uri_foto2, foto_uri("cat-slide-3") if "cat-slide-3" in FOTOS else None]  # sin tercera foto, la lámina 3 es lisa (violeta)
    miniatura = lambda pos, n: (f'<div style="width:104px;height:62px;border-radius:10px;background:#E2D9FF url({uris_fila[n]}) {pos}/cover no-repeat;box-shadow:inset 0 0 0 1px rgba(23,18,47,.1)"></div>' if uris_fila[n] else '<div style="width:104px;height:62px;border-radius:10px;background:#6C4FD4"></div>')
    filas_def = [("Nueva colección", "Hasta 30% off · Remeras", 1, "Solo móvil", "75% top"), ("Nueva colección", "Hasta 30% off · Remeras", 2, "Solo escritorio", "75% top"),
                 ("Envíos a todo el país", "Comprá en nuestra tienda", 3, "Ambos", "left center")]
    filas = "".join(
        f'<div style="display:grid;{cols};align-items:center;padding:12px 22px;border-top:1px solid #ECE8F5;font-size:18px">{miniatura(pos, o - 1)}'
        f'<div style="padding-right:14px"><b style="font-size:19px;white-space:nowrap">{t}</b><div style="color:#6b6679;font-size:15px;margin-top:2px">{st}</div></div><span>{o}</span><span style="white-space:nowrap;font-size:17px">{v}</span>'
        f'<span style="justify-self:start;padding:6px 14px;border-radius:99px;background:#DCFCE7;color:#15803D;font-size:16px;font-weight:700">Activo</span>'
        f'<div style="display:flex;gap:8px;justify-content:flex-end">{caja(lapiz)}{caja(copiar)}{caja(papelera, "color:#DC2626;box-shadow:inset 0 0 0 1.5px #F3B4B4")}</div></div>'
        for t, st, o, v, pos in filas_def)
    tabla = (f'<div style="margin-top:18px;border-radius:14px;background:#fff;box-shadow:inset 0 0 0 1px #ECE8F5;overflow:hidden">'
             f'<div style="display:grid;{cols};align-items:center;padding:0 22px;height:50px;background:#FAF9FC;font-size:14px;font-weight:800;letter-spacing:.06em;color:#4A4560">'
             f'<span>IMAGEN</span><span>TÍTULO</span><span>ORDEN</span><span>VISIBLE EN</span><span>ESTADO</span><span></span></div>{filas}</div>')
    principal = (f'<div style="position:absolute;left:84px;right:0;top:0;bottom:0;background:#F4F3F7">{cabecera}<div style="padding:6px 30px 0">{tabla}</div></div>')
    ventana = tarjeta("left:40px;top:70px;width:960px;height:660px;padding:0;overflow:hidden;border-radius:40px", f"{lateral_admin('Carrusel', paso=33, hueco=19)}{principal}")

    # tienda: el carrusel de la portada y un banner promocional
    flecha = lambda lado, giro: (f'<span style="position:absolute;{lado}:16px;top:50%;margin-top:-19px;width:38px;height:38px;border-radius:50%;background:rgba(255,255,255,.92);display:flex;align-items:center;justify-content:center">'
                                 f'<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#17122F" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" style="transform:rotate({giro}deg)"><path d="m9 6 6 6-6 6"/></svg></span>')
    puntos = ('<span style="position:absolute;left:0;right:0;bottom:12px;display:flex;justify-content:center;gap:9px">'
              '<i style="width:10px;height:10px;border-radius:50%;background:#fff"></i>'
              '<i style="width:10px;height:10px;border-radius:50%;background:rgba(255,255,255,.55)"></i>'
              '<i style="width:10px;height:10px;border-radius:50%;background:rgba(255,255,255,.55)"></i></span>')
    hero = ((f'<div style="position:relative;height:218px;border-radius:20px;overflow:hidden;background:#E2D9FF url({uri_hero}) {pos_hero}/cover no-repeat">' if uri_hero
             else '<div style="position:relative;height:218px;border-radius:20px;overflow:hidden;background:#E2D9FF">')
            + '<div style="position:absolute;inset:0;background:linear-gradient(90deg,rgba(23,18,47,.55),rgba(23,18,47,.05) 65%)"></div>'
            + '<div style="position:absolute;left:96px;top:0;bottom:0;display:flex;flex-direction:column;justify-content:center;color:#fff">'
            + '<b style="font-size:46px;line-height:1.05;letter-spacing:-.01em">Hasta 30% off</b><span style="font-size:19px;letter-spacing:.14em;font-weight:600;margin-top:10px;opacity:.92">NUEVA COLECCIÓN</span></div>'
            + flecha("left", 180) + flecha("right", 0) + puntos + '</div>')
    foto_prenda = (f'<div style="width:300px;background:#C9B79A url({uri_prenda}) center/cover no-repeat"></div>' if uri_prenda else '<div style="width:300px;background:#E2D9FF"></div>')
    promo = (f'<div style="display:flex;height:172px;border-radius:20px;overflow:hidden;background:#0B0B0B;margin-top:14px">{foto_prenda}'
             '<div style="flex:1;display:flex;flex-direction:column;justify-content:center;padding-left:40px;color:#fff"><span style="font-size:15px;letter-spacing:.06em;opacity:.85">PROMOCIÓN ESPECIAL</span>'
             '<b style="font-size:34px;margin-top:8px;letter-spacing:-.01em">2X1 EN REMERAS</b></div></div>')
    tienda = tarjeta("left:300px;top:489px;width:860px;padding:20px 24px 22px;border-radius:34px", f"""
      <div style="display:flex;justify-content:space-between;align-items:center;height:50px;margin-bottom:12px"><span class="logo" style="font-size:22px">TU LOGO</span>
      <span style="font-size:19px;color:#6b6679;font-weight:600;display:flex;gap:32px"><span>Inicio</span><span>Productos</span></span></div>{hero}{promo}""")
    # líneas punteadas: de la fila del carrusel al carrusel de la tienda, del sticker "Carrusel" al carrusel y del
    # sticker "Banners" al banner promocional
    linea = ('<svg class="conexion" width="1200" height="1200" viewBox="0 0 1200 1200" fill="none">'
             '<path d="M962 304 H1086 V497" stroke="#7C6AE0" stroke-width="6" stroke-linecap="round" stroke-dasharray="1 13"/>'
             '<circle cx="962" cy="304" r="9" fill="#fff" stroke="#7C6AE0" stroke-width="4"/></svg>')
    senales = ('<svg class="conexion" width="1200" height="1200" viewBox="0 0 1200 1200" fill="none">'
               '<path d="M1030 140 H1150 V617 H1096" stroke="#7C6AE0" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="1 13"/>'
               '<circle cx="1096" cy="617" r="9" fill="#fff" stroke="#7C6AE0" stroke-width="4"/>'
               '<path d="M368 904 H470 V881" stroke="#7C6AE0" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="1 13"/>'
               '<circle cx="470" cy="873" r="9" fill="#fff" stroke="#7C6AE0" stroke-width="4"/></svg>')
    return (TRAZO.format(s="left:-110px;top:-90px") + ventana + linea + tienda + senales
            + sticker("Carrusel", "Para tus ofertas", "left:700px;top:44px;white-space:nowrap")
            + sticker("Banners", "Para tus promos", "left:30px;top:809px;white-space:nowrap")
            + pill("Destacá tus ofertas", "left:60px;top:1007px;font-size:29px"))


def badge(modo, ancho=132):
    """Badge de promoción real (Black Friday, Hot Sale o CyberMonday), recortado a su contorno para controlar los espacios."""
    return f'<img src="{foto_uri("badge-" + modo)}" alt="" style="display:block;width:{ancho}px;height:auto;flex:none">'


def escena_7():
    """Marketing. Tesis espacial: dos columnas con los mismos márgenes (60 px). A la izquierda el resultado (el celular de la tienda con su
    badge y su oferta); a la derecha la causa (el panel de promociones y los dos casilleros del producto). Dos líneas punteadas unen cada
    casillero con lo que activa; el cartel y el mensaje cierran la columna derecha y la izquierda."""
    azul = "#17122F"
    chk = lambda on=True: (f'<span style="width:28px;height:28px;border-radius:8px;flex:none;display:flex;align-items:center;justify-content:center;'
                           + ('background:#6C4FD4"><svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="#fff" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.500l4.500 4.500L19 7.500"/></svg></span>' if on
                              else 'box-shadow:inset 0 0 0 2px #6b6679"></span>'))
    # ---------------- panel: Promociones especiales (tres badges para elegir y uno propio)
    def opcion(modo, nombre, elegido=False):
        marca = ('<span style="position:absolute;right:8px;top:8px;width:24px;height:24px;border-radius:50%;background:#6C4FD4;display:flex;align-items:center;justify-content:center">'
                 '<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="#fff" stroke-width="3.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.500l4.500 4.500L19 7.500"/></svg></span>') if elegido else ""
        borde = "box-shadow:inset 0 0 0 3px #6C4FD4;background:#F6F2FF" if elegido else "box-shadow:inset 0 0 0 2px #E6E2F0;background:#fff"
        return (f'<div id="op-{modo}" style="position:relative;flex:1;height:136px;border-radius:18px;{borde};display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px">{marca}'
                f'<div style="height:70px;display:flex;align-items:center">{badge(modo, 78)}</div><span style="font-size:15px;font-weight:700;color:#17122F;white-space:nowrap">{nombre}</span></div>')
    propio = ('<div style="flex:1;height:136px;border-radius:18px;background:#fff;box-shadow:inset 0 0 0 2px #CFC3F7;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px;color:#6C4FD4">'
              '<svg viewBox="0 0 24 24" width="38" height="38" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 16V4m0 0l-4 4m4-4l4 4M4 16v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3"/></svg>'
              '<span style="font-size:15px;font-weight:700">Subí la tuya</span></div>')
    promo = tarjeta("left:620px;top:230px;width:530px;padding:28px 30px 26px;border-radius:26px", f"""
      <div style="font-size:30px;font-weight:800">Promociones especiales</div>
      <div style="display:flex;align-items:center;gap:14px;margin-top:16px;font-size:21px;font-weight:700">{chk()}Activar modo promociones</div>
      <div style="display:flex;gap:12px;margin-top:22px">{opcion("bf", "Black Friday")}{opcion("hs", "Hot Sale")}{opcion("cm", "CyberMonday")}{propio}</div>
      <div class="row" style="justify-content:flex-end;margin-top:22px"><div class="btn" style="height:52px;font-size:20px;padding:0 30px;border-radius:14px">Guardar</div></div>""")
    # ---------------- producto: los dos casilleros que activan la promoción y la oferta
    activa = "background:#F1ECFF"
    flag = lambda txt, on, idn="": (f'<div id="{idn}" style="display:flex;align-items:center;gap:14px;height:56px;padding:0 16px;border-radius:14px;font-size:20px;font-weight:700;white-space:nowrap;{activa}">{chk(on)}{txt}</div>')
    producto = tarjeta("left:620px;top:628px;width:530px;padding:26px 32px 26px;border-radius:26px", f"""
      <div style="font-size:24px;font-weight:800">Remera Aura</div>
      <div style="display:flex;flex-direction:column;gap:10px;margin-top:16px">{flag("En promoción", True, "ck-promo")}{flag("Oferta por tiempo limitado", True, "ck-oferta")}{flag("Bundle por cantidad", True, "ck-bundle")}</div>""")
    # ---------------- la tienda en el celular
    reloj_ico = '<svg viewBox="0 0 24 24" width="18" height="18" fill="#17122F"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm1 5v5.200l3.600 2.100-1 1.700L11 13V7z"/></svg>'
    caja = lambda idn, num, etq: (f'<div id="cd-{idn}" style="width:48px;height:54px;flex:none;border-radius:10px;box-shadow:inset 0 0 0 1.5px #E6E2F0;background:#fff;display:flex;flex-direction:column;align-items:center;justify-content:center">'
                                  f'<b style="font-size:20px;line-height:1">{num}</b><span style="font-size:10px;color:#17122F;margin-top:2px;letter-spacing:.04em">{etq}</span></div>')
    dos = '<span style="font-size:14px;font-weight:700;color:#17122F;width:6px;text-align:center">:</span>'
    reloj = ('<div id="cd-card" style="margin-top:14px;border-radius:16px;box-shadow:inset 0 0 0 1.5px #E6E2F0;padding:10px 12px;background:#fff;display:flex;align-items:center;justify-content:space-between;gap:8px">'
             f'<div style="display:flex;align-items:center;gap:7px;font-size:14px;font-weight:800;letter-spacing:.02em;color:#17122F;line-height:1.25">{reloj_ico}<span>OFERTA POR<br>TIEMPO LIMITADO</span></div>'
             f'<div style="display:flex;align-items:center;gap:3px">{caja("dias", "1", "DÍAS")}{dos}{caja("horas", "19", "HORAS")}{dos}{caja("min", "59", "MIN")}{dos}{caja("seg", "39", "SEG")}</div></div>')
    precio = '<span style="text-decoration:line-through;color:#17122F;font-size:21px;margin-right:10px;opacity:.7">$14.900</span><b style="color:#6C4FD4;font-size:27px">$11.900</b>'
    tag_ico = '<svg viewBox="0 0 24 24" width="20" height="20" fill="#17122F"><path d="M3 4a1 1 0 0 1 1-1h6.200a1 1 0 0 1 .7.3l9.800 9.800a1 1 0 0 1 0 1.400l-6.200 6.200a1 1 0 0 1-1.400 0L3.300 10.900A1 1 0 0 1 3 10.200V4zm4.500 2a1.500 1.500 0 1 0 0 3 1.500 1.500 0 0 0 0-3z"/></svg>'

    def fila(cant, etq, precio, idn):
        return (f'<div id="{idn}" style="display:flex;align-items:center;height:30px;padding:0 12px;border-radius:10px;box-shadow:inset 0 0 0 1.5px #E6E2F0;background:#fff;white-space:nowrap">'
                f'<b style="width:96px;font-size:14px">{cant}</b><b style="color:#EF4444;font-size:13px">{etq}</b>'
                f'<span style="margin-left:auto;color:#64748B;font-size:13px">{precio} c/u</span></div>')
    bundle = ('<div id="bnd-card" style="margin-top:12px;border-radius:16px;box-shadow:inset 0 0 0 1.5px #E6E2F0;padding:10px 14px 12px;background:#fff">'
              f'<div style="display:flex;align-items:center;gap:8px;font-size:15px;font-weight:800;letter-spacing:.01em;color:#17122F">{tag_ico}Comprá más y ahorrá</div>'
              f'<div style="display:flex;flex-direction:column;gap:5px;margin-top:8px">{fila("1 unidad", "Precio base", "$11.900", "bn-1")}{fila("2 unidades", "20% OFF", "$9.520", "bn-2")}{fila("5 unidades", "30% OFF", "$8.330", "bn-3")}</div></div>')
    cta = '<div id="cta-btn" style="margin-top:14px;height:60px;border-radius:14px;background:#6C4FD4;color:#fff;font-size:21px;font-weight:700;display:flex;align-items:center;justify-content:center">Agregar al carrito</div>'
    def mini(clave, nombre):
        uri = foto_uri(clave)
        fondo = f"#E2D9FF url({uri}) center/cover no-repeat" if uri else "#E2D9FF"
        return (f'<div style="flex:1"><div id="mn-{clave}" style="position:relative;height:150px;border-radius:18px;background:{fondo}">'
                f'</div>'
                f'<b style="font-size:19px;display:block;margin-top:10px">{nombre}</b><span style="color:#6C4FD4;font-weight:800;font-size:19px">$14.900</span></div>')
    mas = (f'<div style="margin-top:24px;font-size:21px;font-weight:800">Más en promoción</div>'
           f'<div style="display:flex;gap:16px;margin-top:12px">{mini("carrito-gris", "Remera gris")}{mini("mkt-aviso", "Remera oliva")}</div>')
    tel = celular("left:50px;top:258px;width:520px", 1100, f"""
      {cabecera_tienda()}
      <div style="padding:6px 24px 0;position:relative"><div id="ft-prod">{foto("mkt-prod", "producto en promoción", "height:222px;border-radius:26px")}</div>
      <div style="display:flex;align-items:baseline;justify-content:space-between;gap:12px;margin-top:14px"><b style="font-size:26px">Remera Aura</b><div style="white-space:nowrap">{precio}</div></div>{reloj}{bundle}{cta}{mas}</div>""")
    # líneas punteadas (posiciones medidas del dibujo): "En promoción" -> badge de la foto, "Oferta por tiempo limitado" -> contador
    lineas = ('<svg class="conexion" width="1200" height="1200" viewBox="0 0 1200 1200" fill="none">'
              '<path d="M620 731 H600 V502 H529" stroke="#7C6AE0" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="1 13"/>'
              '<path d="M620 797 H574 V767 H529" stroke="#7C6AE0" stroke-width="6" stroke-linecap="round" stroke-dasharray="1 13"/>'
              '<circle cx="529" cy="502" r="9" fill="#fff" stroke="#7C6AE0" stroke-width="4"/><path d="M620 863 H586 V891 H529" stroke="#7C6AE0" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="1 13"/>'
              '<circle cx="529" cy="767" r="9" fill="#fff" stroke="#7C6AE0" stroke-width="4"/><circle cx="529" cy="891" r="9" fill="#fff" stroke="#7C6AE0" stroke-width="4"/></svg>')
    return (TRAZO.format(s="left:560px;top:330px;transform-origin:0 0;transform:rotate(-90deg) scale(1.05)") + TRAZO.format(s="left:-110px;top:960px") + '<style>#ft-prod img{object-position:50% 38%}</style>' + tel + lineas + producto + promo
            + sticker("Marketing", "Promos, ofertas y confianza", "left:70px;top:84px;white-space:nowrap")
            + pill('<span style="display:inline-grid"><span style="grid-area:1/1;visibility:hidden">Sumá tu propio badge</span>'
                 '<span style="grid-area:1/1;visibility:hidden">Medí con tu Pixel de Meta</span></span>', "left:620px;top:940px;font-size:29px"))


def escena_pagos(on=False):
    """Métodos de pago (función Premium), dibujado como el panel real: "Medios de pago" (casillas de efectivo y transferencia / WhatsApp),
    "Mercado Pago" (cuenta por conectar) y "Venta en cuotas" (casilla y recargo por cantidad de cuotas: 1, 3, 6, 9, 12 y 18).
    on=False: Mercado Pago desconectado y la venta en cuotas sin activar (es la imagen de la página). on=True: las dos conectadas y activas,
    en azul oscuro; la capa viva (PagosAnimado.jsx) muestra esa versión sobre la otra, en cada tarjeta, cuando se activan.
    Cada pieza lleva un id: `python generar.py pagos-medidas` imprime dónde está."""
    VIO, OSC, LIL = "#6C4FD4", "#17122F", "#F1ECFF"
    corona = '<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M3 8l4.500 3.500L12 5l4.500 6.500L21 8l-2 10H5z"/></svg>'
    tilde = '<svg viewBox="0 0 24 24" width="{t}" height="{t}" fill="none" stroke="#fff" stroke-width="3.600" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.500l4.500 4.500L19 7.500"/></svg>'
    pildora = lambda txt, fondo, color: (f'<span style="display:inline-flex;align-items:center;gap:8px;padding:7px 16px;border-radius:99px;background:{fondo};color:{color};'
                                         f'font-size:18px;font-weight:800;white-space:nowrap">{corona}{txt}</span>')
    premium = lambda: pildora("Premium", OSC if on else LIL, "#fff" if on else VIO)

    def casilla(txt, marcada, color=VIO, ident=""):
        caja = (f'<span id="{ident}" style="flex:none;width:30px;height:30px;border-radius:9px;background:{color};display:flex;align-items:center;justify-content:center">{tilde.format(t=20)}</span>'
                if marcada else f'<span id="{ident}" style="flex:none;width:30px;height:30px;border-radius:9px;box-shadow:inset 0 0 0 2.5px #CFC9E0;background:#fff;display:block"></span>')
        return f'<div style="display:flex;align-items:center;gap:16px;font-size:23px;font-weight:600;color:{OSC}">{caja}{txt}</div>'

    boton = lambda txt, estilo, ident="": (f'<div id="{ident}" style="height:58px;border-radius:14px;display:flex;align-items:center;justify-content:center;'
                                           f'font-size:21px;font-weight:700;white-space:nowrap;{estilo}">{txt}</div>')

    # --- Medios de pago (siempre iguales)
    medios = tarjeta("left:60px;top:250px;width:520px;height:330px;padding:30px 32px;box-sizing:border-box;border-radius:28px", f"""
      <div style="font-size:30px;font-weight:800;color:{OSC}">Medios de pago</div>
      <div style="display:flex;flex-direction:column;gap:18px;margin-top:26px">{casilla("Habilitar efectivo", True)}{casilla("Habilitar transferencia / WhatsApp", True)}</div>
      <div style="position:absolute;left:32px;right:32px;bottom:30px">{boton("Guardar métodos", f"background:{VIO};color:#fff")}</div>""")

    # --- Mercado Pago
    estado = (f'<span style="display:inline-flex;align-items:center;gap:9px;padding:8px 18px;border-radius:99px;background:{OSC};color:#fff;font-size:19px;font-weight:700">{tilde.format(t=16)}Conectado</span>'
              if on else f'<span style="display:inline-flex;align-items:center;padding:8px 18px;border-radius:99px;background:{LIL};color:{VIO};font-size:19px;font-weight:700">Desconectado</span>')
    texto_mp = ("Tu cuenta está conectada: ya podés cobrar con Mercado Pago." if on else "Conectá tu cuenta para habilitar Mercado Pago como medio de pago.")
    conectar = boton("Conectar Mercado Pago", (f"box-shadow:inset 0 0 0 2.5px #E6E2F0;color:#B9B3D0;background:#fff" if on else f"box-shadow:inset 0 0 0 2.5px {VIO};color:{VIO};background:#fff"), "pg-btn-mp")
    desconectar = boton("Desconectar", (f"box-shadow:inset 0 0 0 2.5px {OSC};color:{OSC};background:#fff" if on else "box-shadow:inset 0 0 0 2.5px #E6E2F0;color:#B9B3D0;background:#fff"))
    mp = tarjeta("left:600px;top:250px;width:540px;height:330px;padding:30px 32px;box-sizing:border-box;border-radius:28px", f"""
      <div style="display:flex;align-items:center;gap:14px"><span style="font-size:30px;font-weight:800;color:{OSC}">Mercado Pago</span>{premium()}</div>
      <div style="margin-top:24px">{estado}</div>
      <div style="margin-top:20px;font-size:21px;font-weight:600;line-height:1.4;color:{OSC}">{texto_mp}</div>
      <div style="position:absolute;left:32px;right:32px;bottom:30px;display:flex;gap:14px"><div style="flex:1.6">{conectar}</div><div style="flex:1">{desconectar}</div></div>""")
    # marca de dónde está la tarjeta (para recortar la capa viva)
    mp = mp.replace('<div class="card"', '<div id="pg-card-mp" class="card"', 1)

    # --- Venta en cuotas
    def campo(n):
        etq = "1 cuota" if n == 1 else f"{n} cuotas"
        caja = (f'<div style="height:52px;border-radius:12px;box-shadow:inset 0 0 0 2px {"#CFC3F7" if on else "#E6E2F0"};background:{"#fff" if on else "#F7F6FA"};'
                f'display:flex;align-items:center;padding:0 18px;font-size:21px;font-weight:600;color:{OSC if on else "#B9B3D0"}">{ {1: "0", 3: "5", 6: "10", 9: "15", 12: "20", 18: "30"}[n] if on else "0" }</div>')
        return f'<div><div style="font-size:19px;font-weight:700;color:{OSC if on else "#9C97B3"};margin-bottom:8px">{etq}</div>{caja}</div>'
    campos = "".join(campo(n) for n in (1, 3, 6, 9, 12, 18))
    guardar = boton("Guardar", (f"background:{OSC};color:#fff;padding:0 38px" if on else "background:#CBC0F2;color:#fff;padding:0 38px"))
    cu = tarjeta("left:60px;top:600px;width:1080px;height:380px;padding:28px 32px;box-sizing:border-box;border-radius:28px", f"""
      <div style="display:flex;align-items:center;gap:14px"><span style="font-size:30px;font-weight:800;color:{OSC}">Venta en cuotas</span>{premium()}</div>
      <div style="margin-top:20px">{casilla("Activar venta en cuotas", on, OSC, "pg-chk-cu") if on else casilla("Activar venta en cuotas", False, OSC, "pg-chk-cu")}</div>
      <div style="margin-top:16px;font-size:19px;font-weight:700;color:{OSC if on else "#9C97B3"}">Recargo orientativo por plan (%)</div>
      <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px 22px;margin-top:12px">{campos}</div>
      <div style="position:absolute;right:32px;top:22px;width:150px">{guardar}</div>""")
    cu = cu.replace('<div class="card"', '<div id="pg-card-cu" class="card"', 1)

    sticker_dos = '<div class="sticker" style="left:650px;top:50px;white-space:nowrap"><b>Mercado Pago</b><b>y cuotas</b></div>'
    return (TRAZO.format(s="left:-100px;top:-120px") + TRAZO.format(s="left:620px;top:940px;transform:rotate(90deg)") + medios + mp + cu + sticker_dos
            + pill_azul("Cobrá como quieras", "left:70px;top:1050px;font-size:31px"))


def escena_estadisticas(base=False):
    """Panel de Estadísticas (primer ícono del menú, el del tablero, seleccionado) con gráficos de ejemplo en los colores de la marca.
    Es el cuadro "Accedé a tus estadísticas" de Funcionalidades. Con base=True se dibuja el panel SIN lo que se anima (números, curva,
    arcos de las tortas y relleno de las barras): esas piezas las dibuja la escena viva (EscenaEstadisticas.jsx) encima, en el mismo lugar.
    Cada pieza viva lleva un id: `python generar.py estadisticas-medidas` imprime dónde está cada una."""
    VIO, CLA, MED, OSC = "#6C4FD4", "#CBC0F2", "#A99BF0", "#17122F"
    oculto = "visibility:hidden;" if base else ""
    cabecera = ('<div style="display:flex;align-items:center;justify-content:space-between;height:84px;padding:0 30px;background:#fff;border-bottom:1px solid #ECE8F5">'
                '<div style="display:flex;align-items:center;gap:18px"><span style="width:44px;height:40px;border-radius:12px;box-shadow:inset 0 0 0 1.5px #E6E2F0;display:flex;align-items:center;justify-content:center;font-size:22px;font-weight:800">«</span>'
                '<span style="font-size:28px;font-weight:800">Estadísticas</span></div>'
                '<div style="display:flex;align-items:center;gap:12px"><span style="padding:11px 18px;border-radius:12px;box-shadow:inset 0 0 0 1.5px #E6E2F0;font-size:17px;font-weight:600">Ver tienda ↗</span>'
                '<span style="padding:9px 18px;border-radius:99px;background:#E2D9FF;color:#5B41C4;font-size:16px;font-weight:700">Admin</span></div></div>')

    def tarjeta_g(titulo, interior, estilo=""):
        return (f'<div style="border-radius:20px;background:#fff;box-shadow:inset 0 0 0 1px #ECE8F5;padding:22px 26px;box-sizing:border-box;{estilo}">'
                f'<div style="font-size:20px;font-weight:800;color:{OSC};white-space:nowrap">{titulo}</div>{interior}</div>')

    def torta(segmentos, centro, sub, ident, tam=160, centro_vivo=False):
        """Torta (anillo) con el total al medio. `segmentos`: [(nombre, cantidad, color)]."""
        total = sum(n for _, n, _ in segmentos)
        r, desde, arcos = 62, 0.0, ""
        for _, n, color in segmentos:
            largo = n / total * 100
            arcos += (f'<circle cx="90" cy="90" r="{r}" fill="none" stroke="{color}" stroke-width="28" pathLength="100" '
                      f'stroke-dasharray="{largo:.2f} {100 - largo:.2f}" stroke-dashoffset="{-desde:.2f}" transform="rotate(-90 90 90)"/>')
            desde += largo
        arcos_html = "" if base else arcos
        vivo = oculto if centro_vivo else ""
        return (f'<div id="{ident}" style="position:relative;width:{tam}px;height:{tam}px;margin:0 auto"><svg viewBox="0 0 180 180" width="{tam}" height="{tam}">'
                f'<circle cx="90" cy="90" r="{r}" fill="none" stroke="#F1ECFF" stroke-width="28"/>{arcos_html}</svg>'
                f'<div style="position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center">'
                f'<b id="{ident}-centro" style="{vivo}font-size:34px;font-weight:800;line-height:1">{centro}</b><span style="font-size:13px;font-weight:700;margin-top:3px">{sub}</span></div></div>')

    def leyenda(segmentos, ident, vivo=False):
        v = oculto if vivo else ""
        return "".join(
            f'<div style="display:flex;align-items:center;gap:12px;height:34px;font-size:19px;font-weight:600">'
            f'<i style="flex:none;width:14px;height:14px;border-radius:50%;background:{c}"></i><span style="flex:1">{n}</span><b id="{ident}-{i}" style="{v}font-weight:800">{val}</b></div>'
            for i, (n, val, c) in enumerate(segmentos))

    estados = [("Entregados", 26, VIO), ("En camino", 13, MED), ("Pendientes", 7, OSC), ("Cancelados", 5, CLA)]
    categorias = [("Remeras", 38, VIO), ("Jeans", 27, MED), ("Camperas", 21, OSC), ("Calzado", 14, CLA)]
    top = [("Jean Brooklyn", 48, VIO), ("Remera Maia", 36, "#8B76E6"), ("Short Ema", 24, MED), ("Hoodie Black", 15, CLA)]

    curva = "M0 128C26 120 40 92 66 98S118 126 144 92S196 46 226 62S286 104 318 60S384 18 430 28S520 6 560 14"
    grafico = "" if base else (f'<path d="{curva}V150H0Z" fill="url(#g)"/><path d="{curva}" stroke="{VIO}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>'
                               f'<circle cx="560" cy="14" r="8" fill="#fff" stroke="{VIO}" stroke-width="4.500"/>')
    ingresos = tarjeta_g("Ingresos últimos 30 días", f"""
      <div style="display:flex;align-items:center;gap:30px;margin-top:6px">
        <div style="width:260px;flex:none"><div id="ingresos-num" style="{oculto}font-size:46px;font-weight:800;line-height:1.1;color:{OSC};white-space:nowrap">$ 482.300</div>
          <span id="ingresos-pill" style="{oculto}display:inline-block;margin-top:14px;padding:7px 16px;border-radius:99px;background:#F1ECFF;color:{VIO};font-size:19px;font-weight:800">+ 18 %</span></div>
        <svg id="ingresos-svg" viewBox="0 0 560 150" width="636" height="150" style="flex:none;overflow:visible" fill="none">
          <defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="{VIO}" stop-opacity=".32"/><stop offset="1" stop-color="{VIO}" stop-opacity="0"/></linearGradient></defs>
          {"".join(f'<path d="M0 {y}H560" stroke="#EEEBF5" stroke-width="2"/>' for y in (30, 75, 120))}
          {grafico}</svg></div>""", "height:214px")

    pedidos = tarjeta_g("Pedidos por estado", f'<div style="margin-top:12px">{torta(estados, "51", "pedidos", "estados", centro_vivo=True)}</div><div style="margin-top:16px">{leyenda([(n, v, c) for n, v, c in estados], "estados-n", vivo=True)}</div>', "height:400px")
    ventas = tarjeta_g("Ventas por categoría", f'<div style="margin-top:12px">{torta(categorias, "4", "categorías", "categorias")}</div><div style="margin-top:16px">{leyenda([(n, f"{v} %", c) for n, v, c in categorias], "categorias-n")}</div>', "height:400px")
    barras = "".join(
        f'<div style="margin-top:{22 if i == 0 else 20}px"><div style="display:flex;justify-content:space-between;font-size:19px;font-weight:600"><span>{n}</span><b id="top-n-{i}" style="{oculto}font-weight:800">{v}</b></div>'
        f'<div style="margin-top:9px;height:15px;border-radius:8px;background:#F1ECFF"><div id="top-barra-{i}" style="{oculto}width:{v / 48 * 100:.1f}%;height:100%;border-radius:8px;background:{c}"></div></div></div>'
        for i, (n, v, c) in enumerate(top))
    productos = tarjeta_g("Top productos vendidos", barras, "height:400px")

    principal = (f'<div style="position:absolute;left:84px;right:0;top:0;bottom:0;background:#F4F3F7">{cabecera}'
                 f'<div style="padding:26px 30px 0"><div>{ingresos}</div>'
                 f'<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:20px;margin-top:20px">{pedidos}{productos}{ventas}</div></div></div>')
    ventana = tarjeta("left:50px;top:196px;width:1100px;height:770px;padding:0;overflow:hidden;border-radius:40px", f"{lateral_admin('Estadísticas')}{principal}")
    sticker_dos = ('<div class="sticker" style="left:704px;top:92px;white-space:nowrap"><b>Tus</b><b>estadísticas</b></div>')
    return (TRAZO.format(s="left:-100px;top:-120px") + ventana + sticker_dos
            + ("" if base else pill_azul("Todo en tu panel", "left:70px;top:1050px;font-size:31px")))


# Las funciones Premium con imagen, en orden (premium-1 a premium-7; la compra mínima es una escena viva y no tiene imagen). El carrusel y los banners ya no son una función Premium: su imagen
# ("slides") es la del cuadro "Slides y banners" de Funcionalidades y se guarda aparte, en src/assets/escenas/carrusel-slides.webp.
ESCENAS = {1: escena_barra, 2: escena_1, 3: lambda: escena_2("base"), 4: lambda: escena_3("base"), 5: escena_carrito, 6: lambda: escena_pagos(on=False), 7: escena_7, "slides": escena_6, "estadisticas": escena_estadisticas, "pagos-on": lambda: escena_pagos(on=True), "estadisticas-base": lambda: escena_estadisticas(base=True)}

# imágenes con ventana animada: número de imagen -> (archivo de la capa, escena de la capa)
CAPAS = {
    3: ("cliente-ventana", lambda: escena_2("ventana")),
    4: ("inventario-ventana", lambda: escena_3("ventana")),
}

if __name__ == "__main__":
    pedidas = [int(a) if a.isdigit() else a for a in sys.argv[1:] if a.isdigit() or a in ("slides", "estadisticas", "estadisticas-base", "pagos-on")] or list(ESCENAS)
    TMP.mkdir(exist_ok=True)
    SALIDA.mkdir(parents=True, exist_ok=True)
    with sync_playwright() as p:
        b = p.chromium.launch(channel="chrome")
        pg = b.new_page(viewport={"width": 1200, "height": 1200})
        for n in pedidas:
            html = TMP / f"premium-{n}.html"
            html.write_text(pagina(ESCENAS[n]()), encoding="utf-8")
            pg.goto(html.as_uri(), wait_until="networkidle")
            pg.wait_for_timeout(500)
            png = TMP / f"premium-{n}.png"
            pg.screenshot(path=str(png))
            destino = (RAIZ / "src" / "assets" / "escenas" / {"slides": "carrusel-slides.webp", "estadisticas": "estadisticas.webp", "estadisticas-base": "estadisticas-base.webp", "pagos-on": "pagos-on.webp"}[n]) if n in ("slides", "estadisticas", "estadisticas-base", "pagos-on") else SALIDA / f"premium-{n}.webp"
            Image.open(png).convert("RGB").save(destino, "WEBP", quality=88, method=6)
            print(f"{destino.name}  {destino.stat().st_size // 1024} KB", flush=True)
            if n in CAPAS:  # capa animada (la ventana), con fondo transparente
                nombre, hacer = CAPAS[n]
                html = TMP / f"{nombre}.html"
                html.write_text(pagina(hacer(), transparente=True), encoding="utf-8")
                pg.goto(html.as_uri(), wait_until="networkidle")
                pg.wait_for_timeout(500)
                png = TMP / f"{nombre}.png"
                pg.screenshot(path=str(png), omit_background=True)
                capas = RAIZ / "src" / "assets" / "premium-overlays"
                capas.mkdir(parents=True, exist_ok=True)
                Image.open(png).convert("RGBA").save(capas / f"{nombre}.webp", "WEBP", quality=90, method=6)
                print(f"{nombre}.webp (capa animada)", flush=True)
        b.close()
