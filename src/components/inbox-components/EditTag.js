import React from "react";
import './Tags.css'

function EditTag({myTags, handleDeleteTag}) {
    
    return  <div className="tags-container">
    {
      myTags?.map((elem, i)=>{
        return(
        <div 
        key={elem.id}
        className="edit-tag-container" 
        style={
          {backgroundColor: `rgba(${elem.myColor?.color ? elem.myColor.color: '204,204,204'},0.1)`,
            color: `rgba(${elem.myColor?.color ? elem.myColor.color: '204,204,204'},1)`
          }}>
          <span>{elem.tag}</span>
          <span 
          className="material-symbols-outlined"
          onClick={() => handleDeleteTag(elem.id)}>close</span>
        </div>
          )
      })
    }
    
    </div>
}

export {EditTag}