import React, { createContext, useState } from "react"
export const addProjectContext = createContext()
export const editProjectContext = createContext()

const ContextShare = ({children}) => {
    const [ addProjectsResponse, setAddProjectResponse ] = useState("")
    const [ editProjectsResponse, setEditAddProjectResponse ] = useState("")



    return(
        <addProjectContext.Provider value ={{addProjectsResponse, setAddProjectResponse}}>
            <editProjectContext.Provider value = {{editProjectsResponse,setEditAddProjectResponse}}>
            {children}
            </editProjectContext.Provider>
        </addProjectContext.Provider>
    )
}

export default ContextShare