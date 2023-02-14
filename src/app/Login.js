import React, { useEffect, useState } from "react";
import {useAuth} from "../providers/auth"
import { useNavigate } from 'react-router-dom';



function Login (){
const navigate = useNavigate();
const [user, setUser] = useState('')
const [password, setPassword] = useState('')
const auth = useAuth()

const loginF =  (e) => {
    e.preventDefault()
    auth.login({user: user, password: password})
}

useEffect(()=>{
    if (auth.checkLocal()){
        navigate('/app/')
    }
},[])

    return(
    <div className="center">
        <form className="login-container">
        <h1>Bienvenido. Inicia Sesion</h1>
            <label htmlFor="user" className="bold">Username</label>
            <input  id="user" type="text" className="input"
                value={user}
                onChange= {e => setUser(e.target.value)}
                placeholder="Usuario"/>
            
            <label htmlFor="password" className="bold">Password</label>
            <input id="password" type="password" className="input"
                value={password}
                onChange= {e => setPassword(e.target.value)}
                placeholder="Contraseña"/>
            {auth.error &&
                <div className="warning">{auth.error}</div>
            }
            <a href="#" className="text-link">¿Olvidaste la contraseña?</a>
        <button className="btn" type="submit"
            onClick={loginF}>
            <span>Iniciar Sesion</span>
        </button>

        </form>
    </div>
    )
    
}

export {Login};