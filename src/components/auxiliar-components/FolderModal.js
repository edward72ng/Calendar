import React, { useContext, useState } from "react";
import { ItemsContext } from "../../providers/ItemsContext";
import folderStyle from './FolderModal.module.css'
import { DataContext } from "../../providers/DataContext";


const {sectionItem, itemInbox, folderDataItem, subModalContainer, button, positionContainer} = folderStyle

function FolderModal ({functions, values}) {
    const {changeFolderSection} = functions
    const {folder_id} = useContext(DataContext)
    const {getAllFolders} = useContext(ItemsContext)
    const [isClosed, setIsClosed] = useState(true)
    const {thisFolder } = values
    const folders = getAllFolders()

console.log('REVISA', folders)

    const styleFolders = {
        backgroundColor:`rgba(${thisFolder.myColor.color},0.1)`,
        border: `2px solid rgba(${thisFolder.myColor.color},0.6)`,
        color: `rgba(${thisFolder.myColor.color},0.7)`}

    return (
        <div className={positionContainer}>
            
            <div 
            className={button}
            style={styleFolders}
            onClick={() => setIsClosed(!isClosed)}>
                <span className="material-symbols-outlined">folder</span>
                <span>{thisFolder.name}</span>
            </div>
        

            {!isClosed && <>
                <div className={subModalContainer}>
    
                    {
                         folders.map((elem, i) => {
                            if(elem.id == folder_id){
                                return (
                                    <div 
                                        key={elem.id}
                                        className={itemInbox}
                                        onClick={() =>{changeFolderSection(elem, elem.id, null)}}>
                                        <span 
                                        className="material-symbols-outlined">
                                            archive</span>
                                        <span>{elem.name}</span>
                                    </div>
                                )
                            }
                        })
                    }

                    {
                        folders.map((elem, i) => {
                            if(elem.id != folder_id){
                                return (<>
                                    <div 
                                        key={elem.id}
                                        className={folderDataItem}
                                        onClick={() =>{changeFolderSection(elem, elem.id, null)}}>
                                        <span 
                                        className="material-symbols-outlined"
                                        style={{color: `rgba(${elem.myColor.color},1)`}}>
                                            tag</span>
                                        <span>{elem.name}</span>
                                    </div>
                                    {
                                        elem.sectionsInFolder.map((section) => {
                                            return(<div 
                                                key={`section${section.id}`}
                                                className={sectionItem}
                                                onClick={() => {changeFolderSection(elem, elem.id, section.id)}}>
                                                <span 
                                                className="material-symbols-outlined">
                                                    subdirectory_arrow_right</span>
                                                <span>{section.section}</span>
                                            </div>)
                                        })
                                    }
                                    </>
                                )
                            }
                        })
                    }
                </div> 
            </>}
    
        </div>
    );
    
}

export {FolderModal}