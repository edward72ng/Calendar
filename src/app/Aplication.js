import React from 'react'
import {Route, Routes} from 'react-router-dom'
import { NavBar } from '../components/nav-components/NavBar';
//import { Header } from '../components/header-components/Header';
import { MyProjects } from '../components/my-projects-components/MyProjects';
import { Dashboard } from '../components/dashboard-components/Dashboard';
import { Inbox } from '../components/inbox-components/Inbox';
import { DataProvider } from '../providers/DataContext';
import { FunctionFoldersProvider } from '../providers/FuntionFolders.provider';
import { FunctionTasksProvider } from '../providers/FunctionTasks.provider';
import { FunctionSectionsProvider } from '../providers/FuntionSeccions.provider';
import { Lateral } from '../components/UI-components/Lateral';
import { Header } from '../components/UI-components/Header';
import { FunctionTagsProvider } from '../providers/FunctionTags';

function Aplication () {
    return(
        <DataProvider>
            
        <FunctionFoldersProvider>   
        <FunctionTasksProvider>
        <FunctionSectionsProvider>  
        <FunctionTagsProvider>      
            <Routes>
                <Route path='/' element={<Lateral><Header><Inbox></Inbox></Header></Lateral>}></Route>
                
                <Route path='/home' element={<Lateral><Header><Dashboard></Dashboard></Header></Lateral>}></Route>
                <Route path='/my-projects' element={<Lateral><Header><MyProjects></MyProjects></Header></Lateral>}></Route>
            </Routes>
        </FunctionTagsProvider>
        </FunctionSectionsProvider>
        </FunctionTasksProvider>
        </FunctionFoldersProvider>
        </DataProvider>
    )
}

export default Aplication;
 //<Route path='/home' element={<NavBar><Header><Dashboard></Dashboard></Header></NavBar>}></Route>