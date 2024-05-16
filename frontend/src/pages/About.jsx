import React from 'react';
import './About.css';
import logoImage from '../images/logo.png'; 
import Navbar from "../components/Navbar.jsx";
import { useTranslation } from 'react-i18next';

const About = () => {
  const { t } = useTranslation(); // Access the translation function

  return (
    <>
      <Navbar />
      <div className="about-container">
        <div className="about-section">
          <div className="about-text">
            <h2>{t('translation.about_us_title')}</h2>
            <p dangerouslySetInnerHTML={{ __html: t('translation.about_us_text') }}></p>
          </div>
          <div className="about-logo">
            <img src={logoImage} alt="Logo" className="logo-image" />
          </div>
        </div>

        <div className="background-image">
          <div className="header">
            <h1 className="main-title">{t('translation.un_goals_title')}</h1>
            <p className="subtext">{t('translation.un_goals_text')}</p>
          </div>
          <div className="content">
            <div className="green-box">
              <h2>{t('translation.affordable_clean_energy_title')}</h2>
              <p>{t('translation.affordable_clean_energy_text')}</p>
            </div>
            <div className="green-box">
              <h2>{t('translation.urgent_climate_action_title')}</h2>
              <p>{t('translation.urgent_climate_action_text')}</p>
            </div>
            <div className="green-box">
              <h2>{t('translation.sustainable_cities_title')}</h2>
              <p>{t('translation.sustainable_cities_text')}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
