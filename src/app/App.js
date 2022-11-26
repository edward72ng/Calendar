import React from 'react'
import {Login} from './Login';
import {Route, Routes, Link} from 'react-router-dom'
import {Homefun} from './Homefun'
import {Notify} from './Notify'
import {CustomCalendar} from './CustomCalendar'
//import 'rsuite/dist/rsuite.min.css';

function App () {
    return(
        <div>
            <nav className="nav-extended">
    <div className="nav-content">
      <ul className="tabs tabs-transparent">
        <li className="tab"><Link to="/home">Home</Link></li>
        <li className="tab"><Link to="/calendar" >Calendar</Link></li>
        <li className="tab"><Link to="/notify">Notify</Link></li>
      </ul>
    </div>
  </nav>


            <Routes>
                <Route path='/' element={<Login/>}/>
                <Route path='/home' element={<Homefun/>}/>
                <Route path='/calendar' element={<CustomCalendar/>}/>
                <Route path='/notify' element={<Notify/>}/>
                
            </Routes>
            
        </div>
    )

}

export default App;