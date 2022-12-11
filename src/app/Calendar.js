import React, { useContext, useEffect, useState } from "react";
import {Modal} from './modal'
import {EventsContext} from './eventsProvider'
import {useAuth} from './auth'
import {Meses} from './Meses'
import { useNavigate } from 'react-router-dom';

function Calendar (){
    var months = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']
    var date = new Date()
    var month = date.getMonth()
    var year = date.getFullYear()
    const [countMonth, setCountMonth] = useState(0)
    const {modalView, setModalView, dayEvent, dayNotifications} = useContext(EventsContext)
    const navigate = useNavigate()
    const auth = useAuth()
    const getElemMonth = (month)=>{
        if(month > 11){
            return ((month -1) % 11)
        }else if(month < 0){
            return month + 12
        }else{
            return month
        }
    }
    useEffect(()=>{
        if(auth.token == false){
            navigate('/')
          }

    },[])
    
    return(
        <div className="container">
        <div className="around">
            <i onClick={()=>{setCountMonth(countMonth-1)}} className="waves-effect material-icons">navigate_before</i>
            <h5 className="month" id="month">{months[getElemMonth(month + countMonth)]}</h5>
            <i onClick={()=>{setCountMonth(countMonth+1)}} className="waves-effect material-icons">navigate_next</i>
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
            <Meses first={new Date(year, month + countMonth, 1).getDay()} cMonth = {countMonth} getElemMonth= {getElemMonth}>
            </Meses>
            </ol>
        </div>

        {!!modalView&&(
            <Modal>
                <div className="modal-table">
            <ol>
                <h5>Eventos</h5>
            {dayEvent.map((task)=>{
                    return(<>
                    <li>{'value :  ' + task.toString()}</li>
                    <div className="divider"></div>
                    </>)
                })}
            </ol>
            <ol>
                <h5>Notificaciones</h5>
                {dayNotifications.map((task)=>{
                    return(
                    <>
                    <li>{'value :  ' + task.toString()}</li>
                    <div className="divider"></div>
                    </>
                    )
                })}
            </ol>
            <button onClick={()=>{setModalView(!modalView)}}>quitar modal</button>
        </div>
                             
            </Modal>
        )}
    </div>
    )
}
export {Calendar}