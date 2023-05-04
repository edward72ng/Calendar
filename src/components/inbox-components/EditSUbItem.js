import React, { useContext, useState } from "react";
import './SubItem.css'
import { ItemsContext } from "../../providers/ItemsContext";
import { Loading } from "../UI-components/Loading";
import { FunctionSubTaskContext } from "../../providers/FunctionSubItem.provider";

function EditSubItem({values, functions}) {
  const {editSubTask, deleteSubTask, generateSubTasks, createSubTask} = useContext(FunctionSubTaskContext)
  const {content, details,id, taskid, completed, mySubtasks} = values
  const {setIsEdit, dispatchTasks} = functions
  
  const initialValues = {
    content: content,
    details: details,

  }
  const [editValues, setEditValues] = useState(initialValues)

  const handleDone = () => {
    const newSubTasks = mySubtasks.map((elem)=>{
      if (elem.id == id){
        return {...elem, ...editValues};
    };
      return elem;
    })
    dispatchTasks({type: 'UPDATE', payload: {id: taskid, body: {mySubtasks: newSubTasks}}})
    editSubTask(id, editValues, (data) => {
 //editar el dispatch de subtareas
    })

    setIsEdit(false)
  }
   
          return(<div className="visual-item-container appear">
         

          <div className="details-container">
          <input className="edit-value"
                value={editValues.content}
                onChange={(e)=>setEditValues({...editValues, content: e.target.value})}></input>
                <textarea className="edit-value" 
                value={editValues.details}
                onChange={(e)=>setEditValues({...editValues, details: e.target.value})}></textarea>
          </div>

          <div className="icon-container">
          <span 
          className="material-symbols-outlined"
          onClick={handleDone}
          >
          done</span>
         
          </div>
      </div>);
}

export {EditSubItem}