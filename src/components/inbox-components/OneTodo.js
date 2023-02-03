import React,{useContext, useState} from "react";
import {useAuth} from '../../providers/auth'
import { Options } from "../my-projects-components/Options";
import { DataContext } from "../../providers/DataContext";
import { GaleryFromTask } from "./GaleryFromTask";
import { EditTask } from "./EditTask";

function OneTodo ({values, functions}){
    const {id, content, details, evento, sectionid} = values
    const sectionId = sectionid
    const {refreshTasks, dispatchTasks} = functions

    const auth = useAuth()
    
    const [check, setCheck] = useState(false)
    const [expand, setExpand] = useState(false)
    const [option,setOption] = useState(false)
    const [edit, setEdit] = useState(false)
    
    const {setTaskValue, setForm} = useContext(DataContext)

    const editTodo= (id)=>{
      fetch('/api/v1/inbox/your-todos/'+ id, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + auth.token,
        }
      }).then((res)=>res.json())
      .then((data)=>{
      setTaskValue(
        {
          id: data.id,
          content: data.content,
          details: data.details,
          event: data.evento? data.evento.event: '',
          notifications: data.notifis,
          folderid: null,
          assignedto: null
        }
      )
      setForm(true)
    })}

    if(edit){
      return <EditTask
      values={{id, content, details, evento, sectionid}}
      functions={{refreshTasks, setEdit, dispatchTasks}}></EditTask>
    }

    return (
      <div className="task-container"  draggable="true"
      onDragStart={(e)=>
        {setTaskValue(
        {
          section: sectionId,
          id: id,
        })
        console.log('ORIGEN', sectionId)
      }}
      onDragEnd={()=>{
        setTaskValue(
        {
          id:null,
          content: '',
          details: '',
          event: '',
          notifications: [],
        })
        setTimeout(()=>refreshTasks(), 1000)
        
        }}>

        <div className="one-todo">
            <div className="row center-item">
            
                {check ?
                  <i className="material-icons"
                  onClick={()=>setCheck(false)}
                  >check_box</i>
                :
                  <i className="material-icons"
                  onClick={()=>setCheck(true)}
                  >check_box_outline_blank</i>
                }

                <div>
                <p className="content">{content}</p>
                <p className="details">{details}</p>
                {evento
                ?
                <p className="details cont">{evento.event}
                  <i className="material-icons  nana">today</i>
                </p>
                :
                <></>
                }
                </div>
            </div>

            <div className="icons-container">
                <a className="" onClick={()=>/*editTodo(id)*/setEdit(!edit)}>
                    <i className="material-icons">edit</i>
                </a>
                <span className="material-symbols-outlined"
                onClick={()=>{setOption(!option)}}>more_vert</span>
                {
                  expand?
                  <a
                  onClick={()=>setExpand(!expand)}>
                    <i className="material-icons">expand_less</i>
                  </a>
                  :
                  <a
                  onClick={()=>setExpand(!expand)}>
                    <i className="material-icons">expand_more</i>
                  </a>
                }
            </div>
            <div className="avatar-home-container"></div>    
        </div>

        { expand && <GaleryFromTask></GaleryFromTask> }

        {option &&
        <Options 
        open={option} setOpen={setOption} 
        functions={{refreshTasks, id, dispatchTasks}}></Options>
        }

      </div>
    )
}
export {OneTodo}