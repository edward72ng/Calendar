import React from "react"

function Form ({children, execSubmit}){
  return(
    <form onSubmit={execSubmit} className="container">
      {children}
      <button className="btn waves-effect waves-light" type="submit">
      Enviar
      <i className="material-icons right">send</i>
    </button>
    </form>
  )
}

export {Form}