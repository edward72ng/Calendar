import React, { useContext } from "react";
import { FunctionImagesContext } from "../../providers/FuctionImages.provider";

function EditGalery ({values, functions}) {  
  const { deleteImage} = useContext(FunctionImagesContext)
  const {id, myImages} = values
  const {dispatchTasks} = functions

  const handleDeleteImage = async (imageId) => {
    const newMyImages = myImages.filter((elem) => {
      return elem.id !== imageId
    })

    dispatchTasks({type: 'UPDATE', payload: {id: id, body: {myImages: newMyImages}}})
    //insertar dispatch que edite la existencia de imagem en el estado
    deleteImage(imageId, () => {
      //ejecutar luego de que la accion sea correta
    })
  }

    return <div className="galery-container">
    {
      myImages?.map((elem, i)=>{
        return (
        <div 
          key={i} 
          className="galery-item">
            <img src={`${elem.imageurl}`}></img>
            <span 
            className="material-symbols-outlined"
            onClick={() => handleDeleteImage(elem.id)}>delete</span>
        </div>)
      })
    }
  </div>
}

export {EditGalery}