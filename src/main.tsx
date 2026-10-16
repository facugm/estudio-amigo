import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import './styles/fonts.css';
import './styles/base.css';
import './styles/shell.css';
import './styles/ui.css';

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
