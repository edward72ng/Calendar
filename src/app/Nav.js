import React, { useContext, useState } from 'react'
import {Link} from 'react-router-dom'
import { InputModal } from './InputModal'
import {Menu} from './Menu'
import {DatesContext} from "./datesContext"
function Nav ({children}) {
  const [menuEnabled, setMenuEnabled] = useState(false)
  const {inputEnabled, setInputEnabled} = useContext(DatesContext)
    return(
        <>
        <Menu menu={menuEnabled} setMenu={setMenuEnabled}/>
          <nav className="nav-extended divider">
            <ul>
              <li onClick={()=>{setMenuEnabled(!menuEnabled)}}><i className="material-icons">menu</i></li>
              <li><i className="material-icons">search</i></li>
            </ul>
            <ul>
              <li><Link to="/home"><i className="material-icons">home</i></Link></li>
              <li><Link to="/calendary"><i className="material-icons">date_range</i></Link></li>
              <li><Link to="/notify"><i className="material-icons">view_day</i></Link></li>
              <li><i className="material-icons">person_outline</i></li>
            </ul>
          </nav>
          {children}
          
        </>
    )
}

export {Nav};
