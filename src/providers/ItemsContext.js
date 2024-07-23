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
    //console.log("ITEM cONTEXT!!!!!")
    const [colors, dispatchColors, updateColors, loadingColors] = useFetchItems(colorsUrl)
    const [inbox, dispatchInbox, updateInbox, loadingInbox] = useFetchItems(inboxUrl)
    const [myProjects, dispatchMyProjects, updateMyProjects, loadingMyProjects] = useFetchItems(projectsUrl)
    const [priorities, dispatchPriorities, updatePriorities, loadingPriorities] = useFetchItems(prioritiesUrl)
    const [all, dispatchAll, updateAll, loadingAll] = useFetchItems(myAll)
    const [without, dispatchWithout, updateWithout, loadingWithout] = useFetchItems(withoutSections)
    //En dudas de uso ^

    const [tags, dispatchTags, updateTags, loadingTags] = useFetchItems(myTagsUrl)
    const [timeBlock, dispatchTimeBlock, updateTimeBlock, loadingTimeBlock] = useFetchItems(timeBlockDate)
    const [errorMessage, setErrorMessage] = useState(null)
    console.log("se rerenderiza el contexto",all)
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
    
    const getItemsWithoutSection = (id) => {
        if(!id){
            return []
        }
        const folder = all.find((elem)=>{
            return elem.id == id
        })
        const {blocsInFolder} = folder
        /*const folder = without.find((elem) => {
            return elem.id == id
        })*/

        if (!folder){
            return []
        }
        //console.log('getItemsWithoutSection()')
        return blocsInFolder
    }


    if(!loadingInbox && 
        !loadingMyProjects && 
        !loadingAll && 
        !loadingWithout && 
        !loadingTags &&
        !loadingColors &&
        !loadingPriorities &&
        !loadingTimeBlock
        ){

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
                section, getItemsWithoutSection,
                errorMessage, setErrorMessage
            }
            }>
            {children}
        </ItemsContext.Provider>
    }
    return <Loading></Loading>
    
}

export {ItemsProvider, ItemsContext}