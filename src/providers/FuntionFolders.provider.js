import React, { useContext } from "react"
import {useAuth} from './auth'
import { ItemsContext } from "./ItemsContext"

const FunctionFoldersContext = React.createContext()

function FunctionFoldersProvider({children}){
    const auth = useAuth()
    const { setErrorMessage } = useContext(ItemsContext)

    const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + auth.token,
    }

const deleteFolder = async (id, callback) => {
    try {
        const res = await fetch('http://localhost:3000/api/v1/folders/'+id,{
								method: 'DELETE',
								headers: headers,
				})
                if(res.status > 299){
                    throw new Error('Ha ocurrido un error inesperado')
                }
                    console.log(res)
                    callback()
                
    } catch (error) {
        setErrorMessage('Error al bprarr folder ')
        console.log(error)
    }
				
				
                
}

const updateFolder = async (folderId, body, callback) => {
    try {
        const res = await fetch('http://localhost:3000/api/v1/folders/' + folderId,{
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
        setErrorMessage('Error al acttualizar Folder ')
        console.log(error)
    }
				
                
}

const createFolder = async (body, callback) => {
    try {
        const res = await fetch('http://localhost:3000/api/v1/folders',{
								method: 'POST',
								headers: headers,
								body:  JSON.stringify(body),
				})
				if(res.status > 299){
                    throw new Error('Ha ocurrido un error inesperado')
                }
                    console.log(res)
                    callback()
    } catch (error) {
        setErrorMessage('Error al Crear Folder ')
        console.log(error)
    }
				
                
}

const moveToFolder = async (folderId, callback) => {
    try {
        const res = await fetch('http://localhost:3000/api/v1/folders/'+folderId,{
                                method: 'POST',
                                headers: headers,
                                body: JSON.stringify({todoId:''}),
                })
                if(res.status > 299){
                    throw new Error('Ha ocurrido un error inesperado')
                }
                    console.log('se movio el item')
                    console.log(res)
                        callback()
    } catch (error) {
        setErrorMessage('Error al mover al folder ')
        console.log(error)
    }
                
                
}


return <FunctionFoldersContext.Provider
value={{deleteFolder, updateFolder, createFolder, moveToFolder}}>
				{children}
</FunctionFoldersContext.Provider>
}
				
export {FunctionFoldersContext, FunctionFoldersProvider}