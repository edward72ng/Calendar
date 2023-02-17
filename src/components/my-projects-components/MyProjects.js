import React, { useContext, useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom';
import { useAuth } from '../../providers/auth';
import { UseFetch } from '../../custom-hooks/useFetch';
import { SectionHome } from './SectionHome';
import { FunctionSectionsContext } from '../../providers/FuntionSeccions.provider';
import { ItemsContext } from '../../providers/ItemsContext';
import { useUpdate } from '../../custom-hooks/useUpdate';
import { WithoutSection } from './WithoutSection';
import { DataContext } from '../../providers/DataContext';

function MyProjects() {
  const {filter} = useContext(DataContext)
  const {createSection} = useContext(FunctionSectionsContext) 
  const {all, without} = useContext(ItemsContext)

  const [render, setRender] = useState(0)
  const [sections, dispatchSections, refreshSections] = useUpdate()
  const [input, setInput] = useState('')
  const auth = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    setRender(render + 1)
 },[all, without])

return<div className="home-container">
  <WithoutSection></WithoutSection>
    {sections.map((elem, i) => {
        return <SectionHome key={elem.id ? elem.id : i}
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
            dispatchSections({type: 'CREATE', payload: {body: {section: input, tasksInSections: []}}});
            createSection({section:input, folderid:filter},() => refreshSections(`/api/v1/sections//all/with-task/${filter}`));
            setInput('')
          }}>add</span>
        </div>
    </div>
    
</div>
}
export {MyProjects} 
