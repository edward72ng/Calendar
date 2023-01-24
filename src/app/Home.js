import React, { useContext, useEffect} from 'react'
import {useAuth} from './auth'
import {useNavigate} from 'react-router-dom';
import {DatesContext} from './datesContext'
import {UseFetch} from './useFetch'
import {SectionHome} from './SectionHome'
import {Menu} from './Menu'
import { AppContainer } from './AppContainer';

function Home() {
  const auth = useAuth()
  const {inputEnabled,setInputEnabled,filter} = useContext(DatesContext)
  const [sections, refreshSections] = UseFetch('/api/v1/inbox/') //your-todos
  const navigate = useNavigate()

  useEffect(()=>{
    if(!auth.token){
      navigate('/')
    }else{
    refreshSections(filter)
    
    }
  },[filter, inputEnabled])

  return(
    <AppContainer>
      <div className="home-container">
    
    {sections.map((elem, i) => {
          return <SectionHome key={elem.sectionid}
          dataVAlues={elem}
          index= {i}
          functions={{refreshSections}}
          >
          </SectionHome>
                  })}  
</div>
    </AppContainer>
  )}
export {Home} 
