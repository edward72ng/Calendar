import React, { useContext, useEffect, useState } from "react";
import {Modal} from './modal'
import {EventsContext} from './eventsProvider'
import {useAuth} from './auth'
import {Meses} from './Meses'
import { useNavigate } from 'react-router-dom';
import {DatesContext} from './datesContext'

function Calendar (){
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