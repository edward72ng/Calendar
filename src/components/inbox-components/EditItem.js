import React,{useContext, useState} from "react";
import { Options } from "../auxiliar-components/Options";
import { DataContext } from "../../providers/DataContext";
import { GaleryFromTask } from "./GaleryFromTask";
import { FunctionTasksContext } from "../../providers/FunctionTasks.provider";
import { ItemsContext } from "../../providers/ItemsContext";
import { Recomended } from "../auxiliar-components/Recomended";
import { Tags } from "./Tags";

function EditItem ({values, functions}){
    const {id, content, details, evento, sectionid, folderid, notifications, myTags} = values
    const {refreshTasks, dispatchTasks, setEdit} = functions

    const {updateWithout} = useContext(ItemsContext)
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
      myTags: myTags
  } 

    const [recomended, setRecomended] = useState(false)
    const [options, setOptions] = useState(initialOptions)   
    const [editValues, setEditValues] = useState(initialValues)
    
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
      editTask({...values,...editValues, ...options}, () => {
        refreshTasks();
        updateWithout();
      })
    }

    const deleteItem = () => {
      
      dispatchTasks({type: 'DELETE', payload: {id: id}})

      deleteTask(id, () => {
        refreshTasks();
        updateWithout();
      })
      setEdit(false)
    }
    
    const handleAddTag = (newTag) => {
      const tags  = [...options.myTags, newTag]

      setOptions((prevState) => ({ ...prevState, myTags: tags }));
    };
   
    return (
      <div className="visual-container" data-id={id}>
        {recomended ?
          <Recomended question={content} inUse={options.myTags} functions={{handleAddTag}}/>
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

                <Tags myTags={options.myTags}/>
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
export {EditItem}