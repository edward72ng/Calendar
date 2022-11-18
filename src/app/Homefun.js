import React, { useEffect, useState } from 'react'
import {useAuth} from './auth'
import { useNavigate } from 'react-router-dom';
import {OneTodo} from './OneTodo'
function Homefun () {
  const [contentTodo,setContentTodo] = useState('')
  const [todo, setTodo] = useState([])
  const [id, setId] = useState(null)
  const auth = useAuth()
  const navigate = useNavigate()
  useEffect(()=>{
    mount()
    //console.log('bienvenido')
  },[])

  const addTodo = (e) => {
        e.preventDefault()
        if (id){
          fetch('/api/v1/inbox/your-todos/'+id, {
            method: 'PUT',
            body: JSON.stringify({
              content: contentTodo
            }),
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + auth.token,
            }
          }).then(()=> {
            fetchTasks()
            setId(null)
            setContentTodo('')
            })
        }
        if (id == null){
          fetch('/api/v1/inbox/your-todos', {
            method: 'POST',
            body: JSON.stringify({
              content: contentTodo
            }
            ),
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + auth.token,
            }
          }).then(()=> {
            fetchTasks()
            setId(null)
            setContentTodo('')
            })
        }
        //this.fetchTasks()
        
    }
  
    const handleChange = (e) => {
        const val = e.target.value
        setContentTodo(val)
    }

    const deleteTodo= (id)=>{
        fetch('/api/v1/inbox/your-todos/'+ id, {
            method: 'DELETE',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + auth.token,

            }
          }).then(()=>fetchTasks())
    }

    const editTodo= (id, cont)=>{
      setId(id)
      setContentTodo(cont)     
    }


    const mount = () => {
      if(auth.token){
        console.log('hay un token :D')
        console.log(auth.token)
        fetchTasks();
        console.log('Montando componente')
      }else{
        console.log('No hay token :c')
        navigate('/')
      }
      }
    
    const fetchTasks = () => {
          fetch('/api/v1/inbox/your-todos',{
            method: 'GET',
            headers: {
              'Authorization': 'Bearer ' + auth.token,
            },
          })
          .then(res => res.json())
          .then(data => {
            setTodo(data)
            console.log('cambiando estado -> todos')
          });

         
      }      
        return(
            <div>
              
              


        <table>
        <thead>
          <tr>
              
              <th className='col s10'>List</th>
              <th className='col s2'>options</th>
              
          </tr>
        </thead>
        <tbody>

        
                  { todo.map(task => {
                    return (
            <tr key={task.id}>
            
            <td>{task.content}</td>
            <td>
            <a className="waves-effect waves-light btn-small" onClick={()=> {deleteTodo(task.id)}}>
                <i className="material-icons">delete</i>
            </a>
            <a className="waves-effect waves-light btn-small" onClick={()=>{editTodo(task.id,task.content)}}>
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
<form className="col s12" >
  <div className="row">
    <div className="input-field col s12">
      <input id="input_text" type="text" data-length="10" onChange={handleChange} value = {contentTodo}/>
      <label htmlFor="input_text">Task text</label>
    </div>
  </div>
  
  <button className="btn waves-effect waves-light" type="submit" onClick={addTodo} name="action">Enviar
<i className="material-icons right">send</i>
</button>
</form>
</div>
<OneTodo></OneTodo>
</div>
)}
export {Homefun}