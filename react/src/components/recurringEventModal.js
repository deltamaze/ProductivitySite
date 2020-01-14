/* eslint-disable react/no-unused-state */
import React from 'react';
import { connect } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import { getRepeatOptions, getDays, getMonths } from '../utilities/enums';

class RecurringEventModal extends React.Component {
  constructor(props) {
    super(props);
    this.repeatOptions = getRepeatOptions().map((item) => <option value={item}>{item}</option>);
    this.daysOfWeekCheckBox = getDays().map((day) => (
      <div>
        <input id={`dayCheckBox${day}`} type="checkbox" />
        <label htmlFor={`dayCheckBox${day}`}>{day}</label>

      </div>
    ));
    this.dayOfWeekCheckBoxGroup = <div>Choose Day of Weeks {this.daysOfWeekCheckBox}</div>;

    this.monthCheckBox = getMonths().map((month) => (
      <div>
        <input id={`monthCheckBox${month}`} type="checkbox" />
        <label htmlFor={`monthCheckBox${month}`}>{month}</label>

      </div>
    ));
    this.monthCheckBoxGroup = <div>Choose Month {this.monthCheckBox}</div>;

    this.state = {
      allDayFlag: true
    };
  }
  // on change events for each field to update store

  handleChange(event) {
    // determine what is changing
    // event title
    // description
    // frequency
    // frequencyType
    // weekPartSelection
    // endDate
    // monthPartSelection
    this.setState({
      mainTextArea: event.target.value // handle input and update textbox
    });
    const day = getDayNumber(this.props.selectedDate.date);
    const newMonth = generateMonthPayload(day,
      this.props.element,
      event.target.value,
      this.props.month.monthData);
    // package us a new month object to post back to firebase
    this.setMonthWithDebouce(newMonth, this.props.month.monthRef, this.props.auth.uid);
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
              <div>
                Repeat Every
                <select id="myList">
                  {this.repeatOptions}
                </select>
              </div>
              {/* WeekPart Selection (Weekly)(Sun,Mon,Tues,etc..) */}
              {
                this.props.recurringEvents.frequencyType === 'Weekly' ? this.dayOfWeekCheckBoxGroup : null
              }
              {/* Month Part Selection (Jan/Feb/March) */}
              {
                this.props.recurringEvents.frequencyType === 'Monthly' ? this.monthCheckBoxGroup : null
              }
              {/* MonthType Selection (Monthly on Day (day number of startdate) / Monthly
               on ([1st/2nd] datepart) on month) */}
              {
                this.props.recurringEvents.frequencyType === 'Monthly'
                  ? (
                    <div>
                      Repeat on Day Number or Nth Day of Week?
                      <select id="myList">
                        <option>Day Number</option>
                        <option>Nth Day of Week</option>
                      </select>
                    </div>
                  ) : null
              }

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
