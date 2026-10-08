# Lemora — ADN de marca y design system

Fuente de verdad para editar el sitio. Los tokens viven en `src/index.css` (`@theme`). Versión visual con previews: https://claude.ai/artifact/EAzESYDJeE51LPwRSSyt4C

## Tokens de color

| Token | Valor | Rol |
|---|---|---|
| `white` | #ffffff | Fondo de página y cards |
| `mist` | #ebe8f2 | Fondos suaves, botón secundario |
| `lavender` | #b9abf0 | Superficies grandes (Hero, cards de pasos) |
| `primary` | #6c4fd4 | Botón primario (texto blanco), íconos, links, corona |
| `primary-dark` | #5a3fc0 | Hover violeta |
| `primary-tint` | #ece8fb | Fondos suaves violeta |
| `lime` | #e3f547 | Tags (badges) y trazos curvos del Hero |
| `accent` | #ff9a52 | Ticks de listas y borde del plan Premium |
| `ink` | #17122F | Texto y bloques oscuros |
| `ink-soft` | #4f4a5e | Texto secundario (solo sobre white/mist) |
| `ink-muted` | #6b6679 | Texto apagado (solo sobre white/mist) |

Lemora es una tienda online por membresía para emprendedores de Latinoamérica: el cliente arma el pedido en la tienda y el emprendedor lo recibe directo en WhatsApp. La marca se siente joven, clara y sin vueltas. Usá este sistema para cualquier página, pieza o pantalla de Lemora.

## Fundamentos del contenido

- Escribí en español rioplatense con voseo: "Probá", "Empezá", "Vendé", "Tenés", "Pagás". Nunca "tú" ni formas de España ("añadir": usá "agregar").
- Los títulos son frases cortas que terminan en punto, a veces en dos oraciones: "Tu tienda online. Sin comisiones.", "Empezá gratis. Vendé desde hoy."
- Los botones usan el infinitivo y dicen qué pasa: "Probar gratis 1 mes", "Suscribirme". Sin signos de exclamación ni emojis.
- Solo afirmaciones verdaderas. Los datos que se pueden repetir: sin comisiones por venta, sin tarjeta para el mes de prueba, Básico $9.000/mes con contratación mínima de 1 mes, Premium $15.000/mes con contratación mínima de 3 meses, pedidos por WhatsApp, cobro por MercadoPago. No inventes cifras, calificaciones con estrellas ni cantidades de tiendas.
- Los testimonios son siempre reales, con nombre, rubro o tienda y foto si existe. Un testimonio pendiente va como lugar marcado con `[Completar]`, nunca con datos inventados.
- Evitá jerga técnica ("marquee", "popup", "slides") en textos nuevos: el carrusel se cuenta en "imágenes", no en "slides". Si un plan ya usa la jerga, se respeta.
- Pendiente de decidir: el mes gratis se nombra "1 mes" en botones y planes y "30 días" en el título del banner. Elegí una sola forma y usala en todo el sitio.

## Fundamentos visuales

- **Color.** Cada color tiene un rol. `primary` (violeta) en el botón primario con texto blanco, y también en íconos, links y la corona. `lime` (amarillo) en los tags (badges) y en los trazos curvos decorativos del Hero. `accent` (naranja) en los ticks de las listas y en el borde del plan Premium. `lavender` en superficies grandes. `mist` en fondos de sección y botones secundarios. `ink` en texto y bloques oscuros. El fondo de página es `white`.
- **Texto sobre color.** Sobre `lavender`, `accent` y `lime` el texto va siempre en `ink`. Sobre `primary` va siempre en blanco. `ink-soft` y `ink-muted` solo sobre `white` y `mist`. Nunca uses blanco sobre `accent`.
- **Tipografía.** Inter en todo. Los títulos van apretados: H1 con `-0.035em` y H2 con `-0.03em` y `line-height` 1.1. El texto corrido en peso 400, las listas en 400 con la palabra clave en 700. Los badges van en mayúsculas con `0.09em` de espaciado.
- **Cajas.** Tres niveles de esquina: panel (`radius-panel`), card (`radius-card`) e interior (`radius-inner`). Botones, badges, menú y avatares en `radius-pill`. No mezcles esquinas dentro de un mismo nivel.
- **Anchos.** El Hero ocupa hasta 88rem. Las secciones de contenido ocupan 5xl (1024px). La sección de planes ocupa 3xl (768px) para que las cards midan unos 356px: cards angostas, texto a la izquierda y botones al ancho de la card.
- **Fondos de sección.** Alternalos con criterio: blanco, `mist`, panel `lavender`, bloque `ink`. No cortes la página en más de un banner oscuro seguido de otro color.
- **Sombras.** Solo `shadow-card` sobre fondos oscuros o de color, y `shadow-nav` en el menú contraído. Sin sombras duras desplazadas ni bordes laterales de color en las cards.
- **Menú.** Es una píldora blanca. Arriba del todo ocupa el ancho del Hero y sin sombra. Al scrollear se contrae a un ancho de 4xl y suma `shadow-nav`.
- **Foco.** Todo elemento interactivo usa un contorno sólido de 2px en `ink` con 2px de separación.
- **Movimiento.** Una sola entrada en el Hero: el título sube línea por línea y el resto aparece con un pequeño retraso. Las secciones aparecen una vez al entrar en pantalla (28px hacia arriba, 1s, curva `expo.out`). Con "reducir movimiento" activado no se anima nada y todo se ve.
- **Botones.** Un solo componente, con cuatro variantes por rol (`primary` violeta, `secondary` mist, `dark` ink, `chip`) y tres tamaños por lugar (`sm` menú, `md` cards, `lg` Hero). Peso 600 en todos, mismo hover y mismo foco. Detalle completo en el componente Button.
- **Botones apilados.** En una card, el botón principal (`primary`, violeta) va arriba y el secundario (`mist`) abajo, ambos al ancho de la card. El aviso "No te pedimos la tarjeta" va centrado justo sobre el botón de prueba.

## Iconografía

- Íconos SVG en línea, trazo de 2 a 2,5px con puntas redondeadas, sin librería ni fuente de íconos. Color `primary` sobre blanco; los ticks de listas van en `accent` (trazo de 3px).
- Los íconos en uso: check (listas), más y menos (acordeón), flecha, chat, ojo (Ver ejemplo) y corona rellena (Premium).
- La corona marca solo al plan Premium, al lado de su nombre. En las listas, las funciones exclusivas se distinguen en negrita y siempre con check.
- Sin emojis como decoración.

## Logo

El logo es el wordmark "Lemora" en letra cursiva, en un violeta (`#664FD3`) casi idéntico a `primary`. Es la versión provisoria hasta confirmar la definitiva. Usalo sobre `white` o `mist` y no lo recolorees. El archivo está en el grupo Logos de Assets.

## Imágenes

Las capturas del producto reales se muestran dentro de una card de `radius-card`, alineadas arriba. Hasta tener imágenes finales, los marcos de producto quedan como placeholders grises con un ícono de imagen.
