import React, { useContext, useEffect, useState } from "react";
import {Form} from "./Form"
import {useAuth} from "./auth"
import { DatesContext } from "./datesContext";
import { UseFetch } from "./useFetch";
import {Modal} from "./modal"
function InputModal() {
    const {values, setValues, inputEnabled,setInputEnabled} = useContext(DatesContext)
    const [contentTodo,setContentTodo] = useState(values.content)
    const [detailsTodo, setDetailsTodo] = useState(values.details)
    const [id, setId] = useState(values.id)
    const [date, setDateEvent] = useState(values.event)
    const [arrNotifications, setArrNotifications] = useState(values.notifications)
    const [changeTime, setChangeTime] = useState('')
    const [changeDate, setChangeDate] = useState('')
    const auth = useAuth()
    const [folder, updateFolders] = UseFetch('http://localhost:3000/api/v1/folders')
    useEffect(()=>{
      updateFolders()
    },[])
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
        setValues({
          id: null,
          content: '',
          details: '',
          event: '',
          notifications: []    
        })
        setInputEnabled(!inputEnabled)
    }
    const move = (value) =>{
      fetch('http://localhost:3000/api/v1/folders/'+value,{
        method: 'POST',
        body: JSON.stringify({
          todoId: id
        }),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + auth.token,
        }
      }).then(()=>{
        closeModal()
      })
    }

    return(
      <Modal>
   
      <div className="modal-table">
        <Form execSubmit={addTodo}>
          <h5>Contenido</h5>
            <input type="text" 
            onChange={(e)=>{setContentTodo(e.target.value)}} 
            value={contentTodo}
            placeholder="contenido"></input>
            <input type="text" 
            onChange={(e)=>{setDetailsTodo(e.target.value)}}
            value={detailsTodo}
            placeholder="detalles"></input>
            <h5>Evento</h5>
            <input type="date" 
            onChange={(e)=>{setDateEvent(e.target.value)}}
            value={date}></input>
            <h5>Notificaciones</h5>
            {arrNotifications.map((elem, i)=>{
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
            <ol>
            {
              folder.map((elem, i)=>{
                return (
                  <li key={i} className="hover item"
                  onClick={()=>move(elem.id)}>
                    <i className="material-icons" >folder</i>
                  {elem.name}</li>
                )
              })
            }
        </ol>
        </Form>
        </div>
        
    
    </Modal>
    )
}

export {InputModal}