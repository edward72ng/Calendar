import React, { useState } from "react";
import {Link} from "react-router-dom"
import {useAuth} from "./auth"

function Login (){
const [user, setUser] = useState('')
const [password, setPassword] = useState('')
const auth = useAuth()

const loginF =  (e) => {
    e.preventDefault()
    //console.log({user: user, password: password})
 
    auth.login({user: user, password: password})
}


    return(<>   
        <div className="input-field s12 ">
            <input id="user" type="text" 
                value={user}
                onChange= {e => setUser(e.target.value)}/>
            <label htmlFor="user">Username</label>
        </div>
              
             
        <div className="input-field s12 ">
            <input id="password" type="text"
                value={password}
                onChange= {e => setPassword(e.target.value)}
            />
            <label htmlFor="password">Contraseña</label>
        </div>
             
        <button className="btn waves-effect waves-light" 
            onClick={loginF}>
            Iniciar Sesion
            <i className="material-icons right">send</i>
        </button>
        
    </>
    )
    
}

export {Login};