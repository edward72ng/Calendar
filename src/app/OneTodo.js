import React from "react";
//import './OneTodo.css';


function OneTodo ({content, details}){

    const prueba = ()=>{
        alert('funciona :O')
      }

    return (
        <>
        <div className="container">
            <div class="section">
                <h5>Todo</h5>
                <p>Todo Description</p>
            </div>
            <div className="icons-container">
                <a className="waves-effect waves-light btn-small" >
                    <i className="material-icons">delete</i>
                </a>
                <a className="waves-effect waves-light btn-small" >
                    <i className="material-icons">edit</i>
                </a>
                <a className="waves-effect waves-light btn-small color-dark " onClick={()=>{prueba()}}>
                    <i className="material-icons">check</i>
                </a>
            </div>
        </div>
        <div class="divider"></div>
        </>
    )
}
export {OneTodo}