/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prefer-stateless-function */
// This is used to determine if a user is authenticated and
// if they are allowed to visit the page they navigated to.

// If they are: they proceed to the page
// If not: they are redirected to the login page.
import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux';

class PrivateRoute extends React.Component {
    render() {
        const { component: Component, ...rest } = this.props;

        const renderRoute = (props) => {
            if (this.props.auth.uid !== 'NotLoggedIn') {
                return (
                    <Component {...props} />
                );
            }

            const to = {
                pathname: '/signin',
                state: { from: props.location }
            };

            return (
                <Redirect to={to} />
            );
        };

        return (
            <Route {...rest} render={renderRoute} />
        );
    }
}

export default connect(
    (state) => ({ auth: state.auth })
)(PrivateRoute);
