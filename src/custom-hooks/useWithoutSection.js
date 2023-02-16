import React, { useContext, useEffect, useReducer } from 'react'
import { DatesContext } from '../app/datesContext';
import { DataContext } from '../providers/DataContext';
import { ItemsContext } from '../providers/ItemsContext';

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
        return action.payload.body;

    default:
        return state
    }
}



function useWithoutSection(initialState){
        const {filter} = useContext(DatesContext)
        const {task} = useContext(ItemsContext)
		const [state, dispatch] = useReducer(reducer, initialState? initialState : task(filter))
	

    useEffect(()=>{
        if(!initialState){
            dispatch({type: 'SET', payload: {body:task(filter)}})
        }
    }, [filter])

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

export {useWithoutSection}