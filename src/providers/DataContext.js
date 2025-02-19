import React, {useContext, useState} from 'react'
import { ItemsContext } from './ItemsContext'
import globalState from '../custom-hooks/SingletonGlobalState'

const DataContext = React.createContext()



function DataProvider ({children}) {
const {register} = useContext(ItemsContext)
console.log('TU REGISTRO EN DATA CONTEXT', register)
const {folder_id} = register[0]


    const defaultValue = {
        id: null,
        content: '',
        details: '',
        event: '',
        notifications: [],
        folderid: null,
        assignedto: null
    }

    const initialDragInfo = {
        item: null,
        body: null,
        sectionOrigin: null,
        sectionDestination: null
    }

    const getWorkerValue = () => {
        if ("serviceWorker" in navigator) {
            return (true);
        }else{
            return (false);
        }
    }

    const getPermissionValue = (worker) => {
        if(Notification.permission == 'granted' 
            && "Notification" in window 
            && worker == true){
            return (true);
        }else{//permission == 'denied' || 'default' 
            return (false);
        }
    }

    const worker = getWorkerValue();

    const [permission, setPermission] = useState(getPermissionValue(worker))
    const [form, setForm] = useState(false)
	const [filter, setFilter] = useState(folder_id)
	const [taskValue, setTaskValue] = useState(defaultValue)
    const [dragInfo, setDragInfo] = useState(initialDragInfo)

    const [activeMenu, setActiveMenu] = useState(false)
	
    const setDefault = () => {
        setTaskValue(defaultValue)
    }

    const setDragDefault = () => {
        setDragInfo(initialDragInfo)
    }

    function getToday() {
        const today = new Date()
        const year = today.getFullYear()
        const month = today.getMonth() + 1
        const day = today.getDate()
      
        const monthFormated = month < 10 ? `0${month}` : month
        const dayFormated = day < 10 ? `0${day}` : day
      
        return `${year}-${monthFormated}-${dayFormated}`;
      }

	return <DataContext.Provider
			value = {
            {taskValue, 
            setTaskValue,
            setDefault,
            form,
            setForm,
            filter,
            setFilter,
            activeMenu,
            setActiveMenu,
            getToday,
            
            dragInfo,
            setDragInfo,
            setDragDefault,
            worker,
            permission,
            setPermission,
            folder_id
            }}>
		{children}
	</DataContext.Provider>
}

export {DataContext, DataProvider}