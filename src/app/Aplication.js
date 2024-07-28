import React from 'react'
import {Route, Routes} from 'react-router-dom'
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
import { ErrorMessage } from '../components/auxiliar-components/ErrorMessage';
import { FunctionImagesProvider } from '../providers/FuctionImages.provider';
import { FunctionSubTaskProvider } from '../providers/FunctionSubItem.provider';
import { TaskModalProvider } from '../providers/TaskModalContext';

function Aplication () {
    return(
        <DataProvider>
        
        <ErrorMessage>
        <FunctionFoldersProvider>   
        <FunctionTasksProvider>
        <FunctionSectionsProvider>  
        <FunctionTagsProvider>
        <FunctionImagesProvider>    
        <FunctionSubTaskProvider>
        <TaskModalProvider>
        <Lateral><Header>
            
            <Routes>
                <Route path='/' element={<Inbox></Inbox>}></Route>
                <Route path='/home' element={<Dashboard></Dashboard>}></Route>
                <Route path='/my-projects' element={<MyProjects></MyProjects>}></Route>
            </Routes>
            
        </Header></Lateral>
        </TaskModalProvider>
        </FunctionSubTaskProvider>
        </FunctionImagesProvider>
        </FunctionTagsProvider>
        </FunctionSectionsProvider>
        </FunctionTasksProvider>
        </FunctionFoldersProvider>
        </ErrorMessage>

        </DataProvider>
    );
}

export default Aplication;