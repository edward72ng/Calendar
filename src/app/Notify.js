import React, { useContext, useEffect, useState } from "react";
import {DatesContext} from './datesContext'
import {useAuth} from './auth'
import { useNavigate } from 'react-router-dom';
import {OneTodo} from './OneTodo'
import {InputModal} from './InputModal'
function Notify (){
    const {dateString} = useContext(DatesContext)
    const [input, setInput] = useState(false)
    const [mount, setMounth] = useState(0)
    const {inputEnabled,setInputEnabled,setValues} = useContext(DatesContext)
    const [tasks, setTasks] = useState([])
    const [notifi, setNotifi] = useState([])
    const navigate = useNavigate()
    const auth = useAuth()
    
    useEffect(()=>{
            if(auth.token == false){
                navigate('/')
              }else{
                fetchTask()
              }
        } ,[])
        
   

    const fetchTask = ()=>{
        fetch('api/v1/events/day-events/'+dateString, { /*Debemos dar el dia como url*/
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + auth.token,
            }
          }).then(res => res.json())
          .then(data => { setTasks(data/*[0].tareas*/)})
          fetch('api/v1/notifications/notification-today/'+dateString, { /*Debemos dar el dia como url*/
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + auth.token,
            }
          }).then(res => res.json())
          .then(data => { setNotifi(data)})
    }
    const deleteTodo= (id)=>{
      fetch('/api/v1/inbox/your-todos/'+ id, {
          method: 'DELETE',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + auth.token,
          }
        }).then(()=>{
          setMounth(mount + 1)
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
  setMounth(mount-1)
  setInput(!input)
})}
    return(
        <div className="container">
          <h4>ToDay</h4>
            <h5>Notify</h5>
            {
                notifi.map((notifi, i)=>{
                    return(
                    <OneTodo key={i} 
                      editFunction = {editTodo} 
                      deleteFunction = {deleteTodo} 
                      content={notifi.todo.content} 
                      details={notifi.todo.deatails} 
                      id={notifi.todo.id}></OneTodo>
                    )
                })
            }
            <h5>Events</h5>
                {
                    tasks.map((task, i)=>{
                        return(<OneTodo key={i} 
                          editFunction = {editTodo} 
                          deleteFunction = {deleteTodo} 
                          content={task.content} 
                          details={task.deatails} 
                          id={task.id}></OneTodo>      )
                    })
                }
            <h6>List</h6>

            {input && <InputModal 
                input={input} 
                setInput={setInput} 
                mount={mount} 
                setMounth={setMounth}  
                ></InputModal>}
  <i className='material-icons adding' 
  onClick={()=>{setInputEnabled(!inputEnabled);setInput(!input)}}>add</i>
                  
        </div>
    )
}

export {Notify}