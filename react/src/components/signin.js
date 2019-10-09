import React from 'react';
import { connect } from 'react-redux';
import { setUsername } from '../services/auth/action';
import debounce from '../utilities/debounce';


class SignInPage extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setUsernameWithDebouce = debounce(this.props.setUsername, 250);
    this.state = {
      userNameTextBox: '',
      userNameTextBoxValidation: ''
    };

    this.errorDiv = {
      color: 'red'
    };
    this.errorBorder = {
      border: '2px solid red',
      borderRadius: '4px'
    };
  }

  handleSubmit(event) { // eslint suggest static when this.xx not used
    event.preventDefault();
    this.props.history.push('/');
  }

  handleChange(event) {
    this.setState({
      userNameTextBox: event.target.value
    });
    // validate input
    const digitRegex = new RegExp('\\d'); // contains digit

    if (event.target.value.length === 0) {
      this.setState({
        userNameTextBoxValidation: 'This is a required Field!'
      });
    } else if (digitRegex.test(event.target.value)) {
      this.setState({
        userNameTextBoxValidation: 'No Numeric Characters allowed! Only Alphabet characters!'
      });
    } else {
      this.setState({
        userNameTextBoxValidation: ''
      });
      this.setUsernameWithDebouce(event.target.value);
    }
  }


  renderConnectingMsg() {
    if (this.props.auth.uid === '') {
      return <div>Connecting to Auth Service...</div>;
    } if (this.props.auth.uid !== '') {
      return null;
    }
    return null;
  }

  render() {
    return (
      <div>
        <h1>Login</h1>
        <h1>Current Local UN: {this.state.userNameTextBox}</h1>
        <h1>Current UN: {this.props.auth.username}</h1>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="username">
            Set Username
            <input
              type="text"
              id="username"
              required
              minLength="1"
              maxLength="30"
              pattern="[a-zA-Z]*"
              style={this.state.userNameTextBoxValidation === '' ? null : this.errorBorder}
              value={this.state.userNameTextBox}
              onChange={this.handleChange}
            />
          </label>
          <input type="submit" value="Submit" />
          <div style={this.errorDiv}>{this.state.userNameTextBoxValidation}</div>
        </form>
        <h1>Current Token: {this.props.auth.uid}</h1>
        {this.renderConnectingMsg()}
      </div>
    );
  }
}


export default connect(
  state => ({ auth: state.auth }),
  ({
    setUsername
  })
)(SignInPage);
