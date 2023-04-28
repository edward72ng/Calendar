import React, { useContext, useEffect, useState } from "react";
import { FunctionTasksContext } from "../../providers/FunctionTasks.provider";
import { ItemsContext } from "../../providers/ItemsContext";
import { Tags } from "../inbox-components/Tags";
import { CreateTag } from "./CreateTag";
import './InputDate.css'
import './Select.css'
import './InputAlarm.css'
import { SelectTag } from "./SelectTag";
import {EventModal} from '../auxiliar-components/EventModal'
import {NotificationsModal} from '../auxiliar-components/NotiificationsModal'
import { FoldersModal } from "./FoldersModal";
const inboxUrl = '/api/v1/inboxtasks/'

function FormCreate ({functions, values}) {
    const {isClosing} = values
    const {dispatchTasks, refreshTasks, setForm} = functions
    const [recomended, setRecomended] = useState(false)
    const {all, priorities, myProjects} = useContext(ItemsContext)
    const { createTask } = useContext(FunctionTasksContext)
    const [content, setContent] = useState('')
    const [details, setDetails] = useState('')

    useEffect(()=>{
      //crear opcion desleccion de etiquetas en form create
    },[all])

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

    const [state, setState] = useState(initialstate);
    console.log('Render', isClosing)
    useEffect(() => {
      const formCreate = document.querySelector('.formcreate-container')
      if(isClosing){
        formCreate.classList.remove('mount')
      }else{
        setTimeout(()=>{
          formCreate.classList.add('mount')
        }, 5)
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
      setState(() => ({
        ...prevState,
        notifications: notifications
      }))
    }

      const handleEventChange = (e) => {
        const event = e.target.value;
        setState((prevState) => ({ ...prevState, event }));
      };
    
      const handleDateChange = (e) => {
        const date = e.target.value;
        setState((prevState) => ({ ...prevState, date }));
      };

      const handleTimeChange = (e) => {
        const time = e.target.value;
        setState((prevState) => ({ ...prevState, time }));
      };
    
      const handleSelectChange = (e) => {
        const folder = e.target.value;
        setState((prevState) => ({ ...prevState, folder }));
      };
      const handleSelectPriorityChange = (e) => {
        const id = e.target.value;
        const [myPriority] = priorities.filter((elem) => {
          return elem.id == id
        })

        setState((prevState) => ({ ...prevState, myPriority }));
      }
    
      const handleAdd = (e) => {
        if (state.date && state.time){
            const notification = {
                date: state.date,
                time: state.time,
            }
            setState((prevState)=> ({...prevState, notifications: [...state.notifications, notification], date: '', time: ''}))
        }
      }

      const handleAddTag = (newTag) => {
        const tags  = [...state.myTags, newTag]
 
        setState((prevState) => ({ ...prevState, myTags: tags }));
      };

    const setTask = () => {
        dispatchTasks({type: 'CREATE', payload:{ body: {content, details, evento: {event:state.event}, myTags: state.myTags, myPriority: state.myPriority}}})
        setContent('')
        setDetails('')
        setState(initialstate)
        createTask({content, details, event: state.event, notifications: state.notifications, myTags : state.myTags, priorityid: state.myPriority?.id}, () => {setTimeout(()=>{refreshTasks(inboxUrl)}, 2000)})
        setRecomended(false)
      }
    
    const viewRecomended = () => {
      if(content.length > 2){
        setRecomended(true)
      }
    }

    return <div className="formcreate-container" id="form-create">
      {/*recomended &&
        <Recomended question={content} functions={{handleAddTag}}></Recomended>
  */}
        <span className="material-symbols-outlined"
        onClick={()=>{setTask()}}>done</span>
        <div className="form-container">
            <input className="edit-value" placeholder="contenido"
            value={content}
            onChange = { (e) => setContent(e.target.value)}></input>
            <textarea className="edit-value" placeholder="detalles"
            onClick={() => viewRecomended()}
            value={details}
            onChange = { (e) => setDetails(e.target.value)}></textarea>
        <div className="added-to-item">
        <EventModal functions={{handleAdd: handleEvent}} values={{event: state.event}}/>
            <NotificationsModal functions={{handleAdd: handleNotifications}} values={{notifications: state.notifications}}/>
            
            <FoldersModal functions={{handleAdd: handleFolderChange}}/>
        </div>
            

            <Tags myTags={state.myTags} />
            <SelectTag functions={{handleAddTag}}/>
            <CreateTag functions={{handleAddTag}}/>
        </div>
    </div>
} 

export {FormCreate}
