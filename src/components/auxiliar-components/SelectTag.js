import React, { useContext, useState } from "react";
import { ItemsContext } from "../../providers/ItemsContext";
import './SelectTag.css'

function SelectTag({values, functions}) {
    const [isClose, setIsClose] = useState(true)
    const {tags} = useContext(ItemsContext)
    const {handleAddTag} = functions

    return (<div className="select-tag-container">
        {isClose 
            ?
            <span
            onClick={() => setIsClose(false)}>Etiquetas +</span>
            :
            <div className="select-tag-modal">
                {
                    tags.map((elem, i)=>{
                        return(
                        <div key={elem.id} 
                        style={{
                        backgroundColor: `rgba(${elem.myColor?.color ? elem.myColor.color: '204,204,204'},0.1)`,
                        color: `rgba(${elem.myColor?.color ? elem.myColor.color: '204,204,204'},1)`
                        }}
                        onClick={() => handleAddTag(elem)}>
                          {elem.tag}
                        </div>
                          )
                      })
                }
                <div onClick={() => setIsClose(true)}>Cancelar</div>
            </div>
        }
    </div>);
}

export {SelectTag}