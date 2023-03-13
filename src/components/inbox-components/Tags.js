import React from "react";
import { CreateTag } from "../auxiliar-components/CreateTag";
import './Tags.css'

function Tags({myTags}) {
    
    return  <div className="tags-container">
    {
      myTags?.map((elem, i)=>{
        return(
        <div key={elem.id} style={
          {backgroundColor: `rgba(${elem.myColor?.color ? elem.myColor.color: '204,204,204'},0.1)`,
            color: `rgba(${elem.myColor?.color ? elem.myColor.color: '204,204,204'},1)`
          }}>
          {elem.tag}
        </div>
          )
      })
    }
    
    </div>
}

export {Tags}