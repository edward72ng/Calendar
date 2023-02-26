import React, { useContext, useEffect, useState } from "react";
import { OneTodo } from "./OneTodo";
import { UseFetch } from "../../custom-hooks/useFetch";
import { useFetchItems } from "../../custom-hooks/useFetchItems";
import { Add } from "../auxiliar-components/Add";
import { FormTask } from "../auxiliar-components/FormTask";
import { OneItem } from "./OneItem";
import { FormCreate } from "../auxiliar-components/FormCreate";
import { ItemsContext } from "../../providers/ItemsContext";


function Inbox () {
    const {inbox, dispatchInbox: dispatchTasks, updateInbox: refreshTasks} = useContext(ItemsContext)
    const [form, setForm] = useState(false)
    const [isClosing, setIsClosing] = useState(false)

    const closeForm = () => {
        setIsClosing(true)
        setTimeout(()=>{
            setForm(false)
        }, 1000)
    }
    const openForm = () => {
        setIsClosing(false)
        setForm(true)
    }
    console.log(inbox)
    return <div className="inbox-container">
        <ul>
        {
            inbox.map((elem, i)=>{
                const {id, content, details, evento, sectionid, notifications} = elem
                return <OneItem key={id? id : 'provitionalKey'} 
                values={{id, content, details, evento, sectionid, notifications}}
                functions = {{refreshTasks, dispatchTasks}}>
                
                </OneItem>
            })
        }
        </ul>
        {(form && !isClosing) &&
        <div className="adding"
        onClick={closeForm}>
            <span className="material-symbols-outlined">close</span>
        </div>
        }
        {(!form || isClosing) &&
        <div className="adding"
        onClick={openForm}>
            <span className="material-symbols-outlined">add</span>
        </div>
        }
    {form && 
    <FormCreate
    values = {{isClosing}}
    functions={{dispatchTasks, refreshTasks, setForm}}></FormCreate>
    }
        
    </div>
}

export {Inbox}