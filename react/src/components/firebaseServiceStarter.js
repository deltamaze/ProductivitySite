import React from 'react';
import { connect } from 'react-redux';
import { fetchAuth } from '../services/auth/action';
import { fetchMonth } from '../services/monthsEntity/action';
import { getMonthYear } from '../utilities/dateHelper';

class FirebaseServiceStarter extends React.Component {
  componentDidMount() {
    this.props.fetchAuth();
    this.updateMonth();
  }

  componentDidUpdate(prevProps) {
    // change of month
    if (getMonthYear(this.props.selectedDate.date) !== getMonthYear(prevProps.selectedDate.date)
    || this.props.auth.uid != prevProps.auth.uid) { // , or change of uid status, fetch month
      this.updateMonth();
    }
  }

  updateMonth() {
    if (this.props.auth.uid == 'Connecting' || this.props.auth.uid == 'NotLoggedIn') {
      return;
    }
    this.props.fetchMonth(this.props.auth.uid, getMonthYear(this.props.selectedDate.date));
  }

  render() {
    return (
      null
    );
  }
}

export default connect(
  (state) => ({ auth: state.auth, selectedDate: state.selectedDate }),
  ({
    fetchAuth, fetchMonth
  })
)(FirebaseServiceStarter);
