import React, { useState } from 'react';
import CurrentWeather from '../CurrentWeather/CurrentWeather';
import FiveDeysWeather from '../FiveDeysWeather/FiveDeysWeather';
import './Form.css';

const Form = () => {
  const [city, setCity] = useState('');
  const [inputValue, setInputValue] = useState('');

  const current = e => {
    e.preventDefault();
    setCity(inputValue);
  }

  return (
    <div className="cityNameForm">
      <input
        type="text"
        city={city}
        onChange={e => setInputValue(e.target.value)}
        placeholder="Check weather:"
      />
      <button onClick={ (e) => { current(e) }} >check</button>
      { city && <CurrentWeather  searchCity={city} /> }
      { city && <FiveDeysWeather searchCity={city} /> }
    </div>
  )
}

export default Form;