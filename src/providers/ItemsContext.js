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
    withoutSections,
    myInbox} from "./URLS"
import { useItems } from "../custom-hooks/useItems";
import globalState from "../custom-hooks/SingletonGlobalState"

const ItemsContext = createContext()



function ItemsProvider ({children}) {
    const [register] =  useFetchItems(myInbox)
    const [colors, dispatchColors, updateColors, loadingColors] = useFetchItems(colorsUrl)
    const [inbox, dispatchInbox, updateInbox, loadingInbox] = useFetchItems(inboxUrl)
    const [myProjects, dispatchMyProjects, updateMyProjects, loadingMyProjects] = useFetchItems(projectsUrl)
    const [priorities, dispatchPriorities, updatePriorities, loadingPriorities] = useFetchItems(prioritiesUrl)
    

    const [all, dispatchAll, updateAll, loadingAll] = useFetchItems(myAll)
    console.log('TODOS LOS DATOS',all)
    console.log('OPCIONES DE PRIORIDAD',priorities)

    const [without, dispatchWithout, updateWithout, loadingWithout] = useFetchItems(withoutSections)
    //En dudas de uso ^

    const [tags, dispatchTags, updateTags, loadingTags] = useFetchItems(myTagsUrl)
    const [timeBlock, dispatchTimeBlock, updateTimeBlock, loadingTimeBlock] = useFetchItems(timeBlockDate)
    const [errorMessage, setErrorMessage] = useState(null)
    
    const [updated, loading] = useItems(myAll)

    console.log("se rerenderiza el contexto",globalState.getValue())

    const getSections = (id)=> {
        if(!id){
            return []
        }
        const folder = globalState.getValue().find((elem)=>{
            return elem.id == id
        })
        const {sectionsInFolder} = folder

        const sectionWithOrderTasks = sectionsInFolder.map((elem)=>{
            console.log('LA SECCION', elem)
            const orderString = elem.orders
            console.log('THE POSSBLE ERR',orderString)
            const order = orderString.split("|").filter(elem => elem !== '');
            //const order = elem.orders
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
        return sectionWithOrderTasks
    }
    
    const getWthSection = (id) => {
        if(!id){
            return []
        }
        const folder = globalState.getValue().find((elem)=>{
            return elem.id == id
        })
        const {blocsInFolder} = folder

        if (!folder){
            return []
        }

        return blocsInFolder
    }

   

    const getFolder = (id) => {
        const folder = globalState.getValue().find((elem) => {
            return elem.id == id
        })
        return folder
    }

    const getAllFolders = () => {
        const folders = globalState.getValue()
        return folders
    }

    if(!loadingInbox && 
        !loadingMyProjects && 
        !loadingAll && 
        !loadingWithout && 
        !loadingTags &&
        !loadingColors &&
        !loadingPriorities &&
        !loadingTimeBlock && 
        !loading
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
                //section, getItemsWithoutSection,
                errorMessage, setErrorMessage,
                getSections, getWthSection, getFolder, getAllFolders,
                register
            }
            }>
            {children}
        </ItemsContext.Provider>
    }
    return <Loading></Loading>
    
}

export {ItemsProvider, ItemsContext}