import React, { useContext, useEffect } from "react"
import {useAuth} from './auth'
import { DataContext } from "./DataContext"

const FunctionTagsContext = React.createContext()

function FunctionTagsProvider({children}){
    const auth = useAuth()

    const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + auth.token,
    }

const deleteTags = async (id, callback) => {
    try {
        const res = await fetch('/api/v1/tags/'+ id, {
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

const editTags = async (body,callback) => {
    const {id, ...send} = body
    try{
        const res = await fetch('/api/v1/tags/'+id, {
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

const createTags = async (body, callback) => {
    try {
        const res = await fetch('/api/v1/tags/',{
            method: 'POST',
            headers: headers,//here user
            body:  JSON.stringify(Object.assign(body)),
        })
        const data = await res.json()

        if (res.status > 299){
            throw new Error('Ha ocurrido un error inesperado')
        }else{
            callback(data)
        }
    } catch (error) {
        alert('Error al crear')
        callback()
    }
}

return <FunctionTagsContext.Provider
value={{createTags, editTags, deleteTags}}>
				{children}
</FunctionTagsContext.Provider>
}
				
export {FunctionTagsContext, FunctionTagsProvider}