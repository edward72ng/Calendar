import React from "react";  
import { useWithoutSection } from "../../custom-hooks/useWithoutSection";
import { OneItem } from "../inbox-components/OneItem";

function WithoutSection() {
    const [task, dispatchTasks, refreshTasks] = useWithoutSection()

    return <div className="section-container">
        
        <div className="space-between" id="section">
          <div className="section"> Sin Seccion </div>
          <i className="material-icons">delete</i>
        </div>
        
        
        {
            task.map((elem, i)=>{
                const {id, content, details, evento, sectionid} = elem
                return (
                    <OneItem key={id} 
                    values={{id, content, details, evento, sectionid}}
                functions = {{refreshTasks, dispatchTasks}}>
                    
                    </OneItem>
                )
            })
        }  
    </div>

}

export {WithoutSection}