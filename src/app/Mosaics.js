import { string } from "joi";
import React, { useEffect, useState } from "react";
import { set } from "rsuite/esm/utils/dateUtils";
import {Mosaic}  from './Mosaic'

function Mosaics (props){
    const [task, setTask] = useState([])
    var date = new Date()
    //var day = date.getDay()
    var dat = date.getDate()
    var month = date.getMonth()
    var year = date.getFullYear()
    //var dateString = String(dat) + String(month)+ String(year)
    var dateNext = new Date(year, month+1, 0)
    var qMonth = dateNext.getDate()
    var boxes = []
    for(var i = 1; i <= qMonth; i++){
        boxes.push(i)
    }
    //const sty =  String(props.first)
    useEffect(()=>{
        fetchtak()
    },[])

    const fetchtak = ()=>{
        fetch('http://localhost:3000/api/v1/dnotify/all-first-todo',{
            method: 'GET',
        }).then(res => res.json())
            .then(data => {
                setTask(data)
                /*for(let i = 1; i <= qMonth; i++){
                    boxes.push(<Mosaic 
                        day={i} 
                        first={props.first} 
                        notificate={isEqual2(i, data)}>
                        </Mosaic>)
                }
                console.log(boxes)*/
            });
    }
        

    const isEqual2 = (i, arr)=>{
        i = String(i)
        console.log(i)
        var boo = false
        arr.map((a)=>{
            var fetchtrig = a.todonotify[0].date
            console.log(fetchtrig)
            fetchtrig =  String(fetchtrig).replace(String(month)+ String(year),"")
            console.log(fetchtrig + 'tring')
            if(i == fetchtrig){
                boo = true
                //var viewer = a.content
            }
        })
        console.log(boo)
        return boo
    }

    return (
    <>
    {boxes.map((elem)=>{
        return(
            <Mosaic key={elem}
                        day={elem} 
                        first={String(props.first + 1)} 
                        notificate={isEqual2(elem, task)}
                        today={dat}>
                        </Mosaic>
        )
    })}
    </>
    )
}
export {Mosaics}