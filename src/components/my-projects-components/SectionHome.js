
import React, { useContext, useEffect } from "react";
import { useTasks } from "../../custom-hooks/useTasks";
import { FunctionSectionsContext } from "../../providers/FuntionSeccions.provider";
import { useAuth } from "../../providers/auth";
import { DatesContext } from "../../app/datesContext";
import {OneTodo} from '../inbox-components/OneTodo'
import { SocketContext } from "../../providers/socketContext";
import { UseFetch } from "../../custom-hooks/useFetch";
import { useFetchItems } from "../../custom-hooks/useFetchItems";
function SectionHome({dataVAlues, functions, index}) {
    const {sectionid, tittle} = dataVAlues
    const {refreshSections} = functions
    const {socket} = useContext(SocketContext)
    
    const [task, dispatchTasks ,refreshTasks] =useFetchItems('/api/v1/inbox/with-section/'+ sectionid)
    const {moveToSection, move} = useContext(FunctionSectionsContext)
    const {filter} = useContext(DatesContext)

    /*useEffect(()=>{
        const section = document.getElementById('section' + index)
        const sortable = new Sortable(section,{
            group: {
                name: 'section-home'
            },

            onEnd: ()=>{ console.log(`onEnd se ejecuto en la seccion: ${tittle}` )},
        })

        return ()=>{
            sortable.destroy()
        }
    }, [])*/

    useEffect(()=>{
        if(socket){
            socket.on('refrescar',(mesagge)=>{
                
                if(mesagge.origen == sectionid || mesagge.destino == sectionid){
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
    onDrop={()=>{ console.log('DESTINO:' + sectionid); 
     //moveToSection(sectionid, refreshTask);
     move(sectionid, refreshTasks)}}>

        <div className="space-between" id="section">
          <div className="tittle"> {tittle} </div>
          <i className="material-icons">delete</i>
        </div>
        
        
        {
            task.map((elem, i)=>{
                const {id, content, details, evento, sectionid} = elem
                return (
                    <OneTodo key={id} 
                    values={{id, content, details, evento, sectionid}}
                functions = {{refreshTasks, dispatchTasks}}>
                    
                    </OneTodo>
                )
            })
        }  
    </div>

    
    
}

export {SectionHome}
