import React, { useState } from "react";
import { UseFetch } from "../../custom-hooks/useFetch";
import { InputFolders } from "./InputFolder";

function FoldersCard () {
    const [open, setOpen] = useState(false)
    const [folders, updateFolders] = UseFetch('/api/v1/folders/')

    return <div className="folder-card-container">
        {
            folders.map((elem)=>{
                return <div key={elem.id} className="folder-card-item">
                    <div>{elem.name}</div>
                    <div>
                        {elem.collaborative ?
                        <span className="material-symbols-outlined">groups</span>
                        :
                        <span className="material-symbols-outlined">person_filled</span>
                        }
                    </div>

                </div>
            })
        }
        <div className="folder-card-item" 
        onClick={()=>setOpen(!open)}>
            <div>Add</div>
            <span className="material-symbols-outlined">add</span>
            {
                <InputFolders
                functions={{updateFolders}}></InputFolders>
            }
        </div>
    </div>
}

export {FoldersCard}