import React, { useContext, useEffect, useReducer, useState } from 'react'
import { DataContext } from '../providers/DataContext';
import { ItemsContext } from '../providers/ItemsContext';

function reducer (state, action) {
    switch (action.type) {
    case 'DELETE':
        return state.filter((elem)=>{
            return elem.id !== action.payload.id;
        });

    case 'UPDATE':
        console.log('ejecutando update', action.payload.body)
        return state.map((elem)=>{
            if (elem.id == action.payload.id){
                const newElem = {
                    ...elem,
                    ...action.payload.body
                }
                console.log(newElem)
                return newElem;
            };
            return elem;
        });

    case 'CREATE':
        return [...state, action.payload.body];

    case 'SET':
        return action.payload.body;

    case 'SETID':
        const resp = state.map((elem)=>{
            if (elem.content == action.payload.content){
                return {...elem, id: action.payload.id};
            };
            return elem;
        });

        console.log(resp)
        return resp

    default:
        return state
    }
}

function useUpdate(initialState){
        const {filter} = useContext(DataContext)
        const {section, all} = useContext(ItemsContext)
		const [state, dispatch] = useReducer(reducer, initialState? initialState : section(filter))
		
    useEffect(()=>{
        if(!initialState){
            dispatch({type: 'SET', payload: {body:section(filter)}})
        }
    }, [filter])

  

		const update = async (url) => {
				const res = await fetch(url,{
						method: 'GET',
						//headers: {auth}
				})
				const data = await res.json()
                console.log('fetch terminado', url)
				dispatch({type: 'SET', payload: {body: data}})
		}
		
		return [state, dispatch, update]
		
}

export {useUpdate}