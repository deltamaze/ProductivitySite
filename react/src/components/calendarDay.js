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
  }

  calendarClick() {
    this.props.setDate(this.intDate);
    this.props.history.push('planner');
    // console.log(getDayElement(this.dayNumber, this.props.month.monthData, 'planner'));
  }

  renderMonthStatus(isActiveMonth) {
    if (!isActiveMonth) {
      return null;
    }
    const items = [];
    const planner = getDayElement(this.dayNumber, this.props.month.monthData, 'planner');
    const journal = getDayElement(this.dayNumber, this.props.month.monthData, 'journal');
    const plannerPreview = planner.length > 15 ? (`${planner.substring(0, 15).trim()}...`) : planner.substring(0, 15).trim();

    if (planner != '') {
      items.push(
        <div key={`plan${this.props.key}`}>
          <span style={{ fontsize: '20px' }} className="oi oi-list" aria-hidden="true" />{plannerPreview}<br />
        </div>
      );
    }
    if (journal != '') {
      items.push(
        <div key={`journ${this.props.key}`}>
          <span style={{ fontsize: '20px' }} className="oi oi-book" aria-hidden="true" /><br />
        </div>
      );
    }
    return items;
  }

  render() {
    const isActiveMonth = (getMonthYear(this.intDate)
      === getMonthYear(this.props.selectedDate.date));
    let classAppliedToDisplayDay = 'calendarDay';
    if (!isActiveMonth) {
      classAppliedToDisplayDay = 'calendarDay adjacentMonth';
    } else if (getFormattedDate(this.intDate) === getFormattedDate(new Date().getTime())) {
      classAppliedToDisplayDay = 'calendarDay calendarToday';
    }
    // else if (isActiveMonth
    //   && getFormattedDate(this.intDate) === getFormattedDate(this.props.selectedDate.date)) {
    //   classAppliedToDisplayDay = 'calendarDay calendarActiveDay';
    // }
    return (
      <>
        {(this.props.month.monthData === 'Loading') ? (
          <div>Loading...</div>
        ) : (
          // eslint-disable-next-line
          <td className="calendarTd" onClick={() => { this.calendarClick(); }}>
            <div className={classAppliedToDisplayDay}>{this.dayNumber}</div>
            <br />
            {this.renderMonthStatus(isActiveMonth)}
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
