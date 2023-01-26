import React,{useContext, useEffect, useState} from "react";
import { FunctionTasksContext } from "../providers/FunctionTasks.provider";
import {useAuth} from '../providers/auth'
import {DatesContext} from './datesContext'
function OneTodo ({id, content, details, refreshTasks, evento, sectionId}){
    const auth = useAuth()
    
    const [check, setCheck] = useState(false)
    const [expand, setExpand] = useState(false)

    const {inputEnabled,setInputEnabled,setValues, filter} = useContext(DatesContext)
    const {deleteTask} = useContext(FunctionTasksContext)

    const galeryData = [
    'https://th.bing.com/th/id/OIP.QAYBKECBqiLPuTScp3FZRwHaD4?pid=ImgDet&rs=1',
    'https://th.bing.com/th/id/OIP.QAYBKECBqiLPuTScp3FZRwHaD4?pid=ImgDet&rs=1',
    'https://th.bing.com/th/id/OIP.QAYBKECBqiLPuTScp3FZRwHaD4?pid=ImgDet&rs=1']

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
    setValues(
      {
        id: data.id,
        content: data.content,
        details: data.deatails,
        event: data.evento? data.evento.event: '',
        notifications: data.notifis
      }
    )
    setInputEnabled(!inputEnabled)
  })}
    return (
      <div className="task-container"  draggable="true"
      onDragStart={(e)=>
        {setValues(
        {
          section: sectionId,
          id: id,
        })
        console.log('ORIGEN', sectionId)
      }}
      onDragEnd={()=>{
        setValues(
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
                <a className="" onClick={()=>deleteTask(id, refreshTasks)}>
                    <i className="material-icons">delete</i>
                </a>
                <a className="" onClick={()=>editTodo(id)}>
                    <i className="material-icons">edit</i>
                </a>
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
        {(expand == true) && (
          <div className="galery-container">
          {
            galeryData.map((elem, i)=>{
              return (<div key={i} className="galery-item" style={{backgroundImage: "url("+elem+")"}}></div>)
            })
          }
        </div>
        )
          
        }
      </div>
    )
}
export {OneTodo}