import React from "react"

function Form ({children, execSubmit}){
  return(
    <form onSubmit={execSubmit} className="container">
      {children}
      <button className="btn" type="submit">
      Enviar
    </button>
    </form>
  )
}

export {Form}