import React, { useState } from "react";

const DatesContext = React.createContext()
function DatesProvider({children}){
    const [filter, setFilter] = useState('')
    const [afterBefore, setAfterBefore] = useState(0)
    const [inputEnabled, setInputEnabled] = useState(false)
    const [values, setValues] = useState({
        id: null,
        content: '',
        details: '',
        event: '',
        notifications: [],
        })
    var date = new Date()
    var dat = date.getDate()
    var month = date.getMonth()
    var year = date.getFullYear()
    let dateString = date.toISOString().split('T')[0]
    const getElemMonth = (month)=>{
        if(month > 11){
            return ((month -1) % 11)
        }else if(month < 0){
            return month + 12
        }else{
            return month
        }
    }
    const getElemYear = (sumMonth)=>{
        if(sumMonth > 11){
            return year + 1
        }else if(sumMonth < 0){
            return year - 1
        }else{
            return year
        }
    }
    let quantityDaysMonth = new Date(year, parseInt(getElemMonth(month + afterBefore)) + 1, 0).getDate()
    return(<DatesContext.Provider
    value={
        {dateString,
        dat,
        month,
        year,
        getElemMonth,
        getElemYear,
        quantityDaysMonth,
        afterBefore,
        setAfterBefore,
        inputEnabled,
        setInputEnabled,
        values,
        setValues,
        filter,
        setFilter
        }}>
        {children}
    </DatesContext.Provider>   
    )
}

export {DatesProvider, DatesContext}