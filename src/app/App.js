import React, { useEffect } from 'react'
import {Login} from './Login';
import {Route, Routes} from 'react-router-dom'
import {Home} from './Home'
import {Notify} from './Notify'
import {Calendar} from './Calendar'
import {Nav} from"./Nav"
import {ProfileView} from './ProfileView'
import { NavBar } from '../components/nav-components/NavBar';
import { Header } from '../components/header-components/Header';
import { MyProjects } from '../components/my-projects-components/MyProjects';
import { Calendario } from '../components/calendar-components/Calendar'
import { Dashboard } from '../components/dashboard-components/Dashboard';
import { Contacts } from '../components/contacts-components/Contacts';
import { Options } from '../components/my-projects-components/Options';
function App () {
    return(
            <Routes>
                <Route path='/' element={<Login/>}/>

                <Route path='/home' element={<NavBar><Header><Dashboard></Dashboard></Header></NavBar>}></Route>
                <Route path='/head' element={<Header></Header>}></Route>
                <Route path='/my-projects' element={<NavBar><Header><MyProjects></MyProjects></Header></NavBar>}></Route>
                <Route path='/collaborative' element={<NavBar><Header><MyProjects></MyProjects></Header></NavBar>}></Route>
                <Route path='/calendar' element={<NavBar><Header><Calendario></Calendario></Header></NavBar>}></Route>
                <Route path='/contacts' element={<NavBar><Header><Contacts></Contacts></Header></NavBar>}></Route>
                <Route path='/modal' element={<Options></Options>}></Route>
            </Routes>
    )

}



export default App;
