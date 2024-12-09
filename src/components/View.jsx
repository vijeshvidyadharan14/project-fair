import React, { useEffect, useState, useContext } from 'react'
import Add from './Add'
import Edit from './Edit'
import { userProjectsAPI } from '../services/allAPI'
import { addProjectContext } from '../context/ContextShare'



const View = () => {
  const {addProjectsResponse, setAddProjectResponse} = useContext(addProjectContext)
//steps to display user projects
  // 1. create state to store user projects
  const [userProjects, setUserProjects] = useState([])
  console.log(userProjects)

  useEffect(() => {
    getUserProjects()
  },[addProjectsResponse])

  // 2. create function to get user projects from database
  const getUserProjects = async () => {
    const token = sessionStorage.getItem("token")
    if(token){
      const reqHeader = {
        "Authorization" : `Bearer ${token}`
      }
      try{
        const result = await userProjectsAPI(reqHeader)
        console.log(result);
        if(result.status==200){
          setUserProjects(result.data)
        }
      }catch(err){
        console.log(err);
      }
    }
  }

  return (
    <>
      <div className="d-flex justify-content-between mt-3">
        <h2 className="text-warning">All Projects</h2>
        <div> <Add/> </div>
      </div>
      <div className="mt-2">
        {
        userProjects.length>0?
        userProjects?.map(projects =>(
         <div key={projects?._id} className="border rounded p-2 d-flex justify-content-between mb-3">
           <h3>{projects?.title}</h3>
           <div className="d-flex align-items-center">
             <div> <Edit/> </div>
             <button className="btn"><a href={projects?.github} target='_blank'><i className="fa-brands fa-github"></i></a></button>
             <button className="btn"><i className="fa-solid fa-trash text-danger"></i></button>
           </div>
         </div>
          ))
          : 
         <div className="fw-bolder fs-3">No Projects</div>
        }
      </div>
    </>
  )
}

export default View