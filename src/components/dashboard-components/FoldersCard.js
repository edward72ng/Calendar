import React from "react";

function FoldersReact () {
    const [folders, updateFolders] = UseFetch('/api/v1/folders/')

    return <div className="folder-card-container">
        {
            folders.map((elem)=>{
                return <div key={elem.id} className="folder-card-item">
                    <div>{elem.name}</div>
                    <div>
                        {elem.collaborative ?
                        <span class="material-symbols-outlined">groups</span>
                        :
                        <span class="material-symbols-outlined">person_filled</span>
                        }
                    </div>

                </div>
            })
        }
    </div>
}

export {FoldersReact}