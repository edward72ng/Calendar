import React, { useContext, useEffect, useState } from "react";
import {Mosaic}  from './Mosaic'
import {DatesContext} from './datesContext'
import {useNavigate} from 'react-router-dom'
import {useAuth} from './auth'
function Meses (props){
    const {dat, month, year, getElemYear} = useContext(DatesContext)
    const [task, setTask] = useState([])
    const [noificate, setNotificate] = useState([])
    const navigate = useNavigate()
    const auth = useAuth()
    var boxes = []
    
    for(var i = 1; i <= new Date(getElemYear(month + props.cMonth), parseInt(props.getElemMonth(month + props.cMonth)) + 1, 0).getDate(); i++){
        boxes.push(i)
    }
    useEffect(()=>{
        if(auth.token){
            console.log('hay un token :D')
            console.log(auth.token)
            fetchtak();
            console.log('Montando componente')
          }else{
            console.log('No hay token :c')
            navigate('/')
          }
    },[])

    const fetchtak = ()=>{
        fetch('http://localhost:3000/api/v1/events/with-events',{
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + auth.token,
              }
        }).then(res => res.json())
            .then(data => {
                setTask(data)
            });
        fetch('http://localhost:3000/api/v1/notifications/with-notification',
        {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + auth.token,
              }
        }).then(res => res.json())
            .then(data => {
                setNotificate(data)
            }
        )
    }
        
const getParsedMonth = ()=>{
    if((props.getElemMonth(month + props.cMonth)) + 1 < 10){
        return ("0" + ((props.getElemMonth(month + props.cMonth)) + 1))
    }else{
        return (props.getElemMonth(month + props.cMonth)) + 1
    }
}
    const isEqual2 = (i, arr)=>{
        i = String(i)
        var arra = []
        var boo = false
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
                arra.push(a.id)
                arra.push(a.content)
                console.log("ES IGUAL")
                
            }
        })
        const l = (arra.length)/2
        arra.unshift(l)
        arra.unshift(boo)
        return arra  
    }
    const isEqual = (i, arr)=>{
        i = String(i)
        var arra = []
        var boo = false
        arr.map((a, ind)=>{
            var fetchtrig = a.date
            if (i < 10){
                var d =  String(getElemYear(month + props.cMonth)) +'-' +String(getParsedMonth())+'-0'+ i 
            }else{
                var d =  String(getElemYear(month + props.cMonth)) +'-' +String(getParsedMonth())+'-'+ i 
            }
            if(d == fetchtrig){
                boo = true
                arra.push(a.todo.id)
                arra.push(a.todo.content)
                
            }
        })
        const l = (arra.length)/2
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
                        notificate={isEqual2(elem, task)}
                        notification={isEqual(elem, noificate)}
                        today={dat}>
                        </Mosaic>
        )
    })}
    </>
    )
}
export {Meses}