import React, { useState, useEffect } from 'react';
import { getCurrentWeather } from '../../Requests'
import './CurrentWeather.css'

const CurrentWeather = ({searchCity}) => {
  const [date, setDate] = useState('');
  const [sunrise, setSunrise] = useState('');
  const [sunset, setSunset] = useState('');
  const [temp, setTemp] = useState('');
  const [wind, setWind] = useState('');
  const [pressure, setPressure] = useState('');
  const [err, setErr] = useState(false);
  const city = searchCity;

  useEffect(() => {
    getCurrentWeather(city)
    .then(response => {
      if(response.ok) return response;
      throw Error("Wystąpił problem!");
    })
    .then(response => response.json())
    .then(data => {
      console.log(data)
      setErr(false);
      setDate(new Date().toLocaleString());
      setSunrise(data.sys.sunrise);
      setSunset(data.sys.sunset);
      setTemp(data.main.temp);
      setWind(data.wind.speed);
      setPressure(data.main.pressure)
    })
    .catch(err => {
      console.log(err);
      setErr(true);
    });


  }, [city]);

  let content = 'null';

  if(!err && city) {

    const sunriseTime = new Date(sunrise * 1000).toLocaleTimeString();
    const sunsetTime = new Date(sunset * 1000).toLocaleTimeString();


    content = (
      <table>
        <tbody>
          <tr>
            <td className="title">Temperatura </td>
            <td className="value">{temp} &#176;C</td>
          </tr>
          <tr>
            <td className="title">Wschód o </td>
            <td className="value">{sunriseTime}</td>
          </tr>
          <tr>
            <td className="title">Zachód o </td>
            <td className="value">{sunsetTime}</td>
          </tr>
          <tr>
            <td className="title">Siła wiatru </td>
            <td className="value">{wind} m/s</td>
          </tr>
          <tr>
            <td className="title">Ciśnienie </td>
            <td className="value">{pressure} hPa</td>
          </tr>
        </tbody>
      </table>
    )
  }


    return (
      <div className="result">
        <h3>{city} {date}</h3>
        { err ? `Nie mamy w bazie ${city}` : content }
      </div>
    )
}

export default CurrentWeather;
