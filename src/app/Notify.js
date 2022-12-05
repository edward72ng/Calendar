import React, { useContext, useEffect, useState } from "react";
import {DatesContext} from './datesContext'
import {useAuth} from './auth'
import { useNavigate } from 'react-router-dom';

function Notify (){
    const {dateString} = useContext(DatesContext)
    const [tasks, setTasks] = useState([])
    const [notifi, setNotifi] = useState([])
    const navigate = useNavigate()
    const auth = useAuth()
    useEffect(()=>{
            if(auth.token){
                console.log('hay un token :D')
                console.log(auth.token)
                fetchTask()
                console.log('Montando componente')
              }else{
                console.log('No hay token :c')
                navigate('/')
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

    return(
        <div className="todos-container">
          <h5>ToDay</h5>
            <h6>Notify</h6>
            {
                notifi.map((notifi, i)=>{
                    return(<p key={i} className="content">{notifi.todo.content}</p>)
                })
            }
            <h6>Events</h6>
                {
                    tasks.map((task, i)=>{
                        return(<p key={i} className="content">{task.content}</p>)
                    })
                }
            <h6>List</h6>
                  
        </div>
    )
}

export {Notify}