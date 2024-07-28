import globalState from "../custom-hooks/SingletonGlobalState"

const getInbox = (id) => {
    if(!id){
        return []
    }
    const folder = globalState.getValue().find((elem)=>{
        return elem.id == id
    })
    const {blocsInFolder} = folder
    return blocsInFolder
}

const getOrderInOneSection = (folderId, sectionId) => {
    const folder = globalState.getValue().find((elem)=>{
        return elem.id == folderId
    })
    const {sectionsInFolder} = folder
    const section = sectionsInFolder.find((section) => {
        return section.id == sectionId
    })
    const {orders} = section

    return orders
}

export {getInbox, getOrderInOneSection}