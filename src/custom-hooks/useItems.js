import { useEffect, useReducer, useState } from 'react';
import { useAuth } from '../providers/auth'

function reducer (state, action) {
    switch (action.type) {
    case 'DELETE':
        console.log('borrando del estado')
        return state.filter((elem)=>{
            return elem.id !== action.payload.id;
        });

    case 'UPDATE':
      console.log('UPDATE', action.payload.body)
        const value = state.map((elem)=>{
            if (elem.id == action.payload.id){
                return {...elem, ...action.payload.body};
            };
            return elem;
        });
        console.log('EDICION' ,value)
        return value;

    case 'EDIT-ITEM':

        let partOfItem; 
        let path = []
        function getUpdatedState (npath, body, count){
            
            if(path.length  == 0){
                return res
            }else{
                

                if(typeof path(count) === 'number' && !isNaN(variable)){
                    const idPath = path(count)
                    const element = body.filter(() => {
                        return elem.id == idPath.id
                    })

                    partOfItem = element;
                }else{
                    const textPath = path(count)
                    const propertyArr = body[textPath]

                    
                }
            }   
        }

        return [...state, action.payload.body];

    case 'CREATE':
      console.log('CREATE', action.payload.body)
        return [...state, action.payload.body];

    case 'SET':
        return action.payload.body;

    default:
        return state
    }
}

function useItems(url) {
  const auth = useAuth()
  
  const [loading, setLoading] = useState(true)
  const [state, dispatch] = useReducer(reducer, [])

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
        const resp = await res.json()
        
        dispatch({type:'SET', payload: {body: resp}})
        setLoading(false)
      }catch(error){
        console.log(error)
      }
  }

  return [state, dispatch, updateData, loading];
}

export {useItems}