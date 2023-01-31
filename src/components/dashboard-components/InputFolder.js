import React, { useContext, useState } from "react";
import { FunctionFoldersContext } from "../../providers/FuntionFolders.provider";

function InputFolders ({functions}) {
    const {updateFolders} = functions
    const {createFolder} = useContext(FunctionFoldersContext)
    const [input,setInput] = useState('')

    const addFolder = ()=>{
        createFolder({name: input}, updateFolders)
        setInput('')
      }

    return<div className="input-folders-container">
        <input value={input}  placeholder="Add Folder"
        onChange={(e)=>setInput(e.target.value)}></input>
        <span className="material-symbols-outlined"
        onClick={()=>addFolder()}>check</span>
    </div>
}

export {InputFolders}