import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto';
import './Check.css';
import { Link } from 'react-router-dom';

const Check = () => {
  const [inputLat, setInputLat] = useState("");
  const [inputLon, setInputLon] = useState("");
  const [inputAddress, setInputAddress] = useState("");
  const [inputInvestment, setInputInvestment] = useState("");
  const [inputArea, setInputArea] = useState("");
  const [inputCost, setInputCost] = useState("");
  const [inputUsage, setInputUsage] = useState("");
  const [acffData, setAcffData] = useState(null);

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
      <h2>Summary</h2>
      <p>Address: {inputAddress}</p>
      <p>Investment: {inputInvestment}</p>
      <p>Area: {inputArea}</p>
      <p>Cost: {inputCost}</p>
      <p>Usage: {inputUsage}</p>
      <Link to='/dashboard'>
        <button>Calculate my ACCF</button>
      </Link>
    </div>
  );
};

export default Check;