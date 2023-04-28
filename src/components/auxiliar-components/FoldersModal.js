import React, { useContext, useState } from "react";
import './NotificationsModal.css'
import { ItemsContext } from "../../providers/ItemsContext";

function FoldersModal ({functions, values}) {
    const {myProjects} = useContext(ItemsContext)
    const {handleAdd} = functions
    //const {folderid} = values
    const [isclosed, setIsClosed] = useState(true)
    console.log(myProjects)

    const saveChanges = (id) => {
        setIsClosed(!isclosed)
        handleAdd(id)
    }
    
    return (
        <div className="position-container">

        <div 
        className="button-modal"
        onClick={() => setIsClosed(!isclosed)}>
        <span className="material-symbols-outlined">folder</span>
        <span>Folders</span>
        </div>

        {!isclosed &&
            <div className="sub-modal-container">

            {
            myProjects.map((elem, i)=>{
                return(<div key={elem.id}
                className="folder-data-item"
                onClick={() => saveChanges(elem.id)}>
                    {elem.name}
                </div>);
            })
            }
            <div
            className="generic-button"
            onClick={() => setIsClosed(!isclosed)}>Cancelar</div>

            </div>
        }
            
        

        </div>);
}

export {FoldersModal}