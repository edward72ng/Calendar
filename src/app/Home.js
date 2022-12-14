import React, { useContext, useEffect} from 'react'
import {useAuth} from './auth'
import { useNavigate } from 'react-router-dom';
import {OneTodo} from './OneTodo'
import {DatesContext} from './datesContext'
import {InputModal} from "./InputModal"
import {useFetch} from './useFetch'
function Home() {
  const auth = useAuth()
  const {inputEnabled,setInputEnabled,filter} = useContext(DatesContext)
  const [blocs, updateBlocs] = useFetch('/api/v1/inbox/your-todos')
  const navigate = useNavigate()

  useEffect(()=>{
    if(!auth.token){
      navigate('/')
    }else{
    updateBlocs(filter)
    }
  },[filter, inputEnabled])
  
  return(<>
  <div className="calendar-container center-container">
      {blocs.map((task, i) => {
            return <OneTodo key={i} 
                content={task.content} 
                details={task.deatails} 
                id={task.id}
                updateBlocs={updateBlocs}></OneTodo>         
                    })}  
  </div>
      {inputEnabled && <InputModal/>}
  <i className='material-icons adding' 
  onClick={()=>{setInputEnabled(!inputEnabled)}}>add</i>
</>)}
export {Home} 