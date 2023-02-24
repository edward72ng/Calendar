import React, { useContext, useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom';
import { useAuth } from '../../providers/auth';
import { getforSection, reorder } from '../../utils/dragAndDrop'
import { SectionHome } from './SectionHome';
import { FunctionSectionsContext } from '../../providers/FuntionSeccions.provider';
import { ItemsContext } from '../../providers/ItemsContext';
import { useUpdate } from '../../custom-hooks/useUpdate';
import { WithoutSection } from './WithoutSection';
import { DataContext } from '../../providers/DataContext';
import { DragDropContext} from 'react-beautiful-dnd'



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
 },[all, without, sections])

 const onDragEnd = (values) => {
  const { source, destination } = values
  if(!destination){
    return;
  }
  if (source.droppableId === destination.droppableId) {
    const [section, tasksInsection, orders] = getforSection(destination.droppableId, sections)
    const tasksInSections = reorder(tasksInsection, source.index, destination.index)

    const newElem = {
      ...section,
      tasksInSections
    }
    dispatchSections({type: 'UPDATE', payload: {id: destination.droppableId, body: {tasksInSections: tasksInSections}}})
    return;
  } 
  if (source.droppableId !== destination.droppableId) {
    const [sectionSrc, tasksInsectionSrc] = getforSection(source.droppableId, sections)
    const [sectionDest, tasksInsectionDest] = getforSection(destination.droppableId, sections)
    
    const dragItem = tasksInsectionSrc.splice(source.index, 1)
    tasksInsectionDest.splice(destination.index, 0, ...dragItem)
    console.log(dragItem)
    dispatchSections({type: 'UPDATE', payload: {id: source.droppableId, body: {tasksInSections: tasksInsectionSrc}}})
    dispatchSections({type: 'UPDATE', payload: {id: destination.droppableId, body: {tasksInSections: tasksInsectionDest}}})
  }
  console.log(values)
}

return<div className="home-container">
  <WithoutSection></WithoutSection>
  <DragDropContext onDragEnd={onDragEnd}>
    {sections.map((elem, i) => {
        return <SectionHome key={elem.id ? elem.id : 'provitionalSectionKey'}
        dataValues={elem}
        index= {i}
        functions={{refreshSections, dispatchSections}}>
        </SectionHome>})
    }  
 </DragDropContext>
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
