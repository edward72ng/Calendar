import React from "react";

function OneTodo ({id, content, evento, details, notifications, deleteFunction, editFunction}){

    const isValid = (val)=>{
        if(!val){
            return "" 
        }else{
            return val.event
        }
    }
    return (
        <div className="container">
        <div className="container2">
            <div>
                <p className="content">{content}</p>
                <p className="details">{details}</p>
            </div>
            <div className="icons-container">
                <a className="waves-effect waves-light btn-small" onClick={()=>deleteFunction(id)}>
                    <i className="material-icons">delete</i>
                </a>
                <a className="waves-effect waves-light btn-small" onClick={()=>editFunction(id,content,details,isValid(evento),notifications)}>
                    <i className="material-icons">edit</i>
                </a>
            </div>
        </div>
        <div className="divider"></div>
        </div>
    )
}
export {OneTodo}