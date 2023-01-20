
import React, { useContext, useEffect } from "react";
import {OneTodo} from './OneTodo'
import { SocketContext } from "./socketContext";
function SectionHome({dataVAlues, functions, index}) {
    const {tittle, data} = dataVAlues
    const {updateBlocs} = functions
    const {socket} = useContext(SocketContext)

    useEffect(()=>{
        const container = document.getElementById('section' + index)
        new Sortable(container,{
            group: 'blocs',
            animation: 150,
        })
      
      })
    
    const dropBlock = (blockId)=>{
        console.log('se ha soltado algo')
        socket.emit('moveToSection',{
            toSection: tittle,
            
        })
    }

    return <div className="section-container" id={'section' + index}
    onDragOver={(e)=>{e.preventDefault();console.log('arrastrando')}}
    onDrop={()=>dropBlock()}>
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
