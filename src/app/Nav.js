import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import {Menu} from './Menu'
import { ProfileView } from './ProfileView'
import {Modal} from './modal'
import { Search } from './Search'
function Nav ({children}) {
  const [menuEnabled, setMenuEnabled] = useState(false)
  const [profileView, setProfileView] = useState(false) 
  return(
        <>
          <nav className="navigation space-between">
            <ul className='row'>
              <li onClick={()=>{setMenuEnabled(!menuEnabled)}}><i className="material-icons">menu</i></li>
              <li><Search></Search></li>
            </ul>
            <ul className='row'>
              <ul className='row'>
                <li><Link to="/home"><i className="material-icons">home</i></Link></li>
                <li><Link to="/calendary"><i className="material-icons">date_range</i></Link></li>
                <li><Link to="/notify"><i className="material-icons">view_day</i></Link></li>
              </ul>
              <li onClick={()=>{setProfileView(!profileView)}}><i className="material-icons">person_outline</i></li>
            </ul>
          </nav>
        {menuEnabled &&  
        <Modal><Menu menu={menuEnabled} setMenu={setMenuEnabled}/>
        </Modal>}
        {
          !! profileView && 
          (<Modal><ProfileView 
          profileView={profileView} 
          setProfileView={setProfileView}/>
          </Modal>)
        }
          {children}
        </>
    )
}
export {Nav};
