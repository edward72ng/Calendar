import React, { useContext, useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom';
import { useAuth } from '../../providers/auth';
import { UseFetch } from '../../custom-hooks/useFetch';
import { SectionHome } from './SectionHome';
import { DatesContext } from '../../app/datesContext';
import { FunctionSectionsContext } from '../../providers/FuntionSeccions.provider';
import { ItemsContext } from '../../providers/ItemsContext';
import { useUpdate } from '../../custom-hooks/useUpdate';

function MyProjects() {
  const {filter} = useContext(DatesContext)
  const {createSection} = useContext(FunctionSectionsContext) 
  const {section} = useContext(ItemsContext)
  console.log(section(filter))
  
  
  const [folderId, setFolderid] = useState(null)
  const [sections, dispatchSections, refreshSections] = useUpdate(section(filter))
  
  const [input, setInput] = useState('')
  const auth = useAuth()
  const navigate = useNavigate()

  useEffect(()=>{
    setFolderid(filter)
  }, [filter])

return<div className="home-container">  
    {sections.map((elem, i) => {
        return <SectionHome key={elem.id}
        dataVAlues={elem}
        index= {i}
        functions={{refreshSections}}>
        </SectionHome>})
    }  

    <div className='section-container'>
    <div className="space-between" id="section">
          <input className='tittle' placeholder='Añadir Secccion'
          value={input}
          onChange={(e)=>setInput(e.target.value)}></input>
          <span className="material-symbols-outlined"
          onClick={()=>{
            createSection({section:input, folderid:filter.replace("?folder=","")},refreshSections);
            setInput('')
          }}>add</span>
        </div>
    </div>
    
</div>
}
export {MyProjects} 
