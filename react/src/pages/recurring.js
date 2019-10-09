import React from 'react';
import { connect } from 'react-redux';

// eslint-disable-next-line react/prefer-stateless-function
class RecurringPage extends React.Component {
  // constructor(props) {
  //   super(props);
  // }
  componentDidMount() {
    // this.props.fetchAuth();
  }

  render() {
    return (
      <div>
        RecurringPage
      </div>
    );
  }
}

export default connect(
  state => ({ auth: state.auth }),
  ({
  })
)(RecurringPage);
