
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import {HashRouter} from 'react-router-dom'
import {AuthProvider} from './auth'
import {DatesProvider} from './datesContext'
import {EventsProvider} from './eventsProvider'
const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
    <HashRouter>
        <EventsProvider>
            <DatesProvider>
            <AuthProvider>
                <App/>
            </AuthProvider>
            </DatesProvider>
            </EventsProvider>
    </HashRouter>
)

