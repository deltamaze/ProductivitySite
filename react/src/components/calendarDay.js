/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getDayNumber, getMonthYear } from '../utilities/dateHelper';
import { getDayElement } from '../utilities/monthHelper';

class CalendarDay extends React.Component {
  constructor(props) {
    super(props);
    this.intDate = this.props.calDay.getTime();
    this.dayNumber = getDayNumber(this.intDate);
    this.isActiveMonth = (getMonthYear(this.intDate)
      === getMonthYear(this.props.selectedDate.date));
    this.classAppliedToDisplayDay = 'calendarDay';
    if (!this.isActiveMonth) {
      this.classAppliedToDisplayDay = 'calendarDay adjacentMonth';
    }
  }

  renderMonthStatus() {
    if (!this.isActiveMonth) {
      return null;
    }
    const items = [];
    const planner = getDayElement(this.dayNumber, this.props.month.monthData, 'planner');
    const journal = getDayElement(this.dayNumber, this.props.month.monthData, 'journal');
    if (planner != '') {
      items.push(<>Planner✔️ </>);
    }
    if (journal != '') {
      items.push(<>Journal✔️ </>);
    }
    if (journal != '' || planner != '') {
      items.push(<br />);
    }
    return items;
  }

  render() {
    return (
      <>
        {(this.props.month.monthData === 'Loading') ? (
          <div>Loading...</div>
        ) : (
          <td className="calendarTd">
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
