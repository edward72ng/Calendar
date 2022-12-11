import React from 'react'
import {Login} from './Login';
import {Route, Routes} from 'react-router-dom'
import {Homefun} from './Homefun'
import {Notify} from './Notify'
import {Calendar} from './Calendar'
import {EventsProvider} from './eventsProvider'
import {Nav} from"./Nav"
import {Menu} from "./Menu"
function App () {
    return(
            <Routes>
                <Route path='/' element={<Login/>}/>
                <Route path='/home' element={<Nav><Homefun/></Nav>}/>
                <Route path='/notify' element={<Nav><Notify/></Nav>}/>
                <Route path='/calendary' element={<EventsProvider>
                  <Nav><Calendar/></Nav>
                </EventsProvider>}/>
                <Route path='/sidenav' element={<Menu/>}/>
            </Routes>
    )

}

export default App;