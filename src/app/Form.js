import React from "react"

function Form (props){
    return(
        <div className="row">
<form className="col s12" >
  <div className="row">
    <div className="input-field col s12">
      <input id="input_text" type="text" data-length="10" onChange={()=>props.handleChange} value = {props.contentTodo}/>
      <label htmlFor="input_text">Task text</label>
    </div>
    <div className="input-field col s12">
      <input id="text" type="text" data-length="10" onChange={()=>props.handleChangeDetails} value = {props.detailsTodo}/>
      <label htmlFor="text">Details text</label>
    </div>
  </div>
  
  <button className="btn waves-effect waves-light" type="submit" onClick={()=>props.addTodo} name="action">Enviar
<i className="material-icons right">send</i>
</button>
</form>
</div>
    )
}

export {Form}