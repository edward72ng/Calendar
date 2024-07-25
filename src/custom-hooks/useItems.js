import { useEffect, useReducer, useState } from 'react';
import { useAuth } from '../providers/auth'
import globalState from "./SingletonGlobalState"

function useItems(url) {
  const auth = useAuth()
  
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    updateData();
  }, [])

  async function updateData() {
      try{
        const res = await fetch(url,
          { 
            method: 'GET',
            headers: {'Authorization': 'Bearer ' + auth.token,}
          })
        const data = await res.json()
        console.log("SE HARA EL SETVALUE DEL GLOBALSTATE")
        globalState.setValue(data)
        console.log("SE HARA EL SETLOADING")
        setLoading(false)
      }catch(error){
        console.log(error)
      }
  }

  return [updateData, loading];
}

export {useItems}