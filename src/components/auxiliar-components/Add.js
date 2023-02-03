import React, { useContext } from "react";
import { DataContext } from "../../providers/DataContext";
import { FormTask } from "./FormTask";

function Add ({children}) {
    const {form, setForm, setDefault} = useContext(DataContext)

    return <>
    {form ?
    <div className="adding"
    onClick={() => {setForm(false); setDefault()}}>
        <span className="material-symbols-outlined">cancel</span>
    </div>
    :
    <div className="adding"
    onClick={() => {setForm(true)}}>
        <span className="material-symbols-outlined">add</span>
    </div>
    }
    {form &&
        <>{children}</>
    }
    </>
}

export {Add}