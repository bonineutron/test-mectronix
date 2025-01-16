import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import { StrictMode } from 'react';
import App from './App.tsx';
import './globals.scss';

createRoot(document.getElementById('root')!).render(
   <StrictMode>
      <BrowserRouter>
         <App />
      </BrowserRouter>
   </StrictMode>
);
