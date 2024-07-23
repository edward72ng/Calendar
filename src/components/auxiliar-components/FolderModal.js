import React, { useContext, useState } from "react";
import { ItemsContext } from "../../providers/ItemsContext";
import { Overlay } from "./Overlay";
import style from './NotificationsModal.module.css';
import folderStyle from './FolderModal.module.css'

const { 
    subModalContainer, 
    genericButton, 
    folderDataItem, 
  } = style;

const { button, positionContainer} = folderStyle

function FolderModal ({functions, values}) {
    const {myProjects} = useContext(ItemsContext)
    const [isClosed, setIsClosed] = useState(true)
    const {thisFolder = {color: "128,128,128", name: "Inbox"}} = values

    
    return (
        <div className={positionContainer}>
            
            <div 
            className={button}
            style={{
            backgroundColor:`rgba(${thisFolder.color},0.3)`,
            border: `2px solid rgba(${thisFolder.color},1)`,
            color: `rgba(${thisFolder.color},1)`}}
            onClick={() => setIsClosed(!isClosed)}>
                <span className="material-symbols-outlined">folder</span>
                <span>Inbox</span>
            </div>
        

            {!isClosed && <>
                <Overlay/>
                <div className={subModalContainer}>
    
                    {
                        myProjects.map((elem, i) => {
                            return (
                                <div 
                                    key={elem.id}
                                    className={folderDataItem}>
                                    {elem.name}
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

export {FolderModal}