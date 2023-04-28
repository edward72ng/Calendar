import React from "react";
import './GaleryFromTask.css'

function GaleryFromTask ({myImages, functions}) {  


    return <div className="galery-container">
    {
      myImages?.map((elem, i)=>{
        return (
          <div 
          key={i} 
          className="galery-item">
            <img src={`${elem.imageurl}`}></img>
            
        </div>)
      })
    }
  </div>
}

export {GaleryFromTask}