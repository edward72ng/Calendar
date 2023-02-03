import React, { useContext } from "react";
import { UseFetch } from "../../custom-hooks/useFetch";
import { DataContext } from "../../providers/DataContext";

function Contactlist() {
    const {taskValue, setTaskValue} = useContext(DataContext)
    const [contacts, updateContacts] = UseFetch('/api/v1/contacts')
   
    
    return  <ul className="folder-list">
    {contacts.map((elem)=>{
        return <li key={elem.uid}
        onClick = {()=> setTaskValue({...taskValue, assignedto: elem.uid})}>
        {elem.user}</li>
    })}
    </ul>
}

export {Contactlist}