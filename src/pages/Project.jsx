import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { Col, Row } from 'react-bootstrap'
import ProjectCard from '../components/ProjectCard'
import { allProjectsAPI } from '../services/allAPI'

const Projects = () => {

  const [SearchKey, setSearchKey] = useState('')
  const [allProjects, setAllProjects] = useState([])
  console.log(allProjects)
  useEffect(() => {
    getAllProjects()
  },[SearchKey])

  const getAllProjects = async () => {
    const token = sessionStorage.getItem('token')
    if(token) {
      const reqHeader = {
        "Authorization" :  `Bearer ${token}`
      }
      try {
        const result = await allProjectsAPI(reqHeader, SearchKey)
        console.log(result)
        if(result.status == 200) {
          setAllProjects(result.data)
        }
        
      } catch (error) {
        console.log(error)
      }
    }
  }
  
  return (
    <>
      <Header/>
      <div className="container-fluid">
        <div className="d-flex justify-content-between align-items-center py-5">
          <h1>All Projects</h1>
          <input onChange={e => setSearchKey(e.target.value)} type="text" placeholder='Search Projects by Language' className='form-control w-25' />
        </div>
        <Row>
          {
            allProjects.length>0?
            allProjects?.map(project => (
              <Col key={project?._id} className='mb-3' sm={12} md={6} lg={4}>
              <ProjectCard displayData={project}/>
              
            </Col>
            ))
            :
            <div className="fa-bolder text-danger">project no found</div>
          }
        </Row>
      </div>
    </>
  )
}

export default Projects