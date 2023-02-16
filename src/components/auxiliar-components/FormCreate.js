import React, { useContext, useState } from "react";
import { DataContext } from "../../providers/DataContext";
import { FunctionTasksContext } from "../../providers/FunctionTasks.provider";
import { SubItem } from "../inbox-components/SubItem";
import { SubOptions } from "../my-projects-components/SubOptions";
import { Recomended } from "./Recomended";

const inboxUrl = '/api/v1/inboxtasks/'

function FormCreate ({functions}) {
    const {dispatchTasks, refreshTasks} = functions

    const { createTask } = useContext(FunctionTasksContext)
    const [content, setContent] = useState('')
    const [details, setDetails] = useState('')
    const [recomended, setRecomended] = useState(false)

    const setTask = () => {
        dispatchTasks({type: 'CREATE', payload:{ body: {content, details}}})
        setContent('')
        setDetails('')
        createTask({content, details}, () => {setTimeout(()=>{refreshTasks(inboxUrl)}, 2000)})
    }


    return <div className="formcreate-container">
        <span className="material-symbols-outlined"
        onClick={()=>{setTask()}}>done</span>
        <div className="form-container">
            <input className="edit-value" placeholder="contenido"
            value={content}
            onChange = { (e) => setContent(e.target.value)}></input>
            <textarea className="edit-value" placeholder="detalles"
            value={details}
            onChange = { (e) => setDetails(e.target.value)}></textarea>
            <SubItem></SubItem>
        </div>
    </div>
    {/*recomended && 
        <Recomended recomended={recomended}></Recomended>
*/}
    
   
} 

export {FormCreate}