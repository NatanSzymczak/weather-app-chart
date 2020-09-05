import React, { useState } from 'react';
import { Link, Redirect } from "react-router-dom";
import './Form.css';

const Form = () => {
  const [inputValue, setInputValue] = useState('');
  const [enter, clickEnter] = useState(false);

  const handleKeyDown = ({keyCode}) => {(keyCode === 13) && clickEnter(true)}

  return (
    <div className="cityNameForm">
      <input
        type="text"
        onChange={e => setInputValue(e.target.value)}
        placeholder="Check weather:"
        onKeyDown={ e => handleKeyDown(e)}
      />
      <Link to={`/weather/${inputValue}`}>
        <button className="checkWeather">check</button>
      </Link>
      {enter && <Redirect to={`/weather/${inputValue}`} />}
    </div>
  )
}

export default Form;