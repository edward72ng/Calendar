import React, { useContext, useEffect } from "react"
import {useAuth} from './auth'
import { DataContext } from "./DataContext"
import { ItemsContext } from "./ItemsContext"
import {tagsBaseUrl} from "./URLS"

const FunctionTagsContext = React.createContext()


function FunctionTagsProvider({children}){
    const { setErrorMessage } = useContext(ItemsContext)
    const auth = useAuth()

    const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + auth.token,
    }

const deleteTag = async (id, callback) => {
    try {
        const res = await fetch(tagsBaseUrl+ id, {
            method: 'DELETE',
            headers: headers,})

        if(res.status > 299){
            throw new Error('Ha ocurrido un error inesperado')
        }
        callback()
    } catch (error) {
        setErrorMessage('Error al borrar Etiqueta ')
        console.log(error)
    }      
}

const editTag = async (body,callback) => {
    const {id, ...send} = body
    try{
        const res = await fetch(tagsBaseUrl+id, {
            method: 'PUT',
            body: JSON.stringify(send),
            headers: headers})
            
        if(res.status > 299){
            throw new Error('Ha ocurrido un error inesperado')
        }else if (res.status == 200){
            callback()
        }
    }catch(err){
        setErrorMessage('Error al editar Etiqueta ')
        console.log(err)
    }
    
}

const createTags = async (body, callback) => {
    console.log(body)
    try {
        const res = await fetch(tagsBaseUrl,{
            method: 'POST',
            headers: headers,//here user
            body:  JSON.stringify(body),
        })
        const data = await res.json()
        
        if (res.status > 299){
            throw new Error('Ha ocurrido un error inesperado')
        }else{
            callback(data)
        }
    } catch (error) {
        setErrorMessage('Error al Crear Etiqueta ')
        console.log(error)
        //callback() 
    }
}

return <FunctionTagsContext.Provider
value={{createTags, editTag, deleteTag}}>
				{children}
</FunctionTagsContext.Provider>
}
				
export {FunctionTagsContext, FunctionTagsProvider}