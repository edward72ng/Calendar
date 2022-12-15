import React from "react";

function Content({content, details}) {
    return(
    <div className="s12">
        <input type="text" 
            value={content.value}
            onChange= {content.set}
        />
        <label htmlFor="user">Contenido</label>

        <input type="text"
            value={details.value}
            onChange= {details.set}
        />
        <label htmlFor="password">Detalles</label>
    </div>
    )
}

export {Content}