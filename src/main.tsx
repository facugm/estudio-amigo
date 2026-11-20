import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import { Proximamente, mostrarProximamente } from './sections/proximamente/Proximamente';
import './styles/fonts.css';
import './styles/base.css';

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      {mostrarProximamente(window.location.search) ? <Proximamente /> : <App />}
    </React.StrictMode>
  );
}
