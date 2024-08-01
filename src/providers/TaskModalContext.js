import React, {useContext, useState} from 'react'
import { FormCreate } from '../components/auxiliar-components/FormCreate'
import { ItemsContext } from './ItemsContext'
import { ItemView } from '../components/auxiliar-components/ItemView'

const TaskModalContext = React.createContext()

const defaultValue = {
    open: false,
    openEdit: false,
    actualFolder: undefined, //el filter toma como valor inicial el inboxId
    actualSection: undefined,
    actualTask: undefined,
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
            actualSection: form.actualSection,
            isClosed: false,}}
        functions={{
            dispatchTasks: getDispatchTaskType()

        }}/>  
        } 

        {form.openEdit &&
            <ItemView 
            values={{
                actualFolder: form.actualFolder,
                actualSection: form.actualSection,
                actualTask: form.actualTask,
                isClosed: false,}}
            functions={{
                dispatchTasks: getDispatchTaskType()
            }}/>
        }
        
		{children}
	</TaskModalContext.Provider>
}

export {TaskModalContext, TaskModalProvider}