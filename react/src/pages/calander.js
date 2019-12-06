import React from 'react';
import { connect } from 'react-redux';
import CalendarDay from '../components/calendarDay';
import { getFirstDayOfMonth } from '../utilities/dateHelper';
import MonthSelector from '../components/monthSelector';

class CalendarPage extends React.Component {
  componentDidMount() {
  }

  renderCalendarDays() {
    // calculate first day of selected date month
    const firstDayOfMonth = getFirstDayOfMonth(this.props.selectedDate.date);
    const dayOfWeek = firstDayOfMonth.getDay() + 1; // start at 1 instead of 0
    // loop through to create calendar
    // first loop is rows, 6 total
    let cellCounter = 1;
    const calendarRows = [];
    for (let calRow = 1; calRow <= 6; calRow += 1) {
      const calendarDays = [];
      for (let calCol = 1; calCol <= 7; calCol += 1) {
        // get date part , so for nov 2019, start is friday, so dayOfWeekInt is 6
        // double loop inner count starts at 1. which should represents oct 27
        // so display day should be dateadd(day,(innerLoopCount-dayOfWeekInt),firstDateOfMonth)
        const calDay = new Date(firstDayOfMonth);
        calDay.setDate(calDay.getDate() + (cellCounter - dayOfWeek));
        calendarDays.push(<CalendarDay key={cellCounter.toString()} calDay={calDay} />);
        cellCounter += 1;
      }
      calendarRows.push(<tr key={(cellCounter * 100).toString()}>{calendarDays}</tr>);
    }
    return (<tbody>{calendarRows}</tbody>);
  }

  render() {
    return (
      <>
        {(this.props.month.monthData === 'Loading') ? (
          <div>Loading...</div>
        ) : (
          <div>
            <MonthSelector />

            <table id="calendarTable" className="table table-bordered">
              <thead>
                <tr>
                  <th>Sun</th>
                  <th>Mon</th>
                  <th>Tue</th>
                  <th>Wen</th>
                  <th>Thu</th>
                  <th>Fri</th>
                  <th>Sat</th>
                </tr>
              </thead>
              {this.renderCalendarDays()}
            </table>
          </div>
        )}
      </>
    );
  }
}

export default connect(
  (state) => ({ selectedDate: state.selectedDate, month: state.month }),
  ({

  })
)(CalendarPage);


// todo
// set month
// set year
