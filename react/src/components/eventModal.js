/* eslint-disable react/no-unused-state */
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Modal, Button } from 'react-bootstrap';
import { getRepeatOptions, getDays, getMonths } from '../utilities/enums';
import * as eventAction from '../services/eventEntity/action';

class EventModal extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this); // to grab event data, need to bind
    this.isDayOfWeekChecked = this.isDayOfWeekChecked.bind(this);
    this.isMonthChecked = this.isMonthChecked.bind(this);

    this.repeatOptions = getRepeatOptions()
      .map((item) => <option key={item} value={item}>{item}</option>);

    this.state = {
      allDayFlag: true
    };
  }

  isDayOfWeekChecked(checkVal) {
    if (this.props.events.weekPartSelection.includes(checkVal)) {
      return true;
    }
    return false;
  }

  isMonthChecked(checkVal) {
    if (this.props.events.monthPartSelection.includes(checkVal)) {
      return true;
    }
    return false;
  }

  handleChange(event) {
    let target = event.target.id;
    console.log(target);
    if (target.includes('dayCheckBox')) {
      target = 'dayCheckBox';
    }
    if (target.includes('monthCheckBox')) {
      target = 'monthCheckBox';
    }
    switch (target) {
    case 'Title':
      this.props.eventAction.setEventTitle(event.target.value);
      break;
    case 'Description':
      this.props.eventAction.setEventDescription(event.target.value);
      break;
    case 'StartDate': {
      this.props.eventAction.setEventStartDate(event.target.value);
      // if end date is less than start date, then make end date = start date
      // end date is phase 2
      break;
    }
    case 'StartTime': {
      this.props.eventAction.setEventStartTime(event.target.value);
      break;
    }
    case 'FrequencyType': {
      this.props.eventAction.setEventFrequencyType(event.target.value);
      break;
    }
    case 'dayCheckBox': {
      if (event.target.checked) { // checked on, add day to selection
        const newSelection = this.props.events.weekPartSelection + event.target.id;
        this.props.eventAction.setEventWeekPartSelection(newSelection);
      } else { // checked off
        const newSelection = this.props.events.weekPartSelection.replace(event.target.id, '');
        this.props.eventAction.setEventWeekPartSelection(newSelection);
      }
      break;
    }
    case 'monthCheckBox': {
      if (event.target.checked) { // checked on, add day to selection
        const newSelection = this.props.events.monthPartSelection + event.target.id;
        this.props.eventAction.setEventMonthPartSelection(newSelection);
      } else { // checked off
        const newSelection = this.props.events.monthPartSelection.replace(event.target.id, '');
        this.props.eventAction.setEventMonthPartSelection(newSelection);
      }
      break;
    }


    default:
    }
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
                value={this.props.events.startDate}
                onChange={this.handleChange}
              />
              <input
                id="StartTime"
                type="time"
                value={this.props.events.startTime}
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
              <select onChange={this.handleChange} id="FrequencyType">
                {this.repeatOptions}
              </select>
            </div>
            {/* WeekPart Selection (Weekly)(Sun,Mon,Tues,etc..) */}
            {
              this.props.events.frequencyType === 'Weekly'
                ? (
                  <div key="weeks">Choose Days of Week {getDays().map((day) => (
                    <div key={`dayCheckBox${day}`}>
                      <input onChange={this.handleChange} id={`dayCheckBox${day}`} type="checkbox" checked={this.isDayOfWeekChecked(day)} />
                      <label htmlFor={`dayCheckBox${day}`}>{day}</label>
                    </div>
                  ))}
                  </div>
                )
                : null
            }
            {/* Month Part Selection (Jan/Feb/March) */}
            {
              this.props.events.frequencyType === 'Month/Yearly'
                ? (
                  <div key="months">Choose Month {
                    getMonths().map((month) => (
                      <div key={`monthCheckBox${month}`}>
                        <input onChange={this.handleChange} id={`monthCheckBox${month}`} type="checkbox" checked={this.isMonthChecked(month)} />
                        <label htmlFor={`monthCheckBox${month}`}>{month}</label>
                      </div>
                    ))
                  }
                  </div>
                )
                : null
            }
            {/* MonthType Selection (Monthly on Day (day number of startdate) / Monthly
               on ([1st/2nd] datepart) on month) */}
            {
              this.props.events.frequencyType === 'Month/Yearly'
                ? (
                  <div>
                      Repeat on Day Number or Nth Day of Week?
                    <select onChange={this.handleChange} id="monthPartSelection">
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
