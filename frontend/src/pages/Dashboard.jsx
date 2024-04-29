import axios from 'axios';
import { useState, useEffect } from 'react';
import './Dashboard.css'
import Chart from 'chart.js/auto';

const Dashboard = () => {
    const [chartData, setChartData] = useState(null);

    const axiosInstance = axios.create({
        baseURL: "http://localhost:8000",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json", 
        },
      });

  
  useEffect(() => {
    
      const localStorageCoordinates = JSON.parse(window.localStorage.getItem('input_cords'));
      axiosInstance.get('http://127.0.0.1:5000/submit', {
        params: {
          energy_consumption_per_year: parseInt(window.localStorage.getItem('input_usage')),
          energy_cost_per_kWh: parseInt(window.localStorage.getItem('input_cost')),
          investment_cost: parseInt(window.localStorage.getItem('input_investment')),
          m2_solar_panels: parseInt(window.localStorage.getItem('input_area')),
          lat: parseFloat(localStorageCoordinates.lat),
          lon: parseFloat(localStorageCoordinates.lng)
        },
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => {
        console.log(response.data)
        setChartData(response.data);

      })
      .catch(error => { 
        console.error('Error fetching data:', error);
      });
   
  }, []);

useEffect(() => {
    if (chartData) {
      renderChart(chartData.ACCF);
    }
  }, [chartData]);

  const renderChart = (acff) => {
    const years = Object.keys(acff).map(Number);
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

    // Destroy existing chart instance if it exists
    if (window.acffChartInstance) {
      window.acffChartInstance.destroy();
    }

    // Create new chart instance
    window.acffChartInstance = new Chart(ctx, {
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
    <div>
        <canvas id="acffChart"></canvas> {}
    </div>
  )
}

export default Dashboard