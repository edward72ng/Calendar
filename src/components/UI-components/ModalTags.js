import React, { useContext } from "react";
import { ItemsContext } from "../../providers/ItemsContext";
import './ModalTags.css'

function ModalColors({functions, values}) {
    const {colors} = useContext(ItemsContext)
    const { color } = values
    const { selectColor } = functions

    return (
        <div className="select-tags">
            <span>Selecciona el color</span>
            <div className="container-color">
            {
                colors.map((elem, i) => {
                    if (elem.id == color.id){
                        return (
                            <div key={i} style={{backgroundColor: `rgba(${elem.color},1)`}} className={'item-color'}
                    onClick={() => selectColor(elem.id)}>
                        <span className="material-symbols-outlined">check</span>
                    </div>
                        )
                    }

                    return (<div key={i} style={{backgroundColor: `rgba(${elem.color},1)`}} className={'item-color'}
                    onClick={() => selectColor(elem.id, elem.color)}>

                    </div>)
                })
            }
            </div>
        </div>
    );
}

export {ModalColors}
{/*onClick={() => selectColor(elem.id)}*/} 