import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "../../providers/DataContext";
import { FunctionTasksContext } from "../../providers/FunctionTasks.provider";
import { SubItem } from "../inbox-components/SubItem";
import { SubOptions } from "../my-projects-components/SubOptions";
import { Recomended } from "./Recomended";

const inboxUrl = '/api/v1/inboxtasks/'

function FormCreate ({functions, values}) {
    const {isClosing} = values
    const {dispatchTasks, refreshTasks, setForm} = functions
    const [recomended, setRecomended] = useState(false)

    const { createTask } = useContext(FunctionTasksContext)
    const [content, setContent] = useState('')
    const [details, setDetails] = useState('')

    const initialstate = {
        event: "",
        date: "",
        time: "",
        notifications: [],
        folder: "",
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
    
      const handleAdd = (e) => {
        if (state.date && state.time){
            const notification = {
                date: state.date,
                time: state.time,
            }
            setState((prevState)=> ({...prevState, notifications: [...state.notifications, notification], date: '', time: ''}))
        }
      }

    const setTask = () => {
        dispatchTasks({type: 'CREATE', payload:{ body: {content, details, evento: {event:state.event}}}})
        setContent('')
        setDetails('')
        setState(initialstate)
        createTask({content, details, event: state.event, notifications: state.notifications}, () => {setTimeout(()=>{refreshTasks(inboxUrl)}, 2000)})
        setRecomended(false)
      }


    return <div className="formcreate-container" id="form-create">
      {/*recomended &&
        <Recomended question={content}></Recomended>
    */}
        <span className="material-symbols-outlined"
        onClick={()=>{setTask()}}>done</span>
        <div className="form-container">
            <input className="edit-value" placeholder="contenido"
            value={content}
            onChange = { (e) => setContent(e.target.value)}></input>
            <textarea className="edit-value" placeholder="detalles"
            onClick={() => setRecomended(true)}
            value={details}
            onChange = { (e) => setDetails(e.target.value)}></textarea>
            
            <div className="utils-container"
            onClick={() => setRecomended(true)}>
                <div>
                <input type="date" value={state.event} onChange={handleEventChange} />
                <select value={state.folder} onChange={handleSelectChange}>
                    <option value="">Seleccione una opción</option>
                    <option value="option1">Opción 1</option>
                    <option value="option2">Opción 2</option>
                    <option value="option3">Opción 3</option>
                </select>
                </div>
                
                <div>
                    <div>
                        {
                            state.notifications.map((elem, i)=> {
                                return<div key={i}>
                                <span>{elem.date}</span>
                                <span>{elem.time}</span>
                                <span className="material-symbols-outlined">delete</span>
                                </div>
                            })
                        }
                    </div>

                <input type="date" value={state.date} onChange={handleDateChange} />
                <input type="time" value={state.time} onChange={handleTimeChange} />
                <span className="material-symbols-outlined"
                onClick={handleAdd}>add</span>
                </div>

            </div>
            
        </div>
    </div>
} 

export {FormCreate}
