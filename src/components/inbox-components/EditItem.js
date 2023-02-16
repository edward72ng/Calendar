import React,{useContext, useState} from "react";
import {useAuth} from '../../providers/auth'
import { Options } from "../my-projects-components/Options";
import { DataContext } from "../../providers/DataContext";
import { GaleryFromTask } from "./GaleryFromTask";
import { EditTask } from "./EditTask";
import { SubItem } from "./SubItem";
import { FunctionTasksContext } from "../../providers/FunctionTasks.provider";
import { ItemsContext } from "../../providers/ItemsContext";

function EditItem ({values, functions}){
    const {id, content, details, evento, sectionid, folderid} = values
  
    const {refreshTasks, dispatchTasks, setEdit} = functions
    const {updateAll} = useContext(ItemsContext)
    const {editTask, deleteTask} = useContext(FunctionTasksContext)

    const initialValues = {
      folderid: folderid? folderid : null,
      sectionid: sectionid? sectionid : null,
      content: content,
      details: details
    }
    const [editValues, setEditValues] = useState(initialValues)
    
    const sendEdit = () => {
      dispatchTasks({type: 'UPDATE', payload: {id: id, body: editValues}})
      setEdit(false)
      editTask({...values,...editValues}, refreshTasks)
    }

    const deleteItem = () => {
      dispatchTasks({type: 'DELETE', payload: {id: id}})
      setEdit(false)
      deleteTask(id, refreshTasks)
    }
    

   
    return (
      <div className="visual-container">
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
                <SubItem></SubItem>
              
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