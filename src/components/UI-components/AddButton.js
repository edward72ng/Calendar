import React, { useContext, useEffect } from "react";
import styles from "./AddButton.module.css"
import { DataContext } from "../../providers/DataContext";
import { TaskModalContext } from "../../providers/TaskModalContext";
import { ItemsContext } from "../../providers/ItemsContext";

const {adding} = styles

function AddButton () {
    const {getFolder} = useContext(ItemsContext);
    const {setForm} = useContext(TaskModalContext)
    const {filter} = useContext(DataContext)

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.ctrlKey && event.key === 'a') {
                const folder = getFolder(filter)
                openTaskForm(folder);
            }
          };
      
          document.addEventListener('keydown', handleKeyDown);
      
          return () => {
            document.removeEventListener('keydown', handleKeyDown);
          };
    },[filter])

    const openTaskForm = (folder) => {
        setForm((prevSate) => {
            return({
                ...prevSate,
                open: true,
                actualFolder: folder
            })
        })
    }

    return (
        <div className = {adding}
        onClick={() => openTaskForm(getFolder(filter))}>
            <span className="material-symbols-outlined">add</span>
        </div>
    )
}

export {AddButton}