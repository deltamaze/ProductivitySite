// This is used to determine if a user is authenticated and
// if they are allowed to visit the page they navigated to.

// If they are: they proceed to the page
// If not: they are redirected to the login page.
import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux';

let PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => (rest.auth.userToken != '' ? (
      <Component {...props} />
    ) : (
      <Redirect to={{ pathname: '/signin', state: { from: props.location } }} />
    ))
    }
  />
);

PrivateRoute = connect(
  state => ({ auth: state.auth })
)(PrivateRoute);

export default PrivateRoute;
