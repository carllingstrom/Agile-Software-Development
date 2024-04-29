import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx'; 
import './index.css'; 
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from './pages/Dashboard.jsx';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslation from './translations/en.json'; 
import svTranslation from './translations/sv.json'; 

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: enTranslation
      },
      sv: {
        translation: svTranslation 
      }
    },
    lng: 'en', // Enlgish is set as standard language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false 
    }
  });

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/dashboard' element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
