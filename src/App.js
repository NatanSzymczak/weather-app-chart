import React from 'react';
import {
  BrowserRouter as Router, Switch, Route
} from "react-router-dom";
import Form from './Components/Form/Form';
import './App.css';
import CurrentWeather from './Components/CurrentWeather/CurrentWeather';
import FiveDaysTemperature from './Components/FiveDaysTemperature/FiveDaysTemperature';
import FiveDaysWind from './Components/FiveDaysWind/FiveDaysWind';
import FiveDaysPressure from './Components/FiveDaysPressure/FiveDaysPressure';
import NotFound from './Components/NotFound/NotFound'

const App = () => {
    return (
      <Router>
        <div>
          <Switch>
            <Route exact path="/">
              <Form />
            </Route>
            <Route path="/weather/:city">
              <CurrentWeather />
            </Route>
            <Route path="/chart/temp/:city">
              <FiveDaysTemperature />
            </Route>
            <Route path="/chart/wind/:city">
              <FiveDaysWind />
            </Route>
            <Route path="/chart/press/:city">
              <FiveDaysPressure />
            </Route>
            <Route component={NotFound} />
          </Switch>
        </div>
      </Router>
    );
}

export default App;
