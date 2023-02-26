import React,{useContext, useState} from "react";
import { VisualItem } from "../inbox-components/VisualItem"
import { EditItemWithSection } from "./EditItemWithSection";

function OneItemWithSection ({values, functions}){
    const {id, content, details, evento, sectionid, folderid, tasksInSections} = values
    const {refreshSections, dispatchSections} = functions
    const [edit, setEdit] = useState(false)
    
    if(edit){
      return <EditItemWithSection
      values={values}
      functions={{refreshSections, dispatchSections, setEdit,}}></EditItemWithSection>
    }

    return <VisualItem
    values={values}
    functions={{setEdit}}></VisualItem>
}
export {OneItemWithSection}