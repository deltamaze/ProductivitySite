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
    // Typical usage (don't forget to compare props):
    console.log(getMonthYear(this.props.targetDate));
    console.log(getMonthYear(prevProps.targetDate.date));
    if (getMonthYear(this.props.targetDate) !== getMonthYear(prevProps.targetDate.date)) {
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
