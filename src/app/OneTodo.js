import React,{useContext, useState} from "react";
import {useAuth} from './auth'
import {DatesContext} from './datesContext'
function OneTodo ({id, content, details, updateBlocs, evento, children}){
    const auth = useAuth()
    const {inputEnabled,setInputEnabled,setValues} = useContext(DatesContext)
    const [check, setCheck] = useState(false)
    const [expand, setExpand] = useState(false)

    const deleteTodo= (id)=>{
        fetch('/api/v1/inbox/your-todos/'+ id, {
            method: 'DELETE',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + auth.token,
            }
          }).then(()=>{
            updateBlocs()//los contextos se deben de enviar a un usse efect, los estados y custom hooks no
          })
    }

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
        <div className="one-todo"
        draggable="true"
        onDragStart={()=>setValues(
          {
            id: id,
          }
        )}
        onDragEnd={()=>setValues(
          {
            id:null,
            content: '',
            details: '',
            event: '',
            notifications: [],
          }
        )}>
        
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
            <div className="avatar-home-container"></div>

            <div className="icons-container">
                <a className="" onClick={()=>deleteTodo(id)}>
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
        </div>
        
    )
}
export {OneTodo}