import React, { useState,useContext } from "react";
import {DataContext} from '../../providers/DataContext'

function InputAlarm () {
    const {taskValue, setTaskValue} = useContext(DataContext)
    const [alarms, setAlarms] = useState([])
    const [alarmDate, setAlarmDate] = useState('')
    const [alarmTime, setAlarmTime] = useState('')

    const deleteArrNotification = (indice) =>{
        let prevArr = []
        alarms.map((elem, i)=>{
          if(i != indice){
            prevArr.push(elem)
          }
        })
        setAlarms(
          prevArr
          ) 
    }

    const newNotification = (e)=> {
        e.preventDefault()
        if(alarmDate != "" && alarmTime != ""){
          setAlarms([...alarms, {time: alarmTime, date: alarmDate}])
          setAlarmTime("")
          setAlarmDate("")
        }
        setTaskValue({...taskValue, notifications: [...taskValue.notifications, {date: alarmDate, time: alarmTime}]})
      }

    return <div className="folder-list">

{
alarms.map((elem, i)=>{ 
    return (<li key={i}> 
    <input type="time" 
    value={elem.time} 
    onChange={()=>{console.log('no cambiare')}}></input> 
    <input type="date" 
    value={elem.date} 
    onChange={()=>{console.log('no cambiare')}}></input> 
    <span className="material-symbols-outlined" 
    onClick={()=>deleteArrNotification(i)}>delete</span> 
    </li>)})}


        <input type="date"
        value={alarmDate}
        onChange={(e)=>{setAlarmDate(e.target.value)}}></input>
        <input type="time"
        value={alarmTime}
        onChange={(e)=>{setAlarmTime(e.target.value)}}></input>
        <span className="material-symbols-outlined"
        onClick={(e)=>newNotification(e)}>add</span>
    </div>
}

export {InputAlarm}