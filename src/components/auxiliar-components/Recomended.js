import React from "react";
import { UseFetch } from "../../custom-hooks/useFetch";

function Recomended ({recomended}) {
    //const [recomended, updateRecomended] = UseFetch()

    return <ol className="floater">
        {recomended?.etiquetas.map( (elem, i) => {
            return <li key={i}>{elem}</li>
        })   
            
        }
    </ol>
}

export {Recomended}