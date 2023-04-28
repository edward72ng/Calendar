import React, { useEffect, useState } from "react";
import { Modal } from "../../app/modal";
import './InputImage.css'

const CLOUDINARY_UPLOAD_PRESET = 'sclhqfzp'
const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/ds2egvrc7/image/upload'


function InputImage({values, functions}) {
    const {todoid} = values
    const [isClosed, setIsClosed] = useState(true)

    useEffect(() => {
        const sendImg = document.getElementById('send-img')
        const previewImg = document.getElementById('preview-img')
        if(sendImg && previewImg){
            sendImg.addEventListener('change', (e) => {
                console.log(e)
    
                const file = e.target.files[0];
                const formData = new FormData();
                formData.append('file', file);
                formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
    //send image
                fetch(CLOUDINARY_URL,{
                    method: 'POST',
                    body :formData,
                 
                })
                .then((res) => res.json())
                .then((data) => {
                    console.log(data)
                    previewImg.src = data.secure_url

                    fetch('api/v1/images/create',{
                        method: 'POST',
                        headers:  {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json'
                          },
                        body: JSON.stringify({
                            imageurl: data.secure_url,
                            todoid: todoid
                        })
                    })
                    .then(res => res.json())
                    .then((data) => {
                        
                    })
                })
                .catch((err) => console.log('ERROR IN FETCH'))
            })
        }

    }, [isClosed])

    if(isClosed){
        return (<div 
        className="select-image-button">
            <span 
            onClick={() => setIsClosed(false)}>Imagenes +</span>
        </div>);
    }

    return (<Modal>
        <div 
        className="select-image-container">
            <img src="" id="preview-img"></img>
            <input type="file" id="send-img"></input>
            <button 
            onClick={() => setIsClosed(true)}>Cancelar</button>
        </div>
    </Modal>);
}

export {InputImage}