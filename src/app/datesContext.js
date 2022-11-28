import React from "react";

const DatesContext = React.createContext()
    /*var day = date.getDay()
    var dat = date.getDate()
    var month = date.getMonth()
    var year = date.getFullYear()*/
function DatesProvider({children}){
    var date = new Date()
    var dat = date.getDate()
    var month = date.getMonth()
    var year = date.getFullYear()
    var dateString = String(dat) + String(month)+ String(year)

    return(<DatesContext.Provider
    value={{dateString}}>
        {children}
    </DatesContext.Provider>
    )
}

export {DatesProvider, DatesContext}