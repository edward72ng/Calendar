import React, { useContext } from "react"
import {useAuth} from '../app/auth'
import { DatesContext } from "../app/datesContext"

const FunctionTasksContext = React.createContext()

function FunctionTasksProvider({children}){
    const auth = useAuth()
    const {values, setValues} = useContext(DatesContext)
    const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + auth.token,
    }

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

const createTask = async (body, callback) => {
				const res = await fetch('http://localhost:3000/api/v1/folders',{
								method: 'POST',
								headers: headers,
								body:  JSON.stringify(body),
				})
				if(res){
                    console.log(res)
                    callback()
                }
}

return <FunctionTasksContext.Provider
value={{createTask, updateTask, deleteTask}}>
				{children}
</FunctionTasksContext.Provider>
}
				
export {FunctionTasksContext, FunctionTasksProvider}