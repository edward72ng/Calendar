import React from 'react'
import {Login} from './Login';
import {Route, Routes} from 'react-router-dom'
import {Home} from './Home'
import {Notify} from './Notify'
import {Calendar} from './Calendar'
import {EventsProvider} from './eventsProvider'
import {Nav} from"./Nav"
import {ProfileView} from './ProfileView'
function App () {
    return(
            <Routes>
                <Route path='/' element={<Login/>}/>
                <Route path='/home' element={<Nav><Home/></Nav>}/>
                <Route path='/notify' element={<Nav><Notify/></Nav>}/>
                <Route path='/calendary' element={<Nav><Calendar/></Nav>}/>
                
                <Route path='/profile' element={<ProfileView/>}/>
            </Routes>
    )

}



export default App;
