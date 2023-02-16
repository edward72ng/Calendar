import React from 'react'
import {Route, Routes} from 'react-router-dom'
import { NavBar } from '../components/nav-components/NavBar';
import { Header } from '../components/header-components/Header';
import { MyProjects } from '../components/my-projects-components/MyProjects';
import { Calendario } from '../components/calendar-components/Calendar'
import { Dashboard } from '../components/dashboard-components/Dashboard';
import { Contacts } from '../components/contacts-components/Contacts';
import { Inbox } from '../components/inbox-components/Inbox';
import { DataProvider } from '../providers/DataContext';
import { FunctionFoldersProvider } from '../providers/FuntionFolders.provider';
import { FunctionTasksProvider } from '../providers/FunctionTasks.provider';
import { FunctionSectionsProvider } from '../providers/FuntionSeccions.provider';

function Aplication () {
    return(
        <DataProvider>
        <FunctionFoldersProvider>   
        <FunctionTasksProvider>
        <FunctionSectionsProvider>        
            <Routes>
                <Route path='/' element={<NavBar><Header><Inbox></Inbox></Header></NavBar>}></Route>
                <Route path='/home' element={<NavBar><Header><Dashboard></Dashboard></Header></NavBar>}></Route>
                <Route path='/my-projects' element={<NavBar><Header><MyProjects></MyProjects></Header></NavBar>}></Route>
                <Route path='/collaborative' element={<NavBar><Header><MyProjects></MyProjects></Header></NavBar>}></Route>
                <Route path='/calendar' element={<NavBar><Header><Calendario></Calendario></Header></NavBar>}></Route>
                <Route path='/contacts' element={<NavBar><Header><Contacts></Contacts></Header></NavBar>}></Route>
            </Routes>
        </FunctionSectionsProvider>
        </FunctionTasksProvider>
        </FunctionFoldersProvider>
        </DataProvider>
    )
}

export default Aplication;