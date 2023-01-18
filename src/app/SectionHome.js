import React from "react";
import {OneTodo} from './OneTodo'
function SectionHome({dataVAlues, functions}) {
    const {tittle, data} = dataVAlues
    const {updateBlocs} = functions
    return <>
        <div>{tittle}</div>
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
    </>

}

export {SectionHome}
