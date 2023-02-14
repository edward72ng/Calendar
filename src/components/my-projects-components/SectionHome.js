
import React, { useContext, useEffect } from "react";
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
function SectionHome({dataVAlues, functions, index}) {
    const {id, section} = dataVAlues
    const {refreshSections} = functions
    const {socket} = useContext(SocketContext)
    
    const [task, dispatchTasks ,refreshTasks] = useUpdate(dataVAlues.tasksInSections)
    const {moveToSection, move} = useContext(FunctionSectionsContext)
    const {filter} = useContext(DatesContext)

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
          <div className="section"> {section} </div>
          <i className="material-icons">delete</i>
        </div>
        
        
        {
            task.map((elem, i)=>{
                const {id, content, details, evento, sectionid} = elem
                return (
                    <OneItem key={id} 
                    values={{id, content, details, evento, sectionid}}
                functions = {{refreshTasks, dispatchTasks}}>
                    
                    </OneItem>
                )
            })
        }  
    </div>

    
    
}

export {SectionHome}
