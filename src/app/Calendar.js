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
    var dayFirst = new Date(year, month, 1)
    var dayFirstday = dayFirst.getDay() 
    const {modalView, setModalView, dayEvent} = useContext(EventsContext)
    const navigate = useNavigate()
    const auth = useAuth()
    useEffect(()=>{
        if(auth.token){
            console.log('hay un token :D')
            console.log(auth.token)
            console.log('Montando componente')
          }else{
            console.log('No hay token :c')
            navigate('/')
          }
    },[])
    
    return(
        <div className="container">
        <div>
            <button id="preview"> prewiew </button>
        <h2 className="month" id="month">{months[month]}</h2>
        <button id="next"> next </button>
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
            <ol className="ol-list">
            <Meses first={dayFirstday}>

            </Meses>
            </ol>
        </div>

        {!!modalView&&(
            <Modal>
                <div>
            <ol>
            {dayEvent.map((task)=>{
                    return(<li>{'value :  ' + task.toString()}</li>)
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