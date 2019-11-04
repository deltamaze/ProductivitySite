import React from 'react';
import { connect } from 'react-redux';
import DayController from '../components/dayController';


class JournalPage extends React.Component {
  // constructor(props) {
  //   super(props);
  // }
  componentDidMount() {
    // this.props.fetchAuth();
  }

  render() {
    return (
      <DayController element="journal" />
    );
  }
}

export default connect(
  (state) => ({ auth: state.auth }),
  ({
  })
)(JournalPage);
