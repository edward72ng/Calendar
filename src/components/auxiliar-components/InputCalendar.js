import React, { useContext, useState } from "react";
import {DataContext} from '../../providers/DataContext'

function InputCalendar () {
    const {taskValue, setTaskValue} = useContext(DataContext)
    const [date, setDate] = useState('')
    
    return <div className="folder-list">
        <input type="date"
        value={date}
        onChange={(e)=>{setDate(e.target.value);}}></input>
        <span className="material-symbols-outlined"
        onClick={()=> setTaskValue({...taskValue, event: date})}>
        done</span>
    </div>
}

export {InputCalendar}