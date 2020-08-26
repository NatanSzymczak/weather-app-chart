import React, { useState } from 'react';
import CurrentWeather from '../CurrentWeather/CurrentWeather'

const Form = () => {
  const [city, setCity] = useState('');
  const [inputValue, setInputValue] = useState('');

  const current = e => {
    e.preventDefault();
    setCity(inputValue);
  }

  return (
    <>
      <input
        type="text"
        city={city}
        onChange={e => setInputValue(e.target.value)}
        placeholder="City name.."
      />
      <button onClick={ (e) => { current(e) }} >Current Weather Data</button>
      { city ? <CurrentWeather searchCity={city} /> : <></> }
    </>
  )
}

export default Form;