import React,{useContext, useState} from "react";
import { GaleryFromTask } from "../inbox-components/GaleryFromTask";
import { SubItem } from "../inbox-components/SubItem";
import { FunctionTasksContext } from "../../providers/FunctionTasks.provider";
import { ItemsContext } from "../../providers/ItemsContext";
import { FunctionSectionsContext } from "../../providers/FuntionSeccions.provider";
import { Options } from "../auxiliar-components/Options";
import { DataContext } from "../../providers/DataContext";

function EditItemWithSection ({values, functions}){
    const {id, content, details, evento, sectionid, folderid, userId, eventId, tasksInSections, orders, notifications} = values
  
    const {refreshsections, dispatchSections, setEdit} = functions
    const {updateAll} = useContext(ItemsContext)
    const {editTask, deleteTask} = useContext(FunctionTasksContext)
    const {editSection} = useContext(FunctionSectionsContext)
    const {filter} = useContext(DataContext)

    const initialValues = {
      id: id,
      content: content,
      details: details,
      //evento: evento,
      sectionid: sectionid,
      
      userId: userId,
      eventId: eventId,
    }

    const initialOptions = {
      folderid: folderid,
      event: evento? evento.event : '',
      date: "",
      time: "",
      notifications: notifications,
  } 


    const [editValues, setEditValues] = useState(initialValues)
    const [options, setOptions] = useState(initialOptions)    

    const sendEdit = () => {
      const newTask = {
        ...editValues,
        ...options
      }
      const newTasksItems = tasksInSections.map((elem) => {

        if(elem.id == id){
            return newTask
        }
        return elem
      })
      

      dispatchSections({type: 'UPDATE', payload: {id: sectionid, body: {tasksInSections: newTasksItems}}})
      setEdit(false)
      const sendTask = {
        ...editValues,
        ...options,
        sectionid: (options.folderid == filter)? options.sectionid : null 
      }

      editTask(sendTask, ()=>{updateAll()})
    }

    const deleteItem = () => {
      const newTasksItems = tasksInSections.filter((elem)=>{
        return elem.id !== id;
      })

      const orderArray = orders.split("|")
      const newOrder = orderArray.filter((elem)=>{
        return elem != id
      })
      const orderString  = newOrder.join("|")
      dispatchSections({type: 'UPDATE', payload: {id: sectionid, body: {tasksInSections: newTasksItems, orders: orderString}}})
      
      editSection(sectionid, {orders: orderString}, ()=>{updateAll()})
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
                <Options
                state={options}
                setState={setOptions}/>
              
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