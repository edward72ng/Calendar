import React from "react";
import { OneTodo } from "../../app/OneTodo";
import { UseFetch } from "../../app/useFetch";


function Inbox () {
    const [inboxTasks, updateInboxTasks] = UseFetch('/api/v1/inboxtasks/')

    return <div><ul>
        {
            inboxTasks.map((elem)=>{
                return <OneTodo key={elem.id} 
                id={elem.id} 
                content={elem.content} 
                details ={elem.details} 
                evento={elem.evento} 
                refreshTasks= {updateInboxTasks}
                sectionId={elem.sectionid}>
                
                </OneTodo>
            })
        }
    </ul></div>
}

export {Inbox}