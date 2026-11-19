# Criterios de las imágenes Premium

Lo aprendido de las correcciones de Aldi al rehacer las 7 imágenes de «Funciones Premium». Se aplica a cada imagen nueva o
rehecha de `generar.py` y a sus animaciones en `src/components/*Animado.jsx`. Se trabaja **una imagen a la vez**: no avanzar a
la siguiente sin que lo pida.

## Textos

- **Cortos y grandes.** Un texto largo o chico es «choclo»: se resume y se agranda.
- **Sin textos grises** en tarjetas, pop-ups ni paneles: subtítulos, ayudas y etiquetas chicas se eliminan o pasan a tinta oscura.
  «Simplificar» es la respuesta por defecto.
- **Nunca límites ni cantidades máximas dentro de la imagen** («hasta 12», «máximo 5», «te quedan 9»). Los límites van solo en el
  texto de afuera (`src/lib/funcionesPremium.js`).
- **Tono formal.** «Gestión rápida», no «al toque».
- **No inventar funciones** que no existen en la tienda real ni mostrar datos reales de clientes (nombres inventados, sin mails
  reales).
- **Mensajes superpuestos**: píldora azul oscuro (`#17122F`, radio 30 px, check naranja), nunca blanca. **Stickers**: violeta,
  breves («Una página», «Marketing»), levemente superpuestos.

## Composición

- **Equilibrada y limpia**: dos columnas con los mismos márgenes (60 px), arriba alineado, ritmo vertical parejo. Si se ve
  «cargado», sacar elementos en vez de achicarlos.
- **Sin huecos**: un espacio vacío se llena con contenido útil (otro producto, otra fila) o se hace que la pieza fluya y crezca.
  No dejar filas reservadas en blanco.
- **Un pop-up no tapa texto ni cartel**: se achica, se sube o se corre. Cada pop-up termina antes de la píldora de abajo.
- **Celular** con proporción 9:16; si sale cortado abajo, que lo visible no pase de ~1,9 de alto sobre el ancho. El sticker va
  arriba del celular.
- **Líneas punteadas** unen lo que se configura con lo que produce: terminan tocando el elemento, con una sola curva (en L) y sin
  cruzarse. Si se cruzarían, se reordenan las tarjetas.
- **Fondo lila** con el rulo de Lemora (`TRAZO`) para llenar huecos grandes: probar posiciones, giros y escala hasta que ocupe bien
  el espacio.
- **Logo**: la «L» de Lemora en todos los paneles (no el corazón).
- Dibujar la UI real con código, fiel a las capturas que manda Aldi. Los **badges reales** (Black Friday, Hot Sale,
  CyberMonday) son los SVG de `fotos/badge-*.svg`, recortados a su contorno.

## Movimiento

- Mostrar **uso real**: cursor que hace clic, hover y foco violeta, un precio que se escribe tecla a tecla, un número que sube,
  un producto que se suma y la barra que se llena. Lo que cambia aparece **solo cuando corresponde** (el aviso de envío gratis
  recién cuando la barra se llena).
- Todo en bucle y con `prefers-reduced-motion`: sin movimiento queda el **estado final** a la vista. Para verlo animado en
  Windows con animaciones apagadas, abrir con `?motion=on`.
- **Nada aparece tarde.** Si la animación dibuja parte de la imagen (carrito, badges de Marketing), esa superposición entra y sale
  junto con la imagen (`superposicionFija` en `FuncionesPremium.jsx`); si no, quedan líneas apuntando a la nada.
- Notificación de confianza: sube desde el borde de abajo del celular.

## Proceso

- Regenerar con `python herramientas/premium-imagenes/generar.py N`, `npm run build` y `npx oxlint`.
- Verificar los cuadros reales: pausar `document.getAnimations()` en tiempos exactos y mirar el resultado.
- Medir con el HTML generado (`_tmp/*.html`, ids como `cerrar`, `cd-min`) las posiciones que usan las animaciones.
- **No hacer commit ni push sin que lo pida.** «Commit y push» va directo a `main`.

Estilo de la interfaz (colores, piezas, tipografía y espaciado): ver [ESTILO-UI.md](ESTILO-UI.md).

## Criterios para todos los diseños (landing, portadas, imágenes)

- **Espacios:** revisar siempre los espacios con los skills de diseño. Nada de huecos grandes entre elementos; en textos animados reservar solo el alto real (una línea) y acortar las frases para que entren.
- **Celulares:** si van cortados, siempre contra el borde del contenedor (el de abajo del panel o de la tarjeta), nunca cortados al azar en el medio. Marco violeta oscuro, barra de estado 9:41, isla y señal/batería del mismo alto.
- **UI real:** usar la interfaz ya aprobada de Lemora (las ventanas del panel de `src/assets/premium-overlays`, el contador y la notificación de confianza reales). No inventar menús, píldoras ni tarjetas.
- **WhatsApp:** si la tienda vende por WhatsApp, usar el ícono de WhatsApp (botón de WhatsApp en la tienda, pedido por WhatsApp).
- **Badges:** usar los que se pasaron (`badge-bf`, `badge-hs`, `badge-cm`), tal cual.
