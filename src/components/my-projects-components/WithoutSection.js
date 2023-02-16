import React from "react";  
import { useWithoutSection } from "../../custom-hooks/useWithoutSection";
import { OneItem } from "../inbox-components/OneItem";

function WithoutSection() {
    const [task, dispatchTasks, refreshTasks] = useWithoutSection()

    if(task.length < 1){
        return <></>
    }

    return <div className="section-container">
    <div className="space-between" id="section">
      <div className="section"> Sin Seccion </div>
    </div>
    
    
    {
        task.map((elem, i)=>{
            const {id, content, details, evento, sectionid, folderid} = elem
            return (
                <OneItem key={id} 
                values={{id, content, details, evento, sectionid, folderid}}
            functions = {{refreshTasks, dispatchTasks}}>
                
                </OneItem>
            )
        })
    }  
</div>

}

export {WithoutSection}