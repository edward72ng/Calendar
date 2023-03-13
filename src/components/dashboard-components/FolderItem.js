import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Modal } from "../../app/modal";
import { DataContext } from "../../providers/DataContext";
import { FunctionFoldersContext } from "../../providers/FuntionFolders.provider";
import { ItemsContext } from "../../providers/ItemsContext";
import { ModalColors } from "../UI-components/ModalTags";

function FolderItem ({values}) {
    const {id, name, myColor} = values
    const {setFilter} = useContext(DataContext)
    const {deleteFolder, updateFolder} = useContext(FunctionFoldersContext)
    const {dispatchMyProjects, updateAll, updateWithout, updateInbox} = useContext(ItemsContext)
    const [edit, setEdit] = useState(false)
    const [input, setInput] = useState(name)
    const [selectedColor, setSelectedColor] = useState(myColor)

    const selectColor = (id, color) => {
        setSelectedColor({
            id: id,
            color: color
        })
    }  

    const handleDelete = () => {
        dispatchMyProjects({type: 'DELETE', payload: {id: id}})
        deleteFolder(id, () => {
            updateInbox()
        })
    }

    const handleEdit = () => {
        
        dispatchMyProjects({type: 'UPDATE', payload: {id: id, body: {name: input, myColor: selectedColor}}})
        setEdit(false)
        updateFolder(id,  {name: input, colorid: selectedColor.id}, () => {
            updateAll()
            
        })
    }
    
    if (edit){
        return (
            <Modal>
            <div className="input-folders-container">
                <input value={input}  placeholder="Folder"
                onChange={(e)=>setInput(e.target.value)}/>
                <ModalColors functions={{selectColor}} values={{color: selectedColor}} />
                
                <div className="folder-button-container">
                <div className="folder-button">
                    <span>Cancelar</span>
                    <span className="material-symbols-outlined"
                    onClick={()=>setEdit(false)}>close</span>
                </div>
                <div className="folder-button">
                    <span>Confirmar</span>
                    <span className="material-symbols-outlined"
                    onClick={()=>handleEdit()}>check</span>
                </div>
                </div>
                <div className="folder-button">
                    <span>Borrar</span>
                    <span className="material-symbols-outlined"
                    onClick={()=>handleDelete()}>delete</span>
                </div>
                </div> 
    </Modal>
        )
    }

    return (
        <div  className="slider-item" style={{backgroundColor: `rgba(${myColor.color}, 0.5)`}}
                    onClick={() => {setFilter(id)}}>
                        <Link  to='/app/my-projects'>
                        <div className="folder-access">
                        <span>{name}</span>
                        </div>
                        </Link>

                        <div className="folder-options">
                        <span className="material-symbols-outlined"
                        onClick={() => setEdit(true)}
                        >edit</span>
                        </div>
                    </div>
    )
}

export {FolderItem }