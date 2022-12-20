import { useState, useEffect } from 'react';
import { useAuth } from './auth'
function useFetch(url) {
  const auth = useAuth()
  const [data, setData] = useState([]);

  /*useEffect(() => {
    updateData();
  }, []);*/

  function updateData(query) {
    if(!query){
      fetch(url,
        { 
          method: 'GET',
          headers: {
            'Authorization': 'Bearer ' + auth.token,
          }
        })
          .then(response => response.json())
          .then(responseData => {
            setData(responseData);
          });
    }else if(query){
      fetch(url + query,
        { 
          method: 'GET',
          headers: {
            'Authorization': 'Bearer ' + auth.token,
          }
        })
          .then(response => response.json())
          .then(responseData => {
            setData(responseData);
          });
    }

  }

  return [data, updateData];
}

export {useFetch}