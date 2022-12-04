import React, { useContext, useState } from "react";
import {Mosaics} from './Mosaics'
import {Modal} from './modal'
import {EventsContext} from './eventsProvider'
import {Meses} from './Meses'
function Calendar (){
    var months = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']
    var date = new Date()
    var month = date.getMonth()
    var year = date.getFullYear()
    var dayFirst = new Date(year, month, 1)
    var dayFirstday = dayFirst.getDay() 
    const {modalView, setModalView,} = useContext(EventsContext)

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
                <p>modal</p>
            </ol>
            <button onClick={()=>{setModalView(!modalView)}}>quitar modal</button>
        </div>
                             
            </Modal>
        )}
    </div>
    )
}
export {Calendar}