import React, {useState} from 'react'

const DataContext = React.createContext()



function DataProvider ({children}) {
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

    const [form, setForm] = useState(false)
	const [filter, setFilter] = useState(null)
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
            setDragDefault}}>
		{children}
	</DataContext.Provider>
}

export {DataContext, DataProvider}