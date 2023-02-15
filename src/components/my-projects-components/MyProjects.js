import React, { useContext, useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom';
import { useAuth } from '../../providers/auth';
import { UseFetch } from '../../custom-hooks/useFetch';
import { SectionHome } from './SectionHome';
import { DatesContext } from '../../app/datesContext';
import { FunctionSectionsContext } from '../../providers/FuntionSeccions.provider';
import { ItemsContext } from '../../providers/ItemsContext';
import { useUpdate } from '../../custom-hooks/useUpdate';
import { WithoutSection } from './WithoutSection';

function MyProjects() {
  const {filter} = useContext(DatesContext)
  const {createSection} = useContext(FunctionSectionsContext) 
  const {all} = useContext(ItemsContext)

  const [render, setRender] = useState(0)
  const [sections, dispatchSections, refreshSections] = useUpdate()
  const [input, setInput] = useState('')
  const auth = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    setRender(render + 1)
 },[all])

return<div className="home-container">
  <WithoutSection></WithoutSection>
    {sections.map((elem, i) => {
        return <SectionHome key={elem.id}
        dataValues={elem}
        index= {i}
        functions={{refreshSections, dispatchSections}}>
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
