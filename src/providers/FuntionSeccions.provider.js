import React, { useContext } from "react"
import {useAuth} from './auth'
import {SocketContext} from '../providers/socketContext'
import { DataContext } from "./DataContext"
import { ItemsContext } from "./ItemsContext"

const FunctionSectionsContext = React.createContext()

function FunctionSectionsProvider({children}){
    const { setErrorMessage } = useContext(ItemsContext)
    const {socket} = useContext(SocketContext)
    const auth = useAuth()
    const {taskValue, setTaskValue, setDefault} = useContext(DataContext)
    const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + auth.token,
    }

const moveToSection = async (sectionId, callback) => {
    try {
        const res = await fetch('http://localhost:3000/api/v1/sections/' + sectionId,{
                    method: 'POST',
                    headers: headers,
                    body:JSON.stringify({
                        todoId: taskValue.id
                      }),
    })
    if(res.status > 299){
        throw new Error('Ha ocurrido un error inesperado')
    }
    if(res){
        socket.emit('moveToSection',{origen: taskValue.section, destino: sectionId, user: socket.id,})
        console.log(`se movio ${taskValue.id} a ${sectionId}`,res)
        console.log(`origen: ${taskValue.section} destino:  ${sectionId}`,res)
        setTaskValue(
            {
              id: null,
              content: '',
              details: '',
              event: '',
              notifications: [],
            })
        setTimeout(()=>callback(), 1000)
        
    }
    } catch (error) {
        setErrorMessage('Error al mover a seccion')
        console.log(error)
    }
    
}

const deleteSection = async (id, callback) => {
    try {
        const res = await fetch('/api/v1/sections/'+ id, {
            method: 'DELETE',
            headers: headers,})
        const data = await res.json()
        if (res.status > 299){
            throw new Error('Algo salio mal')
        }
    } catch (error) {
        setErrorMessage('Error al borrar seccion')
        console.log(error)
    }
				
				
                
}

const editSection = async (sectionId, body, callback) => {
    try {
        const res = await fetch('http://localhost:3000/api/v1/sections/' + sectionId,{
								method: 'PUT',
								headers: headers,
								body: JSON.stringify(body),
				})
                if(res.status > 299){
                    throw new Error('Ha ocurrido un error inesperado')
                }
				if(res){
                    console.log(res)
                    callback()
                }
    } catch (error) {
        setErrorMessage('Error al editar aseccion')
        console.log(error)
    }
				
}

const createSection = async (body, callback) => {
    try {
        const res = await fetch('http://localhost:3000/api/v1/sections',{
								method: 'POST',
								headers: headers,
								body:  JSON.stringify(body),
				})
                if(res.status > 299){
                    throw new Error('Ha ocurrido un error inesperado')
                }
				if(res){
                    console.log(res)
                    callback()
                }
    } catch (error) {
        setErrorMessage('Error al Crear seccion')
        console.log(error)
    }
				
}




const move = async(sectionId, callback)=>{
    socket.emit('refrescar', {origen: taskValue.section, destino: sectionId, todo: taskValue.id, exclude: socket.id})
    setTimeout(()=>callback(), 1000)
    setDefault()
}

return <FunctionSectionsContext.Provider
value={{createSection, editSection, deleteSection, moveToSection, move}}>
				{children}
</FunctionSectionsContext.Provider>
}
				
export {FunctionSectionsContext, FunctionSectionsProvider}