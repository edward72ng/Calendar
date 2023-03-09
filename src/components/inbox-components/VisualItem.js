import React,{useContext, useState} from "react";
import { DataContext } from "../../providers/DataContext";
import { GaleryFromTask } from "./GaleryFromTask";
import { SubItem } from "./SubItem";
import { Tags } from "./Tags";
import './Tags.css'

function VisualItem ({values, functions}){
    const {id, content, details, evento, sectionid, myTags, myPriority, priorityid} = values
    const {setEdit} = functions

    
    const [check, setCheck] = useState(false)
    const [expand, setExpand] = useState(false)
    const [subTasks, setSubTasks] = useState(false)
   
    return (
      <div className="visual-container" data-id={id}>

            <div className="visual-item-container" style={{borderRight: myPriority? `4px solid ${myPriority.color}`: 'none'}}>
                {check ?
                  <i className="material-icons"
                  onClick={()=>setCheck(false)}
                  >check_circle</i>
                :
                  <i className="material-icons"
                  onClick={()=>setCheck(true)}
                  >radio_button_unchecked</i>
                }

              <div className="details-container"
              onClick={() => setEdit(true)}>
                <Tags myTags={myTags}/>

                <p className="content">{content}</p>

                <p className="details">{details}</p>
                {evento
                ?
                <p className="details cont">{evento.event}
                  <i className="material-icons  nana">today</i>
                </p>
                :
                <></>
                }

                
              
              </div>

              <div className="icon-container">
                {subTasks?
                    <span className="material-symbols-outlined"
                    onClick={()=>{setSubTasks(!subTasks)}}>format_align_center</span>
                :
                    <span className="material-symbols-outlined"
                    onClick={()=>{setSubTasks(!subTasks)}}>segment</span>
                }
                {expand?
                  <a
                  onClick={()=>setExpand(!expand)}>
                    <i className="material-icons">expand_less</i>
                  </a>
                  :
                  <a
                  onClick={()=>setExpand(!expand)}>
                    <i className="material-icons">expand_more</i>
                  </a>
                }
                </div> 
            </div>
        { subTasks && <SubItem></SubItem>}
        { expand && <GaleryFromTask></GaleryFromTask> }
      </div>
    )
}
export {VisualItem}