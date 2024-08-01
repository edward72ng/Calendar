
import React, { useContext, useEffect, useState } from "react";
import { FunctionSectionsContext } from "../../providers/FuntionSeccions.provider";
import { SocketContext } from "../../providers/socketContext";
import { OneItemWithSection} from "./OneItemWithSection"
import { AddTask } from "./AddTask";
import { DataContext } from "../../providers/DataContext";
import { FunctionTasksContext } from "../../providers/FunctionTasks.provider";
import { DragDropContext, Draggable, Droppable} from 'react-beautiful-dnd'
import {reloadSectionsUrl} from '../../providers/URLS'
import { useItem } from "../../custom-hooks/useItem";
import globalState from '../../custom-hooks/SingletonGlobalState'

function SectionHome({dataValues, functions, index}) {
    const {id, section, tasksInSections, orders} = dataValues
    const  [items, dispatchItems] = useItem(tasksInSections)
    const {refreshSections, dispatchSections} = functions
  console.log(section)

    globalState.setMoreFunctions({
      id: id,
      dispatch: dispatchItems,
      items: items,
      dispatchSections: dispatchSections,
      order: orders.split("|").filter(elem => elem !== '')
    })



    //console.log('RENDER',copyTasks)
    
    const {socket} = useContext(SocketContext)
   
    //const [task, dispatchTasks ,refreshTasks] = useUpdate(tasksInSections)
    const {deleteSection, editSection, move} = useContext(FunctionSectionsContext)
    const {editTask} = useContext(FunctionTasksContext)
    const {filter, dragInfo, setDragInfo, setDragDefault} = useContext(DataContext)
    const [openEdit, setOpenEdit] = useState(false)
    const [input, setInput] = useState(section)

  
    const handleEdit = () => {
        dispatchSections({type: 'UPDATE', payload: {id: id, body: {section: input}}});
        editSection(id, {section: input},() => refreshSections(`${reloadSectionsUrl}${filter}`))
        setOpenEdit(false)
    }


      return <div className="section-container"  id={id}>
        
        <div className="space-between tittle">
            {openEdit ?
            <>
            <input value={input}
            onChange= {(e)=> setInput(e.target.value)}></input>
            <div>
            <span className="material-symbols-outlined"
            onClick={handleEdit}>done</span>
            <span className="material-symbols-outlined"
            onClick={()=> setOpenEdit(!openEdit)}>close</span>
            </div>
            </>
            :
            <>
            <div className="section"
            onClick={()=> setOpenEdit(!openEdit)}> {section} </div>
          <span className="material-symbols-outlined"
        onClick={()=>{dispatchSections({type: 'DELETE', payload: {id: id}}) ;deleteSection(id, refreshSections);}}>delete</span>
            </>
            }
          
        </div> 
         
       
        
        <Droppable droppableId={String(id)}>
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style= {{marginBottom: "4px"}}
            >

            {items.map((elem, i) => (
                <Draggable key={elem.id? elem.id : 'Provitional DragId'} 
                draggableId={String(elem.id)} index={i}>
                {(provided) => (
                <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}>
                    <OneItemWithSection key={elem.id? elem.id : 'Provitional TaskId'} 
                    values={{...elem, tasksInSections, orders, dataValues}}
                    functions = {{refreshSections, dispatchSections}}>
                    </OneItemWithSection>
                  </div>
                )}
                </Draggable>
            ))}

              {provided.placeholder}
            </div>
          )}
        </Droppable>

        
       

         <AddTask
         dataValues={dataValues}
         functions={{dispatchTasks: dispatchSections, refreshTasks: refreshSections}}></AddTask> 
    </div>

    
    
}

export {SectionHome}









