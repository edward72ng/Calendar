import React, { useContext } from "react";
import {NotifyContext} from './notifyContext'

function Mosaic ({day, first, notificate, today}){

    const isFirst = ()=>{
        if (day == 1){
            return {gridColumnStart: first }
        }else{
            return {gridColumnStart: "auto"}
        }
        
    }

    const isNotify = (val)=>{
        if (val[0]){
            return 'notificate'
        }else{
            return 'notnotificate'
        }
    }
   
    const istoday = (d)=>{
        if(d == today){
            return "today"
        }
        else{
            return "nottoday"
        }
    }
    
    const {modalView,
        setModalView,
        setDayTask
    } = useContext(NotifyContext)
    //par is content, impar is id
    return(
        <li key={day} onClick ={()=>{setModalView(!modalView); setDayTask(notificate)}}
        className={isNotify(notificate)+' '+istoday(day)}
        style={isFirst()} >
           {day}
           <p>{notificate[2]}</p>
        </li>
    )
}

export {Mosaic}