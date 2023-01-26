import React, { useContext, useEffect } from "react";
import {SocketContext} from '../providers/socketContext'
import {FunctionFoldersContext} from '../providers/FuntionFolders.provider'

function SectionMenu({dataVAlues, functions}) {
    const {tittle, data} = dataVAlues
    const {setFilter, updateFolders, del, setDel} = functions
    const {setSocket} = useContext(SocketContext)
    const {deleteFolder, moveToFolder} = useContext(FunctionFoldersContext)



    const initializeCollaborative = (id, collaborative)=>{
        setFilter('?folder=' + id)
        if(collaborative){
            const newsocket= io()
            
            setSocket(newsocket)
        }
    }

    return <>
        <div>{tittle}</div>
        {
            data.map((elem, i)=>{
                return (
                <li key={i} className='hover item space-between'
                onDragOver={(e)=>e.preventDefault()}
                onDrop={()=>moveToFolder(elem.id, updateFolders)}
                onClick={()=>initializeCollaborative(elem.id, elem.collaborative)}>
                    <div>{elem.name}</div>
                {del && 
                <i className="material-icons hover" 
                onClick={()=>{deleteFolder(elem.id, updateFolders); /*setDel(!del)*/}}>
                delete</i>}               
                </li>
                )
            })
        }
    </>

}

export {SectionMenu}