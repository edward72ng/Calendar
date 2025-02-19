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

function PriorityModal ({functions, values}) {
    const {priorities} = useContext(ItemsContext)
    const {handleAdd} = functions
    const [isClosed, setIsClosed] = useState(true)
    
    console.log('OPCIONES DE PRIORIDA CLIENTE',priorities)

    const saveChanges = (id) => {
        setIsClosed(!isClosed)
        handleAdd(id)
    }
    
    return (
        <div className={positionContainer}>
            <span className="material-symbols-outlined">flag</span>
            <div 
                className={buttonModal}
                onClick={() => setIsClosed(!isClosed)}>
                <span>Prioridad</span>
            </div>
        <div></div>

            {!isClosed && <>
                <div className={subModalContainer}>
    
                    {
                        priorities.map((elem, i) => {
                            return (
                                <div 
                                    key={`priorities-${elem.id}`}
                                    className={folderDataItem}
                                    style={{color: `rgb(${elem.color})`}}
                                    onClick={() => saveChanges(elem.id)}>
                                    {elem.priority}
                                </div>
                            );
                        })
                    }
                    <div
                        className={genericButton}
                        onClick={() => setIsClosed(!isClosed)}>
                        Cancelar
                    </div>
                </div>
            </>}
    
        </div>
    );
    
}

export {PriorityModal}