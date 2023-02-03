import React from "react";
import { UseFetch } from "../../custom-hooks/useFetch";
import { useAuth } from "../../providers/auth";

function PendingNotifications () {
    const [pending, setPending] = UseFetch('/api/v1/user/notifications')
    const auth = useAuth()

    const confirmNotification = async (destino, origen) => {
        await fetch('api/v1/contacts', {
            method: 'POST',
            body: JSON.stringify({
                contactId: origen
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + auth.token,
            }
        })
    }
    console.log(pending)
    return <div className="profile-container">
        <ul>
            {
                pending.map((elem, i) => {
                    return <li key={elem.id}> {elem.message} 
                    <span className="material-symbols-outlined"
                    onClick={() => confirmNotification(elem.userid, elem.origin)}>check_circle</span>
                    <span className="material-symbols-outlined">delete</span></li>
                })
            }
        </ul>
    </div>
}

export {PendingNotifications}