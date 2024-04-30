import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto';
import './Check.css';
import { Link } from 'react-router-dom';
import {useTranslation} from 'react-i18next';

const Check = () => {
  const [inputLat, setInputLat] = useState("");
  const [inputLon, setInputLon] = useState("");
  const [inputAddress, setInputAddress] = useState("");
  const [inputInvestment, setInputInvestment] = useState("");
  const [inputArea, setInputArea] = useState("");
  const [inputCost, setInputCost] = useState("");
  const [inputUsage, setInputUsage] = useState("");
  const [acffData, setAcffData] = useState(null);
  const { t } = useTranslation();

  useEffect(() => {
    const localStorageCoordinates = JSON.parse(window.localStorage.getItem('input_cords'));

    setInputLat(localStorageCoordinates.lat);
    setInputLon(localStorageCoordinates.lng);
    setInputAddress(window.localStorage.getItem('input_address'));
    setInputInvestment(window.localStorage.getItem('input_investment'));
    setInputArea(window.localStorage.getItem('input_area'));
    setInputCost(window.localStorage.getItem('input_cost'));
    setInputUsage(window.localStorage.getItem('input_usage'));
  }, []);

  return (
    <div className='panel summary'>
      <h2>{t('translation.summary')}</h2>
      <p>{t('translation.address')}: {inputAddress}</p>
      <p>{t('translation.investment')}: {inputInvestment}</p>
      <p>{t('translation.area')}: {inputArea}</p>
      <p>{t('translation.cost')}: {inputCost}</p>
      <p>{t('translation.usage')}: {inputUsage}</p>
      <Link to='/dashboard'>
        <button>{t('translation.calculate_button')}</button>
      </Link>
    </div>
  );
};

export default Check;