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
    //console.log("SECCIONES AL COMPLETO", sections)
    const [input, setInput] = useState('')

    const onDragEnd = (values) => {
    
      const { source, destination } = values
      if(!destination){
        return;
      }
      if((source.droppableId == 'without-section') && (destination.droppableId !== 'without-section')){
        const [dispatchItems, dispatchSection, items, order] = globalState.getDispatch(destination.droppableId) 
        
        const dragItem = task.splice(source.index, 1)
        const destinationItems = items
        console.log(dragItem)
        destinationItems.splice(destination.index, 0, dragItem[0])
  
        const destinationOrder = order
        console.log(destinationOrder)
        destinationOrder.splice(destination.index, 0, dragItem[0].id)
        const orderString = destinationOrder.join("|")
  
        dispatchSections({
          type: 'UPDATE',
          payload: {
            id: destination.droppableId,
            body:{
              order: orderString
            }
          }
        })

        dispatchTasks({
          type:  'DELETE',
          payload: {
            id: source.index
          }
        })

        dispatchItems({
          type: 'SET',
          payload:{
            body: destinationItems
          }
        })

        const body = {
          id: dragItem[0].id,
          sectionid: destination.droppableId
        }

        editSection( destination.droppableId, {orders: orderString}, () => {
          globalState.changeOrderSection(filter, destination.droppableId, orderString)
        })
        editTask(body, () => {
          const path = [filter, 'sectionsInFolder', destination.droppableId, 'tasksInSections']
          globalState.addItemInValue(path, dragItem[0])
        })
        
        //Need a gsEditItem
        return;
      }
  
      if ((source.droppableId === destination.droppableId)&& source.droppableId != 'without-section') {
        const [dispatchItems, dispatchSection, items, order] = globalState.getDispatch(destination.droppableId)
        const orders = reorder(order, source.index, destination.index)
        const newOrderTasks = reorder(items, source.index, destination.index)

        const orderString = orders.join("|")
        dispatchSections({
          type: 'UPDATE', 
            payload: {
              id: destination.droppableId, 
              body: {orders: orderString}}})

        dispatchItems({
          type: 'SET',
          payload:{
            body: newOrderTasks
          }})

        editSection(destination.droppableId, {orders: orderString}, ()=>{
          globalState.changeOrderSection(filter, destination.droppableId, orderString)
        })
      } 

      if (
      (source.droppableId !== destination.droppableId) &&
      (source.droppableId !== 'without-section') &&
      (destination.droppableId !==  'without-section')) {
        const [
          dispatchSourceItems, 
          dispatchSourceSection, 
          itemsSource, 
          orderSource] = globalState.getDispatch(source.droppableId)
        const [
          dispatchDestinationItems, 
          dispatchDestinationSection, 
          itemsDestination, 
          orderDestination] = globalState.getDispatch(destination.droppableId)

        const dragItem = itemsSource.splice(source.index, 1)
        itemsDestination.splice(destination.index, 0, dragItem[0])
        
        orderSource.splice(source.index, 1)
        orderDestination.splice(destination.index, 0, dragItem[0].id)
  
        const orderSourceString = orderSource.join("|") 
        const orderDestinationString = orderDestination.join("|")

        
      
        //console.log('ITEM S',itemsSource)
        //console.log('ITEM D',itemsDestination)
        //console.log(orderSource)
        //console.log(orderDestination)
        //console.log(orderSourceString)
        //console.log(orderDestinationString)

        globalState.changeOrderSection(filter, source.droppableId, orderSourceString)
        globalState.changeOrderSection(filter, destination.droppableId, orderDestinationString)


        dispatchSourceSection({
          type: 'UPDATE',
            payload: {
              id: source.droppableId,
              body: {
                orders: orderSourceString
              }}})

        dispatchDestinationSection({
          type: 'UPDATE',
          payload: {
            id: destination.droppableId,
            body: {
              orders: orderDestinationString
            }}})
        
        dispatchSourceItems({
          type: 'DELETE',
          payload:{
            id: source.droppableId
          }})

        dispatchDestinationItems({
          type: 'SET',
          payload:{
            body: itemsDestination
          }})

        const body = {
          id: dragItem[0].id,
          sectionid: destination.droppableId
        }

        editSection(source.droppableId, {orders: orderSourceString}, () => {
          
        })
        editSection(destination.droppableId, {orders: orderDestinationString}, () => {
          
        })
        editTask(body, () => {
          const pathSource = [filter, 'sectionsInFolder', source.droppableId, 'tasksInSections']
          globalState.deleteItemInValue(pathSource, dragItem[0].id)

          const pathDestination = [filter, 'sectionsInFolder', destination.droppableId, 'tasksInSections']
          globalState.addItemInValue(pathDestination, dragItem[0])
        })

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
        dataValues={{...elem}}
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
