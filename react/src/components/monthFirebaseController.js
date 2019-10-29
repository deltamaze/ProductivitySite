import React from 'react';
import { connect } from 'react-redux';
import { getDayNumber } from '../utilities/dateHelper';
import { setMonth } from '../services/monthsEntity/action';
import debounce from '../utilities/debounce';
import { generateNewMonth, getDayPlanner } from '../utilities/monthHelper';
import DaySelector from './daySelector';

class PlannerPage extends React.Component {
  constructor(props) {
    super(props);

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

  render() {
    return (
      <>
        {(this.props.month.monthData === 'Loading') ? (
          <div>Loading...</div>
        ) : (
          <>
            <DaySelector />
            <textarea
              id="mainTextAreaInput"
              value={this.state.plannerTextBox}
              onChange={this.handleChange}
            />
          </>
        )}
      </>
    );
  }
}

export default connect(
  (state) => ({ auth: state.auth, selectedDate: state.selectedDate, month: state.month }),
  ({
    setMonth
  })
)(PlannerPage);
