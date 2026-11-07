import React from 'react';
import ReactDOM from 'react-dom/client';
import '../../styles/fonts.css';
import '../../styles/base.css';
import { CasosReales } from './CasosReales';
import { trabajosDemo } from './trabajos.demo';

// Página de prueba aislada: /casos-reales.html
const root = document.getElementById('root');
if (root) {
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <CasosReales grupos={trabajosDemo} ctaHref="#contacto" />
    </React.StrictMode>
  );
}
