import React from 'react';
import { connect } from 'react-redux';


class EventPage extends React.Component {
  // constructor(props) {
  //   super(props);
  // }
  componentDidMount() {
    // this.props.fetchAuth();
  }

  render() {
    return (
      <div>
        EventPage
      </div>
    );
  }
}

export default connect(
  (state) => ({ auth: state.auth }),
  ({
  })
)(EventPage);
