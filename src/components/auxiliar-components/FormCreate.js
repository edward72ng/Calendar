import React, { useContext, useEffect, useState } from "react";
import { FunctionTasksContext } from "../../providers/FunctionTasks.provider";
import { ItemsContext } from "../../providers/ItemsContext";
import './InputDate.css'
import './Select.css'
import './InputAlarm.css'
import formCreateStyle from "./FormCreate.module.css"
import {TagModal} from './TagModal'
import {NotificationsModal} from '../auxiliar-components/NotiificationsModal'
import { PriorityModal } from "./PriorityModal";
import { Modal } from "../../app/modal";
import { ErrorMessage } from "./ErrorMessage";
import { CancelButton } from "./CancelButton";
import { ConfirmButton } from "./ConfirmButton";
import { EventScheduler } from "./EventScheduler";
import { AddImage } from "./AddImage";
import { ColorItemSelector } from "./ColorItemSelector";
import { FolderModal } from "./FolderModal";
import { TaskModalContext } from "../../providers/TaskModalContext";
import { DataContext } from "../../providers/DataContext";

const {inputDetails, 
  inputTittle,
  headerButtons,
  formcreateContainer,
  formContainer,
  addButtons} = formCreateStyle
const initialstate = {
  event: "",
  date: "",
  time: "",
  notifications: [],
  folder: null,
  myTags:[],
  myPriority: {
    id: null
  }
} 

function FormCreate ({functions, values}) {
    const {isClosing, actualFolder} = values
    const {dispatchTasks} = functions
    
    const {setErrorMessage} = useContext(ItemsContext)
    const {setForm} = useContext(TaskModalContext)
    const { createTask } = useContext(FunctionTasksContext)
    const {filter} = useContext(DataContext)

    const [recomended, setRecomended] = useState(false)
    const [content, setContent] = useState('')
    const [details, setDetails] = useState('')
    const [state, setState] = useState(initialstate);
  console.log(actualFolder)
    useEffect(() => {
      const formCreate = document.getElementById("form-create")
      if(isClosing){
        formCreate.classList.remove('mount')
      }else{
        setTimeout(()=>{
          formCreate.classList.add(formCreateStyle.mount)
        }, 5)
        document.getElementById('inputFocus').focus();
      }
    },[isClosing])

    const handleFolderChange = (folderid) => {
      setState((prevState) => ({
        ...prevState,
        folder: folderid
      }))
    }
    const handleEvent = (event) => {
      setState((prevState) => ({
        ...prevState,
        event: event
      }))
    }
    const handleNotifications = (notifications) => {
      setState((prevState) => ({
        ...prevState,
        notifications: notifications
      }))
    }

      const handleAddTag = (newTag) => {
        const tags  = [...state.myTags, newTag]
 
        setState((prevState) => ({ ...prevState, myTags: tags }));
        
      };

    const setTask = () => {
      
      //crear para el estado interno
        dispatchTasks(
          {type: 'CREATE', 
          payload:{
            body: {
              id: 'provitionalid',
              content, 
              details, 
              evento: state.event ? {event: state.event} : null, 
              myTags: state.myTags, 
              myPriority: state.myPriority}}})
        setContent('')
        setDetails('')
        setState(initialstate)
          
        //crear para la base de datos
        createTask({
            content, 
            details, 
            event: state.event, 
            notifications: state.notifications, 
            myTags : state.myTags, 
            priorityid: state.myPriority?.id
          }, (data) => {
            console.log('RECUPERANDO ID')
            dispatchTasks({type: 'UPDATE', payload: {id: 'provitionalid', body: data}})
          })
        setRecomended(false)

     
        
      }
    
    const viewRecomended = () => {
      if(content.length > 2){
        setRecomended(true)
      }
    }

    console.log("TAGS:",state.myTags)
    return (
      <Modal>
        <div className={formcreateContainer} id="form-create">
     
        <div className={headerButtons}>
        <CancelButton text={"Cerrar"} onClick={()=>{setForm((prevState) => !prevState)}}/>
        <ConfirmButton text={"Guardar"} onClick={()=>{setTask()}}/>
        </div>
        
        <div className={formContainer}>
            <FolderModal values={{thisFolder: actualFolder}}/>

            <input 
            className={inputTittle} 
            id="inputFocus"
            placeholder="Contenido"
            value={content}
            onChange = { (e) => setContent(e.target.value)}></input>
            <textarea className={inputDetails} 
            placeholder="Detalles"
            value={details}
            onChange = { (e) => setDetails(e.target.value)}></textarea>

            <EventScheduler/>

            <AddImage/>

            <ColorItemSelector/>
        <div className={addButtons}>
            
            <NotificationsModal functions={{handleAdd: handleNotifications}} values={{notifications: state.notifications}}/> 
            <PriorityModal functions={{handleAdd: handleFolderChange}}/>
            <TagModal functions={{handleAdd: handleEvent}} values={{event: state.event}}/>
        </div>
            
        </div>
    </div>
      </Modal>
    )
} 

export {FormCreate}
/**
 *  /*recomended &&
        <Recomended question={content} functions={{handleAddTag}}></Recomended>
        onClick={() => viewRecomended()}
  */