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


    return <div className="inbox-container">
        <ul>
        {
            inbox.map((elem, i)=>{
                const {id, content, details, evento, sectionid} = elem
                return <OneItem key={id? id : i} 
                values={{id, content, details, evento, sectionid}}
                functions = {{refreshTasks, dispatchTasks}}>
                
                </OneItem>
            })
        }
        </ul>
        <Add>
            <FormCreate
            functions={{dispatchTasks, refreshTasks}}></FormCreate>
        </Add>
    </div>
}

export {Inbox}