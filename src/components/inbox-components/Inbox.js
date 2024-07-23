import React, { useContext } from "react";
import { OneItem } from "./OneItem";
import { ItemsContext } from "../../providers/ItemsContext";
import './foldersDroppable.css'
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { FunctionTasksContext } from "../../providers/FunctionTasks.provider";
import { reorder } from "../../utils/dragAndDrop";
import { AddButton } from "../UI-components/AddButton";
import { TaskModalContext } from "../../providers/TaskModalContext";

function Inbox () {
    const {inbox,
        dispatchInbox: dispatchTasks,
        updateInbox: refreshTasks,
        myProjects, 
        updateWithout} = useContext(ItemsContext);
    const { editTask } = useContext(FunctionTasksContext);
    const {setForm} = useContext(TaskModalContext);

    console.log("se rerenderiza inbox", inbox)
    
    const openTaskForm = () => {
        setForm((prevSate) => {
            return({
                ...prevSate,
                open: true
            })
        })
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
                ref={provided.innerRef}>
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
        </div>

        <div className="folders-droppable"> 
            <span className="tittle">Folders</span>
            {
            myProjects.map((elem, i) => {
            if(elem.name != "Inbox"){
                return(
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
                )
            }
            })

            }
        </div>

        </DragDropContext>

        <AddButton clickFunction={openTaskForm}/>
    </div>
}

export {Inbox}