import React, { useEffect, useState } from 'react';
import { getWeatherForFiveDays } from  '../../Requests';
import { Link } from "react-router-dom";
import { Line } from 'react-chartjs-2';
import { useParams } from 'react-router';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronCircleLeft, faTemperatureLow, faCompress } from "@fortawesome/free-solid-svg-icons/";
import './FiveDaysWind.css';



function FiveDaysWind () {
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
        label: 'Wind [ m/s ]',
        data:  history.map(elem => `${elem.wind.speed}` ),
        backgroundColor: ['rgba(72, 117, 152, .7)'],
      },
    ],
  }

  return (
    <div className="chartInWind">
      <Link to={`/chart/temp/${city}`}>
          <div className="tempChartBtn">
            <FontAwesomeIcon icon={faTemperatureLow} />
          </div>
      </Link>
      <Link to={`/chart/press/${city}`}>
          <div className="compressChartBtn">
            <FontAwesomeIcon icon={faCompress} />
          </div>
      </Link>
      <Link to="/" >
        <div className="backChartBtnInWind">
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

export default FiveDaysWind;