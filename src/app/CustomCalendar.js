import React, { useContext, useState } from "react";
import {Mosaics} from './Mosaics'
import {Modal} from './modal'
import {NotifyContext} from './notifyContext'
function CustomCalendar (){
    //const [todos,setTodos] = useState
    var months = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']
    var date = new Date()
    var day = date.getDay()
    var dat = date.getDate()
    var month = date.getMonth()
    var year = date.getFullYear()
    var dateString = String(dat) + String(month)+ String(year)
    var dateNext = new Date(year, month+1, 0)
    var qMonth = dateNext.getDate()
    var dayFirst = new Date(year, month, 1)
    var dayFirstday = dayFirst.getDay() 
    const {modalView, setModalView, dayTask} = useContext(NotifyContext)
    //var qMonth = String(qMonth)
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
             <Mosaics first={dayFirstday}>

             </Mosaics>
            </ol>
        </div>

        {!!modalView&&(
            <Modal>
                <div>{'value: '+dayTask[0].toString()}</div>
                <button onClick={()=>{setModalView(!modalView)}}>quitar modal</button>
            </Modal>
        )}
    </div>
    )
}
export {CustomCalendar}