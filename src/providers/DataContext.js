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

    const [form, setForm] = useState(false)
	const [filter, setFilter] = useState('')
	const [taskValue, setTaskValue] = useState(defaultValue)
	
    const setDefault = () => {
        setTaskValue(defaultValue)
    }

	return <DataContext.Provider
			value = {
            {taskValue, 
            setTaskValue,
            setDefault,
            form,
            setForm,
            filter,
            setFilter}}>
		{children}
	</DataContext.Provider>
}

export {DataContext, DataProvider}