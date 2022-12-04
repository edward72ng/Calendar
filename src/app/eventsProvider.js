import React, { useState } from "react";

const EventsContext = React.createContext()
function EventsProvider ({children}){

    const [modalView, setModalView] = useState(false)
    const [dayEvent, setDayEvent] = useState([false])
    return (
     <EventsContext.Provider value = {{
        modalView,
        setModalView,
        dayEvent,
        setDayEvent
     }}>
        {children}
     </EventsContext.Provider>   
    )
}

export {EventsContext, EventsProvider}