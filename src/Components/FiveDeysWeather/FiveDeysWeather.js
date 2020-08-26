import React, { useEffect, useState } from 'react';
import { getWeatherForFiveDays } from  '../../Requests';
import './FiveDeysWeather.css';
import { Line } from 'react-chartjs-2';


function FiveDeysWeather ({searchCity}) {
  const city = searchCity;
  const [ history, setHistory] = useState([]);
  console.log("Przekaz: ", city);

  useEffect(() => {
    getWeatherForFiveDays(city)
    .then(response => {
      if(response.ok) return response;
      throw Error("Wystąpił problem!");
    })
    .then(response => response.json())
    .then(data => {
      console.log(data)
      setHistory(data.list)
    })
    .catch(err => {
      console.log(err);
    });


  }, [city]);
  console.log('table:', history);

  const obiekt = {
    labels: history.map((elem, id) => `${(id+1)*3} h` ),
    datasets: [
      {
        label: 'Temperature: ',
        data:  history.map(elem => `${elem.main.temp}` ),
        backgroundColor: ['orange']
      }
    ],
  }

  return (
    <Line
      data={obiekt}
      height={100}
      options={{ maintainAspectRatio: true }}
    />
  );
}

export default FiveDeysWeather;