import React, { useContext, useEffect, useState } from "react";
import {Modal} from './modal'
import {EventsContext} from './eventsProvider'
import {useAuth} from './auth'
import {Meses} from './Meses'
import { useNavigate } from 'react-router-dom';
import {DatesContext} from './datesContext'
import {InputModal} from './InputModal'
import {OneTodo} from './OneTodo'
function Calendar (){
    const [input, setInput] = useState(false)
    const [mount, setMounth] = useState(0)
    const {inputEnabled,setInputEnabled,setValues} = useContext(DatesContext)
    const {getElemMonth, month, year, afterBefore, setAfterBefore} = useContext(DatesContext)
    const {modalView, setModalView, dayEvent, dayNotifications} = useContext(EventsContext)
    const navigate = useNavigate()
    const auth = useAuth()
    var months = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']
    useEffect(()=>{
        if(auth.token == false){
            navigate('/')
          }

    },[])
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
        <div className="around">
            <i onClick={()=>{setAfterBefore(afterBefore-1)}} className="waves-effect material-icons">navigate_before</i>
            <h5 className="month" id="month">{months[getElemMonth(month + afterBefore)]}</h5>
            <i onClick={()=>{setAfterBefore(afterBefore+1)}} className="waves-effect material-icons">navigate_next</i>
        </div>

        <div className="days">
            <ol className="ol-list">
                <li className="mosaic">Sun</li>
                <li className="mosaic" >Mon</li>
                <li className="mosaic">Tue</li>
                <li className="mosaic">Wed</li>
                <li className="mosaic">Thu</li>
                <li className="mosaic">Fry</li>
                <li className="mosaic">Sat</li>
            </ol>
            <ol className="ol-list mosaics-container">
            <Meses first={new Date(year, month + afterBefore, 1).getDay()} cMonth = {afterBefore} getElemMonth= {getElemMonth}>
            </Meses>
            </ol>
        </div>

        {!!modalView&&(
            <Modal>
                <div className="modal-table">
            <ol>
                <h5>Eventos</h5>
            {dayEvent.map((task, i)=>{
                if(i > 1){
                    return(<OneTodo key={i} 
                        editFunction = {editTodo} 
                        deleteFunction = {deleteTodo} 
                        content={task.content} 
                        details={task.details} 
                        id={task.id}></OneTodo>)
                }
                   
                })}
            </ol>
            <ol>
                <h5>Notificaciones</h5>
                {dayNotifications.map((task, i)=>{
                    if(i > 1){
                        return(<OneTodo key={i} 
                            editFunction = {editTodo} 
                            deleteFunction = {deleteTodo} 
                            content={task.content} 
                            details={task.details} 
                            id={task.id}></OneTodo>)
                    }
                })}
            </ol>
            <button onClick={()=>{setModalView(!modalView)}}>quitar modal</button>
        </div>
                             
            </Modal>
        )}
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
export {Calendar}