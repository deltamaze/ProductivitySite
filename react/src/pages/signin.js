import React from 'react';
import { connect } from 'react-redux';

class SignInPage extends React.Component {
  renderConnectingMsg() {
    if (this.props.auth.uid == 'Connecting') {
      return <div>Connecting to Auth Service...</div>;
    } if (this.props.auth.uid == 'NotLoggedIn') {
      return <div>Log on with the option(s) below.</div>;
    }
    return <div>You are signed in.</div>;
  }

  render() {
    return (
      <div>
        <h1>Current Token: {this.props.auth.uid}</h1>
        {this.renderConnectingMsg()}
      </div>
    );
  }
}


export default connect(
  (state) => ({ auth: state.auth }),
  ({
  })
)(SignInPage);
