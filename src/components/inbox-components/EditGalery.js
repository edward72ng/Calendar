import React from "react";

function EditGalery ({myImages}) {  

  const handleDeleteImage = async (id) => {
    const res = await fetch(`api/v1/images/${id}`,{
      method: 'DELETE'
    })
    const data = res.json()
   
    
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