import React from 'react';
import { connect } from 'react-redux';
import { fetchAuth } from '../services/auth/action';

// eslint-disable-next-line react/prefer-stateless-function
class FirebaseServiceStarter extends React.Component {
  // constructor(props) {
  //   super(props);
  // }
  componentDidMount() {
    this.props.fetchAuth();
  }

  render() {
    return (
      null
    );
  }
}

export default connect(
  (state) => ({ auth: state.auth }),
  ({
    fetchAuth
  })
)(FirebaseServiceStarter);
