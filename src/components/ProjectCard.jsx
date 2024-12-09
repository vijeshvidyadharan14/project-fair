import React, { useState } from 'react';
import { Card, Modal } from 'react-bootstrap';
import SERVER_BASE_URL from '../services/serverURL'

const ProjectCard = ({displayData}) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Card onClick={handleShow} className='btn-shadow'>
        <Card.Img width={'200px'} height={'200px'} variant="top" src={`${SERVER_BASE_URL}/uploads/${displayData?.projectImage}`}/>
        <Card.Body>
          <Card.Title className='text-center'>{displayData?.title}</Card.Title>
        </Card.Body>
      </Card>

      <Modal size='lg' centered show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-lg-6">
              <img className='img-fluid' src={`${SERVER_BASE_URL}/uploads/${displayData?.projectImage}`}/>
            </div>
            <div className="col-lg-6">
              <h3>{displayData?.title}</h3>
              <h6>Languages Used: <span>{displayData?.languages}</span></h6>
              <p style={{textAlign:'justify'}}><span className='fw-bolder'>Project Overview: </span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi molestiae ex, molestias laboriosam non magnam ipsum nisi minus officiis obcaecati iure quis atque aliquid vitae quae accusamus pariatur distinctio. Quas!</p>
            </div>
          </div>
          <div className="mt-2 float-start">
            <a href={displayData?.github} target='_blank' className="btn btn_secondary me-2"><i className="fa-brands fa-github"></i></a>
            <a href={displayData?.website} target='_blank' className="btn btn_secondary"><i className="fa-solid fa-link"></i></a>
          </div>
        </Modal.Body>
      </Modal>

    </>
  )
}

export default ProjectCard