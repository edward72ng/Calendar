import React,{useContext, useState} from "react";
import { Options } from "../auxiliar-components/Options";
import { DataContext } from "../../providers/DataContext";
import { GaleryFromTask } from "./GaleryFromTask";
import { FunctionTasksContext } from "../../providers/FunctionTasks.provider";
import { ItemsContext } from "../../providers/ItemsContext";
import { Recomended } from "../auxiliar-components/Recomended";
import { Tags } from "./Tags";
import { SelectTag } from "../auxiliar-components/SelectTag";
import { EditTag } from "./EditTag";
import { InputImage } from "../UI-components/InputImage";
import { EditGalery } from "./EditGalery";
import { NotificationsModal } from "../auxiliar-components/NotiificationsModal";
import { EventModal } from "../auxiliar-components/EventModal";
import { FoldersModal } from "../auxiliar-components/FoldersModal";
import { Modal } from "../../app/modal";
import { ErrorMessage } from "../auxiliar-components/ErrorMessage";

function EditItem ({values, functions}){
    const {id, content, details, evento, sectionid, folderid, notifications, myTags, myImages} = values
    const {refreshTasks, dispatchTasks, setEdit} = functions

    const [error, setError] = useState(false)
    const {updateWithout, setErrorMessage} = useContext(ItemsContext)
    const {editTask, deleteTask} = useContext(FunctionTasksContext)
    const {filter} = useContext(DataContext)

    const initialValues = {
      sectionid: sectionid? sectionid : null,
      content: content,
      details: details
    }
    const initialOptions = {
      folderid: folderid? folderid : null,
      event: evento? evento.event : '',
      date: "",
      time: "",
      notifications: notifications,
      myTags: myTags,
      myImages: myImages
  } 

    const [recomended, setRecomended] = useState(false)
    const [options, setOptions] = useState(initialOptions)   
    const [editValues, setEditValues] = useState(initialValues)
    
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

    const sendEdit = () => {
      const newTask = {
        ...editValues,
        evento: {event: options.event},
        notifications: options.notifications,
        myTags: options.myTags
      }
      if (options.folderid == filter){
        dispatchTasks({type: 'UPDATE', payload: {id: id, body: newTask}})
      }else{
        dispatchTasks({type: 'DELETE', payload: {id: id}})
      }

      setEdit(false)
      
        editTask({...values,...editValues, ...options}, (data) => {
          
          refreshTasks();
          updateWithout();

          
        })
      
      
    }

    const deleteItem = () => {
      
      dispatchTasks({type: 'DELETE', payload: {id: id}})
      
        deleteTask(id, (data) => {
          refreshTasks();
          updateWithout();

          
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
      

      setOptions((prevState) => ({ ...prevState, myTags: tags }));
    };

    const handleAddImage = (image) => {
      const images = [...options.myImages, image]

      setOptions((prevState) => ({...prevState, myImages: images}))
    }
   
    return (
      <div className="visual-container" data-id={id}>
        
        
        <div className="close-options">
          <span className="material-symbols-outlined"
            onClick={()=>{setEdit(false)}}>
            close</span>
            <span className="material-symbols-outlined"
            onClick={()=>{sendEdit()}}>
            done</span>
        </div>
            
        
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
                <EditTag myTags={options.myTags} handleDeleteTag={handleDeleteTag}/>
                <SelectTag functions={{handleAddTag}}/>
                
                
                
              
              </div>

    
            </div>

        <div className="added-to-item">
        <NotificationsModal functions={{handleAdd}} values={{notifications: options.notifications}}/>
        <EventModal functions={{handleAdd: handleEventChange}} values={{event: options.event}}/>
        <NotificationsModal functions={{handleAdd}} values={{notifications: options.notifications}}/>
        <FoldersModal functions={{handleAdd: handleFolderChange}}/>
        </div>
        
        <EditGalery myImages={options.myImages}/>
        <InputImage values={{todoid: id}} functions={{handleAddImage}}/>
        <span className="material-symbols-outlined"
            onClick={()=>{deleteItem()}}>
            delete</span>
            
      </div>
    )
}
export {EditItem}

/**
 * {recomended ?
          <Recomended question={content} inUse={options.myTags} functions={{handleAddTag}}/>
          :
          <div
          onClick={()=>setRecomended(true)}>
          Recomendar?</div>
        }
 */