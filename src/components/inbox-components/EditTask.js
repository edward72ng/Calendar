import React, { useContext, useState } from "react";
import { FunctionTasksContext } from "../../providers/FunctionTasks.provider";
import { SubOptions } from "../my-projects-components/SubOptions";

function EditTask ({values, functions}) {
    const {id, content: contentVal,
        details: detailsVal,
    evento: eventVal} = values;
    const {refreshTasks, setEdit, dispatchTasks} = functions

    const {editTask} = useContext(FunctionTasksContext)

    const [content, setContent] = useState(contentVal);
    const [details, setDetails] = useState(detailsVal);

    const sendTask = () => {
        dispatchTasks({type:'UPDATE', payload: {id: id, body: {content, details}}})
        setEdit(false)
        editTask({id, content, details}, refreshTasks)
    } 

    return <div>
        <div className="form-task-container">
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
            onClick={sendTask}
            className="option-item">
            <span className="material-symbols-outlined">send</span><span>Enviar</span>
            </li>
            <li 
            onClick={()=>setEdit(false)}
            className="option-item">
            <span className="material-symbols-outlined">cancel</span><span>Cancelar</span>
            </li>
            </SubOptions>
        </div>
    </div>
}

export {EditTask}