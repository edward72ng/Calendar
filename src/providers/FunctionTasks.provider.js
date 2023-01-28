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
				const res = await fetch('/api/v1/inbox/your-todos/'+ id, {
                    method: 'DELETE',
                    headers: headers,})
                if(res){
                    console.log(res)
                    callback()
                }
				
                
}

const updateTask = async (folderId, body, callback) => {
				const res = await fetch('#' + folderId,{
								method: 'PUT',
								headers: headers,
								body: body,
				})
				if(res){
                    console.log(res)
                    callback()
                }
}

const createTask = async (body) => {
                if(taskValue.id){
                    fetch('/api/v1/inbox/your-todos/'+taskValue.id, {
                        method: 'PUT',
                        body: JSON.stringify(Object.assign(taskValue, body)),
                        headers: headers
                      })
                }else{
				await fetch('/api/v1/inbox/your-todos/',{
								method: 'POST',
								headers: headers,
								body:  JSON.stringify(Object.assign(taskValue, body)),
				})
            }
				setDefault()
}

return <FunctionTasksContext.Provider
value={{createTask, updateTask, deleteTask}}>
				{children}
</FunctionTasksContext.Provider>
}
				
export {FunctionTasksContext, FunctionTasksProvider}