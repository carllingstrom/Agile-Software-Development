import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx'; // Corrected import path
import './index.css'; // Corrected import path
import About from './pages/About.jsx';
import { BrowserRouter, Routes, Route } from "react-router-dom";


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<App />} />
      <Route path='/about' element={<About />} />

    </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);
