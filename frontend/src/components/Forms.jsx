import React from 'react';
import Multistep from 'react-multistep';
import Searchbox from './Searchbox';
import Roofarea from './Roofarea';
import Powercost from './Powercost';
import { useState } from 'react';
import Check from './Check';
import { useTranslation } from 'react-i18next';

const Forms = () => {
  const { t } = useTranslation();

  const steps = [
    { title: t('translation.insert_address'), component: <Searchbox /> },
    { title: t('translation.insert_roofarea'), component: <Roofarea /> },
    { title: t('translation.insert_powercost'), component: <Powercost /> },
    { title: t('translation.check'), component: <Check /> }
  ];

  return (
    <div>
      <Multistep
        activeStep={0}
        steps={steps}
        nextButton={{
          title: t('translation.next'),
          style: {
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
          }
        }}
        prevButton={{
          title: t('translation.previous'),
          style: {
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
          }
        }}
      />
    </div>
  );
};

export default Forms;
