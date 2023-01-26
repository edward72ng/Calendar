import { useState, useEffect } from 'react';
import { useAuth } from '../providers/auth'


function useFetchData() {
  const auth = useAuth()

  async function loadData(url, method, body) {
        if (!body){
            const res = await fetch(url,
                { 
                  method: method,
                  headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                  'Authorization': 'Bearer ' + auth.token,
                  }
                })
              const response = await res.json()
              return response
        }else{
        const res = await fetch(url,
          { 
            method: method,
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + auth.token,
            },
            body: body 
          })
        const response = await res.json()
        return new Promise((resolve, reject) => {
            resolve(response)
            reject('no funciono :(')
        })
    }
  }

  return {loadData};
}

export {useFetchData}