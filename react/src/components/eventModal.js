/* eslint-disable react/no-unused-state */
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Modal, Button } from 'react-bootstrap';
import { getRepeatOptions, getDays, getMonths } from '../utilities/enums';
import { getHtmlFormattedDate, getLocalTimezoneOffsetInMS } from '../utilities/dateHelper';
import * as eventAction from '../services/eventEntity/action';

class EventModal extends React.Component {
  constructor(props) {
    super(props);
    this.repeatOptions = getRepeatOptions()
      .map((item) => <option key={item} value={item}>{item}</option>);
    this.daysOfWeekCheckBox = getDays().map((day) => (
      <div key={`dayCheckBox${day}`}>
        <input onChange={this.handleChange} id={`dayCheckBox${day}`} type="checkbox" />
        <label htmlFor={`dayCheckBox${day}`}>{day}</label>

      </div>
    ));
    this.dayOfWeekCheckBoxGroup = <div key="weeks">Choose Day of Weeks {this.daysOfWeekCheckBox}</div>;

    this.monthCheckBox = getMonths().map((month) => (
      <div key={`monthCheckBox${month}`}>
        <input onChange={this.handleChange} id={`monthCheckBox${month}`} type="checkbox" />
        <label htmlFor={`monthCheckBox${month}`}>{month}</label>

      </div>
    ));
    this.monthCheckBoxGroup = <div key="months">Choose Month {this.monthCheckBox}</div>;

    this.state = {
      allDayFlag: true
    };
    this.handleChange = this.handleChange.bind(this); // to grab event data, need to bind
  }

  handleChange(event) {
    switch (event.target.id) {
    case 'Title':
      this.props.eventAction.setEventTitle(event.target.value);
      break;
    case 'Description':
      this.props.eventAction.setEventDescription(event.target.value);
      break;
    case 'StartDate': {
      console.log(event.target.value);
      console.log(getHtmlFormattedDate(this.props.events.startDate));
      // convert to js ms format
      // change inputted time from local, to UTC before saving to firebase
      const newDate = new Date(event.target.value);
      console.log(newDate.getTime() + getLocalTimezoneOffsetInMS());
      // if all day event then remove time
      // else keep existing set time
      // console.log(event.target.value)
      //
      // this.props.eventAction.setEventStartDate(event.target.value);
      break;
    }
    default:
    }
  }

  handleDescriptionChange(event) {
    this.props.eventAction.setEventTitle(event.target.value);
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
            {this.props.eventId === '0' ? 'New ' : 'Update '} Event
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <>
            {/* Event Title */}
            <input
              className="mainTexBoxInput"
              id="Title"
              type="text"
              placeholder="Event Title"
              value={this.props.events.title}
              onChange={this.handleChange}
            />
            {/* Description */}
            <textarea
              id="Description"
              className="modalTextArea"
              placeholder="Description"
              value={this.props.events.description}
              onChange={this.handleChange}
            />
            {/* Start Date Time */}
              StartTime
            <div>
              <input
                id="StartDate"
                type="date"
                value={getHtmlFormattedDate(this.props.events.startDate)}
                // defaultValue="2018-07-22"
                onChange={this.handleChange}
              />
              <input
                id="StartTime"
                type="time"
                defaultValue="13:30"
                onChange={this.handleChange}
              />
              <label htmlFor="allDay">
                <input
                  type="checkbox"
                  id="allDay"
                  name="allDay"
                  defaultChecked
                  onChange={this.handleChange}
                />
                  All Day Event
              </label>
            </div>
            {/* Repeat Every [Frequency Nuber][Frequency Type(Day,Week,Month,Year)] */}
            <div>
                Repeat Every
              <select onChange={this.handleChange} id="myList">
                {this.repeatOptions}
              </select>
            </div>
            {/* WeekPart Selection (Weekly)(Sun,Mon,Tues,etc..) */}
            {
              this.props.events.frequencyType === 'Weekly' ? this.dayOfWeekCheckBoxGroup : null
            }
            {/* Month Part Selection (Jan/Feb/March) */}
            {
              this.props.events.frequencyType === 'Monthly' ? this.monthCheckBoxGroup : null
            }
            {/* MonthType Selection (Monthly on Day (day number of startdate) / Monthly
               on ([1st/2nd] datepart) on month) */}
            {
              this.props.events.frequencyType === 'Monthly'
                ? (
                  <div>
                      Repeat on Day Number or Nth Day of Week?
                    <select onChange={this.handleChange} id="myList">
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
          </>
        </Modal.Body>
      </Modal>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    eventAction: bindActionCreators(eventAction, dispatch)
  };
}

export default connect(
  (state) => ({ auth: state.auth, events: state.events }),
  mapDispatchToProps
)(EventModal);

// );
