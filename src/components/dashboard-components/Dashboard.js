import React, { useContext, useState } from "react";
import {EventsCard} from './EventsCard'
import { FoldersCard } from "./FoldersCard";
import {NotificationsCard} from './NotificationsCard'
import './Dashboard.css'
import { Tittle } from "./Tittle";
import { TagsSlider } from "./TagsSlider";
import { ItemsContext } from "../../providers/ItemsContext";


function Dashboard ({children}) {
  const {timeBlock, dispatchTimeBlock} = useContext(ItemsContext)
  console.log(timeBlock)

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
        
        <div className="day-calendar">
      <div className="hour-labels">
        {Array.from(Array(24).keys()).map((hour) => (
          <div key={hour} className="hour-label">{hour}:00</div>
        ))}
      </div>
      <div className="hour-blocks">
        {Array.from(Array(24).keys()).map((hour) => (
          <div key={hour} className="hour-block">
            {timeBlock.map((elem, index) => {
              if (hour >= parseInt(elem.timeblockstart) && hour < parseInt(elem.timeblockend)) {
                return (
                  <div
                    key={index}
                    className="hour-block-event"
                    
                  >
                    {elem.content}
                  </div>
                );
              }
              return null;
            })}
          </div>
        ))}
      </div>
     
    </div>

        {children}

    </div>
}

export {Dashboard}