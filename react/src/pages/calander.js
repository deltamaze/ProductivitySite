import React from 'react';
import { connect } from 'react-redux';
import { setMonth } from '../services/monthsEntity/action';

class CalendarPage extends React.Component {
  // constructor(props) {
  //   super(props);
  // }
  componentDidMount() {
    // this.props.fetchAuth();
  }

  render() {
    return (
      <div>
        CalendarPage
      </div>
    );
  }
}

export default connect(
  (state) => ({ auth: state.auth }),
  ({
    setMonth
  })
)(CalendarPage);
