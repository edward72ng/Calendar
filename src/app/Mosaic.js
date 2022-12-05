import React, { useContext } from "react";
import {EventsContext} from './eventsProvider'
function Mosaic ({day, first, notificate, today, notification}){

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
   const isNotification = (val)=>{
    if(val[0]){
        return <span style={{backgroundColor: "red"}}>{val[1]}</span>
    }else{
        return ""
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
        setDayEvent
    } = useContext(EventsContext)
    //par is content, impar is id
    return(
        <li key={day} onClick ={()=>{setModalView(!modalView); setDayEvent(notificate)}}
        className={'mosaic-component'}
        style={isFirst()} >
           <p className={istoday(day)}>{day}</p>
           {isNotification(notification)}
           <p className={isNotify(notificate)}>{notificate[2]}</p>
        </li>
    )
}

//<span style={{backgroundColor: "red"}}>camp</span>
//campana notificacion
export {Mosaic}