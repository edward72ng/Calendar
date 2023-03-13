import React, { useContext } from "react";
import { ItemsContext } from "../../providers/ItemsContext";
import { TagItem } from "./TagItem";
import './TagsSlider.css'

function TagsSlider() {
    const {tags} = useContext(ItemsContext)

    return (
        <div className="tags-slider">
  <div className="tags-slider__wrapper">
    <div className="tags-slider__tags">
      {tags.map((elem) => {
        return <TagItem key={elem.id} values={elem}/>
      })}
    </div>
  </div>
</div>
    )
}

export {TagsSlider}

/**className={`tag ${elem.selected ? 'selected' : ''}`} */