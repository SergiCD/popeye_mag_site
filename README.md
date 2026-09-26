# POPEYE — Magazine for City Boys

Un archivo editorial independiente inspirado en la web de [Uthinh Pham](https://uthinhpham.com/), adaptado a la revista japonesa POPEYE. Conserva la estructura de barra lateral fija, navegación superior, tablero verde cuadriculado, fotografías inclinadas y enlaces manuscritos.

## Ejecutar

Requiere Node.js 22 o posterior. No hay dependencias de ejecución ni paso de instalación.

```sh
npm run dev
```

Abre `http://localhost:5173`. Si el puerto está ocupado, usa `PORT=5178 npm run dev`.

```sh
npm test       # Integridad de imágenes y comportamiento del servidor
npm run build # Genera dist/ para alojamiento estático
```

Para revisar el artefacto final: `SERVE_DIST=1 PORT=5178 npm start`. El servidor de desarrollo escucha solo en la interfaz local. Para publicar, sirve el contenido de `dist/` desde la raíz de un dominio mediante un alojamiento estático con HTTPS.

## Qué incluye

- Inicio con tablero editorial y fotografías que abren fichas de detalle.
- Archivo de seis ediciones, con filtros de moda, interiores, ciudad y viajes. La fotografía de la colección se conserva en Scrapbook.
- Scrapbook con fotografías ampliadas y notas editoriales originales.
- Página de contexto y enlaces al sitio oficial.
- Bloc de dibujo con soporte de ratón, lápiz y táctil, y botón para borrar.
- Navegación por teclado, diálogo nativo con Escape, foco visible y movimiento reducido.
- Diseño móvil: la barra lateral pasa a ser una cabecera compacta y se oculta el bloc.

Las rutas usan fragmentos (`#home`, `#editions`, `#scrapbook`, `#about`), por lo que funcionan sin reglas de redirección en el alojamiento. No hay formularios que simulen suscripciones, compras ni servicios externos.

## Organización y mantenimiento

| Archivo             | Responsabilidad                                  |
| ------------------- | ------------------------------------------------ |
| `index.html`        | Estructura compartida, metadatos y diálogo       |
| `src/issues.js`     | Contenido de las fichas y referencias a imágenes |
| `src/main.js`       | Vistas, navegación, filtros, diálogo y dibujo    |
| `src/style.css`     | Composición, tipografía y adaptación responsive  |
| `public/images/`    | Imágenes del usuario y portadas oficiales              |
| `server.mjs`        | Servidor local de archivos públicos              |
| `scripts/build.mjs` | Copia reproducible del sitio a `dist/`           |

Para añadir una revista, copia su imagen a `public/images/` y añade una entrada a `src/issues.js` con un `id` único. La colección se actualiza automáticamente. El collage del inicio está compuesto manualmente en `home()` para mantener el encuadre de la referencia. Los datos son contenido editorial local de confianza; si se incorpora un CMS, hay que sustituir las plantillas HTML por renderizado escapado antes de aceptar contenido externo.

## Alcance y fuentes

La implementación es una adaptación visual, no una copia del código Framer del original ni una reproducción píxel a píxel. Se sustituyen la identidad personal, los proyectos y los servicios por contenido de revista. El bloc de la referencia no cargaba durante la inspección; aquí tiene una implementación local funcional. Las fichas contienen notas originales, no artículos completos.

El logotipo y las tres fotografías fueron proporcionados por el usuario. Las portadas de las ediciones 934, 935, 936 y 939 se obtuvieron de Magazine House; las fuentes están registradas en [el inventario de imágenes](docs/assets.md). Las fuentes Barlow Condensed y Caveat se cargan desde Google Fonts; existen alternativas del sistema si no hay conexión. El dibujo se mantiene al cambiar de vista, pero se pierde al recargar; no se envía ni se guarda en un servidor.

Consulta [las decisiones de diseño](docs/design.md) y [la verificación](docs/verification.md). POPEYE y sus imágenes pertenecen a sus respectivos titulares; este proyecto no representa a la revista ni a su editorial.

Los enlaces antiguos a `#issues` siguen funcionando como acceso a Editions.
