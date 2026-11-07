# estudio amigo · web

Sitio de **estudio amigo**, estudio de comunicación integral de Rosario.

Es una **one page pensada primero para celu**, con scroll corto y un solo objetivo: que la persona nos escriba por **WhatsApp**.

---

## En qué estamos

| Qué | Estado |
|---|---|
| Diseño | En Figma: [Web Estudio Amigo — One page](https://www.figma.com/design/9mLd3D5WGZvN581I2hK1SD). La base es el frame **"Jose — One page"** (desktop); la versión celu se arma a partir de esa. |
| **Portada** | ✅ Hecha en `src/sections/portada/`. |
| **Casos reales** | ✅ Hecha en `src/sections/casos-reales/` (carrusel de servicios + galería a pantalla completa). Usa piezas provisorias hasta cargar las reales. |
| Logos de clientes, Qué hacemos, Quiénes somos, Cierre | Por hacer, siguiendo el diseño de Figma. |
| WhatsApp | Falta cargar el número en `src/content/contacto.ts`. Mientras tanto, los botones llevan a `#contacto`. |

---

## Qué tiene que lograr el sitio

- **Para quién:** pymes con estructura para contratar un estudio, de cualquier rubro excepto indumentaria. Lo mira alguien con cargo gerencial o de la familia dueña, que no quiere vueltas.
- **Dónde:** primero celu, después desktop.
- **Para qué:** que nos contacten.
- **Cuánto tiempo:** poco, derecho al hueso. El recorrido es: entra → le gusta la imagen → le gustan los trabajos → "quiero lo mismo" → escribe.
- **A dónde lleva:** directo al WhatsApp del estudio.
- **Cómo se tiene que sentir:** gente joven, profesional, cercana, a la par, creativa. Un amigo.

## Orden de la página

1. **Hero:** "somos el estudio amigo de tu marca" y botón para escribir.
2. **Logos de clientes** en carrusel.
3. **Qué hacemos:** los 7 servicios, más una tarjeta para quien no sabe por dónde arrancar.
4. **Casos reales:** trabajos agrupados por servicio, no por cliente.
5. **Quiénes somos:** el estudio y el equipo.
6. **Cierre:** botón a WhatsApp.

Además hay un menú hamburguesa que aparece después del hero y un botón flotante de WhatsApp.

## Los 7 servicios

Están en `src/content/services.ts`:

1. Branding y rebranding
2. Pauta digital
3. Papelería, cartelería, señalética y merchandising
4. Gestión de redes sociales
5. Creación de contenido para redes sociales
6. Fotoproducto
7. Sitios web

---

## Casos reales

Una tarjeta por servicio. En celu se ve una y asoma la siguiente; en tablet se ven 2 y en desktop, 3. Al tocar una tarjeta se abren todas las piezas de ese servicio a pantalla completa, cada una con su descripción. También acepta videos.

- Carrusel: [Embla Carousel](https://www.embla-carousel.com/)
- Galería: [Yet Another React Lightbox](https://yet-another-react-lightbox.com/)

Cómo cargar las piezas reales: [`src/sections/casos-reales/README.md`](src/sections/casos-reales/README.md).

Para verla: `npm run dev`; está debajo de la portada.

---

## Reglas de marca

Hay tests que las controlan, así que si algo no las respeta, el test falla.

- **Paleta:** navy `#234060`, lima `#c8f264`, magenta `#c61e97`, gris `#dcdcdc` y blanco `#ffffff`. Sin degradados ni colores fuera de paleta (`src/brand/compliance.test.ts`).
- **Combinaciones de texto permitidas:** navy sobre blanco, gris o lima; blanco sobre navy o magenta; magenta sobre blanco. Nada de magenta sobre navy ni lima sobre blanco.
- **Tipografía:** Museo Sans, cargada desde los archivos del propio sitio.
- **Tamaño mínimo de texto:** 13 px (`0.8125rem`).
- **Botones y links:** al menos 44 px de alto, para que se puedan tocar bien con el dedo.
- **Sin estilos en línea** (`style={{ }}`) en los componentes.
- **Espaciado vertical** de las secciones con el token `--section-y`.

Los archivos de marca (logo, el "amigo" y la paleta) están en `docs/brand/`.

---

## Stack

- React 18 + TypeScript (modo estricto)
- Vite 5
- Vitest + Testing Library
- CSS propio con variables, sin librerías de estilos

## Comandos

```bash
npm install        # instalar dependencias
npm run dev        # servidor local
npx vitest run     # tests
npx tsc --noEmit   # chequeo de tipos
npm run build      # build de producción
```

## Carpetas

```
src/
  sections/      una carpeta por sección de la página (portada, casos-reales…)
  content/       servicios y datos de contacto (WhatsApp)
  brand/         paleta, logo, isotipo y tests de marca
  styles/        estilos base y tipografía
docs/
  brand/         logo, "amigo" y paleta en SVG
```

## Cómo trabajamos

- Los cambios van directo a `main`. Cada push publica el sitio en GitHub Pages (`.github/workflows/deploy.yml`).
- Antes de subir: tests, tipos y build en verde.
