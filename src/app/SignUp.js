import React, { useEffect, useState } from "react";
import {useAuth} from "../providers/auth"
import { useNavigate } from 'react-router-dom';



function SingUp (){
const navigate = useNavigate();
const [user, setUser] = useState('')
const [password, setPassword] = useState('')
const auth = useAuth()

const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + auth.token,
}

const url = 'api/v1/user/sing-up';

const signUpFunc =  (e) => {
    e.preventDefault()
    //auth.login({user: user, password: password})

    fetch(url,{
        method: 'POST',
        headers:  headers,
        body: JSON.stringify({
            user: user,
            password: password
        })
    })
    .then((res) => res.json())
    .then((data) => {
        console.log('DATA',data)

        navigate('/')
    })


}

/*useEffect(()=>{
    if (auth.checkLocal()){
        navigate('/app/')
    }
},[])*/

    return(
    <div className="center">
        <form className="login-container">
        <h1>Bienvenido. Crea tu cuenta</h1>
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
            onClick={signUpFunc}>
            <span>Crear Cuenta</span>
        </button>

        </form>
    </div>
    )
    
}

export {SingUp};