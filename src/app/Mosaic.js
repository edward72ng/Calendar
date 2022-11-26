import React, { useContext } from "react";
import {NotifyContext} from './notifyContext'

function Mosaic ({day, first, notificate, today}){

    const click = (val)=>{alert('hola elemento'+val)}

    const isFirst = ()=>{
        if (day == 1){
            return {gridColumnStart: first }
        }else{
            return {gridColumnStart: "auto"}
        }
        
    }

    const isNotify = (val)=>{
        if (val){
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
        setModalView
    } = useContext(NotifyContext)
    return(
        <li key={day} onClick ={()=>{setModalView(!modalView)}}
        className={isNotify(notificate)+' '+istoday(day)}
        style={isFirst()} >
           {day}
        </li>
    )
}

export {Mosaic}