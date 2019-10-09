import React from 'react';
import { connect } from 'react-redux';

class SignInPage extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
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
  state => ({ auth: state.auth }),
  ({
    logout
  })
)(SignInPage);
