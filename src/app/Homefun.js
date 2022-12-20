import React, { useContext, useEffect, useState } from 'react'
import {useAuth} from './auth'
import { useNavigate } from 'react-router-dom';
import {OneTodo} from './OneTodo'
import {DatesContext} from './datesContext'
import {InputModal} from "./InputModal"
import {useFetch} from './useFetch'
function Homefun () {
  const [input, setInput] = useState(false)
  const [mount, setMounth] = useState(0)
  const auth = useAuth()
  const {inputEnabled,setInputEnabled,setValues,filter} = useContext(DatesContext)
  const [blocs, updateBlocs] = useFetch('/api/v1/inbox/your-todos')
  const navigate = useNavigate()
  useEffect(()=>{
    if(!auth.token){
      navigate('/')
    }else{
      updateBlocs(filter)
    }
  },[mount, filter])
  
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

  const editTodo= (id)=>{
    fetch('/api/v1/inbox/your-todos/'+ id, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + auth.token,
      }
    }).then((res)=>res.json())
    .then((data)=>{
    setValues(
      {
        id: data.id,
        content: data.content,
        details: data.deatails,
        event: data.evento? data.evento.event: '',
        notifications: data.notifis
      }
    )
    setMounth(mount-1)
    setInput(!input)
  })}

  return(<>
  <div className="todos-container container">
      {blocs.map((task, i) => {
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