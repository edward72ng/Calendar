import React, { useContext } from "react"
import {useAuth} from './auth'
import {SocketContext} from '../providers/socketContext'
import { DataContext } from "./DataContext"
import { ItemsContext } from "./ItemsContext"
import {subTasksBaseUrl} from "./URLS"

const FunctionSubTaskContext = React.createContext()

function FunctionSubTaskProvider({children}){
    const { setErrorMessage } = useContext(ItemsContext)
    const {socket} = useContext(SocketContext)
    const auth = useAuth()
    const {taskValue, setTaskValue, setDefault} = useContext(DataContext)
    const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + auth.token,
    }


const deleteSubTask = async (id, callback) => {
    try {
        const res = await fetch(`${subTasksBaseUrl}delete/${id}`, {
            method: 'DELETE',
            headers: headers,})

        const data = await res.json()
        if (res.status > 299){
            throw new Error('Algo salio mal')
        }
        callback()
    } catch (error) {
        setErrorMessage('Error al borrar subtarea')
        console.log(error)
    }
				
				
                
}

const editSubTask = async ( id, body, callback) => {
    const {content, details} = body
    try {
        const res = await fetch(`${subTasksBaseUrl}updatee/${id}`,{
								method: 'PUT',
								headers: headers,
								body: JSON.stringify(body),
				})
                if(res.status > 299){
                    throw new Error('Ha ocurrido un error inesperado')
                }
		
        console.log(res)
        callback()
        
    } catch (error) {
        setErrorMessage('Error al editar subtarea')
        console.log(error)
    }
				
}

  const createSubTask = async (body, taskid, callback) => {
    try {
        const res = await fetch(subTasksBaseUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
            body: JSON.stringify({...body, taskid})
          })
          const data = await res.json()
          if(res.status > 299){
            throw new Error('Ha ocurrido un error inesperado')
        }
          callback(data)
    } catch (error) {
        setErrorMessage('Error al crear subtarea')
        console.log(error)
    }
  }

  const generateSubTasks = async (taskid, callback) =>{
    try {
        const res = await fetch(`${subTasksBaseUrl}generate`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
            body: JSON.stringify({taskid: taskid})
          })
          const data = await res.json()
          if(res.status > 299){
            throw new Error('Ha ocurrido un error inesperado')
        }
          callback(data)
    } catch (error) {
        setErrorMessage('Error al generar subtarea')
        console.log(error)
    }    
  }

return <FunctionSubTaskContext.Provider
value={{editSubTask, deleteSubTask, generateSubTasks, createSubTask }}>
				{children}
</FunctionSubTaskContext.Provider>
}
				
export {FunctionSubTaskContext, FunctionSubTaskProvider}