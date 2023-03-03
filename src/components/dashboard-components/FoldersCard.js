import React, { useContext, useState } from "react";
import { ItemsContext } from "../../providers/ItemsContext";
import { FolderItem } from "./FolderItem";
import { InputFolders } from "./InputFolder";
import './sliderFolders.css';
function FoldersCard () {
    const [open, setOpen] = useState(false)
    const {myProjects, dispatchMyProjects, updateMyProjects} = useContext(ItemsContext)

    const colors = ['#fff8b9','#e2f6d3','#b4ded4','#afccdc','#f29f75']
    return <div className="folderscard-container">
        <div className="slider-container">
        {
            myProjects.map((elem, i)=>{
                const {id, name} = elem
                return (
                    <div key={id} className="slider-item" style={{ backgroundColor: colors[i] }}>
                        <span>{name}</span>
                    </div>
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