import React, { useContext, useState } from "react";
import './SubItem.css'
import { ItemsContext } from "../../providers/ItemsContext";
import { Loading } from "../UI-components/Loading";
import { FunctionSubTaskContext } from "../../providers/FunctionSubItem.provider";

function VisualSubItem({values, functions}) {
  const {editSubTask, deleteSubTask, generateSubTasks, createSubTask} = useContext(FunctionSubTaskContext)
  const {content, details,id, taskid, completed, mySubtasks} = values
  const {setIsEdit, dispatchTasks} = functions



    const handleDelete = (id) =>{
      const newSubTasks = mySubtasks.filter((elem)=>{
        return elem.id !== id;
      })
      dispatchTasks({type: 'UPDATE', payload: {id: taskid, body: {mySubtasks: newSubTasks}}})
      deleteSubTask(id, () => {

      })
    }

    const handleEdit = () => {
        setIsEdit(true)
    }


   
          return(<div className="visual-item-container">
          {completed ?
            <i className="material-icons"
            >check_circle</i>
          :
            <i className="material-icons"
            >radio_button_unchecked</i>
          }

          <div className="details-container">
          <p className="content">{content}</p>
          <p className="details">{details}</p>
          </div>

          <div className="icon-container">
          <span 
          className="material-symbols-outlined"
          onClick={handleEdit}
          >
          edit</span>
          <span 
          className="material-symbols-outlined"
          onClick={()=>{handleDelete(id)}}>
          delete</span>
          </div>
      </div>);
}

export {VisualSubItem}