import React from "react";

const DatesContext = React.createContext()
function DatesProvider({children}){
    var date = new Date()
    var dat = date.getDate()
    var month = date.getMonth()
    var year = date.getFullYear()
    let dateString = date.toISOString().split('T')[0]
    return(<DatesContext.Provider
    value={{dateString, dat, month, year}}>
        {children}
    </DatesContext.Provider>
    )
}

export {DatesProvider, DatesContext}