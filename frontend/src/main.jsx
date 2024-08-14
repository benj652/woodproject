import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Router from './Router';
import { UserProvider } from './context/UserContext';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserProvider>
      <Router />
    </UserProvider>
  </StrictMode>,
);
