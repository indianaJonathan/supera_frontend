import './App.css';
import React, { useState } from 'react';

import TextBox from './components/inputs/TextBox';
import Datepicker from './components/inputs/Datepicker';
import Button from './components/inputs/Button';

import { AiOutlineSearch } from 'react-icons/ai';
import { BsFillSunFill, BsFillMoonFill } from 'react-icons/bs';

function App() {
  const [dark, setDark] = useState(false);
  const [operatorName, setOperatorName] = useState("");
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [operatorNameError, setOperatorNameError] = useState(null);

  function handleThemeChange () {
    setDark(!dark);
  }

  function handleStartTime (value) {
    setStartTime(value);
  }

  function handleEndTime (value) {
    setEndTime(value);
  }

  function handleOperatorName (e) {
    if (e.target.value.length > 50) {
      setOperatorNameError("Limite máximo de caracteres excedido");
      return;
    } else {
      setOperatorNameError(null);
    }
    setOperatorName(e.target.value);
  }

  function handleSubmit (e) {
    e.preventDefault();
    console.log("operatorName: ", operatorName);
  }

  return (
    <div className={ `App${ dark ? '-dark' : '' }` }>
      <div className='header'>
        <Button type="button" style={ dark ? 'primary' : 'secondary' } onClick={handleThemeChange}>
          { dark ? <BsFillSunFill /> : <BsFillMoonFill /> }
        </Button>
      </div>
      <form onSubmit={ handleSubmit }>
        <div className='form'>
          <div className='inputs'>
            <Datepicker label="Data de início" dark={ dark } onChange={ (value, e) => { handleStartTime(value, e) } } max={ Date.now() } value={ startTime }/>
            <Datepicker label="Data de fim" dark={ dark } onChange={ (value, e) => { handleEndTime(value, e) } } max={ Date.now() } value={ endTime } />
            <TextBox label="Nome do operador" dark={ dark } onChange={handleOperatorName} value={ operatorName } error={ operatorNameError }/>
          </div>
          <div className='buttons'>
            <Button type="submit" style="primary">
              <AiOutlineSearch />
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default App;
