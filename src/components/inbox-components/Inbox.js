import React from "react";
import { OneTodo } from "./OneTodo";
import { UseFetch } from "../../custom-hooks/useFetch";
import { useFetchItems } from "../../custom-hooks/useFetchItems";


function Inbox () {
    const [inboxTasks, dispatchTasks, refreshTasks] = useFetchItems('/api/v1/inboxtasks/')

    return <div><ul>
        {inboxTasks &&
            inboxTasks.map((elem)=>{
                const {id, content, details, evento, sectionid} = elem
                return <OneTodo key={id} 
                values={{id, content, details, evento, sectionid}}
                functions = {{refreshTasks, dispatchTasks}}>
                
                </OneTodo>
            })
        }
    </ul></div>
}

export {Inbox}