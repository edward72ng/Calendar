import React, {useState} from "react";

function Search () {
    const [input, setInput] = useState(false)

    return<li className="header-item">
        <span className="material-symbols-outlined" 
        onClick={()=>setInput(!input)}>
        search</span>

        {input && 
        <input type='text' placeholder="¿Que buscaras hoy?"></input>
        }
    </li>
    
}

export {Search}

