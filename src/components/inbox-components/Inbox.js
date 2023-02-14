import React from "react";
import { OneTodo } from "./OneTodo";
import { UseFetch } from "../../custom-hooks/useFetch";
import { useFetchItems } from "../../custom-hooks/useFetchItems";
import { Add } from "../auxiliar-components/Add";
import { FormTask } from "../auxiliar-components/FormTask";
import { OneItem } from "./OneItem";


function Inbox () {
    const [inboxTasks, dispatchTasks, refreshTasks] = useFetchItems('/api/v1/inboxtasks/')

    return <div className="inbox-container">
        <ul>
        {inboxTasks &&
            inboxTasks.map((elem, i)=>{
                const {id, content, details, evento, sectionid} = elem
                return <OneItem key={id? id : i} 
                values={{id, content, details, evento, sectionid}}
                functions = {{refreshTasks, dispatchTasks}}>
                
                </OneItem>
            })
        }
        </ul>
        <Add>
            <FormTask
            functions={{dispatchTasks, refreshTasks}}></FormTask>
        </Add>
    </div>
}

export {Inbox}