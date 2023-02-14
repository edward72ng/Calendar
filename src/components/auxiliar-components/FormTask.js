import React, { useContext, useState } from "react";
import { DataContext } from "../../providers/DataContext";
import { FunctionTasksContext } from "../../providers/FunctionTasks.provider";
import { SubOptions } from "../my-projects-components/SubOptions";
import { Recomended } from "./Recomended";

function FormTask ({functions}) {
    const {dispatchTasks, refreshTasks} = functions

    const { createTask } = useContext(FunctionTasksContext)
    const [content, setContent] = useState('')
    const [details, setDetails] = useState('')
    const [recomended, setRecomended] = useState(false)

    const setTask = () => {
        dispatchTasks({type: 'CREATE', payload:{body: {content, details}}})
        setContent('')
        setDetails('')
        createTask({content, details}, refreshTasks)
    }
    const handleClick = async () => {
        const res = await fetch('http://127.0.0.1:8000/input/',{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({
                question: content
              }),
        })
        const data = await res.json()
        console.log(data)
        setRecomended(data)
    }

    return <div className="center-container">
         <div className="form-task-container">
        <div className="form-task">
            <input className="input-task" placeholder="contenido"
            value={content}
            onChange = { (e) => setContent(e.target.value)}></input>
            <input className="input-task" placeholder="detalles"
            onClick = {handleClick}
            value={details}
            onChange = { (e) => setDetails(e.target.value)}></input>
        </div>
        <div className="options-container-horizontal">
            <SubOptions>
            <li 
            onClick={()=>setTask()}
            className="option-item">
            <span className="material-symbols-outlined">send</span>
            <span>Enviar</span>
        </li>
            </SubOptions>
        </div>
    </div>
    {recomended && 
        <Recomended recomended={recomended}></Recomended>
    }
    </div> 
    
   
} 

export {FormTask}