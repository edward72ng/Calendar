import React from 'react'
import Home from './Home';
import {Login} from './Login';
import {Route, Routes} from 'react-router-dom'
import {Homefun} from './Homefun'

function App () {
    return(
        <div>
            <nav class="nav-extended">
            <div class="nav-wrapper">
            <a href="#" class="brand-logo">TodoList</a>
            </div>
    <div class="nav-content">
      <ul class="tabs tabs-transparent">
        <li class="tab"><a href="#test1">Home</a></li>
        <li class="tab"><a href="#test2">Calendar</a></li>
        <li class="tab"><a href="#test4">Notify</a></li>
      </ul>
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