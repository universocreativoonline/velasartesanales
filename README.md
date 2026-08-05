# Velas Studio

Aplicación web progresiva (PWA) complementaria del ebook **"Guía de Velas Artesanales — Del Pasatiempo al Ingreso"**.

Es una caja de herramientas, no un resumen del curso: calculadora de precios, checklists de producción y venta, una galería de inspiración ilustrada, consejos, preguntas frecuentes, recomendaciones de seguridad, información de la app y contacto. Toda la información se guarda en el dispositivo del usuario mediante `localStorage`; no hay backend ni base de datos.

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
└── icons/
    ├── favicon.ico
    ├── favicon-16x16.png
    ├── favicon-32x32.png
    ├── apple-touch-icon.png
    ├── icon-192.png
    ├── icon-512.png
    ├── icon-mark.png
    └── welcome-icon.png
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
- La galería de **Inspiración** usa ilustraciones vectoriales propias (SVG generado en `app.js`), no fotografías externas, así que funciona sin conexión y sin restricciones de licencia.

## Ícono y pantalla de bienvenida

- El ícono oficial de la app es la pieza de arte provista por el cliente (vela violeta en vidrio, con emblema dorado, lavanda y eucalipto). Se usa tal cual, sin alterar diseño ni colores — solo se redimensionó (sin recortes ni deformación, ya que la fuente es perfectamente cuadrada) para generar: `favicon.ico` (16/32/48px), `favicon-16x16.png`, `favicon-32x32.png`, `apple-touch-icon.png` (180px), `icon-192.png`, `icon-512.png`, `welcome-icon.png` (640px, para la bienvenida) e `icon-mark.png` (96px, usado en los detalles de marca dentro de la app — encabezado de Inicio y Acerca de).
- Si en el futuro querés reemplazarlo por otra imagen, alcanza con generar de nuevo esos mismos ocho archivos manteniendo los nombres — no hace falta tocar HTML, CSS ni el manifest.
- La pantalla de bienvenida se elimina por completo del DOM (no solo se oculta) al tocar "Comenzar", así queda garantizado que no aparezca ningún espacio en blanco ni scroll extra después de la bienvenida.

## Notas técnicas

- HTML5, CSS3 y JavaScript moderno sin frameworks ni dependencias de build.
- Tipografías cargadas desde Google Fonts (Fraunces y Nunito); requieren conexión la primera vez, luego quedan cacheadas por el Service Worker.
- Todo el estado (bienvenida vista, progreso del curso, checklists) persiste en `localStorage` del navegador, por dispositivo.
- Desde la pestaña **Más → Ajustes** se puede restablecer el progreso o eliminar todos los datos guardados.
