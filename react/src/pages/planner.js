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
    // this.handleChange = this.handleChange.bind(this);
    this.setMonthWithDebouce = debounce(this.props.setMonth, 1000);
    this.state = {
      plannerTextBox: ''
    };
  }

  componentDidMount() {
    this.syncLocalPlannerToStore();
  }

  componentDidUpdate(prevProps) {
    // change of month
    if (getMonthYear(this.props.targetDate.date) !== getMonthYear(prevProps.targetDate.date)
    || this.props.auth.uid != prevProps.auth.uid) { // , or change of uid status, fetch month
      this.updateMonth();
    }
    // TODO set inital month state as loading, then if prevProps = loaded, call syncLocalPlanner
  }

  handleChange(event) {
    this.setState({
      plannerTextBox: event.target.value // handle input and update textbox
    });
    const day = getDay(this.props.targetDate.date);
    const newMonth = generateNewMonth(day, event.target.value, this.props.month);
    // package us a new month object to post back to firebase
    this.setMonthWithDebouce(newMonth);
  }

  syncLocalPlannerToStore() {
    const day = getDay(this.props.targetDate.date);

    this.setState({
      plannerTextBox: getDayPlanner(day, this.props.month) // handle input and update textbox
    });
  }


  incrementDate(direction, date) {
    const day = direction * (1000 * 60 * 60 * 24);
    const msDate = parseInt(date, 10);
    this.props.setDate(msDate + day);
  }

  render() {
    return (
      <>
        <ul className="list-group list-group-horizontal">
          <li className="list-group-item"><button onClick={() => this.incrementDate(this.direction.backwords, this.props.targetDate.date)}>&lt;&lt;</button></li>
          <li className="list-group-item">{getFormattedDate(this.props.targetDate.date)}</li>
          <li className="list-group-item"><button onClick={() => this.incrementDate(this.direction.forward, this.props.targetDate.date)}>&gt;&gt;</button></li>
        </ul>
      </>
    );
  }
}

export default connect(
  (state) => ({ auth: state.auth, targetDate: state.targetDate }),
  ({
    setDate
  })
)(PlannerPage);
