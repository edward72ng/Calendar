import React, { useState } from "react";
import { Contactlist } from "../auxiliar-components/ContactList";
import { FoldersList } from "../auxiliar-components/FoldersList";
import { InputAlarm } from "../auxiliar-components/InputAlarm";
import { InputCalendar } from "../auxiliar-components/InputCalendar";

function SubOptions ({children}) {
    const [folders, setFolders] = useState(false)
    const [contacts, setContacts] = useState(false)
    const [calendar, setCalendar] = useState(false)
    const [alarm, setAlarm] = useState(false)
    return <>
        <li className="option-item"
        onClick={() => setCalendar(!calendar)}>
            <span className="material-symbols-outlined">calendar_month</span>
            <span>calendario</span>
        </li>
        <li className="option-item"
        onClick={() => setAlarm(!alarm)}>
            <span className="material-symbols-outlined">timer</span>
            <span>Alarma</span>
        </li>
        <li className="option-item"
        onClick={() => setFolders(!folders)}>
        <span className="material-symbols-outlined">drive_file_move</span>
            <span>Folder</span>
           
        </li>
        <li className="option-item"
        onClick={() => setContacts(!contacts)}>
            <span className="material-symbols-outlined">assignment_ind</span>
            <span>Asignar</span>
        </li>
        {children}
        {folders &&
            <FoldersList></FoldersList>
        }
        {contacts &&
            <Contactlist></Contactlist>
        }
        {calendar &&
            <InputCalendar></InputCalendar>
        }
        {alarm &&
            <InputAlarm></InputAlarm>
        }
    </>
}

export {SubOptions}