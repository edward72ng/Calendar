import React, { useContext, useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom';
import { useAuth } from '../../providers/auth';
import { UseFetch } from '../../app/useFetch';
import { SectionHome } from '../../app/SectionHome';
import { DatesContext } from '../../app/datesContext';
import { FunctionSectionsContext } from '../../providers/FuntionSeccions.provider';

function MyProjects() {
  const {filter} = useContext(DatesContext)
  const {createSection} = useContext(FunctionSectionsContext)
  const [sections, refreshSections] = UseFetch(`/api/v1/inbox/${filter}`) 
  const [input, setInput] = useState('')
  const auth = useAuth()
  const navigate = useNavigate()

  useEffect(()=>{
    if(!auth.token){
      navigate('/')
    }

    refreshSections(filter)
  },[filter])

return<div className="home-container">  
    {sections.map((elem, i) => {
        return <SectionHome key={elem.sectionid}
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
