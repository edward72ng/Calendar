import React, { useContext, useEffect } from "react"
import {useAuth} from './auth'
import { DataContext } from "./DataContext"

const FunctionTasksContext = React.createContext()

function FunctionTasksProvider({children}){
    const auth = useAuth()
    const { taskValue, setDefault } = useContext(DataContext)
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
    } catch (error) {
        alert('error al borrar')
        callback()
    }      
}

const editTask = async (body,callback) => {
    const {id, ...send} = body
    try{
        const res = await fetch('/api/v1/inbox/your-todos/'+id, {
            method: 'PUT',
            body: JSON.stringify(send),
            headers: headers})
        if(res.status > 299){
            throw new Error('Ha ocurrido un error inesperado')
        }else if (res.status == 200){
            callback()
        }
    }catch(err){
        alert('error al editar')
        callback()
    }
    
}

const createTask = async (body, callback) => {
    try {
        const res = await fetch('/api/v1/inbox/your-todos/',{
            method: 'POST',
            headers: headers,
            body:  JSON.stringify(Object.assign(taskValue, body)),
        })
        
        if (res.status > 299){
            throw new Error('Ha ocurrido un error inesperado')
        }else{
            console.log('Todo parece aver marchado bien')
            //setDefault()
            callback()
        }
    } catch (error) {
        alert('Error al crear')
        callback()
    }
	
}

return <FunctionTasksContext.Provider
value={{createTask, deleteTask, editTask}}>
				{children}
</FunctionTasksContext.Provider>
}
				
export {FunctionTasksContext, FunctionTasksProvider}

//Object.assign(send, body)