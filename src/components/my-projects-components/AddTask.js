import React, { useContext, useState } from "react";
import { TaskModalContext } from "../../providers/TaskModalContext";
import { ItemsContext } from "../../providers/ItemsContext";
import { DataContext } from "../../providers/DataContext";

function AddTask({dataValues, functions}) {
  const section = dataValues

  const {getFolder} = useContext(ItemsContext);
    const {setForm} = useContext(TaskModalContext)
    const {filter} = useContext(DataContext)

  const openForm =  () => {
    setForm((prevSate) => {
      return({
        ...prevSate,
        open: true,
        actualFolder: getFolder(filter),
        actualSection: section
      })
    })
  }

  return <div className="add-task">
    <div>Añadir Tarea</div>
    <span className="material-symbols-outlined"
    onClick={() => openForm()}>add</span>
  </div>

  
}

export  {AddTask};