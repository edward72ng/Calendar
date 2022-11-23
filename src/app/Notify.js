import React, { useEffect, useState } from "react";
import {useAuth} from './auth'
import {OneTodo} from './OneTodo'
function Notify (){
    const auth = useAuth()

    const [items, setItems] = useState([])
    useEffect(()=>{
        fetch('/api/v1/dnotify/all-first-todo',{
            method: 'GET',
            headers: {
              'Authorization': 'Bearer ' + auth.token,
            },
          })
          .then(res => res.json())
          .then(data => {
            setItems(data)
            console.log('cambiando estado -> todos')
          },[]);

    }) 

    return(
        <div className="todos-container">
                  { items.map(item => { 
                    
                    return (
<OneTodo details={item.date}></OneTodo>
          
                    )})}  
                    </div>
    )
}

export {Notify}