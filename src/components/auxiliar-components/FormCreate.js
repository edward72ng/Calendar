import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "../../providers/DataContext";
import { FunctionTasksContext } from "../../providers/FunctionTasks.provider";
import { ItemsContext } from "../../providers/ItemsContext";
import { SubItem } from "../inbox-components/SubItem";
import { Tags } from "../inbox-components/Tags";
import { SubOptions } from "../my-projects-components/SubOptions";
import { CreateTag } from "./CreateTag";
import { Recomended } from "./Recomended";
import './InputDate.css'
import './Select.css'
import './InputAlarm.css'
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
      {recomended &&
        <Recomended question={content} functions={{handleAddTag}}></Recomended>
    }
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
            
            <div
            onClick={() => viewRecomended()}>
                <div className="utils-container">
                
                <select className="select-container"
                value={state.myPriority.id ? state.myPriority.id : ""} onChange={handleSelectPriorityChange}>
                    <option value="">Seleccione una prioridad</option>
                    {
                      priorities.map((elem) => {
                        return <option key={elem.id} value={elem.id}>{elem.prioriti}</option>
                      })
                    }
                </select>

                <input type="date" className="input-date" value={state.event} onChange={handleEventChange} />
                </div>
                
                <div className="input-alarm">
                    <div className="notification-container">
                        {
                            state.notifications.map((elem, i)=> {
                                return<div key={i} className="notification-item">
                                <span>{elem.date}</span>
                                <span>{elem.time}</span>
                                <span className="material-symbols-outlined">delete</span>
                                </div>
                            })
                        }
                    </div>
                
                <div className="utils-container">
                <input type="date" value={state.date} onChange={handleDateChange} />
                <input type="time" value={state.time} onChange={handleTimeChange} />
                </div>

                <span className="material-symbols-outlined"
                onClick={handleAdd}>add</span>
                </div>

                

            </div>

            

            <Tags myTags={state.myTags} />
            <CreateTag functions={{handleAddTag}}/>
        </div>
    </div>
} 

export {FormCreate}
