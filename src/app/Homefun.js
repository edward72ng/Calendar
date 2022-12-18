import React, { useContext, useEffect, useState } from 'react'
import {useAuth} from './auth'
import { useNavigate } from 'react-router-dom';
import {OneTodo} from './OneTodo'
import {DatesContext} from './datesContext'
import {InputModal} from "./InputModal"
function Homefun () {
  const [todo, setTodo] = useState([])
  const [input, setInput] = useState(false)
  const [mount, setMounth] = useState(0)
  const {inputEnabled,setInputEnabled,setValues} = useContext(DatesContext)
  const auth = useAuth()
  const navigate = useNavigate()

  useEffect(()=>{
    if(!auth.token){
      navigate('/')
    }else{
      console.log('montando')
      fetch('/api/v1/inbox/your-todos',{
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + auth.token,
        },
      })
      .then(res => res.json())
      .then(data => {
        setTodo(data )
        
      });
    }
  },[mount])
  
  const deleteTodo= (id)=>{
        fetch('/api/v1/inbox/your-todos/'+ id, {
            method: 'DELETE',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + auth.token,
            }
          }).then(()=>{
            setMounth(mount + 1)
          })
    }

  const editTodo= (id, cont, details, event, notifications)=>{
      setValues(
        {
          id: id,
          content: cont,
          details: details,
          event: event,
          notifications: notifications,
        }
      )
      setMounth(mount-1)
      setInput(!input)
    }

  return(<>
  <div className="todos-container container">
      {todo.map((task, i) => {
            return(
                <OneTodo key={i} 
                editFunction = {editTodo} 
                deleteFunction = {deleteTodo} 
                content={task.content} 
                details={task.deatails} 
                id={task.id}
                evento={task.evento}
                notifications={task.notifis}></OneTodo>         
                    )})}  
  </div>
      {input && <InputModal 
                input={input} 
                setInput={setInput} 
                mount={mount} 
                setMounth={setMounth}  
                ></InputModal>}
  <i className='material-icons adding' 
  onClick={()=>{setInputEnabled(!inputEnabled);setInput(!input)}}>add</i>
</>)}
export {Homefun} 