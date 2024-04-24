import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx'; // Corrected import path
import './index.css'; // Corrected import path
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from './pages/Dashboard.jsx';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<App />} />
      <Route path='/dashboard' element={<Dashboard />} />
    </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);
