import React, { useContext } from "react";
import { UseFetch } from "../../custom-hooks/useFetch";
import { DataContext } from "../../providers/DataContext";

const image = 'https://th.bing.com/th/id/OIP.QAYBKECBqiLPuTScp3FZRwHaD4?pid=ImgDet&rs=1'

function NotificationsCard () {
    const {getToday} = useContext(DataContext)
    const [notification, updateNotification] = UseFetch(`api/v1/notifications/notification-today/${getToday()}`)

    if (notification.length < 1){
        return <div className="cards-item">
            <p className="content">No tienes nada para hoy :D</p>
        </div>
    }

    return <ul>
        {notification.map((elem)=>{
            return <div key={elem.id} className='cards-item'>
                <p className="content">{elem.todo.content}</p>
                <p className="details">{elem.todo.details}</p>
                <span>{elem.folderid}</span>
                    <div className="galery-container">
                        <div  className="galery-item" style={{backgroundImage: "url("+image+")"}}></div>
                        <div  className="galery-item" style={{backgroundImage: "url("+image+")"}}></div>
                        <div  className="galery-item" style={{backgroundImage: "url("+image+")"}}></div>
                    </div>
            </div>
        })}
    </ul>
}

export {NotificationsCard}