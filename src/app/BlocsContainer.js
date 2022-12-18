import React, { useState } from "react";
import {useAuth} from "./auth"

function Content({render}) {
    //'/api/v1/inbox/your-todos'
    const [blocs, setBlocs] = useState([])
    const auth = useAuth()
    useEffect(()=>{
        if(!auth.token){
          navigate('/')
        }else if (typeof render == 'string'){
          fetch(render,{
            method: 'GET',
            headers: {
              'Authorization': 'Bearer ' + auth.token,
            },
          })
          .then(res => res.json())
          .then(data => {
            setBlocs(data)
          });
        }else if(typeof render == 'object'){
            setBlocs(render)
        }
      },[])

      return(
        <>
            {blocs.map(()=>{

            })}
        </>
      )
}

export {Content}