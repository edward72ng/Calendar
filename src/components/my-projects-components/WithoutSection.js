import React, { useContext } from "react";  
import { useWithoutSection } from "../../custom-hooks/useWithoutSection";
import { OneItem } from "../inbox-components/OneItem";
import { DragDropContext, Draggable, Droppable} from 'react-beautiful-dnd'
import { DataContext } from "../../providers/DataContext";

function WithoutSection({values, functions}) {
    const {task} = values
    const {dispatchTasks, refreshTasks} = functions

    if(task.length < 1){
        return <></>
    }
    else{
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
                <Draggable key={elem.id? elem.id : 'withouthSectionDraggable'} 
                draggableId={String(elem.id)} index={i}>
                {(provided) => (
                <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}>
                    <OneItem key={elem.id? elem.id : 'withoutTask'} 
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
}

export {WithoutSection}
