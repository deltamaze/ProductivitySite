import React from 'react';
import { connect } from 'react-redux';
import { login, logout } from '../services/auth/action';

let SignInPage = props => (
  <div>
    <h1>Login</h1>
    <button onClick={props.login}>Login</button>
    <button onClick={props.logout}>Logout</button>
    <h1>Current UN: {props.auth.username}</h1>
    <h1>Current Token: {props.auth.userToken}</h1>
  </div>
);
SignInPage = connect(
  state => ({ auth: state.auth }),
  ({
    login, logout
  })
)(SignInPage);

export default SignInPage;
