# APP-MONITOREO-

Centinela: app de consulta para el turno de monitoreo (protocolos, emergencias, seguros, horarios, zonas de riesgo y bitácora) para teléfonos Android, iPhone y tabletas.

## App (`app/`)

App web instalable (PWA), sin paso de compilación: HTML, CSS y JavaScript.

- `index.html`, `styles.css`, `app.js`: interfaz y lógica.
- `data.js`: **datos de ejemplo** (protocolos, contactos, pólizas, horarios, zonas, bitácora). La app no administra unidades ni incidentes.
- `manifest.webmanifest`, `sw.js`, `icons/`: instalación y funcionamiento sin red.

Secciones: Inicio, Protocolos, Emergencias, Seguros, Horarios de circulación, Zonas de riesgo, Bitácora y relevo, Reportes, Configuración.

Probar en local:

```bash
cd app && python3 -m http.server 8000
# abrir http://localhost:8000
```

## Publicar e instalar

1. En GitHub: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
2. Fusionar esta rama en `main`. El flujo `.github/workflows/pages.yml` publica la carpeta `app/`.
3. La app queda en `https://jhonygarpz-alt.github.io/APP-MONITOREO-/`.
4. En el teléfono:
   - **Android (Chrome):** abrir la liga → menú ⋮ → **Instalar app**.
   - **iPhone (Safari):** abrir la liga → Compartir → **Agregar a inicio**.

## Estado

Modo demostración: no está conectada a GPS, base de datos ni usuarios reales. Las notas, cierres y bitácora se guardan solo en el teléfono.
Las llamadas abren el marcador del teléfono después de confirmar; los reportes se comparten con la opción de compartir del teléfono.

## Diseño

- `diseno/v1-movil.html`: primera entrega del diseño (referencia visual).
