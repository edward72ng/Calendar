import { useState, useEffect } from 'react';
import { useAuth } from './auth'


function UseFetch(url) {
  const auth = useAuth()
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    updateData();
  }, [])

  async function updateData(query) {
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
      console.log('peticion completada')
      setLoading(false)

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
        setError(true)
      }
      console.log('peticion completada')
      setLoading(false)

    }
  }

  return [data, updateData, loading, error];
}

export {UseFetch}