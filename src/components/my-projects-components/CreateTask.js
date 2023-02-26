import React , { useContext, useState } from "react"
import { DataContext } from "../../providers/DataContext"
import { FunctionTasksContext } from "../../providers/FunctionTasks.provider"
import { FunctionSectionsContext } from "../../providers/FuntionSeccions.provider"
import { ItemsContext } from "../../providers/ItemsContext"
import { Options } from "../auxiliar-components/Options"
import { SubItem } from "../inbox-components/SubItem"


function CreateTask ({functions, dataValues}) {
    const {filter} = useContext(DataContext)
    const { updateAll} = useContext(ItemsContext)
    const {id, section, tasksInSections, orders} = dataValues
    const {dispatchTasks, refreshTasks, setOpen} = functions
    const { createTask } = useContext(FunctionTasksContext)
    const { editSection } = useContext(FunctionSectionsContext)
    const initialState= {
        id: 'provitionalId',
        folderid: filter,
        sectionid: id ,
        content: '',
        details: ''
    }
    const initialOptions = {
            event: "",
            date: "",
            time: "",
            notifications: [],
        } 

    const [values, setValues] = useState(initialState)
    const [options, setOptions] = useState(initialOptions)


    const setTask = () => {
        const copyTasks = tasksInSections
        const newTask = {
            ...values,
            evento: {
                event: options.event
            },
            notifications: options.notifications
        }
        console.log('NEW TASK', newTask)
        const sendTask = {
            ...values,
            ...options,
        }
        copyTasks.push(newTask)
        console.log('COPIA FINAL',copyTasks)
        const copyOrder = orders.split("|")
        copyOrder.push(values.id)
        const orderString = copyOrder.join("|")

        dispatchTasks({type: 'UPDATE', payload:{id:id ,body: {tasksInSections: copyTasks, orders: orderString}}})
        
        delete sendTask.id

        createTask(sendTask, async () => {
            const res = await fetch(`api/v1/inbox/find-one`,{
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body:  JSON.stringify({content: values.content}),
            })
            const data = await res.json()
            console.log(data)
            copyTasks.pop()
            const tasksWithNew = copyTasks
            tasksWithNew.push(data)
            const orderwithId = orders.split("|")
            orderwithId.push(data.id)
            const orderString = orderwithId.join("|")
            dispatchTasks({type:'UPDATE', payload:{id: id, body: {tasksInSections: tasksWithNew, orders: orderString}}})
            editSection(id, {orders: orderString}, ()=>{})
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
            <Options 
            state={options}
            setState={setOptions}
            />
        </div>
    </div>
    {/*recomended && 
        <Recomended recomended={recomended}></Recomended>
*/}
    
   
} 

export {CreateTask}