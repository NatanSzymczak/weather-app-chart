import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { cityNameList } from '../../CityNameList'
import ShowList from './ShowList'
import './Form.css';

const Form = () => {
  const [inputValue, setInputValue] = useState('');
  const [searchList, setSearchList] = useState('');
  const [enter, clickEnter] = useState(false);

  const handleKeyDown = ({keyCode}) => {(keyCode === 13) && clickEnter(true)}

  useEffect( () => {
    (inputValue.length > 2 ) &&
      setSearchList(cityNameList.filter(
        curr => curr.indexOf(inputValue.toLowerCase()) == 0
      ));
  },[inputValue])


  console.log(searchList);

  return (
    <div className="cityNameForm">
      <input
        type="text"
        onChange={e => setInputValue(e.target.value)}
        placeholder="Check weather:"
        onKeyDown={ e => handleKeyDown(e)}
        spellCheck="false"
      />
      { Boolean(inputValue.length > 2) && <ShowList searchList={searchList} /> }
      <Link to={`/weather/${inputValue}`}>
        <button className="checkWeather">check</button>
      </Link>
      {enter && <Redirect to={`/weather/${inputValue}`} />}
    </div>
  )
}

export default Form;