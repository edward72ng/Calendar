import React, { useContext, useState } from 'react';
import './Search.css'
import {ItemsContext} from '../../providers/ItemsContext'
import {Overlay} from '../auxiliar-components/Overlay'
import {Modal} from '../../app/modal'

function Search(props) {
    const {taks} = useContext(ItemsContext)
    const [inputValue, setInputValue] = useState('');
    const [resultados, setResultados] = useState([]);
    const [isClose, setIsClose] = useState(true)

    const handleInputChange = (event) => {
      const value = event.target.value;
      setInputValue(value);
  
      const resultadosFiltrados = taks.filter((item) => {
        return item.content.toLowerCase().includes(value.toLowerCase());
      });
      setResultados(resultadosFiltrados);
    };
  
    if(isClose){
      return (<span
        onClick={() => setIsClose(!isClose)} 
        className="material-symbols-outlined">search</span>);
    }

    return (
    <Modal>
    <div className="buscador">
        <input type="text" value={inputValue} onChange={handleInputChange} className="input" />
        <button 
        onClick={() => setIsClose(!isClose)}>Cerrar</button>
        <ul className="resultados">
          {resultados.map((item, index) => (
            <li key={index} className="resultado">{item.content}</li>
          ))}
        </ul>
      </div>
      </Modal>
    );
}

export {Search};
