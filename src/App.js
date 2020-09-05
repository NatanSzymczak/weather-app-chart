import React from 'react';
import {
  BrowserRouter as Router, Switch, Route
} from "react-router-dom";
import Form from './Components/Form/Form';
import './App.css';
import CurrentWeather from './Components/CurrentWeather/CurrentWeather';
import FiveDeysWeather from './Components/FiveDeysWeather/FiveDeysWeather';
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
            <Route path="/chart/:city">
              <FiveDeysWeather />
            </Route>
            <Route component={NotFound} />
          </Switch>
        </div>
      </Router>
    );
}

export default App;
