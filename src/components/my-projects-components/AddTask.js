import React, { useState } from "react";
import { CreateTask } from "./CreateTask";

function AddTask({dataValues, functions}) {
  const {id} = dataValues
  const {dispatchTasks, refreshTasks} = functions
  const [open, setOpen] = useState(false)

  if(!open){
    return <div className="add-task">
    <div>Añadir Tarea</div>
    <span className="material-symbols-outlined"
    onClick={() => setOpen(true)}>add</span>
  </div>
  }else{
    return <CreateTask 
    dataValues={dataValues}
    functions= {{...functions, setOpen}}></CreateTask>
  }
  
}

export  {AddTask};