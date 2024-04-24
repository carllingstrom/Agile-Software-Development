import React, { useState, useRef, useEffect } from 'react';
import { Autocomplete, LoadScript } from '@react-google-maps/api';
import './Searchbox.css';

const Searchbox = () => {
  const [address, setAddress] = useState("");
  const [coordinates, setCoordinates] = useState({ lat: null, lng: null });
  const autocomplete = useRef(null);

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
 



  return (
    <LoadScript
      googleMapsApiKey="AIzaSyAPlXwywqWTdCHSENLk0JFgf3MH5Wtc6rU"
      libraries={['places']}
    >
      <div className='panel'>
        <div className='placeholder'>
          <p>Skriv din adress här</p>
          <Autocomplete
            onLoad={(auto) => { autocomplete.current = auto; }}
            onPlaceChanged={handlePlaceChanged}
          >
            <input
              type='text'
              placeholder='Adress...'
              className='searchbox'
            />
          </Autocomplete>
        </div>
      </div>
    </LoadScript>
  );
};

export default Searchbox;




