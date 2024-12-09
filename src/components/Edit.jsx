import React, {useState} from 'react'
import { Modal, Button } from 'react-bootstrap'
import uploadProjectImg from '../assets/uploadImg.png'

const Edit = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
                <input type="file" style={{display:'none'}}/>
                <img height={'200px'} src={uploadProjectImg} alt="upload" className="img-fluid"/>
              </label>
              <div className="text-warning fw-bolder">*Upload only .jpg, .png, .jpeg</div>
            </div>
            <div className="col-lg-8">
              <div className="mb-2">
                <input type="text" className="form-control" placeholder="Project title"/>
              </div>
              <div className="mb-2">
                <input type="text" className="form-control" placeholder="Project languages"/>
              </div>
              <div className="mb-2">
                <input type="text" className="form-control" placeholder="Project overview"/>
              </div>
              <div className="mb-2">
                <input type="text" className="form-control" placeholder="Project GitHub link"/>
              </div>
              <div className="mb-2">
                <input type="text" className="form-control" placeholder="Project website link"/>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary">Save Changes</Button>
        </Modal.Footer>
      </Modal>

    </>
  )
}

export default Edit