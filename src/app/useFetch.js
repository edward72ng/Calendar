import { useState, useEffect } from 'react';
import { useAuth } from '../providers/auth'


function UseFetch(url) {
  const auth = useAuth()
  const [data, setData] = useState([]);

  useEffect(() => {
    updateData();
  }, [])

  async function updateData(query) {
    console.log('ejecutando update data')
    if(!query){
      try{
        const res = await fetch(url,
          { 
            method: 'GET',
            headers: {
              'Authorization': 'Bearer ' + auth.token,
            }
          })
        const resp = await res.json()
        setData(resp)
      }catch(error){
        console.log(error)
      }

    }else if(query){
      try{
        const res = await fetch(url + query,
          { 
            method: 'GET',
            headers: {
              'Authorization': 'Bearer ' + auth.token,
            }
          })
        const resp = await res.json()
        setData(resp)
      }catch(error){
        console.log(error)
      }
    }
  }

  return [data, updateData, setData];
}

export {UseFetch}