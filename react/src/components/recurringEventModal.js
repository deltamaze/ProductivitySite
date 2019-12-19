/* eslint-disable react/no-unused-state */
import React from 'react';
import { connect } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import { getMonthName } from '../utilities/dateHelper';

class RecurringEventModal extends React.Component {
  constructor(props) {
    super(props);
    // if event id != 0, pull event data from state
    // if event id != 0, load up default values

    this.state = {
      hasLoaded: false,
      frequency: 1,
      frequencyType: 'day',
      weekPartSelection: [],
      specifyTime: false,
      // startDate: Date.now(),
      endDate: undefined,
      targetRecurEventTitle: '',
      // yearlyTargetMonth: getMonthName(new Date.now()),
      specialStartCriteria: undefined
    };
  }

  componentDidMount() {
    // this.props.fetchAuth();
  }

  componentDidUpdate() {
    // this.props.fetchAuth();

  }

  initializeState() {

  }

  render() {
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
            {(!this.state.hasLoaded) ? (
              <div>Loading...</div>
            ) : (
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

            )}
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
