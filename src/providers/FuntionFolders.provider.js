import React from "react"
import {useAuth} from '../app/auth'

const FunctionFoldersContext = React.createContext()
const auth = useAuth()
const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + auth.token,
}

function FunctionFoldersProvider({children}){


const deleteFolder = async (id, callback) => {
				const res = fetch('#'+id,{
								method: 'DELETE',
								headers: headers,
				})
				callback()
}

const updateFolder = async (id, body, callback) => {
				const res = fetch('#'+id,{
								method: 'PUT',
								headers: headers,
								body: body,
				})
				callback()
}

const createFolder = async (body, callback) => {
				const res = fetch('#',{
								method: 'POST',
								headers: headers,
								body: body,
				})
				callback()
}


return <FunctionFoldersContext value={{deleteFolder, updateFolder, createFolder}}>
				{children}
</FunctionFoldersContext>
}
				
export {FunctionFoldersContext, FunctionFoldersProvider}