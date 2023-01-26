import React, { useContext } from "react";
import { DatesContext } from "../../app/datesContext";

function EventsForMe () {
    const {dateString} = useContext(DatesContext)
    const [event, setevent] = useFetch(`api/v1/events/day-events/${dateString}`)

    return <ul>
        {event.map((elem)=>{
            return <></>
        })}
    </ul>
}

export {EventsForMe}