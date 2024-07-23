import React,{useContext, useState} from "react";
import { GaleryFromTask } from "../inbox-components/GaleryFromTask";
import { SubItem } from "../inbox-components/SubItem";
import { FunctionTasksContext } from "../../providers/FunctionTasks.provider";
import { ItemsContext } from "../../providers/ItemsContext";
import { FunctionSectionsContext } from "../../providers/FuntionSeccions.provider";
import { Options } from "../auxiliar-components/Options";
import { DataContext } from "../../providers/DataContext";
import { Tags } from "../inbox-components/Tags";
import { Recomended } from "../auxiliar-components/Recomended";
import { EditTag } from "../inbox-components/EditTag";
import { InputImage } from "../UI-components/InputImage";
import { EditGalery } from "../inbox-components/EditGalery";
import { NotificationsModal } from "../auxiliar-components/NotiificationsModal";
import { TagModal } from "../auxiliar-components/TagModal";
import { PriorityModal } from "../auxiliar-components/PriorityModal";

function EditItemWithSection ({values, functions}){
    const {id, content, details, evento, sectionid, folderid, userId, eventId, myTags, myImages, tasksInSections, orders, notifications} = values
  
    const {refreshsections, dispatchSections, dispatchTasks, setEdit} = functions
    const {updateAll, updateWithout} = useContext(ItemsContext)
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
      myTags: myTags,
      myImages: myImages
  } 


    const [editValues, setEditValues] = useState(initialValues)
    const [options, setOptions] = useState(initialOptions)    
    const [recomended, setRecomended] = useState(false)

    const sendEdit = () => {
      const newTask = {
        ...editValues,
        ...options,
        evento: options.event ? {event: options.event} : null
      }
      const newTasksItems = tasksInSections.map((elem) => {
        if(elem.folderid == filter){
        if(elem.id == id){
            return newTask
        }

        return elem
        }
      })

 
      dispatchSections({type: 'UPDATE', payload: {id: sectionid, body: {tasksInSections: newTasksItems}}})
      const sendTask = {
        ...editValues,
        ...options,
        sectionid: (options.folderid == filter)? options.sectionid : null 
      }

      editTask(sendTask, ()=>{
        updateAll()
        updateWithout()
      })
      setEdit(false)
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
      
      editSection(sectionid, {orders: orderString},() => {
        deleteTask(id,()=>{updateAll()})
      })
      setEdit(false)
    }
    
    const handleAddTag = (newTag) => {
      const tags  = [...options.myTags, newTag]

      setOptions((prevState) => ({ ...prevState, myTags: tags }));
    };
   
    const handleDeleteTag = (id) => {
      const tags = options.myTags.filter((elem) => {
        return elem.id != id
      })
    }
    const handleAddImage = (image) => {
      const images = [...options.myImages, image]

      setOptions((prevState) => ({...prevState, myImages: images}))
    }
    const handleFolderChange = (folderid) => {
      setOptions((prevState) => ({
        ...prevState,
        folderid: folderid
      }))
    }
    const handleEventChange =  (event) => {
      setOptions((prevState) => ({
        ...prevState,
        event: event
      }))
    }
    const handleAdd = (alarms) => {
      setOptions((prevState) => ({
        ...prevState,
        notifications: alarms
      }))
    }


    
    return (
      <div className="visual-container" data-id={id}>


          {recomended ?
          <Recomended question={editValues.content} inUse={options.myTags} functions={{handleAddTag}}/>
          :
          <div
          onClick={()=>setRecomended(true)}>
          Recomendar?</div>
        }

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
                
              
              </div>
              
    
            </div>

            <div className="added-to-item">
            <NotificationsModal functions={{handleAdd}} values={{notifications: options.notifications}}/>
            <TagModal functions={{handleAdd: handleEventChange}} values={{event: options.event}}/>
            <PriorityModal functions={{handleAdd: handleFolderChange}}/>
           </div>

            <EditTag myTags={options.myTags} handleDeleteTag={handleDeleteTag}/>
            
            <EditGalery values={{id, myImages}}  functions={{dispatchTasks}}/>
            <InputImage values={{todoid: id, myImages}} functions={{handleAddImage, dispatchTasks}}/> 
            
        
        <span className="material-symbols-outlined"
            onClick={()=>{deleteItem()}}>
            delete</span>
            
      </div>
    )
}
export {EditItemWithSection}