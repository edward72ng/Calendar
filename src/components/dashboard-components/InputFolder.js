import React, { useContext, useState } from "react";
import { Modal } from "../../app/modal";
import { FunctionFoldersContext } from "../../providers/FuntionFolders.provider";
import { ModalColors } from "../UI-components/ModalTags";
import './InputFolders.css'

function InputFolders ({functions}) {
    const {updateFolders, dispatchMyProjects, setOpen} = functions
    const {createFolder} = useContext(FunctionFoldersContext)

    const [input,setInput] = useState('')
    const [selectedColor, setSelectedColor] = useState({
        id: 1,
        color: '255,65,51'
    })

    const addFolder = ()=>{
        dispatchMyProjects({type: 'CREATE', payload: {body: {name: input, myColor:{color: selectedColor.color}}}})
        createFolder({name: input, colorid: selectedColor.id},() => updateFolders)
        setInput('')
      }

    const selectColor = (id, color) => {
        setSelectedColor({
            id: id,
            color: color
        })
    }  

    return(
    <Modal>
    <div className="input-folders-container">
        <input value={input}  placeholder="Nombre"
        onChange={(e)=>setInput(e.target.value)}/>
        
        
        <ModalColors functions={{selectColor}} values={{color: selectedColor}} />

    <div className="folder-button-container">
        <div className="folder-button">
            <span>Cancelar</span>
            <span className="material-symbols-outlined"
            onClick={()=>setOpen(false)}>close</span>
        </div>
        <div className="folder-button">
            <span>Confirmar</span>
            <span className="material-symbols-outlined"
            onClick={()=>addFolder()}>check</span>
        </div>
    </div>
    </div>
    </Modal>
    )
}

export {InputFolders}