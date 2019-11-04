import React from 'react';
import { connect } from 'react-redux';
import DayController from '../components/dayController';


class PlannerPage extends React.Component {
  // constructor(props) {
  //   super(props);
  // }
  componentDidMount() {
    // this.props.fetchAuth();
  }

  render() {
    return (
      <DayController element="planner" />
    );
  }
}

export default connect(
  (state) => ({ auth: state.auth }),
  ({
  })
)(PlannerPage);
