import React, {Component} from 'react';
import Form from './Components/Form/Form';
import Result from './Components/Result/Result';
import './App.css';
import { getCurrentWeather } from './Requests'


class App extends Component {
  state = {
    value: '',
    date: '',
    city: '',
    sunrise: '',
    sunset: '',
    temp: '',
    wind: '',
    pressure: '',
    err: false,
  }

  handleInputChange = e => {
    this.setState({
      value: e.target.value
    })
  }

  handleCitySubmit = e => {
    e.preventDefault();

    getCurrentWeather(this.state.value).then(response => {
        if(response.ok) return response;
        throw Error("Wystąpił problem!");
      })
      .then(response => response.json())
      .then(data => {
        this.setState({
          err: false,
          date:     new Date().toLocaleString(),
          city:     this.state.value,
          sunrise:  data.sys.sunrise,
          sunset:   data.sys.sunset,
          temp:     data.main.temp,
          wind:     data.wind.speed,
          pressure: data.main.pressure,
        })
      })
      .catch(err => {
        console.log(err);
        this.setState( prevState => ({
          err:  true,
          city: prevState.value
        }))
      });
  }

  render () {
    return (
      <div className="App">
        <Form
          value={this.state.value}
          change={this.handleInputChange}
          submit={this.handleCitySubmit}
        />
        <Result weather={this.state} />
      </div>
    );
  }
}

export default App;
