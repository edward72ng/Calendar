import React, { useContext, useEffect, useState } from 'react'
import {useAuth} from './auth'
import { useNavigate } from 'react-router-dom';
import {OneTodo} from './OneTodo'
import{Form} from './Form'
import {DatesContext} from './datesContext'
function Homefun () {
  const [contentTodo,setContentTodo] = useState('')
  const [detailsTodo, setDetailsTodo] = useState('')
  const [todo, setTodo] = useState([])
  const [id, setId] = useState(null)
  const [date, setDateEvent] = useState('')
  const [arrNotifications, setArrNotifications] = useState([])
  const [changeTime, setChangeTime] = useState('')
  const [changeDate, setChangeDate] = useState('')
  const auth = useAuth()
  const navigate = useNavigate()
  const {dateString} = useContext(DatesContext)
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
              content: contentTodo,
              deatails: detailsTodo,
              event: date,
              notifications: arrNotifications,
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
            setDetailsTodo('')
            })
        }
        if (id == null){
          fetch('/api/v1/inbox/your-todos', {
            method: 'POST',
            body: JSON.stringify({
              content: contentTodo,
              deatails: detailsTodo,
              event: date,
              notifications: arrNotifications,
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
            setDetailsTodo('')
            })
        }
        //this.fetchTasks()
        
    }
  
    const handleChange = (e) => {
        const val = e.target.value
        setContentTodo(val)
    }

    const handleChangeDetails = (e) => {
      const val = e.target.value
      setDetailsTodo(val)
  }

  const handleChangeDate = (e) => {
    const val = e.target.value
    setDateEvent(val)
}

const handleChangeDateN = (e) => {
  const val = e.target.value
  setChangeDate(val)
}

const handleChangeTime = (e) => {
  const val = e.target.value
  setChangeTime(val)
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

    const editTodo= (id, cont, details, event, notifications)=>{
      setId(id)
      setContentTodo(cont)
      setDetailsTodo(details)
      setDateEvent(event)
      setArrNotifications(notifications)
    }

    
    
    const newNotification = (e)=> {
      e.preventDefault()
      setArrNotifications([...arrNotifications, {time: changeTime, date: changeDate}])
      setChangeTime("")
      setChangeDate("")
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
      const prueba = ()=>{
        alert('funciona :O')
      }
      const deleteArrNotification = (indice) =>{
        
        let prevArr = []
        arrNotifications.map((elem, i)=>{
          if(i != indice){
            prevArr.push(elem)
          }
        })
     
        setArrNotifications(
          prevArr
          )
        
      }
        return(
            <div className="home-container">
<div className="form-container">
<div className="row"> 
          <div>{dateString}</div>
<form className="col s12" >
  <div className="row">
    <div className="input-field col s12">
      <input id="input_text" type="text" data-length="10" onChange={handleChange} value = {contentTodo}/>
      <label htmlFor="input_text">Task text</label>
    </div>
    <div className="input-field col s12">
      <input id="text" type="text" data-length="10" onChange={handleChangeDetails} value = {detailsTodo}/>
      <label htmlFor="text">Details text</label>
    </div>
  </div>
  

  <input type="date" name='fecha' onChange={handleChangeDate} value={date}></input>

  <ul> Notificatios
  {
    arrNotifications.map((obj,i)=>{
        return (<li key={i}> 
        <input type="time" value={obj.time} onChange={() => console.log('no quiero cambiar datos')}></input>
        <input type="date" value={obj.date} onChange={() => console.log('no quiero cambiar datos')}></input>
        <a onClick={()=>deleteArrNotification(i)}>-</a>
        </li>)
      })
    }
    <li>
      <input type="time" name='hora' onChange={handleChangeTime} value={changeTime}></input>
      <input type="date" name='fecha' onChange={handleChangeDateN} value={changeDate}></input>
    </li>
    <button onClick={newNotification}>+</button>
  </ul>
  
  <button className="btn waves-effect waves-light" type="submit" onClick={addTodo} name="action">Enviar
<i className="material-icons right">send</i>
</button>
  
</form>
</div>
</div>
              <div className="todos-container">
                  { todo.map((task, i) => {
                    return (
<OneTodo key={i} 
editFunction = {editTodo} 
deleteFunction = {deleteTodo} 
pruebaFunction = {prueba} 
content={task.content} 
details={task.deatails} 
id={task.id}
evento={task.evento}
notifications={task.notifis}></OneTodo>
          
                    )})}  
                    </div>

</div>
)}
export {Homefun} 