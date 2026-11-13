# Qué hacemos

Una tarjeta por servicio con sus trabajos + galería a pantalla completa. Pensado primero para celu.

- **Tarjetas** (`embla-carousel-react`): en celu se ven como carrusel (una y asoma la siguiente); desde 640 px se ven 2; desde 1024 px el carrusel se apaga y quedan en grilla de 3 × 2, como en Figma.
- **Galería** (`yet-another-react-lightbox`): al tocar una tarjeta se abren todas las piezas de ese servicio. Muestra contador, título y descripción de cada pieza; se desliza para pasar y se arrastra hacia abajo para cerrar. Acepta imágenes y videos.

## Cómo cargar las piezas reales

1. Subir los archivos a `public/casos/` (imágenes livianas: JPG/WebP de ~1600 px de lado mayor como máximo).
2. Reemplazar las `piezas` de cada servicio en `trabajos.ts`:

```ts
import type { GrupoDeServicio } from './types';

export const trabajos: readonly GrupoDeServicio[] = [
  {
    servicio: 'fotoproducto',
    etiqueta: 'Fotoproducto',
    titulo: 'Sesión de producto',
    descripcion: 'Fotos listas para usar en redes, web y catálogo.',
    piezas: [
      {
        id: 'foto-catalogo-1',
        titulo: 'Catálogo de temporada',
        descripcion: 'Fotos sobre fondo neutro para web y redes.',
        media: { tipo: 'imagen', src: './casos/foto-catalogo-1.webp', alt: '…', ancho: 1600, alto: 2000 }
      },
      {
        id: 'reel-lanzamiento',
        titulo: 'Reel de lanzamiento',
        descripcion: 'Video vertical para Instagram.',
        media: { tipo: 'video', src: './casos/reel.mp4', mime: 'video/mp4', poster: './casos/reel.jpg', alt: '…', ancho: 1080, alto: 1920 }
      }
    ]
  }
];
```

3. `App.tsx` ya usa `trabajos`: no hay que tocar nada más.

- Un servicio sin piezas muestra la tarjeta igual, sin galería.
- `portada` (opcional) elige qué pieza va en la tarjeta; por defecto, la primera.
- "Quiero algo así" va al WhatsApp de `src/content/contacto.ts`. Dentro de la galería, el botón aparece recién cuando esté cargado el número.

## Probarlo

`npm run dev`: es la sección que sigue a los logos de clientes.
