import React, { useState, useContext } from 'react'
import {Link} from 'react-router-dom'
import {Menu} from './Menu'
import { ProfileView } from './ProfileView'
import {Modal} from './modal'
import { Search } from './Search'
import {DatesContext} from './datesContext'
import {InputModal} from './InputModal'
function Nav ({children}) {
  const [menuEnabled, setMenuEnabled] = useState(false)
  const [profileView, setProfileView] = useState(false) 
  const {inputEnabled,setInputEnabled} = useContext(DatesContext)

  return(
        <>
          <nav className="navigation space-between">
            <ul className='row'>
              <li className='icon-disable'
              onClick={()=>{setMenuEnabled(!menuEnabled)}}
              onDragOver={()=>setMenuEnabled(true)}><i className="material-icons">menu</i></li>
              <li><Search></Search></li>
            </ul>
            <ul className='row'>
              <ul className='row center-item'>
                <li><Link to="/home"><i className="material-icons">home</i></Link></li>
                <li><Link to="/calendary"><i className="material-icons">date_range</i></Link></li>
                <li><Link to="/notify"><i className="material-icons">view_day</i></Link></li>
              </ul>
              <li onClick={()=>{setProfileView(!profileView)}}><div className="avatar-home-container"></div></li>
            </ul>
          </nav>
        {menuEnabled &&  
        <Modal>
          <Menu 
          menu={menuEnabled} 
          setMenu={setMenuEnabled}
          className='menu-container'/>
        </Modal>}

        {profileView && 
          <Modal>
          <ProfileView 
          profileView={profileView} 
          setProfileView={setProfileView}/>
          </Modal>}
          
          {children}
          {inputEnabled && <InputModal/>}
          <div className='adding'
          onClick={()=>{setInputEnabled(!inputEnabled)}}>
            {
              inputEnabled
              ? 
              <i className='material-icons' >close</i>
              :
              <i className='material-icons' >add</i> 
            }
            
          </div>
        </>
    )
}
export {Nav};
