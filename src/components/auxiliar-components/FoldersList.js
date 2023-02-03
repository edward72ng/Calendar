import React, { useContext, useEffect } from "react";
import {UseFetch} from '../../custom-hooks/useFetch'
import { DataContext } from "../../providers/DataContext";


function FoldersList() {
    const {taskValue, 
        setTaskValue} = useContext(DataContext)
    const [myProjects, updateMyProjects] = UseFetch('/api/v1/folders/me')

   
    

    return <ul className="folder-list">
        {myProjects.map((elem) => {
			return  <li key={elem.id}
					onClick={()=>setTaskValue({ ...taskValue, folderid: elem.id })}>
						{elem.name}
					</li>
			})}
    </ul>
}

export {FoldersList}

//Object.assign(taskValue, {folderid: elem.id})