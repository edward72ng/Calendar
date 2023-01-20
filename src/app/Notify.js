import React, { useContext, useEffect, useState } from "react";
import {DatesContext} from './datesContext'
import {useAuth} from './auth'
import { useNavigate } from 'react-router-dom';
import {OneTodo} from './OneTodo'
import {InputModal} from './InputModal'
import {useFetch} from './useFetch'
import { AppContainer } from "./AppContainer";
function Notify (){
  const {dateString} = useContext(DatesContext)
  const [input, setInput] = useState(false)
  const [mount, setMounth] = useState(0)
  const auth = useAuth()
  const {inputEnabled,setInputEnabled,setValues} = useContext(DatesContext)
  const [events, updateEvents] = useFetch('api/v1/events/day-events/'+dateString)
  const [notifications, updateNotifications] = useFetch('api/v1/notifications/notification-today/'+dateString)
  const navigate = useNavigate()
    
  useEffect(()=>{
            if(auth.token == false){
                navigate('/')
              }else{
                updateEvents();
                updateNotifications();
              }
        } ,[])
        
   
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
        <AppContainer>
          <div className="home-container">
          <h4>ToDay</h4>
            {(notifications.length != 0) && <h5>Notify</h5>}
            {
                notifications.map((notifi, i)=>{
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
            {(events.length != 0) && <h5>Events</h5>}
                {
                    events.map((task, i)=>{
                        return(<OneTodo key={i} 
                          editFunction = {editTodo} 
                          deleteFunction = {deleteTodo} 
                          content={task.content} 
                          details={task.deatails} 
                          id={task.id}></OneTodo>      )
                    })
                }
            {(events.length == 0 && notifications.length == 0) &&
              <>
              <img src="./assets/today.png"/>
              <h5>No tienes nada par hoy :D</h5>
              </>
            }
  
                  
        </div>
        </AppContainer>
    )
}

export {Notify}