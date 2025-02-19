import React from "react";
import ReactDOM from "react-dom";

function Overlay(){

    return ReactDOM.createPortal(
        <div className="overlay">
            
        </div>
        ,
        document.getElementById('modal')
        )
}

export {Overlay}