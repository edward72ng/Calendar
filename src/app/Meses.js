import React, { useContext, useEffect, useState } from "react";
import {Mosaic}  from './Mosaic'
import {DatesContext} from './datesContext'
import {useNavigate} from 'react-router-dom'
import {useAuth} from './auth'
function Meses (props){
    const [task, setTask] = useState([])
    const [noificate, setNotificate] = useState([])
    const navigate = useNavigate()
    const auth = useAuth()
    var date = new Date()
    var month = date.getMonth()
    var year = date.getFullYear()
    var dateNext = new Date(year, month+1, 0)
    var qMonth = dateNext.getDate()
    var boxes = []
    const {dat} = useContext(DatesContext)
    for(var i = 1; i <= qMonth; i++){
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
        

    const isEqual2 = (i, arr)=>{
        i = String(i)
        var arra = []
        var boo = false
        arr.map((a, ind)=>{
            var fetchtrig = a.evento.event
            if (i < 10){
                var d =  String(year) +'-' +String(month + 1)+'-0'+ i 
            }else{
                var d =  String(year) +'-' +String(month + 1)+'-'+ i 
            }
            console.log(d)
            if(d == fetchtrig){
                boo = true
                arra.push(a.id)
                arra.push(a.content)
                
            }
        })
        arra.unshift(boo)
        
        console.log(arra)
        return arra  
    }
    const isEqual = (i, arr)=>{
        i = String(i)
        var arra = []
        var boo = false
        arr.map((a, ind)=>{
            var fetchtrig = a.date
            if (i < 10){
                var d =  String(year) +'-' +String(month + 1)+'-0'+ i 
            }else{
                var d =  String(year) +'-' +String(month + 1)+'-'+ i 
            }
            console.log(d)
            if(d == fetchtrig){
                boo = true
                arra.push(a.todo.id)
                arra.push(a.todo.content)
                
            }
        })
        const l = (arra.length)/2
        arra.unshift(l)
        arra.unshift(boo)
        console.log(arra)
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