/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getDayNumber, getMonthYear, getFormattedDate } from '../utilities/dateHelper';
import { getDayElement } from '../utilities/monthHelper';
import { setDate } from '../services/selectedDate/action';

class CalendarDay extends React.Component {
  constructor(props) {
    super(props);
    this.intDate = this.props.calDay.getTime();
    this.dayNumber = getDayNumber(this.intDate);
    this.isActiveMonth = (getMonthYear(this.intDate)
      === getMonthYear(this.props.selectedDate.date));
    this.isToday = (getMonthYear(this.intDate)
    === getMonthYear(this.props.selectedDate.date));
    this.isActiveDay = (getMonthYear(this.intDate)
    === getMonthYear(this.props.selectedDate.date));
    this.classAppliedToDisplayDay = 'calendarDay';
    if (!this.isActiveMonth) {
      this.classAppliedToDisplayDay = 'calendarDay adjacentMonth';
    } else if (getFormattedDate(this.intDate) === getFormattedDate(new Date().getTime())) {
      this.classAppliedToDisplayDay = 'calendarDay calendarToday';
    } else if (this.isActiveMonth
      && getFormattedDate(this.intDate) === getFormattedDate(this.props.selectedDate.date)) {
      this.classAppliedToDisplayDay = 'calendarDay calendarActiveDay';
    }
  }

  calendarClick() {
    this.props.setDate(this.intDate);
  }

  renderMonthStatus() {
    if (!this.isActiveMonth) {
      return null;
    }
    const items = [];
    const planner = getDayElement(this.dayNumber, this.props.month.monthData, 'planner');
    const journal = getDayElement(this.dayNumber, this.props.month.monthData, 'journal');
    if (planner != '') {
      items.push(<div key={`plan${this.props.key}`}><span style={{ fontsize: '20px' }} className="oi oi-list" aria-hidden="true" /><br /></div>);
    }
    if (journal != '') {
      items.push(<div key={`journ${this.props.key}`}><span style={{ fontsize: '20px' }} className="oi oi-book" aria-hidden="true" /><br /></div>);
    }
    return items;
  }

  render() {
    return (
      <>
        {(this.props.month.monthData === 'Loading') ? (
          <div>Loading...</div>
        ) : (
          // eslint-disable-next-line
          <td className="calendarTd" onClick={() => { this.calendarClick(); }}>
            <div className={this.classAppliedToDisplayDay}>{this.dayNumber}</div>
            <br />
            {this.renderMonthStatus()}
          </td>
        )}
      </>
    );
    // );
  }
}

export default connect(
  (state) => ({ selectedDate: state.selectedDate, month: state.month }),
  ({
    setDate
  })
)(withRouter(CalendarDay));


// props
// hmm actuall lets make this a class and redux conected
// day number
// date (on click make selected date)
// date cont. prop drill action for setSelectedDate
// date
// plannerPreview
// journalPreview
// on click fire modal


// toBeImplementedLater:
// event data
// recurring event data
//
