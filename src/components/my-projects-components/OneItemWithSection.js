import React,{useContext, useState} from "react";
import { VisualItem } from "../inbox-components/VisualItem"
import { EditItemWithSection } from "./EditItemWithSection";

function OneItemWithSection ({values, functions}){
    const {dataValues: section, id, content, details, evento, sectionid, folderid, tasksInSections, animation} = values
    const {refreshSections, dispatchSections} = functions
    const [edit, setEdit] = useState(false)
    
    const dispatchTasks = (action) => {
      switch (action.type) {
        case 'UPDATE':
          const newTasksInsections = tasksInSections.map((elem) => {

            if(elem.id == action.payload.id){
              return {
                ...elem,
                ...action.payload.body
              }
            }
            return elem
          })
          dispatchSections({type: 'UPDATE', payload: {id: sectionid, body: {tasksInSections: newTasksInsections}}})  
          
        }
    }

    if(edit){
      return <EditItemWithSection
      values={values}
      functions={{refreshSections, dispatchSections, dispatchTasks , setEdit,}}></EditItemWithSection>
    }

    return <VisualItem
    values={{...values, section}}
    functions={{setEdit, dispatchTasks}}></VisualItem>
}
export {OneItemWithSection}