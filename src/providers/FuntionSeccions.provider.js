import React, { useContext } from "react"
import {useAuth} from './auth'
import {SocketContext} from '../providers/socketContext'
import { DataContext } from "./DataContext"
import { ItemsContext } from "./ItemsContext"
import {funcSectionsBaseUrl} from "./URLS"

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

const deleteSection = async (id, callback) => {
    try {
        const res = await fetch(funcSectionsBaseUrl+ id, {
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
        const res = await fetch(funcSectionsBaseUrl + sectionId,{
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
        const res = await fetch(funcSectionsBaseUrl,{
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
value={{createSection, editSection, deleteSection,  move}}>
				{children}
</FunctionSectionsContext.Provider>
}
				
export {FunctionSectionsContext, FunctionSectionsProvider}