import React from "react";
import {useFetch} from '../../app/useFetch'

function NotificationsForMe () {
    const [notification, setNotifications] = useFetch('')

    return <ul>
        {notification.map((elem)=>{
            return <></>
        })}
    </ul>
}

export {NotificationsForMe}