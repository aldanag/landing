# Estilo de UI de las imágenes Premium

Cómo se dibuja la interfaz en `generar.py` (lienzo cuadrado de **1200 × 1200 px**, tipografía **Manrope**). Sirve para que cada
imagen nueva se vea de la misma familia que las anteriores. Los criterios de contenido y movimiento están en
[CRITERIOS.md](CRITERIOS.md).

## Colores

| Uso | Valor |
| --- | --- |
| Tinta (texto, botón oscuro, píldoras) | `#17122F` |
| Violeta de marca (botones, selección, precios, checks) | `#6C4FD4` |
| Violeta intenso (texto sobre fondo lila) | `#4B33A8` / `#5B41C4` |
| Lila de apoyo (casilleros activos, chips, hover) | `#F1ECFF`, `#F6F2FF`, `#E2D9FF` |
| Fondo de la imagen | degradé `#EFEBFC` → `#D8CEF5` |
| Rulo de Lemora (`TRAZO`) | trazo `#B9ABF0`, opacidad .55 |
| Bordes finos de tarjetas y campos | `#E6E2F0`, `#ECE8F5`, `#E0DCEC` (1,5 px, inset) |
| Líneas punteadas | `#7C6AE0`, 6 px, `stroke-dasharray="1 13"`, puntas redondas |
| Éxito / barra llena | `#16A34A` (fondo `#DCFCE7`, texto `#15803D`) |
| Stock bajo | `#B45309` · Peligro `#DC2626` · Check naranja `#FF9A52` |

Texto secundario en gris (`#6b6679`) solo si es imprescindible; en pop-ups y tarjetas va en tinta (ver CRITERIOS).

## Piezas

- **Tarjeta** (`tarjeta()`): blanca, radio 26 px (ventanas grandes 34–40 px), padding 26–32 px, sombra violeta suave
  (`0 40px 70px -34px rgba(76,52,170,.38)` + borde `rgba(108,79,212,.10)`).
- **Campo**: alto 46–62 px, radio 12 px, fondo blanco, borde fino; foco violeta: anillo interno de 3 px `#6C4FD4` más aureola
  `rgba(108,79,212,.25)`.
- **Botón primario** (`.btn`): `#6C4FD4`, texto blanco 700, radio 14 px, alto 50–58 px. Botón secundario: blanco con borde.
- **Casillero**: 28 px, radio 8 px, violeta con tilde blanco; fila activa con fondo `#F1ECFF`, alto 56 px, radio 14 px.
- **Chip / etiqueta**: píldora de 99 px de radio, fondo `#F4F0FF` o `#F1F5F9`; estado «Activa» en verde.
- **Sticker** (`sticker()`): violeta con degradé `#8269E0 → #5B41C4`, radio 30 px, girado −6°, título 58 px 800 y subtítulo en
  mayúsculas con `letter-spacing .08em`; se superpone un poco sobre la UI.
- **Píldora de mensaje** (`pill()`): `#17122F`, radio 30 px, texto blanco 31 px 700, círculo naranja con check. Nunca blanca.
- **Celular** (`celular()`): marco `#3B3262`, radio 78 px, pantalla con isla y barra de estado; proporción 9:16, a veces cortado
  por abajo. Cabecera de tienda: «TU TIENDA» con `letter-spacing .26em`, íconos de lupa, corazón, carrito y menú.
- **Panel de administración** (`lateral_admin()`): barra lateral de 84 px solo con íconos sólidos y el logo «L» de Lemora arriba;
  cabecera blanca de 84 px con ««», título 28 px 800, «Ver tienda ↗» y «Admin».
- **Cursor de las animaciones**: flecha blanca con borde `#17122F`, sombra suave; al hacer clic se achica (scale .82) y sale una
  onda de 2 px violeta. Hover: el elemento se marca en violeta y su flecha crece 1,5×.

## Tipografía

Títulos de tarjeta 30–36 px peso 800; etiquetas 20–22 px peso 700; texto de campo 24–25 px peso 600; filas de tablas 18–19 px;
mayúsculas chicas (cabeceras de tabla, subtítulo de sticker) 14–15 px con `letter-spacing .06–.08em`.

## Espaciado y composición

- Márgenes del lienzo: **60 px** a cada lado en las composiciones de dos columnas; gutter entre columnas de 60 px.
- Separación entre tarjetas apiladas: **24–60 px**; dentro de una tarjeta, 16–24 px entre bloques y 33–37 px antes del botón.
- Alinear arriba las columnas y, si una columna es más corta, hacerla crecer en vez de dejar un hueco.
- Sombra y borde siempre violetas, nunca grises; las piezas se superponen levemente para dar profundidad.

## En el código

Todo lo anterior vive en el bloque `CSS` de `generar.py` y en los helpers `tarjeta`, `sticker`, `pill`, `celular` y
`lateral_admin`. Las animaciones usan los mismos valores en unidades `cqw` (1 px de la imagen = 1/12 cqw) en `src/index.css` y
`src/components/*Animado.jsx`.
