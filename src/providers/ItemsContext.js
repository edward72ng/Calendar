import React, { createContext, useEffect, useState } from "react";
import { Loading } from "../components/UI-components/Loading";
import { useFetchItems } from "../custom-hooks/useFetchItems";

const inboxUrl = '/api/v1/inboxtasks/'
const projectsUrl = '/api/v1/folders/me'
const myItemsUrls = '/api/v1/inbox/?folder='
const colorsUrl = '/api/v1/colors'
const myTagsUrl = '/api/v1/tags/my-tags'
const myAll = '/api/v1/folders/all'
const withoutSections = '/api/v1/folders/without-sections'
const prioritiesUrl = '/api/v1/priorities/'
const tasksUrl = '/api/v1/inbox/get-all/2'
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

    console.log('INBOX', inbox)
    
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
        !loadingPriorities){

        return <ItemsContext.Provider value={
            {inbox, dispatchInbox, updateInbox,
                myProjects, dispatchMyProjects, updateMyProjects,
                all, dispatchAll, updateAll,
                without, dispatchWithout, updateWithout,
                tags, dispatchTags, updateTags,
                colors, dispatchColors, updateColors,
                priorities, dispatchPriorities, updatePriorities,
                taks, dispatchTaks, updateTaks,
                section, task
            }
            }>
            {children}
        </ItemsContext.Provider>
    }
    return <Loading></Loading>
    
}

export {ItemsProvider, ItemsContext}