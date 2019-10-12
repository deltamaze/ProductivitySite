import React from 'react';
import { connect } from 'react-redux';
import { fetchAuth } from '../services/auth/action';
import { fetchCalendar } from '../services/calendar/action';

class FirebaseServiceStarter extends React.Component {
  componentDidMount() {
    this.props.fetchAuth();
    this.props.fetchCalendar(this.props.date);
    console.log('test that this does not get called after date changes');
  }

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    console.log('test that this gets called after date changes');
    if (this.props.date !== prevProps.date) {
      this.fetchData(this.props.userID);
    }
  }

  render() {
    return (
      null
    );
  }
}

export default connect(
  (state) => ({ date: state.date }),
  ({
    fetchAuth, fetchCalendar
  })
)(FirebaseServiceStarter);
