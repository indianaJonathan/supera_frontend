import './App.css';
import React, { useEffect, useState } from 'react';

import TextBox from './components/inputs/TextBox';
import Datepicker from './components/inputs/Datepicker';
import Button from './components/inputs/Button';
import Table from './components/static/table/Table';
import TableRow from './components/static/table/TableRow';
import TableCell from './components/static/table/TableCell';
import Card from './components/static/card/Card';

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
  const [filteredList, setFilteredList] = useState(transferList);
  const [ammount, setAmmount] = useState(0);
  const [periodAmmount, setPeriodAmmount] = useState(0);

  function getAmount() {
    let total = 0;
    if (filteredList && filteredList.length > 0) {
      const lastIndex = filteredList[filteredList.length - 1];
      transferList.map((item) => {
        if (stringToDate(item.dataTransferencia) <= stringToDate(lastIndex.dataTransferencia)) total += item.valor;
      });
    }
    return total;
  }

  function handleThemeChange () {
    setDark(!dark);
  }

  function handleStartTime (value, e) {
    if (!startTime && endTime) {
      setStartTimeError("A data inicial deve ser informada");
      return
    } else {
      setStartTime(value.target.value);
      setStartTimeError('');
    }
  }

  function handleEndTime (value, e) {
    if (!startTime) {
      setStartTimeError("A data inicial deve ser informada");
      setEndTime('');
      return;
    } else if (value.target.value < startTime) {
      setEndTimeError("A data final deve ser maior que a data inicial");
      setEndTime('');
      return;
    } else {
      setEndTimeError(null);
      setEndTime(value.target.value);
    }
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
    setFilteredList(res.data);
    setAmmount(getAmount());
  }

  async function handleSubmit (e) {
    console.log("teje lá");
    e.preventDefault();
    if (!operatorNameError && !startTimeError && !endTimeError) {
      if (operatorName && operatorName !== '' && startTime && endTime) {
        const res = await transferencia.getTransfersByAllFilters(startTime, endTime, operatorName);
        setFilteredList(res.data);
        return;
      } else if (operatorName && operatorName !== '') {
        const res = await transferencia.getTransfersByOperator(operatorName);
        setFilteredList(res.data);
        return;
      } else if (startTime && endTime) {
        const res = await transferencia.getTransfersByDate(startTime, endTime);
        setFilteredList(res.data);
        return;
      } else {
        await getTransfers();
        return;
      }
    }
    return;
  }

  async function cleanForm () {
    setStartTime('');
    setStartTimeError('');
    setEndTime('');
    setEndTimeError('');
    setOperatorName('');
    setOperatorNameError('');
    getTransfers();
  }

  function stringToDate (data) {
    return new Date(data);
  }

  useEffect((() => {
    getTransfers();
  }), []);

  useEffect((() => {
    if (!ammount || ammount === 0) setAmmount(getAmount());
    setPeriodAmmount(getAmount());
  }), [transferList, filteredList]);

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
            <TextBox label="Nome do operador" dark={ dark } onChange={handleOperatorName} value={ operatorName } error={ operatorNameError } clear={ () => { setOperatorName('') } }/>
          </div>
          <div className='buttons'>
            <Button type="submit" style="primary" dark={ dark } title="Pesquisar">
              <AiOutlineSearch />
            </Button>
            { operatorName || startTime || endTime ?
              <Button type="button" style="secondary" dark={ dark } title="Limpar" onClick={ () => cleanForm() }>
                <AiOutlineClose />
              </Button>
            :
              null
            }
          </div>
        </div>
      </form>
      <div className='divider'>{/* Divider */}</div>
      <div className='cards'>
        <Card label="Saldo total" value={ ammount } dark={ dark }/>
        <Card label="Saldo no período" value={ periodAmmount } dark={ dark }/>
      </div>
      {
        filteredList && filteredList.length > 0 ?
          <Table dark={ dark } headers={["Data", "Valor", "Tipo", "Operador"]}>
            { filteredList.map( (item) => {
              return(
                <TableRow dark={ dark } key={ item.id }>
                  <TableCell>{stringToDate(item.dataTransferencia).toLocaleString()}</TableCell>
                  <TableCell>{item.valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" }).replaceAll(".", "").replaceAll(",", ".").replaceAll("-", "")}</TableCell>
                  <TableCell>{item.tipo}</TableCell>
                  <TableCell>{item.nomeOperadorTransacao}</TableCell>
                </TableRow>
              );
            } ) }
          </Table>
        :
          <div className={ `no-results${ dark ? '-dark' : '' }` }>
            <span>Nenhum resultado encontrado</span>
          </div>
      }
    </div>
  );
}

export default App;
