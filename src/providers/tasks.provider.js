import React, { useContext } from "react";
import {DatesContext} from '../app/datesContext'

const TasksContext = React.createContext()

function TasksProvider({children}){
    
    const {values} = useContext(DatesContext)


    const deleteTask = async(id, callback)=>{
        useFetchData('/api/v1/inbox/your-todos/'+ id,'DELETE')
       callback()
    } 

    const addOrEditTask = (values) => {
       /* if (values.id){

          fetch('/api/v1/inbox/your-todos/'+id, {
            method: 'PUT',
            body: JSON.stringify({
              content: contentTodo,
              deatails: detailsTodo,
              event: date,
              notifications: notificationsSend,
            }),
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + auth.token,
            }
          }).then(()=> {
            setId(null)
            setContentTodo('')
            setDetailsTodo('')
            setArrNotifications([])
            setDateEvent('')
            setChangeDate('')
            setChangeTime('')
            })
        }
        if (id == null){
          fetch('/api/v1/inbox/your-todos', {
            method: 'POST',
            body: JSON.stringify({
              content: contentTodo,
              deatails: detailsTodo,
              event: date,
              notifications: notificationsSend,
            }
            ),
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + auth.token,
            }
          }).then(()=> {
            setId(null)
            setContentTodo('')
            setDetailsTodo('')
            setArrNotifications([])
            setDateEvent('')
            setChangeDate('')
            setChangeTime('')
            })
        }  */
    }

    return <TasksContext.Provider value={deleteTask}>
        {children}
    </TasksContext.Provider>
}

export {TasksProvider}