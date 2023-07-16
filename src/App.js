import './App.css';
import React, { useState } from 'react';

import TextBox from './components/inputs/TextBox';
import Datepicker from './components/inputs/Datepicker';
import Button from './components/inputs/Button';
import Table from './components/static/table/Table';
import TableRow from './components/static/table/TableRow';
import TableCell from './components/static/table/TableCell';

import { AiOutlineSearch } from 'react-icons/ai';
import { BsFillSunFill, BsFillMoonFill } from 'react-icons/bs';

function App() {
  const [dark, setDark] = useState(false);
  const [operatorName, setOperatorName] = useState("");
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [operatorNameError, setOperatorNameError] = useState('');
  const [transferList, setTransferList] = useState([
    {id: 1, data_transferencia: "2023-07-15T16:33:21.000", valor: 3056.64, tipo: "DEPOSITO",  operador: "Jonathan"}, 
    {id: 2, data_transferencia: "2023-07-16T09:01:55.000", valor: -15.64, tipo: "SAQUE", operador: "Ronnyscley"}, 
    {id: 3, data_transferencia: "2023-07-21T23:59:59.000", valor: -876.33, tipo: "SAQUE", operador: "Fulano"},
    {id: 4, data_transferencia: "2023-07-09T03:45:20.000", valor: 1.99, tipo: "DEPOSITO",  operador: "Jonathan"},
    {id: 5, data_transferencia: "2023-07-16T16:02:07.000", valor: 2.99, tipo: "TRANSFERENCIA",  operador: "Jonathan"}
  ]);
  const [filteredList, setFilteredList] = useState(transferList);

  function handleThemeChange () {
    setDark(!dark);
  }

  function handleStartTime (value, e) {
    setStartTime(value.target.value);
  }

  function handleEndTime (value, e) {
    setEndTime(value.target.value);
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
    if (operatorName && operatorName !== '' && startTime && endTime) {
      setFilteredList(transferList.filter((item) => {
        if (
          (item.operador.toUpperCase() === operatorName.toUpperCase()) && 
          (stringToDate(item.data_transferencia) >= stringToDate(startTime) && stringToDate(item.data_transferencia) <= stringToDate(endTime))
        ) {
          return item;
        }
      }));
      return;
    }
    if (operatorName && operatorName !== '') {
      setFilteredList(transferList.filter((item) => item.operador.toUpperCase() === operatorName.toUpperCase() ));
      return;
    }
    if (startTime && endTime) {
      setFilteredList(transferList.filter((item) => {
        if (stringToDate(item.data_transferencia) >= stringToDate(startTime) && stringToDate(item.data_transferencia) <= stringToDate(endTime)) return item;
       }));
      return;
    }
    if (!operatorName || operatorName === '') {
      setFilteredList(transferList);
      return;
    }
  }

  function stringToDate (data) {
    return new Date(data);
  }

  return (
    <div className={ `App${ dark ? '-dark' : '' }` }>
      <div className='header'>
        <Button type="button" style={ dark ? 'primary-dark' : 'secondary' } onClick={handleThemeChange}>
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
            <Button type="submit" style="primary" dark={ dark }>
              <AiOutlineSearch />
            </Button>
          </div>
        </div>
      </form>
      <div className='divider'>{/* Divider */}</div>
      {
        filteredList && filteredList.length > 0 ?
          <Table dark={ dark } headers={["Data", "Valor", "Tipo", "Operador"]}>
            { filteredList.map( (item) => {
              return(
                <TableRow dark={ dark }>
                  <TableCell>{stringToDate(item.data_transferencia).toLocaleString()}</TableCell>
                  <TableCell>R${item.valor.toLocaleString().replaceAll("-", "")}</TableCell>
                  <TableCell>{item.tipo}</TableCell>
                  <TableCell>{item.operador}</TableCell>
                </TableRow>
              );
            } ) }
          </Table>
        :
          null
      }
    </div>
  );
}

export default App;
