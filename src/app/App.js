import React from 'react'
import {Login} from './Login';
import {Route, Routes, Link} from 'react-router-dom'
import {Homefun} from './Homefun'
import {Notify} from './Notify'
import {Calendar} from './Calendar'
import {EventsProvider} from './eventsProvider'

function App () {
    return(
        <div>
            <nav className="nav-extended">
    <div className="nav-content">
      <ul className="tabs tabs-transparent">
        <li className="tab"><Link to="/home">Home</Link></li>
        <li className="tab"><Link to="/notify">Notify</Link></li>
        <li className="tab"><Link to="/calendary">Calendar2</Link></li>
      </ul>
    </div>
  </nav>


            <Routes>
                <Route path='/' element={<Login/>}/>
                <Route path='/home' element={<Homefun/>}/>
                <Route path='/notify' element={<Notify/>}/>
                <Route path='/calendary' element={<EventsProvider>
                  <Calendar/>
                </EventsProvider>}/>
            </Routes>
            
        </div>
    )

}

export default App;