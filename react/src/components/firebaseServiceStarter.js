import React from 'react';
import { connect } from 'react-redux';
import { fetchAuth } from '../services/auth/action';
import { fetchCalendar } from '../services/calendar/action';
import { getMonthYear } from '../utilities/dateFormatter';

class FirebaseServiceStarter extends React.Component {
  componentDidMount() {
    this.props.fetchAuth();
    this.props.fetchCalendar(this.props.date);
  }

  componentDidUpdate(prevProps) {
    if (getMonthYear(this.props.targetDate.date) !== getMonthYear(prevProps.targetDate.date)) {
      // TODO update firebase ref when month change happens
      console.log('month change detected');
    }
  }

  render() {
    return (
      null
    );
  }
}

export default connect(
  (state) => ({ targetDate: state.targetDate }),
  ({
    fetchAuth, fetchCalendar
  })
)(FirebaseServiceStarter);
