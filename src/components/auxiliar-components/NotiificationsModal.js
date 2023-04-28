import React, { useState } from "react";
import './NotificationsModal.css'

function NotificationsModal ({functions, values}) {
    const {handleAdd} = functions
    const {notifications} = values
    const [isOpen, setIsOpen] = useState(false)
    const [state, setState] = useState({
        date: '',
        time: ''
    })
    const [alarms, setAlarms] = useState(notifications)

    const saveChanges = () => {
        setIsOpen(false)
        handleAdd(alarms)
        
    }
    const handleDateChange = (e) => {
        const date = e.target.value;
        setState((prevState) => ({ ...prevState, date }));
    };
    const handleTimeChange = (e) => {
        const time = e.target.value;
        setState((prevState) => ({ ...prevState, time }));
    };
    const handleAddAlarm = () => {
        setAlarms((prevState) => [...prevState, {date: state.date, time: state.time}])
        setState({
            date: '',
            time: ''
        })
    }
    
    return (
        <div className="position-container">

        <div
        className="button-modal"
        onClick={() => setIsOpen(!isOpen)}>
        <span className="material-symbols-outlined">alarm</span>
        <span>Alarmas</span>
        </div>

        {isOpen ?
            <div className="sub-modal-container">
        
            {alarms.map((elem, i) => {
                return (<div key={i} className="alarma-data-item">
                    <span>{elem.date}</span>
                    <span>{elem.time}</span>
                    <span className="material-symbols-outlined">delete_sweep</span>
                </div>);
            })

            }
            <div className="alarma-data-item">
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
            className="generic-button"
            onClick={() => saveChanges()}>Guardar</div>
            </div>
            : 
            <></>
        }

        </div>);
}

export {NotificationsModal }