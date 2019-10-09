import React from 'react';
import { connect } from 'react-redux';
import { logout } from '../services/auth/action';

class SignOffPage extends React.Component {
  componentDidMount() {
    // this component is in a private route,
    // so logging off should make private route send user to signin pagel
    this.props.logout();
  }

  render() {
    return (
      <div>
        Logging out...
      </div>
    );
  }
}


export default connect(
  (state) => ({ auth: state.auth }),
  ({
    logout
  })
)(SignOffPage);
