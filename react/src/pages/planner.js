import React from 'react';
import { connect } from 'react-redux';
import { setDate } from '../services/targetDate/action';
import { getFormattedDate } from '../utilities/dateFormatter';
import { setMonth } from '../services/months/action';
import debounce from '../utilities/debounce';
import { getDay } from '../utilities/';
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
    // this.props.fetchAuth();
  }

  handleChange(event) {
    this.setState({
      plannerTextBox: event.target.value // handle input and update textbox
    });
    // package us a new month object to post back to firebase
    this.setMonthWithDebouce(event.target.value);
  }

  syncLocalPlannerToStore(date) {
    const day = this.props.getDay(date);
    
    this.setState({
      plannerTextBox: event.target.value // handle input and update textbox
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
