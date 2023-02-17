
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import {HashRouter} from 'react-router-dom'
import {AuthProvider} from '../providers/auth'
import { SocketProvider } from '../providers/socketContext'

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
    <HashRouter>
        <SocketProvider>
            <AuthProvider>
                <App></App>
            </AuthProvider>
        </SocketProvider>
    </HashRouter>
)

