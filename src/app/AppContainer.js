import React from "react";
import { Menu } from "./Menu";

function AppContainer({children}) {
    return <div className="app-container">
        <Menu></Menu>
        {children}
    </div>
}

export {AppContainer}