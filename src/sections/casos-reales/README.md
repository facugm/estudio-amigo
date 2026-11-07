# Casos reales

Carrusel de servicios + galería a pantalla completa. Pensado primero para celu.

- **Carrusel** (`embla-carousel-react`): una tarjeta por servicio. En celu se ve una y asoma la siguiente; desde 640 px se ven 2, y desde 1024 px, 3. Las flechas aparecen desde tablet; en celu se desliza.
- **Galería** (`yet-another-react-lightbox`): al tocar una tarjeta se abren todas las piezas de ese servicio. Muestra contador, título y descripción de cada pieza; se desliza para pasar y se arrastra hacia abajo para cerrar. Acepta imágenes y videos.

## Cómo cargar las piezas reales

1. Subir los archivos a `public/casos/` (imágenes livianas: JPG/WebP de ~1600 px de lado mayor como máximo).
2. Crear `trabajos.ts` con la misma forma que `trabajos.demo.ts`:

```ts
import type { GrupoDeServicio } from './types';

export const trabajos: readonly GrupoDeServicio[] = [
  {
    servicio: 'fotoproducto',
    titulo: 'Sesiones de producto',
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

3. Usarlo: `<CasosReales grupos={trabajos} ctaHref="https://wa.me/…" />`.

- Un servicio sin piezas no aparece en el carrusel.
- `portada` (opcional) elige qué pieza va en la tarjeta; por defecto, la primera.
- Si no se pasa `ctaHref`, la galería no muestra el botón "Quiero algo así".

## Probarlo

`npm run dev` y abrir `/casos-reales.html`.
