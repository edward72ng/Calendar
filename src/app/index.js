
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import {HashRouter} from 'react-router-dom'
import {AuthProvider} from './auth'
import {DatesProvider} from './datesContext'
import {EventsProvider} from './eventsProvider'
import { SocketProvider } from './socketContext'
const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
    <HashRouter>
        <EventsProvider>
        <SocketProvider>
            <DatesProvider>
            <AuthProvider>
                
                <App/>
                
            </AuthProvider>
            </DatesProvider>
            </SocketProvider>
            </EventsProvider>
    </HashRouter>
)

