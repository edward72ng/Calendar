import React, { useEffect } from "react";
import {OneTodo} from './OneTodo'
function SectionHome({dataVAlues, functions, index}) {
    const {tittle, data} = dataVAlues
    const {updateBlocs} = functions
    useEffect(()=>{
        const container = document.getElementById('section' + index)
        //const container = document.getElementsByClassName('section-container')
        new Sortable(container,{
            group: 'blocs',
            animation: 150,
            
        })
      
      })
    
    return <div className="section-container" id={'section' + index}>
        
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
