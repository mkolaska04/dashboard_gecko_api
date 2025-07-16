import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import { CoinProvider } from './context/CoinContext';

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <BrowserRouter>
      <CoinProvider>
        <App />
        </CoinProvider>
      </BrowserRouter>
    </React.StrictMode>
  );
} else {
  throw new Error("Root element with id 'root' not found");
}