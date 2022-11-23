import React from "react";
//import './OneTodo.css';


function OneTodo (props){


    return (
        <div className="container">
        <div className="container2">
            <div>
                <p className="content">{props.content}</p>
                <p className="details">{props.details}</p>
            </div>
            <div className="icons-container">
                <a className="waves-effect waves-light btn-small" onClick={()=>props.deleteFunction(props.id)}>
                    <i className="material-icons">delete</i>
                </a>
                <a className="waves-effect waves-light btn-small" onClick={()=>props.editFunction(props.id,props.content,props.details)}>
                    <i className="material-icons">edit</i>
                </a>
            </div>
        </div>
        <div className="divider"></div>
        </div>
    )
}
export {OneTodo}