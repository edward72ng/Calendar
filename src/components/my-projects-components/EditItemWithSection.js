import React,{useContext, useState} from "react";
import { GaleryFromTask } from "../inbox-components/GaleryFromTask";
import { SubItem } from "../inbox-components/SubItem";
import { FunctionTasksContext } from "../../providers/FunctionTasks.provider";
import { ItemsContext } from "../../providers/ItemsContext";

function EditItemWithSection ({values, functions}){
    const {id, content, details, evento, sectionid, folderid, userId, eventId, tasksInSections} = values
  
    const {refreshsections, dispatchSections, setEdit} = functions
    const {updateAll} = useContext(ItemsContext)
    const {editTask, deleteTask} = useContext(FunctionTasksContext)

    const initialValues = {
      id: id,
      content: content,
      details: details,
      evento: evento,
      sectionid: sectionid,
      folderid: folderid,
      userId: userId,
      eventId: eventId,
    }
    const [editValues, setEditValues] = useState(initialValues)
    
    const sendEdit = () => {
      const newTasksItems = tasksInSections.map((elem) => {

        if(elem.id == id){
          console.log(editValues)
          return editValues
        }
        return elem
      })

      dispatchSections({type: 'UPDATE', payload: {id: sectionid, body: {tasksInSections: newTasksItems}}})
      setEdit(false)
      editTask(editValues, ()=>{})
    }

    const deleteItem = () => {
      const newTasksItems = tasksInSections.filter((elem)=>{
        return elem.id !== id;
      })
      dispatchSections({type: 'UPDATE', payload: {id: sectionid, body: {tasksInSections: newTasksItems}}})
      setEdit(false)
      deleteTask(id,()=>{})
    }
    

   
    return (
      <div className="visual-container" data-id={id}>
            <span className="material-symbols-outlined"
            onClick={()=>{setEdit(false)}}>
            close</span>
            <span className="material-symbols-outlined"
            onClick={()=>{sendEdit()}}>
            done</span>
            
            <div className="visual-item-container">

              <div className="details-container"
              onClick={() => setEdit(true)}>
                <input className="edit-value"
                value={editValues.content}
                onChange={(e)=>setEditValues({...editValues, content: e.target.value})}></input>
                <textarea className="edit-value" 
                value={editValues.details}
                onChange={(e)=>setEditValues({...editValues, details: e.target.value})}></textarea>
                

                {evento
                ?
                <p className="details cont">{evento.event}
                  <i className="material-icons  nana">today</i>
                </p>
                :
                <></>
                }
                <SubItem></SubItem>
              
              </div>

    
            </div>

             


        <GaleryFromTask></GaleryFromTask>
        <span className="material-symbols-outlined"
            onClick={()=>{deleteItem()}}>
            delete</span>
            
      </div>
    )
}
export {EditItemWithSection}