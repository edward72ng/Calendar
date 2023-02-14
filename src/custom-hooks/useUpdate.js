import React, { useReducer } from 'react'

function reducer (state, action) {
    switch (action.type) {
    case 'DELETE':
        console.log('borrando del estado')
        return state.filter((elem)=>{
            return elem.id !== action.payload.id;
        });

    case 'UPDATE':
        return state.map((elem)=>{
            if (elem.id == action.payload.id){
                return {...elem, ...action.payload.body};
            };
            return elem;
        });

    case 'CREATE':
        return [...state, action.payload.body];

    case 'SET':
        console.log('colando set')
        return action.payload.body;

    default:
        return state
    }
}

function useUpdate(initialState){
		const [state, dispatch] = useReducer(reducer, initialState)
		
		const update = async (url) => {
				const res = await fetch(url,{
						method: 'GET',
						//headers: {auth}
				})
				const data = await res.json()
				dispatch({type: 'SET', payload: {body: data}})
		}
		
		return [state, dispatch, update]
		
}

export {useUpdate}