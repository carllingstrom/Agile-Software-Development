import React from 'react';
import './Searchbox.css'; 
import { useState, useEffect } from 'react';
import {useTranslation} from 'react-i18next';

const Powercost = () => {
    const [usage, setUsage] = useState(0);
    const [cost, setCost] = useState(0);
    const { t } = useTranslation(); // Translation hook

    useEffect(() => {
      window.localStorage.setItem('input_cost', (cost));
  
    }, [cost])

    useEffect(() => {
      window.localStorage.setItem('input_usage', (usage));
  
    }, [usage])


    return (
        <div className='panel'>
          <div className='placeholder'>
          
          <p style={{ marginTop: '50px' }}>{t('translation.placeholder_usage')}</p>
          <div className='input-group'>

        <input
            type='text'
            className='searchbox'
            onChange={e => { setUsage(e.target.value) }}
        />
        </div>


        <p style={{ marginTop: '50px' }}>{t('translation.placeholder_cost')}</p>
        <div className='input-group'>

        <input
            type='text'
            className='searchbox'
            onChange={e => { setCost(e.target.value)}}
        />
        </div>

          </div>
        </div>
      );
}

export default Powercost