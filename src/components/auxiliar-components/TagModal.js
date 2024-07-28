import React, { useContext, useState } from "react";
import { Overlay } from "./Overlay";
import style from './NotificationsModal.module.css';
import { ItemsContext } from "../../providers/ItemsContext";
import styleTagModal from "./TagModal.module.css"

const { 
    positionContainer, 
    buttonModal, 
    materialSymbolsOutlined, 
    alarmaDataItem, 
    genericButton, 
    folderDataItem, 
    overlay, 
    timeBlockItems, 
    timeBlockItemsSpan 
  } = style;

const {
itemTag,
subModalContainer
} = styleTagModal

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
                    <div className={subModalContainer}>
                {
                    tags.map((elem, i)=>{
                        return(
                        <div key={elem.id} 
                        className={itemTag}
                        style={{
                        color: `rgba(${elem.myColor?.color ? elem.myColor.color: '204,204,204'},1)`}}>
                            <span className="material-symbols-outlined">
                                sell</span>
                            <span>{elem.tag}</span>
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