import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Form from './Components/Form/Form';
import CurrentWeather from './Components/CurrentWeather/CurrentWeather';
import FiveDaysTemperature from './Components/FiveDaysTemperature/FiveDaysTemperature';
import FiveDaysPressure from './Components/FiveDaysPressure/FiveDaysPressure';
import FiveDaysWind from './Components/FiveDaysWind/FiveDaysWind';
import NotFound from './Components/NotFound/NotFound'
import './App.css';

const App = () => {
    return (
      <Router>
        <div>
          <Switch>
            <Route component={Form}          exact path="/" />
            <Route component={CurrentWeather}      path="/weather/:city" />
            <Route component={FiveDaysTemperature} path="/chart/temp/:city" />
            <Route component={FiveDaysWind}        path="/chart/wind/:city" />
            <Route component={FiveDaysPressure}    path="/chart/press/:city" />
            <Route component={NotFound} />
          </Switch>
        </div>
      </Router>
    );
}

export default App;
