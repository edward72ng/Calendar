import React, { useContext, useEffect, useState } from "react";
import { UseFetch } from "../../custom-hooks/useFetch";
import { ItemsContext } from "../../providers/ItemsContext";
import './Recommended.css'

const pythonUrl = 'http://127.0.0.1:8000/input/'
const nodeUrl = 'api/v1/recomended/get-recomended'
 
function Recomended ({question, inUse, functions}) {
    const {handleAddTag} = functions
    const {tags} = useContext(ItemsContext) 
    const [recomended, setRecomended] = useState(null)

  
    let diff = []
    if (inUse){
        diff = tags.filter(item1 => !inUse.some(item2 => item1.id === item2.id));
    }else{
        diff = tags
    }
    
    const sendTags = diff.map(user => {
        const { myColor, ...rest } = user;
        return rest;
      });


    console.log(sendTags)
    useEffect(()=>{
        const fetchData = async () =>{
        const res = await fetch(nodeUrl,{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({
                question: question,
                myTags: sendTags
              }),
        })
        const data = await res.json()
        console.log(data)
        setRecomended(data)}

        fetchData()
    },[])

    const clearTag = (id) => {
        const newRecomended = recomended.filter((elem)=>{
            return elem.id != id
        })
        setRecomended(newRecomended)
    }

    return <ol className="tags-recomended-list">
        {recomended?.map( (elem, i) => {
            return <li key={elem.id}
            onClick = {() => {clearTag(elem.id) ;handleAddTag(elem)}}
            >{elem.tag}</li>
        })   
            
        }
        
    </ol>
}

export {Recomended}