import React, { useContext, useState } from "react";
import { ItemsContext } from "../../providers/ItemsContext";
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

function TimeBlockModal ({functions, values}) {
    const [timeBlock, setTimeBlock] = useState({
        timeblockstart: null,
        timeblockend: null,
        timeblockdate: '',
    })
    const {handleAdd} = functions
    const [isclosed, setIsClosed] = useState(true)
    

    const saveChanges = () => {
        if(timeBlock.timeblockstart != null && 
            timeBlock.timeblockend != null &&
            timeBlock.timeblockstart != timeBlock.timeblockend){
                setIsClosed(!isclosed)
                handleAdd(timeBlock)
            }
        
    }
    
    return (
        <div className="position-container">

        <div 
        className="button-modal"
        onClick={() => setIsClosed(!isclosed)}>
        <span className="material-symbols-outlined">timelapse</span>
        <span>TimeBlock</span>
        </div>

        {!isclosed && <>
            <Overlay/>
            <div className="sub-modal-container">

                

            {
            Array.from(Array(24).keys()).map((elem, i)=>{
                return(<div key={i}
                className="time-block-items">
                    <span
                    onClick={() => 
                    setTimeBlock({...timeBlock, timeblockstart: elem})}>
                        {elem}</span>
                        <span
                    onClick={() => 
                    setTimeBlock({...timeBlock, timeblockend: elem})}>
                        {elem}</span>
                </div>);
            })
            }

                <input 
                type="date"
                value={timeBlock.timeblockdate}
                onChange={(e) => setTimeBlock({...timeBlock, timeblockdate: e.target.value})}>
                </input>

            <div
            className="generic-button"
            onClick={saveChanges}>Guardar</div>
            
            <div
            className="generic-button"
            onClick={() => setIsClosed(!isclosed)}>Cancelar</div>
            </div>
            
            </>}

        </div>
        );
}

export {TimeBlockModal}