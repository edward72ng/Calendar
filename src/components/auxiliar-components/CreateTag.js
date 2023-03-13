import React, { useContext, useState } from "react";
import { Modal } from "../../app/modal";
import { FunctionTagsContext } from "../../providers/FunctionTags";
import { ItemsContext } from "../../providers/ItemsContext";
import { ModalColors } from "../UI-components/ModalTags";
import './CreateLabel.css'

function CreateTag({functions}) {
    const {handleAddTag} = functions
    const { createTags } = useContext(FunctionTagsContext)
    const { updateAll } = useContext(ItemsContext)
    const [value, setValue] = useState('')
    const [input, setInput] = useState(false)
    const [selectedColor, setSelectedColor] = useState({
        id: 1,
        color: '255,65,51'
    })


    const sendTag = () => {
        
        createTags({tag: value}, (data) => {
            //deberia añadir el callback aqui
            handleAddTag(data)})
    }

    const selectColor = (id, color) => {
        console.log(id, color)
    }

    return(
        <div >
            {input ?
            <Modal>
                <div className="input-folders-container">
                <input
                value={value}
                placeholder="Nueva Etiqueta"
                onChange={(e)=>setValue(e.target.value)}
                />
                <ModalColors functions={{selectColor}} values={{color: selectedColor}} />
                <span className="material-symbols-outlined"
                onClick={sendTag}>add</span>
                </div>
            </Modal>
                :
                <span className="create-label" onClick={() => setInput(true)} >Crear Etiqueta</span>
            }
        </div>
    )
}

export {CreateTag}