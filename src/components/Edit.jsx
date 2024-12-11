import React, {useState, useEffect, useContext} from 'react'
import { Modal, Button } from 'react-bootstrap'
import uploadProjectImg from '../assets/uploadImg.png'
import SERVER_BASE_URL from '../services/serverURL'
import { editProjectContext } from '../context/ContextShare'
import { updateProjectAPI } from '../services/allAPI'

const Edit = ({projects}) => {

  const {editProjectsResponse,setEditProjectResponse} = useContext(editProjectContext)
  const [preview,setPreview] = useState("")
  const [uploadFileStatus,setUploadFileStatus] = useState(false)
  const [projectDetails,setProjectDetails] = useState ({
    id:projects?._id, title:projects?.title, languages:projects?.languages, overview:projects?.overview, gitHub:projects?.github, website:projects?.website, projectImage:""
  })
  console.log(projectDetails);
  const [show, setShow] = useState(false);

  useEffect(()=>{
    if(projectDetails.projectImage.type=="image/png" || projectDetails.projectImage.type=="image/jpg" || projectDetails.projectImage.type=="image/jpeg"){
      setUploadFileStatus(true)
      setPreview(URL.createObjectURL(projectDetails.projectImage))
    }else{
      setUploadFileStatus(false)
      setProjectDetails({...projectDetails,projectImage:""})
    }
   },[projectDetails.projectImage])

  const handleClose = () => {
    setShow(false);
    setProjectDetails({
       id:projects?._id, title:projects?.title, languages:projects?.languages, overview:projects?.overview, gitHub:projects?.github, website:projects?.website, projectImage:""
    })
  }
    
  const handleShow = () => {
    setShow(true);
    setProjectDetails({
       id:projects?._id, title:projects?.title, languages:projects?.languages, overview:projects?.overview, gitHub:projects?.github, website:projects?.website, projectImage:""
    })
  }

  const handleUpdateProject = async () => {
    const {id,title,languages,overview,gitHub,website,projectImage} = projectDetails
    if(title && languages && overview && gitHub && website){
      const reqBody = new FormData()
      reqBody.append('title',title)
      reqBody.append('languages',languages)
      reqBody.append('overview',overview)
      reqBody.append('github',gitHub)
      reqBody.append('website',website)
      preview? reqBody.append('projectImage',projectImage) : reqBody.append('projectImage',projects?.projectImage)
      
      const token = sessionStorage.getItem("token")
      if(token) {
        const reqHeader = {
          "Content-Type":"multipart/form-data",
          "Authorization":`Bearer ${token}`
        }
        //make api call
        try {
          const result = await updateProjectAPI(id,reqBody,reqHeader)
          if(result.status==200) {
            alert("Updated Successfully")
            handleClose()
            setEditProjectResponse(result)
          }
        } catch(err) {
          console.log(err);
        }
      }
    }else{
      alert("Please fill all the fields")
    }
  }

  return (
    <>
      <button onClick={handleShow} className="btn"><i className="fa-solid fa-edit"></i></button>

      <Modal 
        size='lg'
        centered
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
      <Modal.Header closeButton>
      <Modal.Title>Edit Project</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="row align-items-center">
          <div className="col-lg-4">
            <label>
              <input onChange={e => setProjectDetails({...projectDetails,projectImage:e.target.files[0]})} type="file" style={{display:'none'}}/>
              <img className='img-fluid' height={'200px'} src={preview?preview:`${SERVER_BASE_URL}/uploads/${projects?.projectImage}`} alt='' />
            </label>
            {
              !uploadFileStatus &&
              <div className="text-warning fw-bolder">*Upload only .jpg, .png, .jpeg</div>
            }
          </div>
          <div className="col-lg-8">
            <div className="mb-2">
              <input value={projectDetails.title} onChange={e => setProjectDetails({...projectDetails,title:e.target.value})} type="text" className="form-control" placeholder="Project title"/>
            </div>
            <div className="mb-2">
              <input value={projectDetails.languages} onChange={e => setProjectDetails({...projectDetails,languages:e.target.value})} type="text" className="form-control" placeholder="Project languages"/>
            </div>
            <div className="mb-2">
              <input value={projectDetails.overview} onChange={e => setProjectDetails({...projectDetails,overview:e.target.value})} type="text" className="form-control" placeholder="Project overview"/>
            </div>
            <div className="mb-2">
              <input value={projectDetails.gitHub} onChange={e => setProjectDetails({...projectDetails,gitHub:e.target.value})} type="text" className="form-control" placeholder="Project GitHub link"/>
            </div>
            <div className="mb-2">
              <input value={projectDetails.website} onChange={e => setProjectDetails({...projectDetails,website:e.target.value})} type="text" className="form-control" placeholder="Project website link"/>
            </div>
          </div>
        </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleUpdateProject} variant="primary">Save Changes</Button>
        </Modal.Footer>
      </Modal>

    </>
  )
}

export default Edit