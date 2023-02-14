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
        return sectionsInFolder
    }
    

    /*useEffect(()=>{
        const getFolders = async () => {
            await Promise.all(
                myProjects.map(async (elem) => {
                    const res = await fetch 
                    return 
                })
            )
        }
    }, [loadingMyProjects])*/

    if(loadingInbox && loadingMyProjects && loadingAll && loadingWithout){
        return <div>Cargando...</div>
    }

    
    


    return <ItemsContext.Provider value={
        {inbox, dispatchInbox, updateInbox,
            myProjects, dispatchMyProjects, updateMyProjects,
            all, dispatchAll, updateAll,
            without, dispatchWithout, updateWithout,

            section
        }
        }>
        {children}
    </ItemsContext.Provider>
}

export {ItemsProvider, ItemsContext}