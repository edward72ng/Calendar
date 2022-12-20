import React, {useContext, useEffect, useState} from 'react'
import {DatesContext} from './datesContext'
import {useAuth} from './auth'
function Menu ({menu, setMenu}) {
  const [folders, setFolders] = useState([])
  const {setFilter} = useContext(DatesContext)
  const auth = useAuth()
  useEffect(()=>{
    fetch('http://localhost:3000/api/v1/folders',
    { 
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + auth.token,
      }
    })
    .then( res => res.json())
    .then(data =>{
      setFolders(data)
    })
  },[])
    return(
          
            <ol className={menu?'menu-enable':'menu-disable'}>
                <li onClick={()=>{setMenu(!menu)}}><i className="material-icons">menu</i></li>
                <div className='divider'></div>
              <li onClick={()=>setFilter('')}><i className="material-icons">select_all</i>All</li>
              {
                folders.map((elem, i)=>{
                  return <li key={i} onClick={()=>setFilter('?folder=' + elem.id)}><i className="material-icons" >folder</i>{elem.name}</li>
                })
              }
            </ol>
         
    )
}

export {Menu};

/*<li onClick={()=>setFilter('?folder=2')}><i className="material-icons" >folder</i>Folder1</li>
              <li><i className="material-icons">folder_open</i>Folder2</li>
              <li><i className="material-icons">folder</i>Folder3</li>
              <li><i className="material-icons">folder</i>Folder4</li> */