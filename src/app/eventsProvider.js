import React, { useState } from "react";

const EventsContext = React.createContext()
function EventsProvider ({children}){

    const [modalView, setModalView] = useState(false)
    const [dayEvent, setDayEvent] = useState([false])
    const [dayNotifications, setDayNotifications] = useState([])
    return (
     <EventsContext.Provider value = {{
        modalView,
        setModalView,
        dayEvent,
        setDayEvent,
        dayNotifications,
        setDayNotifications
     }}>
        {children}
     </EventsContext.Provider>   
    )
}

export {EventsContext, EventsProvider}