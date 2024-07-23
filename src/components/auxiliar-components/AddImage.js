import React from "react";
import style from "./AddImage.module.css"

const {addImageContainer,
    addButton,
    exampleBox
} = style

function AddImage () {

    return(
        <div className={addImageContainer}>

            <div className={addButton}>
            <span 
            className="material-symbols-outlined">
                add_a_photo</span>
            </div>

            <div className={exampleBox}>
            <span className="material-symbols-outlined">
                image</span>
            </div>

        </div>
    )
}

export {AddImage}