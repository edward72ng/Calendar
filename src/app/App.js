import React from 'react'
import {Login} from './Login';
import {Route, Routes, Link} from 'react-router-dom'
import {Homefun} from './Homefun'
import {Notify} from './Notify'
import {Calendar} from './Calendar'
import {EventsProvider} from './eventsProvider'

/*
 <nav className="nav-extended">
    <div className="nav-content">
      <ul className="tabs tabs-transparent">
        <li className="tab"><Link to="/home">Home</Link></li>
        <li className="tab"><Link to="/notify">Notify</Link></li>
        <li className="tab"><Link to="/calendary">Calendar2</Link></li>
      </ul>
    </div>
  </nav>
*/

function App () {
    return(
        <div>
          <nav className="nav-extended divider">
            <ul>
              <li><i class="material-icons">menu</i></li>
              <li><i class="material-icons">search</i></li>
            </ul>
            <ul>
              <li><Link to="/home"><i class="material-icons">home</i></Link></li>
              <li><Link to="/calendary"><i class="material-icons">date_range</i></Link></li>
              <li><Link to="/notify"><i class="material-icons">view_day</i></Link></li>
            </ul>
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