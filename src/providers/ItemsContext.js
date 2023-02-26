import React, { createContext, useEffect, useState } from "react";
import { useFetchItems } from "../custom-hooks/useFetchItems";

const inboxUrl = '/api/v1/inboxtasks/'
const projectsUrl = '/api/v1/folders/me'
const myItemsUrls = '/api/v1/inbox/?folder='

const myAll = '/api/v1/folders/all'
const withoutSections = '/api/v1/folders/without-sections'

const ItemsContext = createContext()


function ItemsProvider ({children}) {
    const [inbox, dispatchInbox, updateInbox, loadingInbox] = useFetchItems(inboxUrl)
    const [myProjects, dispatchMyProjects, updateMyProjects, loadingMyProjects] = useFetchItems(projectsUrl)
    
    const [all, dispatchAll, updateAll, loadingAll] = useFetchItems(myAll)
    const [without, dispatchWithout, updateWithout, loadingWithout] = useFetchItems(withoutSections)
    const section = (id)=> {
        if(!id){
            return []
        }
        const folder = all.find((elem)=>{
            return elem.id == id
        })
        const {sectionsInFolder} = folder

        const sectionWithOrderTasks = sectionsInFolder.map((elem)=>{
            const orderString = elem.orders
            const order = orderString.split("|")
            const copyTasks = []
            order.forEach((id) => {
              const element = elem.tasksInSections.find((item) => item.id == id);
              if (element) {
                copyTasks.push(element);
              }
            });
            return {
                ...elem,
                tasksInSections: copyTasks
            }
        })
        //console.log('section()')
        return sectionWithOrderTasks
    }
    
    const task = (id) => {
        const folder = without.find((elem) => {
            return elem.id == id
        })
        if (!folder){
            return []
        }
        const {blocsInFolder} = folder
        //console.log('task()')
        return blocsInFolder
    }


    if(!loadingInbox && !loadingMyProjects && !loadingAll && !loadingWithout){
        return <ItemsContext.Provider value={
            {inbox, dispatchInbox, updateInbox,
                myProjects, dispatchMyProjects, updateMyProjects,
                all, dispatchAll, updateAll,
                without, dispatchWithout, updateWithout,
    
                section, task
            }
            }>
            {children}
        </ItemsContext.Provider>
    }
    return <div>Cargando...</div>
    
}

export {ItemsProvider, ItemsContext}