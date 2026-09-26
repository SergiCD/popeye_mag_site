# Decisiones de diseño

## Referencia observada

Se inspeccionaron el inicio y la página Work de `https://uthinhpham.com/` el 26 de septiembre de 2026. A 1280 px, el panel lateral ocupa unos 400 px y la navegación superior mide aproximadamente 46 px. El contenido principal usa una cuadrícula verde, fotografías blancas tipo Polaroid y enlaces manuscritos. Work cambia ese tablero por una cuadrícula de proyectos en dos columnas.

La adaptación mantiene esas relaciones: panel de 31,25 % hasta pantallas grandes, cabecera de 46 px, cuadrícula de 36 px, tarjetas con inclinación y archivo de dos columnas. El logo de POPEYE sustituye el nombre del diseñador; las portadas ocupan el lugar de sus fotografías. No se incorporan sus ilustraciones personales ni sus proyectos.

## Interacciones

Las fotografías son botones y abren un diálogo nativo. El navegador gestiona el foco dentro del diálogo y su retorno al botón al cerrar. Los filtros exponen su estado mediante `aria-pressed`; los enlaces activos usan `aria-current`. Al cambiar de vista, el foco pasa al contenido principal. Las animaciones se limitan a transiciones cortas de hover y se desactivan con `prefers-reduced-motion`.

El canvas utiliza Pointer Events y captura del puntero para que el trazo termine correctamente aunque salga del área. Se ajusta a la densidad de píxeles y conserva el dibujo al cambiar de tamaño. La función es decorativa; ninguna tarea de navegación depende de dibujar.

## Responsive y contenido

Por debajo de 700 px, el panel fijo se convierte en una presentación compacta. El tablero mantiene una composición propia para móvil. Los diálogos pasan a una columna. El archivo presenta las portadas completas con `object-fit: contain`; las fotografías del tablero admiten recorte para reproducir su lenguaje de collage.

Se mantienen textos en inglés y detalles en japonés para conservar el contexto editorial. El archivo distingue los números 937 y 928 de la fotografía de una colección: esta última no se presenta como un número individual inventado.

## Límites deliberados

No hay backend, analítica, cuenta de usuario ni tienda. Los enlaces a la revista abren su sitio oficial. La build funciona en la raíz del alojamiento; para servirla en un subdirectorio hay que adaptar las rutas absolutas de recursos. La fidelidad del movimiento está limitada a las interacciones observadas, sin atribuir al original animaciones que no se verificaron.
