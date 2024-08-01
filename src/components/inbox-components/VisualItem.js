import React,{useContext, useEffect, useState} from "react";
import { DataContext } from "../../providers/DataContext";
import { GaleryFromTask } from "./GaleryFromTask";
import { SubItem } from "./SubItem";
import { Tags } from "./Tags";
import './Tags.css'
import { TaskModalContext } from "../../providers/TaskModalContext";
import { ItemsContext } from "../../providers/ItemsContext";

function VisualItem ({values, functions}){
    const {
      id,
      content,
      details,
      evento,
      sectionid,
      myTags,
      myPriority,
      priorityid,
      mySubtasks,
      myImages,
      section} = values
    const {setEdit, dispatchTasks} = functions
    const {filter} = useContext(DataContext)
    const {setForm} = useContext(TaskModalContext)
    const {getFolder} = useContext(ItemsContext)
    const [check, setCheck] = useState(false)
    const [expand, setExpand] = useState(false)
    const [subTasks, setSubTasks] = useState(false)
   
  useEffect(() => {
    const element = document.getElementById(id)

    const deleteClass = (element) =>{
      console.log('SE VA A ELIM', element)
      if(element){
        element.classList.remove('appear')
      }
    }

    setTimeout(() => {
      deleteClass(element)
    }, 600)//0.6s 

  },[])

  const openEditForm =  () => {
    setForm((prevSate) => {
      return({
        ...prevSate,
        openEdit: true,
        actualFolder: getFolder(filter),
        actualSection: section,
        actualTask: values
      })
    })
  }

    return (
      <div 
      className={`visual-container appear`} 
      id={id} 
      data-id={id}
      onClick={openEditForm}
      >

            <div className="visual-item-container" 
            style={{borderRight: myPriority? `4px solid ${myPriority.color}`: 'none'}}>
                {check ?
                  <i className="material-icons"
                  onClick={()=>setCheck(false)}
                  >check_circle</i>
                :
                  <i className="material-icons"
                  onClick={()=>setCheck(true)}
                  >radio_button_unchecked</i>
                }

              <div className="details-container">
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
        { subTasks && <SubItem values={{subTasks: mySubtasks, taskid: id}} functions={{dispatchTasks}}/>}
        { expand && <GaleryFromTask myImages={myImages}></GaleryFromTask> }
      </div>
    )
}
export {VisualItem}