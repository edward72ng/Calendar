import React, { Children } from "react";
import {EventsCard} from './EventsCard'
import { FoldersCard } from "./FoldersCard";
import {NotificationsCard} from './NotificationsCard'
const today = [
{content: 'Lorem Ipsun', details: 'dolor ipsun folum', image:'https://th.bing.com/th/id/OIP.QAYBKECBqiLPuTScp3FZRwHaD4?pid=ImgDet&rs=1'},
{content: 'Lorem Ipsun', details: 'dolor ipsun folum', image:'https://th.bing.com/th/id/OIP.QAYBKECBqiLPuTScp3FZRwHaD4?pid=ImgDet&rs=1'},
{content: 'Lorem Ipsun', details: 'dolor ipsun folum', image:'https://th.bing.com/th/id/OIP.QAYBKECBqiLPuTScp3FZRwHaD4?pid=ImgDet&rs=1'}]

function Dashboard ({children}) {
    
    return <div className="dashboard-container">
        <h1 className="tittle">Hí, John Doe</h1>

        <FoldersCard></FoldersCard>

        <span>Eventos del Dia</span>
        <div className="cards-container">
            <EventsCard></EventsCard>
        </div>

        <span>Notificaciones del Dia</span>
        <div className="cards-container">
           <NotificationsCard></NotificationsCard>
        </div>

        {children}

    </div>
}

export {Dashboard}