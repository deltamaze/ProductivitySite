import React from 'react';
import { connect } from 'react-redux';
import { setDate } from '../services/targetDate/action';
import { getFormattedDate, getDay } from '../utilities/dateFormatter';
import { setMonth } from '../services/months/action';
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
    if (this.props.targetDate.date !== prevProps.targetDate.date
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
    const day = getDay(this.props.targetDate.date);
    const newMonth = generateNewMonth(day, event.target.value, this.props.month.month);
    // package us a new month object to post back to firebase
    this.setMonthWithDebouce(newMonth, this.props.month.monthRef, this.props.auth.uid);
  }

  syncLocalPlannerToStore() {
    const day = getDay(this.props.targetDate.date);

    this.setState({
      plannerTextBox: getDayPlanner(day, this.props.month.month) // handle input and update textbox
    });
  }


  incrementDate(direction, date) {
    // TODO if local state differs from firebase snapshot, sync without delay
    const day = direction * (1000 * 60 * 60 * 24);
    let newDate = parseInt(date, 10);
    newDate += day;

    // update state for targetDate
    this.props.setDate(newDate);
  }

  render() {
    return (
      <>
        <ul className="list-group list-group-horizontal">
          <li className="list-group-item"><button onClick={() => this.incrementDate(this.direction.backwords, this.props.targetDate.date)}>&lt;&lt;</button></li>
          <li className="list-group-item">{getFormattedDate(this.props.targetDate.date)}</li>
          <li className="list-group-item"><button onClick={() => this.incrementDate(this.direction.forward, this.props.targetDate.date)}>&gt;&gt;</button></li>
        </ul>
        <input
          type="text"
          id="plannerInput"
          value={this.state.plannerTextBox}
          onChange={this.handleChange}
        />
      </>
    );
  }
}

export default connect(
  (state) => ({ auth: state.auth, targetDate: state.targetDate, month: state.month }),
  ({
    setDate, setMonth
  })
)(PlannerPage);
