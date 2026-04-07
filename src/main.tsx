import { Buffer } from 'buffer';
import { HelmetProvider } from 'react-helmet-async';
// @ts-expect-error - Necessário para polyfill do gray-matter no navegador
window.Buffer = Buffer as unknown as typeof Buffer;

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </StrictMode>,
)