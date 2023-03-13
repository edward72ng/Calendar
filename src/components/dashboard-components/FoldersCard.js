import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { DataContext } from "../../providers/DataContext";
import { ItemsContext } from "../../providers/ItemsContext";
import { FolderItem } from "./FolderItem";
import { InputFolders } from "./InputFolder";
import './sliderFolders.css';

function FoldersCard () {
    const [open, setOpen] = useState(false)
    const {myProjects, dispatchMyProjects, updateMyProjects} = useContext(ItemsContext)
    const {setFilter} = useContext(DataContext)

    const colors = ['#fff8b9','#e2f6d3','#b4ded4','#afccdc','#f29f75']
    return <div className="folderscard-container">
        <div className="slider-container">
        {
            myProjects.map((elem, i)=>{
                const {id, name} = elem
                return (
                    
                    <FolderItem  key={id} values={elem}></FolderItem>
                    
                )
            })
        }
        <div className="slider-item" >
            {open ?
                <InputFolders
                functions={{updateMyProjects, dispatchMyProjects, setOpen}}></InputFolders>
            :
            <>
                <div>Add</div>
                <span className="material-symbols-outlined"
                onClick={()=>setOpen(!open)}>add</span>
            </>
                
            }
        </div>
        </div>
        
    </div>
}

export {FoldersCard}