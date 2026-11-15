"""Genera las 7 imágenes del bloque "Funciones Premium" de la landing.

Cada imagen es un HTML de 1200x1200 que se saca a WebP con Playwright y queda en src/assets/premium/
(premium-1.webp ... premium-7.webp): la landing las toma sola.
Con --claro se generan las de la variante de prueba con fondo lila, en src/assets/premium-b/.

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
CLARO = "--claro" in sys.argv  # variante de prueba: imágenes con fondo lila (van a src/assets/premium-b)
SALIDA = RAIZ / "src" / "assets" / ("premium-b" if CLARO else "premium")
TMP = pathlib.Path(__file__).parent / "_tmp"

# Cuando haya fotos: clave = el nombre del lugar (ver cada escena), valor = ruta del archivo.
FOTOS = {}


def foto_uri(clave):
    ruta = FOTOS.get(clave)
    if not ruta:
        return None
    ruta = pathlib.Path(ruta)
    tipo = {"png": "png", "jpg": "jpeg", "jpeg": "jpeg", "webp": "webp"}[ruta.suffix.lstrip(".").lower()]
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

if CLARO:
    CSS += """
.stage{background:linear-gradient(180deg,#EFEBFC 0%,#D8CEF5 100%)}
.trazo{opacity:.55}.trazo path{stroke:#B9ABF0}
.card{box-shadow:0 40px 70px -34px rgba(76,52,170,.38),0 0 0 1px rgba(108,79,212,.10)}
.sticker{box-shadow:0 34px 56px -22px rgba(76,52,170,.55),inset 0 2px 0 rgba(255,255,255,.28),inset 0 -6px 14px rgba(40,20,110,.3)}
.pill{box-shadow:0 30px 52px -26px rgba(76,52,170,.4),0 0 0 1px rgba(108,79,212,.1)}
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
    return f'<div class="pill" style="{estilo}"><i>{CHECK}</i>{texto}</div>'


def tarjeta(estilo, interior):
    return f'<div class="card" style="{estilo}">{interior}</div>'


def celular(estilo, alto, contenido):
    barras = "".join(f'<i style="height:{h}px"></i>' for h in (8, 12, 16, 20))
    return f"""<div class="phone" style="{estilo}"><div class="screen" style="height:{alto}px">
      <div class="status"><span>9:41</span><span class="island"></span>
      <span class="row"><span class="bars">{barras}</span><span class="bat"></span></span></div>{contenido}</div></div>"""


def cabecera_tienda(nombre="TU TIENDA"):
    return f'<div class="tienda-head"><span class="logo">{nombre}</span><span class="tienda-iconos">{LUPA}{CORAZON}{CARRITO}{MENU}</span></div>'


def pagina(cuerpo):
    return f"""<!doctype html><html><head><meta charset="utf-8">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Manrope:wght@500;600;700;800&display=swap">
<style>{CSS}</style></head><body><div class="stage">{cuerpo}</div></body></html>"""


# ------------------------------------------------------------------ las 7 escenas
CAMPANA = '<svg viewBox="0 0 24 24" fill="#17122F" width="34" height="34"><path d="M12 22a2.4 2.4 0 0 0 2.4-2.4h-4.8A2.4 2.4 0 0 0 12 22Zm7-6.6V11a7 7 0 0 0-5.4-6.8V3.4a1.6 1.6 0 0 0-3.2 0v.8A7 7 0 0 0 5 11v4.4l-1.8 1.8V18h17.6v-.8L19 15.4Z"/></svg>'


def producto_fila(clave, i, precio):
    return (f'<div class="row" style="gap:20px;padding:16px 0;border-top:1px solid #EFEAFB">'
            f'{foto(clave + str(i), "producto", "width:86px;height:86px;border-radius:20px")}'
            f'<div class="col" style="flex:1"><b style="font-size:25px">Producto {i}</b><span class="lbl">Cantidad: 1</span></div>'
            f'<b style="font-size:25px">{precio}</b></div>')


def escena_1():
    """Menú y página para cada categoría, con filtrador."""
    prods = "".join(
        f'<div class="col" style="flex:1;gap:8px">{foto("cat-prod" + str(i), "producto " + str(i), "height:190px;border-radius:22px")}'
        f'<b style="font-size:21px">Producto {i}</b><span style="color:#6C4FD4;font-weight:800;font-size:21px">$0.000</span></div>'
        for i in (1, 2, 3))
    chips = '<span class="chip on">Todos</span><span class="chip">Precio</span><span class="chip">Más nuevos</span>'
    pagina_cat = tarjeta("left:60px;top:290px;width:700px;padding:0;overflow:hidden;border-radius:44px", f"""
      <div class="row" style="gap:44px;padding:24px 36px;border-bottom:1px solid #EFEAFB"><span class="logo" style="font-size:22px">TU TIENDA</span><span class="row" style="gap:24px;font-size:20px;font-weight:700"><span>Inicio</span><span style="color:#6C4FD4">Cocina</span><span>Living</span></span></div>
      {foto("cat-banner", "imagen de la categoría (banner)", "height:210px;border-radius:0")}
      <div style="padding:22px 36px 30px"><div class="h" style="font-size:42px">Cocina</div>
      <div class="row" style="gap:10px;margin-top:16px"><span class="lbl" style="margin-right:6px">Filtrar</span>{chips}</div>
      <div class="row" style="gap:18px;margin-top:20px">{prods}</div></div>""")
    cats = "".join(
        f'<div class="row" style="justify-content:space-between;padding:15px 0;border-top:1px solid #EFEAFB;font-size:24px;font-weight:{800 if i == 1 else 600};color:{"#6C4FD4" if i == 1 else "#17122F"}"><span>{c}</span>{FLECHA}</div>'
        for i, c in enumerate(["Living", "Cocina", "Dormitorio", "Baño"]))
    panel = tarjeta("left:700px;top:80px;width:460px;padding:38px 40px", f"""
      <div class="h" style="font-size:34px">Categorías</div><div class="col" style="margin-top:12px">{cats}</div>""")
    return (TRAZO.format(s="left:760px;top:620px") + pagina_cat + panel
            + sticker("Su página", "Con filtrador", "left:80px;top:90px")
            + pill("Menú y página propia", "left:520px;top:1010px"))


def escena_2():
    """Panel Clientes: detalle de pedidos confirmados."""
    clientes = [("Camila Ríos", "camila@correo.com", "351 555 0123", 4, "$84.500"), ("Lucas Pereyra", "lucas.p@correo.com", "351 555 0187", 2, "$31.200"),
                ("Sofía Medina", "sofi.medina@correo.com", "351 555 0142", 7, "$126.800"), ("Mateo Acosta", "mateo@correo.com", "351 555 0166", 1, "$18.900")]
    filas = "".join(f'<tr><td><b>{n}</b></td><td>{e}</td><td>{t}</td><td style="text-align:center">{p}</td><td style="text-align:right">{m}</td></tr>' for n, e, t, p, m in clientes)
    panel = tarjeta("left:60px;top:210px;width:1080px;padding:44px 48px 40px", f"""
      <div class="row" style="justify-content:space-between"><div><div class="h">Clientes</div><div class="sub">Detalle de tus pedidos confirmados.</div></div>
      <div class="btn" style="gap:12px">{BAJAR}Exportar clientes</div></div>
      <table style="margin-top:26px"><tr><th>CLIENTE</th><th>EMAIL</th><th>TELÉFONO</th><th style="text-align:center">PEDIDOS</th><th style="text-align:right">TOTAL</th></tr>{filas}</table>""")
    archivo = tarjeta("left:640px;top:820px;width:520px;padding:30px 36px", f"""
      <div class="row" style="gap:20px"><span class="ph" style="width:72px;height:72px;border-radius:20px;color:#4B33A8">{BAJAR}</span>
      <div class="col"><b style="font-size:26px">clientes.csv</b><span class="lbl">Listo para tu email marketing</span></div></div>""")
    return (TRAZO.format(s="left:-80px;top:700px") + panel + archivo
            + sticker("Clientes", "Pedidos confirmados", "left:80px;top:60px")
            + pill("Tus clientes, en un solo lugar", "left:70px;top:900px;font-size:27px"))


def escena_3():
    """Inventario por categorías."""
    def grupo(nombre, items):
        filas = "".join(f'<tr><td style="width:78px">{foto("inv-" + nombre.lower() + str(i), "producto", "width:58px;height:58px;border-radius:14px")}</td><td>{n}</td><td style="width:210px"><div class="row" style="gap:10px"><span class="chip" style="height:46px;padding:0 16px;font-size:24px">−</span><span class="in" style="height:46px;width:78px;justify-content:center;padding:0;font-size:22px;background:#fff">{s}</span><span class="chip" style="height:46px;padding:0 16px;font-size:24px">+</span></div></td></tr>' for i, (n, s) in enumerate(items))
        return f'<tr><th colspan="3" style="font-size:18px;color:#4B33A8;background:#F1ECFF">{nombre.upper()}</th></tr>{filas}'
    cuerpo = grupo("Cocina", [("Taza de cerámica", 24), ("Set de cuchillos", 8), ("Tabla de madera", 15)]) + grupo("Living", [("Almohadón lino", 32), ("Florero grande", 6)])
    panel = tarjeta("left:60px;top:230px;width:1000px;padding:44px 48px 40px", f"""
      <div class="row" style="justify-content:space-between"><div><div class="h">Inventario</div><div class="sub">Tus productos por categoría. Editá el stock al toque.</div></div></div>
      <div class="row" style="gap:12px;margin:24px 0 18px"><span class="chip on">Todas</span><span class="chip">Cocina</span><span class="chip">Living</span><span class="chip">Dormitorio</span></div>
      <table>{cuerpo}</table>""")
    return (TRAZO.format(s="right:-60px;top:20px") + panel
            + sticker("Stock", "Edición rápida", "left:760px;top:70px")
            + pill("Todo en un solo panel", "left:80px;top:1040px"))


def escena_barra():
    """Barra promocional propia: sin Lemora Ads, con tus mensajes y tu color."""
    mensajes = ["Envíos a domicilio", "Pagá 3 llevá 5", "Pedí tus favoritos online"]
    filas = "".join(f'<div class="in" style="margin-top:12px"><span style="color:#B9ABF0;font-size:26px">⠿</span>{m}</div>' for m in mensajes)
    colores = ["#FF9A52", "#6C4FD4", "#17122F", "#E3F547", "#E85D75", "#2DB5A0"]
    sw = "".join(f'<span class="sw" style="background:{c};{"box-shadow:0 0 0 4px #fff,0 0 0 7px #6C4FD4" if i == 0 else ""}"></span>' for i, c in enumerate(colores))
    panel = tarjeta("left:548px;top:92px;width:612px", f"""
      <div class="h">Barra promocional</div><div class="sub">Los mensajes se ven arriba de tu tienda.</div>
      <div class="lbl" style="margin-top:26px">Mensajes</div>{filas}
      <div class="in" style="margin-top:12px;background:#fff;color:#6C4FD4;justify-content:center;box-shadow:inset 0 0 0 2px #CFC3F7;border-style:dashed">+ Agregar mensaje</div>
      <div class="lbl" style="margin-top:26px">Color de la barra</div>
      <div class="row" style="gap:16px;margin-top:12px">{sw}</div>
      <div class="row" style="justify-content:flex-end;margin-top:30px"><div class="btn">Guardar</div></div>""")
    tel = celular("left:50px;top:400px;width:500px", 900, f"""
      <div class="tienda-barra" style="background:#FF9A52;color:#17122F"><span>Envíos a domicilio</span><span>•</span><span>Pagá 3 llevá 5</span></div>
      {cabecera_tienda()}{foto("barra-portada", "portada de la tienda con su título", "height:560px")}""")
    return (TRAZO.format(s="left:-70px;top:520px") + panel + tel
            + sticker("Tu barra", "Tus mensajes y tu color", "left:60px;top:150px;white-space:nowrap")
            + pill("Sin Lemora Ads", "left:600px;top:1010px"))


def escena_carrito():
    """Gastos de gestión y envío gratis en el carrito."""
    items = producto_fila("carrito-prod", 1, "$14.500") + producto_fila("carrito-prod", 2, "$11.000")
    linea = lambda a, b, extra="": f'<div class="row" style="justify-content:space-between;padding:12px 16px;font-size:23px;font-weight:600;border-radius:16px;{extra}"><span>{a}</span><b>{b}</b></div>'
    carrito = tarjeta("left:60px;top:90px;width:620px;padding:38px 42px", f"""
      <div class="h" style="font-size:36px">Tu carrito</div>
      <div style="margin-top:16px;padding:18px 22px;border-radius:24px;background:#F1ECFF"><div style="font-size:22px;font-weight:700;color:#4B33A8">Te faltan $4.500 para el envío gratis</div><div class="barra" style="margin-top:12px"><i style="width:86%"></i></div></div>
      <div class="col" style="margin-top:10px">{items}</div>
      <div class="col" style="margin-top:10px;gap:2px">{linea("Subtotal", "$25.500")}{linea("Gastos de gestión", "$1.200", "background:#F1ECFF;color:#4B33A8")}{linea("Total", "$26.700", "font-size:29px;font-weight:800")}</div>""")
    panel = tarjeta("left:640px;top:560px;width:520px;padding:36px 40px", f"""
      <div class="row" style="justify-content:space-between"><div class="h" style="font-size:30px">Gastos de gestión</div><span class="tog"></span></div>
      <div class="in" style="margin-top:14px">$1.200</div>
      <div class="h" style="font-size:30px;margin-top:26px">Envío gratis</div>
      <div class="row" style="gap:12px;margin-top:14px"><span class="chip on">Por monto</span><span class="chip">Por cantidad</span></div>
      <div class="lbl" style="margin-top:18px">A partir de</div><div class="in" style="margin-top:8px">$30.000</div>""")
    return (TRAZO.format(s="left:-70px;top:760px") + carrito + panel
            + sticker("Carrito", "Gestión y envío gratis", "left:740px;top:90px;white-space:nowrap")
            + pill("Vos elegís las condiciones", "left:70px;top:1030px;font-size:28px"))


def escena_6():
    """Carrusel de hasta 12 imágenes y 5 banners promocionales."""
    def tabla(prefijo, ancho_foto, alto_foto, filas):
        return "".join(
            f'<tr><td style="width:{ancho_foto + 20}px">{foto(prefijo + str(i), "imagen", f"width:{ancho_foto}px;height:{alto_foto}px;border-radius:10px;font-size:0")}</td>'
            f'<td><b>{t}</b></td><td style="width:120px"><span class="ok">Activo</span></td></tr>'
            for i, t in enumerate(filas, 1))
    carrusel = tarjeta("left:60px;top:100px;width:720px;padding:40px 44px", f"""
      <div class="row" style="justify-content:space-between"><div class="h" style="font-size:36px">Carrusel</div><div class="btn" style="height:56px;font-size:20px;padding:0 24px">+ Nuevo elemento</div></div>
      <div class="sub" style="color:#17122F">Máximo 12 elementos. Te quedan 9.</div>
      <table style="margin-top:18px"><tr><th>IMAGEN</th><th>TÍTULO</th><th>ESTADO</th></tr>{tabla("carr", 84, 46, ["Nueva temporada", "Ofertas de la semana", "Más vendidos"])}</table>""")
    banners = tarjeta("left:380px;top:620px;width:780px;padding:40px 44px", f"""
      <div class="row" style="justify-content:space-between"><div class="h" style="font-size:36px">Banners</div><div class="btn" style="height:56px;font-size:20px;padding:0 24px">+ Nuevo banner</div></div>
      <div class="sub" style="color:#17122F">Máximo 5 banners. Te quedan 2.</div>
      <table style="margin-top:18px"><tr><th>IMAGEN</th><th>CONTENIDO</th><th>ESTADO</th></tr>{tabla("ban", 130, 56, ["Promoción especial", "Envío gratis", "Nueva colección"])}</table>""")
    return (TRAZO.format(s="left:-60px;top:650px") + carrusel + banners
            + sticker("12 y 5", "Carrusel y banners", "left:810px;top:60px;white-space:nowrap")
            + pill("En vez de 8 y 3", "left:70px;top:1010px"))


def escena_7():
    """Marketing: notificación de confianza, ofertas por tiempo limitado y modo promociones."""
    barra = '<div style="height:50px;display:flex;align-items:center;justify-content:center;background:#E3F547;color:#17122F;font-weight:800;font-size:18px;letter-spacing:.06em">BLACK FRIDAY</div>'
    etiqueta = '<div style="position:absolute;left:14px;top:14px;background:#FF9A52;color:#17122F;font-weight:800;font-size:18px;border-radius:99px;padding:7px 14px;letter-spacing:.06em">OFERTA</div>'
    reloj = '<div style="margin-top:10px;background:#17122F;color:#fff;border-radius:14px;padding:8px 14px;font-size:20px;font-weight:700;display:inline-block">Termina en 02:14:36</div>'
    precio = '<span style="text-decoration:line-through;color:#6b6679;font-size:21px;margin-right:10px">$18.000</span><b style="color:#6C4FD4;font-size:27px">$12.600</b>'
    tel = celular("left:60px;top:200px;width:480px", 960, f"""
      {barra}{cabecera_tienda()}
      <div style="padding:14px 24px 0;position:relative">{foto("mkt-prod", "producto en oferta", "height:340px;border-radius:26px")}{etiqueta}
      <b style="font-size:26px;display:block;margin-top:14px">Producto</b><div style="margin-top:4px">{precio}</div>{reloj}</div>""")
    aviso = tarjeta("left:420px;top:880px;width:520px;padding:24px 30px;border-radius:34px", f"""
      <div class="row" style="gap:20px"><span class="ph" style="width:68px;height:68px;border-radius:50%;background:#FF9A52;color:#17122F">{CAMPANA}</span>
      <div class="col"><b style="font-size:25px">Notificación de confianza</b><span class="lbl" style="font-size:21px">Tu mensaje acá</span></div></div>""")
    def fila(n, sub, on=True):
        tog = "tog" if on else "tog off"
        return (f'<div class="row" style="justify-content:space-between;padding:17px 0;border-top:1px solid #EFEAFB">'
                f'<div class="col"><b style="font-size:24px">{n}</b><span class="lbl" style="font-size:18px">{sub}</span></div><span class="{tog}"></span></div>')
    panel = tarjeta("left:620px;top:120px;width:540px;padding:38px 40px", f"""
      <div class="h" style="font-size:34px">Marketing</div><div class="sub" style="font-size:19px">Todo junto, en tu panel.</div>
      <div class="col" style="margin-top:16px">{fila("Notificación de confianza", "Se muestra en tu tienda")}{fila("Ofertas por tiempo limitado", "Producto por producto")}{fila("Modo promociones", "Black Friday, Hot Sale, CyberMonday")}</div>
      <div class="row" style="justify-content:flex-end;margin-top:22px"><div class="btn" style="height:58px">Guardar</div></div>""")
    return (TRAZO.format(s="right:-90px;top:640px") + tel + panel + aviso
            + sticker("Marketing", "Promos, ofertas y confianza", "left:660px;top:690px;white-space:nowrap")
            + pill("Todo junto en tu panel", "left:640px;top:1070px;font-size:27px"))


ESCENAS = {1: escena_barra, 2: escena_1, 3: escena_2, 4: escena_3, 5: escena_carrito, 6: escena_6, 7: escena_7}

if __name__ == "__main__":
    pedidas = [int(a) for a in sys.argv[1:] if a.isdigit()] or list(ESCENAS)
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
            destino = SALIDA / f"premium-{n}.webp"
            Image.open(png).convert("RGB").save(destino, "WEBP", quality=88, method=6)
            print(f"premium-{n}.webp  {destino.stat().st_size // 1024} KB", flush=True)
        b.close()
