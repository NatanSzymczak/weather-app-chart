import React, { useState, useEffect, useRef } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { cityNameList } from '../../CityNameList'
import ShowList from './ShowList'
import './Form.css';

const Form = () => {
  const [inputValue, setInputValue] = useState('');
  const [searchList, setSearchList] = useState('');
  const [enter,      clickEnter]    = useState(false);
  const [rendered,   setRendered]   = useState(false);

  const handleKeyDown = ({keyCode}) => {(keyCode === 13) && Boolean(inputValue.length > 2) && clickEnter(true)}

  const useFocus = () => {
    const htmlElRef = useRef(null)
    const setFocus = () => {htmlElRef.current &&  htmlElRef.current.focus()}
    return [ htmlElRef, setFocus ]
  }

  const [inputRef, setInputFocus] = useFocus()
  useEffect( () => {
    (inputValue.length > 2 ) &&
      setSearchList(cityNameList.filter(
        curr => curr.indexOf(inputValue.toLowerCase()) === 0
      ));
    setRendered(true);
  },[inputValue])

  return (
    <>
      <div className="push">
      With us you will be prepared for any weather !
      </div>
      <div className="cityNameForm">
        <input
          type="text"
          onChange={e => setInputValue(e.target.value)}
          placeholder="Check weather:"
          onKeyDown={ e => handleKeyDown(e)}
          spellCheck="false"
          ref={inputRef}
          autoFocus
        />
        { Boolean(inputValue.length > 2) && <ShowList key="searchList" searchList={searchList} /> }
        { !Boolean(inputValue.length < 3)
          ? (<Link to={`/weather/${inputValue}`}><button className="checkWeather">check</button></Link>)
          : rendered && <button onClick={setInputFocus} className="checkWeather" >check</button> }
        { enter && <Redirect to={`/weather/${inputValue}`} />}
      </div>
    </>
  )
}

export default Form;