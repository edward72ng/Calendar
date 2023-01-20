import React, { useContext, useEffect} from 'react'
import {useAuth} from './auth'
import {useNavigate} from 'react-router-dom';
import {DatesContext} from './datesContext'
import {useFetch} from './useFetch'
import {SectionHome} from './SectionHome'
import {Menu} from './Menu'
import { AppContainer } from './AppContainer';

function Home() {
  const auth = useAuth()
  const {inputEnabled,setInputEnabled,filter} = useContext(DatesContext)
  const [blocs, updateBlocs] = useFetch('/api/v1/inbox/') //your-todos
  const navigate = useNavigate()

  useEffect(()=>{
    if(!auth.token){
      navigate('/')
    }else{
    updateBlocs(filter)
    
    }
  },[filter, inputEnabled])
  useEffect(()=>{

  })
  /*useEffect(()=>{
    const scrollX = document.getElementById('scroll-x')
    scrollX.addEventListener('wheel',(e)=>{
      e.preventDefault()
      scrollX.scrollLeft = scrollX.scrollLeft + (e.deltaY/5)
      
    }) 
  })*/

  return(
    <AppContainer>
      <div className="home-container">
    
    {blocs.map((elem, i) => {
          return <SectionHome key={i}
          dataVAlues={elem}
          index= {i}
          functions={{updateBlocs}}
          >
          </SectionHome>
                  })}  
</div>
    </AppContainer>
  )}
export {Home} 

/**
 * <div className='row'>
  <Menu></Menu>
  <div className="home-container">
    
      {blocs.map((elem, i) => {
            return <SectionHome key={i}
            dataVAlues={elem}
            index= {i}
            functions={{updateBlocs}}
            >
            </SectionHome>
                    })}  
  </div>
</div>
 */