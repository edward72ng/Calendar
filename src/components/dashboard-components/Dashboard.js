import React, { Children } from "react";
import {EventsCard} from './EventsCard'
import { FoldersCard } from "./FoldersCard";
import {NotificationsCard} from './NotificationsCard'
import './Dashboard.css'
import { Tittle } from "./Tittle";
import { TagsSlider } from "./TagsSlider";
const today = [
{content: 'Lorem Ipsun', details: 'dolor ipsun folum', image:'https://th.bing.com/th/id/OIP.QAYBKECBqiLPuTScp3FZRwHaD4?pid=ImgDet&rs=1'},
{content: 'Lorem Ipsun', details: 'dolor ipsun folum', image:'https://th.bing.com/th/id/OIP.QAYBKECBqiLPuTScp3FZRwHaD4?pid=ImgDet&rs=1'},
{content: 'Lorem Ipsun', details: 'dolor ipsun folum', image:'https://th.bing.com/th/id/OIP.QAYBKECBqiLPuTScp3FZRwHaD4?pid=ImgDet&rs=1'}]

function Dashboard ({children}) {
    
    return <div className="dashboard-container">
        <Tittle></Tittle>

        <FoldersCard></FoldersCard>
        <TagsSlider></TagsSlider>
        
        <div className="today-cards">
        <div className="cards-container">
        <span>Eventos del Dia</span>
            <EventsCard></EventsCard>
        </div>

        
        <div className="cards-container">
        <span>Notificaciones del Dia</span>
           <NotificationsCard></NotificationsCard>
        </div>

        </div>
        
        {children}

    </div>
}

export {Dashboard}