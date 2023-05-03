import React, { useContext, useState } from "react";
import './SubItem.css'
import { ItemsContext } from "../../providers/ItemsContext";
import { Loading } from "../UI-components/Loading";
import { FunctionSubTaskContext } from "../../providers/FunctionSubItem.provider";

function SubItem({values}) {
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
        setSubTask(data)
        setLoadingGenerate(false)
      })
      updateInbox()
      updateAll()
    }

    const handleCreate = async () => {
      console.log(input)
      setSubTask([...subTask, input])
      createSubTask(input, taskid, (data) => {

      })
    }

    const handleDelete = (id) =>{
      //dispatch que lo elimine del estado
      deleteSubTask(id, () => {
        
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
        subTask.map((elem, i) => {
          return (
          <div key={i} className="visual-item-container appear">
          {elem.completed ?
            <i className="material-icons"
            >check_circle</i>
          :
            <i className="material-icons"
            >radio_button_unchecked</i>
          }

          <div className="details-container">
          <p className="content">{elem.content}</p>
          <p className="details">{elem.details}</p>
          </div>

          <div className="icon-container">
          <span 
          className="material-symbols-outlined"
          onClick={()=>{handleDelete(elem.id)}}>
          delete</span>
          </div>
      </div>)
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