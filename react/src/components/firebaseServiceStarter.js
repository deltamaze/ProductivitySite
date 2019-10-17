import React from 'react';
import { connect } from 'react-redux';
import { fetchAuth } from '../services/auth/action';
import { fetchCalendar } from '../services/calendar/action';
import { getMonthYear } from '../utilities/dateFormatter';

class FirebaseServiceStarter extends React.Component {
  componentDidMount() {
    this.props.fetchAuth();
    this.updateCalendar();
  }

  componentDidUpdate(prevProps) {
    // change of month
    if (getMonthYear(this.props.targetDate.date) !== getMonthYear(prevProps.targetDate.date)
    || this.props.auth.uid != prevProps.auth.uid) { // , or change of uid status, fetch calendar
      this.updateCalendar();
    }
  }

  updateCalendar() {
    if (this.props.auth.uid == 'Connecting' || this.props.auth.uid == 'NotLoggedIn') {
      return;
    }
    this.props.fetchCalendar(this.props.auth.uid, getMonthYear(this.props.targetDate.date));
  }

  render() {
    return (
      null
    );
  }
}

export default connect(
  (state) => ({ auth: state.auth, targetDate: state.targetDate }),
  ({
    fetchAuth, fetchCalendar
  })
)(FirebaseServiceStarter);
