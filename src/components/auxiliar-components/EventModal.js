import React, { useState } from "react";
import './NotificationsModal.css'
import { Overlay } from "./Overlay";

function EventModal ({functions, values}) {
    const {handleAdd} = functions
    const {event} = values
    const [isclosed, setIsClosed] = useState(true)
    const [state, setState] = useState(event)

    const saveChanges = () => {
        setIsClosed(!isclosed)
        handleAdd(state)
        
    }
    const handleDateChange = (e) => {
        const date = e.target.value;
        setState(date);
    };
 
    
    return (
        <div className="position-container">

        <div 
        className="button-modal"
        onClick={() => setIsClosed(!isclosed)}>
        <span className="material-symbols-outlined">event</span>
        <span>Evento</span>
        </div>

        {!isclosed &&
        <>
        <Overlay/>
            <div className="sub-modal-container">
        
            
            <input type="date" 
            value={state} 
            onChange={handleDateChange} />
           
            

            <div
            className="generic-button"
            onClick={() => saveChanges()}>Guardar</div>
            </div>
            </>
        }

        </div>);
}

export {EventModal }