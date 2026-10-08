# Lemora · landing

Versión corta (landing) del sitio de Lemora: tu tienda online, sin comisiones, con los pedidos directo en WhatsApp.

Hecha con React 19, Vite, Tailwind CSS v4 y GSAP. La versión larga, con el resto de las secciones del sitio original, va en un proyecto aparte.

## Secciones

Hero · Cómo funciona · Prueba gratis · Funcionalidades · Testimonios · Planes · Preguntas frecuentes · Footer

## Cómo correrla

```bash
npm install
npm run dev      # servidor local en http://localhost:5173
npm run build    # genera dist/
npm run lint     # oxlint
```

## Diseño

Colores, tipografías y reglas de uso: ver [DESIGN.md](DESIGN.md). Los tokens viven en `src/index.css` (`@theme`).

- **Motion:** GSAP con `useGSAP` y ScrollTrigger (`src/lib/motion.js`). Con "reducir movimiento" quedan solo fundidos.
- **Íconos:** Font Awesome (solo los que se usan) más SVG propios.
