import React, { useContext, useEffect} from "react";
import {Mosaic}  from './Mosaic'
import {DatesContext} from './datesContext'
import {useNavigate} from 'react-router-dom'
import {useAuth} from '../providers/auth'
import {UseFetch} from './useFetch'
function MosaicsContainer (props){
    const {dat, month, getElemYear, filter} = useContext(DatesContext)
    const navigate = useNavigate()
    const auth = useAuth()
    const [events,updateEvents] = UseFetch('http://localhost:3000/api/v1/events/with-events')
    const [notifications, updateNotifications] = UseFetch('http://localhost:3000/api/v1/notifications/with-notification')
    let boxes = []
    for(let i = 1; i <= new Date(getElemYear(month + props.cMonth), parseInt(props.getElemMonth(month + props.cMonth)) + 1, 0).getDate(); i++){
        boxes.push(i)
    }
    useEffect(()=>{
        if(!auth.token){
            navigate('/')
          }else{
            updateEvents(filter);
            updateNotifications(filter);  
          }
    },[filter])
        
const getParsedMonth = ()=>{
    if((props.getElemMonth(month + props.cMonth)) + 1 < 10){
        return ("0" + ((props.getElemMonth(month + props.cMonth)) + 1))
    }else{
        return (props.getElemMonth(month + props.cMonth)) + 1
    }
}
    const isEqual2 = (i, arr)=>{
        i = String(i)
        let arra = []
        let boo = false
        if (i < 10){
            var d =  String(getElemYear(month + props.cMonth)) +'-' +String(getParsedMonth())+'-0'+ i 
        }else{
            var d =  String(getElemYear(month + props.cMonth)) +'-' +String(getParsedMonth())+'-'+ i 
        }
        console.log("dia actual"+d)
        arr.map((a, ind)=>{
            var fetchtrig = a.evento.event
           
            console.log("compararndo"+fetchtrig)
            if(d == fetchtrig){
                boo = true
                arra.push({
                    id: a.id,
                    content: a.content,
                    details: a.deatails
                })
            }
        })
        const l = (arra.length)
        arra.unshift(l)
        arra.unshift(boo)
        return arra  
    }
    const isEqual = (i, arr)=>{
        i = String(i)
        let arra = []
        let boo = false
        arr.map((a, ind)=>{
            var fetchtrig = a.date
            if (i < 10){
                var d =  String(getElemYear(month + props.cMonth)) +'-' +String(getParsedMonth())+'-0'+ i 
            }else{
                var d =  String(getElemYear(month + props.cMonth)) +'-' +String(getParsedMonth())+'-'+ i 
            }
            if(d == fetchtrig){
                boo = true
                arra.push({
                    id: a.todo.id,
                    content: a.todo.content,
                    details: a.todo.deatails
                })
            }
        })
        const l = (arra.length)
        arra.unshift(l)
        arra.unshift(boo)
        return arra  
    }
    return (
    <>
    {boxes.map((elem)=>{
        return(
            <Mosaic key={elem}
                        day={elem} 
                        first={String(props.first + 1)} 
                        notificate={isEqual2(elem, events)}
                        notification={isEqual(elem, notifications)}
                        today={dat}>
                        </Mosaic>
        )
    })}
    </>
    )
}
export {MosaicsContainer}