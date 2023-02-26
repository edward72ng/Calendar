import React,{useContext, useState} from "react";
import {useAuth} from '../../providers/auth'
import { Options } from "../auxiliar-components/Options";
import { DataContext } from "../../providers/DataContext";
import { GaleryFromTask } from "./GaleryFromTask";
import { EditTask } from "./EditTask";
import { SubItem } from "./SubItem";
import { FunctionTasksContext } from "../../providers/FunctionTasks.provider";
import { ItemsContext } from "../../providers/ItemsContext";

function EditItem ({values, functions}){
    const {id, content, details, evento, sectionid, folderid, notifications} = values
  
    const {refreshTasks, dispatchTasks, setEdit} = functions
    const {updateAll} = useContext(ItemsContext)
    const {editTask, deleteTask} = useContext(FunctionTasksContext)

    const initialValues = {
      
      sectionid: sectionid? sectionid : null,
      content: content,
      details: details
    }
    const initialOptions = {
      folderid: folderid? folderid : null,
      event: evento? evento.event : '',
      date: "",
      time: "",
      notifications: notifications,
  } 


    
    const [options, setOptions] = useState(initialOptions)   
    const [editValues, setEditValues] = useState(initialValues)
    
    const sendEdit = () => {
      const newTask = {
        ...editValues,
        evento: {event: options.event},
        notifications: options.notifications
      }

      dispatchTasks({type: 'UPDATE', payload: {id: id, body: newTask}})
      setEdit(false)
      editTask({...values,...editValues, ...options}, refreshTasks)
    }

    const deleteItem = () => {
      console.log('Tet estas ejecutando?')
      dispatchTasks({type: 'DELETE', payload: {id: id}})
      setEdit(false)
      deleteTask(id, refreshTasks)
    }
    

   
    return (
      <div className="visual-container" data-id={id}>
            <span className="material-symbols-outlined"
            onClick={()=>{setEdit(false)}}>
            close</span>
            <span className="material-symbols-outlined"
            onClick={()=>{sendEdit()}}>
            done</span>
            
            <div className="visual-item-container">

              <div className="details-container"
              onClick={() => setEdit(true)}>
                <input className="edit-value"
                value={editValues.content}
                onChange={(e)=>setEditValues({...editValues, content: e.target.value})}></input>
                <textarea className="edit-value" 
                value={editValues.details}
                onChange={(e)=>setEditValues({...editValues, details: e.target.value})}></textarea>
                

                {evento
                ?
                <p className="details cont">{evento.event}
                  <i className="material-icons  nana">today</i>
                </p>
                :
                <></>
                }
                <Options 
                state={options} 
                setState={setOptions}/>
              
              </div>

    
            </div>

             


        <GaleryFromTask></GaleryFromTask>
        <span className="material-symbols-outlined"
            onClick={()=>{deleteItem()}}>
            delete</span>
            
      </div>
    )
}
export {EditItem}