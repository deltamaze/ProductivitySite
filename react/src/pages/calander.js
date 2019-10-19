import React from 'react';
import { connect } from 'react-redux';
import { setMonth } from '../services/monthsEntity/action';

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
        <button onClick={() => (this.props.setMonth({ test: 'test' }))}>test</button>
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
