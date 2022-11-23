import React from "react";

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
    return(
        <li key={day} onClick ={()=>click(day)}
        className={isNotify(notificate)+' '+istoday(day)}
        style={isFirst()} >
           {day}
        </li>
    )
}

export {Mosaic}