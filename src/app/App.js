import React from 'react'



class App extends React.Component{

    constructor(){
        super()
        this.state = {
            contentTodo: '',
            todos: [],
            id: null
        }
        
        this.handleChange = this.handleChange.bind(this)
        this.addTodo = this.addTodo.bind(this)
    }

    addTodo(e){
        e.preventDefault()
        if (this.state.id){
          fetch('/api/v1/inbox/'+this.state.id, {
            method: 'PUT',
            body: JSON.stringify({
              content: this.state.contentTodo
            }),
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
          }).then(()=> {
            this.fetchTasks()
            this.setState({
            id: null,
            contentTodo: ''})
            })
        }
        if (this.state.id == null){
          fetch('/api/v1/inbox', {
            method: 'POST',
            body: JSON.stringify({
              content: this.state.contentTodo
            }
            ),
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
          }).then(()=> {
            this.fetchTasks()
            this.setState({
            id: null,
            contentTodo: ''})
            
            })
        }
        //this.fetchTasks()
        
    }
  
    handleChange(e){
        const val = e.target.value
        this.setState({contentTodo: val})
    }

    deleteTodo(id){
        fetch('/api/v1/inbox/'+ id, {
            method: 'DELETE',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
          }).then(()=>this.fetchTasks())
    }

    editTodo(id, cont){
        this.setState({
          id: id,
          contentTodo: cont
        })
        
    }


    componentDidMount() {
        this.fetchTasks();
        console.log('Montando componente')
      }
    
      fetchTasks() {
          fetch('/api/v1/inbox',{
            method: 'GET',
            headers: {
              'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjksImlhdCI6MTY2ODQzNjI5NH0.XLkQS_6r1QaPSJTOTHuHkjplmv5qQqUtl3lwW2oqMkU',
            },
          })
          .then(res => res.json())
          .then(data => {
            this.setState({todos: data});
            console.log('cambiando estado -> todos')
          });
      }
    

    render(){

        
        return(
            <div>
              
              <nav>
    <div class="nav-wrapper">
      <a href="#" class="brand-logo">TodoList</a>
    </div>
  </nav>


        <table>
        <thead>
          <tr>
              
              <th className='col s10'>List</th>
              <th className='col s2'>options</th>
              
          </tr>
        </thead>
        <tbody>

        
                  {  this.state.todos.map(task => {
                    return (
            <tr key={task.id}>
            
            <td>{task.content}</td>
            <td>
            <a className="waves-effect waves-light btn-small" onClick={()=> {this.deleteTodo(task.id)}}>
                <i className="material-icons">delete</i>
            </a>
            <a className="waves-effect waves-light btn-small" onClick={()=>{this.editTodo(task.id,task.content)}}>
                <i className="material-icons">edit</i>
            </a>
            <a className="waves-effect waves-light btn-small color-dark ">
                <i className="material-icons">check</i>
            </a>
            </td>
            
          </tr>
                    )})}  
          </tbody>
        

        
        </table>

<div className="row">
<form className="col s12" onSubmit={this.addTask}>
  <div className="row">
    <div className="input-field col s12">
      <input id="input_text" type="text" data-length="10" onChange={this.handleChange} value = {this.state.contentTodo}/>
      <label htmlFor="input_text">Task text</label>
    </div>
  </div>
  
  <button className="btn waves-effect waves-light" type="submit" onClick={this.addTodo} name="action">Enviar
<i className="material-icons right">send</i>
</button>
</form>
</div>



</div>
        )
    }
}

export default  App;