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
        return <div style={
            {
            width: "24px",
            height: "24px",
            }
        }><i className="material-icons">notifications</i></div>
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
        setDayEvent,
        setDayNotifications,
    } = useContext(EventsContext)
    //par is content, impar is id
    return(
        <li key={day} 
        onClick ={()=>{
            setModalView(!modalView); 
            setDayEvent(notificate)
            setDayNotifications(notification)}}
        className={'mosaic-component'}
        style={isFirst()} >
        <div className="eje">
            <div className={istoday(day)}>{day}</div>
            {isNotification(notification)}
        </div>
           {
             notificate.map((no, i)=>{
                if((i>1)){
                    return(<div className={isNotify(notificate)}>{no.content}</div>)
                }
                
             })
           }
           
        </li>
    )
}

export {Mosaic}