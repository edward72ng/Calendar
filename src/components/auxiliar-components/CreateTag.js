import React, { useContext, useState } from "react";
import { FunctionTagsContext } from "../../providers/FunctionTags";
import { ItemsContext } from "../../providers/ItemsContext";

function CreateTag({functions}) {
    const {handleAddTag} = functions
    const { createTags } = useContext(FunctionTagsContext)
    const { updateAll } = useContext(ItemsContext)
    const [value, setValue] = useState('')
    const [input, setInput] = useState(false)

    const sendTag = () => {
        
        createTags({tag: value}, (data) => {
            //deberia añadir el callback aqui
            handleAddTag(data)})
    }

    return(
        <div 
        onClick={() => setInput(true)}>
            {input ?
            <>
                <input
                value={value}
                onChange={(e)=>setValue(e.target.value)}
                />
                <span className="material-symbols-outlined"
                onClick={sendTag}>add</span>
            </>
                :
                <span>Crear Etiqueta</span>
            }
        </div>
    )
}

export {CreateTag}