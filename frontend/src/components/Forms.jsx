import React from 'react';
import Multistep from 'react-multistep';
import Searchbox from './Searchbox';
import Roofarea from './Roofarea';
import Powercost from './Powercost';
import { useState } from 'react';
import Check from './Check';


const Forms = () => { //Creating the forms title bar that shows user the steps
  const steps = [
    { title: 'Insert Address', component: <Searchbox /> },
    { title: 'Insert Roofarea', component: <Roofarea /> },
    { title: 'Insert Powercost', component: <Powercost /> },
    { title: 'Check', component: <Check /> }
  ];

  return (
    <div>
      <Multistep
        activeStep={0}
        steps={steps}
        
        nextButton={{style: {
          marginLeft: '10px',
          marginTop: '20px',          
          backgroundColor: '#007bff', 
          color: '#fff', 
          border: 'none', 
          borderRadius: '5px', 
          padding: '10px 20px', 
          fontSize: '16px', 
          fontFamily: 'Roboto, sans-serif', 
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', 
          cursor: 'pointer', 
          transition: 'background-color 0.3s, color 0.3s',
        }}}
        prevButton={{style: {
          marginLeft: '10px',
          backgroundColor: '#007bff', 
          color: '#fff', 
          border: 'none', 
          borderRadius: '5px',
          padding: '10px 20px', 
          fontSize: '16px', 
          fontFamily: 'Arial, sans-serif',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          cursor: 'pointer',
          transition: 'background-color 0.3s, color 0.3s', 
        
        }}}
      />
    </div>
  );
};

export default Forms;
