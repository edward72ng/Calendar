import React, { useContext, useState } from "react";
import {Form} from "./Form"
import {useAuth} from "./auth"
import { DatesContext } from "./datesContext";
function InputModal({input, setInput, mount, setMounth}) {
    const {values, setValues} = useContext(DatesContext)
    const [contentTodo,setContentTodo] = useState(values.content)
    const [detailsTodo, setDetailsTodo] = useState(values.details)
    const [id, setId] = useState(values.id)
    const [date, setDateEvent] = useState(values.event)
    const [arrNotifications, setArrNotifications] = useState(values.notifications)
    const [changeTime, setChangeTime] = useState('')
    const [changeDate, setChangeDate] = useState('')
    const auth = useAuth()
    const addTodo = (e) => {
        e.preventDefault()
        let notificationsSend = []
        if(changeDate != "" && changeTime != ""){
          notificationsSend = [...arrNotifications, {time: changeTime, date: changeDate}]
        }else{
          notificationsSend = arrNotifications
        }
        if (id){
          fetch('/api/v1/inbox/your-todos/'+id, {
            method: 'PUT',
            body: JSON.stringify({
              content: contentTodo,
              deatails: detailsTodo,
              event: date,
              notifications: notificationsSend,
            }),
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + auth.token,
            }
          }).then(()=> {
            setId(null)
            setContentTodo('')
            setDetailsTodo('')
            setArrNotifications([])
            setDateEvent('')
            setChangeDate('')
            setChangeTime('')
            })
        }
        if (id == null){
          fetch('/api/v1/inbox/your-todos', {
            method: 'POST',
            body: JSON.stringify({
              content: contentTodo,
              deatails: detailsTodo,
              event: date,
              notifications: notificationsSend,
            }
            ),
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + auth.token,
            }
          }).then(()=> {
            setId(null)
            setContentTodo('')
            setDetailsTodo('')
            setArrNotifications([])
            setDateEvent('')
            setChangeDate('')
            setChangeTime('')
            })
        }  
    }

    const newNotification = (e)=> {
      e.preventDefault()
      if(changeDate != "" && changeTime != ""){
        setArrNotifications([...arrNotifications, {time: changeTime, date: changeDate}])
        setChangeTime("")
        setChangeDate("")
      }
    }


      const deleteArrNotification = (indice) =>{
        
        let prevArr = []
        arrNotifications.map((elem, i)=>{
          if(i != indice){
            prevArr.push(elem)
          }
        })
     
        setArrNotifications(
          prevArr
          )
        
      }
    const closeModal = () =>{
        setMounth(mount + 1)
        setInput(!input)
    }

    return(
    <div className="input-enabled">
        <Form execSubmit={addTodo}>
            <input type="text" 
            onChange={(e)=>{setContentTodo(e.target.value)}} 
            value={contentTodo}></input>
            <input type="text" 
            onChange={(e)=>{setDetailsTodo(e.target.value)}}
            value={detailsTodo}></input>
            <input type="date" 
            onChange={(e)=>{setDateEvent(e.target.value)}}
            value={date}></input>
            <label>Notifications</label>
            {values.notifications.map((elem, i)=>{
                return (<li key={i}>
                    <input type="time" 
                    value={elem.time}
                    onChange={()=>{console.log('no cambiare')}}></input>
                    <input type="date" 
                    value={elem.date}
                    onChange={()=>{console.log('no cambiare')}}></input>
                    <i className="material-icons" onClick={()=>deleteArrNotification(i)}>clear</i>
                        </li>)
            })}
            <input type="time" 
            onChange={(e)=>{setChangeTime(e.target.value)}}
            value={changeTime}></input>
            <input type="date" 
            onChange={(e)=>{setChangeDate(e.target.value)}}
            value={changeDate}></input>
            <i className="material-icons" onClick={newNotification}>add</i>
        </Form>
        <i className="material-icons" onClick={closeModal}>cancel</i>
    </div>
    )
}

export {InputModal}