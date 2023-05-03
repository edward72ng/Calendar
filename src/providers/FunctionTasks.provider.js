import React, { useContext, useEffect } from "react"
import {useAuth} from './auth'
import { DataContext } from "./DataContext"
import { ItemsContext } from "./ItemsContext"

const FunctionTasksContext = React.createContext()

function FunctionTasksProvider({children}){
    const auth = useAuth()
    const { taskValue, setDefault } = useContext(DataContext)
    const { setErrorMessage } = useContext(ItemsContext)
    const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + auth.token,
    }

useEffect(()=>{
    
}, [taskValue])

const deleteTask = async (id, callback) => {
    try {
        const res = await fetch('/api/v1/inbox/your-todos/'+ id, {
            method: 'DELETE',
            headers: headers,})
        if(res.status > 299){
            throw new Error('Ha ocurrido un error inesperado')
        }
        callback()
    } catch (err) {
        setErrorMessage('error al borrar')
        callback({error: true})
    }      
}

const editTask = async (body,callback) => {
    const {id, ...send} = body
    try{
        const res = await fetch('/api/v1/inbox/your-todos/'+id, {
            method: 'PUT',
            body: JSON.stringify(send),
            headers: headers})

        console.log(res.status)
        
        if(res.status > 299){
            console.log('PRIMERO AQUI')
            throw new Error('Ha ocurrido un error inesperado')
        }
        callback()
    }catch(err){
        console.log('AQUIII', err)
        setErrorMessage('error al editar')
        
    }
    
}

const createTask = async (body, callback) => {
    try {
        const res = await fetch('/api/v1/inbox/your-todos/',{
            method: 'POST',
            headers: headers,
            body:  JSON.stringify(Object.assign(taskValue, body)),
        })
        const data = await res.json()
        if (res.status > 299){
            throw new Error('Ha ocurrido un error inesperado')
        }else{
            callback(data)
        }
    } catch (error) {
        setErrorMessage('Error al crear')
        callback({error: true})
    }
	
}

return <FunctionTasksContext.Provider
value={{createTask, deleteTask, editTask}}>
				{children}
</FunctionTasksContext.Provider>
}
				
export {FunctionTasksContext, FunctionTasksProvider}

//Object.assign(send, body)