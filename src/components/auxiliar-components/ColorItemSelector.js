import React, { useContext, useState } from "react";
import { ItemsContext } from "../../providers/ItemsContext";
import style from './ColorItemSelector.module.css';

const { 
    colorSelectorContainer,
    circlesSlider,
    circle
  } = style;

function ColorItemSelector ({functions, values}) {
    const {colors} = useContext(ItemsContext)
    
    return (
        <div className={colorSelectorContainer}>

            <span className="material-symbols-outlined">palette</span>
            <div className={circlesSlider}>
            {colors.map((elem) => {
                const {id, color} = elem;
                return(<div 
                key={id} 
                style={{backgroundColor: `rgba(${elem.color},0.5)`}}
                className={circle}>
                </div>)
            })}
            </div>
    
        </div>
    );
    
}

export {ColorItemSelector}