import React, { useContext } from "react";
import {FunctionTasksContext} from '../../providers/FunctionTasks.provider'
import { SubOptions } from "./SubOptions";

function Options ({open, setOpen, functions}) {
    const {refreshTasks, id, dispatchTasks} = functions
    const {deleteTask, } = useContext(FunctionTasksContext)

    const sendTask = () => {
        dispatchTasks({type: 'DELETE', payload: {id: id}})
        deleteTask(id, refreshTasks)
    }

    return <div className="options-container">
        <ul>
            
            <li className="option-item">
            <span className="material-symbols-outlined">edit</span>
            <span>Editar</span>
            </li>
            <SubOptions></SubOptions>
            <li className="option-item"
            onClick={() => setOpen(!open)}>
            <span className="material-symbols-outlined">close</span>
            <span>Cerrar</span>
            </li>
            <li className="option-item"
            onClick={sendTask}>
            <span className="material-symbols-outlined">delete</span>
            <span>Borrar</span>
            </li>
           
        </ul>
    </div>
}

export {Options}