import React, { useState } from "react";
import {ProfileView} from '../../app/ProfileView'

function Avatar () {
    const [openProfile, setOpenProfile] = useState(false) 
    return <li className="header-item"
        onClick={()=>setOpenProfile(!openProfile)}>
        <div className="avatar-home-container"></div>
        {openProfile &&
        <ProfileView profileView={openProfile} setProfileView={setOpenProfile}/>
        }
    </li>
}

export {Avatar}