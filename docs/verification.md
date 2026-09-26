# Verificación

## Automatizada

`npm test` comprueba que cada ficha tiene una imagen local válida, que no hay identificadores repetidos, que el servidor entrega HTML y JavaScript con el tipo correcto y que los archivos privados o inexistentes no se sirven. La prueba usa el puerto local 5189 y termina el proceso al concluir.

`npm run build` genera el directorio estático. No hay transpilador ni dependencias de aplicación.

## Revisión en navegador

Revisión realizada en el navegador integrado de Codex (Chromium), con viewport de escritorio y móvil de 390 × 844:

- Inicio: composición visible y todas las imágenes cargadas.
- Archivo: navegación desde la cabecera y filtro Travel mostrando únicamente el número 928. Editions contiene seis números; Fashion contiene tres y Interiors uno.
- Ficha: contenido del número seleccionado y cierre mediante Escape.
- Móvil: ancho del documento igual al viewport, sin scroll horizontal.
- Ajuste del espacio entre enlaces manuscritos y fotografías inferiores tras inspección visual.
- Retoques de navegación: SVG de carpeta y bombilla, enlaces sin flechas y “Hello, POPEYE” en negrita.
- Borrado: un trazo activa `is-erasing` al pulsar Clear; al terminar se muestra el bloc vacío y el botón vuelve a estar disponible.

## Comprobaciones para futuros cambios

1. Abrir las cuatro rutas y probar Atrás/Adelante.
2. Filtrar cada categoría y volver a All.
3. Abrir una ficha con teclado y cerrarla con Escape; comprobar retorno del foco.
4. Dibujar, salir del canvas durante un trazo y borrar; cambiar el tamaño de la ventana.
5. Revisar a 390 px, 768 px y escritorio. Las portadas del archivo deben verse completas.
6. Generar `dist/` y servirlo con `SERVE_DIST=1` antes de publicar.

No se ha verificado en dispositivos físicos, Safari o Firefox. No se afirma equivalencia píxel a píxel ni se ha publicado un dominio de producción.
