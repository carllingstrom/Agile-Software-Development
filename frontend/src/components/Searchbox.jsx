import React, { useState, useRef, useEffect } from 'react';
import { Autocomplete, LoadScript } from '@react-google-maps/api';
import './Searchbox.css';
import {useTranslation} from 'react-i18next';

const Searchbox = () => {
  const [address, setAddress] = useState("");
  const [coordinates, setCoordinates] = useState({ lat: null, lng: null });
  const autocomplete = useRef(null);

  const { t } = useTranslation(); // We add this Hook to access the translation functions


  const [loading, setLoading] = useState(true);

  const handlePlaceChanged = () => {
    if (autocomplete.current !== null) {
      const place = autocomplete.current.getPlace();

      setAddress(place.formatted_address);

      if (place.geometry && place.geometry.location) {
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();
        
        setCoordinates({ lat, lng });
      }
    }
  };


  useEffect(() => {
    window.localStorage.setItem('input_cords', JSON.stringify(coordinates));

  }, [coordinates])


  useEffect(() => {
    window.localStorage.setItem('input_address', address);

  }, [address])
 



  return ( //
    <LoadScript
      googleMapsApiKey="AIzaSyAPlXwywqWTdCHSENLk0JFgf3MH5Wtc6rU"
      libraries={['places']}
    >
      <div className='panel'>
        <div className='placeholder'>
        {/* Use translation function for text */}
        <p>{t('translation.insert_address')}</p>
          <Autocomplete
            onLoad={(auto) => { autocomplete.current = auto; }}
            onPlaceChanged={handlePlaceChanged}
          >
            <input
              type='text'
              placeholder={t('translation.address')} 
              className='searchbox'
            />
          </Autocomplete>
        </div>
      </div>
    </LoadScript>
  );
};

export default Searchbox;




