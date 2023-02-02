import React from "react";
import { OneTodo } from "./OneTodo";
import { UseFetch } from "../../app/useFetch";


function Inbox () {
    const [inboxTasks, updateInboxTasks] = UseFetch('/api/v1/inboxtasks/')

    return <div><ul>
        {
            inboxTasks.map((elem)=>{
                const {id, content, details, evento, sectionid} = elem
                return <OneTodo key={id} 
                values={{id, content, details, evento, sectionid}}
                functions = {updateInboxTasks}>
                
                </OneTodo>
            })
        }
    </ul></div>
}

export {Inbox}