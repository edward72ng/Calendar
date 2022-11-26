import React, { useState } from "react";

const NotifyContext = React.createContext()
function NotifyProvider ({children}){

    const [modalView, setModalView] = useState(false)
    const [dayTask, setDayTask] = useState([])
    return (
     <NotifyContext.Provider value = {{
        modalView,
        setModalView,
        dayTask,
        setDayTask
     }}>
        {children}
     </NotifyContext.Provider>   
    )
}

export {NotifyProvider, NotifyContext}