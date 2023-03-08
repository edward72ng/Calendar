import React from "react";
import { CreateTag } from "../auxiliar-components/CreateTag";
import './Tags.css'

function Tags({myTags}) {
    
    return  <div className="tags-container">
    {
      myTags?.map((elem, i)=>{
        return(
        <div key={elem.id}>
          {elem.tag}
        </div>
          )
      })
    }
    
    </div>
}

export {Tags}