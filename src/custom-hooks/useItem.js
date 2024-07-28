import React, { useContext, useEffect, useReducer, useState } from 'react'

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
                console.log(newElem)
                return newElem;
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

function useItem(items){
	const [state, dispatch] = useReducer(reducer, items)
		
		return [state, dispatch]
		
}

export {useItem}