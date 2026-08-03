# Velas Studio

Aplicación web progresiva (PWA) complementaria del ebook **"Guía de Velas Artesanales — Del Pasatiempo al Ingreso"**.

Incluye seguimiento del curso por pasos, una calculadora de precios, checklists de producción y venta, consejos, preguntas frecuentes y recomendaciones de seguridad. Toda la información se guarda en el dispositivo del usuario mediante `localStorage`; no hay backend ni base de datos.

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
    ├── icon-192.png
    ├── icon-512.png
    ├── icon-512-maskable.png
    ├── apple-touch-icon.png
    └── favicon-32.png
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

## Notas técnicas

- HTML5, CSS3 y JavaScript moderno sin frameworks ni dependencias de build.
- Tipografías cargadas desde Google Fonts (Fraunces y Nunito); requieren conexión la primera vez, luego quedan cacheadas por el Service Worker.
- Todo el estado (bienvenida vista, progreso del curso, checklists) persiste en `localStorage` del navegador, por dispositivo.
- Desde la pestaña **Más → Ajustes** se puede restablecer el progreso o eliminar todos los datos guardados.
