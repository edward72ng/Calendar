import React, { useContext, useEffect} from 'react'
import {useNavigate} from 'react-router-dom';
import { useAuth } from '../../providers/auth';
import { UseFetch } from '../../app/useFetch';
import { SectionHome } from '../../app/SectionHome';
import { AppContainer } from '../../app/AppContainer';
import { DatesContext } from '../../app/datesContext';

function MyProjects() {
  const {filter} = useContext(DatesContext)
  const [sections, refreshSections] = UseFetch(`/api/v1/inbox/${filter}`) 
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
</div>
}
export {MyProjects} 
