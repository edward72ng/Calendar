
import React, { useContext, useEffect } from "react";
import { useTasks } from "../custom-hooks/useTasks";
import { FunctionSectionsContext } from "../providers/FuntionSeccions.provider";
import { useAuth } from "./auth";
import { DatesContext } from "./datesContext";
import {OneTodo} from './OneTodo'
import { SocketContext } from "../providers/socketContext";
import { UseFetch } from "./useFetch";
function SectionHome({dataVAlues, functions, index}) {
    const {sectionid, tittle} = dataVAlues
    const {refreshSections} = functions
    const {socket} = useContext(SocketContext)
    const [task, refreshTask] = UseFetch('/api/v1/inbox/with-section/'+ sectionid)
    const {moveToSection} = useContext(FunctionSectionsContext)
    const {filter} = useContext(DatesContext)
    useEffect(()=>{
        if(socket){
            socket.on('refresh',(mesagge)=>{
                
                if(mesagge.origen == sectionid || mesagge.destino == sectionid){
                    console.log('escucho un evento del server')
                    setTimeout(()=>{
                        refreshTask()
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

    /*useEffect(()=>{
        const section = document.getElementById('section' + index)
        const sortable = new Sortable(section,{
            group: {
                name: 'section-home'
            }
        })

        return ()=>{
            sortable.destroy()
        }
    }, [])*/


      return <div className="section-container "   id={'section' + index}
    onDragOver={(e)=>{e.preventDefault();console.log('arrastrando'); e.currentTarget.classList.add('select')}}
    onDrop={()=>{ console.log('DESTINO:' + sectionid);  moveToSection(sectionid, refreshTask);}}>

        <div className="space-between" id="section">
          <div className="tittle"> {tittle} </div>
          <i className="material-icons">delete</i>
        </div>
        
        
        {
            task.map((elem, i)=>{
                return (
                    <OneTodo key={elem.id} 
                    id={elem.id} 
                    content={elem.content} 
                    details ={elem.deatails} 
                    evento={elem.evento} 
                    refreshTasks= {refreshTask}
                    sectionId={sectionid}>
                    
                    </OneTodo>
                )
            })
        }  
    </div>

    
    
}

export {SectionHome}
