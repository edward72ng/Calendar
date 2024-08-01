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
import {itemBase} from "../../utils/baseFormat" 

const {inputDetails, 
  inputTittle,
  headerButtons,
  formcreateContainer,
  formContainer,
  addButtons} = formCreateStyle

import { getOrderInOneSection } from "../../providers/getFunctions";
import { FunctionSectionsContext } from "../../providers/FuntionSeccions.provider";


function ItemView ({functions, values}) {
    const {isClosing, actualFolder, actualSection, actualTask} = values
    const {setForm} = useContext(TaskModalContext)
    console.log('ACT TASK', actualTask)
    const {createTask} = useContext(FunctionTasksContext)
    const {editSection} = useContext(FunctionSectionsContext)
    const {filter} = useContext(DataContext)

    const initialstate = {
      id: actualTask.id,
      event: "",
      date: "",
      time: "",
      notifications: [],
      folder: actualFolder,
      folderid: actualFolder.id,
      myTags:[],
      myPriority: {
        id: null
      },
      section: actualSection || null,
      sectionid: actualSection?.id || null,
      content: actualTask.content,
      details: actualTask.details
    } 

    const [state, setState] = useState(initialstate);

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

    const addItemInGS =  (uuid, path) => {
      const item = {
        ...itemBase,
        content: state.content,
        details:  state.details,
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

    const EditItem = () => {
      const uuid = uuidv4()
      let stringOrder = ''
      const path = getPath() 
      
      if((filter == state.folderid)){

        if(actualSection?.id !==state.sectionid){
          const [
            dispatchSourceItems, 
            dispatchSourceSection, 
            itemsSource, 
            orderSource] = globalState.getDispatch(actualSection?.id)
          const [
            dispatchDestinationItems, 
            dispatchDestinationSection, 
            itemsDestination, 
            orderDestination] = globalState.getDispatch(state.sectionid)  

          const indexItem = itemsSource.findIndex(elem => elem.id == state.id);
          const [editItem] = itemsSource.splice(indexItem, 1)
          //itemsDestination.splice()

            console.log('EDIT ITEM', editItem)

          const indexOrder = orderSource.findIndex(elem => elem.id == editItem.id)
          orderSource.splice(indexOrder, 1)
          orderDestination.push(editItem.id)
          

          const orderSourceString = orderSource.join("|") 
          const orderDestinationString = orderDestination.join("|")

          globalState.changeOrderSection(filter, actualSection?.id, orderSourceString)
          globalState.changeOrderSection(filter, state.sectionid, orderDestinationString)

          dispatchSourceSection({
            type: 'UPDATE',
            payload: {
              id: actualSection.id,
              body: {
                orders: orderSourceString
              }}
          })
          dispatchSourceItems({
            type: 'DELETE',
            payload:{
              id:actualTask.id
            }
          })

          dispatchDestinationSection({
            type: 'UPDATE',
            payload: {
              id: state.id,
              body: {
                orders: orderDestinationString
          }}})
          
          dispatchDestinationItems({
            type: 'CREATE',
            payload:{
              body: {
                ...itemBase,
                id: state.id,
                content: state.content,
                details: state.details,
                folderid: state.folderid,
                sectionid: state.sectionid
              }
            }})
          /*
            const body = {
          id: dragItem[0].id,
          sectionid: destination.droppableId
        }

        editSection(source.droppableId, {orders: orderSourceString}, () => {
          
        })
        editSection(destination.droppableId, {orders: orderDestinationString}, () => {
          
        })
        editTask(body, () => {
          const pathSource = [filter, 'sectionsInFolder', source.droppableId, 'tasksInSections']
          globalState.deleteItemInValue(pathSource, dragItem[0].id)

          const pathDestination = [filter, 'sectionsInFolder', destination.droppableId, 'tasksInSections']
          globalState.addItemInValue(pathDestination, dragItem[0])
        })
          */
        }
        if(actualSection?.id ==state.sectionid){
          const [
            dispatchItems, 
            dispatchSection, 
            items, 
            order] = globalState.getDispatch(state.sectionid) 

            dispatchItems({
              type: 'UPDATE',
              payload:{
                id: state.id,
                body: {
                  ...itemBase,
                  content: state.content,
                  details: state.details,
                  folderid: state.folderid,
                  sectionid: state.sectionid
                }
              }
            })
        }
      }
     
      if((filter !== state.folderid)){
        const [
          dispatchSourceItems, 
          dispatchSourceSection, 
          itemsSource, 
          orderSource] = globalState.getDispatch(actualSection?.id)

        const indexOrder = orderSource.findIndex(elem => elem.id == state.id)
        orderSource.splice(indexOrder, 1)

        const orderSourceString = orderSource.join("|") 

        dispatchSourceSection({
          type: 'UPDATE',
          payload: {
            id: actualSection.id,
            body: {
              orders: orderSourceString
            }}
        })
        dispatchSourceItems({
          type: 'DELETE',
          payload:{
            id:actualTask.id
          }
        })
      }
          setForm((prevState) => !prevState)
          setState(initialstate)
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

    const changeContent = (e) => {
      setState((prev) => {
        return({
          ...prev,
          content: e.target.value
        })
      })
    } 

    const changeDetails = (e) => {
      setState((prev) => {
        return({
          ...prev,
          details: e.target.value
        })
      })
    } 

    return (
      <Modal>
        <div  className={formcreateContainer} id="form-create">
     
        <div className={headerButtons}>
        <CancelButton text={"Cerrar"} onClick={()=>{setForm((prevState) => !prevState)}}/>
        <ConfirmButton text={"Confirmar Cambios"} onClick={()=>{EditItem()}}/>
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
            value={state.content}
            onChange = { (e) => changeContent(e)}></input>
            <input className={inputDetails} 
            placeholder="Detalles"
            value={state.details}
            onChange = { (e) => changeDetails(e)}></input>

        
            
        </div>
    </div>
      </Modal>
    )
} 

export {ItemView}

/**
 * 
 *     <EventScheduler/>

            <AddImage/>

            <ColorItemSelector/>
        <div className={addButtons}>
            
            <NotificationsModal functions={{handleAdd: handleNotifications}} values={{notifications: state.notifications}}/> 
            <PriorityModal functions={{handleAdd: handleFolderChange}}/>
            <TagModal functions={{handleAdd: handleEvent}} values={{event: state.event}}/>
        </div>
 */