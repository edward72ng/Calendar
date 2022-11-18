import React from 'react'
import Home from './Home';
import {Login} from './Login';
import {Route, Routes} from 'react-router-dom'
import {Homefun} from './Homefun'

function App () {
    return(
        <div>
            <nav>
            <div className="nav-wrapper">
                <a href="#" className="brand-logo">TodoList</a>
            </div>
            </nav>
            <Routes>
                <Route path='/' element={<Login/>}/>
                <Route path='/home' element={<Homefun/>}/>
            </Routes>
            
        </div>
    )

}

export default App;