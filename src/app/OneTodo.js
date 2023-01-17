import React,{useContext} from "react";
import {useAuth} from './auth'
import {DatesContext} from './datesContext'
function OneTodo ({id, content, details, updateBlocs, evento, children}){
    const auth = useAuth()
    const {inputEnabled,setInputEnabled,setValues} = useContext(DatesContext)
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
          <div className="space-between">
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
            <div className="icons-container">
                <a className="" onClick={()=>deleteTodo(id)}>
                    <i className="material-icons">delete</i>
                </a>
                <a className="" onClick={()=>editTodo(id)}>
                    <i className="material-icons">edit</i>
                </a>
            </div>
          </div>
          {children}
        </div>
        
    )
}
export {OneTodo}