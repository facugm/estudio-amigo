# Información Faltante y Requerimientos de Producción para estudio amigo

Este documento detalla las definiciones comerciales, de contenido y de infraestructura pendientes de entrega por parte del equipo de **estudio amigo** para la puesta en producción del sitio definitivo.

---

## 1. Canales Oficiales de Contacto

En el prototipo actual, los canales de contacto están configurados como marcadores de posición (*placeholders*) accesibles para evitar enlaces rotos durante la navegación. Se requiere:

- **WhatsApp Comercial**:
  - Número de teléfono con código de país y de área (ej: `+54 9 264 ...`).
  - Mensaje predeterminado de bienvenida para el link `https://wa.me/...`.
- **Correo Electrónico Oficial**:
  - Dirección de correo de recepción de consultas (ej: `contacto@tuestudioamigo.com` o similar).
  - Configuración del proveedor de correo o webhook de destino para el formulario web.
- **Redes Sociales**:
  - Handle oficial de Instagram (ej: `@tuestudioamigo` o el correspondiente).
  - Página de empresa en LinkedIn (URL pública).

---

## 2. Material Audiovisual y Casos de Estudio

Los proyectos actuales en el catálogo cuentan con fotografía stock curada de alta resolución para validar las composiciones visuales:

- **Fotografía de Proyectos Propios de estudio amigo**:
  - Fotografías de alta resolución (mínimo 1600px de ancho) en formatos modernos (WebP o JPG optimizado) de trabajos de:
    - Branding y packaging.
    - Piezas de fotoproducto.
    - Merchandising y señalética instalada.
  - Ratios recomendados: `16:10` y `4:3`.
- **Casos de Estudio Detallados (`caseUrl`)**:
  - Enlaces a publicaciones en Behance, Notion, Figma o páginas de detalle para cada proyecto que cuente con documentación ampliada.
  - Confirmación de si estudio amigo desea páginas de caso individuales dentro del sitio web o enlaces a plataformas externas en esta primera etapa.

---

## 3. Alcance Específico de Servicios y Metodología Comercial

- **Definición de Entregables por Servicio**:
  - Listado formal de entregables típicos para cada uno de los 7 servicios (por ejemplo, manual de marca, cantidad de publicaciones mensuales en redes, formatos de señalética, etc.).
- **Plazos Promedio y Metodología**:
  - Tiempos promedio de ejecución por servicio para transparentar en la sección "Cómo trabajamos" o en propuestas comerciales adjuntas.

---

## 4. Dominio, Hosting e Infraestructura

- **Dominio Web**:
  - Registro del dominio definitivo (ej. `tuestudioamigo.com`, `.com.ar`, `.ar`).
  - Acceso a DNS para configuración de registros A/CNAME.
- **Hosting de Producción**:
  - Elección de plataforma de despliegue recomendada (Vercel, Netlify, Cloudflare Pages o servidor propio).
- **Herramientas de Analítica & Privacidad**:
  - Código de Google Analytics 4 (GA4) o plataforma alternativa (Plausible, Umami).
  - Píxel de Meta / LinkedIn Insight Tag si se realizan campañas de pauta digital para captación de leads.
  - Texto legal de Política de Privacidad y Términos y Condiciones.
