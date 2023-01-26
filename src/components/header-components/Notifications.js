import React, { useState } from "react";
import { PendingNotifications } from "./PendingNotifications";

function Notifications () {
    const [open, setOpen] = useState(false)

    return <li className="header-item"
    onClick={() => setOpen(!open)}>
        <span className="material-symbols-outlined">notifications</span>
        {open &&
            <PendingNotifications></PendingNotifications>
        }
    </li>
}

export {Notifications}