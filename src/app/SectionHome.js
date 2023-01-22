
import React, { useContext, useEffect } from "react";
import { useTasks } from "../custom-hooks/useTasks";
import { useAuth } from "./auth";
import { DatesContext } from "./datesContext";
import {OneTodo} from './OneTodo'
import { SocketContext } from "./socketContext";
import { UseFetch } from "./useFetch";
function SectionHome({dataVAlues, functions, index}) {
    const {sectionid, tittle} = dataVAlues
    const {updateBlocs} = functions
    const {socket} = useContext(SocketContext)
    const [task, updateTask] = UseFetch('/api/v1/inbox/with-section/'+ sectionid)
    //const {tasks} = useTasks(sectionid)
    const {values, setValues, filter} = useContext(DatesContext)
    const auth = useAuth()

    
    const dropBlock = (e)=>{
      const valor = e.dataTransfer.getData('mySectionId')
      console.log('ORIGEN',valor)
      console.log('DESTINO', sectionid)

      fetch('http://localhost:3000/api/v1/sections/'+sectionid,{
      method: 'POST',
      body: JSON.stringify({
        todoId: values.id
      }),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + auth.token,
      }
    }).then(()=>{
      console.log('movicion completada')
      setValues(
        {
          id: null,
          content: '',
          details: '',
          event: '',
          notifications: [],
        })
        updateData()

        socket.emit('moveToSection',{
            toSection: sectionid,
            task: values.id,
            originId: valor,
        })
    })   
    }
    
      return <div className="section-container "   id={'section' + index}
    onDragOver={(e)=>{e.preventDefault();console.log('arrastrando')}}
    onDrop={(e)=>
      {
      dropBlock(e)
    }}
    style={{}}>

        <div className="tittle" id="section">{tittle}</div>
        
        
        {
            task.map((elem, i)=>{
                return (
                    <OneTodo key={elem.id} 
                    id={elem.id} 
                    content={elem.content} 
                    details ={elem.deatails} 
                    evento={elem.evento} 
                    updateBlocs={updateBlocs}
                    updateTasks= {updateTask}
                    sectionId={sectionid}>
                    
                    </OneTodo>
                )
            })
        }  
    </div>

    
    
}

export {SectionHome}
