import React,{useContext} from "react";
import {useAuth} from './auth'
import {DatesContext} from './datesContext'
function OneTodo ({id, content, details, updateBlocs}){
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
        <div className="container">
        <div className="container2">
            <div>
                <p className="content">{content}</p>
                <p className="details">{details}</p>
            </div>
            <div className="icons-container">
                <a className="waves-effect waves-light btn-small" onClick={()=>deleteTodo(id)}>
                    <i className="small material-icons">delete</i>
                </a>
                <a className="waves-effect waves-light btn-small" onClick={()=>editTodo(id)}>
                    <i className="small material-icons">edit</i>
                </a>
            </div>
        </div>
        <div className="line-div"></div>
        </div>
    )
}
export {OneTodo}