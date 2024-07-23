import React from "react";
import styles from "./AddButton.module.css"

function AddButton ({clickFunction}) {

    return (
        <div className = {styles.adding}
        onClick={clickFunction}>
            <span>Nueva tarea</span>
            <span className="material-symbols-outlined">add</span>
        </div>
    )
}

export {AddButton}