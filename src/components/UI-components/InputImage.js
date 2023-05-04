import React, { useContext, useEffect, useState } from "react";
import { Modal } from "../../app/modal";
import './InputImage.css'
import { FunctionImagesContext } from "../../providers/FuctionImages.provider";

function InputImage({values, functions}) {
    const {todoid, myImages} = values
    const [isClosed, setIsClosed] = useState(true)
    const { createImage } = useContext(FunctionImagesContext)
    const [ succesful, setSuccesful] = useState(false)
    const {dispatchTasks} = functions

    const handleImage = (e) => {
        const file = e.target.files[0] 

        createImage({file, todoid}, (data) => {
            setSuccesful(true)
            console.log(data)
            dispatchTasks({type: 'UPDATE', payload: {id: todoid, body: {myImages: [...myImages, data]}}})
        })
    }

    if(isClosed){
        return (<div 
        className="select-image-button">
            <span 
            onClick={() => setIsClosed(false)}>Imagenes +</span>
        </div>);
    }

    return (<Modal>
        {succesful ?
        <div className="succes-save">
        <p>Imagen guardada exitosamente</p>
        <button 
            onClick={() => setIsClosed(true)}>Cerrar</button>
        </div>
        :
        <div 
        className="select-image-container">
            <input 
            type="file" 
            id="send-img"
            onChange={(e) => handleImage(e)}></input>
            <button 
            onClick={() => setIsClosed(true)}>Cancelar</button>
        </div>
        }
        
    </Modal>);
}

export {InputImage}