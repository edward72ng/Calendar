import React, { useContext, useState } from "react";
import './SubItem.css'
import { ItemsContext } from "../../providers/ItemsContext";
import { Loading } from "../UI-components/Loading";
import { FunctionSubTaskContext } from "../../providers/FunctionSubItem.provider";
import { OneSubItem } from "./OneSubItem";

function SubItem({values, functions}) {
  const {dispatchTasks} = functions
  const {updateInbox, updateAll} = useContext(ItemsContext)
  const {editSubTask, deleteSubTask, generateSubTasks, createSubTask} = useContext(FunctionSubTaskContext)
  const {subTasks, taskid} = values
    console.log(values)
    const inputDefault = {
      taskid: taskid,
      content: '',
      details: '',
    }

    const [subTask, setSubTask] = useState(subTasks)
    const [add, setAdd] = useState(false) 
    const [input, setInput] = useState(inputDefault)
    const [ loadingGenerate, setLoadingGenerate] = useState(false) 

    const handleGenerate = async () =>{
      setLoadingGenerate(true)
      generateSubTasks(taskid, (data) => {
        dispatchTasks({type: 'UPDATE', payload: {id: taskid, body: {mySubtasks: [...subTasks, data]}}})
        setLoadingGenerate(false)
      })
      updateInbox()
      updateAll()
    }

    const handleCreate = async () => {
      console.log(input)
      dispatchTasks({type: 'UPDATE', payload: {id: taskid, body: {mySubtasks: [...subTasks, input]}}})
      
      createSubTask(input, taskid, (data) => {
        console.log('recuperando ID')
        dispatchTasks({type: 'UPDATE', payload: {id: taskid, body: {mySubtasks: [...subTasks, data]}}})
      })
    }


console.log(subTask.length)
    return <div className="sub-item-container">
      {(subTask.length == 0) &&
        <div className="generate-button"
        onClick={handleGenerate}>
          {
            loadingGenerate ?
            <Loading/>
            :
            <span>Generar Subtareas</span>
          }
        </div>
      }
      {
        subTasks.map((elem, i) => {
          return (<OneSubItem 
            key={i} 
            values={{...elem, mySubtasks: subTasks}}
            functions={{dispatchTasks}}
            />)
          })
      }
      {add ?
        <div className="create-sub-item">
          <input 
          value={input.content}
          placeholder="contenido"
          onChange={(e) => setInput({...input, content: e.target.value})}/>
          <input 
          value={input.details}
          placeholder="detalles"
          onChange={(e) => setInput({...input, details: e.target.value})}/>
          <div className="cancel-sub-item">
          <span className="material-symbols-outlined"
          onClick={handleCreate}>done</span>
          <span className="material-symbols-outlined"
          onClick={() => setAdd(false)}
          >close</span>
          </div>
        </div>
        :
        <div className="add-sub-item"
        onClick={() => setAdd(true)}>
          <span >Nueva Subtarea</span>
          <span className="material-symbols-outlined">add</span>
        </div>
      }
      
    </div>
}

export {SubItem}
/**
 * <input className="edit-value"
                value={editValues.content}
                onChange={(e)=>setEditValues({...editValues, content: e.target.value})}></input>
                <textarea className="edit-value" 
                value={editValues.details}
                onChange={(e)=>setEditValues({...editValues, details: e.target.value})}></textarea>
 */