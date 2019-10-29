import React from 'react';
import { connect } from 'react-redux';
import { setDate } from '../services/selectedDate/action';
import { getFormattedShortDate, getDayOfWeekShort } from '../utilities/dateHelper';
import { setMonth } from '../services/monthsEntity/action';

class DaySelector extends React.Component {
  constructor(props) {
    super(props);
    this.direction = {
      forward: 1,
      backwords: -1,
    };
  }


  incrementDate(direction, date) {
    // TODO if local state differs from firebase snapshot, sync without delay
    const day = direction * (1000 * 60 * 60 * 24);
    let newDate = parseInt(date, 10);
    newDate += day;

    // update state for selectedDate
    this.props.setDate(newDate);
  }

  render() {
    return (
      <>
        <ul className="list-group list-group-horizontal dateControl">
          <li className="list-group-item  dateControl"><button className="btn btn-outline-dark dateControl" onClick={() => this.incrementDate(this.direction.backwords, this.props.selectedDate.date)}>&lt;&lt;</button></li>
          <li className="list-group-item  dateControl">
            <table className="dateControl">
              <thead>
                <tr>
                  <th>{getFormattedShortDate(this.props.selectedDate.date)}</th>
                </tr>
                <tr>
                  <th>{getDayOfWeekShort(this.props.selectedDate.date)}</th>
                </tr>
              </thead>
            </table>
          </li>
          <li className="list-group-item  dateControl"><button className="btn btn-outline-dark dateControl" onClick={() => this.incrementDate(this.direction.forward, this.props.selectedDate.date)}>&gt;&gt;</button></li>
        </ul>
      </>
    );
  }
}

export default connect(
  (state) => ({ auth: state.auth, selectedDate: state.selectedDate }),
  ({
    setDate, setMonth
  })
)(DaySelector);
