import React, {useContext, useState} from 'react'
import { FormCreate } from '../components/auxiliar-components/FormCreate'
import { ItemsContext } from './ItemsContext'

const TaskModalContext = React.createContext()

const defaultValue = {
    open: false,
    actualFolder: undefined, //undifined se interpreta como "inbox"
    section: undefined,
    eventDay: undefined,
    setPreviousDataCallback: undefined, //function
    setCompleteDataCallback: undefined, //function
}

function TaskModalProvider ({children}) {
    const {dispatchInbox} = useContext(ItemsContext)
    const [form, setForm] = useState(defaultValue)

    const getDispatchTaskType = () => {
        if(form.actualFolder == undefined){
            return dispatchInbox;
        }
    };
	
	return <TaskModalContext.Provider
			value = {
            {setForm}}>
        {form.open && 
        <FormCreate 
        values={{
            thisFolder: form.actualFolder,
            isClosed: false,}}
        functions={{
            dispatchTasks: getDispatchTaskType()

        }}/>  
        } 
		{children}
	</TaskModalContext.Provider>
}

export {TaskModalContext, TaskModalProvider}