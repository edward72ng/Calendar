import React from "react";

function SectionMenu({dataVAlues, functions}) {
    const {tittle, data} = dataVAlues
    const {move, setFilter, deleteFolder, del, setDel} = functions
    return <>
        <div>{tittle}</div>
        {
            data.map((elem, i)=>{
                return (
                <li key={i} className='hover item space-between'
                onDragOver={(e)=>e.preventDefault()}
                onDrop={()=>move(elem.id)}
                onClick={()=>setFilter('?folder=' + elem.id)}>
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