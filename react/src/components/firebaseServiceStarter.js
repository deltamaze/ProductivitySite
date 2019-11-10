import React from 'react';
import { connect } from 'react-redux';
import { fetchAuth } from '../services/auth/action';
import { fetchMonth } from '../services/monthsEntity/action';
import { getMonthYear } from '../utilities/dateHelper';
import { fetchItemIndex } from '../services/itemIndexEntity/action';

class FirebaseServiceStarter extends React.Component {
  componentDidMount() {
    this.props.fetchAuth();
    this.updateMonth();
    this.fetchAuthorizedServices();
  }

  componentDidUpdate(prevProps) {
    // change of month
    if (getMonthYear(this.props.selectedDate.date) !== getMonthYear(prevProps.selectedDate.date)
    || this.props.auth.uid != prevProps.auth.uid) { // , or change of uid status, fetch month
      this.updateMonth();
    }
    if (this.props.auth.uid != prevProps.auth.uid) {
      this.fetchAuthorizedServices(); // logged in
    }
    // TODO determine if user logged out, clear all listeners if so
  }

  updateMonth() {
    if (this.props.auth.uid == 'Connecting' || this.props.auth.uid == 'NotLoggedIn') {
      return;
    }
    this.props.fetchMonth(this.props.auth.uid, getMonthYear(this.props.selectedDate.date));
  }

  fetchAuthorizedServices() {
    if (this.props.auth.uid == 'Connecting' || this.props.auth.uid == 'NotLoggedIn') {
      return;
    }
    this.props.fetchItemIndex(this.props.auth.uid);
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
    fetchAuth, fetchMonth, fetchItemIndex
  })
)(FirebaseServiceStarter);
