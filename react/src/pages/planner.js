import React from 'react';
import { connect } from 'react-redux';
import { setDate } from '../services/selectedDate/action';
import { getFormattedShortDate, getDayNumber, getDayOfWeekShort } from '../utilities/dateHelper';
import { setMonth } from '../services/monthsEntity/action';
import debounce from '../utilities/debounce';
import { generateNewMonth, getDayPlanner } from '../utilities/monthHelper';
// eslint-disable-next-line react/prefer-stateless-function
class PlannerPage extends React.Component {
  constructor(props) {
    super(props);
    this.direction = {
      forward: 1,
      backwords: -1,
    };
    this.handleChange = this.handleChange.bind(this); // to grab event data, need to bind
    this.setMonthWithDebouce = debounce(this.props.setMonth, 1000);
    this.state = {
      plannerTextBox: ''
    };
  }

  componentDidMount() {
    this.syncLocalPlannerToStore();
  }

  componentDidUpdate(prevProps) {
    // change of day, or uid, do a local state sync to firebase,
    // or when firebase month ref gets updated
    if (this.props.selectedDate.date !== prevProps.selectedDate.date
      || this.props.auth.uid != prevProps.auth.uid
      || this.props.month.monthRef !== prevProps.month.monthRef) {
      this.syncLocalPlannerToStore();
    }
    // TODO set inital month state as loading, then if prevProps = loaded, call syncLocalPlanner
  }

  handleChange(event) {
    this.setState({
      plannerTextBox: event.target.value // handle input and update textbox
    });
    const day = getDayNumber(this.props.selectedDate.date);
    const newMonth = generateNewMonth(day, event.target.value, this.props.month.monthData);
    // package us a new month object to post back to firebase
    this.setMonthWithDebouce(newMonth, this.props.month.monthRef, this.props.auth.uid);
  }

  syncLocalPlannerToStore() {
    const day = getDayNumber(this.props.selectedDate.date);

    this.setState({
      plannerTextBox:
        getDayPlanner(day, this.props.month.monthData) // handle input and update textbox
    });
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
              <tr>
                <th>{getFormattedShortDate(this.props.selectedDate.date)}</th>
              </tr>
              <tr>
                <th>{getDayOfWeekShort(this.props.selectedDate.date)}</th>
              </tr>
            </table>
          </li>
          <li className="list-group-item  dateControl"><button className="btn btn-outline-dark dateControl" onClick={() => this.incrementDate(this.direction.forward, this.props.selectedDate.date)}>&gt;&gt;</button></li>
        </ul>
        <textarea
          id="plannerInput"
          value={this.state.plannerTextBox}
          onChange={this.handleChange}
        />
      </>
    );
  }
}

export default connect(
  (state) => ({ auth: state.auth, selectedDate: state.selectedDate, month: state.month }),
  ({
    setDate, setMonth
  })
)(PlannerPage);
