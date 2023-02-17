import React, { useContext } from "react";
import { DataContext } from "../../providers/DataContext";
import { Add } from "../auxiliar-components/Add";
import { Avatar } from "./Avatar";
import { Notifications } from "./Notifications";
import { Search } from "./Search";

function Header ({children}) {
    const {activeMenu, setActiveMenu} = useContext(DataContext)


    return <div className="viewer-container">
    <header className="header-container">
        <ul className="header-list">
            <Search></Search>
        </ul>
        <ul className="header-list">
            <Notifications></Notifications>
            <Avatar></Avatar>
        </ul>
    </header>
    {children}
    </div>
}

export {Header}