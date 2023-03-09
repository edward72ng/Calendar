import React from "react";
import { CreateTag } from "../auxiliar-components/CreateTag";
import './Tags.css'

function Tags({myTags}) {
    
    return  <div className="tags-container">
    {
      myTags?.map((elem, i)=>{
        return(
        <div key={elem.id} style={
          {backgroundColor: `rgba(${elem.myColor.color},0.1)`,
            color: `rgba(${elem.myColor.color},1)`
          }}>
          {elem.tag}
        </div>
          )
      })
    }
    
    </div>
}

export {Tags}