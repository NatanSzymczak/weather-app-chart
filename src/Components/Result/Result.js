import React from 'react';
import './Result.css'

const Result = props => {

  const {err, city, date, sunrise, sunset, temp, pressure, wind} = props.weather;

  let content = null;

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
      {err ? `Nie mamy w bazie ${city}` : content}
    </div>
  );
}

export default Result;