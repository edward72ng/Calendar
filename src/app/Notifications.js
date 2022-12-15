import React from "react";

function Notifications({arr, notification}) {
    return(
        <ul> Notificaciones
    {
    arr.map((obj,i)=>{
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
            {/*<a onClick={()=>deleteArrNotification(i)}>-</a>*/}
        </li>)
      })
    }
        <li key="finally">
            <input type="time" name='hora' 
            onChange={handleChangeTime} 
            value={changeTime}></input>
            <input type="date" name='fecha' 
            onChange={notification.set} 
            value={notification.value}></input>
        </li>
        <a onClick={newNotification}>+</a>
  </ul>
    )
}

return Notifications