import React, { useContext, useState } from "react";
import './SubItem.css'
import { ItemsContext } from "../../providers/ItemsContext";

function SubItem({values}) {
  const {updateInbox, updateAll} = useContext(ItemsContext)
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

    const generateSubTasks = async () =>{
      const res = await fetch('api/v1/subtasks/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({taskid: taskid})
      })
      const data = await res.json()
      console.log('GENERATE', data)
      setSubTask(data)
      updateInbox()
      updateAll()
    }

    const createSubTask = async () => {
      console.log(input)
      const res = await fetch('api/v1/subtasks/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(input)
      })
      const data = await res.json()
      console.log('CREADO', data)
      setSubTask([...subTask, input])
    }
console.log(subTask.length)
    return <div className="sub-item-container">
      {(subTask.length == 0) &&
        <div className="generate-button"
        onClick={generateSubTasks}>
        <span>Generar Subtareas</span>
        </div>
      }
      {
        subTask.map((elem, i) => {
          return (
          <div key={i} className="visual-item-container">
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
          onClick={createSubTask}>done</span>
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