import React from 'react'
import axios from 'axios';
import {  useEffect } from 'react';
import './Dashboard.css'



const Dashboard = () => {

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


  return (
    <div>
        <h1>Chart here</h1>
    </div>
  )
}

export default Dashboard