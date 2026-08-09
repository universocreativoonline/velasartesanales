# Velas Studio

Aplicación web progresiva (PWA) complementaria del ebook **"Guía de Velas Artesanales — Del Pasatiempo al Ingreso"**.

Es una caja de herramientas, no un resumen del curso: calculadora de precios, un flujo de producción con 3 checklists y una mini guía de fotografía de producto, una galería de inspiración con fotografías reales, consejos, preguntas frecuentes, recomendaciones de seguridad, información de la app y contacto. Toda la información se guarda en el dispositivo del usuario mediante `localStorage`; no hay backend ni base de datos.

**Navegación:** Inicio · Calculadora · Producción · Inspiración · Más.

## Estructura del proyecto

```
velas-studio/
├── index.html
├── styles.css
├── app.js
├── manifest.webmanifest
├── service-worker.js
├── README.md
├── icons/
│   ├── favicon.ico
│   ├── favicon-16x16.png
│   ├── favicon-32x32.png
│   ├── apple-touch-icon.png
│   ├── icon-192.png
│   ├── icon-512.png
│   ├── icon-mark.png
│   └── welcome-icon.png
└── assets/
    └── inspiracion/
        ├── vela_aromatica.jpg
        ├── vela_minimalista.jpg
        ├── vela_premium.jpg
        ├── vela_floral.jpg
        ├── velas_navidenas_1.jpg
        └── vela_de_regalo.jpg
```

## Cómo probarla localmente

No se necesita ningún paso de compilación. Basta con servir la carpeta con cualquier servidor estático, por ejemplo:

```bash
cd velas-studio
python3 -m http.server 8080
```

Luego abrí `http://localhost:8080` en el navegador. (Abrir `index.html` directamente con doble clic también funciona para navegar la app, pero el Service Worker y la instalación como PWA requieren que el sitio se sirva por HTTP/HTTPS, no por `file://`.)

## Cómo publicarla en GitHub Pages

1. Creá un repositorio nuevo en GitHub (por ejemplo `velas-studio`).
2. Subí todo el contenido de esta carpeta a la raíz del repositorio:
   ```bash
   git init
   git add .
   git commit -m "Primera versión de Velas Studio"
   git branch -M main
   git remote add origin https://github.com/TU-USUARIO/velas-studio.git
   git push -u origin main
   ```
3. En GitHub, entrá a **Settings → Pages**.
4. En **Source**, elegí la rama `main` y la carpeta `/ (root)`.
5. Guardá los cambios. GitHub Pages publicará el sitio en unos minutos en una URL con el formato:
   ```
   https://TU-USUARIO.github.io/velas-studio/
   ```
6. Entrá a esa URL desde el celular o la computadora para verificar que todo funcione correctamente.

## Instalar como aplicación

- **Android (Chrome):** abrí la URL publicada, tocá el menú (⋮) y elegí **"Instalar app"** o **"Agregar a pantalla de inicio"**.
- **iPhone (Safari):** abrí la URL publicada, tocá el ícono de compartir (□↑) y elegí **"Agregar a pantalla de inicio"**.

Una vez instalada, la app se abre en pantalla completa, sin la barra del navegador, y funciona sin conexión gracias al Service Worker incluido.

## Antes de publicar

- En **Más → Contacto**, el correo `hola@velasstudio.com` es un ejemplo. Reemplazalo por tu propia dirección en `index.html` (buscá `mailto:hola@velasstudio.com`) antes de subir la app.
- La galería de **Inspiración** usa fotografías reales provistas por el cliente, guardadas en `assets/inspiracion/` (no ilustraciones ni iconos). Cada una de las 6 categorías tiene 3 tarjetas que responden una pregunta concreta con contenido práctico: explicación, pasos, checklist cuando corresponde, ejemplos reales y tips accionables. Al tocar una tarjeta se abre un modal con la fotografía de la categoría y el contenido completo.

## Producción

La sección Producción organiza el trabajo en 4 pasos secuenciales, con chips de acceso rápido arriba:

1. **Antes de producir** — checklist de 6 puntos previos a fabricar. Los ítems tienen una explicación breve opcional (botón con flecha) que se despliega sin salir de la lista.
2. **Control de calidad** — checklist nuevo de 8 puntos para revisar antes de dar una vela por terminada, también con explicaciones desplegables.
3. **Antes de publicar** — checklist de 9 puntos enfocado en publicar el producto para la venta (fotos, precio, envío, stock, etc.), sin explicaciones adicionales.
4. **Fotos que venden** — mini guía estática (no es un checklist) con las 3 fotografías recomendadas para publicar una vela: Producto, Detalle y Contexto.

Cada checklist muestra su progreso como "X/N" y cambia a "✓ Todo revisado" al completarse, con una pequeña celebración animada. El widget de progreso en Inicio (los dos anillos) refleja los checklists de "Antes de producir" y "Antes de publicar".

## Fotografías de Inspiración

- Cada categoría usa la fotografía que mejor coincide con su nombre. Como el archivo `vela_minimalista.jpg` no tiene una categoría "Velas minimalistas" en la lista actual (Aromáticas, Decorativas, Premium, Florales, Navideñas, Para regalo), se usó como fotografía de **Velas decorativas** por ser la mejor opción visual disponible entre las 6 fotos recibidas. Si tenés una foto más específica para "Decorativas", basta con reemplazar ese archivo manteniendo el nombre `vela_minimalista.jpg`, o avisar para actualizar la referencia en `app.js`.
- Actualmente cada categoría muestra **una sola fotografía** (la recibida) como imagen de portada y dentro del modal de cada una de sus 3 tarjetas. Para que cada tarjeta tenga una fotografía distinta como pedía el brief original, hacen falta 2 fotos adicionales por categoría (12 en total). Cuando estén disponibles, se pueden agregar a `assets/inspiracion/` y conectar en el arreglo `INSPIRATION` de `app.js` sin tocar el resto del código.

## Ícono y pantalla de bienvenida

- El ícono oficial de la app es la pieza de arte provista por el cliente (vela violeta en vidrio, con emblema dorado, lavanda y eucalipto). Se usa tal cual, sin alterar diseño ni colores — solo se redimensionó (sin recortes ni deformación, ya que la fuente es perfectamente cuadrada) para generar: `favicon.ico` (16/32/48px), `favicon-16x16.png`, `favicon-32x32.png`, `apple-touch-icon.png` (180px), `icon-192.png`, `icon-512.png`, `welcome-icon.png` (640px, para la bienvenida) e `icon-mark.png` (96px, usado en los detalles de marca dentro de la app — encabezado de Inicio y Acerca de).
- Si en el futuro querés reemplazarlo por otra imagen, alcanza con generar de nuevo esos mismos ocho archivos manteniendo los nombres — no hace falta tocar HTML, CSS ni el manifest.
- La pantalla de bienvenida se elimina por completo del DOM (no solo se oculta) al tocar "Comenzar", así queda garantizado que no aparezca ningún espacio en blanco ni scroll extra después de la bienvenida.

## Notas técnicas

- HTML5, CSS3 y JavaScript moderno sin frameworks ni dependencias de build.
- Tipografías cargadas desde Google Fonts (Fraunces y Nunito); requieren conexión la primera vez, luego quedan cacheadas por el Service Worker.
- Todo el estado (bienvenida vista, checklists de Producción) persiste en `localStorage` del navegador, por dispositivo.
- Desde la pestaña **Más → Ajustes** se puede restablecer el progreso o eliminar todos los datos guardados.
