import React from "react";
import {Link} from "react-router-dom"

class Login extends React.Component{

    render(){
        return(
            <div className="row valign-wrapper">
            <form className="col s12">
              <div className="row">
                <div className="input-field col s6 center-align">
                  <input id="input_text" type="text" data-length="10"/>
                  <label for="input_text">Username</label>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s6 center-align">
                  <textarea id="textarea2" className="materialize-textarea" data-length="120"></textarea>
                  <label htmlFor="textarea2">Contraseña</label>
                </div>
              </div>
              <button className="btn waves-effect waves-light" type="submit" name="action">Iniciar Sesion
                  <i className="material-icons right">send</i>
              </button>
              <Link to='/home'>Home</Link>
              <a href="/home">Home a</a>
            </form>
          </div>
                
        )
    }
}

export default Login;