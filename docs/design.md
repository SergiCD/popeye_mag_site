# Decisiones de diseño

## Referencia observada

Se inspeccionaron el inicio y la página Work de `https://uthinhpham.com/` el 26 de septiembre de 2026. A 1280 px, el panel lateral ocupa unos 400 px y la navegación superior mide aproximadamente 46 px. El contenido principal usa una cuadrícula verde, fotografías blancas tipo Polaroid y enlaces manuscritos. Work cambia ese tablero por una cuadrícula de proyectos en dos columnas.

La adaptación mantiene esas relaciones: panel de 31,25 % hasta pantallas grandes, cabecera de 46 px, cuadrícula de 36 px, tarjetas con inclinación y archivo de dos columnas. El logo de POPEYE sustituye el nombre del diseñador; las portadas ocupan el lugar de sus fotografías. No se incorporan sus ilustraciones personales ni sus proyectos.

## Interacciones

Las fotografías son botones y abren un diálogo nativo. El navegador gestiona el foco dentro del diálogo y su retorno al botón al cerrar. Los filtros exponen su estado mediante `aria-pressed`; los enlaces activos usan `aria-current`. Al cambiar de vista, el foco pasa al contenido principal. Las animaciones se limitan a transiciones cortas de hover y se desactivan con `prefers-reduced-motion`.

El canvas utiliza Pointer Events y captura del puntero para que el trazo termine correctamente aunque salga del área. Se ajusta a la densidad de píxeles y conserva el dibujo al cambiar de tamaño. La función es decorativa; ninguna tarea de navegación depende de dibujar.

### Detalles de interacción

Las fotografías del tablero se recolocan con Pointer Events. Un umbral de 6 px distingue arrastre de clic: arrastrar no abre la ficha; un clic normal sí. La fotografía activa queda por encima de las demás y sus coordenadas se limitan al tablero. Las posiciones se conservan en memoria al navegar y se adaptan proporcionalmente al cambiar de tamaño; se pierden al recargar o pulsar «Reset the desk». Escape cancela el arrastre en curso. Las flechas del teclado desplazan la fotografía enfocada 12 px, o 40 px con Shift. Las zonas libres del tablero permiten arrastrar la composición entera, incluida la cuadrícula, mediante una capa `.desk-world`. Los enlaces y botones no inician este desplazamiento. El gesto táctil sobre el tablero se reserva para arrastrar; la página puede desplazarse desde la cabecera y el resto del documento. El desplazamiento global se conserva al navegar y Reset lo devuelve a cero junto con las fotos.

Las pills de filtros cambian de fondo y se elevan 2 px en hover o foco visible. El filtro seleccionado mantiene su verde más oscuro y las transiciones respetan movimiento reducido.

Los enlaces principales prescinden de flechas. Se conservan en las fichas, los enlaces editoriales externos y el regreso al escritorio, con desplazamientos pequeños al hacer hover o dar foco con teclado. Las carpetas usan los dos SVG facilitados por el usuario: la transición combina opacidad y perspectiva para sugerir su apertura. El icono de About utiliza también el SVG proporcionado.

“Hello, POPEYE” usa peso 700, una ligera inclinación y un subrayado animado. El logotipo central se eleva e inclina suavemente y enlaza a About. Todos estos efectos tienen equivalente con foco visible.

Clear elimina progresivamente los píxeles del dibujo durante 620 ms, con una franja que acompaña el barrido. Mientras borra, se bloquean nuevos trazos y el botón; al terminar se recupera el texto de invitación. Un cambio de tamaño durante el proceso completa el borrado. Con movimiento reducido, el borrado es inmediato.

## Responsive y contenido

Por debajo de 700 px, el panel fijo se convierte en una presentación compacta. El tablero mantiene una composición propia para móvil. Los diálogos pasan a una columna. El archivo presenta las portadas completas con `object-fit: contain`; las fotografías del tablero admiten recorte para reproducir su lenguaje de collage.

Se mantienen textos en inglés y detalles en japonés para conservar el contexto editorial. El archivo distingue los números 937 y 928 de la fotografía de una colección: esta última no se presenta como un número individual inventado.

## Límites deliberados

No hay backend, analítica, cuenta de usuario ni tienda. Los enlaces a la revista abren su sitio oficial. La build funciona en la raíz del alojamiento; para servirla en un subdirectorio hay que adaptar las rutas absolutas de recursos. La fidelidad del movimiento está limitada a las interacciones observadas, sin atribuir al original animaciones que no se verificaron.

El logo central ocupa el 72 % de su contenedor (78 % en móvil). Las tarjetas superiores tienen un margen positivo respecto al borde, también en móvil, para que no aparezcan cortadas en la composición inicial.
