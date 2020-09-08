import React, { useEffect, useState } from 'react';
import { getWeatherForFiveDays } from  '../../Requests';
import { Link } from "react-router-dom";
import { Line } from 'react-chartjs-2';
import { useParams } from 'react-router';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronCircleLeft, faWind, faCompress } from "@fortawesome/free-solid-svg-icons/";
import './FiveDaysTemperature.css';

function FiveDaysTemperature () {
  const { city } = useParams();
  const [ history, setHistory] = useState([]);

  useEffect(() => {
    getWeatherForFiveDays(city)
    .then(response => {
      if(response.ok) return response;
      throw Error("Wystąpił problem Szefie!");
    })
    .then(response => response.json())
    .then(data => {
      setHistory(data.list)
    })
    .catch(err => {
      console.log(err);
    });
  }, [city]);

  const title = (e) => {
    const getHour = () => +`${(() => +e.dt_txt[11] ? e.dt_txt[11] : '')()}${e.dt_txt[12]}`
    const getDay = () => {
      switch (getHour()) {
        case 0:  return '|';
        case 9:  return `${e.dt_txt[8]}${e.dt_txt[9]}`;
        case 12: return '––';
        case 15: return `${e.dt_txt[5]}${e.dt_txt[6]}`;
        default: return '';
      }
    }
    return getDay();
  }

  const obiekt = {
    labels: history.map((elem, id) => title(elem, id) ),
    datasets: [
      {
        label: `Temperature [ °C ]`,
        data:  history.map(elem => `${elem.main.temp}` ),
        backgroundColor: ['rgba(228, 108, 109, .7)'],
      },
    ],
  }

  return (
    <div className="chartInTemp">
      <Link to={`/chart/wind/${city}`} >
          <div className="windChartBtnInTemp">
            <FontAwesomeIcon icon={faWind} />
          </div>
      </Link>
      <Link to={`/chart/press/${city}`} >
          <div className="compressChartBtnInTemp">
            <FontAwesomeIcon icon={faCompress} />
          </div>
      </Link>
      <Link to={`/weather/${city}`} >
        <div className="backChartBtnInTemp">
          <FontAwesomeIcon icon={faChevronCircleLeft} />
        </div>
      </Link>
      <Line
        data={obiekt}
        height={100}
        options={{ maintainAspectRatio: true }}
      />
    </div>
  );
}

export default FiveDaysTemperature;