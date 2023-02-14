
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import {HashRouter} from 'react-router-dom'
import {AuthProvider} from '../providers/auth'
import {DatesProvider} from './datesContext'
import {EventsProvider} from './eventsProvider'
import { SocketProvider } from '../providers/socketContext'
import { FunctionFoldersProvider } from '../providers/FuntionFolders.provider'
import { FunctionTasksProvider } from '../providers/FunctionTasks.provider'
import { FunctionSectionsProvider } from '../providers/FuntionSeccions.provider'
import { DataProvider } from '../providers/DataContext'
const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
    
    <HashRouter>
        
        <EventsProvider>
        <SocketProvider>
            <DatesProvider>
            <AuthProvider>
                <App></App>
            </AuthProvider>
            </DatesProvider>
            </SocketProvider>
            </EventsProvider>
            
    </HashRouter>
   
)

