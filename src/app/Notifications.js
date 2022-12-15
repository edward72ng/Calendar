import React from "react";

function Notifications({arr, time, date}) {
    return(
        <ul> Notificaciones
    {
    arr.value.map((obj,i)=>{
        return (
        <li key={i}> 
            <input type="time" 
            value={obj.time} 
            onChange={() => console.log('no quiero cambiar datos')}> 
            </input>
            <input type="date" 
            value={obj.date} 
            onChange={() => console.log('no quiero cambiar datos')}>
            </input>
            <a onClick={()=>arr.deleteOne(i)}>-</a>
        </li>)
      })
    }
        <li key="finally">
            <input type="time"
            onChange={time.set} 
            value={time.value}>
            </input>
            <input type="date"
            onChange={date.set} 
            value={date.value}>
            </input>
        </li>
        <a onClick={arr.newNotification}>+</a>
  </ul>
    )
}

export {Notifications}