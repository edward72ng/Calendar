import React from "react";
import { Add } from "../auxiliar-components/Add";
import { Avatar } from "./Avatar";
import { Notifications } from "./Notifications";
import { Search } from "./Search";

function Header ({children}) {

    return <div className="viewer-container">
    <header className="header-container">
        <ul className="header-list">
            <li className="header-item">
                <span className="material-symbols-outlined">menu</span>
            </li>
            <Search></Search>
        </ul>
        <ul className="header-list">
            <Notifications></Notifications>
            <Avatar></Avatar>
        </ul>
    </header>
    {children}
    <Add></Add>
    </div>
}

export {Header}