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
                    <OneTodo id={elem.id} content={elem.content} details ={elem.deatils} evento={elem.evento} updateBlocs={updateBlocs}>

                    </OneTodo>
                )
            })
        }
    </>

}

export {SectionHome}
