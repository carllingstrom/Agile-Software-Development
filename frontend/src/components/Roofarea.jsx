import React from 'react';
import {useState, useEffect} from "react";
import './Searchbox.css'; 
import {useTranslation} from 'react-i18next';


const Roofarea = () => {
    const [area, setArea] = useState(0);

    const { t } = useTranslation();

    const [investment, setInvestment] = useState(0);


    useEffect(() => {
      window.localStorage.setItem('input_investment', (investment));
  
    }, [investment])

    useEffect(() => {
      window.localStorage.setItem('input_area', (area));
  
    }, [area])


  return (
    <div className='panel'>
          <div className='placeholder'>
          
          <p style={{ marginTop: '50px' }}>{t('translation.expected_investment')}</p>
          <div className='input-group2'>

        <input
            type='text'
            className='searchbox'
            onChange={e => { setInvestment(e.target.value) }}
        />
        </div>


        <p style={{ marginTop: '50px' }}>{t('translation.expected_area')}</p>
        <div className='input-group2'>

        <input
            type='text'
            className='searchbox'
            onChange={e => { setArea(e.target.value)}}
        />
        </div>

          </div>
        </div>
  )
}

export default Roofarea