import React from 'react';
import { connect } from 'react-redux';
import { setMonth } from '../services/monthsEntity/action';

class CalendarPage extends React.Component {
  // constructor(props) {
  //   super(props);
  // }
  componentDidMount() {
    // this.props.fetchAuth();
  }

  // renderCalendarDays() {
  //   const row = 1;
  //   const col = 1;
  //   // 5 rows
  //   // 7 days
  //   // make prop drill into td, so map the td to the actual date
  //   // if selected date = td then circle the day value in td, similar to google cal

  // calculate first day of selected date month
  // get date part , so for nov 2019, start is friday, so dayOfWeekInt is 6
  // double loop inner count starts at 1. which should represents oct 27
  // so display day should be dateadd(day,(innerLoopCount-dayOfWeekInt),firstDateOfMonth)
  // }

  render() {
    return (
      <div>
        CalendarPage <br />
        TODO Month Selector <br />
        TODO Year Selector <br />
        <table id="calendarTable" className="table">
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
          <tbody>
            <tr>
              <td>0</td>
              <td>0</td>
              <td>0</td>
              <td>0</td>
              <td>0</td>
              <td>0</td>
              <td>0</td>
            </tr>
            <tr>
              <td>0</td>
              <td>0</td>
              <td>0</td>
              <td>0</td>
              <td>0</td>
              <td>0</td>
              <td>0</td>
            </tr>
            <tr>
              <td>0</td>
              <td>0</td>
              <td>0</td>
              <td>0</td>
              <td>0</td>
              <td>0</td>
              <td>0</td>
            </tr>
            <tr>
              <td>0</td>
              <td>0</td>
              <td>0</td>
              <td>0</td>
              <td>0</td>
              <td>0</td>
              <td>0</td>
            </tr>
            <tr>
              <td>0</td>
              <td>0</td>
              <td>0</td>
              <td>0</td>
              <td>0</td>
              <td>0</td>
              <td>0</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default connect(
  (state) => ({ auth: state.auth }),
  ({
    setMonth
  })
)(CalendarPage);
