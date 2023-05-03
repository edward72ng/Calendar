import React, { useContext } from "react";
import { FunctionImagesContext } from "../../providers/FuctionImages.provider";

function EditGalery ({myImages}) {  
  const { deleteImage} = useContext(FunctionImagesContext)

  const handleDeleteImage = async (id) => {
    
    //insertar dispatch que edite la existencia de imagem en el estado
    deleteImage(id, () => {
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