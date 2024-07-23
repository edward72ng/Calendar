import React, { useContext, useState } from "react";
import { Overlay } from "./Overlay";
import style from './NotificationsModal.module.css';
import { ItemsContext } from "../../providers/ItemsContext";

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

function TagModal ({functions, values}) {
    const {tags}= useContext(ItemsContext)
    const {handleAdd} = functions
    const {event} = values
    const [isClosed, setIsClosed] = useState(true)
    const [state, setState] = useState(event)

    const saveChanges = () => {
        setIsClosed(!isClosed)
        handleAdd(state)
        
    }
    const handleDateChange = (e) => {
        const date = e.target.value;
        setState(date);
    };
 
    
    return (
        <div className={positionContainer}>
            <span className="material-symbols-outlined">label</span>
            <div 
                className={buttonModal}
                onClick={() => setIsClosed(!isClosed)}>
                
                <span>Etiquetas</span>
            </div>
            <div></div>
    
            {!isClosed && (
                <>
                    <Overlay />
                    <div className={subModalContainer}>
                {
                    tags.map((elem, i)=>{
                        return(
                        <div key={elem.id} 
                        className={folderDataItem}
                        style={{
                        backgroundColor: `rgba(${elem.myColor?.color ? elem.myColor.color: '204,204,204'},0.1)`,
                        color: `rgba(${elem.myColor?.color ? elem.myColor.color: '204,204,204'},1)`
                        
                        }}>
                          {elem.tag}
                        </div>
                          )
                      })
                }
            
                    </div>
                </>
            )}
        </div>
    );
    
}

export {TagModal }