import React from "react";
import {OneTodo} from './OneTodo'
function SectionHome({dataVAlues, functions}) {
    const {tittle, data} = dataVAlues
    
    return <>
        <div>{tittle}</div>
        {
            data.map((elem, i)=>{
                return (
                    <OneTodo>

                    </OneTodo>
                )
            })
        }
    </>

}

export {SectionHome}