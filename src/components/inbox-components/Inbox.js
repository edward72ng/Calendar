import React, { useContext, useEffect, useState } from "react";
import { OneTodo } from "./OneTodo";
import { UseFetch } from "../../custom-hooks/useFetch";
import { useFetchItems } from "../../custom-hooks/useFetchItems";
import { Add } from "../auxiliar-components/Add";
import { FormTask } from "../auxiliar-components/FormTask";
import { OneItem } from "./OneItem";
import { FormCreate } from "../auxiliar-components/FormCreate";
import { ItemsContext } from "../../providers/ItemsContext";
import './foldersDroppable.css'
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { FunctionTasksContext } from "../../providers/FunctionTasks.provider";
import { reorder } from "../../utils/dragAndDrop";

const colors = ['#fff8b9','#e2f6d3','#b4ded4','#afccdc','#f29f75'] 
function Inbox () {
    const {inbox, dispatchInbox: dispatchTasks, updateInbox: refreshTasks, myProjects, updateAll, updateWithout} = useContext(ItemsContext)
    const {editTask} = useContext(FunctionTasksContext)
    const [form, setForm] = useState(false)
    const [isClosing, setIsClosing] = useState(false)

    const closeForm = () => {
        setIsClosing(true)
        setTimeout(()=>{
            setForm(false)
        }, 1000)
    }
    const openForm = () => {
        setIsClosing(false)
        setForm(true)
    }
    const onDragEnd = (values) => {
        const { source, destination, draggableId } = values

        if(!destination){
            return;
          }
        if(source.droppableId == "inbox-list" && destination.droppableId != "inbox-list"){
            console.log(values)
            dispatchTasks({type: 'DELETE', payload: {id: parseInt(draggableId)}});
            editTask({id: draggableId, folderid: destination.droppableId}, () => {updateWithout()});
            return;
        }
        if(source.droppableId == destination.droppableId){
            const data = reorder(inbox, source.index, destination.index)
            dispatchTasks({type: 'SET', payload: {body: data}})
        }
    }
    

    return <div className="inbox-container">
        <DragDropContext onDragEnd={onDragEnd}>
        <div className="list-inbox">
            <span className="tittle">Inbox</span>
            <Droppable droppableId={'inbox-list'}>
            {(provided) => (
            <div className=""
            {...provided.droppableProps}
                ref={provided.innerRef}
            >
            {
                inbox.map((elem, i)=>(
                <Draggable key={elem.id? elem.id : 'proovitionalid'} 
                draggableId={String(elem.id)} index={i}>
                {(provided) => (
                <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}>
                    <OneItem
                    values={elem}
                    functions = {{refreshTasks, dispatchTasks}}>
                    
                    </OneItem>
                  </div>
                )}
                </Draggable>
                    
                ))
            }
            </div>
            )}</Droppable>

        {(form && !isClosing) &&
        <div className="adding"
        onClick={closeForm}>
            <span className="material-symbols-outlined">close</span>
        </div>
        }
        {(!form || isClosing) &&
        <div className="adding"
        onClick={openForm}>
            <span className="material-symbols-outlined">add</span>
        </div>
        }
    {form && 
    <FormCreate
    values = {{isClosing}}
    functions={{dispatchTasks, refreshTasks, setForm}}></FormCreate>
    }
        </div>
    
        
            <div className="folders-droppable"> 
            <span className="tittle">Folders</span>
            {
            myProjects.map((elem, i) => (
            <div key={elem.id} className="folders-droppable-item" style={{backgroundColor: `rgba(${elem.myColor.color}, 0.5)`}}>
                <span>{elem.name}</span>
                <Droppable  droppableId={String(elem.id)}>
                {(provided) => (
                <div className="folders-droppable-space"
                {...provided.droppableProps}
                ref={provided.innerRef}>
                    

                </div>
                )}
                </Droppable>
            </div>
            ))
            }
            </div>

        </DragDropContext>
    </div>
}

export {Inbox}