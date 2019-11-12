/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Modal, Button } from 'react-bootstrap';

function ConfirmModal(props) {
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
          Confirm Delete
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          Are you sure you would like to delete: <strong>{props.itemTitle}</strong>
          <br /><br /><br />
          <Button variant="primary" size="lg" block onClick={props.onHideWithDelete}>
            Yes, Delete
          </Button>
          <Button variant="secondary" size="lg" block onClick={props.onHide}>
            No, Cancel
          </Button>
        </p>
      </Modal.Body>
    </Modal>
  );
}

export default ConfirmModal;
