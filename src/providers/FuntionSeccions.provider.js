import React, { useContext } from "react"
import {useAuth} from '../app/auth'
import { DatesContext } from "../app/datesContext"
import {SocketContext} from '../providers/socketContext'

const FunctionSectionsContext = React.createContext()

function FunctionSectionsProvider({children}){
    const {socket} = useContext(SocketContext)
    const auth = useAuth()
    const {values, setValues} = useContext(DatesContext)
    const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + auth.token,
    }

const deleteSection = async (id, callback) => {
				const res = await fetch('/api/v1/inbox/your-todos/'+ id, {
                    method: 'DELETE',
                    headers: headers,})
                if(res){
                    console.log(res)
                    callback()
                }
				
                
}

const updateSection = async (folderId, body, callback) => {
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

const createSection = async (body, callback) => {
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

const moveToSection = async (sectionId, callback) => {
    const res = await fetch('http://localhost:3000/api/v1/sections/' + sectionId,{
                    method: 'POST',
                    headers: headers,
                    body:JSON.stringify({
                        todoId: values.id
                      }),
    })
    if(res){
        socket.emit('moveToSection',{origen: values.section, destino: sectionId, user: socket.id,})
        console.log(`se movio ${values.id} a ${sectionId}`,res)
        console.log(`origen: ${values.section} destino:  ${sectionId}`,res)
        setValues(
            {
              id: null,
              content: '',
              details: '',
              event: '',
              notifications: [],
            })
        setTimeout(()=>callback(), 2000)
        
    }
}

return <FunctionSectionsContext.Provider
value={{createSection, updateSection, deleteSection, moveToSection}}>
				{children}
</FunctionSectionsContext.Provider>
}
				
export {FunctionSectionsContext, FunctionSectionsProvider}