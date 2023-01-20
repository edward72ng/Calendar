
import React, { useContext, useEffect } from "react";
import { useAuth } from "./auth";
import { DatesContext } from "./datesContext";
import {OneTodo} from './OneTodo'
import { SocketContext } from "./socketContext";
function SectionHome({dataVAlues, functions, index}) {
    const {sectionid, tittle, data} = dataVAlues
    const {updateBlocs} = functions
    const {socket} = useContext(SocketContext)
    const {values, setValues, filter} = useContext(DatesContext)
    const auth = useAuth()
    useEffect(()=>{
        const container = document.getElementById('section' + index)
        new Sortable(container,{
            group: 'blocs',
            animation: 150,
        })
      
      })
    
    const dropBlock = (blockId)=>{
        console.log('se ha soltado algo')
        /*socket.emit('moveToSection',{
            toSection: tittle,
            
        })*/
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
        console.log(sectionid, values.id)
      setValues(
        {
          id: null,
          content: '',
          details: '',
          event: '',
          notifications: [],
        })
        updateBlocs(filter)
    })   
    }

    return <div className="section-container "   id={'section' + index}
    onDragOver={(e)=>{e.preventDefault();console.log('arrastrando')}}
    onDrop={()=>dropBlock()}
    style={{}}>

        <div className="tittle" id="section">{tittle}</div>
        
        
        {
            data.map((elem, i)=>{
                return (
                    <OneTodo key={i} 
                    id={elem.id} 
                    content={elem.content} 
                    details ={elem.deatails} 
                    evento={elem.evento} 
                    updateBlocs={updateBlocs}>

                    </OneTodo>
                )
            })
        }  
    </div>

}

export {SectionHome}
