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
import globalState from '../../custom-hooks/SingletonGlobalState'
import {v4 as uuidv4 } from 'uuid'

const {inputDetails, 
  inputTittle,
  headerButtons,
  formcreateContainer,
  formContainer,
  addButtons} = formCreateStyle

import {itemBase} from "../../utils/baseFormat" 
import { getOrderInOneSection } from "../../providers/getFunctions";
import { FunctionSectionsContext } from "../../providers/FuntionSeccions.provider";



function FormCreate ({functions, values}) {
    const {isClosing, actualFolder, actualSection} = values
    
  console.log('ACTUAL SECT', actualSection)

    const initialstate = {
      event: "",
      date: "",
      time: "",
      notifications: [],
      folder: actualFolder,
      folderid: actualFolder.id,
      myTags:[],
      myPriority: /*{id: null}*/null,
      section: actualSection || null,
      sectionid: actualSection?.id || null
    } 

    const {setForm} = useContext(TaskModalContext)
    const { createTask } = useContext(FunctionTasksContext)
    const {editSection} = useContext(FunctionSectionsContext)
    const {filter} = useContext(DataContext)

    
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

    const addItemInGS =  (uuid, path) => {
      const item = {
        ...itemBase,
        content: content,
        details: details,
        id: uuid,
        folderid: state.folderid,
        sectionid: state.sectionid
      }
      globalState.addItemInValue(path, item)
    }

    const getPath = () =>{
      if(!state.sectionid){//sea null o undefined
        return[state.folderid, 'blocsInFolder']
      }else{
        return[state.folderid, 'sectionsInFolder', state.sectionid, 'tasksInSections']
      }
      
    }

    const setTask = () => {

      const uuid = uuidv4()
      let stringOrder = ''

      if(state.sectionid){
        const orderInSection = getOrderInOneSection(state.folderid, state.sectionid)
        
        const newOrder = orderInSection.split("|") 
        newOrder.push(uuid)
        stringOrder = newOrder.join("|")
      }

      
      const path = getPath() 
      
      if(filter == state.folderid){

        const [dispatchTasks, dispatchSections] = globalState.getDispatch(state.sectionid)  
        
        if(state.sectionid){
          dispatchSections(
            {type: 'UPDATE', 
              payload:{
                id:state.sectionid,
                body: {
                  orders: stringOrder
                }}})
        }

        dispatchTasks(
          {type: 'CREATE', 
          payload:{
            body: {
              id: uuid,
              content, 
              details, 
              folderid: state.folderid,
              notifications: state.notifications,
              evento: state.event ? {event: state.event} : null, 
              myTags: state.myTags, 
              myPriority: state.myPriority}}})

              console.log(globalState.getValue())

      }

     
      

        
        
        
        
        //crear para la base de datos
        createTask({
            id: uuid,
            content, 
            details, 
            folderid: state.folderid,
            event: state.event, 
            notifications: state.notifications, 
            myTags : state.myTags, 
            priorityid: state.myPriority?.id,
            sectionid: state.sectionid
          }, (data) => {
            
            
            if(state.sectionid){
              globalState.changeOrderSection(state.folderid, state.sectionid, stringOrder)
              editSection(state.sectionid, {orders: stringOrder}, () => {
              })
            }
            addItemInGS(uuid, path)
            
            //console.log('RECUPERANDO ID')
            //dispatchTasks({type: 'UPDATE', payload: {id: 'provitionalid', body: data}})
          })
          setContent('')
          setDetails('')
          setState(initialstate)
      }
    
 

    const handleSubmit = (e) => {
      e.preventDefault()
      setTask()
    }

    const changeFolderSection = (folder, folderid, section, sectionid) => {
      setState((prev) => {
        return({
          ...prev,
          folderid: folderid,
          sectionid: sectionid,
          folder: folder,
          section: section
        })
      })
    }

    return (
      <Modal>
        <div  className={formcreateContainer} id="form-create">
     
        <div className={headerButtons}>
        <CancelButton text={"Cerrar"} onClick={()=>{setForm((prevState) => !prevState)}}/>
        <ConfirmButton text={"Guardar"} onClick={()=>{setTask()}}/>
        </div>
        
        <div className={formContainer}>
            <FolderModal 
            values={{
              thisFolder: state.folder,
              thisSection: state.section}}
            functions={{changeFolderSection}}/>

            <input 
            className={inputTittle} 
            id="inputFocus"
            placeholder="Contenido"
            value={content}
            onChange = { (e) => setContent(e.target.value)}></input>
            <input className={inputDetails} 
            placeholder="Detalles"
            value={details}
            onChange = { (e) => setDetails(e.target.value)}></input>

            <EventScheduler/>

            <AddImage/>

            <ColorItemSelector/>
        <div className={addButtons}>
            
            <NotificationsModal functions={{handleAdd: handleNotifications}} values={{notifications: state.notifications}}/> 
            <PriorityModal functions={{handleAdd: handleFolderChange}}/>{/*Cambiar*/}
            <TagModal functions={{handleAdd: handleEvent}} values={{event: state.event}}/>
        </div>
            
        </div>
    </div>
      </Modal>
    )
} 

export {FormCreate}

/**
 * const [recomended, setRecomended] = useState(false)
 */

/**
 *    const viewRecomended = () => {
      if(content.length > 2){
        setRecomended(true)
      }
    }
 */

/**
 *  /*recomended &&
        <Recomended question={content} functions={{handleAddTag}}></Recomended>
        onClick={() => viewRecomended()}
  */