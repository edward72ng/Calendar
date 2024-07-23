import React, { createContext, useEffect, useState } from "react";
import { useAuth } from "./auth";
import { useNavigate } from "react-router";
import { Loading } from "../components/UI-components/Loading";

const NavigateContext = createContext()


function NavigateProvider ({children}) {
    //console.log("NAVIGATE!!!!!")
    const auth = useAuth()
    const navigate = useNavigate()
    const [render, setRender] = useState(false)

    useEffect(() => {
        if (auth.checkLocal()){
            navigate('/app/')
            setRender(true)
        }
        else{
            navigate('/')
            setRender(true)
        }
    }, [])

    if(render){
        return <NavigateContext.Provider value={{}}>
        {children}
    </NavigateContext.Provider>
    }
    return(<Loading></Loading>)
        
}

export {NavigateProvider, NavigateContext}