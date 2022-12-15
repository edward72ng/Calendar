import React from "react";

function Events({event}) {
    return(
        <input type="date" name='fecha' 
        onChange={event.set} 
        value={event.value}></input>
    )
}

export {Events}