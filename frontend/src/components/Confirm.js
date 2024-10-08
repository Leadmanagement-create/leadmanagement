import React from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

const Confirmation = (props) => {
  const { handleYes, title, ...modalProps } = props

  return (
    <Modal {...modalProps} size="sm" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ textAlign: 'center' }}>
        <p>Do you really want to delete?</p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>No</Button>
        <Button onClick={handleYes}>Yes</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default Confirmation
