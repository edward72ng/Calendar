import React, { useContext } from "react";  
import { useWithoutSection } from "../../custom-hooks/useWithoutSection";
import { OneItem } from "../inbox-components/OneItem";
import { DragDropContext, Draggable, Droppable} from 'react-beautiful-dnd'
import { DataContext } from "../../providers/DataContext";

function WithoutSection({values, functions}) {
    //const [task, dispatchTasks, refreshTasks] = useWithoutSection()

    const {task} = values
    const {dispatchTasks, refreshTasks} = functions
    const {filter}= useContext(DataContext)
    console.log(task)
    if(task.length < 1){
        return <></>
    }

    return <div className="section-container">
    <div className="space-between" id="section">
      <div className="section"> Sin Seccion </div>
    </div>
    
    <Droppable droppableId={'without-section'} isDropDisabled={true}>
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style= {{marginBottom: "4px"}}
            >

            {task.map((elem, i) => (
                <Draggable key={elem.id? elem.id : getRandomNumber(10,200)} 
                draggableId={String(elem.id)} index={i}>
                {(provided) => (
                <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}>
                    <OneItem key={elem.id? elem.id : getRandomNumber(10,200)} 
                    values={{...elem}}
                    functions = {{refreshTasks, dispatchTasks}}>
                    </OneItem>
                  </div>
                )}
                </Draggable>
            ))}

              {provided.placeholder}
            </div>
          )}
        </Droppable>
</div>

}

export {WithoutSection}

/**
 * {
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
 */