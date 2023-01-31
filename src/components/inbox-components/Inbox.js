import React from "react";
import { UseFetch } from "../../app/useFetch";


function Inbox () {
    const [inboxTasks, updateInboxTasks] = UseFetch('/api/v1/inboxtasks/')

    return <div><ul>
        {
            inboxTasks.map((elem)=>{
                return <li key={elem.id}>
                    <p className="content">{elem.content}</p>
                <p className="details">{elem.details}</p>
                </li> 
            })
        }
    </ul></div>
}

export {Inbox}