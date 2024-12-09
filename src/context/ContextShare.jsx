import React, { createContext, useState } from "react"
export const addProjectContext = createContext()

const ContextShare = ({children}) => {
    const [ addProjectsResponse, setAddProjectResponse ] = useState("")

    return(
        <addProjectContext.Provider value ={{addProjectsResponse, setAddProjectResponse}}>
            {children}
        </addProjectContext.Provider>
    )
}

export default ContextShare