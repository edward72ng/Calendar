import React, { createContext, useEffect, useState } from "react";
import { useFetchItems } from "../custom-hooks/useFetchItems";

const productsUrl = '/api/v1/my-items/products-single/1'
const needUrl = '/api/v1/my-items/need/1'
const resumeUrl = '/api/v1/my-items/resume'

const ItemsContext = createContext()

const inboxUrl = '/api/v1/inboxtasks/'
const projectsUrl = '/api/v1/folders/me'
const myItemsUrls = '/api/v1/inbox/?folder='
function ItemsProvider ({children}) {
    const [inbox, dispatchInbox, updateInbox, loadingInbox] = useFetchItems(inboxUrl)
    const [myProjects, dispatchMyProjects, updateMyProjects, loadingMyProjects] = useFetchItems(projectsUrl)
    
    
    const [loading, setLoading] = useState(true)

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

    useEffect(()=>{
        setTimeout(()=> {
            setLoading(false)
        }, 2000)
    },[])

    if(loading){
        return <div>Cargando...</div>
    }

    return <ItemsContext.Provider value={
        {loading
        }
        }>
        {children}
    </ItemsContext.Provider>
}

export {ItemsProvider, ItemsContext}