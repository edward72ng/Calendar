import React, { useState } from "react";
import { Overlay } from "./Overlay";
import style from './NotificationsModal.module.css';

const { 
    positionContainer, 
    buttonModal, 
    materialSymbolsOutlined, 
    subModalContainer, 
    alarmaDataItem, 
    genericButton, 
    folderDataItem, 
    overlay, 
    timeBlockItems, 
    timeBlockItemsSpan 
  } = style;

  function NotificationsModal({ functions, values }) {
    const { handleAdd } = functions;
    const { notifications } = values;
    const [isOpen, setIsOpen] = useState(false);
    const [state, setState] = useState({
        date: '',
        time: ''
    });
    const [alarms, setAlarms] = useState(notifications);

    const saveChanges = () => {
        setIsOpen(false);
        handleAdd(alarms);
    };

    const handleDateChange = (e) => {
        const date = e.target.value;
        setState((prevState) => ({ ...prevState, date }));
    };

    const handleTimeChange = (e) => {
        const time = e.target.value;
        setState((prevState) => ({ ...prevState, time }));
    };

    const handleAddAlarm = () => {
        setAlarms((prevState) => [...prevState, { date: state.date, time: state.time }]);
        setState({
            date: '',
            time: ''
        });
    };

    return (
        <div className={positionContainer}>
          <span className="material-symbols-outlined">alarm</span>
      
          <div
            className={buttonModal}
            onClick={() => setIsOpen(!isOpen)}>
            <span>Notificaciones</span>
          </div>
      
          <div></div>
      
          {isOpen ? <>
            <Overlay />
            <div className={subModalContainer}>
      
              {alarms.map((elem, i) => {
                return (<div key={i} className={alarmaDataItem}>
                  <span>{elem.date}</span>
                  <span>{elem.time}</span>
                  <span className="material-symbols-outlined">delete_sweep</span>
                </div>);
              })}
      
              <div className={alarmaDataItem}>
                <input type="date"
                  value={state.date}
                  onChange={handleDateChange} />
                <input type="time"
                  value={state.time}
                  onChange={handleTimeChange} />
                <span
                  className="material-symbols-outlined"
                  onClick={handleAddAlarm}
                >library_add</span>
              </div>
      
              <div
                className={genericButton}
                onClick={() => saveChanges()}>Guardar</div>
            </div>
          </>
            :
            <></>
          }
        </div>
      );      
}

export { NotificationsModal };
