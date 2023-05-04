import React, { useState } from "react";
import { EditSubItem } from "./EditSUbItem";
import { VisualSubItem } from "./VisualSubItem";

function OneSubItem ({values, functions}) {
    const [isEdit, setIsEdit] = useState(false)
    const {dispatchTasks} = functions
    if (isEdit){
        return <EditSubItem values={values} functions={{setIsEdit, dispatchTasks}}/>
    }
    return (<VisualSubItem values={values} functions={{setIsEdit, dispatchTasks}}/>);
}

export {OneSubItem}
//mySubtasks
//mySubtasks