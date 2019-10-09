import React from 'react';
import { connect } from 'react-redux';
import { setUsername } from '../services/auth/action';


class CreatePrivateGame extends React.Component {
  constructor(props) {
    super(props);

    this.handleGameNameChange = this.handleGameNameChange.bind(this);
    this.handleIsPrivateChange = this.handleIsPrivateChange.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      gameNameTextBox: '',
      gameNameTextBoxValidation: '',
      isPrivate: false,
      passwordTextBox: '',
      passwordTextBoxValidation: '',
    };

    this.errorDiv = {
      color: 'red'
    };
    this.errorBorder = {
      border: '2px solid red',
      borderRadius: '4px'
    };
  }

  // handleSubmit(event) { // eslint suggest static when this.xx not used
  //   event.preventDefault();isPrivate
  //   // call firebase service, push up local props to action,
  //   // which sets firebase object, and routes player to game
  // }

  handleGameNameChange(event) { // make one of these for every field
    this.setState({
      gameNameTextBox: event.target.value
    });
    // validate input
    const digitRegex = new RegExp('\\d'); // contains digit

    if (event.target.value.length === 0) {
      this.setState({
        gameNameTextBoxValidation: 'This is a required Field!'
      });
    } else if (digitRegex.test(event.target.value)) {
      this.setState({
        gameNameTextBoxValidation: 'No Numeric Characters allowed! Only Alphabet characters!'
      });
    } else {
      this.setState({
        gameNameTextBoxValidation: ''
      });
    }
  }

  handleIsPrivateChange() {
    // console.log(event.target);
    this.setState(prevState => ({
      isPrivate: !prevState.isPrivate
    }));
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
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="gameName">
            Game Name
            <input
              type="text"
              id="gameName"
              required
              minLength="1"
              maxLength="30"
              pattern="[a-zA-Z]*"
              style={this.state.gameNameTextBoxValidation === '' ? null : this.errorBorder}
              value={this.state.gameNameTextBox}
              onChange={this.handleGameNameChange}
            />
          </label>
          <br />
          <label htmlFor="isPrivate">
            Private Game?
            <input
              type="checkbox"
              id="isPrivate"
              // style={this.state.gameNameTextBoxValidation === '' ? null : this.errorBorder}
              checked={this.state.isPrivate}
              onChange={this.handleIsPrivateChange}
            />
          </label>
          <br />
          <input type="submit" value="Submit" />
          <div style={this.errorDiv}>{this.state.gameNameTextBoxValidation}</div>
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
)(CreatePrivateGame);
