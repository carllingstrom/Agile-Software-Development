import React from 'react';
import './Searchbox.css'; 
import { useState, useEffect } from 'react';

const Powercost = () => {
    const [usage, setUsage] = useState(0);
    const [cost, setCost] = useState(0);

    useEffect(() => {
      window.localStorage.setItem('input_cost', (cost));
  
    }, [cost])

    useEffect(() => {
      window.localStorage.setItem('input_usage', (usage));
  
    }, [usage])


    return (
        <div className='panel'>
          <div className='placeholder'>
          
          <p style={{ marginTop: '50px' }}>Vad är din nuvarande årsförbrukning av el?</p>
          <div className='input-group'>

        <input
            type='text'
            className='searchbox'
            onChange={e => { setUsage(e.target.value) }}
        />
        </div>


        <p style={{ marginTop: '50px' }}>Vad är ditt genomsnittliga elpirs?</p>
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