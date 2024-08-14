import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Router from './Router';
import { FileProvider } from './context/FileContext';
import { UserProvider } from './context/UserContext';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserProvider>
      <FileProvider>
        <Router />
      </FileProvider>
    </UserProvider>
  </StrictMode>,
);
