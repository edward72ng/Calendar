import React from 'react'
import {Login} from './Login';
import {Route, Routes} from 'react-router-dom'
import Aplication from './Aplication';
import { ItemsProvider } from '../providers/ItemsContext';

function App () {

    const vpHeight = window.innerHeight;
        const style = document.createElement("style");
        style.innerHTML = `:root {
          --vp-height: ${vpHeight}px;
        }`;
        document.head.appendChild(style);

    return(
            <Routes>
                <Route path='/' element={<Login/>}/>
                <Route path='/app/*' element={
                <ItemsProvider><Aplication></Aplication></ItemsProvider>
                }></Route>
            </Routes>
    )
}

export default App;
