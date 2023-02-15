import React,{useContext, useState} from "react";
import {useAuth} from '../../providers/auth'
import { Options } from "../my-projects-components/Options";
import { DataContext } from "../../providers/DataContext";
import { GaleryFromTask } from "./GaleryFromTask";
import { EditTask } from "./EditTask";
import { SubItem } from "./SubItem";
import { FunctionTasksContext } from "../../providers/FunctionTasks.provider";

function EditItem ({values, functions}){
    const {id, content, details, evento, sectionid} = values
    const sectionId = sectionid
    const {refreshTasks, dispatchTasks, setEdit} = functions

    const {editTask} = useContext(FunctionTasksContext)

    const initialValues = {
      content: content,
      details: details
    }
    const [editValues, setEditValues] = useState(initialValues)
    
    const sendEdit = () => {
      dispatchTasks({type: 'UPDATE', payload: {id: id, body: editValues}})
      setEdit(false)
      editTask({...values,...editValues}, refreshTasks)
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

      </div>
    )
}
export {EditItem}