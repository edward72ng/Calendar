import React from "react";
import './header.css';
import { Search } from "./Search";

function Header ({children}) {

    return(<>
        <header className="head-container">
            
            <span>Task Management</span>
            <div>
            <Search/>
            <span className="material-symbols-outlined">notifications</span>
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