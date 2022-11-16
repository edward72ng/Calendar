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


        return(
            <div className="row valign-wrapper">
            <form className="col s12" onSubmit={loginF}>
              <div className="row">
                <div className="input-field col s6 center-align">
                  <input id="user" type="text" 
                      value={user}
                      onChange= {e => setUser(e.target.value)}
                  />
                  <label htmlFor="user">Username</label>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s6 center-align">
                  <input id="password" type="text"
                  value={password}
                  onChange= {e => setPassword(e.target.value)}
                  />
                  <label htmlFor="password">Contraseña</label>
                </div>
              </div>
              <button className="btn waves-effect waves-light" type="submit" name="action">Iniciar Sesion
                  <i className="material-icons right">send</i>
              </button>
            </form>
          </div>
                
        )
    
}

export {Login};