import React from "react";

function SectionMenu({dataVAlues, functions}) {
    const {tittle, data} = dataVAlues
    const {move, setFilter, deleteFolder, del, setDel} = functions

    const initializeCollaborative = (id, collaborative)=>{
        setFilter('?folder=' + id)
        if(collaborative){
            io()
        }
    }

    return <>
        <div>{tittle}</div>
        {
            data.map((elem, i)=>{
                return (
                <li key={i} className='hover item space-between'
                onDragOver={(e)=>e.preventDefault()}
                onDrop={()=>move(elem.id)}
                onClick={()=>initializeCollaborative(elem.id, elem.collaborative)}>
                    <div>{elem.name}</div>
                {del && 
                <i className="material-icons" 
                onClick={()=>{deleteFolder(elem.id); setDel(!del)}}>
                delete</i>}               
                </li>
                )
            })
        }
    </>

}

export {SectionMenu}