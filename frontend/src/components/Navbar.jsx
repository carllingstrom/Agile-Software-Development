import React from 'react';
import {Link} from "react-router-dom";
import './Navbar.css';
import {useTranslation} from 'react-i18next';
import { useState } from 'react';
import swedishFlag from '../images/se.svg';
import englishFlag from '../images/en.svg';

const Navbar = () => {

  const { t, i18n } = useTranslation(); 
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language); 



  const toggleLanguage = () => {
      const newLanguage = currentLanguage === 'en' ? 'sv' : 'en'; // Toggle between 'en' and 'sv'
      setCurrentLanguage(newLanguage); // Update current language state
      i18n.changeLanguage(newLanguage); 
  };

  return (
   <nav className='navbar'>
        <h3 className='logo'> <Link to={"/"}>SolarSaver</Link></h3>
        <ul className='links'>
            <li> <Link to={"/"}>{t('translation.home')}</Link></li>
            <li> <Link to={"/about"}>{t('translation.about')}</Link></li>
            <div onClick={toggleLanguage} className="language-toggle">
                    {currentLanguage === 'en' ? <img className='flag-icon' src={swedishFlag} alt="Swedish Flag" /> : <img className='flag-icon' src={englishFlag} alt="English Flag" />}
            </div>
        </ul>
   </nav>
  )
}

export default Navbar