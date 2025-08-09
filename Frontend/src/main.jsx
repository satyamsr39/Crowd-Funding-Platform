// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )


import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import Plans from './pages/Plans';
import Checkout from './pages/Checkout';
import Success from './pages/Success';
import Admin from './pages/Admin';
import './index.css';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Plans />} />
        <Route path="checkout/:planId" element={<Checkout />} />
        <Route path="success" element={<Success />} />
        <Route path="admin" element={<Admin />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
