import React from "react";
import './header.css';
import { Search } from "./Search";
import { Notifications } from "../header-components/Notifications";

function Header ({children}) {

    return(<>
        <header className="head-container">
            
            <span>Task Management</span>
            <div>
            <Search/>
            <Notifications/>
            </div>
        </header>
        <div className="view-container">
        {children}
        </div> 
    </>
    )
}

export {Header}

//<div className="after-head-container"></div>
//<span className="material-symbols-outlined">notifications</span>