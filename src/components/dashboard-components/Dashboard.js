import React from "react";
import {EventsCard} from './EventsCard'
import {NotificationsCard} from './NotificationsCard'
const today = [
{content: 'Lorem Ipsun', details: 'dolor ipsun folum', image:'https://th.bing.com/th/id/OIP.QAYBKECBqiLPuTScp3FZRwHaD4?pid=ImgDet&rs=1'},
{content: 'Lorem Ipsun', details: 'dolor ipsun folum', image:'https://th.bing.com/th/id/OIP.QAYBKECBqiLPuTScp3FZRwHaD4?pid=ImgDet&rs=1'},
{content: 'Lorem Ipsun', details: 'dolor ipsun folum', image:'https://th.bing.com/th/id/OIP.QAYBKECBqiLPuTScp3FZRwHaD4?pid=ImgDet&rs=1'}]

function Dashboard () {
    
    return <div className="dashboard-container">
        <h1 className="tittle">Hí, John Doe</h1>

        <span>Eventos del Dia</span>
        <div className="cards-container">
            <EventsCard></EventsCard>
        </div>

        <span>Eventos Asignados</span>
        <div className="cards-container">
           <NotificationsCard></NotificationsCard>
        </div>

    </div>
}

export {Dashboard}