import React, { useContext, useState } from "react";
import { Modal } from "../../app/modal";
import { FunctionTagsContext } from "../../providers/FunctionTags";
import { ItemsContext } from "../../providers/ItemsContext";
import { ModalColors } from "../UI-components/ModalTags";

function TagItem({values}) {
    const {id, myColor, tag} = values

    const { editTag, deleteTag } = useContext(FunctionTagsContext)
    const { dispatchTags, updateAll, updateWithout, updateInbox} = useContext(ItemsContext)

    const [edit, setEdit] = useState(false)
    const [input, setInput] = useState(tag)
    const [selectedColor, setSelectedColor] = useState(myColor)

    const selectColor = (id, color) => {
        setSelectedColor({
            id: id,
            color: color
        })
    }  

    const updateTag = () => {
        editTag({id, tag: input, colorid: selectedColor.id}, () => {
            dispatchTags({type: 'UPDATE', payload: {id: id, body:{tag: input, myColor: selectedColor}}})
            updateAll()
            updateWithout()
            updateInbox()
            setEdit(false)
        })
    }

    const deleteThisTag = () => {
        deleteTag(id, () => {
            dispatchTags({type: 'DELETE', payload: {id: id}})
            updateAll()
            updateWithout()
            updateInbox()
            setEdit(false)
        })
    }

    if (edit){
        return (
            <Modal>
                <div className="input-folders-container">
                <input value={input}  placeholder="Etiqueta"
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
                    onClick={()=>updateTag()}>check</span>
                </div>
                </div>
                <div className="folder-button">
                    <span>Borrar</span>
                    <span className="material-symbols-outlined"
                    onClick={()=>deleteThisTag()}>delete</span>
                </div>
                </div>                
            </Modal>
        )
    }

    return (
        <div className='tag' style={{backgroundColor: `rgba(${myColor.color},0.4)`}}> 
          <span style={{fontWeight: 'bold'}}>{tag}</span>
          <span className="material-symbols-outlined"
          onClick={() => {setEdit(true)}}
          >edit</span>
        </div>
    )
}

export {TagItem}