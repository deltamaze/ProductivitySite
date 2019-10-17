import React from 'react';
import { connect } from 'react-redux';
import { setCalendar } from '../services/calendar/action';

// eslint-disable-next-line react/prefer-stateless-function
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
        <button onClick={() => (this.props.setCalendar({ test: 'test' }))}>test</button>
      </div>
    );
  }
}

export default connect(
  (state) => ({ auth: state.auth }),
  ({
    setCalendar
  })
)(CalendarPage);
