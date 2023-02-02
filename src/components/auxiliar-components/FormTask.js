import React, { useContext, useState } from "react";
import { DataContext } from "../../providers/DataContext";
import { FunctionTasksContext } from "../../providers/FunctionTasks.provider";
import { SubOptions } from "../my-projects-components/SubOptions";

function FormTask () {
    const {taskValue, setTaskValue} = useContext(DataContext)
    const { createTask } = useContext(FunctionTasksContext)
    const [content, setContent] = useState(taskValue.content)
    const [details, setDetails] = useState(taskValue.details)

    const setTask = () => {
        createTask({content, details})
    }


    return <div className="center-container">
         <div className="form-task-container">
        <div className="form-task">
            <input className="input-task" placeholder="contenido"
            value={content}
            onChange = { (e) => setContent(e.target.value)}></input>
            <input className="input-task" placeholder="detalles"
            value={details}
            onChange = { (e) => setDetails(e.target.value)}></input>
        </div>
        <div className="options-container-horizontal">
            <SubOptions>
            <li 
            onClick={()=>setTask('')}
            className="option-item">
            <span className="material-symbols-outlined">send</span>
            <span>Enviar</span>
        </li>
            </SubOptions>
        </div>
    </div>
    </div> 
    
   
} 

export {FormTask}