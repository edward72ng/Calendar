import React, { useContext, useEffect, useReducer, useState } from 'react'
import { DataContext } from '../providers/DataContext';
import { ItemsContext } from '../providers/ItemsContext';
import {getInbox} from '../providers/getFunctions'

function reducer (state, action) {
    switch (action.type) {
    case 'DELETE':
        return state.filter((elem)=>{
            return elem.id !== action.payload.id;
        });

    case 'UPDATE':
        return state.map((elem)=>{
            if (elem.id == action.payload.id){
                const newElem = {
                    ...elem,
                    ...action.payload.body
                }
                
                return newElem;
            };
            return elem;
        });

    case 'CREATE':
        const dat = [...state, action.payload.body]
        console.log(dat)
        return dat
        //return [...state, action.payload.body];

    case 'SET':
        return action.payload.body;

    default:
        return state
    }
}



function useInbox(){
        const {folder_id} = useContext(DataContext)
        const itemsInInbox = getInbox(folder_id)
        
    console.log('USando use inbox', itemsInInbox)
		const [state, dispatch] = useReducer(reducer, itemsInInbox)
		
		return [state, dispatch]
		
}

export {useInbox}