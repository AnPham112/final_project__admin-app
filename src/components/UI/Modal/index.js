import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import './style.css';

const NewModal = (props) => {
  return (
    <Modal size={props.size} show={props.show} onHide={props.handleClose} animation={false}>
      <Modal.Header closeButton className={props.modalHeaderColor}>
        <Modal.Title>{props.modalTitle}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{props.children}</Modal.Body>
      <Modal.Footer>
        {props.buttons?.map((btn, index) =>
          <Button key={index} className={btn.btnColor} onClick={btn.onClick}>
            {btn.label}
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  )
}

export default NewModal;