/* eslint-disable react/no-unused-state */
import React from 'react';
import { connect } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
// import { getMonthName } from '../utilities/dateHelper';

class RecurringEventModal extends React.Component {
  // on change events for each field to update store

  componentDidUpdate() {

  }


  render() {
    if (this.props.eventId !== '0') {
      this.setLocalState();
    }
    return (
      <Modal
        show={this.props.show}
        onHide={this.props.onHide}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {this.props.eventId === '0' ? 'New ' : 'Update '} Recurring Event
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <>
            <p>
              Are you sure you would like to delete: <strong>{this.props.itemTitle}</strong>
              <br /><br /><br />
              <Button variant="danger" size="lg" block onClic k={this.onHideWithDelete}>
                Yes, Delete
              </Button>
              <Button variant="primary" size="lg" block onClick={this.onHide}>
                No, Cancel
              </Button>
            </p>
          </>
        </Modal.Body>
      </Modal>
    );
  }
}

export default connect(
  (state) => ({ auth: state.auth }),
  ({
  })
)(RecurringEventModal);

// );
