import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { getCurrentWeather } from '../../Requests'
import { useParams, Redirect } from 'react-router';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTemperatureLow, faSun, faWind, faCompress, faChartBar, faChevronCircleLeft,
  faAngleDoubleUp, faAngleDoubleDown } from "@fortawesome/free-solid-svg-icons/";
import './CurrentWeather.css'

const CurrentWeather = () => {
  const [date,     setDate]     = useState('');
  const [sunrise,  setSunrise]  = useState('');
  const [sunset,   setSunset]   = useState('');
  const [temp,     setTemp]     = useState('');
  const [wind,     setWind]     = useState('');
  const [pressure, setPressure] = useState('');
  const [country,  setCountry]  = useState('');
  const [err,      setErr]      = useState(false);

  const { city } = useParams();

  useEffect(() => {
    getCurrentWeather(city)
    .then(response => {
      if(response.ok) return response;
      throw Error("Wystąpił problem!");
    })
    .then(response => response.json())
    .then(data => {
      setErr(false);
      setDate(data.dt);
      setSunrise(data.sys.sunrise);
      setSunset(data.sys.sunset);
      setTemp(data.main.temp);
      setWind(data.wind.speed);
      setPressure(data.main.pressure);
      setCountry(data.sys.country);
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

    const tempLevel = () => {
      if (temp > 25) return 'high';
      else if (temp < 15) return 'low';
      else return 'medium';
    }

    const windSpeed = () => {
      if (wind > 30) return 'high';
      else if (wind < 10) return 'low';
      else return 'medium';
    }

    const pressureLevel = () => {
      if (pressure > 1020) return 'high';
      else if (pressure < 1000) return 'low';
      else return 'medium';
    }

    content = (
      <table>
        <tbody>
          <tr className={`${tempLevel()}`}>
            <td className="title">
              <FontAwesomeIcon icon={faTemperatureLow} />
            </td>
            <td className="value">{temp} &#176;C</td>
          </tr>
          <tr className={`${windSpeed()}`}>
            <td className="title">
              <FontAwesomeIcon icon={faWind} />
            </td>
            <td className="value">{wind} m/s</td>
          </tr>
          <tr className={`${pressureLevel()}`}>
            <td className="title">
              <FontAwesomeIcon icon={faCompress} />
            </td>
            <td className="value">{pressure} hPa</td>
          </tr>
          <tr className="textColor">
            <td className="title">
              <FontAwesomeIcon icon={faSun} /> <FontAwesomeIcon icon={faAngleDoubleUp} />
            </td>
            <td className="value">{sunriseTime}</td>
          </tr>
          <tr className="textColor">
            <td className="title">
              <FontAwesomeIcon icon={faSun} /> <FontAwesomeIcon icon={faAngleDoubleDown} />
            </td>
            <td className="value">{sunsetTime}</td>
          </tr>
        </tbody>
      </table>
    )
  }

    return (
      <div className="result">
        <Link to={`/chart/${city}`}>
          <div className="chartBtn">
            <FontAwesomeIcon icon={faChartBar} />
          </div>
        </Link>
        <Link to="/" >
          <div className="backBtn">
            <FontAwesomeIcon icon={faChevronCircleLeft} />
          </div>
        </Link>
        <p className="cityAndCountry">{city} [{country}]</p>
        <p className="time">{ new Date(date*1000).toLocaleTimeString() }</p>
        { err ? <Redirect to={`/${city}`} /> : content }
      </div>
    )
}

export default CurrentWeather;
