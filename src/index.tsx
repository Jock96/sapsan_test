import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { App, ROOT_ID } from './app';

const root = ReactDOM.createRoot(
  document.getElementById(ROOT_ID) as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
