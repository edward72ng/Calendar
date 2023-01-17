import React, { useState } from "react"

function Search (){
    const [input, setInput] = useState(false)
  return(<div className="row">
    <i className="material-icons" onClick={()=>setInput(!input)}>search</i>
    {input && 
    <input type='text' placeholder="¿Que buscaras hoy?">
    </input>}
    </div>
  )
}

export {Search}