import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto'; // Import Chart.js library

const Check = () => {
  const [inputLat, setInputLat] = useState("");
  const [inputLon, setInputLon] = useState("");
  const [inputAddress, setInputAddress] = useState("");
  const [inputInvestment, setInputInvestment] = useState("");
  const [inputArea, setInputArea] = useState("");
  const [inputCost, setInputCost] = useState("");
  const [inputUsage, setInputUsage] = useState("");
  const [acffData, setAcffData] = useState(null); // State to store ACCF data

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

  useEffect(() => {
    if (acffData) {
      renderChart(acffData.ACCF); // Render the ACCF graph using the provided data
    }
  }, [acffData]);

  const handleCalculateSavings = () => {
    axios.get('http://127.0.0.1:5000/submit', {
      params: {
        energy_consumption_per_year: parseInt(inputUsage),
        energy_cost_per_kWh: parseInt(inputCost),
        investment_cost: parseInt(inputInvestment),
        m2_solar_panels: parseInt(inputArea),
        lat: parseFloat(inputLat),
        lon: parseFloat(inputLon)
      },
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(response => {
      console.log(response.data);
      setAcffData(response.data); // Set the ACCF data received from the server
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
  };

  const renderChart = (acff) => {
    const years = Object.keys(acff).map(Number); // Extract years from the provided ACCF data
    const accfValues = Object.values(acff);

    const chartData = {
      labels: years,
      datasets: [{
        label: 'ACCF',
        data: accfValues,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }]
    };

    const ctx = document.getElementById('acffChart').getContext('2d');
    new Chart(ctx, {
      type: 'bar',
      data: chartData,
      options: {
        scales: {
          x: {
            title: {
              display: true,
              text: 'Year'
            }
          },
          y: {
            title: {
              display: true,
              text: 'ACCF'
            },
            beginAtZero: true
          }
        }
      }
    });
  };

  return (
    <div className='panel summary'>
      <h2>Summary</h2>
      <p>Adress: {inputAddress}</p>
      <p>Investment: {inputInvestment}</p>
      <p>Area: {inputArea}</p>
      <p>Cost: {inputCost}</p>
      <p>Usage: {inputUsage}</p>
      <button onClick={handleCalculateSavings}>Calculate my ACCF</button>
      <canvas id="acffChart"></canvas> {/* Chart will be rendered here */}
    </div>
  );
};

export default Check;
