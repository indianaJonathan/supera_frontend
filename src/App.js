import './App.css';
import React, { useEffect, useState } from 'react';

import TextBox from './components/inputs/TextBox';
import Datepicker from './components/inputs/Datepicker';
import Button from './components/inputs/Button';
import Table from './components/static/table/Table';
import TableRow from './components/static/table/TableRow';
import TableCell from './components/static/table/TableCell';

import transferencia from './services/Transferencia';

import { AiOutlineSearch, AiOutlineClose } from 'react-icons/ai';
import { BsFillSunFill, BsFillMoonFill } from 'react-icons/bs';

function App() {
  const [dark, setDark] = useState(false);
  const [operatorName, setOperatorName] = useState("");
  const [startTime, setStartTime] = useState('');
  const [startTimeError, setStartTimeError] = useState('');
  const [endTime, setEndTime] = useState('');
  const [endTimeError, setEndTimeError] = useState('');
  const [operatorNameError, setOperatorNameError] = useState('');
  const [transferList, setTransferList] = useState([]);

  function handleThemeChange () {
    setDark(!dark);
  }

  function handleStartTime (value, e) {
    setStartTime(value.target.value);
  }

  function handleEndTime (value, e) {
    if (value.target.value < startTime) {
      setEndTimeError("A data final deve ser maior que a data inicial");
      setEndTime('');
      return;
    } else {
      setEndTimeError(null);
    }
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

  async function getTransfers () {
    const res = await transferencia.getTransfers();
    setTransferList(res.data);
    setTransferList(res.data);
  }

  async function handleSubmit (e) {
    e.preventDefault();
    if (operatorName && operatorName !== '' && startTime && endTime) {
      const res = await transferencia.getTransfersByAllFilters(startTime, endTime, operatorName);
      setTransferList(res.data);
      return;
    } else if (operatorName && operatorName !== '') {
      const res = await transferencia.getTransfersByOperator(operatorName);
      setTransferList(res.data);
      return;
    } else if (startTime && endTime) {
      const res = await transferencia.getTransfersByDate(startTime, endTime);
      setTransferList(res.data);
      return;
    } else {
      await getTransfers();
      return;
    }
  }

  async function cleanForm () {
    setStartTime('');
    setStartTimeError('');
    setEndTime('');
    setEndTimeError('');
    setOperatorName('');
    setOperatorNameError('');
    const res = await transferencia.getTransfers();
    setTransferList(res.data);
  }

  function stringToDate (data) {
    return new Date(data);
  }

  useEffect((() => {
    getTransfers();
  }), []);

  return (
    <div className={ `App${ dark ? '-dark' : '' }` }>
      <div className='header'>
        <Button type="button" style={ dark ? 'primary-dark' : 'secondary' } onClick={handleThemeChange} title={`Mudar para tema ${ dark ? 'claro' : 'escuro' }`}>
          { dark ? <BsFillSunFill /> : <BsFillMoonFill /> }
        </Button>
      </div>
      <form onSubmit={ handleSubmit }>
        <div className='form'>
          <div className='inputs'>
            <Datepicker label="Data de início" dark={ dark } onChange={ (value, e) => { handleStartTime(value, e) } } max={ Date.now() } value={ startTime } error={ startTimeError }/>
            <Datepicker label="Data de fim" dark={ dark } onChange={ (value, e) => { handleEndTime(value, e) } } max={ Date.now() } value={ endTime } error={ endTimeError }/>
            <TextBox label="Nome do operador" dark={ dark } onChange={handleOperatorName} value={ operatorName } error={ operatorNameError }/>
          </div>
          <div className='buttons'>
            <Button type="submit" style="primary" dark={ dark } title="Pesquisar">
              <AiOutlineSearch />
            </Button>
            <Button type="button" style="secondary" dark={ dark } title="Limpar" onClick={ cleanForm }>
              <AiOutlineClose />
            </Button>
          </div>
        </div>
      </form>
      <div className='divider'>{/* Divider */}</div>
      {
        transferList && transferList.length > 0 ?
          <Table dark={ dark } headers={["Data", "Valor", "Tipo", "Operador"]}>
            { transferList.map( (item) => {
              return(
                <TableRow dark={ dark } key={ item.id }>
                  <TableCell>{stringToDate(item.dataTransferencia).toLocaleString()}</TableCell>
                  <TableCell>R${item.valor.toLocaleString().replaceAll("-", "")}</TableCell>
                  <TableCell>{item.tipo}</TableCell>
                  <TableCell>{item.nomeOperadorTransacao}</TableCell>
                </TableRow>
              );
            } ) }
          </Table>
        :
          <div className='no-results'>
            <span>Nenhum resultado encontrado</span>
          </div>
      }
    </div>
  );
}

export default App;
