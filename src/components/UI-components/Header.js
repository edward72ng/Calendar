import React from "react";
import './header.css';

function Header ({children}) {

    return(<>
        <header className="head-container">
            <span>Task Management</span>
            <div>
            <span className="material-symbols-outlined">search</span>
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