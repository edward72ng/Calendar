import React from "react";
import {Avatar} from '../header-components/Avatar'
import './Tittle.css'

function Tittle () {

    return (
        <div className="tittle-container">
            <div>
            <h1>Hí, John Doe</h1>
            <span className="details">Have a beautiful day</span>
            <span className="hour">10:29 AM</span>
            </div>
            <Avatar></Avatar>
        </div>
    )
}

export {Tittle}