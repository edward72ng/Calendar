import React from 'react'
import {Link} from 'react-router-dom'


function Menu ({menu, setMenu}) {
    return(
          
            <ol className={menu?'menu-enable':'menu-disable'}>
                <li onClick={()=>{setMenu(!menu)}}><i className="material-icons">menu</i></li>
                <div className='divider'></div>
              <li><i className="material-icons">select_all</i>All</li>
              <li><i className="material-icons">folder</i>Folder1</li>
              <li><i className="material-icons">folder_open</i>Folder2</li>
              <li><i className="material-icons">folder</i>Folder3</li>
              <li><i className="material-icons">folder</i>Folder4</li>
            </ol>
         
    )
}

export {Menu};