import React , { useContext, useState } from "react"
import { DataContext } from "../../providers/DataContext"
import { FunctionTasksContext } from "../../providers/FunctionTasks.provider"
import { ItemsContext } from "../../providers/ItemsContext"
import { SubItem } from "../inbox-components/SubItem"


function CreateTask ({functions, dataValues}) {
    const {filter} = useContext(DataContext)
    const { updateAll} = useContext(ItemsContext)
    const {id} = dataValues
    const {dispatchTasks, refreshTasks, setOpen} = functions
    const { createTask } = useContext(FunctionTasksContext)
    const initialState= {
        folderid: filter,
        sectionid: id ,
        content: '',
        details: ''
    }
    const [values, setValues] = useState(initialState)


    const setTask = () => {
        dispatchTasks({type: 'CREATE', payload:{body: values}})
        
        createTask(values, async () => {
            const res = await fetch(`api/v1/inbox/find-one`,{
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body:  JSON.stringify({content: values.content}),
            })
            const data = await res.json()

            dispatchTasks({type:'SETID', payload:{content: data.content, id: data.id}})
        })
        setValues(initialState)
    }


    return <div className="createtask-container">
        <span className="material-symbols-outlined"
        onClick={()=>{setOpen(false)}}>close</span>
        <span className="material-symbols-outlined"
        onClick={()=>{setTask()}}>done</span>
        <div className="form-container">
            <input className="edit-value" placeholder="contenido"
            value={values.content}
            onChange = { (e) => setValues({...values, content: e.target.value})}></input>
            <textarea className="edit-value" placeholder="detalles"
            value={values.details}
            onChange = { (e) => setValues({...values, details: e.target.value})}></textarea>
            <SubItem></SubItem>
        </div>
    </div>
    {/*recomended && 
        <Recomended recomended={recomended}></Recomended>
*/}
    
   
} 

export {CreateTask}