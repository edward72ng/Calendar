import React, {useContext, useEffect, useState} from 'react'
import {DatesContext} from './datesContext'
import {UseFetch} from './useFetch'
import {Form} from './Form'
import {useAuth} from '../providers/auth'
import {SectionMenu} from './SectionMenu'
import { FunctionFoldersContext } from '../providers/FuntionFolders.provider'
function Menu ({menu, setMenu, className}) {
  const [content, setContent] = useState('')
  const [del, setDel] = useState(false)
  const [folder, updateFolders] = UseFetch('http://localhost:3000/api/v1/folders')
  const {values,setValues,setFilter} = useContext(DatesContext)
  const {createFolder} = useContext(FunctionFoldersContext)
  const auth = useAuth()

  const addFolder = (e)=>{
    e.preventDefault()
    createFolder({name: content}, updateFolders)
    setContent('')
  }

    return(
      <>
          <div className={className? className : 'menu-enable'}>
            <ol >
              <li className='hover item'
              onClick={()=>setFilter('')}>
                <i className="material-icons">select_all</i>
              All</li>
              {
                folder.map((elem, i)=>{
                  return <SectionMenu key={i} 
                  dataVAlues={elem}
                  functions={{setFilter, del, setDel, updateFolders}}
                  ></SectionMenu>
                })
              }
            </ol>

            <div className='edit-folder-container'>
              
            {!!del && 
            <Form execSubmit={addFolder}>
            <p>Agregar Carpeta</p>
            <input type="text" 
            onChange={(e)=>{setContent(e.target.value)}} 
            value={content}></input>
            </Form>
            }
            <button type='button' className='btn' 
            onClick={()=>setDel(!del)}>{!del?'habilitar edicion':'desabilitar edicion'}
            </button>
            </div>
            </div>
          
          {className &&
            <div className='null'
          onDragEnter={()=>setMenu(false)}></div>}
          </>
    )
}

export {Menu};

/*
 return <li  key={i} className="hover item"
                  onDragOver={(e)=>e.preventDefault()}
                  onDrop={()=>move(elem.id)}
                  onClick={()=>setFilter('?folder=' + elem.id)}>
                    {elem.name}
                    {del && <i className="material-icons" onClick={()=>{deleteFolder(elem.id); setDel(!del)}}>delete</i>}
                    </li>
*/