import React, { useContext, useEffect, useState } from "react";
import {DatesContext} from './datesContext'
import {useAuth} from './auth'
import {OneTodo} from './OneTodo'
function Notify (){
    const {dateString} = useContext(DatesContext)
    const [tasks, setTasks] = useState([])
    const [notifi, setNotifi] = useState([])
    useEffect(()=>{
        fetchTask()
    },[])

    const fetchTask = ()=>{
        fetch('api/v1/events/day-events/2022-12-31', { /*Debemos dar el dia como url*/
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',

            }
          }).then(res => res.json())
          .then(data => { setTasks(data[0].tareas)})
          fetch('api/v1/notifications/notification-today/2022-12-06', { /*Debemos dar el dia como url*/
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',

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