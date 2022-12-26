import React, {useContext, useEffect, useState} from 'react'
import {DatesContext} from './datesContext'
import {useFetch} from './useFetch'
import {Form} from './Form'
import {useAuth} from './auth'
function Menu ({menu, setMenu}) {
  const [content, setContent] = useState('')
  const [del, setDel] = useState(false)
  const [folder, updateFolders] = useFetch('http://localhost:3000/api/v1/folders')
  const {setFilter} = useContext(DatesContext)
  const auth = useAuth()
  useEffect(()=>{
   
  },[folder])
  const addFolder = (e)=>{
    e.preventDefault()
    fetch('http://localhost:3000/api/v1/folders',
    {
      method: 'POST',
      body: JSON.stringify({
        name: content
      }
      ),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + auth.token,
      }
    }).then(()=>{
      updateFolders()
    })
  }
  const deleteFolder = (id) =>{
    fetch('http://localhost:3000/api/v1/folders/'+id,{
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + auth.token,
    }
  }).then(()=>{
    setContent('')
    updateFolders('/')
  })
  }
    return(
          <div className={menu?'menu-enable':'menu-disable'}>
            <ol >
                <li onClick={()=>{setMenu(!menu)}}><i className="material-icons">menu</i></li>
                <div className='divider'></div>
              <li onClick={()=>setFilter('')}><i className="material-icons">select_all</i>All</li>
              {
                folder.map((elem, i)=>{
                  return <li key={i}
                  onClick={()=>setFilter('?folder=' + elem.id)}>
                    {elem.name}
                    {del && <i className="material-icons" onClick={()=>{deleteFolder(elem.id); setDel(!del)}}>delete</i>}
                    </li>
                })
              }
            </ol>
            {!!del && 
            <Form execSubmit={addFolder}>
            <p>Agregar Carpeta</p>
            <input type="text" 
            onChange={(e)=>{setContent(e.target.value)}} 
            value={content}></input>
            </Form>
            }
            <button type='button' onClick={()=>setDel(!del)}>{!del?'habilitar edicion':'desabilitar edicion'}</button>
          </div>
    )
}

export {Menu};
