import React, { useState } from "react";
import {EventsForMe} from './EventsForMe'
import {NotificationsForMe} from './NotificationsForMe'

function ForMe () {
    const [events, setEvents] = useState(true)

    return <div className="events-for-me-container">
        <div><span className="material-symbols-outlined">event</span></div>
        <div><span className="material-symbols-outlined">alarm</span></div>

        {events ?
        <EventsForMe></EventsForMe>
        :
        <NotificationsForMe></NotificationsForMe>
        }
    </div>
}

export {ForMe}