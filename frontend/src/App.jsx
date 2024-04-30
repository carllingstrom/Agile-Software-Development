import React, { useState } from 'react';
import "./App.css";
import Navbar from './components/Navbar.jsx';
import Forms from './components/Forms.jsx';
import { useTranslation } from 'react-i18next';

const App = () => {

    return (
        <>
            <div className='header'>
                <Navbar/>
                
            </div>

            <div className='main-content'>
                <Forms/>
            </div>
        </>
    );
}

export default App;
