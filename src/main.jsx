import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import '../src/index.css'
import App from './App';
import BackToTop from './components/BackToTop';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    <BackToTop/>
    </BrowserRouter>
  </React.StrictMode>
);
