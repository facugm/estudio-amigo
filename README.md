# estudio amigo · web

Sitio de **estudio amigo**, estudio de comunicación integral de Rosario.

Es una **one page pensada primero para celu**, con scroll corto y un solo objetivo: que la persona nos escriba por **WhatsApp**.

---

## En qué estamos

| Qué | Estado |
|---|---|
| Diseño | En Figma: [Web Estudio Amigo — One page](https://www.figma.com/design/9mLd3D5WGZvN581I2hK1SD). La base es el frame **"Jose — One page"** (desktop); la versión celu se arma a partir de esa. |
| Página completa | ✅ Aplicada la versión "Jose — One page": portada, barra, clientes, Qué hacemos, Quiénes somos y cierre (`src/sections/`). |
| Contenido provisorio | Piezas de los trabajos (`public/casos-demo/`), logos de clientes (se muestran los nombres) y fotos del equipo (se muestra el amigo). |
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

1. **Portada:** "somos el estudio amigo de tu marca" y botón Escribinos.
2. **Barra** fija con Qué hacemos, Clientes, Nosotros y Escribinos (hamburguesa en celu).
3. **Clientes:** logos en fila (carrusel automático en celu).
4. **Qué hacemos:** "Comunicación integral para tu marca", una tarjeta por servicio con sus trabajos; tocar la imagen abre la galería.
5. **Quiénes somos:** el estudio y el equipo.
6. **Cierre:** botón a WhatsApp y pie con Instagram.

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

## Qué hacemos

Celu: carrusel de tarjetas. Desktop: grilla de 3 × 2. Al tocar la imagen se abren todas las piezas del servicio a pantalla completa, cada una con su descripción (también acepta videos).

- Carrusel: [Embla Carousel](https://www.embla-carousel.com/)
- Galería: [Yet Another React Lightbox](https://yet-another-react-lightbox.com/)

Cómo cargar las piezas reales: [`src/sections/que-hacemos/README.md`](src/sections/que-hacemos/README.md).

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
  sections/      una carpeta por sección: portada, barra, clientes, que-hacemos, nosotros, cierre
  content/       contacto (WhatsApp), clientes, equipo, Instagram y servicios
  brand/         paleta, logo, isotipo y tests de marca
  styles/        estilos base y tipografía
docs/
  brand/         logo, "amigo" y paleta en SVG
```

## Cómo trabajamos

- Los cambios van directo a `main`. Cada push publica el sitio en GitHub Pages (`.github/workflows/deploy.yml`).
- Antes de subir: tests, tipos y build en verde.
