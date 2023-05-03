import React, { useContext } from "react"
import {useAuth} from './auth'
import {SocketContext} from '../providers/socketContext'
import { DataContext } from "./DataContext"
import { ItemsContext } from "./ItemsContext"

const FunctionImagesContext = React.createContext()

const CLOUDINARY_UPLOAD_PRESET = 'sclhqfzp'
const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/ds2egvrc7/image/upload'

function FunctionImagesProvider({children}){
    const { setErrorMessage } = useContext(ItemsContext)
    const auth = useAuth()
    
    const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + auth.token,
    }


const createImage = async ({file, todoid}, callback) => {
    try {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

        fetch(CLOUDINARY_URL,{
            method: 'POST',
            body :formData,
        })
        .then((res) => res.json())
        .then((data) => {

            fetch('api/v1/images/create',{
                method: 'POST',
                headers:  headers,
                body: JSON.stringify({
                    imageurl: data.secure_url,
                    todoid: todoid
                })
            })
        })
        callback()
                
    } catch (error) {
        setErrorMessage('Error al Guardar La imagen')
        console.log(error)
    }
				
}


const deleteImage = async (id, callback) => {
    try {
        const res = await fetch(`api/v1/images/${id}`,{
            method: 'DELETE',
            headers:  headers,
          })
          const data = res.json()
          
        callback()
                
    } catch (error) {
        setErrorMessage('Error al Borrar La imagen')
        console.log(error)
    }
				
}



return <FunctionImagesContext.Provider
value={{createImage, deleteImage}}>
				{children}
</FunctionImagesContext.Provider>
}
				
export {FunctionImagesContext, FunctionImagesProvider}