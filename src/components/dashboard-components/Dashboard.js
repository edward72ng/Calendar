import React from "react";
import {EventsCard} from './EventsCard'
import { FoldersCard } from "./FoldersCard";
import {NotificationsCard} from './NotificationsCard'
import './Dashboard.css'
import { Tittle } from "./Tittle";
import { TagsSlider } from "./TagsSlider";

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