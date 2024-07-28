import React, { useContext, useEffect, useRef, useState} from 'react'
import {useNavigate} from 'react-router-dom';
import { useAuth } from '../../providers/auth';
import { getforSection, reorder } from '../../utils/dragAndDrop'
import { SectionHome } from './SectionHome';
import { FunctionSectionsContext } from '../../providers/FuntionSeccions.provider';
import { ItemsContext } from '../../providers/ItemsContext';
import { useSection } from '../../custom-hooks/useSection';
import { WithoutSection } from './WithoutSection';
import { DataContext } from '../../providers/DataContext';
import { DragDropContext} from 'react-beautiful-dnd'
import { FunctionTasksContext } from '../../providers/FunctionTasks.provider';
import { useWithoutSection } from '../../custom-hooks/useWithoutSection';
import {reloadSectionsUrl} from '../../providers/URLS'
import globalState from '../../custom-hooks/SingletonGlobalState'

function MyProjects() {
    const {filter} = useContext(DataContext)
    const {updateAll} = useContext(ItemsContext)
    const {createSection, editSection} = useContext(FunctionSectionsContext) 
    const {editTask} = useContext(FunctionTasksContext)
    

    const [task, dispatchTasks, refreshTasks] = useWithoutSection()
    const [sections, dispatchSections, refreshSections] = useSection()
    
    const myDispatchsItem = []
    const addDispatch = (id, dispatch) => {
      const newDispatch = {
        id,
        dispatch
      }
      myDispatchsItem.push(newDispatch)
    } 

    const [input, setInput] = useState('')

    console.log('MyProjects Renderizado', sections)
    const onDragEnd = (values) => {
      const { source, destination } = values
      if(!destination){
        return;
      }
      if( source.droppableId == 'without-section'){
       
        const [sectionDest, tasksInsectionDest, orderDest] = getforSection(destination.droppableId, sections)
        //console.log('Justo despues del Posible error', tasksInsectionDest)
        const dragItem = task.splice(source.index, 1)
        tasksInsectionDest.splice(destination.index, 0, ...dragItem)
  
        orderDest.splice(destination.index, 0, dragItem[0].id.toString())
        const orderDestString = orderDest.join("|")
  
        dispatchSections({type: 'UPDATE', payload: {id: destination.droppableId, body: {tasksInSections: tasksInsectionDest, orders: orderDestString}}})
        const body = {
          id: dragItem[0].id,
          sectionid: destination.droppableId
        }
        editTask(body, () => {
          editSection(destination.droppableId, {orders: orderDestString}, () => {
            updateAll() 
          })
        })
        
         
        return;
      }
  
      if ((source.droppableId === destination.droppableId)&& source.droppableId != 'without-section') {
         //cambiar el tasksinsection = getforsection() por el  globalestategetdispatch para obter un valor mas actual
        const [section, tasksInsection, order] = getforSection(destination.droppableId, sections)
        
        const orders = reorder(order, source.index, destination.index)
        const newOrderTasks = reorder(tasksInsection, source.index, destination.index)

        const orderString = orders.join("|")
        
        dispatchSections(
          {type: 'UPDATE', 
            payload: {
              id: destination.droppableId, 
              body: {orders: orderString}}})

        const [dispatchItems, dispatchSection] = globalState.getDispatch(destination.droppableId) 
        dispatchItems({
          type: 'SET',
          payload:{
            body: newOrderTasks
          }
        })

        editSection(destination.droppableId, {orders: orderString}, ()=>{})
        
        
      } 

      if (source.droppableId !== destination.droppableId) {
        const [sectionSrc, tasksInsectionSrc, orderSrc] = getforSection(source.droppableId, sections)
        const [sectionDest, tasksInsectionDest, orderDest] = getforSection(destination.droppableId, sections)
        
        const dragItem = tasksInsectionSrc.splice(source.index, 1)
        tasksInsectionDest.splice(destination.index, 0, ...dragItem)
        
        orderSrc.splice(source.index, 1)
        orderDest.splice(destination.index, 0, dragItem[0].id.toString())
  
        const orderSrcString = orderSrc.join("|") 
        const orderDestString = orderDest.join("|")
      
        dispatchSections({type: 'UPDATE', payload: {id: source.droppableId, body: {tasksInSections: tasksInsectionSrc, orders: orderSrcString}}})
        dispatchSections({type: 'UPDATE', payload: {id: destination.droppableId, body: {tasksInSections: tasksInsectionDest, orders: orderDestString}}})
        
        const body = {
          id: dragItem[0].id,
          sectionid: destination.droppableId
        }
  
        editTask(body,()=>{})
        editSection(source.droppableId, {orders: orderSrcString}, ()=>{})
        editSection(destination.droppableId, {orders: orderDestString}, ()=>{updateAll()})
        
        return;
      }
    }


    return<div className="home-container">
    <DragDropContext onDragEnd={onDragEnd}>
  
    <WithoutSection 
    values={{task}} 
    functions={{dispatchTasks, refreshTasks}}
    />
  
    {sections.map((elem, i) => {
        return <SectionHome key={elem.id ? elem.id : 'provitionalSectionKey'}
        dataValues={elem}
        index= {elem.id}
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
            createSection({section:input, folderid:filter, orders: ""},() => refreshSections(`${reloadSectionsUrl}${filter}`));
            setInput('')
          }}>add</span>
    </div>
    </div>
    
</div>
}
export {MyProjects} 
