import React, { useContext, useState } from "react";
import { FunctionFoldersContext } from "../../providers/FuntionFolders.provider";

function FolderItem ({values, functions}) {
    const {id, name, i} = values
    const {dispatchMyProjects, updateMyProjects} = functions
    const {deleteFolder, updateFolder} = useContext(FunctionFoldersContext)
    const [edit, setEdit] = useState(false)
    const [input, setInput] = useState(name)
    
    const handleDelete = (id) => {
        dispatchMyProjects({type: 'DELETE', payload: {id: id}})
        deleteFolder(id, updateMyProjects)
    }

    const handleEdit = (id) => {
        console.log('editando el folder con id:', id)
        dispatchMyProjects({type: 'UPDATE', payload: {id: id, body: {name: input}}})
        setEdit(false)
        updateFolder(id,  {name: input}, updateMyProjects)
    }
    
    return <div className="folder-card-item">
    <div>{name}</div>
    <div>
        {edit ?
          <>
          <input
          value={input}
          onChange={(e) => {setInput(e.target.value)}}></input>
      <span className="material-symbols-outlined"
      onClick={() => handleEdit(id)}>done</span>
      
      <span className="material-symbols-outlined"
      onClick={() => setEdit(false)}>close</span>
      </>
        :
        <>
        <span className="material-symbols-outlined"
        onClick={() => setEdit(true) }>edit</span>
        <span className="material-symbols-outlined"
        onClick={() => handleDelete(id)}>delete</span>
        </>
      
        }
        
        
    </div>

</div>
}

export {FolderItem }