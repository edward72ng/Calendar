import React, { useContext } from "react";
import {NotifyContext} from './notifyContext'


function DayView(){
    const {dayTask} = useContext(NotifyContext)

    return (
        <div>
            <ol>
                {dayTask.map((task)=>{
                    <li>{task}</li>
                })}
            </ol>
        </div>
    )
}

export {DayView}