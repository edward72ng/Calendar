import React, { createContext, useEffect, useState } from "react";
import { Loading } from "../components/UI-components/Loading";
import { useFetchItems } from "../custom-hooks/useFetchItems";
import {
    tasksUrl,
    timeBlockDate,
    inboxUrl,
    colorsUrl,
    myTagsUrl,
    prioritiesUrl,
    projectsUrl,
    myAll,
    withoutSections} from "./URLS"

const ItemsContext = createContext()


function ItemsProvider ({children}) {
    const [colors, dispatchColors, updateColors, loadingColors] = useFetchItems(colorsUrl)
    const [inbox, dispatchInbox, updateInbox, loadingInbox] = useFetchItems(inboxUrl)
    const [myProjects, dispatchMyProjects, updateMyProjects, loadingMyProjects] = useFetchItems(projectsUrl)
    const [priorities, dispatchPriorities, updatePriorities, loadingPriorities] = useFetchItems(prioritiesUrl)
    const [all, dispatchAll, updateAll, loadingAll] = useFetchItems(myAll)
    const [without, dispatchWithout, updateWithout, loadingWithout] = useFetchItems(withoutSections)
    const [tags, dispatchTags, updateTags, loadingTags] = useFetchItems(myTagsUrl)
    const [taks, dispatchTaks, updateTaks, loadingTaks] = useFetchItems(tasksUrl)
    const [timeBlock, dispatchTimeBlock, updateTimeBlock, loadingTimeBlock] = useFetchItems(timeBlockDate)
    const [errorMessage, setErrorMessage] = useState(null)

  
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


    if(!loadingInbox && 
        !loadingMyProjects && 
        !loadingAll && 
        !loadingWithout && 
        !loadingTags &&
        !loadingColors &&
        !loadingPriorities &&
        !loadingTaks &&
        !loadingTimeBlock){

        return <ItemsContext.Provider value={
            {inbox, dispatchInbox, updateInbox,
                myProjects, dispatchMyProjects, updateMyProjects,
                all, dispatchAll, updateAll,
                without, dispatchWithout, updateWithout,
                tags, dispatchTags, updateTags,
                colors, dispatchColors, updateColors,
                priorities, dispatchPriorities, updatePriorities,
                //taks, dispatchTaks, updateTaks,
                timeBlock, dispatchTimeBlock, updateTimeBlock,
                section, task,
                errorMessage, setErrorMessage
            }
            }>
            {children}
        </ItemsContext.Provider>
    }
    return <Loading></Loading>
    
}

export {ItemsProvider, ItemsContext}