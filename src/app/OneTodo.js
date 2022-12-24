import React from "react";

function OneTodo ({id, content, details,deleteFunction, editFunction, moveFunction}){

    return (
        <div className="container">
        <div className="container2">
            <div>
                <p className="content">{content}</p>
                <p className="details">{details}</p>
            </div>
            <div className="icons-container">
                <a className="waves-effect waves-light btn-small" onClick={()=>deleteFunction(id)}>
                    <i className="small material-icons">delete</i>
                </a>
                <a className="waves-effect waves-light btn-small" onClick={()=>editFunction(id)}>
                    <i className="small material-icons">edit</i>
                </a>
                <a className="btn-small" onClick={()=>moveFunction(id)}>
                    <i className="tiny material-icons">more_vert</i>
                </a>
            </div>
        </div>
        <div className="line-div"></div>
        </div>
    )
}
export {OneTodo}