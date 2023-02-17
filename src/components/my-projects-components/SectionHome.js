
import React, { useContext, useEffect, useState } from "react";
import { useTasks } from "../../custom-hooks/useTasks";
import { FunctionSectionsContext } from "../../providers/FuntionSeccions.provider";
import { useAuth } from "../../providers/auth";
import { DatesContext } from "../../app/datesContext";
import {OneTodo} from '../inbox-components/OneTodo'
import { SocketContext } from "../../providers/socketContext";
import { UseFetch } from "../../custom-hooks/useFetch";
import { useFetchItems } from "../../custom-hooks/useFetchItems";
import {useUpdate} from '../../custom-hooks/useUpdate'
import {OneItem} from '../inbox-components/OneItem'
import AddTask from "./AddTask";
import { DataContext } from "../../providers/DataContext";
function SectionHome({dataValues, functions, index}) {
    const {id, section} = dataValues
    const {refreshSections, dispatchSections} = functions
    const {socket} = useContext(SocketContext)
    
    const [task, dispatchTasks ,refreshTasks] = useUpdate(dataValues.tasksInSections)
    const {deleteSection, editSection, move} = useContext(FunctionSectionsContext)
    const {filter} = useContext(DataContext)
    const [openEdit, setOpenEdit] = useState(false)
    const [input, setInput] = useState(section)

    const handleEdit = () => {
        dispatchSections({type: 'UPDATE', payload: {id: id, body: {section: input}}});
        editSection(id, {section: input},() => refreshSections(`/api/v1/sections//all/with-task/${filter}`))
        setOpenEdit(false)
    }

    /*useEffect(()=>{
        const section = document.getElementById('section' + index)
        const sortable = new Sortable(section,{
            group: {
                name: 'section-home'
            },

            onEnd: ()=>{ console.log(`onEnd se ejecuto en la seccion: ${section}` )},
        })

        return ()=>{
            sortable.destroy()
        }
    }, [])*/

    useEffect(()=>{
        if(socket){
            socket.on('refrescar',(mesagge)=>{
                
                if(mesagge.origen == id || mesagge.destino == id){
                    console.log('escucho un evento del server')
                    setTimeout(()=>{
                        refreshTasks()
                    }, 2000)
                    
                }
            })
        }
        return ()=>{ 
            if(socket){
                socket.off('refresh');
            }
           
        }
    }, [])

    


      return <div className="section-container "   id={'section' + index}
    onDragOver={(e)=>{e.preventDefault();console.log('arrastrando'); 
    /*e.currentTarget.classList.add('select')*/}}
    onDrop={()=>{ console.log('DESTINO:' + id); 
     //moveToSection(id, refreshTask);
     move(id, refreshTasks)}}>
        
        <div className="space-between" id="section">
            {openEdit ?
            <>
            <input value={input}
            onChange= {(e)=> setInput(e.target.value)}></input>
            <div>
            <span className="material-symbols-outlined"
            onClick={handleEdit}>done</span>
            <span className="material-symbols-outlined"
            onClick={()=> setOpenEdit(!openEdit)}>close</span>
            </div>
            </>
            :
            <>
            <div className="section"
            onClick={()=> setOpenEdit(!openEdit)}> {section} </div>
          <span className="material-symbols-outlined"
        onClick={()=>{dispatchSections({type: 'DELETE', payload: {id: id}}) ;deleteSection(id, refreshSections);}}>delete</span>
            </>
            }
          
        </div> 
        
        
        {
            task.map((elem, i)=>{
                const {id, content, details, evento, sectionid, folderid} = elem
                return (
                    <OneItem key={id? id : i} 
                    values={{id, content, details, evento, sectionid, folderid}}
                functions = {{refreshTasks, dispatchTasks}}>
                    
                    </OneItem>
                )
            })
        }
         <AddTask
         dataValues={{id}}
         functions={{dispatchTasks, refreshTasks}}></AddTask> 
    </div>

    
    
}

export {SectionHome}
