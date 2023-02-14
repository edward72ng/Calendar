import React,{useContext, useState} from "react";
import {useAuth} from '../../providers/auth'
import { Options } from "../my-projects-components/Options";
import { DataContext } from "../../providers/DataContext";
import { GaleryFromTask } from "./GaleryFromTask";
import { EditTask } from "./EditTask";
import { SubItem } from "./SubItem";

function EditItem ({values, functions}){
    const {id, content, details, evento, sectionid} = values
    const sectionId = sectionid
    const {refreshTasks, dispatchTasks, setEdit} = functions

    


    

   
    return (
      <div className="visual-container">
            <span className="material-symbols-outlined"
            onClick={()=>{setEdit(false)}}>
            cancel</span>

            <div className="visual-item-container">

              <div className="details-container"
              onClick={() => setEdit(true)}>
                <p className="content">{content}</p>
                <p className="details">{details}</p>
                <SubItem></SubItem>

                {evento
                ?
                <p className="details cont">{evento.event}
                  <i className="material-icons  nana">today</i>
                </p>
                :
                <></>
                }
              
              
              </div>

    
            </div>

             


        <GaleryFromTask></GaleryFromTask>

      </div>
    )
}
export {EditItem}