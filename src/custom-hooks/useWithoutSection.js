import React, { useContext, useEffect, useReducer } from 'react'
import { DataContext } from '../providers/DataContext';
import { ItemsContext } from '../providers/ItemsContext';

function reducer (state, action) {
    switch (action.type) {
    case 'DELETE':
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



function useWithoutSection(){
    const {filter} = useContext(DataContext)
    const {all, task, without, updateWithout} = useContext(ItemsContext)
	const [state, dispatch] = useReducer(reducer, [])

    useEffect(()=>{
        dispatch({type: 'SET', payload: {body:task(filter)}})
    }, [filter, without, all])

		const update = async () => {
            updateWithout()
		}
		
		return [state, dispatch, update]
		
}

export {useWithoutSection}