import React, { useEffect, useState } from "react";
import { UseFetch } from "../../custom-hooks/useFetch";

function Recomended ({question}) {
    const [recomended, setRecomended] = useState(null)

    useEffect(()=>{
        const fetchData = async () =>{
        const res = await fetch('http://127.0.0.1:8000/input/',{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({
                question: question
              }),
        })
        const data = await res.json()
        console.log(data)
        setRecomended(data)}

        fetchData()
    },[])

    return <ol className="recomended-container">
        {recomended?.etiquetas.map( (elem, i) => {
            return <li key={i}>{elem}</li>
        })   
            
        }
    </ol>
}

export {Recomended}