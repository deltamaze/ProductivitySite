/* eslint-disable react/no-unused-state */
import React from 'react';
import { connect } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
// import { getMonthName } from '../utilities/dateHelper';

class RecurringEventModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allDayFlag: true
    };
  }
  // on change events for each field to update store

  componentDidUpdate() {

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
            <p>
              {/* Event Title */}
              <input
                className="mainTexBoxInput"
                type="text"
                placeholder="Event Title"
                value={this.props.recurringEvents.title}
                onChange={this.handleTitleChange}
              />
              {/* Description */}
              <textarea
                className="modalTextArea"
                placeholder="Description"
                value={this.props.recurringEvents.description}
                onChange={this.handleChange}
              />
              {/* Start Date Time */}
              StartTime
              <div>
                <input
                  type="date"
                  value="2018-07-22"
                />
                <input
                  type="time"
                  value="13:30"
                />
                <label htmlFor="allDay">
                  <input
                    type="checkbox"
                    id="allDay"
                    name="allDay"
                    checked
                  />
                  All Day Event
                </label>
              </div>
              {/* Repeat Every [Frequency Nuber][Frequency Type(Day,Week,Month,Year)] */}
              {/* WeekPart Selection (Weekly)(Sun,Mon,Tues,etc..) */}
              {/* Month Part Selection (Jan/Feb/March) */}
              {/* MonthType Selection (Monthly on Day (day number of startdate) / Monthly
               on ([1st/2nd] datepart) on month) */}

              {/* End Time ? Never RadioButton, or DateTime field.
               If Never RadioButton, clear out store.EndDate to undefined, and disable field */}


              <Button variant="success" size="lg" block onClick={this.props.onHideWithUpsert}>
                Save
              </Button>
              <Button variant="danger" size="lg" block onClick={this.props.onHide}>
                Cancel
              </Button>
            </p>
          </>
        </Modal.Body>
      </Modal>
    );
  }
}

export default connect(
  (state) => ({ auth: state.auth, recurringEvents: state.recurringEvents }),
  ({
  })
)(RecurringEventModal);

// );
