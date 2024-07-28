import React, {useContext, useState} from 'react'
import { FormCreate } from '../components/auxiliar-components/FormCreate'
import { ItemsContext } from './ItemsContext'

const TaskModalContext = React.createContext()

const defaultValue = {
    open: false,
    actualFolder: undefined, //el filter toma como valor inicial el inboxId
    section: undefined,
    eventDay: undefined,
    setPreviousDataCallback: undefined, //function
    setCompleteDataCallback: undefined, //function
}

function TaskModalProvider ({children}) {
    const {dispatchInbox} = useContext(ItemsContext)
    const [form, setForm] = useState(defaultValue)

    const getDispatchTaskType = () => {
            return dispatchInbox;
    };
	
    console.log(form.actualFolder)

	return <TaskModalContext.Provider
			value = {
            {setForm}}>

        {form.open && 
        <FormCreate 
        values={{
            actualFolder: form.actualFolder,
            isClosed: false,}}
        functions={{
            dispatchTasks: getDispatchTaskType()

        }}/>  
        } 
        
		{children}
	</TaskModalContext.Provider>
}

export {TaskModalContext, TaskModalProvider}