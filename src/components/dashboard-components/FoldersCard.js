import React, { useContext, useState } from "react";
import { ItemsContext } from "../../providers/ItemsContext";
import { FolderItem } from "./FolderItem";
import { InputFolders } from "./InputFolder";

function FoldersCard () {
    const [open, setOpen] = useState(false)
    const {myProjects, dispatchMyProjects, updateMyProjects} = useContext(ItemsContext)


    return <div className="folder-card-container">
        {
            myProjects.map((elem, i)=>{
                const {id, name} = elem
                return <FolderItem key={elem.id ? elem.id : i}
                values={{id, name, i}}
                functions= {{dispatchMyProjects, updateMyProjects}}>
                </FolderItem>})
        }
        <div className="folder-card-item" >
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
}

export {FoldersCard}