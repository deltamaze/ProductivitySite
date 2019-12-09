/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Modal, Button } from 'react-bootstrap';

function NewEventModal(props) {
  return (
    <Modal
      show={props.show}
      onHide={props.onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Event
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          Are you sure you would like to delete: <strong>{props.itemTitle}</strong>
          <br /><br /><br />
          <Button variant="danger" size="lg" block onClick={props.onHideWithDelete}>
            Yes, Delete
          </Button>
          <Button variant="primary" size="lg" block onClick={props.onHide}>
            No, Cancel
          </Button>
        </p>
      </Modal.Body>
    </Modal>
  );
}

export default NewEventModal;
