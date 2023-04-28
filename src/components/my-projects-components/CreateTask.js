import React , { useContext, useState } from "react"
import { DataContext } from "../../providers/DataContext"
import { FunctionTasksContext } from "../../providers/FunctionTasks.provider"
import { FunctionSectionsContext } from "../../providers/FuntionSeccions.provider"
import { ItemsContext } from "../../providers/ItemsContext"
import { Options } from "../auxiliar-components/Options"
import {EventModal} from '../auxiliar-components/EventModal'
import {NotificationsModal} from '../auxiliar-components/NotiificationsModal'

function CreateTask ({functions, dataValues}) {
    const {filter} = useContext(DataContext)
    const { updateAll} = useContext(ItemsContext)
    const {id, section, tasksInSections, orders} = dataValues
    const {dispatchTasks, refreshTasks, setOpen} = functions
    const { createTask } = useContext(FunctionTasksContext)
    const { editSection } = useContext(FunctionSectionsContext)
    const initialValues= {
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

    const [values, setValues] = useState(initialValues)
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

        const sendTask = {
            ...values,
            ...options,
        }

        copyTasks.push(newTask)

        const copyOrder = orders.split("|")
        copyOrder.push(values.id)
        const orderString = copyOrder.join("|")

        dispatchTasks({type: 'UPDATE', payload:{id:id ,body: {tasksInSections: copyTasks, orders: orderString}}})
        
        createTask(sendTask,(data) => {
            const newOrder = orders.split("|") 
            newOrder.push(data.id)
            const stringOrder = newOrder.join("|")
            editSection(id, {orders: stringOrder}, () => {
                updateAll()
            })
        })
        setValues(initialValues)
    }
    const handleEvent = (event) => {
        setOptions((prevState) => ({
          ...prevState,
          event: event
        }))
      }
      const handleNotifications = (notifications) => {
        setOptions(() => ({
          ...prevState,
          notifications: notifications
        }))
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
        <div className="added-to-item">
        
            <EventModal functions={{handleAdd: handleEvent}} values={{event: options.event}}/>
            <NotificationsModal functions={{handleAdd: handleNotifications}} values={{notifications: options.notifications}}/>
        </div>
            
        </div>
    </div>
    {/*recomended && 
        <Recomended recomended={recomended}></Recomended>
*/}
    
   
} 

export {CreateTask}

/**
 * const res = await fetch(`api/v1/inbox/find-one`,{
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
 */